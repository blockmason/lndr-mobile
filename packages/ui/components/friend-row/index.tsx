import React, { Component } from 'react'

import { Text, TouchableHighlight, View, Image } from 'react-native'
import Button from 'ui/components/button'

import Friend from 'lndr/friend'

import { white } from 'theme/include/colors'

import { currencyFormats } from 'lndr/format'
import profilePic from 'lndr/profile-pic'
import { currencySymbols, transferLimits  } from 'lndr/currencies'

import style from 'theme/account'
import general from 'theme/general'

import { calculateBalance, convertCurrency, getPrimaryCurrency } from 'reducers/app'
import { connect } from 'react-redux'

import language from 'language'
const { debtManagement } = language

interface Props {
  onPress?: () => void
  friend: any
  friendScreen?: boolean
  recentTransactions?: any
  navigation: any
  calculateBalance: (friend: Friend) => number
  primaryCurrency: string
}

interface State {
  pic?: string
  unmounting?: boolean
}

class FriendRow extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentWillMount() {
    const { friend } = this.props
    let pic

    try {
      pic = await profilePic.get(friend.address)
    } catch (e) {}
    if (!this.state.unmounting && pic) {
      this.setState({ pic })
    }
  }

  componentWillUnmount() {
    this.setState({unmounting: true})
  }

  getRecentTotal() {
    const { friend, calculateBalance } = this.props
    return calculateBalance(friend)
  }

  getAmountTotal() {
    const { friend, primaryCurrency } = this.props
    let total = this.getRecentTotal()
    let sign = ''

    if (total >= 0) {
      sign = '+'
    } else {
      sign = '-'
    }

    return `${sign} ${currencySymbols(primaryCurrency)}${currencyFormats(`${primaryCurrency}abs`)(total)}`
  }

  getTransactionTotal() {
    const { friend, recentTransactions } = this.props

    let hasPending = false
    let recentNumber = 0

    if(recentTransactions !== undefined) {
      recentTransactions.map( transaction => {
        recentNumber += (transaction.creditorAddress === friend.address || transaction.debtorAddress === friend.address) ? 1 : 0
      })
    }

    const records = ( hasPending ? 1 : 0 ) + recentNumber

    return `${records} ${records === 1 ? debtManagement.record : debtManagement.records}`
  }

  showEthSettlement() {
    const { friend, friendScreen } = this.props
    return this.getRecentTotal() === 0 || !friendScreen ? null : <Button narrow small round onPress={() => this.props.navigation.navigate('SettleUp', { friend: friend })} text={debtManagement.settleUp} style={{maxWidth: 130, alignSelf:'flex-end'}} />
  }

  render() {
    const { onPress, friend } = this.props
    const { pic } = this.state
    const imageSource = pic ? { uri: pic } : require('images/person-outline-dark.png')

    return (
      <TouchableHighlight style={style.friendRow} onPress={onPress} underlayColor={white} activeOpacity={1}>
        <View style={style.pendingTransactionRow}>
          <View style={[general.flexRow, general.alignCenter]}>
            <Image source={imageSource} style={style.friendIcon}/>
            <View style={general.flexColumn}>
              <Text style={style.titledPending}>{friend.nickname}</Text>
              <Text style={style.pendingMemo}>{this.getTransactionTotal()}</Text>
            </View>
          </View>
          <View style={[general.flexRow, general.alignCenter, general.justifyEnd]}>
            <View style={general.column}>
              <Text style={[style.pendingAmount, {alignSelf: 'flex-end'}]}>{this.getAmountTotal()}</Text>
              {this.showEthSettlement()}
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

export default connect((state) => ({ calculateBalance: calculateBalance(state), primaryCurrency: getPrimaryCurrency(state)(), convertCurrency: convertCurrency(state) }))(FriendRow)
