import React, { Component } from 'react'

import { View, Text } from 'react-native'

import Engine from 'lndr/engine'

import LoginAccountForm from 'ui/forms/login-account'

import { LoginAccountData } from 'lndr/user'

interface Props {
  engine: Engine
}

export default class LoginView extends Component<Props> {
  async handleOnSubmitLoginAccount(formData: LoginAccountData) {
    await this.props.engine.setAuthLoading(true)
    await this.props.engine.loginAccount(formData)
    this.props.engine.setAuthLoading(false)
  }

  render() {
    const { engine } = this.props
    return (
      <LoginAccountForm
        onSubmit={this.handleOnSubmitLoginAccount.bind(this)}
        onRemoveAccount={() => engine.goToRemoveAccount()}
      />
    )
  }
}
