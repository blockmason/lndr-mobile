import React, { Component } from 'react'

import Engine from 'lndr/engine'

import LoginView from 'ui/views/login'
import CreateAccountView from 'ui/views/create-account'

interface Props {
  engine: Engine
}

export default class AuthenticateView extends Component<Props> {
  render () {
    const { state } = this.props.engine
    if (state.hasStoredUser) {
      return <LoginView engine={this.props.engine} />
    }
    return <CreateAccountView engine={this.props.engine} />
  }
}
