import 'react-native'

// Note: test renderer must be required after react-native.
jest.mock('urbanairship-react-native', () => jest.fn())
jest.mock('ethereumjs-util', () => jest.fn())
jest.mock('moment', () => jest.fn())
jest.mock('credit-protocol/lib/buffer-utils', () => jest.fn())
jest.mock('lndr/balance', () => jest.fn())
jest.mock('lndr/user', () => jest.fn())
jest.mock('lndr/friend', () => jest.fn())
jest.mock('lndr/pending-transaction', () => jest.fn())
jest.mock('lndr/recent-transaction', () => jest.fn())
jest.mock('lndr/pending-unilateral', () => jest.fn())
jest.mock('lndr/pending-bilateral', () => jest.fn())
jest.mock('lndr/eth-transaction', () => jest.fn())
jest.mock('lndr/bcpt-transaction', () => jest.fn())
jest.mock('lndr/storage', () => jest.fn())
jest.mock('lndr/settlement', () => jest.fn())
jest.mock('lndr/touch-id', () => jest.fn())
jest.mock('react-native-touch-id', () => jest.fn())
jest.mock('lndr/profile-pic', () => jest.fn())
jest.mock('lndr/bcpt-utils', () => jest.fn())
jest.mock('lndr/etherscan', () => jest.fn())
jest.mock('lndr/format', () => jest.fn())
jest.mock('lndr/json-mapping', () => jest.fn())
jest.mock('credit-protocol', () => jest.fn())
jest.mock('language', () => jest.fn())
jest.mock('react-native-redux-toast', () => jest.fn())
jest.mock('reducers/app', () => jest.fn())
jest.mock('lndr/currencies', () => jest.fn())

import { storeUserSession } from 'actions'
import User from 'lndr/user'

const testUser = new User('mnemonic', 'hashedPassword', 'privateKey', 'privateKeyBuffer', 'ethAddress', 'address',
  'nickname', 'email', 100)

describe('Initialization', () => {
  it('Stores the user session', () => {
    storeUserSession(testUser)
  })
})
