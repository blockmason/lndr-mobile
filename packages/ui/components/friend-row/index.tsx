import React, { Component } from 'react'

import { Text, View } from 'react-native'
import Button from 'ui/components/button'
import ProfilePic from 'ui/components/images/profile-pic'
import Card from 'ui/components/card'

import Friend from 'lndr/friend'
import { currencyFormats } from 'lndr/format'
import { currencySymbols } from 'lndr/currencies'
import PendingTransaction from 'lndr/pending-transaction'
import RecentTransaction from 'lndr/recent-transaction'

import style from 'theme/account'
import general from 'theme/general'

import { calculateBalance, convertCurrency, getPrimaryCurrency, getPendingFromFriend } from 'reducers/app'
import { connect } from 'react-redux'

import language from 'language'
const { debtManagement, pendingTransactionsLanguage } = language

interface Props {
  friend: Friend
  friendScreen?: boolean
  recentTransactions?: RecentTransaction[]
  navigation: any
  primaryCurrency: string
  pendingTransactions?: PendingTransaction[]
  hasPending?: boolean
  onPress: () => void
  calculateBalance: (friend: Friend) => number
  getPendingFromFriend: (friendNick: string) => any
}

class FriendRow extends Component<Props> {
  constructor(props) {
    super(props)

    this.navigateToSettlement = this.navigateToSettlement.bind(this)
  }

  getRecentTotal() {
    const { friend, calculateBalance } = this.props
    return calculateBalance(friend)
  }

  getAmountTotal() {
    const { primaryCurrency } = this.props
    let total = this.getRecentTotal()
    let sign = ''

    if (total >= 0) {
      sign = '+'
    } else {
      sign = '-'
    }

    return `${sign} ${currencySymbols(primaryCurrency)}${currencyFormats(`${primaryCurrency}abs`)(total)}`
  }

  getTransactionTotal() {
    const { friend, recentTransactions } = this.props

    let hasPending = false
    let recentNumber = 0

    if(recentTransactions !== undefined) {
      recentTransactions.map( transaction => {
        recentNumber += (transaction.creditorAddress === friend.address || transaction.debtorAddress === friend.address) ? 1 : 0
      })
    }

    const records = ( hasPending ? 1 : 0 ) + recentNumber

    return `${records} ${records === 1 ? debtManagement.record : debtManagement.records}`
  }

  showEthSettlement() {
    const { friendScreen } = this.props
    
    return this.getRecentTotal() === 0 || !friendScreen ? null : <Button narrow small round onPress={this.navigateToSettlement} text={debtManagement.settleUp} style={{maxWidth: 130, alignSelf:'flex-end'}} />
  }

  navigateToSettlement() {
    const { friend, getPendingFromFriend } = this.props
    const { route, pendingTransaction, pendingSettlement } = getPendingFromFriend(friend.nickname)
    if(route) {
      this.props.navigation.navigate(route, { pendingSettlement, pendingTransaction })
    } else {
      this.props.navigation.navigate('Settlement', { friend })
    }
  }

  getColor() {
    return this.getAmountTotal().includes('-') ? style.redAmount : style.greenAmount
  }

  showPendingMessage() {
    return <Button narrow small round danger onPress={this.props.onPress} text={pendingTransactionsLanguage.title} style={{maxWidth: 130, alignSelf:'flex-end'}} />
  }

  render() {
    const { onPress, friend, hasPending } = this.props

    return (
      <Card style={style.friendRowCard} onPress={onPress}>
        <View style={style.friendRowContent}>
          <View style={[general.flexRow, general.alignCenter]}>
            <ProfilePic address={friend.address} size={60} style={style.friendIcon}/>
            <View style={general.flexColumn}>
              <Text style={style.titledPending}>{`@${friend.nickname}`}</Text>
              <Text style={style.pendingMemo}>{this.getTransactionTotal()}</Text>
            </View>
          </View>
          <View style={[general.flexRow, general.alignCenter, general.justifyEnd]}>
            <View style={general.column}>
              <Text style={[style.pendingAmount, this.getColor(), {alignSelf: 'flex-end'}]}>{this.getAmountTotal()}</Text>
              {hasPending ? this.showPendingMessage() : this.showEthSettlement()}
            </View>
          </View>
        </View>
      </Card>
    )
  }
}

export default connect((state) => ({ calculateBalance: calculateBalance(state), primaryCurrency: getPrimaryCurrency(state),
  getPendingFromFriend: getPendingFromFriend(state), convertCurrency: convertCurrency(state) }))(FriendRow)
