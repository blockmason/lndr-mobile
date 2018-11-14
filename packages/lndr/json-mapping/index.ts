import Friend from 'lndr/friend'
import PendingTransaction from 'lndr/pending-transaction'
import RecentTransaction from 'lndr/recent-transaction'
import PendingUnilateral from 'lndr/pending-unilateral'
import PendingBilateral from 'lndr/pending-bilateral'
import PayPalRequest from 'lndr/paypal-request'

export const jsonToPendingFriend = data => new Friend(data.addr, data.nick)

export const jsonToPendingTransaction = data => new PendingTransaction(data)

export const jsonToRecentTransaction = data => new RecentTransaction(data)

export const jsonToPendingUnilateral = data => new PendingUnilateral(data)

export const jsonToPendingBilateral = data => new PendingBilateral(data)

export const jsonToPayPalRequest = data => new PayPalRequest(data)
