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

import AddDebt from 'ui/dialogs/add-debt'

import style from 'theme/account'

interface Props {
  engine: Engine
}

interface State {
  shouldShowAddDebt: boolean
}

export default class AccountView extends Component<Props, State> {
  constructor() {
    super()
    this.state = {
      shouldShowAddDebt: false
    }
  }

  renderAddDebtDialog() {
    const { shouldShowAddDebt } = this.state

    if (!shouldShowAddDebt) {
      return null
    }

    const { engine } = this.props

    return <Popup onClose={() => this.setState({ shouldShowAddDebt: false })}>
      <AddDebt engine={engine} />
    </Popup>
  }

  render() {
    const { engine } = this.props

    return <View style={{flex: 1}}>
      <Tabs tabContainerStyle={style.tabs}>
        <Tab reference='home' text='Home'>
          <HomeView engine={engine} />
        </Tab>
        <Tab reference='friends' text='Friends'>
          <FriendsView engine={engine} />
        </Tab>
        <Tab reference='activity' text='Activity'>
          <ActivityView engine={engine} />
        </Tab>
      </Tabs>
      <ActionButton/>
    </View>
  }
}
