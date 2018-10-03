// Helper functions for actions
import { Platform } from 'react-native'
import RNFetchBlob from 'react-native-fetch-blob'
import ImageResizer from 'react-native-image-resizer'

import PendingTransaction from 'lndr/pending-transaction'
import PendingUnilateral from 'lndr/pending-unilateral'

import { CreditRecord } from 'credit-protocol'
import TouchID from 'react-native-touch-id'
import PendingBilateral from 'lndr/pending-bilateral'
import { getBcptBalance } from 'lndr/bcpt-utils'
import { bufferToHex } from '../credit-protocol/lib/buffer-utils'
import moment from 'moment'
import { getEthBalance } from 'lndr/settlement'
import { currencyFormats } from 'lndr/format'
import { currencySymbols } from 'lndr/currencies'
import { getUcacAddr, convertCurrency, getPrimaryCurrency } from 'reducers/app'

export const triggerTouchId = (user, notificationsEnabled, sessionStorage) => {
  const optionalConfigObject = { title: 'Authentication Required', color: '#e00606' }
  return TouchID.authenticate('Please sign in using your fingerprint', optionalConfigObject)
  .then( () => {
    sessionStorage.set(moment())
    return { hasStoredUser: true, welcomeComplete: true, privacyPolicyVerified: true, notificationsEnabled, user }
  })
  .catch(_error => {
    return { hasStoredUser: true, welcomeComplete: true, privacyPolicyVerified: true, notificationsEnabled, user: undefined }
  })
}

export const getEthInfo = async (user, creditProtocol) => {
  let ethBalance = '0' as any, ethPrices = {}, bcptBalance = '0'
  try {
    ethPrices = await creditProtocol.getEthPrices()
  } catch (e) {}
  try {
    ethBalance = await getEthBalance(user.address)
    const attoBcpts = await getBcptBalance(user.address)
    bcptBalance = String ( Number(attoBcpts) / Math.pow(10, 18) )
  } catch (e) {}
  return { ethBalance, ethPrices, bcptBalance }
}

export const generateMultiTransaction = async (address: string, friendAddress: string, ucacBalances: Object, memo: string, getState: Function, privateKeyBuffer: any, creditProtocol: any, settlementCurrency?: string) => {
  const startNonce = await creditProtocol.getNonce(address, friendAddress)
  let tooLow = false, tooHigh = false

  const transactions = Object.keys(ucacBalances).map( (ucacCur, index) => {
    const balance = ucacBalances[ucacCur]
    const sanAmount = Math.abs(balance)
    const creditor = balance > 0 ? friendAddress : address
    const debtor = balance > 0 ? address : friendAddress
    const ucac = getUcacAddr(getState())(ucacCur)

    tooLow = tooLow || sanAmount <= 0
    tooHigh = tooHigh || sanAmount >= 1e11

    const creditRecord = new CreditRecord(ucac, creditor, debtor, sanAmount, memo, startNonce + index)
    const signature = creditRecord.sign(privateKeyBuffer)

    return {
      ucac,
      creditor,
      debtor,
      amount: sanAmount,
      memo,
      submitter: address,
      hash: bufferToHex(creditRecord.hash),
      nonce: startNonce + index,
      signature,
      settlementAmount: undefined,
      settlementCurrency
    }
  })

  return { transactions, tooLow, tooHigh }
}

