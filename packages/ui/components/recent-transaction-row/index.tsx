import React, { Component } from 'react'

import { Text, TouchableHighlight, View } from 'react-native'

import RecentTransaction from 'lndr/recent-transaction'

import { lightGray } from 'theme/include/colors'

import style from 'theme/account'

interface Props {
  onPress?: () => void
  recentTransaction: RecentTransaction
}

export default class RecentTransactionRow extends Component<Props> {

  calculateDebtContent({ doesUserOweFriend, amount, creditor, debtor }) {
    if (doesUserOweFriend) {
      return `You owe @${creditor.substr(0, 8)} ${amount} USD`
    }

    return `@${debtor.substr(0, 8)} owes you ${amount} USD`
  }

  render() {
    const { recentTransaction, onPress } = this.props

    return (
      <TouchableHighlight onPress={onPress} underlayColor={lightGray} activeOpacity={0.5} key={recentTransaction.ucac}>
        <View>
          <View style={style.listItem}>
            <Text style={style.fact}>{this.calculateDebtContent(recentTransaction)}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}
