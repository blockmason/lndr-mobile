import React, { Component } from 'react'

import { View, Text } from 'react-native'

import LoginAccountForm from 'ui/forms/login-account'

import { connect } from 'react-redux'

import { setAuthLoading, loginAccount, goToRemoveAccount } from 'actions'

import { LoginAccountData } from 'lndr/user'

interface Props {
  setAuthLoading: (state: boolean) => any
  loginAccount: (formData: LoginAccountData) => any
  goToRemoveAccount: () => any
}

class LoginView extends Component<Props> {
  async handleOnSubmitLoginAccount(formData: LoginAccountData) {
    this.props.setAuthLoading(true)
    const loginSuccess = await this.props.loginAccount(formData)
    this.props.setAuthLoading(false)
    return loginSuccess
  }

  render() {
    return (
      <LoginAccountForm
        onSubmit={this.handleOnSubmitLoginAccount.bind(this)}
        onRemoveAccount={this.props.goToRemoveAccount}
      />
    )
  }
}

const mapDispatchToProps = { setAuthLoading, loginAccount, goToRemoveAccount }

export default connect(null, mapDispatchToProps)(LoginView)
