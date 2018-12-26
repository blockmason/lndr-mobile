import User from 'lndr/user'
import PendingTransaction from 'lndr/pending-transaction'
import PendingUnilateral from 'lndr/pending-unilateral'
import InviteTransaction from 'lndr/invite-transaction'
import Friend from 'lndr/friend'

import { formatSettlementCurrencyAmount, isEthSettlement } from 'lndr/format'
import { WEI_PER_ETH, ERC20_Token, getERC20_token } from 'lndr/erc-20'

import language from 'language'
const {
  cancel, pendingSettlementsLanguage, debtManagement, accountManagement, pendingTransactionsLanguage,
  back, contentsLanguage, payPalLanguage, inviteLink, unknownTransaction, yourFriend
} = language

import accountStyle from 'theme/account'

export const getTitle = (content: PendingUnilateral, user: User, settlerIsMe: (settlement: PendingUnilateral) => boolean) : string => {
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
}

export const getFriendNickname = (content: PendingTransaction | PendingUnilateral | Friend | InviteTransaction, user: User) => {
  if (content instanceof InviteTransaction) {
    if (content.address !== user.address) {
      return content.submitterNickname
    } else {
      return yourFriend
    }
  } else if (content instanceof Friend) {
    return content.nickname
  }

  if (!!content && user.address === content.creditorAddress) {
    return content.debtorNickname
  } else if (!!content) {
    return content.creditorNickname
  } else {
    return yourFriend
  }
}

export const getColor = (content: PendingTransaction | PendingUnilateral | Friend | InviteTransaction | undefined, user: User) => {
  if (!content) {
    return accountStyle.greenAmount
  } else if (content instanceof InviteTransaction) {
    return content.address === user.address && content.direction === 'lend' || content.address !== user.address && content.direction === 'borrow' ? accountStyle.greenAmount : accountStyle.redAmount
  } else if (content instanceof PendingTransaction || content instanceof PendingUnilateral) {
    return content && user.address === content.creditorAddress ? accountStyle.greenAmount : accountStyle.redAmount
  } else {
    return {}
  }
}

export const getSettlementAmount = (content: PendingUnilateral, token: any) => {
  if (content instanceof PendingUnilateral) {
    const divisor = !!token ? Math.pow(10, token.decimals) : WEI_PER_ETH
    return formatSettlementCurrencyAmount(`${content.settlementAmount / divisor}`, isEthSettlement(content.settlementCurrency))
  } else {
    return ''
  }
}
