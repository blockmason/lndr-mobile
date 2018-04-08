import React, { Component } from 'react'

import { Text, TextInput, TouchableHighlight, View, Image, ScrollView } from 'react-native'
import { getResetAction } from 'reducers/nav'

import { UserData } from 'lndr/user'
import { debounce } from 'lndr/time'
import { bcptAmount, ethAddress } from 'lndr/format'
import Friend from 'lndr/friend'

import Button from 'ui/components/button'
import Loading, { LoadingContext } from 'ui/components/loading'
import DashboardShell from 'ui/components/dashboard-shell'
import RecentView from 'ui/views/account/activity/recent'

import style from 'theme/friend'
import formStyle from 'theme/form'
import general from 'theme/general'

import language from 'language'
const {
  back,
  cancel,
  accountManagement
} = language

import { getUser, getBcptBalance } from 'reducers/app'
import { sendBcpt } from 'actions'
import { connect } from 'react-redux'
import { addNavigationHelpers } from 'react-navigation';

const sendingBcptLoader = new LoadingContext()

interface Props {
  sendBcpt: (address: string, amount: string) => any
  user: UserData
  bcptBalance: string
  navigation: any
}

interface State {
  amount?: string
  address?: string
  formInputError?: string
  error?: string
}

class TransferBcpt extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {}
  }

  async submit() {
    const { amount, address } = this.state

    if (!this.validAddress()) {
      this.setState({ formInputError: accountManagement.sendBcpt.error.address })
      return
    } else if (!amount || amount === '0') {
      this.setState({ formInputError: accountManagement.sendBcpt.error.amount })
      return
    }

    const success = await sendingBcptLoader.wrap(
      this.props.sendBcpt(
        address as string,
        amount as string
      )
    )

    this.clear()

    if (success && typeof success !== 'string' && success.type === '@@TOAST/DISPLAY_ERROR') {
      this.props.navigation.goBack()
    } else {
      const resetAction = getResetAction({ routeName:'Confirmation', params: { type: 'bcptSent', txHash: success, amount: amount } })
      this.props.navigation.dispatch(resetAction)
    }
  }

  clear() {
    this.setState( { amount: undefined, address: undefined } )
  }

  cancel() {
    this.clear()
    this.props.navigation.goBack()
  }

  setAmount(amount) {
    return `${bcptAmount(amount)}`
  }

  setAddress(address) {
    return `${ethAddress(address)}`
  }

  validAddress() {
    const { address } = this.state
    return address && address.length === 40
  }

  render() {
    const { amount, address, formInputError, error } = this.state
    const { bcptBalance } = this.props

    return <ScrollView style={general.whiteFlex} keyboardShouldPersistTaps='handled'>
      <Loading context={sendingBcptLoader} />
      <DashboardShell text={accountManagement.sendBcpt.transfer} navigation={this.props.navigation} />
      <Button close onPress={() => this.props.navigation.goBack()} />
      <View style={general.largeHMargin} >
        <View style={[general.centeredColumn, {marginBottom: 20}]}>
          <View style={general.centeredColumn} >
            <Text style={[formStyle.header, {textAlign: 'center'}]}>{accountManagement.sendBcpt.balance(bcptBalance)}</Text>
            <View style={formStyle.textInputContainer}>
              <TextInput
                style={[formStyle.textInput,  {paddingVertical: 3}]}
                placeholder={accountManagement.sendBcpt.address}
                placeholderTextColor='black'
                value={address}
                maxLength={40}
                underlineColorAndroid='transparent'
                onChangeText={address => this.setState({ address: this.setAddress(address) })}
              />
            </View>
            <Text style={formStyle.title}>{accountManagement.sendEth.amount}</Text>
            <View style={formStyle.textInputContainer}>
              <TextInput
                style={[{flex: 1}, formStyle.jumboInput, {paddingVertical: 4}]}
                placeholder={'0'}
                placeholderTextColor='black'
                value={amount}
                maxLength={14}
                underlineColorAndroid='transparent'
                keyboardType='numeric'
                onChangeText={amount => this.setState({ amount: this.setAmount(amount) })}
              />
            </View>
          </View>
        </View>
        { !!formInputError && <Text style={formStyle.warningText}>{formInputError}</Text>}
        <Button large round wide onPress={() => this.submit()} text={accountManagement.sendBcpt.transfer} />
      </View>
    </ScrollView>
  }
}

export default connect((state) => ({ user: getUser(state)(), bcptBalance: getBcptBalance(state) }),
{ sendBcpt })(TransferBcpt)
