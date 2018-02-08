import ethUtil from 'ethereumjs-util'
import { UrbanAirship } from 'urbanairship-react-native'
import moment from 'moment'
import { Platform } from 'react-native'

import { longTimePeriod } from 'lndr/time'
import Balance from 'lndr/balance'
import User, { CreateAccountData, RecoverAccountData, LoginAccountData, UpdateAccountData } from 'lndr/user'
import { minimumNicknameLength, minimumPinLength } from 'lndr/user'
import Friend from 'lndr/friend'
import PendingTransaction from 'lndr/pending-transaction'
import RecentTransaction from 'lndr/recent-transaction'
import PendingSettlement from 'lndr/pending-settlement'
import EthTransaction from 'lndr/eth-transaction'
import ucac from 'lndr/ucac'
import Storage from 'lndr/storage'
import { getEthBalance, web3 } from 'lndr/settlement'
import { getGasPrice, settlementCost, getEthExchange } from 'lndr/eth-price-utils'
import { isTouchIdSupported } from 'lndr/touch-id'
import TouchID from 'react-native-touch-id'
import profilePic from 'lndr/profile-pic'

import CreditProtocol from 'credit-protocol'

import { accountManagement, debtManagement, settlementManagement } from 'language'

import { ToastActionsCreators } from 'react-native-redux-toast'
import { getUser, getStore } from 'reducers/app'
import { hexToBuffer } from '../credit-protocol/lib/buffer-utils';

const bcrypt = require('bcryptjs')

const mnemonicStorage = new Storage('mnemonic')
const hashedPasswordStorage = new Storage('hashed-password')
const notificationsEnabledStorage = new Storage('notifications-enabled')

const creditProtocol = new CreditProtocol('http://34.238.20.130')

// TODO REMOVE setState FUNCTION as the sole purpose was to transition from using
// the custom engine design to redux storage
const setState = (payload) => (
  { type: 'SET_STATE', payload: payload }
)

const sessionStorage = new Storage('session')
const userStorage = new Storage('user')

export const initializeStorage = () => {
  return async (dispatch, getState) => {
    const storedMnemonic = await mnemonicStorage.get()
    const storedSession = await sessionStorage.get()
    const storedUser = await userStorage.get()

    //put this in separate section
    const storedNotificationPreference = await notificationsEnabledStorage.get()
    let { notificationsEnabled } = getState().store
    if (storedNotificationPreference !== undefined && storedNotificationPreference !== null) {
      notificationsEnabled = storedNotificationPreference
    }

    const touchIdSupported = await isTouchIdSupported()

    if (storedUser && moment(storedSession).add(storedUser.lockTimeout, 'minute') > moment()) {
      await sessionStorage.set(moment())
      let { ethBalance, ethExchange } = await getEthInfo(storedUser)
      const payload = { hasStoredUser: true, welcomeComplete: true, user: storedUser, notificationsEnabled, ethBalance, ethExchange }
      dispatch(setState(payload))
    } else if (touchIdSupported && storedMnemonic && storedUser) {
      let { ethBalance, ethExchange } = await getEthInfo(storedUser)
      const payload = await triggerTouchId(storedUser, notificationsEnabled)
      payload.ethBalance = ethBalance
      payload.ethExchange = ethExchange
      dispatch(setState(payload))
    } else if (storedMnemonic) {
      dispatch(setState({ hasStoredUser: true, welcomeComplete: true, notificationsEnabled }))
    }
    dispatch(setState({ isInitializing: false, notificationsEnabled }))
  }
}

export const mnemonicDisplayed = () => {
  const payload = { shouldDisplayMnemonic: false }
  return setState(payload)
}

export const displayError = (error: string) => {
  return ToastActionsCreators.displayError(error)
}

export const displaySuccess = (success: string) => {
  return ToastActionsCreators.displayInfo(success)
}

export const updateAccount = (accountData: any) => {
  return async (dispatch, getState) => {
    const { address, privateKeyBuffer } = getUser(getState())()
    const { nickname } = accountData

    try {
      await creditProtocol.setNickname(address, nickname, privateKeyBuffer)
      dispatch(displaySuccess(accountManagement.setNickname.success))
      dispatch(getAccountInformation())
    } catch (error) {
      dispatch(displayError(accountManagement.setNickname.error))
      throw error
    }
  }
}

