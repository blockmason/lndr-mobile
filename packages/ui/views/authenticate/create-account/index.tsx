import React, { Component } from 'react'

import { View } from 'react-native'

import Engine from 'lndr/engine'

import CreateAccountForm from 'ui/forms/create-account'

interface Props {
  engine: Engine
}

export default class CreateAccountView extends Component<Props> {
  render() {
    const { engine } = this.props

    return <View>
      <CreateAccountForm
        onSubmitCreateUser={formData => engine.createAccount(formData)}
        onSubmitRecover={() => engine.goToRecoverAccount()}
      />
    </View>
  }
}
