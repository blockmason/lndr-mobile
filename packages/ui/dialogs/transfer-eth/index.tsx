import React, { Component } from 'react'

import { Text, TextInput, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import firebase from 'react-native-firebase'

import { getResetAction } from 'reducers/nav'

import { UserData } from 'lndr/user'
import { ethAmount, isEthAddress, formatCommaDecimal, formatEthRemaining } from 'lndr/format'
import { currencySymbols, transferLimits, isCommaDecimal } from 'lndr/currencies'

import Button from 'ui/components/button'
import Loading, { LoadingContext } from 'ui/components/loading'
import DashboardShell from 'ui/components/dashboard-shell'

import formStyle from 'theme/form'
import general from 'theme/general'
import accountStyle from 'theme/account'

import language from 'language'
const {
  accountManagement
} = language

import { getUser, getEthBalance, getEthExchange, getWeeklyEthTotal, getPrimaryCurrency, getTransferLimitLevel } from 'reducers/app'
import { sendEth, getEthTxCost } from 'actions'
import { connect } from 'react-redux'

const sendingEthLoader = new LoadingContext()

interface Props {
  user: UserData
  ethBalance: string
  ethSentPastWeek: number
  navigation: any
  primaryCurrency: string
  ethExchange: (currency: string) => string
  sendEth: (address: string, amount: string) => any
  transferLimitLevel: () => string
}

interface State {
  amount?: string
  formInputError?: string
  address?: string
  txCost: string
}

class TransferEth extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      txCost: '0.00'
    }

    this.blurAmountFormat = this.blurAmountFormat.bind(this)
  }

  async componentWillMount() {
    const { primaryCurrency } = this.props
    const txCost = await getEthTxCost(primaryCurrency)
    this.setState({ txCost })
  }

  componentDidMount( ) {
    firebase.analytics().setCurrentScreen('transfer-eth', 'TransferEth');
  }

  async submit() {
    const { amount, address } = this.state
    const { ethExchange, ethSentPastWeek, primaryCurrency, transferLimitLevel } = this.props

    if (!address || !this.validAddress()) {
      this.setState({ formInputError: accountManagement.sendEth.error.address })
      return
    } else if (!amount || amount === '0') {
      this.setState({ formInputError: accountManagement.sendEth.error.amount })
      return
    }

    if (( ethSentPastWeek + Number(amount) ) * Number(ethExchange(primaryCurrency)) > Number(transferLimits(primaryCurrency, transferLimitLevel())) ) {
      this.setState({ formInputError: accountManagement.sendEth.error.limitExceeded(primaryCurrency, transferLimitLevel()) })
      return
    }

    const trimmedAddress = address.toLowerCase().startsWith('0x') ? address.substring(2) : address
    const success = await sendingEthLoader.wrap(
      this.props.sendEth(
        trimmedAddress as string,
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

  setAmount(amount: string) {
    return `${ethAmount(amount)}`
  }

  setAddress(address: string) {
    return address
  }

  validAddress() {
    const { address } = this.state
    return `${isEthAddress(address)}`
  }

  getLimit() {
    const { ethExchange, ethSentPastWeek, primaryCurrency, transferLimitLevel } = this.props
    return formatEthRemaining(ethExchange, ethSentPastWeek, primaryCurrency, transferLimitLevel())
  }

  toFiat(amount: string | undefined, exchange: string) {
    if ( amount === undefined || amount === '' || amount === '.' || amount === ',' ) {
      amount = '0'
    } else if(isCommaDecimal()) {
      amount = amount.replace(',', '.')
    }
    const remaining = `${Number(amount) * Number(exchange)}`
    const end = remaining.indexOf('.') === -1 ? remaining.length : remaining.indexOf('.') + 3
    let result = remaining.slice(0, end)
    result = result.slice(-2, -1) === '.' ? result += '0' : result
    return isCommaDecimal() ? result.replace('.', ',') : result
  }

  blurAmountFormat() {
    let { amount } = this.state
    if(amount && (amount.slice(-1) === '.' || amount.slice(-1) === ',')) {
      amount = amount.slice(0, -1)
      this.setState({ amount })
    }
  }

  render() {
    const { amount, address, txCost, formInputError } = this.state
    const { ethBalance, ethExchange, primaryCurrency, transferLimitLevel } = this.props

    return <ScrollView style={general.whiteFlex}>
      <View style={general.view}>
        <Loading context={sendingEthLoader} />
        <DashboardShell text={accountManagement.sendEth.transferLowercase} navigation={this.props.navigation} />
        <Button close onPress={() => this.props.navigation.goBack()} />
      </View>
      <KeyboardAvoidingView style={general.whiteFlex} behavior={Platform.OS === 'ios' ? 'padding' : 'position'} keyboardVerticalOffset={-200} >
        <ScrollView style={general.view} keyboardShouldPersistTaps='handled'>
          <View style={general.largeHMargin} >
            <View style={[general.centeredColumn, {marginBottom: 20}]}>
              <View style={general.centeredColumn} >
                <Text style={[formStyle.header, {textAlign: 'center'}]}>{accountManagement.sendEth.balance(formatCommaDecimal(ethBalance))}</Text>
                <View style={formStyle.textInputContainer}>
                  <TextInput
                    style={[formStyle.textInput,  {paddingVertical: 3}]}
                    placeholder={accountManagement.sendEth.address}
                    placeholderTextColor='black'
                    value={address}
                    maxLength={42}
                    underlineColorAndroid='transparent'
                    onChangeText={address => this.setState({ address: this.setAddress(address), formInputError: undefined })}
                  />
                </View>
                <Text style={[formStyle.smallText, formStyle.spaceTop, formStyle.center]}>{accountManagement.sendEth.warning(this.getLimit(), primaryCurrency, transferLimitLevel())}</Text>
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
                    onBlur={this.blurAmountFormat}
                  />
                </View>
              </View>
              <Text style={[formStyle.smallText, formStyle.center, formStyle.spaceTopS]}>{`${currencySymbols(primaryCurrency)}${this.toFiat(amount, ethExchange(primaryCurrency))}`}</Text>
              <Text style={[accountStyle.txCost, formStyle.spaceTop]}>{accountManagement.sendEth.txCost(formatCommaDecimal(txCost), primaryCurrency)}</Text>
            </View>
            { formInputError && <Text style={[formStyle.warningText, {alignSelf: 'center'}]}>{formInputError}</Text>}
            <Button large round wide onPress={() => this.submit()} text={accountManagement.sendEth.transfer} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScrollView>
  }
}

export default connect((state) => ({ user: getUser(state)(), ethBalance: getEthBalance(state), ethExchange: getEthExchange(state),
  ethSentPastWeek: getWeeklyEthTotal(state), primaryCurrency: getPrimaryCurrency(state), transferLimitLevel: getTransferLimitLevel(state) })
  , { sendEth })(TransferEth)
