// This file is over 50 lines of code and needs to be broken up
declare const Buffer

import Mnemonic from 'bitcore-mnemonic'
import ethUtil from 'ethereumjs-util'
import RNFetchBlob from 'react-native-fetch-blob'
import ImageResizer from 'react-native-image-resizer'
import { Platform } from 'react-native'
import moment from 'moment'

import { hexToBuffer, utf8ToBuffer, bufferToHex, stringToBuffer } from './lib/buffer-utils'
import Client from './lib/client'
import CreditRecord from './lib/credit-record'
export { default as CreditRecord } from './lib/credit-record'

import { currencySymbols, hasNoDecimals } from 'lndr/currencies'
import { formatSettlementCurrencyAmount, formatSettlementAmount, isERC20Settlement } from 'lndr/format'
import KYC from 'lndr/kyc'

import { ERC20_Transaction, WEI_PER_ETH, getERC20_token } from 'lndr/erc-20'
import Tx from 'ethereumjs-tx'
import web3 from 'lndr/web3-connection'

export interface TransactionCosts {
  ethCost: number,
  ethCostFormatted: string,
  currencyCost: number,
  currencyCostFormatted: string,
  weiCost: number
}

export const defaultTransactionCosts = () : TransactionCosts => ({
  ethCost: 0,
  ethCostFormatted: '',
  currencyCost: 0,
  currencyCostFormatted: '',
  weiCost: 0
})

export default class CreditProtocol {
  client: Client
  tempStorage: any

  constructor(baseUrl: string, fetch?: any) {
    this.client = new Client(baseUrl, fetch)
    this.tempStorage = {
      registerId: {}
    }
  }

  cacheHttpRequest(endpoint: string, milliseconds: number) {
    const cachedData = this.tempStorage[endpoint]
    if (cachedData && cachedData.request && cachedData.timestamp && moment(cachedData.timestamp).add(milliseconds, 'ms') > moment()) {
      return cachedData.request
    }
    const request = this.client.get(endpoint)
    this.tempStorage[endpoint] = { request, timestamp: Date.now() }
    return request
  }

  // TODO this should go away once serverSign works and nick endpoint is
  // changed
  sign(message, privateKeyBuffer) {
    if (privateKeyBuffer.type === 'Buffer') {
      privateKeyBuffer = Buffer.from(privateKeyBuffer.data)
    }
    if (typeof message === 'string') {
      message = stringToBuffer(message)
    }

    const { r, s, v } = ethUtil.ecsign(
      ethUtil.hashPersonalMessage(message),
      privateKeyBuffer
    )

    return bufferToHex(
      Buffer.concat(
        [ r, s, Buffer.from([ v ]) ]
      )
    )
  }

  serverSign(hash, privateKeyBuffer) {
    if (privateKeyBuffer.type === 'Buffer') {
      privateKeyBuffer = Buffer.from(privateKeyBuffer.data)
    }

    const { r, s, v } = ethUtil.ecsign(
      hexToBuffer(hash),
      privateKeyBuffer
    )

    return bufferToHex(
      Buffer.concat(
        [ r, s, Buffer.from([ v ]) ]
      )
    )
  }

  setNickname(addr: string, nick: string, privateKeyBuffer: string) {
    //hash the nickname
    const hashBuffer = Buffer.concat([
      hexToBuffer(addr),
      utf8ToBuffer(nick)
    ])
    const hash = bufferToHex(ethUtil.sha3(hashBuffer))
    const signature = this.serverSign(hash, privateKeyBuffer)

    delete this.tempStorage[`/nick/${addr}`]

    return this.client.post('/nick', {
      addr,
      nick,
      signature
    })
  }

  setEmail(addr: string, email: string, privateKeyBuffer: string) {
    //hash the email
    const hashBuffer = Buffer.concat([
      hexToBuffer(addr),
      utf8ToBuffer(email)
    ])
    const hash = bufferToHex(ethUtil.sha3(hashBuffer))
    const signature = this.serverSign(hash, privateKeyBuffer)

    delete this.tempStorage[`/email/${addr}`]

    return this.client.post('/email', {
      addr,
      email,
      signature
    })
  }

  setPayPal(addr: string, paypal: string, privateKeyBuffer: string) {
    //hash the paypal, including null
    const hashBuffer = Buffer.concat([
      hexToBuffer(addr),
      utf8ToBuffer(paypal)
    ])
    const hash = bufferToHex(ethUtil.sha3(hashBuffer))
    const signature = this.serverSign(hash, privateKeyBuffer)

    return this.client.post('/paypal', {
      addr,
      paypal,
      signature
    })
  }

