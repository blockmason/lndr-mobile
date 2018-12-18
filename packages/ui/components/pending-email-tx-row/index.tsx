import React, { Component } from 'react'

import { Text, TouchableHighlight, View, Image } from 'react-native'
import { connect } from 'react-redux'

import { currencyFormats } from 'lndr/format'
import UserData from 'lndr/user'
import InviteTransaction from 'lndr/invite-transaction'
import { currencySymbols } from 'lndr/currencies'
import { getUcacCurrency } from 'reducers/app'

import { white, darkAqua } from 'theme/include/colors'
import style from 'theme/account'
import general from 'theme/general'

import language from 'language'
const { inviteLink } = language

interface Props {
  onPress?: () => void
  inviteTx: InviteTransaction
  user: UserData
  getUcacCurrency: (ucac: string) => string
  
}

interface PassedProps extends React.Props<any> {
  user: UserData
  inviteTx: InviteTransaction
  onPress?: () => void
}

class InviteTransactionRow extends Component<Props> {
  constructor(props) {
    super(props)
  }

  getTitle() {
    return inviteLink
  }

  getAmount() {
    const { inviteTx, getUcacCurrency } = this.props
    let sign = ''

    if (inviteTx.direction === 'lend') {
      sign = '+'
    } else {
      sign = '-'
    }

    const currentCurrency = getUcacCurrency(inviteTx.ucac)
    return `${sign} ${currencySymbols(currentCurrency)}${currencyFormats(currentCurrency)(inviteTx.amount)}`
  }

  getColor() {
    return this.getAmount().includes('-') ? style.redAmount : style.greenAmount
  }

  render() {
    const { onPress, inviteTx } = this.props
    const imageSource = require('images/person-outline-dark.png')

    return (
      <TouchableHighlight style={style.pendingTransaction} onPress={onPress} underlayColor={white} activeOpacity={1}>
        <View style={style.pendingTransactionRow}>
          <View style={general.flexRow}>
            <Image source={imageSource} style={style.pendingIcon}/>
            <View style={general.flexColumn}>
              <Text style={style.titledPending}>{this.getTitle()}</Text>
              <Text style={style.pendingMemo}>{inviteTx.memo}</Text>
            </View>
          </View>
          <View>
            <Text style={[style.pendingAmount, this.getColor()]}>{this.getAmount()}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

export default connect<any, any, PassedProps>((state) => ({ getUcacCurrency: getUcacCurrency(state) }))(InviteTransactionRow)
