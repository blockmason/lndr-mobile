import React, { Component } from 'react' // eslint-disable-line no-unused-vars

import { ScrollView } from 'react-native'

import StatusAlert from '../../../components/status/StatusAlert'

import Mnemonic from 'bitcore-mnemonic'

import { savePrivateKey } from '../../../utils/SecureDataStore'
import { insertRecord, executeTransaction } from '../../../utils/Storage'
import setup_account from './setup_account_styles'

import views from './views'

export default class SetupAccount extends Component {
  constructor (props) {
    super(props)

    this.state = {
      view: 'newAccountView',
      password: '',
      confirmPassword: '',
      mnemonic: ''
    }
  }

  generateMnemonic (password) {
    this.mnemonic = new Mnemonic(password)

    this.setState({
      password: '',
      confirmPassword: '',
      mnemonic: this.mnemonic.toString(),
      view: 'confirmAccountView'
    })
  }

  confirmAccount () {
    const privateKey = this.mnemonic.toHDPrivateKey()
    savePrivateKey(privateKey)

    this.props.dismiss()
  }

  submitPasswords () {
    const { password, confirmPassword } = this.state
    const errors = []

    if (password.length < 8) {
      errors.push('The password needs to have 8 characters')
    }

    if (password !== confirmPassword) {
      errors.push("The passwords don't match")
    }

    if (errors.length === 0) {
      this.generateMnemonic(password)
    } else {
      this.statusAlert.display({
        type: 'warn',
        title: 'Incorrect passwords',
        body: errors
          .map(err => `• ${err}`)
          .join('\n')
      })
    }
  }

  render () {
    return <ScrollView>
             {views[this.state.view].call(this)}
             <StatusAlert display={'dialog'} ref={statusAlert => this.statusAlert = statusAlert} />
           </ScrollView>
  }
}
