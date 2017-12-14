import React, { Component } from 'react'

import { View } from 'react-native'

import Engine from 'lndr/engine'

import CreateAccountForm from 'ui/forms/create-account'

import { CreateAccountData } from 'lndr/user'

import { accountManagement } from 'language'

interface Props {
  engine: Engine
}

interface AccountViewState {
  duplicationViolation?: boolean
}

const defaultAccountViewState = (): AccountViewState => ({
  duplicationViolation: false
})

export default class CreateAccountView extends Component<Props, AccountViewState> {
  constructor() {
    super()
    this.state = defaultAccountViewState()
  }

  async handleOnSubmitCreateAccount(formData: CreateAccountData) {
    await this.props.engine.setAuthLoading(true)
    await this.props.engine.createAccount(formData)
    this.props.engine.setAuthLoading(false)
  }

  async handleOnNickTextInputBlur(nickname: string) {
    const duplicateNick = await this.props.engine.takenNick(nickname)
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
    const { engine } = this.props
    return (
      <View>
        <CreateAccountForm
          nickTextInputErrorText={this.renderNickTextInputErrorText()}
          onNickTextInputBlur={this.handleOnNickTextInputBlur.bind(this)}
          onSubmitCreateUser={this.handleOnSubmitCreateAccount.bind(this)}
          onSubmitRecover={() => engine.goToRecoverAccount()}
        />
      </View>
    )
  }
}