export const updatePin = (password: string, confirmPassword: string) =>  {
  return async (dispatch, getState) => {
    if (password !== confirmPassword) {
      dispatch(displayError(accountManagement.pin.matchViolation))
      return false
    }

    const { mnemonic, privateKey, privateKeyBuffer, ethAddress, address, nickname } = getUser(getState())()
    const hashedPassword = bcrypt.hashSync(password)
  
    const user = new User(
      mnemonic,
      hashedPassword,
      privateKey,
      privateKeyBuffer,
      ethAddress,
      address,
      nickname
    )
    await storeUserSession(user)
    dispatch(displaySuccess(accountManagement.pin.updateSuccess))
    return true
  }
}

export const registerChannelID = (channelID: string, platform: string) => {
  return async (_dispatch, getState) => {
    const { address, privateKeyBuffer } = getUser(getState())()
    // creditProtocol.registerChannelID(address, channelID, platform, privateKeyBuffer)
  }
}

//Not a redux action
export async function storeUserSession(user: User) {
  await mnemonicStorage.set(user.mnemonic)
  await hashedPasswordStorage.set(user.hashedPassword)

  await userStorage.set(user)
  await sessionStorage.set(moment())
}

//Not a redux action
export const createUserFromCredentials = async (mnemonic, hashedPassword) => {
  const mnemonicInstance = creditProtocol.getMnemonic(mnemonic)
  const privateKey = mnemonicInstance.toHDPrivateKey()
  const privateKeyBuffer = privateKey.privateKey.toBuffer()
  const ethAddress = ethUtil.privateToAddress(privateKeyBuffer)
  const address = ethAddress.toString('hex')
  let nickname = ''
  try {
    nickname = await creditProtocol.getNickname(address)
  } catch (e) {}

  return new User(
    mnemonic,
    hashedPassword,
    privateKey,
    privateKeyBuffer,
    ethAddress,
    address,
    nickname
  )
}

export const confirmAccount = () => {
  return async (dispatch, getState) => {
    const { password, mnemonic } = getStore(getState())()
    const hashedPassword = bcrypt.hashSync(password)

    const user = await createUserFromCredentials(mnemonic, hashedPassword)
    await storeUserSession(user)
    let { ethBalance, ethExchange } = await getEthInfo(user)
    const payload = { user, hasStoredUser: true, ethBalance, ethExchange }
    dispatch(setState(payload))
  }
}

export const createAccount = (accountData: CreateAccountData) => {
  return async (dispatch) => {
    if (accountData.password.length < minimumPinLength) {
      return dispatch(displayError(accountManagement.pin.lengthViolation))
    }
    if (accountData.password !== accountData.confirmPassword) {
      return dispatch(displayError(accountManagement.pin.matchViolation))
    }
    if (accountData.nickname.length < minimumNicknameLength) {
      return dispatch(displayError(accountManagement.nickname.lengthViolation))
    }
    if(accountData.nickname.match(/^[a-z0-9]*$/) === null) {
      return dispatch(displayError(accountManagement.nickname.compositionViolation))
    }

    const password = accountData.password
    const mnemonic = creditProtocol.getRandomMnemonic().toString()
    const payload = { shouldDisplayMnemonic: true, password: password, mnemonic }

    dispatch(setState(payload))
    dispatch(await confirmAccount())
    //hacky, need to update this
    setTimeout( async () => {
      dispatch(await updateAccount({nickname: accountData.nickname}))
    }, 1000)
  }
}

//Not a redux action
export async function getNicknameForAddress(address) {
  try {

    return await creditProtocol.getNickname(address)
  }
  catch (e) {
    return address.substr(0, 8)
  }
}

//Not a redux action
export async function getTwoPartyBalance(user: User, friend: Friend) {
  const { address } = user
  const amount = await creditProtocol.getBalanceBetween(address, friend.address)
  return new Balance({ relativeToNickname: friend.nickname, relativeTo: friend.address, amount: amount })
}

