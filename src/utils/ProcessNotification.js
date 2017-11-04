/*
 * default actions types from pushes
 */
export const NEW_FRIEND_REQUEST = 'NEW_FRIEND_REQUEST'
export const FRIEND_REQUEST_DENIED = 'FRIEND_REQUEST_DENIED'
export const FRIEND_REQUEST_CONFIRMED = 'FRIEND_REQUEST_CONFIRMED'

export const NEW_DEBT_REQUEST = 'NEW_DEBT_REQUEST'
export const DEBT_REQUEST_DENIED = 'DEBT_REQUEST_DENIED'
export const DEBT_REQUEST_CONFIRMED = 'DEBT_REQUEST_CONFIRMED'

/*
 * experimential/request
 * receive a push notification from server once debt is confirmed via cr.
 */
export const DEBT_SAVED_BLOCKCHAIN = 'DEBT_SAVED_BLOCKCHAIN'

// insert new pending record and display on pending screen
const newFriendRequest = (notification) => {
  console.log('new friend')
  console.log(notification.value)
}

// Remove record from pending table, alert(red) user of status
const friendRequestDenied = (notification) => {
  console.log('friend denied')
}

// Remove record from pending table, insert friend record/redux to table & alert(green) user of status
const friendRequestConfirmed = (notification) => {
  console.log('friend confirmed')
}

// insert new pending record and display on pending screen with deny/confirm.
const newDebtRequest = (notification) => {
  console.log('new debt')
  console.log(notification.value)
}

// Remove record from pending table, alert(red) user of status
const debtRequestDenied = (notification) => {
  console.log('debt denied')
}

// Remove record from pending table, insert debt history record/redux to table & alert(green) user of status
const debtRequestConfirmed = (notification) => {
  console.log('debt confirmed')
}

/** *********************************************************                            *
* An action will return a map linked with the correct type *
* and data for the pending table manipulation then         *
* redux'd into state.                                      *                                            *
***********************************************************/
const actions = {
  NEW_FRIEND_REQUEST: newFriendRequest,
  FRIEND_REQUEST_DENIED: friendRequestDenied,
  FRIEND_REQUEST_CONFIRMED: friendRequestConfirmed,
  NEW_DEBT_REQUEST: newDebtRequest,
  DEBT_REQUEST_DENIED: debtRequestDenied,
  DEBT_REQUEST_CONFIRMED: debtRequestConfirmed
}

export const process = (notification) => {
  const type = notification.action
  const targetAction = actions[type]

  if (targetAction) {
    targetAction(notification)
  } else {
    console.log('Unable to get action for ' + type)
  }
}
