// This file is over 50 lines and needs to be split up

import ethUtil from 'ethereumjs-util'
import { UrbanAirship } from 'urbanairship-react-native'

import { longTimePeriod } from 'lndr/time'
import Balance from 'lndr/balance'
import User, { CreateAccountData, RecoverAccountData, LoginAccountData, UpdateAccountData } from 'lndr/user'
import { minimumNicknameLength, minimumPasswordLength } from 'lndr/user'
import Friend from 'lndr/friend'
import PendingTransaction from 'lndr/pending-transaction'
import RecentTransaction from 'lndr/recent-transaction'
import ucac from 'lndr/ucac'

import CreditProtocol from 'credit-protocol'

import Storage from 'lndr/storage'

import { accountManagement, debtManagement } from 'language'

const bcrypt = require('bcryptjs')

const mnemonicStorage = new Storage('mnemonic')
const hashedPasswordStorage = new Storage('hashed-password')

const creditProtocol = new CreditProtocol('http://34.238.20.130')

export interface EngineState {
  user?: User,
  isInitializing?: boolean
  isAuthLoading?: boolean
  hasStoredUser?: boolean
  shouldRecoverAccount?: boolean
  shouldRemoveAccount?: boolean
  shouldDisplayMnemonic?: boolean
  welcomeComplete?: boolean
  mnemonicInstance?: any // TODO why is this any?
  password?: string
  errorMessage?: string
  successMessage?: string
  pendingTransactionsCount?: number
}

interface EngineStateListener {
  (engineState: EngineState): void
}

export default class Engine {
  engineState: EngineState
  listeners: EngineStateListener[]
  clearErrorTimeout: number
  clearSuccessTimeout: number
  privateKeyBuffer: any

  constructor() {
    this.listeners = []
    this.engineState = {
      hasStoredUser: false,
      welcomeComplete: false,
      isAuthLoading: false,
      shouldRecoverAccount: false,
      shouldRemoveAccount: false,
      shouldDisplayMnemonic: false
    }
  }

  async initialize() {
    this.state = { isInitializing: true }
    const storedMnemonic = await mnemonicStorage.get()
    if (storedMnemonic) {
      this.state = { hasStoredUser: true, welcomeComplete: true }
    }
    this.state = { isInitializing: false }
  }

  initalizePushNotifications() {
    UrbanAirship.setUserNotificationsEnabled(true)
    UrbanAirship.addListener("register", (event) => {
      console.log('Channel registration updated: ', event.channelId);
      console.log('Registration token: ', event.registrationToken);
    });
    UrbanAirship.addListener("pushReceived", (notification) => {
        console.log('Received push: ', JSON.stringify(notification));
    });
    UrbanAirship.setForegroundPresentationOptions({
      alert: true,
      sound: true,
      badge: true
    });
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
    this.clearErrorTimeout = setTimeout(() => this.clearError(), longTimePeriod)
  }

  clearSuccess() {
    this.state = { successMessage: undefined }
  }

  setSuccessMessage(successMessage) {
    this.state = { successMessage }
    clearTimeout(this.clearSuccessTimeout)
    this.clearSuccessTimeout = setTimeout(() => this.clearSuccess(), longTimePeriod)
  }

  mnemonicDisplayed() {
    this.state = { shouldDisplayMnemonic: false }
  }

  async createAccount(accountData: CreateAccountData) {
    if (accountData.password.length < minimumPasswordLength) {
      return this.setErrorMessage(accountManagement.password.lengthViolation)
    }
    if (accountData.password !== accountData.confirmPassword) {
      return this.setErrorMessage(accountManagement.password.matchViolation)
    }
    if (accountData.nickname.length < minimumNicknameLength) {
      return this.setErrorMessage(accountManagement.nickname.lengthViolation)
    }
    if(accountData.nickname.match(/^[a-z0-9]*$/) === null) {
      return this.setErrorMessage(accountManagement.nickname.compositionViolation)
    }

    const password = accountData.password
    const mnemonicInstance = creditProtocol.getRandomMnemonic()
    this.state = { shouldDisplayMnemonic: true, password: password, mnemonicInstance: mnemonicInstance }
    await this.confirmAccount()
    this.updateAccount({nickname: accountData.nickname})
  }

