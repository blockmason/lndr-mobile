import React, { Component } from 'react'

import { View } from 'react-native'

import Engine, { EngineState } from 'lndr/engine'

import AuthenticateView from 'ui/views/authenticate'
import AccountView from 'ui/views/account'
import WelcomeView from 'ui/views/welcome'

import Alert from 'ui/components/alert'
import { PopupTarget } from 'ui/components/popup'
import ThemeImage from 'ui/components/images/theme-image'

import style from 'theme/general'

interface Props {}

const engine = new Engine()

export default class AppView extends Component<Props, EngineState> {
  constructor() {
    super()
    this.state = engine.state
    engine.subscribe(state => this.setState(state))
  }

  async componentDidMount() {
    await engine.initialize()
  }

  render() {
    return <View style={style.flex}>
      <PopupTarget />
      {this.renderContents()}
      {this.renderErrorMessage()}
      {this.renderSuccessMessage()}
    </View>
  }

  renderErrorMessage() {
    const { errorMessage } = this.state
    return errorMessage ? <Alert error text={errorMessage} /> : null
  }

  renderSuccessMessage() {
    const { successMessage } = this.state
    return successMessage ? <Alert success text={successMessage} /> : null
  }

  renderContents() {
    const {
      user,
      mnemonicInstance,
      isInitializing,
      hasStoredUser,
      shouldRecoverAccount,
      shouldRemoveAccount,
      shouldConfirmAccount
    } = this.state

    if (isInitializing) {
      return <ThemeImage name='logo' />
    }

    if (!hasStoredUser) {
      return <WelcomeView />
    }

    if (!user) {
      return <AuthenticateView
        engine={engine}
        mnemonic={mnemonicInstance ? mnemonicInstance.toString() : null}
        shouldRecoverAccount={shouldRecoverAccount}
        shouldRemoveAccount={shouldRemoveAccount}
        shouldConfirmAccount={shouldConfirmAccount}
        hasStoredUser={hasStoredUser}
      />
    }

    return <AccountView
      engine={engine}
    />
  }
}
