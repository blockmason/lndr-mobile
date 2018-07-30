import { CreditRecord } from 'credit-protocol'

export default class PendingTransaction {
  creditorNickname: string
  debtorNickname: string
  creditRecord: CreditRecord
  submitter: string
  hash: string
  settlementCurrency: string
  multiTransactions?: PendingTransaction[]

  constructor(data) {
    const { creditor, debtor, amount, memo, nonce, ucac, submitter, hash, multiTransactions, settlementCurrency } = data
    this.creditRecord = new CreditRecord(ucac, creditor, debtor, amount, memo, 0)
    this.submitter = submitter.replace('0x', '')
    this.hash = hash
    this.multiTransactions = multiTransactions
    this.settlementCurrency = typeof settlementCurrency === 'string' ? settlementCurrency.trim() : settlementCurrency
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

  get ucac() {
    return this.creditRecord.ucacAddress
  }
}
