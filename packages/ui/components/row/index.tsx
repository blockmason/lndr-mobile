import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Text, TouchableHighlight, View } from 'react-native'
import Button from 'ui/components/button'
import ZIcon from 'react-native-vector-icons/Zocial'
import ProfilePic from 'ui/components/images/profile-pic'

import User from 'lndr/user'
import Friend from 'lndr/friend'
import PayPalRequest from 'lndr/paypal-request'
import RecentTransaction from 'lndr/recent-transaction'
import InviteTransaction from 'lndr/invite-transaction'
import PendingTransaction from 'lndr/pending-transaction'
import PendingUnilateral from 'lndr/pending-unilateral'
import PendingBilateral from 'lndr/pending-bilateral'

import { currencyFormats, isPayPalSettlement } from 'lndr/format'
import { currencySymbols } from 'lndr/currencies'

import { getUcacCurrency, getUser } from 'reducers/app'

import { white, light, darkAqua } from 'theme/include/colors'
import general from 'theme/general'
import style from 'theme/row'

import language from 'language'
const { addFriendButton, payPalLanguage, debtManagement, inviteLink, pendingFriendRequestsLanguage } = language

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

interface PassedProps extends React.Props<any> {
  onPress: () => void
  picId: string
  content: Friend | PayPalRequest | RecentTransaction | InviteTransaction | PendingTransaction | PendingUnilateral | PendingBilateral
  settlerIsMe?: (pendingSettlement: PendingUnilateral | PendingBilateral) => boolean
  selected? : boolean
  friend?: boolean
  isOutbound?: boolean
  pendingFriend?: boolean
}

class Row extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {}
  }

  addFriendButton() {
    return <Button icon="md-add-circle" round onPress={this.props.onPress} text='ADD' />
  }

  getTitle(content: RecentTransaction | InviteTransaction | PendingUnilateral | PendingBilateral) {
    const { user, settlerIsMe } = this.props
    if (content instanceof InviteTransaction) {
      return inviteLink
    } else if (user.address === content.creditorAddress) {
      return `@${content.debtorNickname}`
    } else if (user.address === content.debtorAddress) {
      return `@${content.creditorNickname}`
    } else if (settlerIsMe && (content instanceof PendingBilateral || content instanceof PendingUnilateral)) {
      if(settlerIsMe(content)) {
        if (user.address === content.creditorAddress) {
          return debtManagement.direction.pendingLendSettlementMe(content)
        } else if (user.address === content.debtorAddress) {
          return debtManagement.direction.pendingBorrowSettlementMe(content)
        } else {
          return 'Unknown Settlement'
        }
      } else {
        if (user.address === content.creditorAddress) {
          return debtManagement.direction.pendingLendSettlement(content)
        } else if (user.address === content.debtorAddress) {
          return debtManagement.direction.pendingBorrowSettlement(content)
        } else {
          return 'Unknown Settlement'
        }
      }
    } else {
      return 'Unknown Transaction'
    }
  }

  getAmount(content: RecentTransaction | InviteTransaction | PendingUnilateral | PendingBilateral) {
    const { getUcacCurrency, user } = this.props
    let sign = ''
    
    if (content instanceof RecentTransaction || content instanceof PendingBilateral || content instanceof PendingUnilateral) {
      if (user.address === content.creditorAddress) {
        sign = '+'
      } else if (user.address === content.debtorAddress) {
        sign = '-'
      }
    } else {
      if (content.direction === 'lend') {
        sign = '+'
      } else {
        sign = '-'
      }
    }

    const currentCurrency = getUcacCurrency ? getUcacCurrency(content.ucac) : 'USD'

    return `${sign} ${currencySymbols(currentCurrency)}${currencyFormats(currentCurrency)(content.amount)}`
  }

  getColor(isCreditor: boolean) {
    return isCreditor ? style.redAmount : style.greenAmount
  }

  left() {
    const { props: { content, friend, pendingFriend, isOutbound, picId } } = this

    const renderText = (content: Friend | PayPalRequest | RecentTransaction | InviteTransaction | PendingBilateral | PendingUnilateral) => {
      if (content instanceof Friend && !pendingFriend) {
        return <Text numberOfLines={1} style={[style.titledPending, {maxWidth:160}]}>{`@${content.nickname}`}</Text>
      } else if (content instanceof Friend) {
        const message = isOutbound ? pendingFriendRequestsLanguage.outbound : pendingFriendRequestsLanguage.request
        return <Text style={style.friendRequest}>{message(content.nickname)}</Text>
      } else if (content instanceof PayPalRequest) {
        return <Text style={style.friendRequest}>{content.requestorIsMe ? payPalLanguage.requestFriendConnect(content.friend.nickname) : payPalLanguage.friendRequestedConnect(content.friend.nickname)}</Text>
      } else if (content instanceof RecentTransaction || content instanceof PendingTransaction) {
        return <View>
          <Text style={style.titledPending}>{!!friend ? content.memo : this.getTitle(content)}</Text>
          {!!friend ? null : <Text style={style.pendingMemo}>{content.memo}</Text>}
        </View>
      } else if (content instanceof PendingUnilateral || content instanceof PendingBilateral) {
        return <View style={general.flexColumn}>
          {!friend ? <Text style={style.titledPending}>{this.getTitle(content)}</Text> : null }
          {!!friend ? <Text style={style.pendingMemo}>{content.memo}</Text> : null }
        </View>
      } else if (content instanceof InviteTransaction) {
        return <View>
          <Text style={style.titledPending}>{this.getTitle(content)}</Text>
          <Text style={style.pendingMemo}>{content.memo}</Text>
        </View>
      } else {
        return <View/>
      }
    }

    const dontShowImage = (content instanceof PendingTransaction || content instanceof PendingUnilateral || content instanceof PendingBilateral) && friend

    return <View style={[general.flexRow, general.alignCenter]}>
      {dontShowImage ? null : <ProfilePic size={60} style={style.picIcon} address={picId} />}
      <View style={general.flexColumn}>
        {renderText(content)}
      </View>
    </View>
  }

  right(content: Friend | PayPalRequest | RecentTransaction | InviteTransaction | PendingTransaction | PendingBilateral | PendingUnilateral) {
    const { user, friend, pendingFriend } = this.props

    if (content instanceof Friend && !pendingFriend) {
      return !this.props.selected && this.addFriendButton()
    } else if (content instanceof PayPalRequest) {
      return null
    } else if (content instanceof RecentTransaction || content instanceof InviteTransaction || content instanceof PendingTransaction) {
      const isCreditor = (content instanceof RecentTransaction || content instanceof PendingTransaction && content.creditorAddress === user.address)
        || (content instanceof InviteTransaction && content.direction === 'lend')
      
      const paymentIcon = content instanceof PendingTransaction && isPayPalSettlement(content.settlementCurrency) ? (<ZIcon name='paypal' color={darkAqua} style={{fontSize:15}}/>) : null

      return <View>
        <Text style={[style.pendingAmount, this.getColor(isCreditor)]}>{this.getAmount(content)}</Text>
        {!friend && content instanceof PendingTransaction ? paymentIcon : null }
      </View>
    } else {
      return <View/>
    }
  }

  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress} underlayColor={light}>
        <View style={style.rowPadding} >
          <View style={general.betweenRow}>
            {this.left()}
            {this.right(this.props.content)}
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

export default connect<any, any, PassedProps>((state) => ({ getUcacCurrency: getUcacCurrency(state), user: getUser(state)() }))(Row)