export const getBalances = () => {
  return async (dispatch, getState) => {
    const { address } = getUser(getState())()
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
            const relativeToNickname = await getNicknameForAddress(counterpartyAddress)
            balances.push(new Balance({ relativeToNickname, relativeTo: counterpartyAddress, amount }))
          }
          catch (e) {
            dispatch(displayError(debtManagement.balances.error))
          }
        }
      })
    )
    dispatch(setState({ balances, balancesLoaded: true }))
  }
}

//Needs a selector
export const getAccountInformation = () => {
  return async (dispatch, getState) => {
    const { address } = getUser(getState())()
    const accountInformation: { nickname?: string, balance?: number } = {}
    try {
      accountInformation.nickname = await creditProtocol.getNickname(address)
    }
    catch (e) {}
    try {
      accountInformation.balance = await creditProtocol.getBalance(address)
    }
    catch (e) {}
    dispatch(setState({ accountInformation, accountInformationLoaded: true }))
    return accountInformation
  }
}

//Not a redux action
export async function takenNick(nickname: string) {
  let result = false
  if (nickname.length >= minimumNicknameLength) {
    result = await creditProtocol.takenNick(nickname)
  }
  return result
}

export const addFriend = (friend: Friend) => {
  return async (dispatch, getState) => {
    const { address/*, privateKeyBuffer*/ } = getUser(getState())()
    try {
      await creditProtocol.addFriend(address, friend.address/*, privateKeyBuffer*/)
      dispatch(displaySuccess(accountManagement.addFriend.success(friend.nickname)))
    } catch (error) {
      dispatch(displayError(accountManagement.addFriend.error))
      throw error
    }
  }
}

export const removeFriend = (friend: Friend) => {
  return async (dispatch, getState) => {
    const { address/*, privateKeyBuffer*/ } = getUser(getState())()
    try {
      await creditProtocol.removeFriend(address, friend.address/*, privateKeyBuffer*/)
      dispatch(displaySuccess(accountManagement.removeFriend.success(friend.nickname)))
    } catch (error) {
      dispatch(displayError(accountManagement.removeFriend.error))
      throw error
    }
  }
}

