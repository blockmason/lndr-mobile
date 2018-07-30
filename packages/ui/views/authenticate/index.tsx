import React, { Component } from 'react'

import { View, ActivityIndicator, ScrollView } from 'react-native'

import FadeInView from 'ui/components/fade-in-view'

import LoginView from './login'
import CreateAccountView from './create-account'
import RecoverAccountView from './recover-account'
import ConfirmAccountView from './confirm-account'

import general from 'theme/general'
import style from 'theme/authenticate'

import { connect } from 'react-redux'
import { getStore } from 'reducers/app'

import loadingStyle from 'theme/loading'

interface Props {
  state: any
}

class AuthenticateView extends Component<Props> {
  render() {
    return <ScrollView contentContainerStyle={general.whiteFlex} keyboardShouldPersistTaps="always">
      <FadeInView style={style.main}>
        {this.renderView()}
        {this.renderLoadingView()}
      </FadeInView>
    </ScrollView>
  }

  renderLoadingView() {
    const { isAuthLoading } = this.props.state
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
      hasStoredUser,
      shouldRecoverAccount,
      shouldRemoveAccount,
      shouldDisplayMnemonic,
    } = this.props.state

    if (shouldDisplayMnemonic) {
      return <ConfirmAccountView />
    } else if (hasStoredUser) {
      return <LoginView />
    } else if (shouldRecoverAccount) {
      return <RecoverAccountView />
    } else {
      return <CreateAccountView />
    }
  }
}

const mapStateToProps = (state) => ({ state: getStore(state)() })

export default connect(mapStateToProps)(AuthenticateView)
