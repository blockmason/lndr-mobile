import React, { Component } from 'react'
import { Text, View, Image, ScrollView, KeyboardAvoidingView, Platform, Picker } from 'react-native'
import firebase from 'react-native-firebase'
import { getResetAction } from 'reducers/nav'

import { UserData } from 'lndr/user'
import { currencyFormats, sanitizeAmount, formatSettlementAmount, formatMemo } from 'lndr/format'
import Friend from 'lndr/friend'
import { currencySymbols } from 'lndr/currencies'
import profilePic from 'lndr/profile-pic'

import Button from 'ui/components/button'
import { LoadingContext } from 'ui/components/loading'
import DashboardShell from 'ui/components/dashboard-shell'
import BalanceSection from 'ui/components/balance-section'

import style from 'theme/friend'
import general from 'theme/general'
import accountStyle from 'theme/account'

import settlementTypes from 'lndr/settlements'

import language from 'language'
const {
  debtManagement} = language

import { getUser, recentTransactions, getEthBalance, getEthExchange, getWeeklyEthTotal,
  hasPendingTransaction, calculateBalance, getUcacCurrency, getPrimaryCurrency } from 'reducers/app'
import { addDebt, getEthTxCost, requestPayPalSettlement, cancelPayPalRequestFail } from 'actions'
import { connect } from 'react-redux'

const submittingTransaction = new LoadingContext()


interface Props {
  user: UserData
  ethBalance: string
  primaryCurrency: string
  ethSentPastWeek: number
  recentTransactions: any
  navigation: any
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
  ethExchange: (currency: string) => string
  calculateBalance: (friend: Friend) => number
  getUcacCurrency: (ucac: string) => string
  cancelPayPalRequestFail: () => void
}

interface State {
  amount?: string
  formInputError?: string
  balance: number
  direction: string
  txCost: string
  ethCost: string
  pic?: string
  settlementType?: string
  friend: Friend
  fromPayPalRequest?: boolean
}

class SettleUp extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      balance: this.getRecentTotal(),
      direction: this.getRecentTotal() > 0 ? 'borrow' : 'lend',
      txCost: '0.00',
      ethCost: '',
      friend: new Friend('', '')
    }
  }

  async componentWillMount() {
    const { primaryCurrency } = this.props
    const txCost = await getEthTxCost(primaryCurrency)
    const friend = this.props.navigation ? this.props.navigation.state.params.friend : {}
    const settlementType = this.props.navigation ? this.props.navigation.state.params.settlementType : ''
    const fromPayPalRequest = this.props.navigation ? this.props.navigation.state.params.fromPayPalRequest : false

    let amount, formInputError, ethCost

    if(this.state.balance) {
      amount = formatSettlementAmount(String(Math.abs(this.state.balance)), primaryCurrency)
    }
    let pic
    if (friend.address !== undefined) {
      pic = await profilePic.get(friend.address)
    }
    console.log('LOADING AMOUNT ', amount)
    this.setState({txCost, pic, amount, ethCost, formInputError, settlementType, friend, fromPayPalRequest})
  }


  componentDidMount( ) {
    firebase.analytics().setCurrentScreen('settle-up', 'SettleUp');
  }

  componentWillUnmount() {
    // unmou
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

    if ( denomination === 'PAYPAL' && (!this.isPayee()) ) {
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
          formatMemo(memo) as string,
          direction as string,
          primaryCurrency as string,
          settleTotal as boolean,
          denomination as string
        )
      )
    }
    let type = 'create'
    if (this.isPayPalSettlement())
      type = (this.isPayee()) ? 'requestPayPalPayment' : 'settledWithPayPal'

    this.displayConfirmation(success, type, friend)
  }

  async handleRequestPayPalPayee() {
    const friend = this.props.navigation.state.params.friend
    const success = await submittingTransaction.wrap(this.props.requestPayPalSettlement(friend as Friend))
    this.displayConfirmation(success, 'requestPayPalPayee', friend)
  }

  displayConfirmation(success, type, friend) {
    if (!success)
      return

    this.clear()

    let navAction
    if (success.type === '@@TOAST/DISPLAY_ERROR') {
      navAction = getResetAction({ routeName:'Dashboard' })
    } else {
      navAction = getResetAction({ routeName:'Confirmation', params: { type: type, friend } })
    }

    this.props.navigation.dispatch(navAction)
  }

  isPayee() {
    return (this.state.direction === 'borrow')
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

  displayMessage() {
    const friend = this.props.navigation ? this.props.navigation.state.params.friend : {}

    return `@${friend.nickname}`
  }

  displayTotal(balance) {
    const { primaryCurrency } = this.props
    return `${balance < 0 ? '' : '+'}${currencySymbols(primaryCurrency)}${currencyFormats(primaryCurrency)(balance)}`
  }


  render() {
    const { balance, pic, settlementType } = this.state
    const { navigation } = this.props
    const friend = navigation ? navigation.state.params.friend : {}
    const imageSource = pic ? { uri: pic } : require('images/person-outline-dark.png')
    const vertOffset = (Platform.OS === 'android') ? -300 : 20

    return <View style={general.whiteFlex}>
      <View style={general.view}>
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
              <View style={[general.centeredColumn, {marginTop: 20}]}>
                <View>
                  <Text style={[accountStyle.balance]}>Settlement Options</Text>
                  <Picker
                    selectedValue={ settlementType }
                    onValueChange={(value, _index) => navigation.navigate('Settlement', { friend, settlementType: value })}
                    prompt="Settlement Type">
                    {settlementTypes.map((value, key) => 
                        <Picker.Item
                            label={value.settlementOption}
                            key={key} 
                            value={value.settlementType}>
                                {value.settlementOption}
                        </Picker.Item>)
                    }
                  </Picker>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  }
}

export default connect((state) => ({ user: getUser(state)(),
  recentTransactions: recentTransactions(state), hasPendingTransaction: hasPendingTransaction(state),
  calculateBalance: calculateBalance(state), getUcacCurrency: getUcacCurrency(state), primaryCurrency: getPrimaryCurrency(state)}),
  {})(SettleUp)
