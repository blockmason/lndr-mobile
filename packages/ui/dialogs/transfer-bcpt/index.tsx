import React, { Component } from 'react'

import { Text, TextInput, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import firebase from 'react-native-firebase'

import { getResetAction } from 'reducers/nav'

import { UserData } from 'lndr/user'
import { bcptAmount, ethAddress, formatCommaDecimal } from 'lndr/format'
import { ERC20_BCPT } from 'lndr/erc20-utils'

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

import { getUser, getBcptBalance, getPrimaryCurrency } from 'reducers/app'
import { sendBcpt, getEthTxCost } from 'actions'
import { connect } from 'react-redux'

const sendingBcptLoader = new LoadingContext()

interface Props {
  primaryCurrency: string
  user: UserData
  bcptBalance: string
  navigation: any
  sendBcpt: (address: string, amount: string) => any
}

interface State {
  amount?: string
  address?: string
  formInputError?: string
  error?: string
  txCost: string
}

class TransferBcpt extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      txCost: '0.00'
    }
  }

  async componentWillMount() {
    const { primaryCurrency } = this.props
    const txCost = await getEthTxCost(primaryCurrency)
    this.setState({ txCost })
  }

  componentDidMount( ) {
    firebase.analytics().setCurrentScreen('transfer-bcpt', 'TransferBcpt');
  }

  async submit() {
    const { amount, address } = this.state

    if (!this.validAddress()) {
      this.setState({ formInputError: accountManagement.sendERC20.error.address })
      return
    } else if (!amount || amount === '0') {
      this.setState({ formInputError: accountManagement.sendERC20.error.amount })
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
    const { amount, address, formInputError, txCost } = this.state
    const { bcptBalance, primaryCurrency } = this.props
    const vertOffset = (Platform.OS === 'android') ? -300 : 0;

    return <View style={general.whiteFlex}>
      <View style={general.view}>
        <Loading context={sendingBcptLoader} />
        <DashboardShell text={accountManagement.sendERC20.transfer(ERC20_BCPT)} navigation={this.props.navigation} />
        <Button close onPress={() => this.props.navigation.goBack()} />
      </View>
      <KeyboardAvoidingView style={general.whiteFlex} behavior={'padding'} keyboardVerticalOffset={vertOffset} >
        <ScrollView style={general.view} keyboardShouldPersistTaps='handled'>
          <View style={general.largeHMargin} >
            <View style={[general.centeredColumn, {marginBottom: 20}]}>
              <View style={general.centeredColumn} >
                <Text style={[formStyle.header, {textAlign: 'center'}]}>{accountManagement.sendERC20.balance(ERC20_BCPT, bcptBalance)}</Text>
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
            <Button large round wide onPress={() => this.submit()} text={accountManagement.sendERC20.transfer(ERC20_BCPT)} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  }
}

export default connect((state) => ({ user: getUser(state)(), bcptBalance: getBcptBalance(state), primaryCurrency: getPrimaryCurrency(state) }),
{ sendBcpt })(TransferBcpt)
