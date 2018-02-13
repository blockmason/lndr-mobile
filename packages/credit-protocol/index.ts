// This file is over 50 lines of code and needs to be broken up
declare const Buffer

import Mnemonic from 'bitcore-mnemonic'
import ethUtil from 'ethereumjs-util'

import { hexToBuffer, utf8ToBuffer, bufferToHex, stringToBuffer } from './lib/buffer-utils'
import Client from './lib/client'
import CreditRecord from './lib/credit-record'
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

  getBalance(user: string) {
    return this.client.get(`/balance/${user}`)
  }

  getBalanceBetween(user: string, counterpartyAddress: string) {
    return this.client.get(`/balance/${user}/${counterpartyAddress}`)
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
      creditorAddress: creditor,
      debtorAddress: debtor,
      amount,
      memo,
      nonce
    } = creditRecord

    return this.client.post(`/${action}`, {
      creditor: creditor,
      debtor: debtor,
      amount: amount,
      memo: memo,
      submitter: action === 'lend' ? creditor : debtor,
      hash: bufferToHex(creditRecord.hash),
      nonce: nonce,
      signature: signature
    })
  }

  async submitSettlementRecord(creditRecord, action, signature, denomination) {
    if (action !== 'lend' && action !== 'borrow') {
      throw new Error('Action is invalid')
    }

    const {
      creditorAddress: creditor,
      debtorAddress: debtor,
      amount,
      memo,
      nonce
    } = creditRecord

    return this.client.post(`/${action}`, {
      creditor: creditor,
      debtor: debtor,
      amount: amount,
      memo: memo,
      submitter: action === 'lend' ? creditor : debtor,
      hash: bufferToHex(creditRecord.hash),
      nonce: nonce,
      signature: signature,
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

    console.log('TOTAL ETH TO BE SETTLED: ', Number(transaction.value) + Number(transaction.gas * transaction.gasPrice) )
    
    return new Promise((resolve, reject) => {
      web3.eth.sendRawTransaction(('0x' + serializedTx.toString('hex')), (e, data) => e ? reject(e) : resolve(data))
    })
  }

  storeSettlementHash(txHash: any, settlement: any, privateKeyBuffer: any) {
    const hashBuffer = Buffer.concat([
      hexToBuffer(settlement.hash),
      hexToBuffer(txHash),
      hexToBuffer(settlement.creditorAddress)
    ])
    const hash = bufferToHex(ethUtil.sha3(hashBuffer))
    const signature = this.serverSign(hash, privateKeyBuffer)

    return this.client.post('/verify_settlement', {
      txHash,
      creditHash: settlement.hash,
      creditorAddress: settlement.creditorAddress,
      signature
    })
  }

  getEthTxHash(hash: string) {
    return this.client.get(`/tx_hash/${hash}`)
  }
}

function web3AsyncWrapper (web3Fun) {
  return function (arg) {
    return new Promise((resolve, reject) => {
      web3Fun(arg, (e, data) => e ? reject(e) : resolve(data))
    })
  }
}
