// This file is over 50 lines of code and needs to be broken up
declare const Buffer

import Mnemonic from 'bitcore-mnemonic'
import ethUtil from 'ethereumjs-util'

import { hexToBuffer, bufferToHex, stringToBuffer } from './lib/buffer-utils'
import Client from './lib/client'
import CreditRecord from './lib/credit-record'
export { default as CreditRecord } from './lib/credit-record'

export default class CreditProtocol {
  client: Client

  constructor(baseUrl: string, fetch?: any) {
    this.client = new Client(baseUrl, fetch)
  }

  // TODO this should go away once serverSign works and nick endpoint is
  // changed
  sign(message, privateKeyBuffer) {
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

  setNickname(addr: string, nick: string, privateKeyBuffer: any) {
    return this.client.post('/nick', {
      addr,
      nick,
      sig: this.sign(nick, privateKeyBuffer)
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
    return this.client.get(`/nick/${user}`)
  }

  searchUsers(nick: string) {
    return this.client.get(`/search_nick/${nick}`)
  }

  registerChannelID(user: string, channelID: string, platform: string) {
    return this.client.post(`/register_push/${user}`, { channelID, platform })
  }

  takenNick(nick: string) {
    return this.client.get(`/taken_nick/${nick}`)
  }

  addFriend(user: string, addr: string/*, privateKeyBuffer: any*/) {
    return this.client.post(`/add_friends/${user}`, [ addr ])
    // {
    //   addr,
    //   sig: this.sign(addr, privateKeyBuffer)
    // }
  }

  removeFriend(user: string, addr: string/*, privateKeyBuffer: any*/) {
    return this.client.post(`/remove_friends/${user}`, [ addr ])
    // {
    //   addr,
    //   sig: this.sign(addr, privateKeyBuffer)
    // }
  }

  getFriends(user: string) {
    return this.client.get(`/friends/${user}`)
  }

  getPendingTransactions(user: string) {
    return this.client.get(`/pending/${user}`)
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
      rejectSig: this.serverSign(hash, privateKeyBuffer)
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

  getRandomMnemonic() {
    return new Mnemonic()
  }

  getMnemonic(mnemonic: string) {
    return new Mnemonic(mnemonic)
  }
}
