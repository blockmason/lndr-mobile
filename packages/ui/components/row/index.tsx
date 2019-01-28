import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Text, View } from 'react-native'
import Button from 'ui/components/button'

import ProfilePic from 'ui/components/images/profile-pic'
import Card from 'ui/components/card'

import { getAmount, getColor, renderText, isRecentTransaction, isInviteTransaction, isPendingTransaction, isPendingUnilateral, isPendingBilateral,
  isFriend, isCreditor, getPaymentIcon, isSettlement } from './helpers'

import User from 'lndr/user'
import Friend from 'lndr/friend'
import PayPalRequest from 'lndr/paypal-request'
import RecentTransaction from 'lndr/recent-transaction'
import InviteTransaction from 'lndr/invite-transaction'
import PendingTransaction from 'lndr/pending-transaction'
import PendingUnilateral from 'lndr/pending-unilateral'
import PendingBilateral from 'lndr/pending-bilateral'

import { getUcacCurrency, getUser } from 'reducers/app'

import general from 'theme/general'
import style from 'theme/row'

interface Props {
  onPress: () => void
  picId: string
  content: Friend | PayPalRequest | RecentTransaction | InviteTransaction | PendingTransaction | PendingUnilateral | PendingBilateral
  settlerIsMe?: (pendingSettlement: PendingUnilateral | PendingBilateral) => boolean
  selected? : boolean
  friend?: boolean
  isOutbound?: boolean
  pendingFriend?: boolean

  user: User
  getUcacCurrency: (ucac: string) => string
}

class Row extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {}
  }

  left() {
    const { content, friend, picId } = this.props
    const dontShowImage = (isPendingTransaction(content) || isSettlement(content)) && friend

    return <View style={general.flexRow}>
      {dontShowImage ? null : <ProfilePic size={60} style={style.picIcon} address={picId} />}
      <View style={style.rowLeftText}>
        {renderText(this.props)}
      </View>
    </View>
  }

  right() {
    const { user, pendingFriend, content } = this.props

    if (isFriend(content) && !pendingFriend) {
      return !this.props.selected && <Button icon="md-add-circle" round onPress={this.props.onPress} text='ADD' />

    } else if (isRecentTransaction(content) || isInviteTransaction(content) || isPendingTransaction(content) || isSettlement(content)) {
      return <View>
        <Text style={[style.pendingAmount, getColor(isCreditor({ content, user }))]}>{getAmount(this.props)}</Text>
        {getPaymentIcon(content)}
      </View>

    } else {
      return <View/>
    }
  }

  render() {
    return (
      <Card onPress={this.props.onPress} style={style.rowCard} >
        <View>
          <View style={style.row}>
            {this.left()}
            {this.right()}
          </View>
        </View>
      </Card>
    )
  }
}

export default connect((state) => ({ getUcacCurrency: getUcacCurrency(state), user: getUser(state)() }))(Row)
