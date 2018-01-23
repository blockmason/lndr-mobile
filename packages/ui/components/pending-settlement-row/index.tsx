import React, { Component } from 'react'

import { Text, TouchableHighlight, View, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'

import { dollars } from 'lndr/format'
import PendingSettlement from 'lndr/pending-settlement'
import User from 'lndr/user'

import { white } from 'theme/include/colors'

import formStyle from 'theme/form'
import style from 'theme/account'
import general from 'theme/general'

import settlerIsMe from 'reducers/app'

import { debtManagement } from 'language'

interface Props {
  onPress?: () => void
  pendingSettlement: PendingSettlement
  user: User
  friend?: boolean
  settlerIsMe: (pendingSettlement: PendingSettlement) => boolean
}

export default class PendingSettlementRow extends Component<Props> {
  getTitle() {
    const { pendingSettlement, user, settlerIsMe } = this.props

    if(settlerIsMe(pendingSettlement)) {
      if (user.address === pendingSettlement.creditorAddress) {
        return debtManagement.direction.pendingLendSettlementMe(pendingSettlement)
      } else if (user.address === pendingSettlement.debtorAddress) {
        return debtManagement.direction.pendingBorrowSettlementMe(pendingSettlement)
      } else {
        return 'Unknown Settlement'
      }
    } else {
      if (user.address === pendingSettlement.creditorAddress) {
        return debtManagement.direction.pendingLendSettlement(pendingSettlement)
      } else if (user.address === pendingSettlement.debtorAddress) {
        return debtManagement.direction.pendingBorrowSettlement(pendingSettlement)
      } else {
        return 'Unknown Settlement'
      }
    }
  }

  getAmount() {
    const { pendingSettlement, user } = this.props
    let sign = ''

    if (user.address === pendingSettlement.creditorAddress) {
      sign = '+'
    } else if (user.address === pendingSettlement.debtorAddress) {
      sign = '-'
    }

    return `${sign} $${dollars(pendingSettlement.amount)}`
  }

  render() {
    const { onPress, pendingSettlement, friend } = this.props

    return (
      <TouchableHighlight style={style.pendingTransaction} onPress={onPress} underlayColor={white} activeOpacity={1}>
        <View style={style.pendingTransactionRow}>
          <View style={general.flexRow}>
          {!friend ? <Image source={require('images/person-outline-dark.png')} style={style.pendingIcon}/> : null }
            <View style={general.flexColumn}>
              {!friend ? <Text style={style.titledPending}>{this.getTitle()}</Text> : null }
              {friend ? <Text style={style.pendingMemo}>{pendingSettlement.memo}</Text> : null }
            </View>
          </View>
          <Text style={style.pendingAmount}>{this.getAmount()}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}
