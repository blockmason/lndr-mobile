import React, { Component } from 'react'

import { Text, TextInput, TouchableHighlight, View, Image, ScrollView } from 'react-native'

import { debounce } from 'lndr/time'
import Balance from 'lndr/balance'
import Friend from 'lndr/friend'
import { UserData } from 'lndr/user'
import { currencyFormats } from 'lndr/format'
import profilePic from 'lndr/profile-pic'
import PendingView from 'ui/views/account/activity/pending'
import RecentView from 'ui/views/account/activity/recent'
import DashboardShell from 'ui/components/dashboard-shell'
import { defaultCurrency, currencySymbols, transferLimits  } from 'lndr/currencies'

import Button from 'ui/components/button'
import Loading, { LoadingContext } from 'ui/components/loading'
import BalanceRow from 'ui/components/balance-row'

import style from 'theme/friend'
import general from 'theme/general'
import pendingStyle from 'theme/pending'
import accountStyle from 'theme/account'

import language from 'language'
const {
  cancel,
  back,
  friendInfo,
  friendShell,
  noBalances,
  debtManagement,
  pendingTransactionsLanguage,
  recentTransactionsLanguage
} = language
const removeFriendText = language.removeFriend

import { getUser, pendingTransactions, recentTransactions, getUcacAddr } from 'reducers/app'
import { getTwoPartyBalance, removeFriend } from 'actions'
import { connect } from 'react-redux'

const loadingContext = new LoadingContext()

interface Props {
  user: UserData
  removeFriend: (friend: Friend) => any
  getUcacAddress: (currency: string) => string
  recentTransactions: any
  pendingTransactions: any
  navigation: any
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
    const { user } = this.props
    const friend = this.props.navigation ? this.props.navigation.state.params.friend : {}
    const balance = await getTwoPartyBalance(user, friend)
    this.setState({ balance, balanceLoaded: true })
  }

  getRecentTotal() {
    const { recentTransactions, getUcacAddress } = this.props
    const friend = this.props.navigation ? this.props.navigation.state.params.friend : {}
    let total = 0

    recentTransactions.map( transaction => {
      if(getUcacAddress(defaultCurrency).indexOf(transaction.ucac) !== -1 ) {
        if(transaction.creditorAddress === friend.address) {
          total -= transaction.amount
        } else if(transaction.debtorAddress === friend.address) {
          total += transaction.amount
        }
      }
    })

    return total
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
  
  render() {
    const friend = this.props.navigation ? this.props.navigation.state.params.friend : {}
    const { navigation } = this.props
    const { pic } = this.state
    const imageSource = pic ? { uri: pic } : require('images/person-outline-dark.png')
    
    return <ScrollView style={general.view}>
      <DashboardShell text={friendShell} navigation={this.props.navigation} />
      <Loading context={loadingContext} />
      <Button close onPress={() => this.props.navigation.goBack(null)} />
      <View style={general.centeredColumn}>
        <Image source={imageSource} style={pendingStyle.image}/>
        <Text style={pendingStyle.title}>{`@${friend.nickname}`}</Text>
        <Text style={pendingStyle.subTitle}>{`${recentTransactionsLanguage.balance}:`}</Text>
        <View style={pendingStyle.balanceRow}>
          <Text style={pendingStyle.balanceInfo}>{currencySymbols[defaultCurrency]}</Text>
          <Text style={pendingStyle.amount}>{currencyFormats[defaultCurrency](this.getRecentTotal())}</Text>
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
  }
}

export default connect((state) => ({ user: getUser(state)(), pendingTransactions: pendingTransactions(state), recentTransactions: recentTransactions(state), getUcacAddress: getUcacAddr(state) }),{ removeFriend })(RemoveFriend)