export const filterMultiTransactions = (address: string, pending: any, state: Object) => {
  let txs = {}

  //helper function
  const storeTx = (txs: Object, addr: string, pend: PendingTransaction | PendingUnilateral | PendingBilateral) => {
    if(txs[addr] === undefined) {
      txs[addr] = [ pend ]
    } else {
      txs[addr].push(pend)
    }
    return txs
  }

  //create an object of all the transactions/settlements, stored by friend
  pending.forEach( pendTx => pendTx.debtorAddress === address ?
    txs = storeTx(txs, pendTx.creditorAddress, pendTx) :
    txs = storeTx(txs, pendTx.debtorAddress, pendTx)
  )

  for(let tx in txs) {
    if(txs[tx].length === 1) {
      delete txs[tx]
    }
  }

  //remove all transactions/settlements that are part of a multi settlement
  const newList = pending.filter( pendTx => {
    for(let tx in txs) {
      if(pendTx.creditorAddress === tx || pendTx.debtorAddress === tx) {
        return false
      }
    }
    return true
  })

  //make a new transaction/settlement for display purposes
  const primaryCurrency = getPrimaryCurrency(state)
  for(let tx in txs) {
    const balance = txs[tx].reduce( (acc, pendTx) => {
      const txAmt = convertCurrency(state)(pendTx.ucac, pendTx.amount)
      return pendTx.creditorAddress === address ? acc + txAmt: acc - txAmt
    }, 0)

    let multiTransactions, settlementAmount, settlementCurrency, settlementBlockNumber, txHash, multiSettlements

    const creditor = balance > 0 ? address : tx
    const debtor = balance > 0 ? tx : address
    const submitter = txs[tx][0].submitter
    const ucac = getUcacAddr(state)(primaryCurrency)
    const amount = Math.round(Math.abs(balance))
    const memo = `Request to settle for ${currencySymbols(primaryCurrency)}${currencyFormats(primaryCurrency)(amount)}`
    const nonce = 0
    const hash = txs[tx][0].hash

    const data = { creditor, debtor, amount, memo, nonce, ucac, submitter, hash, multiTransactions,
      settlementAmount, settlementCurrency, settlementBlockNumber, multiSettlements, txHash }

    if(pending[0] instanceof PendingTransaction) {
      data.multiTransactions = txs[tx]
      data.settlementCurrency = txs[tx][0].settlementCurrency
      newList.push(new PendingTransaction(data))

    } else if(pending[0] instanceof PendingUnilateral) {
      data.settlementAmount = txs[tx].reduce( (acc, pendTx) => {
        return pendTx.creditorAddress === address ? acc + pendTx.settlementAmount: acc - pendTx.settlementAmount
      }, 0)
      data.settlementCurrency = txs[tx][0].settlementCurrency
      data.settlementBlockNumber
      data.multiSettlements = txs[tx]
      newList.push(new PendingUnilateral(data))

    } else if(pending[0] instanceof PendingBilateral) {
      data.settlementAmount = txs[tx].reduce( (acc, pendTx) => {
        return pendTx.creditorAddress === address ? acc + pendTx.settlementAmount: acc - pendTx.settlementAmount
      }, 0)
      data.settlementCurrency = txs[tx][0].settlementCurrency
      data.settlementBlockNumber
      data.multiSettlements = txs[tx]
      data.txHash = txs[tx][0].txHash
      newList.push(new PendingBilateral({ txHash, creditRecord: data }))
    }
  }

  return newList
}

export const resizeKYCImage = async (imageURI: string, imageData: string) => {
  const IMAGE_TARGET_SIZE = 1024
  let resizedImageResponse, base64ImageData

  if (Platform.OS === 'android') {
    resizedImageResponse = await ImageResizer.createResizedImage(imageURI, IMAGE_TARGET_SIZE, IMAGE_TARGET_SIZE, "JPEG", 100, 0)
    base64ImageData = await RNFetchBlob.fs.readFile(resizedImageResponse.path, 'base64')
  } else {
    resizedImageResponse = await ImageResizer.createResizedImage(`data:image/jpg;jpeg;base64,${imageData}`, IMAGE_TARGET_SIZE, IMAGE_TARGET_SIZE, "JPEG", 100, 0)
    base64ImageData = await RNFetchBlob.fs.readFile(resizedImageResponse.path, 'base64')
  }
  return `data:image/jpg;jpeg;base64,${base64ImageData}`
}
