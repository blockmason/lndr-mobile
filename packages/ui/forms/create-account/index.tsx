import React, { Component } from 'react'

import { View, Text, TextInput } from 'react-native'

import Button from 'ui/components/button'

import { CreateAccountData, defaultCreateAccountData } from 'lndr/user'

import InputImage from 'ui/components/images/input-image'

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
  onNickTextInputBlur: (nickname: string) => void
  nickTextInputErrorText: string
  onSubmitCreateUser: (formData: CreateAccountData) => void
  onSubmitRecover: () => void
}

export default class CreateAccountForm extends Component<Props, CreateAccountData> {
  constructor() {
    super()
    this.state = defaultCreateAccountData()
  }

  render() {
    const { onNickTextInputBlur, nickTextInputErrorText } = this.props
    return <View style={style.form}>
      <Text style={[style.text, style.spaceBottom]}>{newAccount}</Text>
      <View style={style.textInputContainer}>
        <InputImage name='person'/>
        <TextInput
          autoCapitalize='none'
          style={style.textInput}
          placeholder={nickname}
          value={this.state.nickname}
          underlineColorAndroid='transparent'
          onChangeText={nickname => this.setState({ nickname })}
          onBlur={(): void => onNickTextInputBlur(this.state.nickname)}
        />
      </View>
      { nickTextInputErrorText && <Text style={style.warningText}>{nickTextInputErrorText}</Text>}
      <View style={style.textInputContainer}>
        <InputImage name='lock'/>
        <TextInput
          secureTextEntry
          style={style.textInput}
          placeholder={newPassword}
          underlineColorAndroid='transparent'
          onChangeText={password => this.setState({ password })}
        />
      </View>
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
      <Button round fat onPress={() => this.submit()} style={style.submitButton} text={createAccount} />
      <Button alternate small arrow onPress={() => this.recover()} style={style.submitButton} text={recoverAccount} />
    </View>
  }

  submit() {
    this.props.onSubmitCreateUser(this.state)
  }

  recover() {
    this.props.onSubmitRecover()
  }
}
