import 'react-native'

// Note: test renderer must be required after react-native.

import Balance from 'lndr/balance'

describe('Initialization', () => {
  it('Should create a Balance object with correct attributes', () => {
    const myBalance = new Balance({ relativeTo: '9e93904684923', relativeToNickname: 'Bob', amount: 1000 })
    expect(myBalance.relativeTo).toBe('9e93904684923')
    expect(myBalance.relativeToNickname).toBe('Bob')
    expect(myBalance.amount).toBe(1000)
  })
})
