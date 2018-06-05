import React, { Component } from 'react'

import { Text, TouchableHighlight, View } from 'react-native'
import { connect } from 'react-redux'

import { currencyFormats } from 'lndr/format'
import Balance from 'lndr/balance'
import { currencySymbols, transferLimits  } from 'lndr/currencies'

import { lightGray } from 'theme/include/colors'

import style from 'theme/account'
import { getPrimaryCurrency } from 'reducers/app';

interface Props {
  onPress?: () => void
  balance: Balance
  primaryCurrency
}

class BalanceRow extends Component<Props> {
  renderAmount() {
    const { balance, primaryCurrency } = this.props
    const { amount } = balance

    if (amount < 0) {
      return <Text style={style.titledFactAmountDanger}>{currencyFormats(primaryCurrency)(amount)}</Text>
    }

    else {
      return <Text style={style.titledFactAmountGood}>{currencyFormats(primaryCurrency)(amount)}</Text>
    }
  }

  render() {
    const { onPress, balance } = this.props

    return (
      <TouchableHighlight onPress={onPress} underlayColor={lightGray} activeOpacity={0.5}>
        <View style={style.listItem}>
          {this.renderAmount()}
          <Text style={style.fact}>@{balance.relativeToNickname}</Text>
          <Text selectable style={style.address}>{balance.relativeTo}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

export default connect((state) => ({ primaryCurrency: getPrimaryCurrency(state)() }))(BalanceRow)
