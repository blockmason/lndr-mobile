import React, { Component } from 'react'

import Engine from 'lndr/engine'

import { Text, View } from 'react-native'

import Button from 'ui/components/button'
import Popup from 'ui/components/popup'
import Section from 'ui/components/section'

import AddDebt from 'ui/dialogs/add-debt'

interface Props {
  engine: Engine
}

interface State {
  shouldShowAddDebt: boolean
}

export default class HomeView extends Component<Props, State> {
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
    return <View>
      <Section>
        <Text>Home View</Text>
        <Button text='Add Debt' onPress={() => this.setState({ shouldShowAddDebt: true })} />
        { this.renderAddDebtDialog() }
      </Section>

      <Section text='My Balances'>
        <Text>List of balances to go here #todo</Text>
      </Section>
    </View>
  }
}
