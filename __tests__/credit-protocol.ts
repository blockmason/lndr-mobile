import 'react-native'

// Note: test renderer must be required after react-native.

import CreditProtocol from 'credit-protocol'

jest.mock('react-native-fetch-blob', () => {
  return {
    fs: {
      dirs: {
        MainBundleDir: () => {},
        CacheDir: () => {},
        DocumentDir: () => {},
      },
    },
    DocumentDir: () => {},
    fetch: () => {},
    base64: () => {},
    android: () => {},
    ios: () => {},
    config: () => {},
    session: () => {},
    wrap: () => {},
    polyfill: () => {},
    JSONStream: () => {}
  }
})

describe('Initialization', () => {
  it('initializes successfully', () => {
    const creditProtocol = new CreditProtocol('https://api.lndr.blockmason.io')
    expect(creditProtocol.tempStorage.registerId).toEqual({})
  })
})
