import React, { Component } from 'react'

import { View } from 'react-native'

import Engine from 'lndr/engine'

import CreateAccountForm from 'ui/forms/create-account'

import { CreateAccountData } from 'lndr/user'

interface Props {
  engine: Engine
}

export default class CreateAccountView extends Component<Props> {
  async handleOnSubmitCreateAccount(formData: CreateAccountData) {
    await this.props.engine.setAuthLoading(true)
    await this.props.engine.createAccount(formData)
    this.props.engine.setAuthLoading(false)
  }

  render() {
    const { engine } = this.props
    return (
      <View>
        <CreateAccountForm
          onSubmitCreateUser={this.handleOnSubmitCreateAccount.bind(this)}
          onSubmitRecover={() => engine.goToRecoverAccount()}
        />
      </View>
    )
  }
}
