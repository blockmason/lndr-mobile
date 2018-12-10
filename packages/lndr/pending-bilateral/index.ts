import { CreditRecord } from 'credit-protocol'

export default class PendingBilateral {
  creditorNickname: string
  debtorNickname: string
  submitter: string
  creditRecord: CreditRecord
  txHash?: string
  settlementAmount: number
  settlementBlocknumber: number
  settlementCurrency: string
  multiSettlements?: PendingBilateral[]

  constructor(data) {
    const { txHash } = data
    const { creditor, debtor, amount, memo, nonce, ucac, submitter, hash, settlementAmount, settlementCurrency, settlementBlocknumber, multiSettlements } = data.creditRecord
    this.submitter = submitter.replace('0x', '')
    this.creditRecord = new CreditRecord(ucac, creditor, debtor, amount, memo, nonce, hash)
    this.txHash = txHash
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

  get hash() {
    return this.creditRecord.hash
  }
}
