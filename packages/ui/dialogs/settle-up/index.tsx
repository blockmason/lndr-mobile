import React, { Component } from 'react'

import { Text, TextInput, TouchableHighlight, View, Image, ScrollView } from 'react-native'
import { UserData } from 'lndr/user'

import { debounce } from 'lndr/time'
import { cents, currency } from 'lndr/format'
import Friend from 'lndr/friend'

import Button from 'ui/components/button'
import Loading, { LoadingContext } from 'ui/components/loading'
import DashboardShell from 'ui/components/dashboard-shell'
import RecentView from 'ui/views/account/activity/recent'

import style from 'theme/friend'
import formStyle from 'theme/form'
import general from 'theme/general'
import accountStyle from 'theme/account'

import {
  back,
  cancel,
  pendingTransactionsLanguage,
  debtManagement,
  accountManagement
} from 'language'

import { getUser, recentTransactions, getEthBalance, getEthExchange } from 'reducers/app'
import { settleUp } from 'actions'
import { connect } from 'react-redux'
import { addNavigationHelpers } from 'react-navigation';

const submittingTransaction = new LoadingContext()

interface Props {
  settleUp: (
    friend: Friend,
    amount: string,
    memo: string,
    direction: string,
    denomination: string
  ) => any
  user: UserData
  ethBalance: string
  ethExchange: string
  recentTransactions: any
  navigation: any
}

interface State {
  amount?: string
  balance: number
  direction: string
}

class SettleUp extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      balance: this.getRecentTotal(),
      direction: this.getRecentTotal() > 0 ? 'borrow' : 'lend'
    }
  }

  async submit() {
    const { amount, direction } = this.state
    const friend = this.props.navigation ? this.props.navigation.state.params.friend : {}

    const memo = debtManagement.settleUpMemo(direction, amount)

    const denomination = 'ETH'

    const success = await submittingTransaction.wrap(
      this.props.settleUp(
        friend as Friend,
        amount as string,
        memo as string,
        direction as string,
        denomination as string
      )
    )

    this.clear()
    
    if (success && success.type === '@@TOAST/DISPLAY_ERROR') {
      this.props.navigation.navigate('Friends')
    } else if (success) {
      this.props.navigation.navigate('Confirmation', { type: 'create', friend })
    }
  }

  getRecentTotal() {
    const friend = this.props.navigation ? this.props.navigation.state.params.friend : {}

    const { recentTransactions } = this.props
    let total = 0

    recentTransactions.map( transaction => {
      if(transaction.creditorAddress === friend.address) {
        total -= transaction.amount
      } else if(transaction.debtorAddress === friend.address) {
        total += transaction.amount
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
    return `${currency(amount)}`
  }

  displayMessage() {
    const { balance } = this.state
    const friend = this.props.navigation ? this.props.navigation.state.params.friend : {}

    return balance > 0 ? debtManagement.direction.pendingLend(friend.nickname) : debtManagement.direction.pendingBorrow(friend.nickname)
  }

  displayTotal(balance) {
    return `${balance < 0 ? '-' : '+'}${currency(cents(balance))}`
  }

  render() {
    const { amount, balance } = this.state
    const { recentTransactions, ethBalance, ethExchange } = this.props
    const friend = this.props.navigation ? this.props.navigation.state.params.friend : {}

    return <ScrollView style={general.whiteFlex} keyboardShouldPersistTaps='handled'>
      <Loading context={submittingTransaction} />
      <DashboardShell text={debtManagement.settleUpLower} />
      <Button close onPress={() => this.props.navigation.navigate('Friends')} />
      <View style={[general.centeredColumn, {marginBottom: 20}]}>
        <Image source={require('images/person-outline-dark.png')} style={style.settleImage}/>
        <Text style={[style.header, {marginBottom: 20}]}>{this.displayMessage()}</Text>
        <View style={style.transactions}>
          {
            recentTransactions.map( (transaction, index) => {
              return transaction.creditorAddress === friend.address || transaction.debtorAddress === friend.address ?
                <View style={style.recent} key={friend.address + index}>
                  <Text style={style.recentText}>{transaction.memo}</Text>
                  <Text style={style.recentText}>{ (transaction.creditorAddress === friend.address ? '-' : '+') + currency(cents(transaction.amount))}</Text>
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
                text={accountManagement.ethBalance.inUsd(ethBalance, ethExchange)}
                containerStyle={{marginTop: -6}}
              />
            </View>
            <Text style={formStyle.title}>{debtManagement.fields.settlementAmount}</Text>
            <TextInput
              style={formStyle.jumboInput}
              placeholder={'$0.00'}
              placeholderTextColor='black'
              value={amount}
              maxLength={14}
              underlineColorAndroid='transparent'
              onChangeText={amount => this.setState({ amount: this.setAmount(amount) })}
            />
          </View>
        </View>
        { amount ? <Button large round wide onPress={() => this.submit()} text={debtManagement.settleUp} /> : <Button large round wide onPress={() => this.setState({ amount: currency(cents(Math.abs(balance))) })} text={debtManagement.settleTotal} />}
        <Button alternate arrowRed large onPress={() => this.cancel()} text={cancel} />
      </View>
    </ScrollView>
  }
}

export default connect((state) => ({ user: getUser(state)(), ethBalance: getEthBalance(state), ethExchange: getEthExchange(state), recentTransactions: recentTransactions(state) }),
{ settleUp })(SettleUp)
