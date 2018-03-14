import React, { Component } from 'react'

import { Text, TextInput, TouchableHighlight, View, Image, ScrollView, KeyboardAvoidingView } from 'react-native'
import { getResetAction } from 'reducers/nav'

import { UserData } from 'lndr/user'
import { debounce } from 'lndr/time'
import { currencyFormats, amountFormat } from 'lndr/format'
import Friend from 'lndr/friend'
import defaultCurrency from 'lndr/default-currency'

import Button from 'ui/components/button'
import Loading, { LoadingContext } from 'ui/components/loading'
import DashboardShell from 'ui/components/dashboard-shell'
import RecentView from 'ui/views/account/activity/recent'

import style from 'theme/friend'
import formStyle from 'theme/form'
import general from 'theme/general'
import accountStyle from 'theme/account'

import language, { currencies, transferLimits } from 'language'
const {
  back,
  cancel,
  pendingTransactionsLanguage,
  debtManagement,
  accountManagement
} = language

import { getUser, recentTransactions, getEthBalance, getEthExchange, getWeeklyEthTotal, getUcacAddr } from 'reducers/app'
import { settleUp, getEthTxCost } from 'actions'
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
    currency: string
  ) => any
  user: UserData
  ethBalance: string
  ethExchange: string
  ethSentPastWeek: number
  recentTransactions: any
  navigation: any
  getUcacAddress: (currency: string) => string
}

interface State {
  amount?: string
  formInputError?: string
  balance: number
  direction: string
  txCost: string
  currency: string
}

