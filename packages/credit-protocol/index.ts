// This file is over 50 lines of code and needs to be broken up
declare const Buffer

import Mnemonic from 'bitcore-mnemonic'
import ethUtil from 'ethereumjs-util'
import RNFetchBlog from 'react-native-fetch-blob'
import ImageResizer from 'react-native-image-resizer'
import { Platform } from 'react-native'

import { hexToBuffer, utf8ToBuffer, bufferToHex, stringToBuffer } from './lib/buffer-utils'
import Client from './lib/client'
import CreditRecord from './lib/credit-record'
import { storeEthTransaction } from 'actions'
export { default as CreditRecord } from './lib/credit-record'

import FetchUtil from 'lndr/fetch-util'
import EthTransaction from 'lndr/eth-transaction'
import Tx from 'ethereumjs-tx'
import Web3 from 'web3'

const fetchUtil = new FetchUtil(fetch)
const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/EoLr1OVfUMDqq3N2KaKA'))

export default class CreditProtocol {
  client: Client
  tempStorage: any

  constructor(baseUrl: string, fetch?: any) {
    this.client = new Client(baseUrl, fetch)
    this.tempStorage = {
      nicknames: {},
      emails: {},
      registerId: {},
      searchUsers: {}
    }
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

    return this.client.post('/email', {
      addr,
      email,
      signature
    })
  }

  getConfig () {
    if (this.tempStorage.config) {
      return this.tempStorage.config
    }
    return this.tempStorage.config = this.client.get(`/config`)
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

  getNickname(user: string) {
    const nickname = this.tempStorage.nicknames[user]
    if (nickname) {
      return nickname
    }
    return this.tempStorage.nicknames[user] = this.client.get(`/nick/${user}`)
  }

  getEmail(user: string) {
    const email = this.tempStorage.emails[user]
    if (email) {
      return email
    }
    return this.tempStorage.emails[user] = this.client.get(`/email/${user}`)
  }

  searchUsers(nick: string) {
    const nickname = this.tempStorage.searchUsers[nick]
    if (nickname) {
      return nickname
    }
    return this.tempStorage.searchUsers[nick] = this.client.get(`/search_nick/${nick}`)
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

  takenNick(nick: string) {
    return this.client.get(`/user?nick=${nick}`)
  }

  takenEmail(email: string) {
    return this.client.get(`/user?email=${email}`)
  }

  addFriend(user: string, addr: string/*, privateKeyBuffer: any*/) {
    delete this.tempStorage.getFriends
    return this.client.post(`/add_friends/${user}`, [ addr ])
    // {
    //   addr,
    //   sig: this.sign(addr, privateKeyBuffer)
    // }
  }

  removeFriend(user: string, addr: string/*, privateKeyBuffer: any*/) {
    delete this.tempStorage.getFriends
    return this.client.post(`/remove_friends/${user}`, [ addr ])
    // {
    //   addr,
    //   sig: this.sign(addr, privateKeyBuffer)
    // }
  }

  getFriends(user: string) {
    const friendsPromise = this.tempStorage.getFriends
    if (friendsPromise) {
      return friendsPromise
    }
    return this.tempStorage.getFriends = this.client.get(`/friends/${user}`)
  }

  getPendingTransactions(user: string) {
    return this.client.get(`/pending/${user}`)
  }

  getPendingSettlements(user: string) {
    return this.client.get(`/pending_settlements/${user}`)
  }

  getNonce(address1, address2) {
    return this.client.get(`/nonce/${address1}/${address2}`)
  }

  getTransactions(user: string) {
    return this.client.get(`/transactions?user=${user}`)
  }

  pendingTransactions() {
    return this.client.get('/pending')
  }

  rejectPendingTransactionByHash(hash: string, privateKeyBuffer: any) {
    return this.client.post('/reject', {
      hash,
      signature: this.serverSign(hash, privateKeyBuffer)
    })
  }

  rejectPendingSettlementByHash(hash: string, privateKeyBuffer: any) {
    return this.client.post('/reject', {
      hash,
      signature: this.serverSign(hash, privateKeyBuffer)
    })
  }

  async createCreditRecord(ucac, address1, address2, amount, memo) {
    const nonce = await this.getNonce(address1, address2)
    return new CreditRecord(ucac, address1, address2, amount, memo, nonce)
  }

  async submitCreditRecord(creditRecord, action, signature) {
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
      signature
    })
  }

