import React, { Component } from 'react'
import { View, Text, TextInput, BackAndroid, BackHandler, KeyboardAvoidingView } from 'react-native'

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

import {
  newPin,
  recoverAccount,
  recoverMnemonic,
  recoverExistingAccount,
  cancel,
  enterNewPin,
  confirmPin
} from 'language'

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
    const { user } = this.props

    if (password.length === 4 && confirmPassword.length === 4) {
      const success = await loadingContext.wrap(this.props.onSubmitRecoverUser(this.state))

      if (!success && !user) {
        loadingContext.wrap(this.setState({ step: 1, password: '', confirmPassword: '' }))
      }

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

  render() {
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
      return <View style={style.form}>
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={300} >
          <ThemeImage name='logo' size={0.4} />
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
          <Button round fat style={style.submitButton} onPress={() => this.setState({ step: 2 })} text={recoverAccount} />
          <Button alternate small arrow style={style.submitButton} onPress={() => this.cancel()} text={cancel} />
        </KeyboardAvoidingView>
      </View>
    }
  }
}

export default connect((state) => ({ user: getUser(state)() }))(RecoverAccountForm)
