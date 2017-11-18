export default class Balance {
  relativeTo: string
  relativeToNickname: string
  amount: number

  constructor(data) {
    const { relativeTo, relativeToNickname, amount } = data

    this.relativeTo = relativeTo
    this.relativeToNickname = relativeToNickname
    this.amount = amount
  }
}
