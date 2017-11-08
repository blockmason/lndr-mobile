export interface CreateAccountData {
  password: string
  confirmPassword: string
}

export interface RecoverAccountData {
  mnemonic: string
  confirmPassword: string
}

export interface LoginAccountData {
  confirmPassword: string
}

export const defaultCreateAccountData = (): CreateAccountData => ({
  password: '',
  confirmPassword: ''
})

export const defaultRecoverAccountData = (): RecoverAccountData => ({
  mnemonic: '',
  confirmPassword: ''
})

export const defaultLoginAccountData = (): LoginAccountData => ({
  confirmPassword: ''
})

export default class User {
  hashedPassword: string
  mnemonic: string

  constructor(mnemonic: string, hashedPassword: string) {
    this.mnemonic = mnemonic
    this.hashedPassword = hashedPassword
  }
}
