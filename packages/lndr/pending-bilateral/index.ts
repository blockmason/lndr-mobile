import { CreditRecord } from 'credit-protocol'

import ucac from 'lndr/ucac'

export default class PendingBilateral {
  creditorNickname: string
  debtorNickname: string
  submitter: string
  creditRecord: CreditRecord
  txHash?: string
  settlementAmount: number
  settlementBlocknumber: number
  settlementCurrency: string

  constructor(data) {
    const { creditor, debtor, amount, memo, nonce , submitter, hash, settlementAmount, settlementCurrency, settlementBlocknumber } = data.creditRecord
    this.creditRecord = new CreditRecord(ucac, creditor, debtor, amount, memo, nonce)
    this.txHash = data.txHash
    this.submitter = submitter.replace('0x', '')
    this.settlementAmount = settlementAmount
    this.settlementBlocknumber = settlementBlocknumber
    this.settlementCurrency = settlementCurrency
  }

  get creditorAddress() {
    return this.creditRecord.creditorAddress
  }

  get debtorAddress() {
    return this.creditRecord.debtorAddress
  }

  get amount() {
    return this.creditRecord.amount
  }

  get memo() {
    return this.creditRecord.memo
  }
}
