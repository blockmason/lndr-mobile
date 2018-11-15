import React, { Component } from 'react'

import { Text, TextInput, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import firebase from 'react-native-firebase'

import { getResetAction } from 'reducers/nav'

import { UserData } from 'lndr/user'
import { cryptoAmount, formatCommaDecimal, isEthAddress } from 'lndr/format'
import { ERC20_Token } from 'lndr/erc-20'

import BackButton from 'ui/components/back-button'
import Button from 'ui/components/button'
import Loading, { LoadingContext } from 'ui/components/loading'
import DashboardShell from 'ui/components/dashboard-shell'

import general from 'theme/general'
import formStyle from 'theme/form'
import accountStyle from 'theme/account'

import language from 'language'
const {
  accountManagement
} = language

import { getUser, getPrimaryCurrency } from 'reducers/app'
import { getTransactionCosts, sendERC20 } from 'actions'
import { connect } from 'react-redux'

const loadingContext = new LoadingContext()

interface Props {
  primaryCurrency: string
  user: UserData
  navigation: any
  sendERC20: (token: ERC20_Token, destinationAddress: string, amount: string) => any
}

interface State {
  amount?: string
  destinationAddress?: string
  error?: string
  formInputError?: string
  token?: ERC20_Token
  tokenBalance: string
  transactionCosts: any
}

class TransferERC20 extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      token: undefined,
      tokenBalance: '0.00',
      transactionCosts: {},
    }
  }

  async componentWillMount() {
    const { primaryCurrency, user } = this.props
    const token = this.props.navigation ? this.props.navigation.state.params.token : undefined
    if (token) {
      const transactionCosts = await getTransactionCosts(token.tokenName, primaryCurrency)
      const tokenBalance = await token.getBalance(user.address as string)
      this.setState({ token, transactionCosts, tokenBalance })
    }
  }

  componentDidMount( ) {
    const { token } = this.state
    const tokenName = (token) ? token.tokenName : 'erc20'
    firebase.analytics().setCurrentScreen(`transfer-${tokenName.toLowerCase()}`, `Transfer${tokenName}`);
  }

  async submit() {
    const { amount, destinationAddress, token } = this.state

    if (!token)
      return
    if (!destinationAddress || !this.validDestinationAddress()) {
      this.setState({ formInputError: accountManagement.sendERC20.error.address })
      return
    }
    if (!amount || amount === '0') {
      this.setState({ formInputError: accountManagement.sendERC20.error.amount })
      return
    }

    const trimmedAddress = destinationAddress.toLowerCase().startsWith('0x') ? destinationAddress.substring(2) : destinationAddress
    const success = await loadingContext.wrap(
      this.props.sendERC20(
        token,
        trimmedAddress as string,
        amount as string
      )
    )

    this.clear()

    if (success && typeof success !== 'string' && success.type === '@@TOAST/DISPLAY_ERROR') {
      this.props.navigation.goBack()
    } else {
      const resetAction = getResetAction({ routeName:'Confirmation', params: { type: 'erc20Sent', txHash: success, amount: amount, token: token } })
      this.props.navigation.dispatch(resetAction)
    }
  }

  clear() {
    this.setState( { amount: undefined, destinationAddress: undefined } )
  }

  cancel() {
    this.clear()
    this.props.navigation.goBack()
  }

  setAmount(amount) {
    return `${cryptoAmount(amount)}`
  }

  setDestinationAddress(destinationAddress) {
    return destinationAddress
  }

  validDestinationAddress() {
    const { destinationAddress } = this.state
    return `${isEthAddress(destinationAddress)}`
  }

  render() {
    const { amount, destinationAddress, formInputError, token, tokenBalance } = this.state
    const { currencyCostFormatted, ethCostFormatted} = this.state.transactionCosts
    const { primaryCurrency } = this.props

    const tokenName = (token) ? token.tokenName : ''
    const vertOffset = (Platform.OS === 'android') ? -300 : 0;

    return <View style={general.whiteFlex}>
      <View style={general.view}>
        <Loading context={loadingContext} />
        <DashboardShell text={accountManagement.sendERC20.transfer(tokenName)} navigation={this.props.navigation} />
        <BackButton onPress={() => this.props.navigation.goBack()} />
      </View>
      <KeyboardAvoidingView style={general.whiteFlex} behavior={'padding'} keyboardVerticalOffset={vertOffset} >
        <ScrollView style={general.view} keyboardShouldPersistTaps='handled'>
          <View style={general.largeHMargin} >
            <View style={[general.centeredColumn, {marginBottom: 20}]}>
              <View style={general.centeredColumn} >
                <Text style={[formStyle.header, {textAlign: 'center'}]}>{accountManagement.sendERC20.balance(tokenName, tokenBalance)}</Text>
                <View style={formStyle.textInputContainer}>
                  <TextInput
                    style={[formStyle.textInput,  {paddingVertical: 3}]}
                    placeholder={accountManagement.sendERC20.address}
                    placeholderTextColor='black'
                    value={destinationAddress}
                    maxLength={42}
                    underlineColorAndroid='transparent'
                    onChangeText={destinationAddress => this.setState({ destinationAddress: this.setDestinationAddress(destinationAddress) })}
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
                <Text style={[accountStyle.txCost, formStyle.spaceTop]}>{accountManagement.sendEth.txCost(ethCostFormatted, currencyCostFormatted)}</Text>
              </View>
            </View>
            { !!formInputError && <Text style={formStyle.warningText}>{formInputError}</Text>}
            <Button large round wide onPress={() => this.submit()} text={accountManagement.sendERC20.transfer(tokenName)} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  }
}

export default connect((state) => ({ user: getUser(state)(), primaryCurrency: getPrimaryCurrency(state) }),
{ sendERC20 })(TransferERC20)
