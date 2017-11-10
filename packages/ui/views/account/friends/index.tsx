import React, { Component } from 'react'

import Engine from 'lndr/engine'

import { Text, View } from 'react-native'

import Section from 'ui/components/section'

interface Props {
  engine: Engine
}

interface State {
}

export default class HomeView extends Component<Props, State> {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    return <View>
      <Section>
        <Text>Add a new friend</Text>
      </Section>

      <Section text='Current Friends'>
        <Text>List of friends to go here #todo</Text>
      </Section>
    </View>
  }
}
