import React, { Component } from 'react'
import { View, Text, TextInput } from 'react-native'

import Button from 'ui/components/button'

import { RecoverAccountData, defaultRecoverAccountData } from 'lndr/user'

import InputImage from 'ui/components/images/input-image'
import Loading, { LoadingContext } from 'ui/components/loading'

import {
  newPassword,
  recoverAccount,
  recoverMnemonic,
  recoverExistingAccount,
  cancel
} from 'language'

import style from 'theme/form'

const loadingContext = new LoadingContext()

interface Props {
  onSubmitRecoverUser: (formData: RecoverAccountData) => void
  onCancel: () => void
}

export default class RecoverAccountForm extends Component<Props, RecoverAccountData> {
  constructor() {
    super()
    this.state = defaultRecoverAccountData()
  }

  async submit() {
    await loadingContext.wrap(this.props.onSubmitRecoverUser(this.state))
  }

  cancel() {
    this.props.onCancel()
  }

  render() {
    return <View style={style.form}>
      <Text style={[style.text, style.spaceBottom]}>{recoverExistingAccount}</Text>
      <View style={style.textInputContainer}>
        <TextInput
          multiline
          style={style.multilineTextInput}
          placeholder={recoverMnemonic}
          underlineColorAndroid='transparent'
          onChangeText={mnemonic => this.setState({ mnemonic: mnemonic.trim() })}
        />
      </View>
      <View style={[style.textInputContainer, style.spaceBottom]}>
        <InputImage name='lock'/>
        <TextInput
          secureTextEntry
          style={style.textInput}
          placeholder={newPassword}
          underlineColorAndroid='transparent'
          onChangeText={confirmPassword => this.setState({ confirmPassword })}
        />
      </View>
      <Button round fat style={style.submitButton} onPress={() => this.submit()} text={recoverAccount} />
      <Button alternate small arrow style={style.submitButton} onPress={() => this.cancel()} text={cancel} />
    </View>
  }
}
