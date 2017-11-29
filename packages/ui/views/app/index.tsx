import React, { Component } from 'react'

import { View } from 'react-native'

import Engine, { EngineState } from 'lndr/engine'

import AuthenticateView from 'ui/views/authenticate'
import AccountView from 'ui/views/account'
import WelcomeView from 'ui/views/welcome'

import Alert from 'ui/components/alert'
import { PopupTarget } from 'ui/components/popup'
import ThemeImage from 'ui/components/images/theme-image'
import AndroidStatusBar from 'ui/components/android-status-bar'

import style from 'theme/general'

interface Props {}

const engine = new Engine()

export default class AppView extends Component<Props, EngineState> {
  alertElement: any
  alert: any

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
      <AndroidStatusBar />
      <PopupTarget />
      {this.renderContents()}
      {this.renderAlert()}
    </View>
  }

  async hideAlert() {
    await this.alert.hide()
  }

  async showAlert() {
    await new Promise(resolve => setTimeout(resolve, 250))
    await this.alert.show()
  }

  renderAlert() {
    const { errorMessage, successMessage } = this.state

    if (errorMessage) {
      this.alertElement = <Alert ref={alert => this.alert = alert} error text={errorMessage} />
      this.showAlert()
    }

    else if (successMessage) {
      this.alertElement = <Alert ref={alert => this.alert = alert} success text={successMessage} />
      this.showAlert()
    }

    else if (this.alert) {
      this.hideAlert()
    }

    return this.alertElement
  }

  renderContents() {
    const {
      user,
      mnemonicInstance,
      isInitializing,
      hasStoredUser,
      welcomeComplete,
      shouldRecoverAccount,
      shouldRemoveAccount,
      shouldDisplayMnemonic,
      pendingTransactionsCount
    } = this.state

    if (isInitializing) {
      return <View />
    }

    if (!welcomeComplete) {
      return <WelcomeView onComplete={ () => { this.setState({ welcomeComplete: true }) } }/>
    }

    if (!user || shouldDisplayMnemonic) {
      return <AuthenticateView
        engine={engine}
        mnemonic={mnemonicInstance ? mnemonicInstance.toString() : null}
        shouldRecoverAccount={shouldRecoverAccount}
        shouldRemoveAccount={shouldRemoveAccount}
        shouldDisplayMnemonic={shouldDisplayMnemonic}
        hasStoredUser={hasStoredUser}
      />
    }

    return <AccountView
      engine={engine}
      pendingTransactionsCount={pendingTransactionsCount}
    />
  }
}
