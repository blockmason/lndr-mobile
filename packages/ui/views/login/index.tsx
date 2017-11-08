import React, { Component } from 'react'

import Engine from 'lndr/engine'

import { Text } from 'react-native'

import LoginAccountForm from 'ui/forms/login-account'

interface Props {
  engine: Engine
}

export default class LoginView extends Component<Props> {
  render () {
    const { engine } = this.props

    return <LoginAccountForm
      onSubmit={formData => engine.loginAccount(formData)}
      onRemoveAccount={() => engine.goToRemoveAccount()}
    />
  }
}
