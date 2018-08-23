import React, { Component } from 'react'

import { Text, View } from 'react-native'

import { currencyFormats } from 'lndr/format'
import { currencySymbols } from 'lndr/currencies'

import style from 'theme/account'
import general from 'theme/general'

interface Props {
  onPress?: () => void
  amount: number
  memos: string[]
  currency: string
}

export default class BalanceRow extends Component<Props> {
  renderAmount() {
    const { amount, currency } = this.props

    if (amount < 0) {
      return <Text style={[style.pendingAmount, style.redAmount]}>{currencyFormats(currency)(amount)}</Text>
    } else {
      return <Text style={[style.pendingAmount, style.greenAmount]}>{`+${currencyFormats(currency)(amount)}`}</Text>
    }
  }

  render() {
    const { currency, memos } = this.props

    return (
      <View style={style.listItem}>
        <View style={style.balanceItem}>
          <Text style={style.currencySymbol}>{currencySymbols(currency)}</Text>
          {this.renderAmount()}
        </View>
        {memos.map( (memo, ind) => <Text key={ind} style={style.balanceMemo}>{memo}</Text> )}
      </View>
    )
  }
}