  getConfig () {
    return this.cacheHttpRequest(`/config`, 15000)
  }

  async getUcacAddresses() {
    const config = await this.getConfig()
    return config.lndrAddresses
  }

  async getWeekAgoBlock() {
    const config = await this.getConfig()
    return config.weekAgoBlock
  }

  getBalance(user: string, currency: string) {
    return this.client.get(`/balance/${user}?currency=${currency}`)
  }

  getBalanceBetween(user: string, counterpartyAddress: string, currency: string) {
    return this.client.get(`/balance/${user}/${counterpartyAddress}?currency=${currency}`)
  }

  getCounterparties(user: string) {
    return this.client.get(`/counterparties/${user}`)
  }

  getNickname(addr: string) {
    return this.cacheHttpRequest(`/nick/${addr}`, 10000)
  }

  getEmail(addr: string) {
    return this.cacheHttpRequest(`/email/${addr}`, 10000)
  }

  getPayPal(user: string) {
    return this.cacheHttpRequest(`/paypal/${user}`, 5000)
  }

  searchUsers(nick: string) {
    return this.cacheHttpRequest(`/search_nick/${nick}`, 5000)
  }

  registerChannelID(address: string, channelID: string, platform: string, privateKeyBuffer: any) {
    const registration = this.tempStorage.registerId[channelID]
    if (registration) {
      return registration
    }

    const hashBuffer = Buffer.concat([
      utf8ToBuffer(platform),
      utf8ToBuffer(channelID),
      hexToBuffer(address)
    ])
    const hash = bufferToHex(ethUtil.sha3(hashBuffer))
    const signature = this.serverSign(hash, privateKeyBuffer)

    return this.tempStorage.registerId[channelID] = this.client.post(`/register_push`, { channelID, platform, address, signature })
  }

  deleteChannelID(address: string, channelID: string, platform: string, privateKeyBuffer: any) {
    const hashBuffer = Buffer.concat([
      utf8ToBuffer(platform),
      utf8ToBuffer(channelID),
      hexToBuffer(address)
    ])
    const hash = bufferToHex(ethUtil.sha3(hashBuffer))
    const signature = this.serverSign(hash, privateKeyBuffer)

    return this.client.post(`/unregister_push`, { channelID, platform, address, signature })
  }

  takenNick(nick: string) {
    return this.client.get(`/user?nick=${nick}`)
  }

  takenEmail(email: string) {
    return this.client.get(`/user?email=${email}`)
  }

  addFriend(user: string, addr: string/*, privateKeyBuffer: any*/) {
    delete this.tempStorage[`/friends/${user}`]
    return this.client.post(`/add_friends/${user}`, [ addr ])
    // {
    //   addr,
    //   sig: this.sign(addr, privateKeyBuffer)
    // }
  }

  removeFriend(user: string, addr: string/*, privateKeyBuffer: any*/) {
    delete this.tempStorage[`/friends/${user}`]
    return this.client.post(`/remove_friends/${user}`, [ addr ])
    // {
    //   addr,
    //   sig: this.sign(addr, privateKeyBuffer)
    // }
  }

  getFriends(user: string) {
    return this.cacheHttpRequest(`/friends/${user}`, 5000)
  }

  getFriendRequests(user: string) {
    return this.cacheHttpRequest(`/friend_requests/${user}`, 5000)
  }

  getOutboundFriendRequests(user: string) {
    return this.cacheHttpRequest(`/outbound_friend_requests/${user}`, 5000)
  }

  getPendingTransactions(user: string) {
    return this.cacheHttpRequest(`/pending/${user}`, 1000)
  }

  getPendingSettlements(user: string) {
    return this.cacheHttpRequest(`/pending_settlements/${user}`, 1000)
  }

  getNonce(address1, address2) {
    return this.client.get(`/nonce/${address1}/${address2}`)
  }

  getTransactions(user: string) {
    return this.cacheHttpRequest(`/transactions?user=${user}`, 3000)
  }

  pendingTransactions() {
    return this.cacheHttpRequest('/pending', 1000)
  }

  rejectPendingByHash(hash: string, privateKeyBuffer: any) {
    return this.client.post('/reject', {
      hash,
      signature: this.serverSign(hash, privateKeyBuffer)
    })
  }

  async createCreditRecord(ucac, address1, address2, amount, memo) {
    const nonce = await this.getNonce(address1, address2)
    return new CreditRecord(ucac, address1, address2, amount, memo, nonce)
  }

