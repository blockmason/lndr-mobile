import React, { Component } from 'react'

import Engine from 'lndr/engine'

import { View, Text } from 'react-native'

import LoginAccountForm from 'ui/forms/login-account'

import Loading, { LoadingContext } from 'ui/components/loading'

import Popup from 'ui/components/popup'

const loggingIn = new LoadingContext()

interface Props {
  engine: Engine
}

export default class LoginView extends Component<Props> {

  async login(formData) {
    const { engine } = this.props
    await loggingIn.wrap(engine.loginAccount(formData))
  }

  render() {
    const { engine } = this.props

    return <View>
      <Loading context={loggingIn} />
      <LoginAccountForm
        onSubmit={formData => this.login(formData)}
        onRemoveAccount={() => engine.goToRemoveAccount()}
      />
    </View>
  }
}
