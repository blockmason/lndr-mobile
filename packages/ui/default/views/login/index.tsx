import React, { Component } from 'react'

import Engine from 'lndr/engine'

import { Text } from 'react-native'

interface Props {
  engine: Engine
}

export default class LoginView extends Component<Props> {
  render () {
    return <Text>Login</Text>
  }
}
