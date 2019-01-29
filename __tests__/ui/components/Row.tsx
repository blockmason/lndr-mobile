import 'react-native'
import React from 'react'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

import Row from 'ui/components/row'
import Friend from 'lndr/friend'


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
  it('renders correctly', () => {

    const tree = renderer.create(
      <Row 
        onPress={() => null}
        friend
        picId=""
        content={new Friend('', '')}
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
