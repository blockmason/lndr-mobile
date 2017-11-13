import React, { Component } from 'react'

import Engine from 'lndr/engine'

import { Text, View } from 'react-native'

import Button from 'ui/components/button'
import Popup, { closePopup } from 'ui/components/popup'
import Section from 'ui/components/section'

import AddDebt from 'ui/dialogs/add-debt'
import MyAccount from 'ui/dialogs/my-account'

import formStyle from 'theme/form'

interface Props {
  engine: Engine
}

interface State {
  shouldShowAddDebt: boolean
  shouldShowMyAccount: boolean
}

export default class HomeView extends Component<Props, State> {
  constructor() {
    super()
    this.state = {
      shouldShowAddDebt: false,
      shouldShowMyAccount: false
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

  renderMyAccountDialog() {
    const { shouldShowMyAccount } = this.state

    if (!shouldShowMyAccount) {
      return null
    }

    const { engine } = this.props

    return <Popup onClose={() => this.setState({ shouldShowMyAccount: false })}>
      <MyAccount closePopup={closePopup} engine={engine} />
    </Popup>
  }

  render() {
    return <View>
      <Section>
        <Text style={formStyle.text}>Home View</Text>
        <Button text='Add Debt' onPress={() => this.setState({ shouldShowAddDebt: true })} />
        { this.renderAddDebtDialog() }
        <Button text='My Account' onPress={() => this.setState({ shouldShowMyAccount: true })} />
        { this.renderMyAccountDialog() }
      </Section>

      <Section text='My Balances'>
        <Text style={formStyle.text}>List of balances to go here #todo</Text>
      </Section>
    </View>
  }
}
