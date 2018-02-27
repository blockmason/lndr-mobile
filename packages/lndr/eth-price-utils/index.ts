declare const global

import FetchUtil from 'lndr/fetch-util'

const fetchUtil = new FetchUtil(fetch)

const tempStorage = {
  ethExchange: '',
  gasPrice: 0
}

export const usdToEth = async (usd: number) => {
  const rates = await fetchUtil.get('https://api.coinbase.com/v2/exchange-rates?currency=ETH')
  const conversionRate = rates.data.rates.USD
  return Number(usd) / 100 / Number(conversionRate)
}

export const settlementCost = async (usd: number) => {
  const settlementAmount = await usdToEth(usd)
  const transactionCost = await getGasPrice()
  return settlementAmount + ( Number(transactionCost) / Math.pow(10, 18) )
}

export const getGasPrice = async () => {
  if (tempStorage.gasPrice) {
    return tempStorage.gasPrice
  }
  const prices = await fetchUtil.get('https://ethgasstation.info/json/ethgasAPI.json')
  return tempStorage.gasPrice = prices.safeLow * 1.3 * Math.pow(10, 8)
}

export const getTxCost = async (currency: string) => {
  try {
    const gasPrice = await getGasPrice()
    const rate = await getEthExchange(currency)
    return `${gasPrice * Number(rate) * 21000 / Math.pow(10, 18)}`.slice(0,6)
  } catch (e) {}

  return '0.00'
}

export const getEthExchange = async (currency: string) => {
  if (tempStorage.ethExchange) {
    return tempStorage.ethExchange
  }
  const rates = await fetchUtil.get('https://api.coinbase.com/v2/exchange-rates?currency=ETH')
  return tempStorage.ethExchange = rates.data.rates[currency]
}

export const ethToFiat = (eth, exchange, currency) => {
  const fiat = String(Number(eth) * Number(exchange))

  if (currency === 'USD') {
    const decimalIndex = fiat.indexOf('.')
    if (decimalIndex === -1) {
      return `${fiat}.00`
    }
    return fiat.slice(0, decimalIndex + 3)

  } else {
    const decimalIndex = fiat.indexOf('.')
    return fiat.slice(0, decimalIndex)
  }
}
