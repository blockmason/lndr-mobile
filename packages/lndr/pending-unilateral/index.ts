import { CreditRecord } from 'credit-protocol'

export default class PendingUnilateral {
  creditorNickname: string
  debtorNickname: string
  creditRecord: CreditRecord
  submitter: string
  hash: string
  settlementAmount: number
  settlementBlocknumber: number
  settlementCurrency: string
  multiSettlements?: PendingUnilateral[]

  constructor(data) {
    const { creditor, debtor, amount, memo, nonce, ucac, submitter, hash, settlementAmount, settlementCurrency, settlementBlocknumber, multiSettlements } = data
    this.creditRecord = new CreditRecord({ ucacAddress: ucac, creditorAddress: creditor, debtorAddress: debtor, amount, memo, nonce: 0, fromLink: false, hash })
    this.submitter = submitter.replace('0x', '')
    this.hash = hash
    this.settlementAmount = settlementAmount
    this.settlementBlocknumber = settlementBlocknumber
    this.settlementCurrency = settlementCurrency
    this.multiSettlements = multiSettlements
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