//Not a redux action
export const jsonToFriend = (data) => {
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

//Not a redux action
export async function ensureNicknames(friends: Friend[]) {
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

//Not a redux action
export async function ensureTransactionNicknames(transactions: Array<PendingTransaction|RecentTransaction>) {
  const needNicknamesFor = transactions.filter(
    transaction => !transaction.creditorNickname || !transaction.debtorNickname
  )

  await Promise.all(
    needNicknamesFor.map(
      async (transaction) => {
        transaction.creditorNickname = await getNicknameForAddress(transaction.creditorAddress)
        transaction.debtorNickname = await getNicknameForAddress(transaction.debtorAddress)
      }
    )
  )
}

export const getFriends = () => {
  return async (dispatch, getState) => {
    const { address } = getUser(getState())()
    const friends = await creditProtocol.getFriends(address)
    const result = friends.map(jsonToFriend)
    await ensureNicknames(result)
    return dispatch(setState({ friends: result, friendsLoaded: true }))
  }
}

//Not a redux action
export async function searchUsers(searchData) {
  let nickname = searchData.nickname
  if (nickname.substring(0, 1) === '@') {
    nickname = nickname.substring(1);
  }
  if (nickname.length >= minimumNicknameLength) {
    const users = await creditProtocol.searchUsers(nickname)
    return users.map(jsonToFriend)
  } else {
    return []
  }
}

//Not a redux action
export const jsonToPendingTransaction = (data) => {
  return new PendingTransaction(data)
}

//Not a redux action
export const jsonToRecentTransaction = (data) => {
  return new RecentTransaction(data)
}

//Not a redux action
export const jsonToPendingSettlement = (data) => {
  return new PendingSettlement(data)
}

export const getRecentTransactions = () => {
  return async (dispatch, getState) => {
    const { address } = getUser(getState())()
    const rawRecentTransactions = await creditProtocol.getTransactions(address)
    const recentTransactions = rawRecentTransactions.map(jsonToRecentTransaction)
    await ensureTransactionNicknames(recentTransactions)
    dispatch(setState({ recentTransactions, recentTransactionsLoaded: true }))
  }
}

export const getPendingTransactions = () => {
  return async (dispatch, getState) => {
    const { address } = getUser(getState())()
    const rawPendingTransactions = await creditProtocol.getPendingTransactions(address)
    const pendingTransactions = rawPendingTransactions.map(jsonToPendingTransaction)
    await ensureTransactionNicknames(pendingTransactions)
    dispatch(setState({ pendingTransactions, pendingTransactionsLoaded: true }))
  }
}

export const getPendingSettlements = () => {
  return async (dispatch, getState) => {
    const user = getUser(getState())()

    const rawPendingSettlements = await creditProtocol.getPendingSettlements(user.address)
    console.log('RAW PENDING SETTLEMENTS: ', rawPendingSettlements)
    const pendingSettlements = rawPendingSettlements.unilateralSettlements.map(jsonToPendingSettlement)
    const bilateralSettlements = rawPendingSettlements.bilateralSettlements.map(jsonToPendingSettlement)
    settleBilateral(user, bilateralSettlements, dispatch, getState)
    await ensureTransactionNicknames(pendingSettlements)
    await ensureTransactionNicknames(bilateralSettlements)
    dispatch(setState({ pendingSettlements, pendingSettlementsLoaded: true, bilateralSettlements }))
  }
}

export const confirmPendingTransaction = (pendingTransaction: PendingTransaction) => {
  return async (dispatch, getState) => {
    const { creditorAddress, debtorAddress, amount, memo, creditorNickname, debtorNickname } = pendingTransaction
    const { address, privateKeyBuffer } = getUser(getState())()
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
      refreshTransactions()
      
      dispatch(displaySuccess(debtManagement.confirmation.transaction(direction === 'lend' ? debtorNickname : creditorNickname)))

      return true
    }

    catch (e) {
      console.log('----------------------ERROR CONFIRMING TRANSACTION', e)
      dispatch(displayError(debtManagement.confirmation.error))
      return false
    }
  }
}

export const confirmPendingSettlement = (pendingTransaction: PendingTransaction, denomination: string) => {
  return async (dispatch, getState) => {
    const { creditorAddress, debtorAddress, amount, memo, debtorNickname, creditorNickname } = pendingTransaction
    const { address, privateKeyBuffer } = getUser(getState())()
    const direction = address === creditorAddress ? 'lend' : 'borrow'

    console.log(direction, pendingTransaction)
    if (direction === 'lend') {
      const ethRequired = await getEthRequired(getState, amount)
      if (ethRequired) {
        dispatch(displayError(debtManagement.createError.insufficientEth(ethRequired)))
        return false
      }
    }

    try {
      const creditRecord = await creditProtocol.createCreditRecord(
        ucac,
        creditorAddress,
        debtorAddress,
        amount,
        memo
      )

      const signature = creditRecord.sign(privateKeyBuffer)
      await creditProtocol.submitSettlementRecord(creditRecord, direction, signature, denomination)
      refreshTransactions()

      dispatch(displaySuccess(debtManagement.confirmation.settlement(direction === 'lend' ? debtorNickname : creditorNickname)))

      return true
    }

    catch (e) {
      dispatch(displayError(debtManagement.confirmation.error))
      return false
    }
  }
}

export const rejectPendingTransaction = (pendingTransaction: PendingTransaction) => {
  return async (dispatch, getState) => {
    const { address, privateKeyBuffer } = getUser(getState())()
    const { hash } = pendingTransaction
    try {
      await creditProtocol.rejectPendingTransactionByHash(hash, privateKeyBuffer)
      dispatch(displaySuccess(debtManagement.rejection.success))
      refreshTransactions()

      return true
    }
    catch (e) {
      console.log('REJECTION ERROR', e)
      dispatch(displayError(debtManagement.rejection.error))
      return false
    }
  }
}

export const rejectPendingSettlement = (pendingSettlement: PendingSettlement) => {
  return async (dispatch, getState) => {
    const { address, privateKeyBuffer } = getUser(getState())()
    const { hash } = pendingSettlement
    try {
      await creditProtocol.rejectPendingSettlementByHash(hash, privateKeyBuffer)
      refreshTransactions()

      dispatch(displaySuccess(debtManagement.rejection.success))
      return true
    }
    catch (e) {
      dispatch(displayError(debtManagement.rejection.error))
      return false
    }
  }
}

export const addDebt = (friend: Friend, amount: string, memo: string, direction: string) => {
  return async (dispatch, getState) => {
    const { address, privateKeyBuffer } = getUser(getState())()

    const sanitizedAmount = sanitizeAmount(amount)

    if (sanitizedAmount <= 0) {
      return dispatch(displayError(debtManagement.createError.amountTooLow))
    }

    if (sanitizedAmount >= 1e11) {
      return dispatch(displayError(debtManagement.createError.amountTooHigh))
    }

    if (address === friend.address) {
      return dispatch(displayError(debtManagement.createError.selfAsFriend))
    }
    // TODO - Please move this to validation check to the view layer and in favor of using the getPendingTransaction action
    if (hasPendingTransaction(getState, friend)) {
      return dispatch(displayError(debtManagement.createError.pending))
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
      refreshTransactions()

      dispatch(displaySuccess(debtManagement.pending.success(friend)))

      return true
    }

    catch (e) {
      console.log('WHY WONT THIS WORK', e)
      dispatch(displayError(debtManagement.pending.error))
    }
  }
}

export const settleUp = (friend: Friend, amount: string, memo: string, direction: string, denomination: string) => {
  return async (dispatch, getState) => {
    const { address, privateKeyBuffer } = getUser(getState())()

    const sanitizedAmount = sanitizeAmount(amount)

    if (sanitizedAmount <= 0) {
      return dispatch(displayError(debtManagement.createError.amountTooLow))
    }

    if (sanitizedAmount >= 1e11) {
      return dispatch(displayError(debtManagement.createError.amountTooHigh))
    }

    if (address === friend.address) {
      return dispatch(displayError(debtManagement.createError.selfAsFriend))
    }
    // TODO - Please move this to validation check to the view layer and in favor of using the getPendingTransaction action
    if (hasPendingTransaction(getState, friend)) {
      return dispatch(displayError(debtManagement.createError.pending))
    }

    if (direction === 'lend') {
      const ethRequired = await getEthRequired(getState, sanitizedAmount)
      if (ethRequired) {
        return dispatch(displayError(debtManagement.createError.insufficientEth(ethRequired)))
      }
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
      await creditProtocol.submitSettlementRecord(creditRecord, direction, signature, denomination)
      refreshTransactions()

      dispatch(displaySuccess(debtManagement.pending.success(friend)))

      return true
    }

    catch (e) {
      dispatch(displayError(debtManagement.pending.error))
    }
  }
}

export const loginAccount = (loginData: LoginAccountData) => {
  return async (dispatch) => {
    const { confirmPassword } = loginData
    const hashedPassword = await hashedPasswordStorage.get()
    const passwordMatch = bcrypt.compareSync(confirmPassword, hashedPassword)
    if (!passwordMatch) {
      dispatch(displayError(accountManagement.pin.failedHashComparison))
      return false
    }

    const mnemonic = await mnemonicStorage.get()
    const user = await createUserFromCredentials(mnemonic, hashedPassword)

    await storeUserSession(user)
    let { ethBalance, ethExchange } = await getEthInfo(user)
    
    const payload = { user, hasStoredUser: true, ethBalance, ethExchange }
    dispatch(setState(payload))
    return true
  }
}

export const logoutAccount = () => {
  const payload = { user: undefined }
  userStorage.remove()
  sessionStorage.remove()
  return setState(payload)
}

export const recoverAccount = (recoverData: RecoverAccountData) => {
  return async (dispatch) => {
    const { password, confirmPassword, mnemonic } = recoverData

    if (mnemonic.split(' ').length < 12) {
      return dispatch(displayError(accountManagement.mnemonic.lengthViolation))
    }

    if (password !== confirmPassword) {
      return dispatch(displayError(accountManagement.pin.matchViolation))
    }

    if (confirmPassword.length < minimumPinLength) {
      return dispatch(displayError(accountManagement.pin.lengthViolation))
    }

    try {
      const payload = { password: confirmPassword, mnemonic: mnemonic.toLowerCase()}
      dispatch(setState(payload))
      dispatch(await confirmAccount())
    }

    catch (e) {
      dispatch(displayError(accountManagement.mnemonic.unableToValidate))
    }
  }
}

export const removeAccount = () => {
  return async (dispatch) => {
    await mnemonicStorage.remove()
    await hashedPasswordStorage.remove()
    const payload = { hasStoredUser: false, shouldRemoveAccount: false }
    dispatch(setState(payload))
  }
}

export const toggleNotifications = () => {
  return async (dispatch, getState) => {
    const oldSetting = getState().store.notificationsEnabled
    const notificationsEnabled = !oldSetting
    await notificationsEnabledStorage.set(notificationsEnabled)
    await UrbanAirship.setUserNotificationsEnabled(notificationsEnabled)
    dispatch(setState({ notificationsEnabled }))
  }
}

export const setAuthLoading = (state) => {
  const payload = { isAuthLoading: state }
  return setState(payload)
}

export const goToRecoverAccount = () => {
  const payload = { shouldRecoverAccount: true }
  return setState(payload)
}

export const cancelRecoverAccount = () => {
  const payload = { shouldRecoverAccount: false }
  return setState(payload)
}

export const goToRemoveAccount = () => {
  const payload = { shouldRemoveAccount: true }
  return setState(payload)
}

export const cancelRemoveAccount = () => {
  const payload = { shouldRemoveAccount: false }
  return setState(payload)
}

export const setWelcomeComplete = (state) => {
  const payload = { welcomeComplete: state }
  return setState(payload)
}

export const setEthBalance = () => {
  return async (dispatch, getState) => {
    const { user } = getState().store
    const ethBalance = await getEthBalance(user.address)
    const ethExchange = await getEthExchange()
    dispatch(setState({ ethBalance, ethExchange }))
  }
}

//amount is in eth
export const sendEth = (destAddr: string, amount: string) => {
  return async (dispatch, getState) => {
    try {
      const { privateKey, address } = getState().store.user
      //Safe Low is in 10^8 Wei (deciGigaWei)
      const gasPrice = await getGasPrice()
      const ethTransaction = new EthTransaction(address, destAddr, Number(web3.toWei(Number(amount), 'ether')), gasPrice)
      const txHash = await creditProtocol.settleWithEth(ethTransaction, privateKey)
      console.log('SENDING ETH, TXHASH:', txHash)
      return txHash
    } catch (e) {
      console.log('ERROR SENDING ETH', e)
      if (typeof e === 'string' && e.indexOf('insufficient') !== -1) {
        return dispatch(displayError(accountManagement.sendEth.error.insufficient))
      } else {
        return dispatch(displayError(accountManagement.sendEth.error.generic))
      }
    }
  }
}

export const updateLockTimeout = (timeout: number) => {
  return async (dispatch, getState) => {
    try {
      const { user } = getState().store
      console.log(user)
      user.lockTimeout = timeout
      await userStorage.set(user)
      dispatch(setState({ user }))
      dispatch(displaySuccess(accountManagement.lockTimeout.success))
    } catch (e) {
      dispatch(displayError(accountManagement.lockTimeout.error))
    }
  }
}

export const getProfilePic = (nickname: string) => {
  return async (dispatch) => {
    try {
      const userPic = await profilePic.get(nickname)
      dispatch(setState({ userPic }))
    } catch (e) {
      dispatch(displayError(accountManagement.profilePic.getError))
    }
  }
}

export const setProfilePic = (nickname: string, imageURI: string) => {
  return async (dispatch) => {
    try {
      const userPic = await profilePic.set(nickname, imageURI)
      dispatch(displaySuccess(accountManagement.profilePic.setSuccess))
      dispatch(setState({ userPic }))
    } catch (e) {
      dispatch(displayError(accountManagement.profilePic.setError))
    }
  }
}

const refreshTransactions = () => {
  getPendingTransactions()
  getRecentTransactions()
  setEthBalance()
  //enable this once server is done
  // getPendingSettlements()
}

const sanitizeAmount = amount => {
  return parseInt(
    amount
    .replace(/[^.\d]/g, '')
    .replace(/^\d+\.?$/, x => `${x}00`)
    .replace(/\.\d$/, x => `${x.substr(1)}0`)
    .replace(/\.\d\d$/, x => `${x.substr(1)}`)
    .replace(/\./, () => '')
  )
}

const settleBilateral = async (user, bilateralSettlements, dispatch, getState) => {
  const gasPrice = await getGasPrice()
  //Safe Low is in 10^8 Wei (deciGigaWei)
  const ethBalance = getState().store.ethBalance

  bilateralSettlements.forEach( async (settlement) => {
    if (settlement.creditorAddress === user.address) {
      let hasEthTxHash = false
      try {
        const ethTxHash = await creditProtocol.getEthTxHash(settlement.hash)
        console.log('GOT TX HASH', ethTxHash)
        hasEthTxHash = true
      } catch (e) {
        console.log('ERROR GETTING TX HASH', settlement.hash, e)
      }
      if (hasEthTxHash) {
        return
      }
      console.log('ETH AMOUNTS FOR SETTLEMENT', Number(`${settlement.settlementAmount}`), Number(`${settlement.settlementAmount}`) > Number(web3.toWei(ethBalance, 'ether')), Number(web3.toWei(ethBalance, 'ether')) )
      
      if ( Number(`${settlement.settlementAmount}`) > Number(web3.toWei(ethBalance, 'ether')) ) {
        return dispatch(displayError(settlementManagement.bilateral.error.insufficient(settlement.debtorNickname)))
      }
      const ethTransaction = new EthTransaction(settlement.creditorAddress, settlement.debtorAddress, settlement.settlementAmount, gasPrice)

      try {
        const txHash = await creditProtocol.settleWithEth(ethTransaction, user.privateKeyBuffer)
        console.log('TX HASH', txHash)
        creditProtocol.storeSettlementHash(txHash, settlement, user.privateKeyBuffer)

      } catch (e) {
        console.log('HAD AN ERROR', e)
        if (typeof e === 'string' && e.indexOf('insufficient') !== -1) {
          dispatch(displayError(settlementManagement.bilateral.error.insufficient(settlement.debtorNickname)))
        } else {
          dispatch(displayError(settlementManagement.bilateral.error.generic(settlement.debtorNickname)))
        }
      }
    }
  })
}

const hasPendingTransaction = (getState, friend) => {
  function friendMatch(list: any) {
    return list.some( ele => ele.creditorAddress === friend.address || ele.debtorAddress === friend.address )
  }
  const { pendingTransactions, pendingSettlements, bilateralSettlements } = getState().store
  return friendMatch(pendingTransactions) || friendMatch(pendingSettlements) || friendMatch(bilateralSettlements)
}

const getEthRequired = async (getState, amount) => {
  const { ethBalance } = getState().store
  let ethAmount = 0
  try {
    ethAmount = await settlementCost(amount)
  } catch (e) {
    console.log('ERROR GETTING SETTLEMENT AMOUNT: ', e)
  }
  return ethAmount > Number(ethBalance) ? `${ethAmount}`.slice(0, 10) : 0
}

const triggerTouchId = (user, notificationsEnabled) => {
  const optionalConfigObject = { title: 'Authentication Required', color: '#e00606' }
  return TouchID.authenticate('Please sign in using your fingerprint', optionalConfigObject)
  .then(success => {
    sessionStorage.set(moment())
    return { hasStoredUser: true, welcomeComplete: true, notificationsEnabled, user }
  })
  .catch(error => {
    console.log('Touch ID login Error: ', error)
    return { hasStoredUser: true, welcomeComplete: true, notificationsEnabled }
  })
}

const getEthInfo = async (user) => {
  let ethBalance, ethExchange
  try {
    ethBalance = await getEthBalance(user.address)
    ethExchange = await getEthExchange()
  } catch (e) {
    ethBalance = '0'
    ethExchange = '1000'
  }
  return { ethBalance, ethExchange }
}
