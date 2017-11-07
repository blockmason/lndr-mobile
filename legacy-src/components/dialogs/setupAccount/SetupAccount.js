import React, { Component } from 'react'

import { ScrollView } from 'react-native'

import StatusAlert from '../../../components/status/StatusAlert'

import Mnemonic from 'bitcore-mnemonic'

import { saveMnemonic } from '../../../utils/SecureDataStore'
import { insertRecord, executeTransaction } from '../../../utils/Storage'
import setup_account from './setup_account_styles'

import views from './views'

export default class SetupAccount extends Component {
  constructor(props) {
    super(props)

    this.state = {
      view: 'newAccountView',
      password: '',
      confirmPassword: '',
      acceptedPassword: '',
      mnemonic: ''
    }
  }

  generateMnemonic(password) {
    this.mnemonic = new Mnemonic()

    this.setState({
      password: '',
      confirmPassword: '',
      acceptedPassword: password,
      mnemonic: this.mnemonic.toString(),
      view: 'confirmAccountView'
    })
  }

  submitMnemonic() {
    const errors = []

    if (typeof this.state.mnemonic !== 'string' || this.state.mnemonic.split(' ').length < 12) {
      errors.push('Please enter at least 12 words to restore your account')
    }

    if (typeof this.state.password !== 'string' || this.state.password.length < 8) {
      errors.push('The password needs to have 8 characters')
    }

    try {
      this.mnemonic = new Mnemonic(this.state.mnemonic.toLowerCase())
    }
    catch (e) {
      errors.push(e.message)
    }

    if (errors.length > 0) {
      this.statusAlert.display({
        type: 'warn',
        title: 'Incorrect mnemonic',
        body: errors
          .map(err => `• ${err}`)
          .join('\n')
      })
      return
    }

    this.props.dismiss(this.mnemonic.toString(), this.state.password)
  }

  confirmAccount() {
    if (!this.state.mnemonic) {
      throw new Error('Error, no mnemonic')
    }

    if (!this.state.acceptedPassword) {
      throw new Error('Error, no acceptedPassword')
    }

    this.props.dismiss(this.state.mnemonic, this.state.acceptedPassword)
  }

  submitPasswords() {
    const { password, confirmPassword } = this.state
    const errors = []

    if (password.length < 8) {
      errors.push('The password needs to have 8 characters')
    }

    if (password !== confirmPassword) {
      errors.push("The passwords don't match")
    }

    if (errors.length > 0) {
      this.statusAlert.display({
        type: 'warn',
        title: 'Incorrect passwords',
        body: errors
          .map(err => `• ${err}`)
          .join('\n')
      })
      return
    }

    this.generateMnemonic(password)
  }

  render () {
    return <ScrollView>
             {views[this.state.view].call(this)}
             <StatusAlert display={'dialog'} ref={statusAlert => this.statusAlert = statusAlert} />
           </ScrollView>
  }
}
