import React, { Component } from 'react'

import { View, ActivityIndicator, ScrollView } from 'react-native'

import Engine from 'lndr/engine'

import Alert from 'ui/components/alert'
import ThemeImage from 'ui/components/images/theme-image'
import FadeInView from 'ui/components/fade-in-view'

import LoginView from './login'
import CreateAccountView from './create-account'
import RecoverAccountView from './recover-account'
import RemoveAccountView from './remove-account'
import ConfirmAccountView from './confirm-account'

import general from 'theme/general'
import style from 'theme/authenticate'

import loadingStyle from 'theme/loading'

interface Props {
  engine: Engine,
  hasStoredUser?: boolean
  isAuthLoading?: boolean
  shouldRecoverAccount?: boolean
  shouldRemoveAccount?: boolean
  shouldDisplayMnemonic?: boolean
  mnemonic?: string
}

export default class AuthenticateView extends Component<Props> {
  render() {
    return <ScrollView contentContainerStyle={general.whiteFlex}>
      <FadeInView style={style.main}>
        <ThemeImage name='logo' />
        {this.renderView()}
        {this.renderLoadingView()}
      </FadeInView>
    </ScrollView>
  }

  renderLoadingView() {
    const { isAuthLoading } = this.props
    if (isAuthLoading === true) {
      return (
        <View style={loadingStyle.loading}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
    return null
  }

  renderView() {
    const {
      engine,
      hasStoredUser,
      shouldRecoverAccount,
      shouldRemoveAccount,
      shouldDisplayMnemonic,
      mnemonic
    } = this.props

    if (shouldDisplayMnemonic) {
      return <ConfirmAccountView engine={engine} mnemonic={mnemonic} />
    } else if (shouldRemoveAccount) {
      return <RemoveAccountView engine={engine} />
    } else if (hasStoredUser) {
      return <LoginView engine={engine} />
    } else if (shouldRecoverAccount) {
      return <RecoverAccountView engine={engine} />
    } else {
      return <CreateAccountView engine={engine} />
    }
  }
}