  get user(): User {
    return this.engineState.user as User
  }

  async getTwoPartyBalance(friend: Friend) {
    const { address } = this.user
    const amount = await creditProtocol.getBalanceBetween(address, friend.address)
    return new Balance({ relativeToNickname: friend.nickname, relativeTo: friend.address, amount: amount })
  }

  async getBalances() {
    const { address } = this.user
    const rawCounterparties = await creditProtocol.getCounterparties(address)
    const uniqueCounterparties = {}
    const balances: Balance[] = []

    await Promise.all(
      rawCounterparties.map(async (rawCounterparty) => {
        const counterpartyAddress = rawCounterparty.replace('0x', '')
        if (!(counterpartyAddress in uniqueCounterparties)) {
          uniqueCounterparties[counterpartyAddress] = true
          try {
            const amount = await creditProtocol.getBalanceBetween(address, counterpartyAddress)
            const relativeToNickname = await this.getNicknameForAddress(counterpartyAddress)
            balances.push(new Balance({ relativeToNickname, relativeTo: counterpartyAddress, amount }))
          }
          catch (e) {
            this.setErrorMessage(debtManagement.balances.error)
          }
        }
      })
    )

    return balances
  }

  async getAccountInformation() {
    const { address } = this.user
    const accountInformation: { nickname?: string, balance?: number } = {}

    try {
      accountInformation.nickname = await creditProtocol.getNickname(address)
    }

    catch (e) {}

    try {
      accountInformation.balance = await creditProtocol.getBalance(address)
    }

    catch (e) {}

    return accountInformation
  }

  async getNicknameForAddress(address) {
    try {
      return await creditProtocol.getNickname(address)
    }

    catch (e) {
      return address.substr(0, 8)
    }
  }

  async updateAccount(accountData: UpdateAccountData) {
    const { address, privateKeyBuffer } = this.user
    const { nickname } = accountData

    try {
      await creditProtocol.setNickname(address, nickname, privateKeyBuffer)
      this.setSuccessMessage(accountManagement.setNickname.success)
    } catch (error) {
      this.setErrorMessage(accountManagement.setNickname.error)
      throw error
    }
  }

  async addFriend(friend: Friend) {
  const { address/*, privateKeyBuffer*/ } = this.user
    try {
      await creditProtocol.addFriend(address, friend.address/*, privateKeyBuffer*/)
      this.setSuccessMessage(accountManagement.addFriend.success(friend.nickname))
    } catch (error) {
      this.setErrorMessage(accountManagement.addFriend.error)
      throw error
    }
  }

  async removeFriend(friend: Friend) {
  const { address/*, privateKeyBuffer*/ } = this.user
    try {
      await creditProtocol.removeFriend(address, friend.address/*, privateKeyBuffer*/)
      this.setSuccessMessage(accountManagement.removeFriend.success(friend.nickname))
    } catch (error) {
      this.setErrorMessage(accountManagement.removeFriend.error)
      throw error
    }
  }

  jsonToFriend(data) {
    let addr, nick
    if (typeof data === 'string') {
      addr = data
      nick = addr.substr(2, 8)
    }
    else {
      addr = data.addr
      nick = data.nick || addr.substr(2, 8)
    }
    return new Friend(addr, nick)
  }

  async ensureNicknames(friends: Friend[]) {
    const needNicknamesFor = friends.filter(
      friend => !friend.nickname || friend.nickname === 'N/A'
    )

    await Promise.all(
      needNicknamesFor.map(
        async (friend) => {
          const nickname = await creditProtocol.getNickname(friend.address)
          friend.nickname = nickname
        }
      )
    )
  }

