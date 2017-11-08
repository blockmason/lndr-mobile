import React, { Component } from 'react'

import Engine from 'lndr/engine'

import { Text } from 'react-native'

import Tabs, { Tab } from 'ui/components/tabs'

interface Props {
  engine: Engine
}

export default class AccountView extends Component<Props> {
  render() {
    return <Tabs>
      <Tab reference={'balances'} title={'Balances'}>
        <Text>AccountView</Text>
      </Tab>
      <Tab reference={'friends'} title={'Friends'}>
        <Text>Friends</Text>
      </Tab>
      <Tab reference={'pending'} title={'Pending'}>
        <Text>Pending</Text>
      </Tab>
    </Tabs>
  }
}
