import React, { Component } from 'react'

import { View, Text, TextInput, BackAndroid, BackHandler, KeyboardAvoidingView } from 'react-native'

import Button from 'ui/components/button'
import ThemeImage from 'ui/components/images/theme-image'
import TextLogo from 'ui/components/images/text-logo'
import { CreateAccountData, defaultCreateAccountData } from 'lndr/user'

import { formatNick, formatEmail, formatPin, emailFormatIncorrect, nickLengthIncorrect } from 'lndr/format'
import Pinpad from 'ui/components/pinpad'

import InputImage from 'ui/components/images/input-image'

import language from 'language'
const {
  newAccount,
  nickname,
  email,
  newPin,
  enterNewPin,
  confirmPin,
  createAccount,
  recoverAccount
} = language

import style from 'theme/form'
import general from 'theme/general'

interface Props {
  onNickTextInputBlur: (nickname: string) => void
  nickInputError: string
  onEmailTextInputBlur: (email: string) => void
  emailInputError: string
  onSubmitCreateUser: (formData: CreateAccountData) => void
  onSubmitRecover: () => void
  nickDuplicationViolation?: boolean
  emailDuplicationViolation?: boolean
  emailFormatViolation?: boolean
  nickLengthViolation?: boolean
}

interface State {
  step: number
  nickname: string
  email: string
  password: string
  confirmPassword: string
}

export default class CreateAccountForm extends Component<Props, State> {
  constructor() {
    super()
    this.state = {
      ...defaultCreateAccountData(),
      step: 1
    }
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  onBackPress = () => {
    const { step } = this.state
    if (step === 1) {
      BackAndroid.exitApp()
    } else {
      this.setState({ password: '', confirmPassword: '', step: step - 1 })
    }
  }

  componentDidUpdate() {
    const { password, confirmPassword, step } = this.state

    if (password.length === 4 && confirmPassword.length === 4) {
      this.props.onSubmitCreateUser(this.state)
    } else if (password.length === 4 && step === 2) {
      this.setState({ step: 3 })
    }
  }

  submit() {
    const { nickDuplicationViolation, emailDuplicationViolation } = this.props
    const { email, nickname } = this.state
    if(!nickDuplicationViolation && !emailDuplicationViolation && !emailFormatIncorrect(email) && !nickLengthIncorrect(nickname) && nickname && email ) {
      this.setState({ step: 2 })
    }
  }

  recover() {
    this.props.onSubmitRecover()
  }

  enterPin(num: string) {
    const { password } = this.state
    const fullPin = password + num
    this.setState({ password: fullPin })
  }

  confirmPin(num: string) {
    const { confirmPassword } = this.state
    const fullPin = confirmPassword + num
    this.setState({ confirmPassword: fullPin })
  }

  clearPin() {
    const { password } = this.state
    this.setState({ password: password.slice(0, -1) })
  }

  clearConfirmPin() {
    const { confirmPassword } = this.state
    this.setState({ confirmPassword: confirmPassword.slice(0, -1) })
  }

  render() {
    const { onNickTextInputBlur, nickInputError, onEmailTextInputBlur, emailInputError } = this.props
    const { password, confirmPassword, step } = this.state

    if (step === 3) {
      return <View style={style.form}>
        <Pinpad onNumPress={(pin) => this.confirmPin(pin)} onBackspace={() => this.clearConfirmPin()} pin={confirmPassword} headerText={confirmPin} />
      </View>
    } else if (step === 2) {
      return <View style={style.form}>
        <Pinpad onNumPress={(pin) => this.enterPin(pin)} onBackspace={() => this.clearPin()} pin={password} headerText={enterNewPin} />
      </View>
    } else {
      return (<View style={style.form}>
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={200} >
          <ThemeImage name='logo' size={0.4} />
          <Text style={[style.text, style.spaceBottom]}>{newAccount}</Text>
          <View style={style.textInputContainer}>
            <InputImage name='person'/>
            <TextInput
              autoCapitalize='none'
              style={style.textInput}
              placeholder={nickname}
              value={this.state.nickname}
              maxLength={20}
              underlineColorAndroid='transparent'
              onChangeText={nickname => this.setState({ nickname: formatNick(nickname) })}
              onBlur={(): void => onNickTextInputBlur(this.state.nickname)}
            />
          </View>
          { nickInputError && <Text style={style.warningText}>{nickInputError}</Text>}
          <View style={style.textInputContainer}>
            <InputImage name='email'/>
            <TextInput
              autoCapitalize='none'
              style={style.textInput}
              placeholder={email}
              value={this.state.email}
              underlineColorAndroid='transparent'
              keyboardType='email-address'
              onChangeText={email => this.setState({ email: formatEmail(email) })}
              onBlur={(): void => onEmailTextInputBlur(this.state.email)}
            />
          </View>
          { emailInputError && <Text style={style.warningText}>{emailInputError}</Text>}
          <Button round fat onPress={() => this.submit()} style={style.submitButton} text={createAccount} />
          <Button alternate small arrow onPress={() => this.recover()} style={style.submitButton} text={recoverAccount} />
        </KeyboardAvoidingView>
      </View>)
    }
  }
}