  async ensureTransactionNicknames(transactions: Array<PendingTransaction|RecentTransaction>) {
    const needNicknamesFor = transactions.filter(
      transaction => !transaction.creditorNickname || !transaction.debtorNickname
    )

    await Promise.all(
      needNicknamesFor.map(
        async (transaction) => {
          transaction.creditorNickname = await this.getNicknameForAddress(transaction.creditorAddress)
          transaction.debtorNickname = await this.getNicknameForAddress(transaction.debtorAddress)
        }
      )
    )
  }

  async getFriends() {
    const { address } = this.user
    const friends = await creditProtocol.getFriends(address)
    const result = friends.map(this.jsonToFriend)
    await this.ensureNicknames(result)
    return result
  }

  async searchUsers(searchData) {
    const { nickname } = searchData
    if (nickname.length >= minimumNicknameLength) {
      const users = await creditProtocol.searchUsers(nickname)
      return users.map(this.jsonToFriend)
    } else {
      return []
    }
  }

  submitterIsMe(pendingTransaction: PendingTransaction) {
    const { address } = this.user
    return pendingTransaction.submitter === address
  }

  jsonToPendingTransaction(data) {
    return new PendingTransaction(data)
  }

  jsonToRecentTransaction(data) {
    return new RecentTransaction(data)
  }

  async getRecentTransactions() {
    const { address } = this.user
    const rawRecentTransactions = await creditProtocol.getTransactions(address)
    const recentTransactions = rawRecentTransactions.map(this.jsonToRecentTransaction)
    await this.ensureTransactionNicknames(recentTransactions)
    return recentTransactions
  }

  async getPendingTransactions() {
    const { address } = this.user
    const rawPendingTransactions = await creditProtocol.getPendingTransactions(address)
    const pendingTransactions = rawPendingTransactions.map(this.jsonToPendingTransaction)
    await this.ensureTransactionNicknames(pendingTransactions)
    this.state = { pendingTransactionsCount: pendingTransactions.length }
    return pendingTransactions
  }

  async confirmPendingTransaction(pendingTransaction: PendingTransaction) {
    const { creditorAddress, debtorAddress, amount, memo } = pendingTransaction
    const { address, privateKeyBuffer } = this.user
    const direction = address === creditorAddress ? 'lend' : 'borrow'

    try {
      const creditRecord = await creditProtocol.createCreditRecord(
        ucac,
        creditorAddress,
        debtorAddress,
        amount,
        memo
      )

      const signature = creditRecord.sign(privateKeyBuffer)
      await creditProtocol.submitCreditRecord(creditRecord, direction, signature)

      this.setSuccessMessage(debtManagement.confirmation.success)
      return true
    }

    catch (e) {
      this.setErrorMessage(debtManagement.confirmation.error)
      return false
    }
  }

  async rejectPendingTransaction(pendingTransaction: PendingTransaction) {
    const { address, privateKeyBuffer } = this.user
    const { hash } = pendingTransaction
    try {
      await creditProtocol.rejectPendingTransactionByHash(hash, privateKeyBuffer)

      this.setSuccessMessage(debtManagement.rejection.success)
      return true
    }
    catch (e) {
      this.setErrorMessage(debtManagement.rejection.error)
      return false
    }
  }

