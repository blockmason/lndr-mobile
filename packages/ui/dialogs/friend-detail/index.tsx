import React, { Component } from 'react'

import { Text, View, Image, ScrollView } from 'react-native'

import Balance from 'lndr/balance'
import Friend from 'lndr/friend'
import { UserData } from 'lndr/user'
import { currencyFormats } from 'lndr/format'
import profilePic from 'lndr/profile-pic'
import PendingView from 'ui/views/account/activity/pending'
import RecentView from 'ui/views/account/activity/recent'
import DashboardShell from 'ui/components/dashboard-shell'
import { currencySymbols } from 'lndr/currencies'

import Button from 'ui/components/button'
import Loading, { LoadingContext } from 'ui/components/loading'
import BalanceSection from 'ui/components/balance-section'

import style from 'theme/friend'
import general from 'theme/general'
import pendingStyle from 'theme/pending'
import accountStyle from 'theme/account'

import language from 'language'
const {
  friendShell,
  debtManagement,
  pendingTransactionsLanguage,
  recentTransactionsLanguage
} = language
const removeFriendText = language.removeFriend

import { getUser, pendingTransactions, recentTransactions, convertCurrency, calculateBalance, 
  getPrimaryCurrency } from 'reducers/app'
import { getTwoPartyBalance, removeFriend } from 'actions'
import { connect } from 'react-redux'

const loadingContext = new LoadingContext()

interface Props {
  user: UserData
  removeFriend: (friend: Friend) => any
  recentTransactions: any
  pendingTransactions: any
  navigation: any
  calculateBalance: (friend: Friend) => number
  getTwoPartyBalance: (user, friend) => Balance
  primaryCurrency: string
}

interface State {
  balanceLoaded?: boolean
  balance: Balance
  pic?: string
}

class RemoveFriend extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      balanceLoaded: false,
      balance: new Balance({ relativeToNickname: "", relativeTo: "", amount: 0 })
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

  async removeFriend(friend: Friend) {
    await loadingContext.wrap(this.props.removeFriend(friend))

    this.props.navigation.goBack()
  }

  async componentDidMount() {
    const { user, getTwoPartyBalance } = this.props
    const friend = this.props.navigation ? this.props.navigation.state.params.friend : {}
    const balance = await getTwoPartyBalance(user, friend)
    this.setState({ balance, balanceLoaded: true })
  }

  getRecentTotal() {
    const friend = this.props.navigation ? this.props.navigation.state.params.friend : {}
    const { calculateBalance } = this.props

    return calculateBalance(friend)
  }

  getTransactionNumber() {
    const { recentTransactions, pendingTransactions } = this.props
    const friend = this.props.navigation ? this.props.navigation.state.params.friend : {}

    let total = 0

    recentTransactions.map( transaction => {
      total += (transaction.creditorAddress === friend.address || transaction.debtorAddress === friend.address) ? 1 : 0
    })

    pendingTransactions.map( transaction => {
      total += (transaction.creditorAddress === friend.address || transaction.debtorAddress === friend.address) ? 1 : 0
    })

    return total
  }

  getColor() {
    return this.getRecentTotal() < 0 ? accountStyle.redAmount : accountStyle.greenAmount
  }

  render() {
    const friend = this.props.navigation ? this.props.navigation.state.params.friend : {}
    const { navigation, primaryCurrency } = this.props
    const { pic } = this.state
    const imageSource = pic ? { uri: pic } : require('images/person-outline-dark.png')

    return <View style={general.whiteFlex}>
      <View style={general.view}>
        <DashboardShell text={friendShell} navigation={this.props.navigation} />
        <Loading context={loadingContext} />
        <Button close onPress={() => this.props.navigation.goBack(null)} />
      </View>
      <ScrollView style={general.view}  keyboardShouldPersistTaps="always">
        <View style={general.centeredColumn}>
          <Image source={imageSource} style={pendingStyle.image}/>
          <Text style={pendingStyle.title}>{`@${friend.nickname}`}</Text>
          <Text style={pendingStyle.subTitle}>{`${recentTransactionsLanguage.balance}:`}</Text>
          <View style={pendingStyle.balanceRow}>
            <Text style={pendingStyle.balanceInfo}>{currencySymbols(primaryCurrency)}</Text>
            <Text style={[pendingStyle.amount]}>{currencyFormats(primaryCurrency)(this.getRecentTotal())}</Text>
          </View>
          <View style={[general.centeredColumn, {marginBottom: 10}]}>
            <BalanceSection friend={friend} />
          </View>
          {this.getRecentTotal() === 0 ? null : <Button round large fat wide onPress={() => this.props.navigation.navigate('SettleUp', { friend: friend })} text={debtManagement.settleUp} containerStyle={style.spaceBottom} />}
          {this.getTransactionNumber() === 0 ? <Button round large danger wide onPress={() => this.removeFriend(friend)} text={removeFriendText} containerStyle={style.spaceBottom} /> : null }
          <View style={style.fullWidth}>
            <Text style={accountStyle.transactionHeader}>{pendingTransactionsLanguage.title}</Text>
            <PendingView friend={friend} navigation={navigation} />
            <Text style={accountStyle.transactionHeader}>{recentTransactionsLanguage.title}</Text>
            <RecentView friend={friend} navigation={navigation} />
          </View>
        </View>
      </ScrollView>
    </View>
  }
}

export default connect((state) => ({ user: getUser(state)(), pendingTransactions: pendingTransactions(state), getTwoPartyBalance: getTwoPartyBalance(state),
  recentTransactions: recentTransactions(state), calculateBalance: calculateBalance(state), convertCurrency: convertCurrency(state), 
  primaryCurrency: getPrimaryCurrency(state)() }),
  { removeFriend })(RemoveFriend)
