import React, { Component } from 'react'

import { View, Text, TextInput } from 'react-native'

import Button from 'ui/components/button'

import { RecoverAccountData, defaultRecoverAccountData } from 'lndr/user'

import {
  newPassword,
  recoverAccount,
  recoverMnemonic,
  recoverExistingAccount,
  cancel
} from 'language'

import style from 'theme/form'

interface Props {
  onSubmitRecoverUser: (formData: RecoverAccountData) => void
  onCancel: () => void
}

export default class RecoverAccountForm extends Component<Props, RecoverAccountData> {
  constructor() {
    super()
    this.state = defaultRecoverAccountData()
  }

  render() {
    return <View style={style.form}>
      <Text style={style.text}>{recoverExistingAccount}</Text>
      <TextInput
        multiline
        style={style.multilineTextInput}
        placeholder={recoverMnemonic}
        onChangeText={mnemonic => this.setState({ mnemonic: mnemonic.trim() })}
      />
      <TextInput
        secureTextEntry
        style={style.textInput}
        placeholder={newPassword}
        onChangeText={confirmPassword => this.setState({ confirmPassword })}
      />
      <Button onPress={() => this.submit()} text={recoverAccount} />
      <Button alternate onPress={() => this.cancel()} text={cancel} />
    </View>
  }

  submit() {
    this.props.onSubmitRecoverUser(this.state)
  }

  cancel() {
    this.props.onCancel()
  }
}
