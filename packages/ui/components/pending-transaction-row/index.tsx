import React, { Component } from 'react'

import { Text, TouchableHighlight, View, Image } from 'react-native'
import ZIcon from 'react-native-vector-icons/Zocial'
import { connect } from 'react-redux'

import { currencyFormats } from 'lndr/format'
import PendingTransaction from 'lndr/pending-transaction'
import UserData from 'lndr/user'
import profilePic from 'lndr/profile-pic'
import { currencySymbols } from 'lndr/currencies'
import { getUcacCurrency } from 'reducers/app'

import { white, darkAqua } from 'theme/include/colors'
import style from 'theme/account'
import general from 'theme/general'

import language from 'language'
const { debtManagement } = language

let unmounting = false

interface Props {
  onPress?: () => void
  pendingTransaction: PendingTransaction
  user: UserData
  friend?: boolean
  getUcacCurrency: (ucac: string) => string
}

interface PassedProps extends React.Props<any> {
  user: UserData
  pendingTransaction: PendingTransaction
  friend?: boolean
  onPress?: () => void
}

interface State {
  pic?: string
}

class PendingTransactionRow extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentWillMount() {
    const { user, pendingTransaction } = this.props
    unmounting = false
    let pic

    try {
      const addr = user.address === pendingTransaction.creditorAddress ? pendingTransaction.debtorAddress : pendingTransaction.creditorAddress
      pic = await profilePic.get(addr)
    } catch (e) {}
    if (!unmounting && pic) {
      this.setState({ pic })
    }
  }

  componentWillUnmount() {
    unmounting = true
  }

  getTitle() {
    const { pendingTransaction, user } = this.props

    if (user.address === pendingTransaction.creditorAddress) {
      return `@${pendingTransaction.debtorNickname}`
    }

    else if (user.address === pendingTransaction.debtorAddress) {
      return `@${pendingTransaction.creditorNickname}`
    }

    else {
      return 'Unknown Transaction'
    }
  }

  getAmount() {
    const { pendingTransaction, user, getUcacCurrency } = this.props

    let sign = ''

    if (user.address === pendingTransaction.creditorAddress) {
      sign = '+'
    } else if (user.address === pendingTransaction.debtorAddress) {
      sign = '-'
    }

    const currentCurrency = getUcacCurrency(pendingTransaction.creditRecord.ucacAddress)

    return `${sign} ${currencySymbols(currentCurrency)}${currencyFormats(currentCurrency)(pendingTransaction.amount)}`
  }

  getColor() {
    return this.getAmount().includes('-') ? style.redAmount : style.greenAmount
  }

  isPayPalSettlement() {
    return (this.props.pendingTransaction.settlementCurrency === 'PAYPAL')
  }

  render() {
    const { onPress, pendingTransaction, friend } = this.props
    const { pic } = this.state
    const imageSource = pic ? { uri: pic } : require('images/person-outline-dark.png')
    const paymentIcon = (this.isPayPalSettlement()) ? (<ZIcon name='paypal' color={darkAqua} style={{fontSize:15}}/>) : null

    return (
      <TouchableHighlight style={style.pendingTransaction} onPress={onPress} underlayColor={white} activeOpacity={1}>
        <View style={style.pendingTransactionRow}>
          <View style={general.flexRow}>
            {!friend ? <Image source={imageSource} style={style.pendingIcon}/> : null }
            <View style={general.flexColumn}>
              {!friend ? <Text style={style.titledPending}>{this.getTitle()}</Text> : null }
              <Text style={style.pendingMemo}>{pendingTransaction.memo}</Text>
            </View>
          </View>
          <View>
            <Text style={[style.pendingAmount, this.getColor()]}>{this.getAmount()}</Text>
            {!friend ? paymentIcon : null }
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

export default connect<any, any, PassedProps>((state) => ({ getUcacCurrency: getUcacCurrency(state) }))(PendingTransactionRow)
