import React, { Component } from 'react'

import { View, Text, TextInput } from 'react-native'

import Button from 'ui/components/button'

import { CreateAccountData, defaultCreateAccountData } from 'lndr/user'

import {
  newAccount,
  nickname,
  newPassword,
  confirmPassword,
  createAccount,
  recoverAccount
} from 'language'

import style from 'theme/form'

interface Props {
  onSubmitCreateUser: (formData: CreateAccountData) => void
  onSubmitRecover: () => void
}

export default class CreateAccountForm extends Component<Props, CreateAccountData> {
  constructor() {
    super()
    this.state = defaultCreateAccountData()
  }

  render() {
    return <View style={style.form}>
      <Text style={style.text}>{newAccount}</Text>
      <TextInput
        autoCapitalize='none'
        style={style.textInput}
        placeholder={nickname}
        value={this.state.nickname}
        onChangeText={nickname => this.setState({ nickname })}
      />
      <TextInput
        secureTextEntry
        style={style.textInput}
        placeholder={newPassword}
        onChangeText={password => this.setState({ password })}
      />
      <TextInput
        secureTextEntry
        style={style.textInput}
        placeholder={confirmPassword}
        onChangeText={confirmPassword => this.setState({ confirmPassword })}
      />
      <Button onPress={() => this.submit()} text={createAccount} />
      <Button alternate onPress={() => this.recover()} text={recoverAccount} />
    </View>
  }

  submit() {
    this.props.onSubmitCreateUser(this.state)
  }

  recover() {
    this.props.onSubmitRecover()
  }
}
