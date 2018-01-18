import React, { Component } from 'react'

import { Text, TouchableHighlight, View, Image } from 'react-native'
import Button from 'ui/components/button'

import Friend from 'lndr/friend'

import { white } from 'theme/include/colors'

import { dollars } from 'lndr/format'

import style from 'theme/account'
import general from 'theme/general'

import { debtManagement } from 'language'

interface Props {
  onPress?: () => void
  friend: Friend
  recentTransactions?: any
  pendingTransactions?: any
}

export default class FriendRow extends Component<Props> {
  constructor() {
    super()
    this.state = {}
  }

  getRecentTotal() {
    const { friend, recentTransactions } = this.props
    let total = 0

    if(recentTransactions !== undefined) {
      recentTransactions.map( transaction => {
        if(transaction.creditorAddress === friend.address) {
          total -= transaction.amount
        } else if(transaction.debtorAddress === friend.address) {
          total += transaction.amount
        }
      })
    }
    return total
  }
  
  getAmountTotal() {
    const { friend, pendingTransactions } = this.props
    let total = this.getRecentTotal()
    let sign = ''

    if(pendingTransactions !== undefined) {
      pendingTransactions.map( transaction => {
        if(transaction.creditorAddress === friend.address) {
          total -= transaction.amount
        } else if(transaction.debtorAddress === friend.address) {
          total += transaction.amount
        }
      })
    }

    if (total >= 0) {
      sign = '+'
    } else {
      sign = '-'
    }

    return `${sign} $${dollars(total)}`
  }

  getTransactionTotal() {
    const { friend, pendingTransactions, recentTransactions } = this.props

    let hasPending = false
    let recentNumber = 0

    if(pendingTransactions !== undefined) {
      pendingTransactions.map( transaction => {
        hasPending = hasPending || transaction.creditorAddress === friend.address || transaction.debtorAddress === friend.address
      })
    }
    
    if(recentTransactions !== undefined) {
      recentTransactions.map( transaction => {
        recentNumber += (transaction.creditorAddress === friend.address || transaction.debtorAddress === friend.address) ? 1 : 0
      })
    }

    const records = ( hasPending ? 1 : 0 ) + recentNumber

    return `${records} ${records === 1 ? 'record' : 'records'}`
  }

  showSettleUp() {
    return this.getRecentTotal() < 0 ? <Button narrow small round onPress={() => null} text={debtManagement.settleUp} style={{marginRight: 10}} /> : null
  }

  render() {
    const { onPress, friend } = this.props

    return (
      <TouchableHighlight style={style.friendRow} onPress={onPress} underlayColor={white} activeOpacity={1}>
        <View style={style.pendingTransactionRow}>
          <View style={[general.flexRow, general.alignCenter]}>
            <Image source={require('images/person-outline-dark.png')} style={style.pendingIcon}/>
            <View style={general.flexColumn}>
              <Text style={style.titledPending}>{friend.nickname}</Text>
              <Text style={style.pendingMemo}>{this.getTransactionTotal()}</Text>
            </View>
          </View>
          <View style={[general.flexRow, general.alignCenter, general.justifyEnd]}>
            {this.showSettleUp()}
            <Text style={style.pendingAmount}>{this.getAmountTotal()}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}
