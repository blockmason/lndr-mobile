// tx - Object: The transaction object as follows:
// from - String: The sender of the transaction
// to - String: The receiver of the transaction
// amount - number: The amount of the transaction in units of the token * 10^decimals
//    e.g. if the token decimals is 18 (Wei), amount is units*10^18 (amount is in Wei)
// gasPrice - number: The gas price set by this transaction
// gas - number: The gas provided by the transaction.

export default class ERC20_Transaction {
  from: string
  to: string
  amount: number
  gasPrice: number
  gas: number

  constructor(from: string, to: string, amount: number, gasPrice: number, gas: number) {
    if (typeof from === 'string' && from.substr(0, 2) === '0x') {
      from = from.substr(2)
    }
    if (typeof to === 'string' && to.substr(0, 2) === '0x') {
      to = to.substr(2)
    }
    this.from = from
    this.to = to
    this.amount = amount
    this.gasPrice = gasPrice
    this.gas = gas
  }
}