  async submitSettlementRecord(creditRecord, action, signature, denomination) {
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

  async settleWithEth(transaction: EthTransaction, privateKeyBuffer: any) {
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
      value: web3.toHex(transaction.value),
      from: '0x' + transaction.from
    }
    const tx = new Tx(rawTx)
    tx.sign(privateKeyBuffer)
    const serializedTx = tx.serialize()

    console.log('TOTAL ETH TO BE SENT: ', Number(transaction.value) + Number(transaction.gas * transaction.gasPrice) )
    
    return new Promise((resolve, reject) => {
      web3.eth.sendRawTransaction(('0x' + serializedTx.toString('hex')), (e, data) => {
        if (e) {
          reject(e)
        } else {
          storeEthTransaction({
            amount: transaction.value,
            user: transaction.from,
            time: Date.now()
          })
          resolve(data)
        }
      })
    })
  }

  storeSettlementHash(txHash: any, settlement: any, privateKeyBuffer: any) {
    const hashBuffer = Buffer.concat([
      settlement.creditRecord.hash,
      hexToBuffer(txHash),
      hexToBuffer(settlement.creditorAddress)
    ])
    const hash = bufferToHex(ethUtil.sha3(hashBuffer))
    const signature = this.serverSign(hash, privateKeyBuffer)

    return this.client.post('/verify_settlement', {
      txHash,
      creditHash: bufferToHex(settlement.creditRecord.hash),
      creditorAddress: settlement.creditorAddress,
      signature
    })

  }

  getEthTxHash(hash: string) {
    return this.client.get(`/tx_hash/${hash}`)
  }

  async setProfilePic(imageURI: string, privateKeyBuffer: any) {
    if (privateKeyBuffer.type === 'Buffer') {
      privateKeyBuffer = Buffer.from(privateKeyBuffer.data)
    }

    const IMAGE_TARGET_SIZE = 240
    const resizedImageResponse = await ImageResizer.createResizedImage(imageURI, IMAGE_TARGET_SIZE, IMAGE_TARGET_SIZE, "JPEG", 100, 0)
    
    let base64ImageData

    if (Platform.OS === 'ios') {
      base64ImageData = await RNFetchBlog.fs.readFile(imageURI, 'base64')
    } else {
      base64ImageData = await RNFetchBlog.fs.readFile(resizedImageResponse.uri, 'base64')
    }

    const signature = this.serverSign(ethUtil.sha3(base64ImageData), privateKeyBuffer)

    await this.client.post(`/profile_photo`, {
      image: base64ImageData,
      signature: signature
    })
    return `data:image/jpg;base64,${base64ImageData}`
  }

  async fiatToEth(amount: number, currency: string) {
    const conversionRate = await this.getEthExchange(currency)
    if(currency === 'USD') {
      return Number(amount) / 100 / Number(conversionRate)
    } else {
      return Number(amount) / Number(conversionRate)
    }
  }
  
  async getSettlementCost(amount: number, currency: string) {
    const settlementAmount = await this.fiatToEth(amount, currency)
    const transactionCost = await this.getGasPrice()
    return settlementAmount + ( Number(transactionCost) / Math.pow(10, 18) )
  }
  
  async getGasPrice() {
    const config = await this.getConfig()
    return config.gasPrice
  }
  
  async getTxCost(currency: string) {
    try {
      const gasPrice = await this.getGasPrice()
      const rate = await this.getEthExchange(currency)
      return `${gasPrice * Number(rate) * 21000 / Math.pow(10, 18)}`.slice(0,6)
    } catch (e) {}
  
    return '0.00'
  }
  
  async getEthExchange(currency: string) {
    const config = await this.getConfig()
    return config.ethereumPrices[currency.toLowerCase()]
  }
  
  async ethToFiat(eth, currency) {
    const exchange = await this.getEthExchange(currency)
    const fiat = String(Number(eth) * Number(exchange))
  
    if (currency === 'USD') {
      const decimalIndex = fiat.indexOf('.')
      if (decimalIndex === -1) {
        return `${fiat}.00`
      }
      return fiat.slice(0, decimalIndex + 3)
  
    } else {
      const decimalIndex = fiat.indexOf('.')
      return fiat.slice(0, decimalIndex)
    }
  }
}
