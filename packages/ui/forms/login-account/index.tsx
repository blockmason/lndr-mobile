import React, { Component } from 'react'
import { View, Text, TextInput } from 'react-native'

import Button from 'ui/components/button'
import InputImage from 'ui/components/images/input-image'
import Pinpad from 'ui/components/pinpad'

import Loading, { LoadingContext } from 'ui/components/loading'

import { LoginAccountData, defaultLoginAccountData } from 'lndr/user'

import language from 'language'
const {
  loginAccount,
  loginAction,
  removeAccount,
  confirmPassword,
  enterPin
} = language

import style from 'theme/form'
import general from 'theme/general'

const loadingContext = new LoadingContext()

interface Props {
  onSubmit: (formData: LoginAccountData) => void
  onRemoveAccount: () => void
}

interface State {
  confirmPassword: string
}

export default class LoginAccountForm extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      confirmPassword: ''
    }
    this.enterPin.bind(this)
    this.clearPin.bind(this)
  }

  async submit(confirmPassword: string) {
    const success = await loadingContext.wrap(this.props.onSubmit({ confirmPassword }))
    if (!success) {
      this.setState({ confirmPassword: '' })
    }
  }

  componentDidUpdate() {
    const { confirmPassword } = this.state
    if (confirmPassword.length === 4) {
      this.submit(confirmPassword)
    }
  }

  enterPin(num: string) {
    const { confirmPassword } = this.state
    const fullPin = confirmPassword + num
    this.setState({ confirmPassword: fullPin })
  }

  clearPin() {
    const { confirmPassword } = this.state
    this.setState({ confirmPassword: confirmPassword.slice(0, -1) })
  }

  render() {
    const { onRemoveAccount } = this.props
    const { confirmPassword } = this.state

    return <View style={[style.form, general.centeredColumn]}>
      <Pinpad onNumPress={(pin) => this.enterPin(pin)} onBackspace={() => this.clearPin()} pin={confirmPassword} headerText={enterPin} />
      <Button alternate small arrow onPress={() => onRemoveAccount()} style={style.submitButton} text={removeAccount} />
    </View>
  }
}
