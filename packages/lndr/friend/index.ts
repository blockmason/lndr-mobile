export default class Friend {
  address: string
  nickname: string

  constructor(address: string, nickname: string) {
    if (address.substr(0, 2) === '0x') {
      address = address.substr(2)
    }

    this.address = address
    this.nickname = nickname
  }
}
