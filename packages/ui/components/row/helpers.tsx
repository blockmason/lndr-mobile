import React from 'react'
import { Text, View } from 'react-native'
import ZIcon from 'react-native-vector-icons/Zocial'

import Friend from 'lndr/friend'
import PayPalRequest from 'lndr/paypal-request'
import RecentTransaction from 'lndr/recent-transaction'
import InviteTransaction from 'lndr/invite-transaction'
import PendingTransaction from 'lndr/pending-transaction'
import PendingUnilateral from 'lndr/pending-unilateral'
import PendingBilateral from 'lndr/pending-bilateral'
import { isPayPalSettlement, currencyFormats, isSettlementFree } from 'lndr/format'
import { currencySymbols } from 'lndr/currencies'

import general from 'theme/general'
import style from 'theme/row'
import { light, darkAqua } from 'theme/include/colors'

import language from 'language'
const {  payPalLanguage, debtManagement, inviteLink, pendingFriendRequestsLanguage } = language

export const getAmount = ({ content, getUcacCurrency, user }) => {
  let sign = ''
  
  if (isRecentTransaction(content) || isPendingTransaction(content) || isSettlement(content)) {
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

export const getColor = (isCreditor: boolean) => isCreditor ? style.greenAmount : style.redAmount

export const getTitle = ({ content, user }) => {
  if (content instanceof InviteTransaction) {
    return inviteLink
  } else if (user.address === content.creditorAddress) {
    return `@${content.debtorNickname}`
  } else if (user.address === content.debtorAddress) {
    return `@${content.creditorNickname}`
  } else {
    return 'Unknown Transaction'
  }
}

export const renderText = (props: any) => {
  const { content, friend, pendingFriend, isOutbound } = props
  if (isFriend(content) && !pendingFriend) {
    return <Text numberOfLines={1} style={[style.titledPending, {maxWidth:160}]}>{`@${content.nickname}`}</Text>

  } else if (isFriend(content)) {
    const message = isOutbound ? pendingFriendRequestsLanguage.outbound : pendingFriendRequestsLanguage.request
    return <Text style={style.friendRequest}>{message(content.nickname)}</Text>

  } else if (isPayPalRequest(content)) {
    return <Text style={style.friendRequest}>{content.requestorIsMe ? payPalLanguage.requestFriendConnect(content.friend.nickname) : payPalLanguage.friendRequestedConnect(content.friend.nickname)}</Text>

  } else if (isRecentTransaction(content) || isPendingTransaction(content)) {
    return <View>
      <Text style={style.titledPending}>{friend ? content.memo : getTitle(props)}</Text>
      {!friend ? <Text style={style.pendingMemo}>{content.memo}</Text> : null}
    </View>

  } else if (isSettlement(content)) {
    return <View style={general.flexColumn}>
      {!friend ? <Text style={style.titledPending}>{getTitle(props)}</Text> : null }
      <Text style={style.pendingMemo}>{debtManagement.direction.settlement(content)}</Text>
    </View>

  } else if (isInviteTransaction(content)) {
    return <View>
      <Text style={style.titledPending}>{getTitle(props)}</Text>
      <Text style={style.pendingMemo}>{content.memo}</Text>
    </View>

  } else {
    return <View/>
  }
}

export const isRecentTransaction = (instance) => instance instanceof RecentTransaction
export const isInviteTransaction = (instance) => instance instanceof InviteTransaction
export const isPendingTransaction = (instance) => instance instanceof PendingTransaction
export const isPendingUnilateral = (instance) => instance instanceof PendingUnilateral
export const isPendingBilateral = (instance) => instance instanceof PendingBilateral
export const isSettlement = (instance) => isPendingBilateral(instance) || isPendingUnilateral(instance)
export const isPayPalRequest = (instance) => instance instanceof PayPalRequest
export const isFriend = (instance) => instance instanceof Friend
export const isCreditor = ({ content, user }) => ((content instanceof RecentTransaction || content instanceof PendingTransaction) && content.creditorAddress === user.address)
|| (content instanceof InviteTransaction && content.direction === 'lend')

export const getPaymentIcon = (content) => content instanceof PendingTransaction && isPayPalSettlement(content.settlementCurrency) && <ZIcon name='paypal' color={darkAqua} style={{fontSize:15}}/>
