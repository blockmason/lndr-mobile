import React, { Component } from 'react'
import { View, ScrollView, Text, TextInput, BackHandler, KeyboardAvoidingView, Platform } from 'react-native'

import ThemeImage from 'ui/components/images/theme-image'
import Pinpad from 'ui/components/pinpad'
import Button from 'ui/components/button'

import { RecoverAccountData, defaultRecoverAccountData } from 'lndr/user'
import User from 'lndr/user'
import { getUser } from 'reducers/app'

import { LoadingContext } from 'ui/components/loading'
import { connect } from 'react-redux'

import language from 'language'
const {
  recoverAccount,
  recoverMnemonic,
  recoverMnemonicLengthError,
  recoverExistingAccount,
  cancel,
  enterNewPin,
  confirmPin,
  pleaseWait
} = language

import style from 'theme/form'

const loadingContext = new LoadingContext()

interface Props {
  onSubmitRecoverUser: (formData: RecoverAccountData) => any
  onCancel: () => void
  user: User
}

interface State {
  step: number
  mnemonic: string
  password: string
  confirmPassword: string
  mnemonicLengthError?: string
}

class RecoverAccountForm extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      ...defaultRecoverAccountData(),
      step: 1
    }

    this.enterMnemonic = this.enterMnemonic.bind(this)
    this.cancel = this.cancel.bind(this)
    this.setPIN = this.setPIN.bind(this)
    this.checkMnemonicLength = this.checkMnemonicLength.bind(this)
    this.clearConfirmPin = this.clearConfirmPin.bind(this)
    this.clearPin = this.clearPin.bind(this)
    this.confirmPin = this.confirmPin.bind(this)
    this.enterPin = this.enterPin.bind(this)
    this.nullReturn = this.nullReturn.bind(this)
  }

  cancel() {
    this.props.onCancel()
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
      BackHandler.exitApp()
    } else {
      this.setState({ password: '', confirmPassword: '', step: step - 1 })
    }
  }

  async componentDidUpdate() {
    const { password, confirmPassword, step } = this.state
    const { user, onSubmitRecoverUser } = this.props

    if (step === 4) {
      const component = this

      setTimeout( async () => {
        const success = await loadingContext.wrap(onSubmitRecoverUser(component.state))

        if (!success && !user) {
          loadingContext.wrap(component.setState({ step: 1, password: '', confirmPassword: '' }))
        }
      }, 100)

    } else if (password.length === 4 && confirmPassword.length === 4) {
      this.setState({ step: 4 })
    } else if (password.length === 4 && step === 2) {
      this.setState({ step: 3 })
    }
  }

  enterMnemonic(mnemonic: string) {
    this.setState({ mnemonic: mnemonic.trim(), mnemonicLengthError: undefined })
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

  checkMnemonicLength() {
    const mnemonicLengthError = this.state.mnemonic.split(' ').length !== 12 ? recoverMnemonicLengthError : undefined
    this.setState({ mnemonicLengthError })
  }

  setPIN() {
    if (this.state.mnemonicLengthError) {
      return
    }
    this.setState({ step: 2 })
  }

  nullReturn() {
    return null
  }

  render() {
    const { password, confirmPassword, step, mnemonicLengthError } = this.state

    if (step === 4) {
      return <View style={style.form}>
        <Pinpad onNumPress={this.nullReturn} onBackspace={this.nullReturn} pin={confirmPassword} headerText={pleaseWait} />
      </View>
    } else if (step === 3) {
      return <View style={style.form}>
        <Pinpad onNumPress={this.confirmPin} onBackspace={this.clearConfirmPin} pin={confirmPassword} headerText={confirmPin} />
      </View>
    } else if (step === 2) {
      return <View style={style.form}>
        <Pinpad onNumPress={this.enterPin} onBackspace={this.clearPin} pin={password} headerText={enterNewPin} />
      </View>
    } else {
      const vertOffset = (Platform.OS === 'android') ? -300 : 0;
      return <ScrollView keyboardShouldPersistTaps="never">
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : 'padding'} keyboardVerticalOffset={vertOffset} >
          <View style={style.form}>
            <ThemeImage name='logo' size={0.4} />
            <Text style={[style.text, style.spaceBottom]}>{recoverExistingAccount}</Text>
            <View style={style.textInputContainer}>
              <TextInput
                multiline
                style={style.multilineTextInput}
                placeholder={recoverMnemonic}
                underlineColorAndroid='transparent'
                autoCorrect={false}
                onChangeText={this.enterMnemonic}
                onBlur={this.checkMnemonicLength}
              />
            </View>
            { mnemonicLengthError && <Text style={style.warningText}>{mnemonicLengthError}</Text> }
            <Button round fat style={style.submitButton} onPress={this.setPIN} text={recoverAccount} />
            <Button alternate small arrow style={style.submitButton} onPress={this.cancel} text={cancel} />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    }
  }
}

export default connect((state) => ({ user: getUser(state)() }))(RecoverAccountForm)
