import React, { Component } from 'react'

import { View, Text, TextInput } from 'react-native'

import Button from 'ui/components/button'

import { LoginAccountData, defaultLoginAccountData } from 'lndr/user'

import {
  loginAccount,
  loginAction,
  removeAccount,
  confirmPassword
} from 'language'

import style from 'theme/form'

interface Props {
  onSubmit: (formData: LoginAccountData) => void
  onRemoveAccount: () => void
}

export default class LoginAccountForm extends Component<Props, LoginAccountData> {
  constructor() {
    super()
    this.state = defaultLoginAccountData()
  }

  render() {
    const { onSubmit, onRemoveAccount } = this.props
    return <View style={style.form}>
      <Text style={style.text}>{loginAccount}</Text>
      <TextInput
        secureTextEntry
        style={style.textInput}
        placeholder={confirmPassword}
        onChangeText={confirmPassword => this.setState({ confirmPassword })}
      />
      <Button icon='md-lock' onPress={() => onSubmit(this.state)} text={loginAction} />
      <Button alternate onPress={() => onRemoveAccount()} text={removeAccount} />
    </View>
  }
}
