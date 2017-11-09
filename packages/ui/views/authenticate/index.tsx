import React, { Component } from 'react'

import { ScrollView } from 'react-native'

import Engine from 'lndr/engine'

import Alert from 'ui/components/alert'
import Logo from 'ui/components/logo'

import LoginView from 'ui/views/login'
import CreateAccountView from 'ui/views/create-account'
import RecoverAccountView from 'ui/views/recover-account'
import RemoveAccountView from 'ui/views/remove-account'
import ConfirmAccountView from 'ui/views/confirm-account'

import style from 'theme/general'

interface Props {
  engine: Engine,
  hasStoredUser?: boolean
  shouldRecoverAccount?: boolean
  shouldRemoveAccount?: boolean
  shouldConfirmAccount?: boolean
  errorMessage?: string
  mnemonic?: string
}

export default class AuthenticateView extends Component<Props> {
  render() {
    return <ScrollView contentContainerStyle={style.flex}>
      <Logo />
      {this.renderView()}
      {this.renderErrorMessage()}
    </ScrollView>
  }

  renderErrorMessage() {
    const { errorMessage } = this.props
    return errorMessage ? <Alert error text={errorMessage} /> : null
  }

  renderView() {
    const {
      engine,
      hasStoredUser,
      shouldRecoverAccount,
      shouldRemoveAccount,
      shouldConfirmAccount,
      mnemonic
    } = this.props

    if (shouldRemoveAccount) {
      return <RemoveAccountView engine={engine} />
    }

    if (hasStoredUser) {
      return <LoginView engine={engine} />
    }

    if (shouldRecoverAccount) {
      return <RecoverAccountView engine={engine} />
    }

    if (shouldConfirmAccount) {
      return <ConfirmAccountView engine={engine} mnemonic={mnemonic} />
    }

    return <CreateAccountView engine={engine} />
  }
}
