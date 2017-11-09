import React, { Component } from 'react'

import Engine from 'lndr/engine'

import { View, Text } from 'react-native'

import LoginAccountForm from 'ui/forms/login-account'

import Popup from 'ui/components/popup'
import Logo from 'ui/components/logo'

interface Props {
  engine: Engine
}

export default class LoginView extends Component<Props> {
  render () {
    const { engine } = this.props

    return <View>
      <Popup onClose={() => {}}>
        <Text>This is a popup, just delete this</Text>
        <Logo />
      </Popup>
      <LoginAccountForm
        onSubmit={formData => engine.loginAccount(formData)}
        onRemoveAccount={() => engine.goToRemoveAccount()}
      />
    </View>
  }
}
