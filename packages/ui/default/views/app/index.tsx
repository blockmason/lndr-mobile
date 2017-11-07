import React, { Component } from 'react'

import Engine, { EngineState } from 'lndr/engine'

import AuthenticateView from 'ui/views/authenticate'
import AccountView from 'ui/views/account'

interface Props {}

const engine = new Engine()

export default class AppView extends Component<Props, EngineState> {
  constructor () {
    super()
    this.state = engine.state
    engine.subscribe(state => this.setState(state))
  }

  render () {
    if (!this.state.user) {
      return <AuthenticateView engine={engine} />
    }
    return <AccountView engine={engine} />
  }
}
