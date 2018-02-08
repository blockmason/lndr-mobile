import React, { Component } from 'react'

import { View } from 'react-native'

import { connect } from 'react-redux'

import { setAuthLoading, createAccount, goToRecoverAccount, takenNick } from 'actions'

import CreateAccountForm from 'ui/forms/create-account'

import { CreateAccountData } from 'lndr/user'

import { accountManagement } from 'language'

interface Props {
  setAuthLoading: (state: boolean) => any
  createAccount: (formData: CreateAccountData) => any
  goToRecoverAccount: () => any
}

interface AccountViewState {
  duplicationViolation?: boolean
}

const defaultAccountViewState = (): AccountViewState => ({
  duplicationViolation: false
})

class CreateAccountView extends Component<Props, AccountViewState> {
  constructor() {
    super()
    this.state = defaultAccountViewState()
  }

  async handleOnSubmitCreateAccount(formData: CreateAccountData) {
    this.props.setAuthLoading(true)
    await this.props.createAccount(formData)
    this.props.setAuthLoading(false)
  }

  async handleOnNickTextInputBlur(nickname: string) {
    const duplicateNick = await takenNick(nickname)
    if (duplicateNick) {
      this.setState({ duplicationViolation: true })
    } else {
      this.setState({ duplicationViolation: false })
    }
  }

  renderNickTextInputErrorText() {
    let errorText
    if (this.state.duplicationViolation) {
      errorText = accountManagement.nickname.duplicationViolation
    }
    return errorText
  }

  render() {
    return (
      <View>
        <CreateAccountForm
          nickTextInputErrorText={this.renderNickTextInputErrorText()}
          onNickTextInputBlur={this.handleOnNickTextInputBlur.bind(this)}
          onSubmitCreateUser={this.handleOnSubmitCreateAccount.bind(this)}
          onSubmitRecover={this.props.goToRecoverAccount}
        />
      </View>
    )
  }
}

const mapDispatchToProps = { createAccount, setAuthLoading, goToRecoverAccount }

export default connect(null, mapDispatchToProps)(CreateAccountView)
