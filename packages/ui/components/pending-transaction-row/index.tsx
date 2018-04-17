import React, { Component } from 'react'

import { Text, TouchableHighlight, View, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'

import { currencyFormats } from 'lndr/format'
import PendingTransaction from 'lndr/pending-transaction'
import UserData from 'lndr/user'
import profilePic from 'lndr/profile-pic'
import { currencySymbols, transferLimits  } from 'lndr/currencies'
import { getUcacCurrency } from 'reducers/app'

import { white } from 'theme/include/colors'
import formStyle from 'theme/form'
import style from 'theme/account'
import general from 'theme/general'

import language from 'language'
const { debtManagement } = language

interface Props {
  onPress?: () => void
  pendingTransaction: PendingTransaction
  user: UserData
  friend?: boolean
  getUcacCurrency: (ucac: string) => string
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
    let pic

    try {
      const addr = user.address === pendingTransaction.creditorAddress ? pendingTransaction.debtorAddress : pendingTransaction.creditorAddress
      pic = await profilePic.get(addr)
    } catch (e) {}
    if (pic) {
      this.setState({ pic })
    }
  }

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
    const { pendingTransaction, user, getUcacCurrency } = this.props

    let sign = ''

    if (user.address === pendingTransaction.creditorAddress) {
      sign = '+'
    } else if (user.address === pendingTransaction.debtorAddress) {
      sign = '-'
    }

    const currentCurrency = getUcacCurrency(pendingTransaction.creditRecord.ucacAddress)

    return `${sign} ${currencySymbols[currentCurrency]}${currencyFormats[currentCurrency](pendingTransaction.amount)}`
  }

  render() {
    const { onPress, pendingTransaction, friend } = this.props
    const { pic } = this.state
    const imageSource = pic ? { uri: pic } : require('images/person-outline-dark.png')

    return (
      <TouchableHighlight style={style.pendingTransaction} onPress={onPress} underlayColor={white} activeOpacity={1}>
        <View style={style.pendingTransactionRow}>
          <View style={general.flexRow}>
          {!friend ? <Image source={imageSource} style={style.pendingIcon}/> : null }
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

export default connect((state) => ({ getUcacCurrency: getUcacCurrency(state) }))(PendingTransactionRow)