class SettleUp extends Component<Props, State> {
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
    this.setState({txCost})
  }

  async submit() {
    const { amount, direction, currency } = this.state
    const { ethExchange, ethSentPastWeek } = this.props
    const friend = this.props.navigation ? this.props.navigation.state.params.friend : {}

    console.log(1, ethSentPastWeek * Number(ethExchange), Number(amount), ethSentPastWeek * Number(ethExchange) + Number(amount), Number(transferLimits[currency]))
    if ( direction === 'lend' && ethSentPastWeek * Number(ethExchange) + Number(amount) > Number(transferLimits[currency]) ) {
      this.setState({ formInputError: accountManagement.sendEth.error.limitExceeded(defaultCurrency) })
      return
    }

    const memo = debtManagement.settleUpMemo(direction, amount)

    const denomination = 'ETH'

    const success = await submittingTransaction.wrap(
      this.props.settleUp(
        friend as Friend,
        amount as string,
        memo as string,
        direction as string,
        denomination as string,
        currency as string
      )
    )

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

    const { recentTransactions, getUcacAddress } = this.props
    let total = 0

    recentTransactions.map( transaction => {
      if(getUcacAddress(defaultCurrency).indexOf(transaction.ucac) !== -1) {
        if(transaction.creditorAddress === friend.address) {
          total -= transaction.amount
        } else if(transaction.debtorAddress === friend.address) {
          total += transaction.amount
        }
      }
    })

    return total
  }

  clear() {
    this.setState( { amount: undefined } )
  }

  cancel() {
    this.clear()
    this.props.navigation.navigate('Friends')
  }

  setAmount(amount) {
    const { currency } = this.state
    return amountFormat(amount, currency)
  }

  displayMessage() {
    const { balance } = this.state
    const friend = this.props.navigation ? this.props.navigation.state.params.friend : {}

    return balance > 0 ? debtManagement.direction.pendingLend(friend.nickname) : debtManagement.direction.pendingBorrow(friend.nickname)
  }

  displayTotal(balance) {
    return `${balance < 0 ? '' : '+'}${currencyFormats[defaultCurrency](balance)}`
  }

  getLimit() {
    const { currency } = this.state
    const { ethExchange, ethSentPastWeek } = this.props
    const remaining = String(Number(transferLimits[currency]) - Number(ethSentPastWeek) * Number(ethExchange))
    const end = remaining.indexOf('.') === -1 ? remaining.length : remaining.indexOf('.') + 3
    return remaining.slice(0, end)
  }

  render() {
    const { amount, balance, txCost, currency, formInputError } = this.state
    const { recentTransactions, ethBalance, ethExchange, ethSentPastWeek, getUcacAddress } = this.props
    const friend = this.props.navigation ? this.props.navigation.state.params.friend : {}

    return <ScrollView style={general.whiteFlex} keyboardShouldPersistTaps='handled'>
      <Loading context={submittingTransaction} />
      <DashboardShell text={debtManagement.settleUpLower} navigation={this.props.navigation} />
      <Button close onPress={() => this.props.navigation.navigate('Friends')} />
      <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={0} >
        <View style={[general.centeredColumn, {marginBottom: 20}]}>
          <Image source={require('images/person-outline-dark.png')} style={style.settleImage}/>
          <Text style={[style.header, {marginBottom: 20, marginHorizontal: 20, textAlign: 'center'}]}>{this.displayMessage()}</Text>
          <View style={style.transactions}>
            {
              recentTransactions.map( (transaction, index) => {
                return getUcacAddress(defaultCurrency).indexOf(transaction.ucac) !== -1 && (transaction.creditorAddress === friend.address || transaction.debtorAddress === friend.address) ?
                  <View style={style.recent} key={friend.address + index}>
                    <Text style={style.recentText}>{transaction.memo}</Text>
                    <Text style={style.recentText}>{ (transaction.creditorAddress === friend.address ? '-' : '+') + `${currencies[defaultCurrency]}${currencyFormats[defaultCurrency](transaction.amount)}`}</Text>
                  </View> : null
              })
            }
            <View style={[general.betweenRow, style.totalRow]} >
              <Text style={style.total}>{debtManagement.total}</Text>
              <Text style={style.totalAmount}>{this.displayTotal(balance)}</Text>
            </View>
            <View style={general.centeredColumn}>
              <View style={[accountStyle.balanceRow, {marginTop: 20}]}>
                <Text style={[accountStyle.balance, {marginLeft: '2%'}]}>{accountManagement.ethBalance.display(ethBalance)}</Text>
                <Button alternate blackText narrow arrow small onPress={() => {this.props.navigation.navigate('MyAccount')}}
                  text={accountManagement.ethBalance.inFiat(ethBalance, ethExchange, currency)}
                  containerStyle={{marginTop: -6}}
                />
              </View>
              <Text style={[accountStyle.txCost, {marginLeft: '2%'}]}>{accountManagement.sendEth.txCost(txCost, currency)}</Text>
              {balance > 0 ? null : <Text style={[formStyle.smallText, formStyle.spaceTop, formStyle.center]}>{accountManagement.sendEth.warning(this.getLimit(), currency)}</Text>}
              <Text style={formStyle.titleLarge}>{debtManagement.fields.settlementAmount}</Text>
              <TextInput
                style={formStyle.jumboInput}
                placeholder={`${currencies[currency]}0`}
                placeholderTextColor='black'
                value={amount}
                maxLength={14}
                underlineColorAndroid='transparent'
                keyboardType='numeric'
                onChangeText={amount => this.setState({ amount: this.setAmount(amount), formInputError: undefined })}
              />
            </View>
          </View>
          { formInputError && <Text style={[formStyle.warningText, {alignSelf: 'center'}]}>{formInputError}</Text>}
          { amount ? <Button large round wide onPress={() => this.submit()} text={debtManagement.settleUp} /> : <Button large round wide onPress={() => this.setState({ amount: `${currencies[defaultCurrency]}${currencyFormats[defaultCurrency](Math.abs(balance))}`})} text={debtManagement.settleTotal} />}
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  }
}

export default connect((state) => ({ user: getUser(state)(), ethBalance: getEthBalance(state), ethExchange: getEthExchange(state), 
  recentTransactions: recentTransactions(state), ethSentPastWeek: getWeeklyEthTotal(state), getUcacAddress: getUcacAddr(state) }), { settleUp })(SettleUp)
