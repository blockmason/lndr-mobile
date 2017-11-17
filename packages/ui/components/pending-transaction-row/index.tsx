import React, { Component } from 'react'

import { Text, TouchableHighlight, View } from 'react-native'

import PendingTransaction from 'lndr/pending-transaction'

import { lightGray } from 'theme/include/colors'

import style from 'theme/account'

interface Props {
  onPress?: () => void
  pendingTransaction: PendingTransaction
}

export default class PendingTransactionRow extends Component<Props> {
  render() {
    const { onPress, pendingTransaction } = this.props

    return (
      <TouchableHighlight onPress={onPress} underlayColor={lightGray} activeOpacity={0.5} key={pendingTransaction.hash}>
        <View>
          <View style={style.listItem}>
            <Text style={style.title}>Creditor</Text>
          </View>
          <View style={style.listItem}>
            <Text style={style.fact}>@{pendingTransaction.creditRecord.creditorAddress.substr(0, 8)}</Text>
            <Text style={style.address}>{pendingTransaction.creditRecord.creditorAddress}</Text>
          </View>
          <View style={style.listItem}>
            <Text style={style.title}>Debtor (owes the debt)</Text>
          </View>
          <View style={style.listItem}>
            <Text style={style.fact}>@{pendingTransaction.creditRecord.debtorAddress.substr(0, 8)}</Text>
            <Text style={style.address}>{pendingTransaction.creditRecord.debtorAddress}</Text>
          </View>
          <View style={style.listItem}>
            <Text style={style.title}>Memo</Text>
            <Text style={style.text}>{pendingTransaction.creditRecord.memo}</Text>
          </View>
          <View style={style.listItem}>
            <Text style={style.title}>Amount</Text>
            <Text style={style.text}>{pendingTransaction.creditRecord.amount} US cents</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}
