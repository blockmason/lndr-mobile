import React, { Component } from 'react'

import { Text, TouchableHighlight, View, Image } from 'react-native'

import { dollars } from 'lndr/format'
import User from 'lndr/user'

import RecentTransaction from 'lndr/recent-transaction'

import { white } from 'theme/include/colors'

import { debtManagement } from 'language'

import style from 'theme/account'
import formStyle from 'theme/form'
import general from 'theme/general'

interface Props {
  onPress?: () => void
  recentTransaction: RecentTransaction,
  user: User
  friend?: boolean
}

export default class RecentTransactionRow extends Component<Props> {
  getTitle() {
    const { recentTransaction, user } = this.props

    if (user.address === recentTransaction.creditorAddress) {
      return recentTransaction.debtorNickname
    }

    else if (user.address === recentTransaction.debtorAddress) {
      return recentTransaction.creditorNickname
    }

    else {
      return 'Unknown Transaction'
    }
  }

  getAmount() {
    const { recentTransaction, user } = this.props

    let sign = ''

    if (user.address === recentTransaction.creditorAddress) {
      sign = '+'
    } else if (user.address === recentTransaction.debtorAddress) {
      sign = '-'
    }

    return `${sign} $${dollars(recentTransaction.amount)}`
  }

  render() {
    const { onPress, recentTransaction, friend } = this.props

    return (
      <TouchableHighlight style={style.pendingTransaction} onPress={onPress} underlayColor={white} activeOpacity={1}>
        <View style={style.pendingTransactionRow}>
          <View style={general.flexRow}>
            {!friend ? <Image source={require('images/person-outline-dark.png')} style={style.recentIcon}/> : null }
            <Text style={style.titledPending}>{friend ? recentTransaction.memo : this.getTitle()}</Text>
          </View>
          <Text style={style.pendingAmount}>{this.getAmount()}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}
