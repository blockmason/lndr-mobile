import Friend from 'lndr/friend'
import PendingTransaction from 'lndr/pending-transaction'
import RecentTransaction from 'lndr/recent-transaction'
import PendingUnilateral from 'lndr/pending-unilateral'
import PendingBilateral from 'lndr/pending-bilateral'
import PayPalRequest from 'lndr/paypal-request'

export const jsonToPendingFriend = (data) => {
  return new Friend(data.addr, data.nick)
}

export const jsonToPendingTransaction = (data) => {
  return new PendingTransaction(data)
}

export const jsonToRecentTransaction = (data) => {
  return new RecentTransaction(data)
}

export const jsonToPendingUnilateral = (data) => {
  return new PendingUnilateral(data)
}

export const jsonToPendingBilateral = (data) => {
  return new PendingBilateral(data)
}

export const jsonToPayPalRequest = (data) => {
  return new PayPalRequest(data)
}
