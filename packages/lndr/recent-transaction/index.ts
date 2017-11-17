//Using transactions?values={x}
export default class RecentTransaction {
  debtor: string
  creditor: string
  amount: number
  ucac: string
  doesUserOweFriend: boolean
  friendAddress: string

  constructor (address, elem) {
    const { creditor, debtor, amount, ucac } = elem
    const doesUserOweFriend = address === debtor

    this.creditor = creditor
    this.debtor = debtor
    this.amount = amount
    this.ucac = ucac
    this.doesUserOweFriend = doesUserOweFriend
    this.friendAddress = doesUserOweFriend ? creditor : debtor
  }
}
