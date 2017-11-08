// This file is over 50 lines and needs to be split up

import User, { CreateAccountData, RecoverAccountData, LoginAccountData } from 'lndr/user'

import CreditProtocol from 'credit-protocol'

import Storage from 'lndr/storage'

const mnemonicStorage = new Storage('mnemonic')
const hashedPasswordStorage = new Storage('hashed-password')

export const PASSWORD_SALT = 'THIS_IS_A_SALT_5426892348596723645879243876'

const creditProtocol = new CreditProtocol('http://34.202.214.156')

export interface EngineState {
  user?: User,
  isInitializing?: boolean
  hasStoredUser?: boolean
  shouldRecoverAccount?: boolean
  shouldRemoveAccount?: boolean
  shouldConfirmAccount?: boolean
  mnemonicInstance?: any
  password?: string
  errorMessage?: string
}

interface EngineStateListener {
  (engineState: EngineState): void
}

export default class Engine {
  engineState: EngineState
  listeners: EngineStateListener[]
  clearErrorTimeout: number

  constructor() {
    this.listeners = []
    this.engineState = {
      hasStoredUser: false,
      shouldRecoverAccount: false,
      shouldRemoveAccount: false,
      shouldConfirmAccount: false
    }
  }

  async initialize() {
    this.state = { isInitializing: true }
    const storedMnemonic = await mnemonicStorage.get()
    if (storedMnemonic) {
      this.state = { hasStoredUser: true }
    }
    this.state = { isInitializing: false }
  }

  subscribe(listener: EngineStateListener) {
    this.listeners.push(listener)
  }

  get state(): EngineState {
    return { ...this.engineState }
  }

  set state(state) {
    this.engineState = { ...this.engineState, ...state }
    this.listeners.forEach(listener => listener(state))
  }

  clearError() {
    this.state = { errorMessage: undefined }
  }

  setErrorMessage(errorMessage) {
    this.state = { errorMessage }
    clearTimeout(this.clearErrorTimeout)
    this.clearErrorTimeout = setTimeout(() => this.clearError(), 3000)
  }

  createAccount(accountData: CreateAccountData) {
    if (accountData.password.length < 8) {
      return this.setErrorMessage('Password should be at least 8 characters.')
    }
    if (accountData.password !== accountData.confirmPassword) {
      return this.setErrorMessage('Passwords should match.')
    }

    const password = accountData.password
    const mnemonicInstance = creditProtocol.getRandomMnemonic()
    this.state = { shouldConfirmAccount: true, password, mnemonicInstance }
  }

  cancelConfirmAccount() {
    this.state = { shouldConfirmAccount: false }
  }

  async storeUserSession(user: User) {
    await mnemonicStorage.set(user.mnemonic)
    await hashedPasswordStorage.set(user.hashedPassword)
  }

  async confirmAccount() {
    const { password, mnemonicInstance } = this.state
    const hashedPassword = mnemonicInstance.toSeed(PASSWORD_SALT + password).join('.')
    const user = new User(mnemonicInstance.toString(), hashedPassword)
    await this.storeUserSession(user)
    this.state = { user, hasStoredUser: true, shouldConfirmAccount: false }
  }

  async loginAccount(loginData: LoginAccountData) {
    const { confirmPassword } = loginData

    const mnemonic = await mnemonicStorage.get()
    const mnemonicInstance = creditProtocol.getMnemonic(mnemonic)

    const hashedPasswordReference = await hashedPasswordStorage.get()
    const hashedPassword = mnemonicInstance.toSeed(PASSWORD_SALT + confirmPassword).join('.')

    if (hashedPassword !== hashedPasswordReference) {
      return this.setErrorMessage('Password is not valid, please try again.')
    }

    const user = new User(mnemonicInstance.toString(), hashedPassword)
    this.state = { user, hasStoredUser: true }
  }

  async recoverAccount(recoverData: RecoverAccountData) {
    const { confirmPassword, mnemonic } = recoverData

    if (mnemonic.split(' ').length < 12) {
      return this.setErrorMessage('Mnemonic should have at least 12 words.')
    }
    
    if (confirmPassword.length < 8) {
      return this.setErrorMessage('Password should be at least 8 characters.')
    }

    try {
      const mnemonicInstance = creditProtocol.getMnemonic(mnemonic.toLowerCase())
      this.state = { password: confirmPassword, mnemonicInstance }
      await this.confirmAccount()
    }

    catch (e) {
      const message = 'The entered mnemonic was not valid, please try again.'
      return this.setErrorMessage(message)
    }
  }

  async removeAccount() {
    await mnemonicStorage.remove()
    await hashedPasswordStorage.remove()
    this.state = { hasStoredUser: false, shouldRemoveAccount: false }
  }

  goToRecoverAccount() {
    this.state = { shouldRecoverAccount: true }
  }

  cancelRecoverAccount() {
    this.state = { shouldRecoverAccount: false }
  }

  goToRemoveAccount() {
    this.state = { shouldRemoveAccount: true }
  }

  cancelRemoveAccount() {
    this.state = { shouldRemoveAccount: false }
  }
}
