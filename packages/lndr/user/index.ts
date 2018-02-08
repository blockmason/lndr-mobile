export interface CreateAccountData {
  nickname: string
  password: string
  confirmPassword: string
}

export interface RecoverAccountData {
  mnemonic: string
  password: string
  confirmPassword: string
}

export interface LoginAccountData {
  confirmPassword: string
}

export interface UpdateAccountData {
  nickname: string
  password: string
  confirmPassword: string
}

export interface UserData {
  mnemonic: string
  hashedPassword: string
  privateKey: any
  privateKeyBuffer: any
  ethAddress: any
  address: string
  lockTimeout: number
  nickname: string
}

export const defaultCreateAccountData = (): CreateAccountData => ({
  nickname: '',
  password: '',
  confirmPassword: ''
})

export const defaultRecoverAccountData = (): RecoverAccountData => ({
  mnemonic: '',
  password: '',
  confirmPassword: ''
})

export const defaultLoginAccountData = (): LoginAccountData => ({
  confirmPassword: ''
})

export const defaultUpdateAccountData = (): UpdateAccountData => ({
  nickname: '',
  password: '',
  confirmPassword: ''
})

export default class User {
  mnemonic: string
  hashedPassword: string
  privateKey: any
  privateKeyBuffer: any
  ethAddress: any
  address: string
  lockTimeout: number
  nickname: string

  constructor(mnemonic: string, hashedPassword: string, privateKey: any, privateKeyBuffer: any, ethAddress: any, address: string, nickname: string) {
    this.mnemonic = mnemonic
    this.hashedPassword = hashedPassword
    this.privateKey = privateKey
    this.privateKeyBuffer = privateKeyBuffer
    this.ethAddress = ethAddress
    this.address = address
    this.lockTimeout = 15
    this.nickname = nickname
  }
}

export const minimumNicknameLength = 3

export const minimumPinLength = 4
