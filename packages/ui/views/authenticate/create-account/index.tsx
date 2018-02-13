import React, { Component } from 'react'

import { View } from 'react-native'

import { connect } from 'react-redux'

import { setAuthLoading, createAccount, goToRecoverAccount, takenNick, takenEmail } from 'actions'

import CreateAccountForm from 'ui/forms/create-account'

import { CreateAccountData } from 'lndr/user'
import { emailFormatIncorrect } from 'lndr/format'

import { accountManagement } from 'language'

interface Props {
  setAuthLoading: (state: boolean) => any
  createAccount: (formData: CreateAccountData) => any
  goToRecoverAccount: () => any
}

interface AccountViewState {
  nickDuplicationViolation?: boolean
  emailDuplicationViolation?: boolean
  emailFormatViolation?: boolean
}

class CreateAccountView extends Component<Props, AccountViewState> {
  constructor() {
    super()
    this.state = {
      nickDuplicationViolation: false,
      emailDuplicationViolation: false,
      emailFormatViolation: false
    }
  }

  async handleOnSubmitCreateAccount(formData: CreateAccountData) {
    this.props.setAuthLoading(true)
    await this.props.createAccount(formData)
    this.props.setAuthLoading(false)
  }

  async handleOnNickTextInputBlur(nickname: string) {
    const duplicateNick = await takenNick(nickname)
    if (duplicateNick) {
      this.setState({ nickDuplicationViolation: true })
    } else {
      this.setState({ nickDuplicationViolation: false })
    }
  }

  renderNickTextInputErrorText() {
    let errorText
    if (this.state.nickDuplicationViolation) {
      errorText = accountManagement.nickname.duplicationViolation
    }
    return errorText
  }

  async handleOnEmailTextInputBlur(email: string) {
    if (emailFormatIncorrect(email)) {
      this.setState({ emailFormatViolation: true })
    } else {
      const duplicateEmail = await takenEmail(email)

      if (duplicateEmail) {
        this.setState({ emailDuplicationViolation: true })
      } else {
        this.setState({ emailDuplicationViolation: false, emailFormatViolation: false })
      }
    }
  }

  renderEmailTextInputErrorText() {
    let errorText
    if (this.state.emailDuplicationViolation) {
      errorText = accountManagement.email.duplicationViolation
    } else if (this.state.emailFormatViolation) {
      errorText = accountManagement.email.compositionViolation
    }
    return errorText
  }

  render() {
    return (
      <View>
        <CreateAccountForm
          nickTextInputErrorText={this.renderNickTextInputErrorText()}
          onNickTextInputBlur={this.handleOnNickTextInputBlur.bind(this)}
          emailTextInputErrorText={this.renderEmailTextInputErrorText()}
          onEmailTextInputBlur={this.handleOnEmailTextInputBlur.bind(this)}
          onSubmitCreateUser={this.handleOnSubmitCreateAccount.bind(this)}
          onSubmitRecover={this.props.goToRecoverAccount}
          nickDuplicationViolation={this.state.nickDuplicationViolation}
          emailDuplicationViolation={this.state.emailDuplicationViolation}
          emailFormatViolation={this.state.emailDuplicationViolation}
        />
      </View>
    )
  }
}

const mapDispatchToProps = { createAccount, setAuthLoading, goToRecoverAccount }

export default connect(null, mapDispatchToProps)(CreateAccountView)
