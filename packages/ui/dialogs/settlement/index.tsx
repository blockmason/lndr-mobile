import React, { Component } from 'react'
import { Text, TextInput, View, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { getResetAction } from 'reducers/nav'

import { UserData } from 'lndr/user'
import { currencyFormats, amountFormat, sanitizeAmount, convertCommaDecimalToPoint } from 'lndr/format'
import Friend from 'lndr/friend'
import { currencySymbols, transferLimits, hasNoDecimals } from 'lndr/currencies'
import profilePic from 'lndr/profile-pic'

import Button from 'ui/components/button'
import Loading, { LoadingContext } from 'ui/components/loading'
import DashboardShell from 'ui/components/dashboard-shell'
import BalanceSection from 'ui/components/balance-section'
import PayPalSettlementButton from 'ui/components/paypal-settle-button'

import style from 'theme/friend'
import formStyle from 'theme/form'
import general from 'theme/general'
import accountStyle from 'theme/account'

import language from 'language'
const {
  debtManagement,
  accountManagement
} = language

import { getUser, recentTransactions, getEthBalance, getEthExchange, getWeeklyEthTotal,
  hasPendingTransaction, calculateBalance, getUcacCurrency, getPrimaryCurrency } from 'reducers/app'
import { addDebt, getEthTxCost, requestPayPalSettlement } from 'actions'
import { connect } from 'react-redux'

const submittingTransaction = new LoadingContext()

let unmounting = false

interface Props {
  requestPayPalSettlement: (
    friend: Friend
  ) => any
  addDebt: (
    friend: Friend,
    amount: string,
    memo: string,
    direction: string,
    currency: string,
    settleTotal?: boolean,
    denomination?: string
  ) => any
  hasPendingTransaction: (friend: Friend) => boolean
  user: UserData
  ethBalance: string
  ethExchange: (currency: string) => string
  ethSentPastWeek: number
  recentTransactions: any
  navigation: any
  calculateBalance: (friend: Friend) => number
  getUcacCurrency: (ucac: string) => string
  primaryCurrency: string
}

interface State {
  amount?: string
  formInputError?: string
  balance: number
  direction: string
  txCost: string
  pic?: string
}

class Settlement extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      balance: this.getRecentTotal(),
      direction: this.getRecentTotal() > 0 ? 'borrow' : 'lend',
      txCost: '0.00'
    }
  }

  async componentWillMount() {
    const { primaryCurrency } = this.props
    const txCost = await getEthTxCost(primaryCurrency)
    const friend = this.props.navigation ? this.props.navigation.state.params.friend : {}
    const ethSettlement = this.props.navigation ? (this.isEthSettlement()) : false

    let amount: string | undefined = ''
    if(this.state.balance) {
      amount = ethSettlement ? undefined : this.setAmount(String(Math.abs(this.state.balance)))
    }

    unmounting = false
    let pic

    if (friend.address !== undefined) {
      pic = await profilePic.get(friend.address)
    }
    this.setState({txCost, pic, amount})
  }

  componentWillUnmount() {
    unmounting = true
  }

  getDenomination() {
    if(this.props.navigation) {
      if(this.isEthSettlement()) {
        return 'ETH'
      } else if(this.isPayPalSettlement()) {
        return 'PAYPAL'
      }
    }
    return undefined
  }

  async submit() {
    const { amount, direction, formInputError } = this.state
    const { primaryCurrency } = this.props
    const friend = this.props.navigation ? this.props.navigation.state.params.friend : {}
    const denomination = this.getDenomination()

    if ( formInputError || sanitizeAmount(amount, primaryCurrency) === 0 ) {
      return
    }

    const memo = debtManagement.settleUpMemo(direction, amount)
    const settleTotal = Math.abs(this.getRecentTotal()) === Math.abs(sanitizeAmount(amount, primaryCurrency))
    let success

    if(denomination === 'PAYPAL' && direction === 'lend') {
      success = await submittingTransaction.wrap(
        this.props.requestPayPalSettlement(
          friend as Friend
        )
      )
    } else {
      success = await submittingTransaction.wrap(
        this.props.addDebt(
          friend as Friend,
          amount as string,
          memo as string,
          direction as string,
          primaryCurrency as string,
          settleTotal as boolean,
          denomination as string
        )
      )
    }

    if (!success || success.type === '@@TOAST/DISPLAY_ERROR')
      return; // display the Toast but don't exit

    this.clear()

    let resetAction
    if (success && success.type !== '@@TOAST/DISPLAY_ERROR') {
      console.log(
        'BOOYAH'
      )
      let type = 'create'
      if (this.isPayPalSettlement()) {
        const isPayee = (direction == 'borrow')
        type = (isPayee) ? 'requestPayPalPayment' : 'requestPayPalPayee'
      }
      resetAction = getResetAction({ routeName:'Confirmation', params: { type: type, friend } })
    } else {
      resetAction = getResetAction({ routeName:'Dashboard' })
    }

    this.props.navigation.dispatch(resetAction)
  }

  isPayPalSettlement() {
    return ( (this.props.navigation) && (this.props.navigation.state.params.settlementType == 'paypal') )
  }

  isEthSettlement() {
    return ( (this.props.navigation) && (this.props.navigation.state.params.settlementType == 'eth') )
  }

  getRecentTotal() {
    const friend = this.props.navigation ? this.props.navigation.state.params.friend : {}
    const { calculateBalance } = this.props

    return calculateBalance(friend)
  }

  clear() {
    this.setState( { amount: undefined } )
  }

  cancel() {
    this.clear()
    this.props.navigation.navigate('Friends')
  }

  setAmount(amount) {
    const { balance } = this.state
    const { primaryCurrency } = this.props
    const formattedAmount = convertCommaDecimalToPoint(amount, primaryCurrency)

    const cleanAmount = Number(formattedAmount.replace(/[^0-9\.\,]/g, ''))
    const adjustedBalance = hasNoDecimals(primaryCurrency) ? balance : balance / 100

    if (cleanAmount > Math.abs(adjustedBalance)) {
      return amountFormat(String(adjustedBalance), primaryCurrency)
    } else {
      return amountFormat(formattedAmount, primaryCurrency)
    }
  }

  displayMessage() {
    const { balance } = this.state
    const friend = this.props.navigation ? this.props.navigation.state.params.friend : {}

    return balance > 0 ? debtManagement.direction.pendingLend(friend.nickname) : debtManagement.direction.pendingBorrow(friend.nickname)
  }

  displayTotal(balance) {
    const { primaryCurrency } = this.props
    return `${balance < 0 ? '' : '+'}${currencySymbols(primaryCurrency)}${currencyFormats(primaryCurrency)(balance)}`
  }

  getLimit() {
    const { ethExchange, ethSentPastWeek, primaryCurrency } = this.props
    const remaining = String(Number(transferLimits(primaryCurrency)) - Number(ethSentPastWeek) * Number(ethExchange(primaryCurrency)))
    const end = remaining.indexOf('.') === -1 ? remaining.length : remaining.indexOf('.') + 3
    return remaining.slice(0, end)
  }

  updateAmount(amount: string) {
    const { direction, txCost } = this.state
    const { ethExchange, ethSentPastWeek, hasPendingTransaction, ethBalance, primaryCurrency } = this.props
    const friend = this.props.navigation ? this.props.navigation.state.params.friend : {}

    let formInputError

    const cleanAmount = amount.replace(/[^0-9\.]/g, '')
    const totalEthCost = ( Number(txCost) + Number(cleanAmount) ) / Number(ethExchange(primaryCurrency))

    if ( direction === 'lend' && totalEthCost > Number(ethBalance) ) {
      formInputError = accountManagement.sendEth.error.insufficient
    } else if ( direction === 'lend' && ethSentPastWeek * Number(ethExchange(primaryCurrency)) + Number(cleanAmount) > Number(transferLimits(primaryCurrency)) ) {
      formInputError = accountManagement.sendEth.error.limitExceeded(primaryCurrency)
    } else if (hasPendingTransaction(friend)) {
      formInputError = debtManagement.createError.pending
    }

    this.setState({ amount: this.setAmount(amount), formInputError })
  }

  renderPaymentButton() {
    const { amount, direction } = this.state

    if (typeof amount !== 'string') {
      return null
    } else if (this.isPayPalSettlement()) {
      const cleanAmount = amount.replace(/[^0-9\.]/g, '')
      const memo = debtManagement.settleUpMemo(direction, amount)
      return (
        <PayPalSettlementButton user={this.props.user}
          navigation={this.props.navigation}
          displayAmount={cleanAmount}
          memo={memo}
          direction={this.state.direction}
          primaryCurrency={this.props.primaryCurrency}
          onPress={() => this.submit()}
        />
      )
    }

    return (
      <Button large round wide onPress={() => this.submit()} text={debtManagement.settleUp} />
    )
  }

  render() {
    const { amount, balance, txCost, formInputError, pic } = this.state
    const { ethBalance, ethExchange, primaryCurrency } = this.props
    const ethSettlement = this.props.navigation ? (this.props.navigation.state.params.settlementType == "eth") : false
    const friend = this.props.navigation ? this.props.navigation.state.params.friend : {}
    const imageSource = pic ? { uri: pic } : require('images/person-outline-dark.png')
    const vertOffset = (Platform.OS === 'android') ? -300 : 20

    const paymentButton = this.renderPaymentButton()

    return <View style={general.whiteFlex}>
      <View style={general.view}>
        <Loading context={submittingTransaction} />
        <DashboardShell text={debtManagement.settleUpLower} navigation={this.props.navigation} />
        <Button close onPress={() => this.props.navigation.goBack()} />
      </View>
      <KeyboardAvoidingView style={general.whiteFlex} behavior={'padding'} keyboardVerticalOffset={vertOffset} >
        <ScrollView style={general.view} keyboardShouldPersistTaps='handled'>
          <View style={[general.centeredColumn, {marginBottom: 20}]}>
            <Image source={imageSource} style={style.settleImage}/>
            <Text style={[style.header, {marginBottom: 20, marginHorizontal: 20, textAlign: 'center'}]}>{this.displayMessage()}</Text>
            <View style={style.transactions}>
              <BalanceSection friend={friend} />
              <View style={[general.betweenRow, style.totalRow]} >
                <Text style={style.total}>{debtManagement.total}</Text>
                <Text style={style.totalAmount}>{this.displayTotal(balance)}</Text>
              </View>
              <View style={general.centeredColumn}>
                {ethSettlement ? <View style={[accountStyle.balanceRow, {marginTop: 20}]}>
                  <Text style={[accountStyle.balance, {marginLeft: '2%'}]}>{accountManagement.ethBalance.display(ethBalance)}</Text>
                  <Button alternate blackText narrow arrow small onPress={() => {this.props.navigation.navigate('MyAccount')}}
                    text={accountManagement.ethBalance.inFiat(ethBalance, ethExchange(primaryCurrency), primaryCurrency)}
                    containerStyle={{marginTop: -6}}
                  />
                </View> : null}
                {ethSettlement ? <Text style={[accountStyle.txCost, {marginLeft: '2%'}]}>{accountManagement.sendEth.txCost(txCost, primaryCurrency)}</Text> : null}
                {!ethSettlement || balance > 0 ? null : <Text style={[formStyle.smallText, formStyle.spaceTop, formStyle.center]}>{accountManagement.sendEth.warning(this.getLimit(), primaryCurrency)}</Text>}
                <Text style={formStyle.titleLarge}>{debtManagement.fields.settlementAmount}</Text>
                {ethSettlement ? <TextInput
                  style={[formStyle.jumboInput, formStyle.settleAmount]}
                  placeholder={`${currencySymbols(primaryCurrency)}0`}
                  placeholderTextColor='black'
                  value={amount}
                  maxLength={9}
                  underlineColorAndroid='transparent'
                  keyboardType='numeric'
                  onChangeText={amount => this.updateAmount(amount)}
                /> : <Text style={formStyle.jumboInput}>{amount}</Text>}
              </View>
            </View>
            { formInputError && <Text style={[formStyle.warningText, {alignSelf: 'center', marginHorizontal: 15}]}>{formInputError}</Text>}
            { paymentButton }
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  }
}

export default connect((state) => ({ user: getUser(state)(), ethBalance: getEthBalance(state), ethExchange: getEthExchange(state),
  recentTransactions: recentTransactions(state), ethSentPastWeek: getWeeklyEthTotal(state), hasPendingTransaction: hasPendingTransaction(state),
  calculateBalance: calculateBalance(state), getUcacCurrency: getUcacCurrency(state), primaryCurrency: getPrimaryCurrency(state)}),
  { addDebt, requestPayPalSettlement })(Settlement)
