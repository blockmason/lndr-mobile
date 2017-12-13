import React, { Component } from 'react'

import { View } from 'react-native'

import Engine from 'lndr/engine'

import RecoverAccountForm from 'ui/forms/recover-account'

import { RecoverAccountData } from 'lndr/user'

interface Props {
  engine: Engine
}

export default class RecoverAccountView extends Component<Props> {
  async handleOnSubmitRecoverUser(formData: RecoverAccountData) {
    await this.props.engine.setAuthLoading(true)
    await this.props.engine.recoverAccount(formData)
    this.props.engine.setAuthLoading(false)
  }

  render() {
    const { engine } = this.props
    return (
      <View>
        <RecoverAccountForm
          onSubmitRecoverUser={this.handleOnSubmitRecoverUser.bind(this)}
          onCancel={() => engine.cancelRecoverAccount()}
        />
      </View>
    )
  }
}
