import React, { Component } from 'react'

import Engine from 'lndr/engine'

import { View, Text } from 'react-native'

import Tabs, { Tab } from 'ui/components/tabs'
import ActionButton from 'ui/components/action'

interface Props {
  engine: Engine
}

export default class AccountView extends Component<Props> {
  render() {
    return <View style={{flex: 1}}>
      <Tabs>
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
      <ActionButton/>
    </View>
  }
}
