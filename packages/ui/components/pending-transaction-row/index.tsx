import React, { Component } from 'react'

import { Text, TouchableHighlight, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import { cents } from 'lndr/format'
import PendingTransaction from 'lndr/pending-transaction'
import User from 'lndr/user'

import { lightGray } from 'theme/include/colors'

import formStyle from 'theme/form'
import style from 'theme/account'

import { debtManagement } from 'language'

interface Props {
  onPress?: () => void
  pendingTransaction: PendingTransaction
  user: User
}

export default class PendingTransactionRow extends Component<Props> {
  getTitle() {
    const { pendingTransaction, user } = this.props

    if (user.address === pendingTransaction.creditorAddress) {
      return debtManagement.direction.lend(pendingTransaction.debtorNickname, cents(pendingTransaction.amount))
    }

    else if (user.address === pendingTransaction.debtorAddress) {
      return debtManagement.direction.borrow(pendingTransaction.creditorNickname, cents(pendingTransaction.amount))
    }

    else {
      return 'Unknown Transaction'
    }
  }

  getIcon() {
    const { pendingTransaction, user } = this.props

    if (user.address === pendingTransaction.submitter) {
      return <Icon name={'md-time'} style={style.transactionIcon} />
    }

    return <Icon name={'md-alert'} style={style.transactionIcon} />
  }

  getAmountStyle() {
    const { pendingTransaction, user } = this.props

    if (user.address === pendingTransaction.creditorAddress) {
      return style.titledFactAmountGood
    }

    else if (user.address === pendingTransaction.debtorAddress) {
      return style.titledFactAmountDanger
    }

    else {
      return style.titledFact
    }
  }

  render() {
    const { onPress, pendingTransaction } = this.props

    return (
      <TouchableHighlight style={style.pendingTransaction} onPress={onPress} underlayColor={lightGray} activeOpacity={0.5}>
        <View>
          {this.getIcon()}
          <Text style={formStyle.header}>{this.getTitle()}</Text>
          <View style={style.listItem}>
            <Text style={style.fact}>Creditor: @{pendingTransaction.creditorNickname}</Text>
            <Text selectable style={style.address}>{pendingTransaction.creditorAddress}</Text>
          </View>
          <View style={style.listItem}>
            <Text style={style.fact}>Debtor: @{pendingTransaction.debtorNickname}</Text>
            <Text selectable style={style.address}>{pendingTransaction.debtorAddress}</Text>
          </View>
          <View style={style.listItem}>
            <Text style={style.title}>Memo</Text>
            <Text style={style.title}>Amount</Text>
          </View>
          <View style={style.listItem}>
            <Text style={style.titledFact}>{pendingTransaction.memo}</Text>
            <Text style={this.getAmountStyle()}>{cents(pendingTransaction.amount)}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}
