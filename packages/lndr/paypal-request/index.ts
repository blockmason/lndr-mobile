import Friend from 'lndr/friend'

export default class PayPalRequest {
  requestorIsMe: boolean
  friend: Friend

  constructor(data) {
    this.requestorIsMe = data.requestorIsMe
    this.friend = new Friend(data.friend.addr, data.friend.nick)
  }
}
