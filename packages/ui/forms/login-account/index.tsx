import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'

import Pinpad from 'ui/components/pinpad'

import { LoadingContext } from 'ui/components/loading'

import { LoginAccountData } from 'lndr/user'

import language from 'language'
const {
  enterPin
} = language

import style from 'theme/form'
import general from 'theme/general'

const loadingContext = new LoadingContext()

interface Props {
  onSubmit: (formData: LoginAccountData) => void
}

interface State {
  confirmPassword: string
  unmounting?: boolean
}

export default class LoginAccountForm extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      confirmPassword: ''
    }
    this.enterPin.bind(this)
    this.clearPin.bind(this)
  }

  componentWillUnmount() {
    this.setState({unmounting: true})
  }

  componentDidUpdate() {
    const { confirmPassword } = this.state
    if (confirmPassword.length === 4) {
      this.submit(confirmPassword)
    }
  }

  async submit(confirmPassword: string) {
    const success = await loadingContext.wrap(this.props.onSubmit({ confirmPassword }))
    if (!this.state.unmounting && !success) {
      this.setState({ confirmPassword: '' })
    }
  }

  enterPin(num: string) {
    const { confirmPassword } = this.state
    const fullPin = confirmPassword + num
    this.setState({ confirmPassword: fullPin })
  }

  clearPin() {
    const { confirmPassword } = this.state
    this.setState({ confirmPassword: confirmPassword.slice(0, -1) })
  }

  render() {
    const { confirmPassword } = this.state

    return <ScrollView keyboardShouldPersistTaps="always">
      <View style={[style.form, general.centeredColumn]}>
        <Pinpad onNumPress={(pin) => this.enterPin(pin)} onBackspace={() => this.clearPin()} pin={confirmPassword} headerText={enterPin} />
      </View>
    </ScrollView>
  }
}
