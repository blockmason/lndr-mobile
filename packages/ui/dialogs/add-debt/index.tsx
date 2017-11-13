import React, { Component } from 'react'

import { View, Text } from 'react-native'

import Engine from 'lndr/engine'
import Logo from 'ui/components/images/logo'

import formStyle from 'theme/form'

interface Props {
  engine: Engine
}

export default class AddDebt extends Component<Props> {
  render() {
    return <View>
      <Text style={formStyle.text}>This is the add debt dialog, just edit this</Text>
      <Logo />
    </View>
  }
}
