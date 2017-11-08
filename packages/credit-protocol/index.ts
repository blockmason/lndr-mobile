// This file is over 50 lines of code and needs to be broken up

import Mnemonic from 'bitcore-mnemonic'

import Client from './lib/client'
import CreditRecord from './lib/credit-record'

export default class CreditProtocol {
  client: Client

  constructor(baseUrl: string, fetch?: any) {
    this.client = new Client(baseUrl, fetch)
  }

  getNonce(address1, address2) {
    return this.client.get(`/nonce/${address1}/${address2}`)
  }

  pendingTransactions() {
    return this.client.get(`/pending`)
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
