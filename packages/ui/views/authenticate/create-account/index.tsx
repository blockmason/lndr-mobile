import React, { Component } from 'react'

import { View } from 'react-native'

import { connect } from 'react-redux'

import { goToRecoverAccount, takenNick, takenEmail } from 'actions'

import CreateAccountForm from 'ui/forms/create-account'

import { CreateAccountData } from 'lndr/user'
import { emailFormatIncorrect, nickLengthIncorrect } from 'lndr/format'

import language from 'language'
const { accountManagement } = language

interface Props {
  setAuthLoading: (state: boolean) => any
  createAccount: (formData: CreateAccountData) => any
  goToRecoverAccount: () => any
}

interface AccountViewState {
  nickDuplicationViolation?: boolean
  nickFormatViolation?: boolean
  nickLengthViolation?: boolean
  emailDuplicationViolation?: boolean
  emailFormatViolation?: boolean
}

class CreateAccountView extends Component<Props, AccountViewState> {
  constructor(props) {
    super(props)
    this.state = {
      nickDuplicationViolation: false,
      nickLengthViolation: false,
      emailDuplicationViolation: false,
      emailFormatViolation: false
    }
  }

  async handleOnNickTextInputBlur(nickname: string) {
    if (nickname.length == 0) {
      this.setState({ nickDuplicationViolation: false, nickLengthViolation: false })
    } else if(nickLengthIncorrect(nickname)) {
      this.setState({ nickLengthViolation: true })
    } else {
      const duplicateNick = await takenNick(nickname)
      if (duplicateNick) {
        this.setState({ nickDuplicationViolation: true })
      } else {
        this.setState({ nickDuplicationViolation: false, nickLengthViolation: false })
      }
    }
  }

  async handleOnNickTextChange() {
    this.setState({ nickDuplicationViolation: false, nickLengthViolation: false })
  }

  renderNickTextInputErrorText() {
    let errorText
    if (this.state.nickDuplicationViolation) {
      errorText = accountManagement.nickname.duplicationViolation
    } else if (this.state.nickFormatViolation) {
      errorText = accountManagement.nickname.compositionViolation
    } else if (this.state.nickLengthViolation) {
      errorText = accountManagement.nickname.lengthViolation
    }
    return errorText
  }

  async handleOnEmailTextInputBlur(email: string) {
    if (email.length == 0) {
      this.setState({ emailDuplicationViolation: false, emailFormatViolation: false })
    } else if (emailFormatIncorrect(email)) {
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

  async handleOnEmailTextChange() {
    this.setState({ emailDuplicationViolation: false, emailFormatViolation: false })
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
          nickInputError={this.renderNickTextInputErrorText()}
          onNickTextInputBlur={this.handleOnNickTextInputBlur.bind(this)}
          onNickTextChange={this.handleOnNickTextChange.bind(this)}
          emailInputError={this.renderEmailTextInputErrorText()}
          onEmailTextInputBlur={this.handleOnEmailTextInputBlur.bind(this)}
          onEmailTextChange={this.handleOnEmailTextChange.bind(this)}
          onSubmitRecover={this.props.goToRecoverAccount}
          nickDuplicationViolation={this.state.nickDuplicationViolation}
          nickLengthViolation={this.state.nickLengthViolation}
          emailDuplicationViolation={this.state.emailDuplicationViolation}
          emailFormatViolation={this.state.emailFormatViolation}
        />
      </View>
    )
  }
}

const mapDispatchToProps = { goToRecoverAccount }

export default connect(null, mapDispatchToProps)(CreateAccountView)