  async addDebt(friend: Friend, amount: string, memo: string, direction: string) {
    const { address, privateKeyBuffer } = this.user

    if (!friend) {
      return this.setErrorMessage('Friend must be selected')
    }

    if (!amount) {
      return this.setErrorMessage('Amount must be entered')
    }

    const sanitizedAmount = parseInt(
      amount
        .replace(/[^.\d]/g, '')
        .replace(/^\d+\.?$/, x => `${x}00`)
        .replace(/\.\d$/, x => `${x.substr(1)}0`)
        .replace(/\.\d\d$/, x => `${x.substr(1)}`)
        .replace(/\./, () => '')
    )

    if (sanitizedAmount <= 0) {
      return this.setErrorMessage('Amount must be greater than $0')
    }

    if (sanitizedAmount >= 1e11) {
      return this.setErrorMessage('Amount must be less than $1,000,000,000')
    }

    if (!memo) {
      return this.setErrorMessage('Memo must be entered')
    }

    if (!direction) {
      return this.setErrorMessage('Please choose the correct statement to determine the creditor and debtor')
    }

    if (address === friend.address) {
      return this.setErrorMessage('You can\'t create debt with yourself, choose another friend')
    }

    const [ creditorAddress, debtorAddress ] = {
      lend: [ address, friend.address ],
      borrow: [ friend.address, address ]
    }[direction]

    try {
      const creditRecord = await creditProtocol.createCreditRecord(
        ucac,
        creditorAddress,
        debtorAddress,
        sanitizedAmount,
        memo
      )

      const signature = creditRecord.sign(privateKeyBuffer)
      await creditProtocol.submitCreditRecord(creditRecord, direction, signature)

      this.setSuccessMessage(debtManagement.pending.success(friend))
      return true
    }

    catch (e) {
      this.setErrorMessage(debtManagement.pending.error)
    }
  }

  createUserFromCredentials(mnemonicInstance, hashedPassword) {

    const mnemonic = mnemonicInstance.toString()
    const privateKey = mnemonicInstance.toHDPrivateKey()
    const privateKeyBuffer = privateKey.privateKey.toBuffer()
    const ethAddress = ethUtil.privateToAddress(privateKeyBuffer)
    const address = ethAddress.toString('hex')

    return new User(
      mnemonic,
      hashedPassword,
      privateKey,
      privateKeyBuffer,
      ethAddress,
      address
    )
  }

  async storeUserSession(user: User) {
    await mnemonicStorage.set(user.mnemonic)
    await hashedPasswordStorage.set(user.hashedPassword)
  }

  async confirmAccount() {
    const { password, mnemonicInstance } = this.state
    const hashedPassword = bcrypt.hashSync(password)
    const user = this.createUserFromCredentials(mnemonicInstance, hashedPassword)
    await this.storeUserSession(user)
    this.state = { user, hasStoredUser: true }
  }

  async loginAccount(loginData: LoginAccountData) {
    const { confirmPassword } = loginData
    const hashedPassword = await hashedPasswordStorage.get()
    const passwordMatch = bcrypt.compareSync(confirmPassword, hashedPassword)
    if (!passwordMatch) {
      return this.setErrorMessage(accountManagement.password.failedHashComparison)
    }

    const mnemonic = await mnemonicStorage.get()
    const mnemonicInstance = creditProtocol.getMnemonic(mnemonic)
    const user = this.createUserFromCredentials(mnemonicInstance, hashedPassword)
    this.state = { user, hasStoredUser: true }
    this.getPendingTransactions()
  }

  logoutAccount() {
    this.state = { user: undefined }
  }

  async recoverAccount(recoverData: RecoverAccountData) {
    const { confirmPassword, mnemonic } = recoverData

    if (mnemonic.split(' ').length < 12) {
      return this.setErrorMessage(accountManagement.mnemonic.lengthViolation)
    }

    if (confirmPassword.length < minimumPasswordLength) {
      return this.setErrorMessage(accountManagement.password.lengthViolation)
    }

    try {
      const mnemonicInstance = creditProtocol.getMnemonic(mnemonic.toLowerCase())
      this.state = { password: confirmPassword, mnemonicInstance }
      await this.confirmAccount()
    }

    catch (e) {
      return this.setErrorMessage(accountManagement.mnemonic.unableToValidate)
    }
  }

  async removeAccount() {
    await mnemonicStorage.remove()
    await hashedPasswordStorage.remove()
    this.state = { hasStoredUser: false, shouldRemoveAccount: false }
  }

  setAuthLoading(state) {
    this.state = { isAuthLoading: state }
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
