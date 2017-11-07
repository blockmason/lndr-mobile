import React, { Component } from 'react' // eslint-disable-line no-unused-vars

import { ScrollView } from 'react-native'

import StatusAlert from '../../../components/status/StatusAlert'

import Mnemonic from 'bitcore-mnemonic'

import {
  removeMnemonic,
  removeHashedPassword,
  retrieveMnemonic,
  retrieveHashedPassword
} from '../../../utils/SecureDataStore'

import { insertRecord, executeTransaction } from '../../../utils/Storage'

import views from './views'

export const PASSWORD_SALT = 'THIS_IS_A_SALT_5426892348596723645879243876'

export default class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      view: 'loginView',
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

  confirmRemoveAccount() {
    removeMnemonic()
      .then(removeHashedPassword)
      .then(this.props.dismiss)
  }

  confirmPassword() {
    if (!this.state.password) {
      this.statusAlert.display({
        type: 'warn',
        title: 'Incorrect password',
        body: '• Try entering your password again'
      })
      return
    }

    retrieveMnemonic().then(mnemonic => {
      const mnemonicInstance = new Mnemonic(mnemonic)

      retrieveHashedPassword().then(referenceHashedPassword => {
        const hashedPassword = mnemonicInstance.toSeed(PASSWORD_SALT + this.state.password)

        if (hashedPassword.join('.') !== referenceHashedPassword.data.join('.')) {
          this.statusAlert.display({
            type: 'warn',
            title: 'Incorrect password',
            body: '• Try entering your password again'
          })
          return
        }

        this.props.dismiss(mnemonic, this.state.password)
      })
    })
  }

  render () {
    return <ScrollView>
             {views[this.state.view].call(this)}
             <StatusAlert display={'dialog'} ref={statusAlert => this.statusAlert = statusAlert} />
           </ScrollView>
  }
}
