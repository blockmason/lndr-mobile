import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import Friend from 'lndr/friend'

import BalanceRow from 'ui/components/balance-row'

import style from 'theme/account'
import general from 'theme/general'

import { calculateUcacBalances} from 'reducers/app'

import language from 'language'
const { debtManagement } = language

interface Props {
  friend: Friend
  calculateUcacBalances: (friendAddr: string) => object
}

class BalanceSection extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { friend, calculateUcacBalances } = this.props
    const ucacBalances = calculateUcacBalances(friend.address)
    const hasNoBalance = Object.keys(ucacBalances).length === 0

    return (
      <View style={general.centeredColumn}>
        {hasNoBalance ? null : <Text style={style.balanceSectionTitle}>{debtManagement.balanceByCurrency}</Text> }
        {hasNoBalance ? null : Object.keys(ucacBalances).map( ucac => <BalanceRow key={ucac} amount={ucacBalances[ucac]} currency={ucac} /> )}
      </View>
    )
  }
}

export default connect((state) => ({ calculateUcacBalances: calculateUcacBalances(state)}))(BalanceSection)
