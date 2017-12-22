import React, { Component } from 'react'

import { Text, TouchableHighlight, View } from 'react-native'

import { cents } from 'lndr/format'
import User from 'lndr/user'

import RecentTransaction from 'lndr/recent-transaction'

import { lightGray } from 'theme/include/colors'

import { debtManagement } from 'language'

import style from 'theme/account'
import formStyle from 'theme/form'

interface Props {
  onPress?: () => void
  recentTransaction: RecentTransaction,
  user: User
}

export default class RecentTransactionRow extends Component<Props> {
  getTitle() {
    const { recentTransaction, user } = this.props

    if (user.address === recentTransaction.creditorAddress) {
      return debtManagement.direction.lend(recentTransaction.debtorNickname, cents(recentTransaction.amount))
    }

    else if (user.address === recentTransaction.debtorAddress) {
      return debtManagement.direction.borrow(recentTransaction.creditorNickname, cents(recentTransaction.amount))
    }

    else {
      return 'Unknown Transaction'
    }
  }

  getAmountStyle() {
    const { recentTransaction, user } = this.props

    if (user.address === recentTransaction.creditorAddress) {
      return style.titledFactAmountGood
    }

    else if (user.address === recentTransaction.debtorAddress) {
      return style.titledFactAmountDanger
    }

    else {
      return style.titledFact
    }
  }

  render() {
    const { onPress, recentTransaction } = this.props

    return (
      <TouchableHighlight style={style.recentTransaction} onPress={onPress} underlayColor={lightGray} activeOpacity={0.5}>
        <View>
          <Text style={formStyle.header}>{this.getTitle()}</Text>
          <View style={style.listItem}>
            <Text style={style.titledFact}>{recentTransaction.memo}</Text>
            <Text style={this.getAmountStyle()}>{cents(recentTransaction.amount)}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}
