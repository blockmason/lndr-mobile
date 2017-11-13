import React, { Component } from 'react'

import Engine from 'lndr/engine'

import { View, Text } from 'react-native'

import Button from 'ui/components/button'
import Tabs, { Tab } from 'ui/components/tabs'
import ActionButton from 'ui/components/action'
import Popup from 'ui/components/popup'

import HomeView from './home'
import FriendsView from './friends'
import ActivityView from './activity'

import style from 'theme/account'

import { accountViewLanguage } from 'language'

interface Props {
  engine: Engine
}

export default class AccountView extends Component<Props> {
  render() {
    const { engine } = this.props

    return <View style={{flex: 1}}>
      <Tabs tabContainerStyle={style.tabs}>
        <Tab reference='home' text={accountViewLanguage.home}>
          <HomeView engine={engine} />
        </Tab>
        <Tab reference='friends' text={accountViewLanguage.friends}>
          <FriendsView engine={engine} />
        </Tab>
        <Tab reference='activity' text={accountViewLanguage.activity}>
          <ActivityView engine={engine} />
        </Tab>
      </Tabs>
      <ActionButton/>
    </View>
  }
}