  async submitCreditRecord(creditRecord, action: string, signature, denomination?: string) {
    if (action !== 'lend' && action !== 'borrow') {
      throw new Error('Action is invalid')
    }

    const {
      ucacAddress: ucac,
      creditorAddress: creditor,
      debtorAddress: debtor,
      amount,
      memo,
      nonce
    } = creditRecord

    return this.client.post(`/${action}`, {
      ucac,
      creditor,
      debtor,
      amount,
      memo,
      submitter: action === 'lend' ? creditor : debtor,
      hash: bufferToHex(creditRecord.hash),
      nonce,
      signature,
      settlementCurrency: denomination
    })
  }

  getRandomMnemonic() {
    return new Mnemonic()
  }

  getMnemonic(mnemonic: string) {
    return new Mnemonic(mnemonic)
  }

  async settleWithERC20(transaction: ERC20_Transaction, privateKeyBuffer: any, settlementCurrency: string) {
    if (isERC20Settlement(settlementCurrency)) {
      // Send via ERC20Token transfer
      const ERC20 = getERC20_token(settlementCurrency)
      return ERC20.transfer(transaction, privateKeyBuffer)
    }

    if (transaction.from === transaction.to) {
      throw new Error('selfError')
    }
    if (privateKeyBuffer.type === 'Buffer') {
      privateKeyBuffer = Buffer.from(privateKeyBuffer.data)
    }

    const nonce = await new Promise((resolve, reject) => {
      web3.eth.getTransactionCount(`0x${transaction.from}`, (e, data) => e ? reject(e) : resolve(data))
    })

    const rawTx = {
      nonce: web3.toHex(nonce),
      gasPrice: web3.toHex(transaction.gasPrice),
      gasLimit: web3.toHex(transaction.gas),
      to: '0x' + transaction.to,
      value: web3.toHex(transaction.amount),
      from: '0x' + transaction.from
    }
    const tx = new Tx(rawTx)
    tx.sign(privateKeyBuffer)
    const serializedTx = tx.serialize()

    console.log(`TOTAL ${settlementCurrency} TO BE SENT: `, Number(transaction.amount), ', ', Number(transaction.amount) + Number(transaction.gas * transaction.gasPrice) )

    return new Promise((resolve, reject) => {
      web3.eth.sendRawTransaction(('0x' + serializedTx.toString('hex')), (e, data) => {
        if (e) {
          reject(e)
        } else {
          resolve(data)
        }
      })
    })
  }

  storeSettlementHash(txHash: any, hash: string, creditorAddress: string, privateKeyBuffer: any) {
    const hashBuffer = Buffer.concat([
      hash,
      hexToBuffer(txHash),
      hexToBuffer(creditorAddress)
    ])
    const newHash = bufferToHex(ethUtil.sha3(hashBuffer))
    const signature = this.serverSign(newHash, privateKeyBuffer)

    return this.client.post('/verify_settlement', {
      txHash,
      creditHash: bufferToHex(hash),
      creditorAddress: creditorAddress,
      signature
    })
  }

  getEthTxHash(hash: string) {
    return this.client.get(`/tx_hash/${hash}`)
  }

  async setProfilePic(imageURI: string, imageData: string, privateKeyBuffer: any) {
    if (privateKeyBuffer.type === 'Buffer') {
      privateKeyBuffer = Buffer.from(privateKeyBuffer.data)
    }

    const IMAGE_TARGET_SIZE = 240
    let resizedImageResponse, base64ImageData

    if (Platform.OS === 'android') {
      resizedImageResponse = await ImageResizer.createResizedImage(imageURI, IMAGE_TARGET_SIZE, IMAGE_TARGET_SIZE, "JPEG", 100, 0)
      base64ImageData = await RNFetchBlob.fs.readFile(resizedImageResponse.path, 'base64')
    } else {
      resizedImageResponse = await ImageResizer.createResizedImage(`data:image/jpg;jpeg;base64,${imageData}`, IMAGE_TARGET_SIZE, IMAGE_TARGET_SIZE, "JPEG", 100, 0)
      base64ImageData = await RNFetchBlob.fs.readFile(resizedImageResponse.path, 'base64')
    }

    const signature = this.serverSign(ethUtil.sha3(base64ImageData), privateKeyBuffer)
    await this.client.post(`/profile_photo`, {
      image: base64ImageData,
      signature: signature
    })
    return `data:image/jpg;jpeg;base64,${base64ImageData}`
  }

