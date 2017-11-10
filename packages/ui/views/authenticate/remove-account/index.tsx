import React, { Component } from 'react'

import { View, Text } from 'react-native'

import Engine from 'lndr/engine'

import {
  cancel,
  removeAccount,
  removeAccountTitle,
  removeAccountExhortation
} from 'language'

import Button from 'ui/components/button'

import style from 'theme/form'

interface Props {
  engine: Engine
}

export default class RemoveAccountView extends Component<Props> {
  render() {
    const { engine } = this.props
    return (
      <View style={style.form}>
        <Text style={style.header}>{removeAccountTitle}</Text>
        <Text style={style.text}>{removeAccountExhortation}</Text>
        <Button danger onPress={() => engine.removeAccount()} text={removeAccount} />
        <Button alternate onPress={() => engine.cancelRemoveAccount()} text={cancel} />
      </View>
    )
  }
}
