import React, { Component } from 'react'

import { Text, TouchableHighlight, View, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'

import { currencyFormats } from 'lndr/format'
import PendingUnilateral from 'lndr/pending-unilateral'
import PendingBilateral from 'lndr/pending-bilateral'
import UserData from 'lndr/user'
import profilePic from 'lndr/profile-pic'
import { currencySymbols, transferLimits  } from 'lndr/currencies'
import { getUcacCurrency } from 'reducers/app'

import { white } from 'theme/include/colors'
import formStyle from 'theme/form'
import style from 'theme/account'
import general from 'theme/general'

import settlerIsMe from 'reducers/app'

import language from 'language'
const { debtManagement } = language

interface Props {
  onPress?: () => void
  pendingSettlement: PendingUnilateral | PendingBilateral
  user: UserData
  friend?: boolean
  settlerIsMe: (pendingSettlement: PendingUnilateral | PendingBilateral) => boolean
  getUcacCurrency: (ucac: string) => string
}

interface State {
  pic?: string
}

class PendingSettlementRow extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentWillMount() {
    const { user, pendingSettlement } = this.props
    let pic

    try {
      const addr = user.address === pendingSettlement.creditorAddress ? pendingSettlement.debtorAddress : pendingSettlement.creditorAddress
      pic = await profilePic.get(addr)
    } catch (e) {}
    if (pic) {
      this.setState({ pic })
    }
  }
  
  getTitle() {
    const { pendingSettlement, user, settlerIsMe } = this.props

    if(settlerIsMe(pendingSettlement)) {
      if (user.address === pendingSettlement.creditorAddress) {
        return debtManagement.direction.pendingLendSettlementMe(pendingSettlement)
      } else if (user.address === pendingSettlement.debtorAddress) {
        return debtManagement.direction.pendingBorrowSettlementMe(pendingSettlement)
      } else {
        return 'Unknown Settlement'
      }
    } else {
      if (user.address === pendingSettlement.creditorAddress) {
        return debtManagement.direction.pendingLendSettlement(pendingSettlement)
      } else if (user.address === pendingSettlement.debtorAddress) {
        return debtManagement.direction.pendingBorrowSettlement(pendingSettlement)
      } else {
        return 'Unknown Settlement'
      }
    }
  }

  getAmount() {
    const { pendingSettlement, user, getUcacCurrency } = this.props
    let sign = ''

    if (user.address === pendingSettlement.creditorAddress) {
      sign = '+'
    } else if (user.address === pendingSettlement.debtorAddress) {
      sign = '-'
    }

    const currentCurrency = getUcacCurrency(pendingSettlement.creditRecord.ucacAddress)

    return `${sign} ${currencySymbols(currentCurrency)}${currencyFormats(currentCurrency)(pendingSettlement.amount)}`
  }

  getColor() {
    return this.getAmount().includes('-') ? style.redAmount : style.greenAmount
  }

  render() {
    const { onPress, pendingSettlement, friend } = this.props
    const { pic } = this.state
    const imageSource = pic ? { uri: pic } : require('images/person-outline-dark.png')

    return (
      <TouchableHighlight style={style.pendingTransaction} onPress={onPress} underlayColor={white} activeOpacity={1}>
        <View style={style.pendingTransactionRow}>
          <View style={general.flexRow}>
          {!friend ? <Image source={imageSource} style={style.pendingIcon}/> : null }
            <View style={general.flexColumn}>
              {!friend ? <Text style={style.titledPending}>{this.getTitle()}</Text> : null }
              {friend ? <Text style={style.pendingMemo}>{pendingSettlement.memo}</Text> : null }
            </View>
          </View>
          <Text style={[style.pendingAmount, this.getColor()]}>{this.getAmount()}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

export default connect((state) => ({ getUcacCurrency: getUcacCurrency(state) }))(PendingSettlementRow)
