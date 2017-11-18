import React, { Component } from 'react'

import { Text, TouchableHighlight, View } from 'react-native'

import Engine from 'lndr/engine'

import RecentTransaction from 'lndr/recent-transaction'

import { lightGray } from 'theme/include/colors'

import { recentTransactionsLanguage } from 'language'

import style from 'theme/account'

interface Props {
  engine: Engine
  onPress?: () => void
  recentTransaction: RecentTransaction
}

interface State {
  debtTransaction: string
}

export default class RecentTransactionRow extends Component<Props, State> {

  constructor() {
    super()
    this.state = {
      debtTransaction: ''
    }
  }

  async componentDidMount() {
    const { engine, recentTransaction: { doesUserOweFriend, friendAddress, amount } } = this.props
    const { direction } = recentTransactionsLanguage
    const displayDirection = doesUserOweFriend ? direction.borrow : direction.lend
    const friendNick = await engine.getNicknameForAddress(friendAddress)
    const content = displayDirection(friendNick, amount)

    this.setState({ debtTransaction: content})
  }

  render() {
    const { onPress, recentTransaction } = this.props

    return (
      <TouchableHighlight onPress={onPress} underlayColor={lightGray} activeOpacity={0.5} key={recentTransaction.ucac}>
        <View>
          <View style={style.listItem}>
            <Text style={style.fact}>{this.state.debtTransaction}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}
