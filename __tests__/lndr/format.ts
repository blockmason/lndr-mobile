import 'react-native'

// Note: test renderer must be required after react-native.

import { commas, amountFormat, formatEthToFiat, formatCommaDecimal, formatSettlementAmount, formatMemo, formatEthRemaining,
  cleanFiatAmount } from 'lndr/format'
import { getEthExchange } from 'reducers/app';

describe('commas', () => {
  it('Applies the correct number of commas to a USD amount', () => {
    expect(commas('1000')).toBe('1,000')
    expect(commas('532')).toBe('532')
  })
})

describe('amountFormat', () => {
  it('Formats an amount correctly', () => {
    expect(amountFormat('1000', 'USD', false)).toBe('US$1,000')
    expect(amountFormat('1000.1', 'INR', false)).toBe('₹1,000.1')
    expect(amountFormat('1,000.1', 'THB', true)).toBe('฿1,000.10')
    expect(amountFormat('1,0100.10', 'TRY', false)).toBe('₺10,100.10')
  })
})

describe('formatEthToFiat', () => {
  it('Formats an ETH amount correctly', () => {
    expect(formatEthToFiat('2', '100.10', 'USD')).toBe(` (US$200.20)`)
    expect(formatEthToFiat('2', '100.10121242', 'USD')).toBe(` (US$200.20)`)
  })
})

describe('formatSettlementAmount', () => {
  it('Formats an ETH amount correctly', () => {
    expect(formatSettlementAmount('110', 'USD')).toBe('US$1.10')
    expect(formatSettlementAmount('210', 'USD')).toBe('US$2.10')
    expect(formatSettlementAmount('410', 'USD')).toBe('US$4.10')
    expect(formatSettlementAmount('311', 'USD')).toBe('US$3.11')
  })
})

describe('formatMemo', () => {
  it('Formats a memo to 32 bytes', () => {
    expect(formatMemo('this is far too long and I dont understand why it should be this long')).toBe('this is far too long and I dont ')
    expect(formatMemo('just right')).toBe('just right')
  })
})

describe('formatEthRemaining', () => {
  function getEthExchange() {
    return 400
  }

  it('should return the correct amount of transfer capacity remaining', () => {
    expect(formatEthRemaining(getEthExchange, 0.123432, 'USD')).toBe('150.62')
  })
})

describe('cleanFiatAmount', () => {
  it('should return an amount in number format', () => {
    expect(cleanFiatAmount('CA$1.21')).toBe(1.21)
    expect(cleanFiatAmount('CA$.')).toBe(0)
  })
})
