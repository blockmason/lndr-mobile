import React, { Component } from 'react'
import { View, Text, TextInput, BackAndroid, BackHandler, KeyboardAvoidingView, Platform } from 'react-native'

import ThemeImage from 'ui/components/images/theme-image'
import Pinpad from 'ui/components/pinpad'
import Button from 'ui/components/button'

import { RecoverAccountData, defaultRecoverAccountData } from 'lndr/user'
import User from 'lndr/user'
import { getUser } from 'reducers/app'

import InputImage from 'ui/components/images/input-image'
import Loading, { LoadingContext } from 'ui/components/loading'
import { formatPin } from 'lndr/format'
import { connect } from 'react-redux'

import language from 'language'
const {
  newPin,
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
import general from 'theme/general'

const loadingContext = new LoadingContext()

interface Props {
  onSubmitRecoverUser: (formData: RecoverAccountData) => void
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
  constructor() {
    super()
    this.state = {
      ...defaultRecoverAccountData(),
      step: 1
    }
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
      BackAndroid.exitApp()
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

  render() {
    const { password, confirmPassword, step, mnemonicLengthError } = this.state

    if (step === 4) {
      return <View style={style.form}>
        <Pinpad onNumPress={() => null} onBackspace={() => null} pin={confirmPassword} headerText={pleaseWait} />
      </View>
    } else if (step === 3) {
      return <View style={style.form}>
        <Pinpad onNumPress={(pin) => this.confirmPin(pin)} onBackspace={() => this.clearConfirmPin()} pin={confirmPassword} headerText={confirmPin} />
      </View>
    } else if (step === 2) {
      return <View style={style.form}>
        <Pinpad onNumPress={(pin) => this.enterPin(pin)} onBackspace={() => this.clearPin()} pin={password} headerText={enterNewPin} />
      </View>
    } else {
      return <View style={style.form}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : 'padding'} keyboardVerticalOffset={0} >
          <ThemeImage name='logo' size={0.4} />
          <Text style={[style.text, style.spaceBottom]}>{recoverExistingAccount}</Text>
          <View style={style.textInputContainer}>
            <TextInput
              multiline
              style={style.multilineTextInput}
              placeholder={recoverMnemonic}
              underlineColorAndroid='transparent'
              autoCorrect={false}
              onChangeText={mnemonic => this.setState({ mnemonic: mnemonic.trim(), mnemonicLengthError: undefined })}
              onBlur={(): void => this.checkMnemonicLength()}
            />
          </View>
          { mnemonicLengthError && <Text style={style.warningText}>{mnemonicLengthError}</Text> }
          <Button round fat style={style.submitButton} onPress={() => this.setPIN()} text={recoverAccount} />
          <Button alternate small arrow style={style.submitButton} onPress={() => this.cancel()} text={cancel} />
        </KeyboardAvoidingView>
      </View>
    }
  }
}

export default connect((state) => ({ user: getUser(state)() }))(RecoverAccountForm)
