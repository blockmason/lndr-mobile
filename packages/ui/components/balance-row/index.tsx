import React, { Component } from 'react'

import { Text, TouchableHighlight, View } from 'react-native'

import { currencyFormats } from 'lndr/format'
import Balance from 'lndr/balance'
import { defaultCurrency, currencySymbols, transferLimits  } from 'lndr/currencies'

import { lightGray } from 'theme/include/colors'

import style from 'theme/account'

interface Props {
  onPress?: () => void
  balance: Balance
}

export default class BalanceRow extends Component<Props> {
  renderAmount() {
    const { balance } = this.props
    const { amount } = balance

    if (amount < 0) {
      return <Text style={style.titledFactAmountDanger}>{currencyFormats(defaultCurrency)(amount)}</Text>
    }

    else {
      return <Text style={style.titledFactAmountGood}>{currencyFormats(defaultCurrency)(amount)}</Text>
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
