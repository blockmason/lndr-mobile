import React, { Component } from 'react'

import Engine from 'lndr/engine'

import { Text } from 'react-native'

interface Props {
  engine: Engine
}

export default class AccountView extends Component<Props> {
  render () {
    return <Text>AccountView</Text>
  }
}
