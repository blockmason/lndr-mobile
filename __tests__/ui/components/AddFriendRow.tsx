import 'react-native'
import React from 'react'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

import AddFriendRow from 'ui/components/add-friend-row'
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
    const myFriend = new Friend('4608576895476', 'Joe')

    const tree = renderer.create(
      <AddFriendRow 
        onPress={() => null}
        friend={myFriend}
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
