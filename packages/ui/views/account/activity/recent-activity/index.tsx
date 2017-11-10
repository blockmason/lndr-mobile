import React, { Component } from 'react'

import Engine from 'lndr/engine'

import { Text } from 'react-native'

import Section from 'ui/components/section'

interface Props {
  engine: Engine
}

interface State {
}

export default class RecentActivityView extends Component<Props, State> {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    const { engine } = this.props

    return <Section>
      <Text>Recent activity will go here #todo</Text>
    </Section>
  }
}
