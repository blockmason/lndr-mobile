import React, { Component } from 'react'

import { Text, TouchableHighlight, View } from 'react-native'

import TransactionHistory from 'lndr/transaction-history'

import { lightGray } from 'theme/include/colors'

import style from 'theme/account'

interface Props {
  transactionHistory: TransactionHistory
}

export default class TransactionHistoryRow extends Component<Props> {
  render() {
    const {
      transactionHistory: {
        debtor,
        creditor,
        amount,
        ucac,
        doesUserOweFriend
      }
    } = this.props

    return (
      <TouchableHighlight underlayColor={lightGray} activeOpacity={0.5} key={ucac}>
        <View style={style.listItem}>
          <Text style={style.title}>Creditor</Text>
        </View>
        <View style={style.listItem}>
          <Text style={style.fact}>@{creditor.substr(0, 8)}</Text>
          <Text style={style.address}>{creditor}</Text>
        </View>
        <View style={style.listItem}>
          <Text style={style.title}>Debtor (owes the debt)</Text>
        </View>
        <View style={style.listItem}>
          <Text style={style.fact}>@{debtor.substr(0, 8)}</Text>
          <Text style={style.address}>{debtor}</Text>
        </View>
        <View style={style.listItem}>
          <Text style={style.title}>Amount</Text>
          <Text style={style.text}>{amount} US cents</Text>
        </View>
      </TouchableHighlight>
    )
  }
}
