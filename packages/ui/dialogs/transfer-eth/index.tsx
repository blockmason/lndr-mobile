import React, { Component } from 'react'

import { Text, TextInput, TouchableHighlight, View, Image, ScrollView } from 'react-native'
import { getResetAction } from 'reducers/nav'

import { UserData } from 'lndr/user'
import { debounce } from 'lndr/time'
import { ethAmount, ethAddress } from 'lndr/format'
import Friend from 'lndr/friend'
import { defaultCurrency, currencySymbols, transferLimits  } from 'lndr/currencies'

import Button from 'ui/components/button'
import Loading, { LoadingContext } from 'ui/components/loading'
import DashboardShell from 'ui/components/dashboard-shell'
import RecentView from 'ui/views/account/activity/recent'

import style from 'theme/friend'
import formStyle from 'theme/form'
import general from 'theme/general'
import accountStyle from 'theme/account'

import language from 'language'
const {
  back,
  cancel,
  accountManagement
} = language

import { getUser, getEthBalance, getEthExchange, getWeeklyEthTotal } from 'reducers/app'
import { sendEth, getEthTxCost } from 'actions'
import { connect } from 'react-redux'
import { addNavigationHelpers } from 'react-navigation';

const sendingEthLoader = new LoadingContext()

interface Props {
  sendEth: (address: string, amount: string) => any
  user: UserData
  ethBalance: string
  ethSentPastWeek: number
  ethExchange: string
  navigation: any
}

interface State {
  amount?: string
  formInputError?: string
  address?: string
  txCost: string
  currency: string
}

class TransferEth extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      txCost: '0.00',
      currency: defaultCurrency
    }
  }

  async componentWillMount() {
    const txCost = await getEthTxCost(defaultCurrency)
    this.setState({ txCost })
  }

  async submit() {
    const { amount, address, currency } = this.state
    const { ethExchange, ethSentPastWeek } = this.props

    if (!this.validAddress()) {
      this.setState({ formInputError: accountManagement.sendEth.error.address })
      return
    } else if (!amount || amount === '0') {
      this.setState({ formInputError: accountManagement.sendEth.error.amount })
      return
    }

    if (( ethSentPastWeek + Number(amount) ) * Number(ethExchange) > Number(transferLimits[currency]) ) {
      this.setState({ formInputError: accountManagement.sendEth.error.limitExceeded(defaultCurrency) })
      return
    }

    const success = await sendingEthLoader.wrap(
      this.props.sendEth(
        address as string,
        amount as string
      )
    )

    this.clear()

    if (success && typeof success !== 'string' && success.type === '@@TOAST/DISPLAY_ERROR') {
      this.props.navigation.goBack()
    } else {
      const resetAction = getResetAction({ routeName:'Confirmation', params: { type: 'ethSent', txHash: success, amount: amount } })
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
    return `${ethAmount(amount)}`
  }

  setAddress(address) {
    return `${ethAddress(address)}`
  }

  validAddress() {
    const { address } = this.state
    return address && address.length === 40
  }

  getLimit() {
    const { currency, formInputError } = this.state
    const { ethExchange, ethSentPastWeek } = this.props
    const remaining = String(Number(transferLimits[currency]) - Number(ethSentPastWeek) * Number(ethExchange))
    const end = remaining.indexOf('.') === -1 ? remaining.length : remaining.indexOf('.') + 3
    return remaining.slice(0, end)
  }

  toFiat(amount, exchange, currency) {
    if (amount === undefined) {
      amount = '0'
    }
    const remaining = `${currencySymbols[currency]}${Number(amount) * Number(exchange)}`
    const end = remaining.indexOf('.') === -1 ? remaining.length : remaining.indexOf('.') + 3
    return remaining.slice(0, end)
  }

  render() {
    const { amount, address, txCost, currency, formInputError } = this.state
    const { ethBalance, ethExchange, ethSentPastWeek } = this.props

    return <ScrollView style={general.whiteFlex} keyboardShouldPersistTaps='handled'>
      <Loading context={sendingEthLoader} />
      <DashboardShell text={accountManagement.sendEth.transferLowercase} navigation={this.props.navigation} />
      <Button close onPress={() => this.props.navigation.goBack()} />
      <View style={general.largeHMargin} >
        <View style={[general.centeredColumn, {marginBottom: 20}]}>
          <View style={general.centeredColumn} >
            <Text style={[formStyle.header, {textAlign: 'center'}]}>{accountManagement.sendEth.balance(ethBalance)}</Text>
            <View style={formStyle.textInputContainer}>
              <TextInput
                style={[formStyle.textInput,  {paddingVertical: 3}]}
                placeholder={accountManagement.sendEth.address}
                placeholderTextColor='black'
                value={address}
                maxLength={40}
                underlineColorAndroid='transparent'
                onChangeText={address => this.setState({ address: this.setAddress(address), formInputError: undefined })}
              />
            </View>
            <Text style={[formStyle.smallText, formStyle.spaceTop, formStyle.center]}>{accountManagement.sendEth.warning(this.getLimit(), currency)}</Text>
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
                onChangeText={amount => this.setState({ amount: this.setAmount(amount), formInputError: undefined })}
              />
            </View>
          </View>
          <Text style={[formStyle.smallText, formStyle.center, formStyle.spaceTopS]}>{this.toFiat(amount, ethExchange, currency)}</Text>
          <Text style={[accountStyle.txCost, formStyle.spaceTop]}>{accountManagement.sendEth.txCost(txCost, currency)}</Text>
        </View>
        { formInputError && <Text style={[formStyle.warningText, {alignSelf: 'center'}]}>{formInputError}</Text>}
        <Button large round wide onPress={() => this.submit()} text={accountManagement.sendEth.transfer} />
      </View>
    </ScrollView>
  }
}

export default connect((state) => ({ user: getUser(state)(), ethBalance: getEthBalance(state), ethExchange: getEthExchange(state),
  ethSentPastWeek: getWeeklyEthTotal(state) }), { sendEth })(TransferEth)
