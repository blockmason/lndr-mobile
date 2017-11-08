import React, { Component } from 'react'

import { View } from 'react-native'

import Engine from 'lndr/engine'

import RecoverAccountForm from 'ui/forms/recover-account'

interface Props {
  engine: Engine
}

export default class RecoverAccountView extends Component<Props> {
  render() {
    const { engine } = this.props
    return (
      <View>
        <RecoverAccountForm
          onSubmitRecoverUser={formData => engine.recoverAccount(formData)}
          onCancel={() => engine.cancelRecoverAccount()}
        />
      </View>
    )
  }
}
