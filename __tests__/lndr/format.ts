import 'react-native'

// Note: test renderer must be required after react-native.

import { commas, amountFormat, formatEthToFiat, formatCommaDecimal, formatSettlementAmount, formatMemo, formatEthRemaining } from 'lndr/format'
import { getEthExchange } from 'reducers/app';

describe('commas', () => {
  it('Applies the correct number of commas to a USD amount', () => {
    expect(commas('1000')).toBe('1,000')
    expect(commas('532')).toBe('532')
  })
})

describe('amountFormat', () => {
  it('Formats an amount correctly', () => {
    expect(amountFormat('1000', 'USD')).toBe('US$1,000')
    expect(amountFormat('1000.10', 'INR')).toBe('₹1,000.10')
    expect(amountFormat('1,000.10', 'THB')).toBe('฿1,000.10')
    expect(amountFormat('1,0100.10', 'TRY')).toBe('₺10,100.10')
  })
})

describe('formatEthToFiat', () => {
  it('Formats an ETH amount correctly', () => {
    expect(formatEthToFiat('2', '100.10', 'USD')).toBe(` (US$200.20)`)
  })
})

describe('formatSettlementAmount', () => {
  it('Formats an ETH amount correctly', () => {
    expect(formatSettlementAmount('2', 110, 'USD')).toBe('US$1.10')
    expect(formatSettlementAmount('1', 210, 'USD')).toBe('US$2.10')
    expect(formatSettlementAmount('410', 410, 'USD')).toBe('US$4.10')
    expect(formatSettlementAmount('3.11', 311, 'USD')).toBe('US$3.11')
  })
})

describe('formatMemo', () => {
  it('Formats a memo to 32 bytes', () => {
    expect(formatMemo('this is far too long and I dont understand why it should be this long')).toBe('this is far too long and I dont ')
    expect(formatMemo('just right')).toBe('just right')
  })
})

describe('formatEthRemaining', () => {
  function getEthExchange(currency) {
    return 400
  }

  it('should return the correct amount of transfer capacity remaining', () => {
    expect(formatEthRemaining(getEthExchange, 0.123432, 'USD')).toBe('150.62')
  })
})
