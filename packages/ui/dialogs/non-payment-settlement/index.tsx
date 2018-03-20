import React, { Component } from 'react'

import { Text, TextInput, TouchableHighlight, View, Image, ScrollView, KeyboardAvoidingView } from 'react-native'
import { getResetAction } from 'reducers/nav'

import { UserData } from 'lndr/user'
import { debounce } from 'lndr/time'
import { currencyFormats, amountFormat } from 'lndr/format'
import Friend from 'lndr/friend'
import defaultCurrency from 'lndr/default-currency'
import profilePic from 'lndr/profile-pic'

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
import { addDebt } from 'actions'
import { connect } from 'react-redux'
import { addNavigationHelpers } from 'react-navigation';

const submittingTransaction = new LoadingContext()

interface Props {
  addDebt: (
    friend: Friend,
    amount: string,
    memo: string,
    direction: string,
    currency: string
  ) => any
  user: UserData
  recentTransactions: any
  navigation: any
  getUcacAddress: (currency: string) => string
}

interface State {
  amount?: string
  balance: number
  direction: string
  txCost: string
  currency: string
  pic?: string
}

class EthSettlement extends Component<Props, State> {
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
    const friend = this.props.navigation ? this.props.navigation.state.params.friend : {}
    let pic

    try {
      if (friend.address !== undefined) {
        pic = await profilePic.get(friend.address)
      }
    } catch (e) {}
    if (pic) {
      this.setState({ pic })
    }
  }

  async submit() {
    const { amount, direction, currency } = this.state
    const friend = this.props.navigation ? this.props.navigation.state.params.friend : {}

    const memo = debtManagement.recordSettleUpMemo(direction)

    const success = await submittingTransaction.wrap(
      this.props.addDebt(
        friend as Friend,
        amount as string,
        memo as string,
        direction as string,
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
    this.props.navigation.goBack()
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

  updateAmount(amount: string) {
    const { direction, currency } = this.state
    const cleanAmount = amount.replace(/^[^0-9\.]/, '')

    this.setState({ amount: this.setAmount(amount) })
  }

  render() {
    const { amount, balance, txCost, currency, pic } = this.state
    const { recentTransactions, getUcacAddress } = this.props
    const friend = this.props.navigation ? this.props.navigation.state.params.friend : {}
    const imageSource = pic ? { uri: pic } : require('images/person-outline-dark.png')

    return <ScrollView style={general.whiteFlex} keyboardShouldPersistTaps='handled'>
      <Loading context={submittingTransaction} />
      <DashboardShell text={debtManagement.settleUpLower} navigation={this.props.navigation} />
      <View style={{marginBottom: 10, marginTop: -10}}>
        <Button close onPress={() => this.props.navigation.goBack()} />
      </View>
      <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={0} contentContainerStyle={{backgroundColor: 'white'}} >
        <View style={[general.centeredColumn, {marginBottom: 20}]}>
          <Image source={imageSource} style={style.settleImage}/>
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
              <Text style={formStyle.titleLarge}>{debtManagement.fields.settlementAmount}</Text>
              <TextInput
                style={formStyle.jumboInput}
                placeholder={`${currencies[currency]}0`}
                placeholderTextColor='black'
                value={amount}
                maxLength={14}
                underlineColorAndroid='transparent'
                keyboardType='numeric'
                onChangeText={amount => this.updateAmount(amount)}
              />
            </View>
          </View>
          { amount ? <Button large round wide onPress={() => this.submit()} text={debtManagement.settleUp} /> : <Button large round wide onPress={() => this.setState({ amount: `${currencies[defaultCurrency]}${currencyFormats[defaultCurrency](Math.abs(balance))}`})} text={debtManagement.settleTotal} />}
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  }
}

export default connect((state) => ({ user: getUser(state)(), recentTransactions: recentTransactions(state), getUcacAddress: getUcacAddr(state) }), { addDebt })(EthSettlement)
