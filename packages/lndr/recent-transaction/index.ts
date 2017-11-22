//Using transactions?values={x}
export default class RecentTransaction {
  debtorAddress: string
  debtorNickname: string
  creditorAddress: string
  creditorNickname: string
  amount: number
  ucac: string
  memo: string

  constructor ({ creditor, debtor, amount, ucac, memo }) {
    this.creditorAddress = creditor.replace('0x', '')
    this.debtorAddress = debtor.replace('0x', '')
    this.amount = amount
    this.ucac = ucac.replace('0x', '')
    this.memo = memo
  }
}
