import React, { Component } from 'react'

import { View, Text } from 'react-native'

import Engine from 'lndr/engine'
import ThemeImage from 'ui/components/images/theme-image'

import formStyle from 'theme/form'

interface Props {
  engine: Engine
}

export default class AddDebt extends Component<Props> {
  render() {
    return <View>
      <Text style={formStyle.text}>This is the add debt dialog, just edit this</Text>
      <ThemeImage name={'logo'} />
    </View>
  }
}
