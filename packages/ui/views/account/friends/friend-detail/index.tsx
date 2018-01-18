import React, { Component } from 'react'

import { Text, TextInput, TouchableHighlight, View, Image, ScrollView } from 'react-native'

import { debounce } from 'lndr/time'
import Balance from 'lndr/balance'
import Friend from 'lndr/friend'
import { UserData } from 'lndr/user'
import { cents } from 'lndr/format'
import PendingView from 'ui/views/account/activity/pending'
import RecentView from 'ui/views/account/activity/recent'
import DashboardShell from 'ui/components/dashboard-shell'

import Button from 'ui/components/button'
import Loading, { LoadingContext } from 'ui/components/loading'
import BalanceRow from 'ui/components/balance-row'

import style from 'theme/friend'
import general from 'theme/general'
import pendingStyle from 'theme/pending'
import accountStyle from 'theme/account'

import {
  cancel,
  back,
  removeFriend as removeFriendText,
  friendInfo,
  noBalances,
  debtManagement,
  pendingTransactionsLanguage,
  recentTransactionsLanguage
} from 'language'

import { getUser } from 'reducers/app'
import { getTwoPartyBalance, removeFriend } from 'actions'
import { connect } from 'react-redux'

const loadingContext = new LoadingContext()

interface Props {
  friend: Friend
  user: UserData
  removeFriend: (friend: Friend) => any
  closePopup: () => void
  recentTransactions: any
  pendingTransactions: any
}

interface State {
  balanceLoaded?: boolean
  balance: Balance
}

class RemoveFriend extends Component<Props, State> {
  constructor() {
    super()
    this.state = {
      balanceLoaded: false,
      balance: new Balance({ relativeToNickname: "", relativeTo: "", amount: 0 })
    }
  }

  async removeFriend(friend: Friend) {
    const { closePopup } = this.props

    await loadingContext.wrap(
      this.props.removeFriend(friend)
    )

    closePopup()
  }

  async componentDidMount() {
    const { user, friend } = this.props
    const balance = await getTwoPartyBalance(user, friend)
    this.setState({ balance, balanceLoaded: true })
  }

  getRecentTotal() {
    const { friend, recentTransactions } = this.props
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

  getTransactionNumber() {
    const { friend, recentTransactions, pendingTransactions } = this.props

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
    const { friend, closePopup } = this.props

    return <ScrollView>
      <DashboardShell text='Friend' />
      <Loading context={loadingContext} />
      <Button close onPress={closePopup} />
      <View style={general.centeredColumn}>
        <Image source={require('images/person-outline-dark.png')} style={pendingStyle.image}/>
        <Text style={pendingStyle.title}>{`@${friend.nickname}`}</Text>
        <Text style={pendingStyle.subTitle}>{`${recentTransactionsLanguage.balance}:`}</Text>
        <View style={pendingStyle.balanceRow}>
          <Text style={pendingStyle.balanceInfo}>$</Text>
          <Text style={pendingStyle.amount}>{cents(this.getRecentTotal())}</Text>
          <Text style={pendingStyle.balanceInfo}>USD</Text>
        </View>
        { this.getRecentTotal() < 0 ? <Button round large fat wide onPress={() => null} text={debtManagement.settleUp} containerStyle={style.spaceBottom} /> : null }
        { this.getTransactionNumber() === 0 ? <Button round large danger wide onPress={() => this.removeFriend(friend)} text={removeFriendText} containerStyle={style.spaceBottom} /> : null }
        <View style={style.fullWidth}>
          <Text style={accountStyle.transactionHeader}>{pendingTransactionsLanguage.title}</Text>
          <PendingView friend={friend} onTransition={closePopup} />
          <Text style={accountStyle.transactionHeader}>{recentTransactionsLanguage.title}</Text>
          <RecentView friend={friend} />
        </View>
      </View>
    </ScrollView>
  }
}

export default connect((state) => ({ user: getUser(state)() }),{ removeFriend })(RemoveFriend)
