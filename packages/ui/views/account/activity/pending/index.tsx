import React, { Component } from 'react'

import Engine from 'lndr/engine'

import { Text } from 'react-native'

import Section from 'ui/components/section'

import formStyle from 'theme/form'

interface Props {
  engine: Engine
}

interface State {
}

export default class PendingView extends Component<Props, State> {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    const { engine } = this.props

    return <Section>
      <Text style={formStyle.text}>Pending transactions will go here #todo</Text>
    </Section>
  }
}
