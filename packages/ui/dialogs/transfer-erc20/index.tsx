import React, { Component } from 'react'

import { Text, TextInput, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import firebase from 'react-native-firebase'

import { getResetAction } from 'reducers/nav'

import { UserData } from 'lndr/user'
import { bcptAmount, ethAddress, formatCommaDecimal } from 'lndr/format'
import { ERC20_Token } from 'lndr/erc-20'

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
import { getTransactionCost, sendERC20 } from 'actions'
import { connect } from 'react-redux'

const loadingContext = new LoadingContext()

interface Props {
  token: ERC20_Token
  primaryCurrency: string
  user: UserData
  navigation: any
  sendERC20: (token: ERC20_Token, destinationAddress: string, amount: string) => any
}

interface State {
  amount?: string
  address?: string
  error?: string
  formInputError?: string
  tokenBalance: string
  txCost: string
}

class TransferERC20 extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      tokenBalance: '0.00',
      txCost: '0.00'
    }
  }

  async componentWillMount() {
    const { primaryCurrency, token } = this.props
    const txCost = await getTransactionCost(token.tokenName, primaryCurrency)
    this.setState({ txCost })

    if (token) {
      const tokenBalance = await token.getBalance(this.state.address as string)
      this.setState({ tokenBalance} )
    }
  }

  componentDidMount( ) {
    const { token } = this.props
    firebase.analytics().setCurrentScreen(`transfer-${token.tokenName.toLowerCase()}`, `Transfer${token.tokenName}`);
  }

  async submit() {
    const { token } = this.props
    const { amount, address } = this.state

    if (!this.validAddress()) {
      this.setState({ formInputError: accountManagement.sendERC20.error.address })
      return
    } else if (!amount || amount === '0') {
      this.setState({ formInputError: accountManagement.sendERC20.error.amount })
      return
    }

    const success = await loadingContext.wrap(
      this.props.sendERC20(
        token,
        address as string,
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
    const { amount, address, formInputError, tokenBalance, txCost } = this.state
    const { token, primaryCurrency } = this.props
    const vertOffset = (Platform.OS === 'android') ? -300 : 0;

    return <View style={general.whiteFlex}>
      <View style={general.view}>
        <Loading context={loadingContext} />
        <DashboardShell text={accountManagement.sendERC20.transfer(token.tokenName)} navigation={this.props.navigation} />
        <Button close onPress={() => this.props.navigation.goBack()} />
      </View>
      <KeyboardAvoidingView style={general.whiteFlex} behavior={'padding'} keyboardVerticalOffset={vertOffset} >
        <ScrollView style={general.view} keyboardShouldPersistTaps='handled'>
          <View style={general.largeHMargin} >
            <View style={[general.centeredColumn, {marginBottom: 20}]}>
              <View style={general.centeredColumn} >
                <Text style={[formStyle.header, {textAlign: 'center'}]}>{accountManagement.sendERC20.balance(token.tokenName, tokenBalance)}</Text>
                <View style={formStyle.textInputContainer}>
                  <TextInput
                    style={[formStyle.textInput,  {paddingVertical: 3}]}
                    placeholder={accountManagement.sendERC20.address}
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
                <Text style={[accountStyle.txCost, formStyle.spaceTop]}>{accountManagement.sendEth.txCost(formatCommaDecimal(txCost), primaryCurrency)}</Text>
              </View>
            </View>
            { !!formInputError && <Text style={formStyle.warningText}>{formInputError}</Text>}
            <Button large round wide onPress={() => this.submit()} text={accountManagement.sendERC20.transfer(token.tokenName)} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  }
}

export default connect((state) => ({ user: getUser(state)(), primaryCurrency: getPrimaryCurrency(state) }),
{ sendERC20 })(TransferERC20)
