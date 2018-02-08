import React, { Component } from 'react'
import { View, Text, TextInput } from 'react-native'

import Button from 'ui/components/button'
import InputImage from 'ui/components/images/input-image'
import Loading, { LoadingContext } from 'ui/components/loading'

import { LoginAccountData, defaultLoginAccountData } from 'lndr/user'

import {
  loginAccount,
  loginAction,
  removeAccount,
  confirmPassword
} from 'language'

import style from 'theme/form'

const loadingContext = new LoadingContext()

interface Props {
  onSubmit: (formData: LoginAccountData) => void
  onRemoveAccount: () => void
}

export default class LoginAccountForm extends Component<Props, LoginAccountData> {
  constructor() {
    super()
    this.state = defaultLoginAccountData()
  }

  async submit() {
    await loadingContext.wrap(this.props.onSubmit(this.state))
  }

  render() {
    const { onRemoveAccount } = this.props
    return <View style={style.form}>
      <Text style={[style.text, style.spaceBottom]}>{loginAccount}</Text>
      <View style={[style.textInputContainer, style.spaceBottom]}>
        <InputImage name='lock'/>
        <TextInput
          secureTextEntry
          style={style.textInput}
          placeholder={confirmPassword}
          underlineColorAndroid='transparent'
          onChangeText={confirmPassword => this.setState({ confirmPassword })}
        />
      </View>
      <Button round fat onPress={() => this.submit()} style={style.submitButton} text={loginAction} />
      <Button alternate small arrow onPress={() => onRemoveAccount()} style={style.submitButton} text={removeAccount} />
    </View>
  }
}