  async fiatToEth(amount: number, currency: string) {
    const conversionRate = await this.getEthExchange(currency)
    if(hasNoDecimals(currency)) {
      return Number(amount) / Number(conversionRate)
    } else {
      return Number(amount) / 100 / Number(conversionRate)
    }
  }

  async getSettlementCost(amount: number, currency: string) {
    const settlementAmount = await this.fiatToEth(amount, currency)
    const transactionCost = await this.getGasPrice()
    return settlementAmount + ( Number(transactionCost) / WEI_PER_ETH )
  }

  async getGasPrice() {
    const config = await this.getConfig()
    return config.gasPrice
  }

  async getTransactionCosts(currency: string, gasNeeded: number) : Promise<TransactionCosts> {
    try {
      const gasPrice = await this.getGasPrice()
      const rate = await this.getEthExchange(currency)
      const weiCost = gasPrice * gasNeeded
      const ethCost = weiCost / WEI_PER_ETH
      const currencyCost = Math.max( 0.01, ethCost * Number(rate) )

      return {
        ethCost,
        ethCostFormatted: `${ethCost}`.slice(0,7),
        currencyCost,
        currencyCostFormatted: `${currencySymbols(currency)}${formatSettlementCurrencyAmount(String(currencyCost), false)}`,
        weiCost
      }
    } catch (e) {
      console.log('ERROR TRANSACTION COSTS', e)
    }

    return defaultTransactionCosts()
  }

  async getERC20EthPrice(tokenName: string) {
    const prices = await this.getERC20EthPrices()
    return prices[tokenName]
  }

  async getERC20EthPrices() {
    const config = await this.getConfig()
    return config.erc20EthereumPrices
  }

  async getEthExchange(currency: string) {
    const prices = await this.getEthPrices()
    return prices[currency.toLowerCase()] === undefined ? '0' : prices[currency.toLowerCase()]
  }

  async getEthPrices() {
    const config = await this.getConfig()
    return config.ethereumPrices
  }

  async ethToFiat(eth, currency) {
    const exchange = await this.getEthExchange(currency)
    const fiat = String(Number(eth) * Number(exchange))

    if (hasNoDecimals(currency)) {
      const decimalIndex = fiat.indexOf('.')
      return fiat.slice(0, decimalIndex)
    } else {
      const decimalIndex = fiat.indexOf('.')
      if (decimalIndex === -1) {
        return `${fiat}.00`
      }
      return fiat.slice(0, decimalIndex + 3)
    }
  }

  submitMultiSettlement(transactions: Object[]) {
    return this.client.post('/multi_settlement', transactions)
  }

  requestPayPalSettlement(friend: string, requestor: string, privateKeyBuffer: any) {
    const hashBuffer = Buffer.concat([
      hexToBuffer(friend),
      hexToBuffer(requestor)
    ])
    const hash = bufferToHex(ethUtil.sha3(hashBuffer))
    const paypalRequestSignature = this.serverSign(hash, privateKeyBuffer)
    return this.client.post('/request_paypal', { friend, requestor, paypalRequestSignature })
  }

  retrievePayPalSettlementRequests(addr: string) {
    return this.cacheHttpRequest(`/request_paypal/${addr}`, 3000)
  }

  deletePayPalSettlementRequest(friend: string, requestor: string, privateKeyBuffer: any) {
    const hashBuffer = Buffer.concat([
      hexToBuffer(friend),
      hexToBuffer(requestor)
    ])
    const hash = bufferToHex(ethUtil.sha3(hashBuffer))
    const paypalRequestSignature = this.serverSign(hash, privateKeyBuffer)

    return this.client.post('/remove_paypal_request', { friend, requestor, paypalRequestSignature })
  }

  // Verify Lndr
  submitKYC(kyc: KYC, privateKeyBuffer: any) {
    const { externalUserId } = kyc
    const hashBuffer = Buffer.concat([
      hexToBuffer(externalUserId)
    ])
    const hash = bufferToHex(ethUtil.sha3(hashBuffer))
    const identitySignature = this.serverSign(hash, privateKeyBuffer)
    kyc.identitySignature = identitySignature
    console.log('ABOUT TO SEND ', kyc)
    return this.client.post('/verify_identity', kyc)
  }

  getKYCStatus(user: string, privateKeyBuffer: any) {
    const hashBuffer = Buffer.concat([
      hexToBuffer(user)
    ])
    const hash = bufferToHex(ethUtil.sha3(hashBuffer))
    const verificationStatusSignature = this.serverSign(hash, privateKeyBuffer)
    return this.client.post('/check_verification_status', { user, verificationStatusSignature })
  }
}
