import React, { Component } from 'react'

import { Text, TextInput, TouchableHighlight, View, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { getResetAction } from 'reducers/nav'

import { UserData } from 'lndr/user'
import { debounce } from 'lndr/time'
import { currencyFormats, amountFormat, sanitizeAmount } from 'lndr/format'
import Friend from 'lndr/friend'
import { defaultCurrency, currencySymbols, transferLimits, hasNoDecimals } from 'lndr/currencies'
import profilePic from 'lndr/profile-pic'

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
  pendingTransactionsLanguage,
  debtManagement,
  accountManagement
} = language

import { getUser, recentTransactions, getEthBalance, getEthExchange, getWeeklyEthTotal,
  hasPendingTransaction, calculateBalance, getUcacCurrency } from 'reducers/app'
import { settleUp, addDebt, getEthTxCost } from 'actions'
import { connect } from 'react-redux'
import { addNavigationHelpers } from 'react-navigation';

const submittingTransaction = new LoadingContext()

interface Props {
  settleUp: (
    friend: Friend,
    amount: string,
    memo: string,
    direction: string,
    denomination: string,
    currency: string,
    settleTotal?: boolean
  ) => any
  addDebt: (
    friend: Friend,
    amount: string,
    memo: string,
    direction: string,
    currency: string,
    settleTotal?: boolean
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
}

interface State {
  amount?: string
  formInputError?: string
  balance: number
  direction: string
  txCost: string
  currency: string
  pic?: string
}

class Settlement extends Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      balance: this.getRecentTotal(),
      direction: this.getRecentTotal() > 0 ? 'borrow' : 'lend',
      txCost: '0.00',
      currency: defaultCurrency
    }
  }

  async componentWillMount() {
    const txCost = await getEthTxCost(defaultCurrency)
    const friend = this.props.navigation ? this.props.navigation.state.params.friend : {}
    const ethSettlement = this.props.navigation ? this.props.navigation.state.params.ethSettlement : false

    const amount = ethSettlement ? undefined : this.setAmount(String(Math.abs(this.state.balance)))

    let pic

    try {
      if (friend.address !== undefined) {
        pic = await profilePic.get(friend.address)
      }
    } catch (e) {}
    this.setState({txCost, pic, amount})
  }

  async submit() {
    const { amount, direction, currency, formInputError } = this.state
    const friend = this.props.navigation ? this.props.navigation.state.params.friend : {}
    const ethSettlement = this.props.navigation ? this.props.navigation.state.params.ethSettlement : false

    if ( formInputError || sanitizeAmount(amount, currency) === 0 ) {
      return
    }

    const memo = debtManagement.settleUpMemo(direction, amount)
    const denomination = 'ETH'
    const settleTotal = Math.abs(this.getRecentTotal()) === Math.abs(sanitizeAmount(amount, currency))
    let success

    if( ethSettlement ) {
      success = await submittingTransaction.wrap(
        this.props.settleUp(
          friend as Friend,
          amount as string,
          memo as string,
          direction as string,
          denomination as string,
          currency as string,
          settleTotal as boolean
        )
      )
    } else {
      success = await submittingTransaction.wrap(
        this.props.addDebt(
          friend as Friend,
          amount as string,
          memo as string,
          direction as string,
          currency as string,
          settleTotal as boolean
        )
      )
    }

    this.clear()

    let resetAction

    if (success && success.type !== '@@TOAST/DISPLAY_ERROR') {
      resetAction = getResetAction({ routeName:'Confirmation', params: { type: 'create', friend } })
    } else {
      resetAction = getResetAction({ routeName:'Dashboard' })
    }

    this.props.navigation.dispatch(resetAction)
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
    const { balance, currency } = this.state
    const cleanAmount = Number(amount.replace(/[^0-9\.]/g, ''))
    const adjustedBalance = hasNoDecimals(currency) ? balance : balance / 100

    if (cleanAmount > Math.abs(adjustedBalance)) {
      return amountFormat( String(adjustedBalance), currency)
    } else {
      return amountFormat( amount, currency)
    }
  }

  displayMessage() {
    const { balance } = this.state
    const friend = this.props.navigation ? this.props.navigation.state.params.friend : {}

    return balance > 0 ? debtManagement.direction.pendingLend(friend.nickname) : debtManagement.direction.pendingBorrow(friend.nickname)
  }

  displayTotal(balance) {
    return `${balance < 0 ? '' : '+'}${currencyFormats(defaultCurrency)(balance)}`
  }

  getLimit() {
    const { currency } = this.state
    const { ethExchange, ethSentPastWeek } = this.props
    const remaining = String(Number(transferLimits(currency)) - Number(ethSentPastWeek) * Number(ethExchange(defaultCurrency)))
    const end = remaining.indexOf('.') === -1 ? remaining.length : remaining.indexOf('.') + 3
    return remaining.slice(0, end)
  }

  updateAmount(amount: string) {
    const { direction, currency, txCost } = this.state
    const { ethExchange, ethSentPastWeek, hasPendingTransaction, ethBalance } = this.props
    const friend = this.props.navigation ? this.props.navigation.state.params.friend : {}

    let formInputError
    const cleanAmount = amount.replace(/^[^0-9\.]/, '')
    const totalEthCost = ( Number(txCost) + Number(cleanAmount) ) / Number(ethExchange(currency))

    if ( direction === 'lend' && totalEthCost > Number(ethBalance) ) {
      formInputError = accountManagement.sendEth.error.insufficient
    }else if ( direction === 'lend' && ethSentPastWeek * Number(ethExchange(currency)) + Number(cleanAmount) > Number(transferLimits(currency)) ) {
      formInputError = accountManagement.sendEth.error.limitExceeded(currency)
    } else if (hasPendingTransaction(friend)) {
      formInputError = debtManagement.createError.pending
    }

    this.setState({ amount: this.setAmount(amount), formInputError })
  }

  render() {
    const { amount, balance, txCost, currency, formInputError, pic } = this.state
    const { recentTransactions, ethBalance, ethExchange, ethSentPastWeek, getUcacCurrency } = this.props
    const ethSettlement = this.props.navigation ? this.props.navigation.state.params.ethSettlement : false
    const friend = this.props.navigation ? this.props.navigation.state.params.friend : {}
    const imageSource = pic ? { uri: pic } : require('images/person-outline-dark.png')
    const vertOffset = (Platform.OS === 'android') ? -300 : 20;

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
              {
                recentTransactions.map( (transaction, index) => {
                  const txCurrency = getUcacCurrency(transaction.ucac)
                  return (transaction.creditorAddress === friend.address || transaction.debtorAddress === friend.address) ?
                    <View style={style.recent} key={friend.address + index}>
                      <Text style={style.recentText}>{transaction.memo}</Text>
                      <Text style={style.recentText}>{ (transaction.creditorAddress === friend.address ? '-' : '+') + `${currencySymbols(txCurrency)}${currencyFormats(txCurrency)(transaction.amount)}`}</Text>
                    </View> : null
                })
              }
              <View style={[general.betweenRow, style.totalRow]} >
                <Text style={style.total}>{debtManagement.total}</Text>
                <Text style={style.totalAmount}>{this.displayTotal(balance)}</Text>
              </View>
              <View style={general.centeredColumn}>
                {ethSettlement ? <View style={[accountStyle.balanceRow, {marginTop: 20}]}>
                  <Text style={[accountStyle.balance, {marginLeft: '2%'}]}>{accountManagement.ethBalance.display(ethBalance)}</Text>
                  <Button alternate blackText narrow arrow small onPress={() => {this.props.navigation.navigate('MyAccount')}}
                    text={accountManagement.ethBalance.inFiat(ethBalance, ethExchange(defaultCurrency), currency)}
                    containerStyle={{marginTop: -6}}
                  />
                </View> : null}
                {ethSettlement ? <Text style={[accountStyle.txCost, {marginLeft: '2%'}]}>{accountManagement.sendEth.txCost(txCost, currency)}</Text> : null}
                {!ethSettlement || balance > 0 ? null : <Text style={[formStyle.smallText, formStyle.spaceTop, formStyle.center]}>{accountManagement.sendEth.warning(this.getLimit(), currency)}</Text>}
                <Text style={formStyle.titleLarge}>{debtManagement.fields.settlementAmount}</Text>
                {ethSettlement ? <TextInput
                  style={formStyle.jumboInput}
                  placeholder={`${currencySymbols(currency)}0`}
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
            { amount ? <Button large round wide onPress={() => this.submit()} text={debtManagement.settleUp} /> : <Button large round wide onPress={() => this.updateAmount(currencyFormats(defaultCurrency)(Math.abs(balance)))} text={debtManagement.settleTotal} />}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  }
}

export default connect((state) => ({ user: getUser(state)(), ethBalance: getEthBalance(state), ethExchange: getEthExchange(state),
  recentTransactions: recentTransactions(state), ethSentPastWeek: getWeeklyEthTotal(state), hasPendingTransaction: hasPendingTransaction(state),
  calculateBalance: calculateBalance(state), getUcacCurrency: getUcacCurrency(state) }), { settleUp, addDebt })(Settlement)
