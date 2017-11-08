import React, { Component } from 'react'

import Engine, { EngineState } from 'lndr/engine'

import AuthenticateView from 'ui/views/authenticate'
import AccountView from 'ui/views/account'
import Logo from 'ui/components/logo'

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
    const {
      user,
      mnemonicInstance,
      isInitializing,
      hasStoredUser,
      shouldRecoverAccount,
      shouldRemoveAccount,
      shouldConfirmAccount,
      errorMessage
    } = this.state

    if (isInitializing) {
      return <Logo />
    }

    if (!user) {
      return <AuthenticateView
        engine={engine}
        mnemonic={mnemonicInstance ? mnemonicInstance.toString() : null}
        errorMessage={errorMessage}
        shouldRecoverAccount={shouldRecoverAccount}
        shouldRemoveAccount={shouldRemoveAccount}
        shouldConfirmAccount={shouldConfirmAccount}
        hasStoredUser={hasStoredUser} />
    }

    return <AccountView engine={engine} />
  }
}
