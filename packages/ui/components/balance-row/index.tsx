import React, { Component } from 'react'

import { Text, TouchableHighlight, View } from 'react-native'

import { currencyFormats } from 'lndr/format'
import { currencySymbols, transferLimits  } from 'lndr/currencies'

import { lightGray } from 'theme/include/colors'

import style from 'theme/account'
import { getPrimaryCurrency } from 'reducers/app';

interface Props {
  onPress?: () => void
  amount: number
  currency: string
}

export default class BalanceRow extends Component<Props> {
  renderAmount() {
    const { amount, currency } = this.props

    if (amount < 0) {
      return <Text style={[style.pendingAmount, style.redAmount]}>{`-${currencyFormats(currency)(amount)}`}</Text>
    } else {
      return <Text style={[style.pendingAmount, style.greenAmount]}>{`+${currencyFormats(currency)(amount)}`}</Text>
    }
  }

  render() {
    const { onPress, amount, currency } = this.props

    return (
      <View style={style.pendingTransactionRow}>
        <View style={style.listItem}>
          <Text style={style.currencySymbol}>{currencySymbols(currency)}</Text>
          {this.renderAmount()}
        </View>
      </View>
    )
  }
}
