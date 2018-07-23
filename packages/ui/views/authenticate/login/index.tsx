import React, { Component } from 'react'

import LoginAccountForm from 'ui/forms/login-account'

import { connect } from 'react-redux'

import { setAuthLoading, loginAccount } from 'actions'

import { LoginAccountData } from 'lndr/user'

interface Props {
  setAuthLoading: (state: boolean) => any
  loginAccount: (formData: LoginAccountData) => any
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
      />
    )
  }
}

const mapDispatchToProps = { setAuthLoading, loginAccount }

export default connect(null, mapDispatchToProps)(LoginView)
