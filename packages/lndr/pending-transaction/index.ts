import { CreditRecord } from 'credit-protocol'

import ucac from 'lndr/ucac'

export default class PendingTransaction {
  creditRecord: CreditRecord
  submitter: string
  hash: string

  constructor(data) {
    const { creditRecord: { creditor, debtor, amount, memo, nonce }, submitter, hash } = data
    this.creditRecord = new CreditRecord(ucac, creditor, debtor, amount, memo, 0)
    this.submitter = submitter
    this.hash = hash
  }
}
