import React, { Component } from 'react'

import { Text, TouchableHighlight, View, Image } from 'react-native'

import { dollars } from 'lndr/format'
import User from 'lndr/user'
import RecentTransaction from 'lndr/recent-transaction'
import profilePic from 'lndr/profile-pic'

import { white } from 'theme/include/colors'

import { debtManagement } from 'language'

import style from 'theme/account'
import formStyle from 'theme/form'
import general from 'theme/general'

interface Props {
  onPress?: () => void
  recentTransaction: RecentTransaction,
  user: User
  friend?: boolean
}

interface State {
  pic?: string
}

export default class RecentTransactionRow extends Component<Props, State> {
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
      return recentTransaction.debtorNickname
    }

    else if (user.address === recentTransaction.debtorAddress) {
      return recentTransaction.creditorNickname
    }

    else {
      return 'Unknown Transaction'
    }
  }

  getAmount() {
    const { recentTransaction, user } = this.props

    let sign = ''

    if (user.address === recentTransaction.creditorAddress) {
      sign = '+'
    } else if (user.address === recentTransaction.debtorAddress) {
      sign = '-'
    }

    return `${sign} $${dollars(recentTransaction.amount)}`
  }

  render() {
    const { onPress, recentTransaction, friend } = this.props
    const { pic } = this.state
    const imageSource = pic ? { uri: pic } : require('images/person-outline-dark.png')

    return (
      <TouchableHighlight style={style.pendingTransaction} onPress={onPress} underlayColor={white} activeOpacity={1}>
        <View style={style.pendingTransactionRow}>
          <View style={[general.flexRow, {alignItems: 'center'}]}>
            {!friend ? <Image source={imageSource} style={style.recentIcon}/> : null }
            <View style={general.flexColumn}>
              <Text style={style.titledPending}>{friend ? recentTransaction.memo : this.getTitle()}</Text>
              <Text style={style.pendingMemo}>{recentTransaction.memo}</Text>
            </View>
          </View>
          <Text style={style.pendingAmount}>{this.getAmount()}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}
