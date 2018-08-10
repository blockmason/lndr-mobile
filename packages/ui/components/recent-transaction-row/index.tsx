import React, { Component } from 'react'

import { Text, TouchableHighlight, View, Image } from 'react-native'
import ZIcon from 'react-native-vector-icons/Zocial'

import { currencyFormats } from 'lndr/format'
import User, { UserData } from 'lndr/user'
import RecentTransaction from 'lndr/recent-transaction'
import profilePic from 'lndr/profile-pic'
import { currencySymbols } from 'lndr/currencies'
import { getUcacCurrency } from 'reducers/app'
import { connect } from 'react-redux'

import language from 'language'
const { debtManagement } = language

import { white, darkAqua } from 'theme/include/colors'
import style from 'theme/account'
import formStyle from 'theme/form'
import general from 'theme/general'

interface Props {
  onPress?: () => void
  recentTransaction: RecentTransaction,
  user: User
  friend?: boolean
  getUcacCurrency: (ucac: string) => string
}

interface PassedProps extends React.Props<any> {
  onPress?: () => void
  recentTransaction: RecentTransaction,
  user: User
  friend?: boolean
}

interface State {
  pic?: string
}

class RecentTransactionRow extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentWillMount() {
    const { user, recentTransaction } = this.props
    let pic

    try {
      const addr = user.address === recentTransaction.creditorAddress ? recentTransaction.debtorAddress : recentTransaction.creditorAddress
      pic = await profilePic.get(addr)
    } catch (e) {}
    if (pic) {
      this.setState({ pic })
    }
  }

  getTitle() {
    const { recentTransaction, user } = this.props

    if (user.address === recentTransaction.creditorAddress) {
      return `@${recentTransaction.debtorNickname}`
    }

    else if (user.address === recentTransaction.debtorAddress) {
      return `@${recentTransaction.creditorNickname}`
    }

    else {
      return 'Unknown Transaction'
    }
  }

  getAmount() {
    const { recentTransaction, user, getUcacCurrency } = this.props

    let sign = ''

    if (user.address === recentTransaction.creditorAddress) {
      sign = '+'
    } else if (user.address === recentTransaction.debtorAddress) {
      sign = '-'
    }

    const currentCurrency = getUcacCurrency(recentTransaction.ucac)

    return `${sign} ${currencySymbols(currentCurrency)}${currencyFormats(currentCurrency)(recentTransaction.amount)}`
  }

  getColor() {
    return this.getAmount().includes('-') ? style.redAmount : style.greenAmount
  }

  isPayPalSettlement() {
    // TODO: this is not currently possible
    return false // (this.props.recentTransaction.settlementCurrency === 'PAYPAL')
  }

  render() {
    const { onPress, recentTransaction, friend } = this.props
    const { pic } = this.state
    const imageSource = pic ? { uri: pic } : require('images/person-outline-dark.png')
    const paymentIcon = (this.isPayPalSettlement()) ? (<ZIcon name='paypal' color={darkAqua} style={{fontSize:15}}/>) : null

    return (
      <TouchableHighlight style={style.pendingTransaction} onPress={onPress} underlayColor={white} activeOpacity={1}>
        <View style={style.pendingTransactionRow}>
          <View style={[general.flexRow, {alignItems: 'center'}]}>
            {!friend ? <Image source={imageSource} style={style.recentIcon}/> : null }
            <View style={general.flexColumn}>
              <Text style={style.titledPending}>{friend ? recentTransaction.memo : this.getTitle()}</Text>
              {friend ? null : <Text style={style.pendingMemo}>{recentTransaction.memo}</Text>}
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

export default connect<any, any, PassedProps>((state) => ({ getUcacCurrency: getUcacCurrency(state) }))(RecentTransactionRow)
