// This file is over 50 lines of code and needs to be broken up
declare const Buffer

import Mnemonic from 'bitcore-mnemonic'
import ethUtil from 'ethereumjs-util'

import { bufferToHex, stringToBuffer } from './lib/buffer-utils'
import Client from './lib/client'
import CreditRecord from './lib/credit-record'

export default class CreditProtocol {
  client: Client

  constructor(baseUrl: string, fetch?: any) {
    this.client = new Client(baseUrl, fetch)
  }

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

  setNickname(addr: string, nick: string, privateKeyBuffer: any) {
    return this.client.post('/nick', {
      addr,
      nick,
      sig: this.sign(nick, privateKeyBuffer)
    })
  }

  getNonce(address1, address2) {
    return this.client.get(`/nonce/${address1}/${address2}`)
  }

  pendingTransactions() {
    return this.client.get('/pending')
  }

  async createCreditRecord(ucac, address1, address2, amount, memo) {
    const nonce = await this.getNonce(address1, address2)
    return new CreditRecord(ucac, address1, address2, amount, memo, nonce)
  }

  async submitCreditRecord(creditRecord, type, signature) {
    if (type !== 'lend' && type !== 'borrow') {
      throw new Error('Type is invalid')
    }

    const {
      creditorAddress: creditor,
      debtorAddress: debtor,
      amount,
      memo
    } = creditRecord

    return this.client.post(`/${type}`, {
      creditor,
      debtor,
      amount,
      memo,
      signature
    })
  }

  getRandomMnemonic() {
    return new Mnemonic()
  }

  getMnemonic(mnemonic: string) {
    return new Mnemonic(mnemonic)
  }
}
