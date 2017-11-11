import React, { Component } from 'react'

import Engine from 'lndr/engine'

import { Text, View } from 'react-native'

import Button from 'ui/components/button'
import Tabs, { Tab } from 'ui/components/tabs'
import Popup from 'ui/components/popup'

import HomeView from './home'
import FriendsView from './friends'
import ActivityView from './activity'

import AddDebt from 'ui/dialogs/add-debt'

import style from 'theme/account'
import general from 'theme/general'

import { accountViewLanguage } from 'language'

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

    return <Tabs tabContainerStyle={style.tabs}>
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
  }
}
