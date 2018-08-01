import 'react-native'

// Note: test renderer must be required after react-native.

import { commas, amountFormat } from 'lndr/format'

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
