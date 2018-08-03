import React, { Component } from 'react'

import { Text, TouchableHighlight, View, Image } from 'react-native'
import Button from 'ui/components/button'

import Friend from 'lndr/friend'
import PendingUnilateral from 'lndr/pending-unilateral'
import { currencyFormats } from 'lndr/format'
import profilePic from 'lndr/profile-pic'
import { currencySymbols } from 'lndr/currencies'

import { white } from 'theme/include/colors'
import style from 'theme/account'
import general from 'theme/general'

import { calculateBalance, convertCurrency, getPrimaryCurrency, getPendingFromFriend } from 'reducers/app'
import { connect } from 'react-redux'

import language from 'language'
const { debtManagement } = language

interface Props {
  onPress?: () => void
  friend: Friend
  friendScreen?: boolean
  recentTransactions?: any
  navigation: any
  calculateBalance: (friend: Friend) => number
  primaryCurrency: string
  getPendingFromFriend: (friendNick: string) => any
}

interface State {
  pic?: string
}

let unmounting = false;

class FriendRow extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {}

    this.navigateToSettlement = this.navigateToSettlement.bind(this)
  }

  async componentWillMount() {
    const { friend } = this.props
    let pic
    unmounting = false;

    try {
      pic = await profilePic.get(friend.address)
    } catch (e) {}
    if (!unmounting && pic) {
      this.setState({pic})
    }
  }

  componentWillUnmount() {
    unmounting = true;
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
      this.props.navigation.navigate('SettleUp', { friend })
    }
  }

  getColor() {
    return this.getAmountTotal().includes('-') ? style.redAmount : style.greenAmount
  }

  render() {
    const { onPress, friend } = this.props
    const { pic } = this.state
    const imageSource = pic ? { uri: pic } : require('images/person-outline-dark.png')

    return (
      <TouchableHighlight style={style.friendRow} onPress={onPress} underlayColor={white} activeOpacity={1}>
        <View style={style.pendingTransactionRow}>
          <View style={[general.flexRow, general.alignCenter]}>
            <Image source={imageSource} style={style.friendIcon}/>
            <View style={general.flexColumn}>
              <Text style={style.titledPending}>{`@${friend.nickname}`}</Text>
              <Text style={style.pendingMemo}>{this.getTransactionTotal()}</Text>
            </View>
          </View>
          <View style={[general.flexRow, general.alignCenter, general.justifyEnd]}>
            <View style={general.column}>
              <Text style={[style.pendingAmount, this.getColor(), {alignSelf: 'flex-end'}]}>{this.getAmountTotal()}</Text>
              {this.showEthSettlement()}
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

export default connect((state) => ({ calculateBalance: calculateBalance(state), primaryCurrency: getPrimaryCurrency(state),
  getPendingFromFriend: getPendingFromFriend(state), convertCurrency: convertCurrency(state) }))(FriendRow)
