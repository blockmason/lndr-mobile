import React, { Component } from 'react'

import { View } from 'react-native'
import firebase from 'react-native-firebase'

import { connect } from 'react-redux'

import { setAuthLoading, recoverAccount, cancelRecoverAccount } from 'actions'

import RecoverAccountForm from 'ui/forms/recover-account'

import { RecoverAccountData } from 'lndr/user'

import { LoadingContext } from 'ui/components/loading'

const loadingContext = new LoadingContext()

interface Props {
  setAuthLoading: (state: boolean) => any
  recoverAccount: (formData: RecoverAccountData) => any
  cancelRecoverAccount: () => any
}

class RecoverAccountView extends Component<Props> {
  componentDidMount( ) {
    firebase.analytics().setCurrentScreen('recover-account', 'RecoverAccountView');
  }

  async handleOnSubmitRecoverUser(formData: RecoverAccountData) {
    this.props.setAuthLoading(true)
    await loadingContext.wrap(this.props.recoverAccount(formData))
    this.props.setAuthLoading(false)
  }

  render() {
    return (
      <View>
        <RecoverAccountForm
          onSubmitRecoverUser={this.handleOnSubmitRecoverUser.bind(this)}
          onCancel={this.props.cancelRecoverAccount}
        />
      </View>
    )
  }
}

const mapDispatchToProps = { setAuthLoading, recoverAccount, cancelRecoverAccount }

export default connect(null, mapDispatchToProps)(RecoverAccountView)
