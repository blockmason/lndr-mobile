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
  render() {
    const { recentTransaction, onPress } = this.props

    return (
      <TouchableHighlight onPress={onPress} underlayColor={lightGray} activeOpacity={0.5} key={recentTransaction.ucac}>
        <View>
          <View style={style.listItem}>
            <Text style={style.title}>Creditor</Text>
          </View>
          <View style={style.listItem}>
            <Text style={style.fact}>@{recentTransaction.creditor.substr(0, 8)}</Text>
            <Text style={style.address}>{recentTransaction.creditor}</Text>
          </View>
          <View style={style.listItem}>
            <Text style={style.title}>Debtor (owes the debt)</Text>
          </View>
          <View style={style.listItem}>
          <Text style={style.fact}>@{recentTransaction.debtor.substr(0, 8)}</Text>
          <Text style={style.address}>{recentTransaction.debtor}</Text>
          </View>
          <View style={style.listItem}>
            <Text style={style.title}>Amount</Text>
            <Text style={style.text}>{recentTransaction.amount} US cents</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}
