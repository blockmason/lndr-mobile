import React, { Component } from 'react'

import { Text, TouchableHighlight, View, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import { dollars, cents } from 'lndr/format'
import PendingTransaction from 'lndr/pending-transaction'
import User from 'lndr/user'

import { white } from 'theme/include/colors'

import formStyle from 'theme/form'
import style from 'theme/account'
import general from 'theme/general'

import { debtManagement } from 'language'

interface Props {
  onPress?: () => void
  pendingTransaction: PendingTransaction
  user: User
  friend?: boolean
}

export default class PendingTransactionRow extends Component<Props> {
  getTitle() {
    const { pendingTransaction, user } = this.props

    if (user.address === pendingTransaction.creditorAddress) {
      return debtManagement.direction.pendingLend(pendingTransaction.debtorNickname)
    }

    else if (user.address === pendingTransaction.debtorAddress) {
      return debtManagement.direction.pendingBorrow(pendingTransaction.creditorNickname)
    }

    else {
      return 'Unknown Transaction'
    }
  }

  getAmount() {
    const { pendingTransaction, user } = this.props

    let sign = ''

    if (user.address === pendingTransaction.creditorAddress) {
      sign = '+'
    } else if (user.address === pendingTransaction.debtorAddress) {
      sign = '-'
    }

    return `${sign} $${cents(pendingTransaction.amount)}`
  }

  render() {
    const { onPress, pendingTransaction, friend } = this.props

    return (
      <TouchableHighlight style={style.pendingTransaction} onPress={onPress} underlayColor={white} activeOpacity={1}>
        <View style={style.pendingTransactionRow}>
          <View style={general.flexRow}>
          {!friend ? <Image source={require('images/person-outline-dark.png')} style={style.pendingIcon}/> : null }
            <View style={general.flexColumn}>
              {!friend ? <Text style={style.titledPending}>{this.getTitle()}</Text> : null }
              <Text style={style.pendingMemo}>{friend ? pendingTransaction.memo : debtManagement.for(pendingTransaction.memo)}</Text>
            </View>
          </View>
          <Text style={style.pendingAmount}>{this.getAmount()}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}
