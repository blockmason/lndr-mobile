import { Platform, Clipboard } from 'react-native'
import { UrbanAirship } from 'urbanairship-react-native'
import ethUtil from 'ethereumjs-util'
import moment from 'moment'

import Balance from 'lndr/balance'
import User, { CreateAccountData, RecoverAccountData, LoginAccountData } from 'lndr/user'
import { minimumNicknameLength, minimumPinLength } from 'lndr/user'
import Friend from 'lndr/friend'
import PendingTransaction from 'lndr/pending-transaction'
import RecentTransaction from 'lndr/recent-transaction'
import PendingUnilateral from 'lndr/pending-unilateral'

import EthTransaction from 'lndr/eth-transaction'
import BcptTransaction from 'lndr/bcpt-transaction'
import Storage from 'lndr/storage'
import { getEthBalance, web3 } from 'lndr/settlement'
import { isTouchIdSupported } from 'lndr/touch-id'

import profilePic from 'lndr/profile-pic'
import { transferBcpt } from 'lndr/bcpt-utils'
import { getEtherscanTransactions } from 'lndr/etherscan'
import { sanitizeAmount } from 'lndr/format'
import { jsonToPendingFriend, jsonToPendingTransaction, jsonToRecentTransaction, jsonToPendingUnilateral,
  jsonToPendingBilateral, jsonToPayPalRequest } from 'lndr/json-mapping'

import { triggerTouchId, getEthInfo, generateMultiTransaction, filterMultiTransactions } from './util'

import CreditProtocol from 'credit-protocol'

import language from 'language'
const { accountManagement, debtManagement, settlementManagement, copiedClipboard } = language

import { ToastActionsCreators } from 'react-native-redux-toast'
import { defaultCurrency } from 'lndr/currencies'
import { getUser, getUcacAddr, calculateUcacBalances, convertCurrency, getPrimaryCurrency,
  getChannelID } from 'reducers/app'

const bcrypt = require('bcryptjs')

const mnemonicStorage = new Storage('mnemonic')
const hashedPasswordStorage = new Storage('hashed-password')
const notificationsEnabledStorage = new Storage('notifications-enabled')
const ethTransactionsStorage = new Storage('eth-transactions')
const sessionStorage = new Storage('session')
const userStorage = new Storage('user')
export const primaryCurrencyStorage = new Storage('primary-currency')

const creditProtocol = new CreditProtocol('https://api.lndr.blockmason.io')
// let creditProtocol
// if (Platform.OS === 'ios' ) {
//   creditProtocol = new CreditProtocol('http://localhost:7402')
// } else {
//   creditProtocol = new CreditProtocol('http://10.0.2.2:7402')
// }

// TODO REMOVE setState FUNCTION as the sole purpose was to transition from using
// the custom engine design to redux storage
const setState = (payload) => (
  { type: 'SET_STATE', payload: payload }
)

export const initializeStorage = () => {
  return async (dispatch, getState) => {
    const storedMnemonic = await mnemonicStorage.get()
    const storedSession = await sessionStorage.get()
    const storedUser = await userStorage.get()
    let primaryCurrency = await primaryCurrencyStorage.get()
    primaryCurrency = primaryCurrency === null ? defaultCurrency : primaryCurrency

    //put this in separate section
    const storedNotificationPreference = await notificationsEnabledStorage.get()
    let { notificationsEnabled } = getState().store
    if (storedNotificationPreference !== undefined && storedNotificationPreference !== null) {
      notificationsEnabled = storedNotificationPreference
    }

    const touchIdSupported = await isTouchIdSupported()

    if (storedUser && moment(storedSession).add(storedUser.lockTimeout, 'minute') > moment()) {
      await sessionStorage.set(moment())
      let { ethBalance, ethPrices, bcptBalance } = await getEthInfo(storedUser, creditProtocol)
      let ucacAddresses = await creditProtocol.getUcacAddresses()
      let ethTransactions = await ethTransactionsStorage.get()
      const payload = { hasStoredUser: true, welcomeComplete: true, privacyPolicyVerified: true, user: storedUser, notificationsEnabled, ethBalance,
        ethPrices, bcptBalance, ucacAddresses, ethTransactions, primaryCurrency }
      dispatch(setState(payload))

    } else if (touchIdSupported && storedMnemonic && storedUser) {
      let { ethBalance, ethPrices, bcptBalance } = await getEthInfo(storedUser, creditProtocol)
      let ucacAddresses = await creditProtocol.getUcacAddresses()
      let ethTransactions = await ethTransactionsStorage.get()
      const payload = await triggerTouchId(storedUser, notificationsEnabled, sessionStorage)
      payload.ethBalance = ethBalance
      payload.ethPrices = ethPrices
      payload.bcptBalance = bcptBalance
      payload.ucacAddresses = ucacAddresses
      payload.ethTransactions = ethTransactions
      payload.primaryCurrency = primaryCurrency
      dispatch(setState(payload))

    } else if (storedMnemonic) {
      const lockTimeout = storedUser ? storedUser.lockTimeout : 15
      dispatch(setState({ hasStoredUser: true, welcomeComplete: true, privacyPolicyVerified: true, notificationsEnabled, lockTimeout, primaryCurrency }))
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

export const getAccountInformation = () => {
  return async (dispatch, getState) => {
    const user = getUser(getState())()

    try {
      user.nickname = await creditProtocol.getNickname(user.address)
    } catch (e) { console.log('ERROR GETTING NICKNAME: ', e) }

    try {
      user.email = await creditProtocol.getEmail(user.address)
    } catch (e) { console.log('ERROR GETTING EMAIL: ', e) }

    await userStorage.set(user)
    dispatch(setState({ user }))
  }
}

export const updateNickname = (accountData: any) => {
  return async (dispatch, getState) => {
    const user = getUser(getState())()
    const { address, privateKeyBuffer } = user
    const { nickname } = accountData

    try {
      await creditProtocol.setNickname(address, nickname, privateKeyBuffer)
      user.nickname = nickname
      userStorage.set(user)
      dispatch(setState({ user }))
      dispatch(displaySuccess(accountManagement.setNickname.success))
    } catch (error) {
      dispatch(displayError(accountManagement.setNickname.error))
      throw error
    }
  }
}

export const updateEmail = (accountData: any) => {
  return async (dispatch, getState) => {
    const user = getUser(getState())()
    const { address, privateKeyBuffer } = user
    const { email } = accountData

    try {
      await creditProtocol.setEmail(address, email, privateKeyBuffer)
      user.email = email
      userStorage.set(user)
      dispatch(setState({ user }))
      dispatch(displaySuccess(accountManagement.setEmail.success))
    } catch (error) {
      dispatch(displayError(accountManagement.setEmail.error))
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

    const { mnemonic, privateKey, privateKeyBuffer, ethAddress, address, nickname, email, lockTimeout } = getUser(getState())()
    const hashedPassword = bcrypt.hashSync(password)
    const user = new User(
      mnemonic,
      hashedPassword,
      privateKey,
      privateKeyBuffer,
      ethAddress,
      address,
      nickname,
      email,
      lockTimeout
    )
    await storeUserSession(user)
    dispatch(displaySuccess(accountManagement.pin.updateSuccess))
    return true
  }
}

export const registerChannelID = (channelID: string, platform: string) => {
  return async (dispatch, getState) => {
    const { address, privateKeyBuffer } = getUser(getState())()
    creditProtocol.registerChannelID(address, channelID, platform, privateKeyBuffer)
    dispatch(setState({ channelID }))
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
export const createUserFromCredentials = async (mnemonic, hashedPassword, lockTimeout) => {
  const mnemonicInstance = creditProtocol.getMnemonic(mnemonic)
  const privateKey = mnemonicInstance.toHDPrivateKey()
  const privateKeyBuffer = privateKey.privateKey.toBuffer()
  const ethAddress = ethUtil.privateToAddress(privateKeyBuffer)
  const address = ethAddress.toString('hex')
  const storedPrimaryCurrency = await primaryCurrencyStorage.get()
  if (storedPrimaryCurrency === null) {
    await primaryCurrencyStorage.set(defaultCurrency)
  }
  let nickname = ''
  let email = ''
  try {
    nickname = await creditProtocol.getNickname(address)
    email = await creditProtocol.getEmail(address)
  } catch (e) {}

  return new User(
    mnemonic,
    hashedPassword,
    privateKey,
    privateKeyBuffer,
    ethAddress,
    address,
    nickname,
    email,
    lockTimeout
  )
}

export const confirmAccount = async (recovery: boolean, shouldDisplayMnemonic: boolean, password: string, mnemonic: string) => {
    const hashedPassword = bcrypt.hashSync(password)
    const user = await createUserFromCredentials(mnemonic, hashedPassword, 15)
    await storeUserSession(user)
    let { ethBalance, ethPrices, bcptBalance } = await getEthInfo(user, creditProtocol)
    let ucacAddresses = await creditProtocol.getUcacAddresses()
    let ethTransactions = await getEthTransactions(user.address, recovery)
    const payload = { user, hasStoredUser: true, ethBalance, ethPrices, bcptBalance, ucacAddresses, ethTransactions, shouldDisplayMnemonic, password, mnemonic }
    return payload
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

    const payload = await confirmAccount(false, true, password, mnemonic)

    dispatch(setState(payload))
    //hacky, need to update this
    setTimeout( async () => {
      dispatch(await updateNickname({nickname: accountData.nickname}))
      dispatch(await updateEmail({email: accountData.email}))
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
export const getTwoPartyBalance = (state) => async(user: User, friend: Friend) => {
  const { address } = user
  const amount = await creditProtocol.getBalanceBetween(address, friend.address, getPrimaryCurrency(state))
  return new Balance({ relativeToNickname: friend.nickname, relativeTo: friend.address, amount: amount })
}

//Not a redux action
export async function takenNick(nickname: string) {
  let result = false
  if (nickname.length >= minimumNicknameLength) {
    try {
      const response = await creditProtocol.takenNick(nickname)
      result = true
    } catch (e) {
      result = false
    }
  }
  return result
}
//Not a redux action
export async function takenEmail(email: string) {
  let result = false
  try {
    const response = await creditProtocol.takenEmail(email)
    result = true
  } catch (e) {
    result = false
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

export const getRecentTransactions = () => {
  return async (dispatch, getState) => {
    const { address } = getUser(getState())()
    const rawRecentTransactions = await creditProtocol.getTransactions(address)
    const recentTransactions = rawRecentTransactions.map(jsonToRecentTransaction)
    await ensureTransactionNicknames(recentTransactions)
    dispatch(setState({ recentTransactions, recentTransactionsLoaded: true }))
  }
}

export const getPending = () => {
  return async (dispatch, getState) => {
    const user = getUser(getState())()
    const rawPendingTransactions = await creditProtocol.getPendingTransactions(user.address)
    const flatPendingTransactions = rawPendingTransactions.map(jsonToPendingTransaction)
    console.log('RAW PENDING TRANSACTIONS: ', flatPendingTransactions)
    const pendingTransactions = filterMultiTransactions(user.address, flatPendingTransactions, getState())

    const rawPendingSettlements = await creditProtocol.getPendingSettlements(user.address)
    console.log('RAW PENDING SETTLEMENTS: ', rawPendingSettlements)
    const pendingSettlements = filterMultiTransactions(user.address, rawPendingSettlements.unilateralSettlements.map(jsonToPendingUnilateral), getState())
    const bilateralSettlements = filterMultiTransactions(user.address, rawPendingSettlements.bilateralSettlements.map(jsonToPendingBilateral), getState())
    settleBilateral(user, bilateralSettlements, dispatch, getState)
    
    await ensureTransactionNicknames(pendingSettlements)
    await ensureTransactionNicknames(bilateralSettlements)
    await ensureTransactionNicknames(pendingTransactions)
    dispatch(setState({ pendingTransactions, pendingTransactionsLoaded: true, pendingSettlements, pendingSettlementsLoaded: true, bilateralSettlements }))
  }
}

export const getFriendRequests = () => {
  return async (dispatch, getState) => {
    const user = getUser(getState())()
    const rawPendingFriends = await creditProtocol.getFriendRequests(user.address)
    const pendingFriends = rawPendingFriends.map(jsonToPendingFriend)

    const rawPendingOutboundFriends = await creditProtocol.getOutboundFriendRequests(user.address)
    const pendingOutboundFriends = rawPendingOutboundFriends.map(jsonToPendingFriend)

    console.log('THIS IS IT ', pendingFriends, pendingOutboundFriends)
  
    dispatch(setState({ pendingFriends, pendingOutboundFriends, pendingFriendsLoaded: true }))
  }
}

export const getPayPalRequests = () => {
  return async (dispatch, getState) => {
    const user = getUser(getState())()
    const rawPayPalRequests = await creditProtocol.retrievePayPalSettlementRequests(user.address)

    const payPalRequests = rawPayPalRequests.map( request => {
      const { requestor } = request
      const target = request.friend
      
      const requestorIsMe = requestor.addr.indexOf(user.address) >= 0
      const friend = requestorIsMe ? target : requestor

      return jsonToPayPalRequest({ requestorIsMe, friend })
    })

    dispatch(setState({ payPalRequests, payPalRequestsLoaded: true }))
  }
}

export const cancelPayPalRequest = (friendAddress: string, address: string, privateKeyBuffer: any) => {
  return creditProtocol.deletePayPalSettlementRequest(friendAddress, address, privateKeyBuffer)
}

export const cancelPayPalRequestFail = () => {
  return async (dispatch) => {
    dispatch(displayError(debtManagement.rejection.error))
  }
}

export const confirmPendingTransaction = (pendingTransaction: PendingTransaction) => {
  return async (dispatch, getState) => {
    const { creditorAddress, debtorAddress, amount, memo, creditorNickname, debtorNickname, creditRecord, multiTransactions } = pendingTransaction
    const { ucacAddress } = creditRecord
    const { address, privateKeyBuffer } = getUser(getState())()
    const direction = address === creditorAddress ? 'lend' : 'borrow'
    const friendAddress = address === creditorAddress ? debtorAddress : creditorAddress
    const friendNickname = address === creditorAddress ? debtorNickname : creditorNickname

    if(multiTransactions !== undefined) {
      const ucacBalances = calculateUcacBalances(getState())(friendAddress)
      const { transactions } = await generateMultiTransaction(address, friendAddress, ucacBalances, memo, getState, privateKeyBuffer, creditProtocol)

      try {
        await creditProtocol.submitMultiSettlement(transactions)
        refreshTransactions()

        dispatch(displaySuccess(debtManagement.confirmation.transaction(friendNickname)))
        return true
      } catch (e) {
        dispatch(displayError(debtManagement.pending.error))
        return false
      }
    } else {
      try {
        const creditRecord = await creditProtocol.createCreditRecord(ucacAddress, creditorAddress, debtorAddress, amount, memo)
        const signature = creditRecord.sign(privateKeyBuffer)
        await creditProtocol.submitCreditRecord(creditRecord, direction, signature)
        refreshTransactions()

        dispatch(displaySuccess(debtManagement.confirmation.transaction(friendNickname)))
        return true
      } catch (e) {
        console.log('----------------------ERROR CONFIRMING TRANSACTION', e)
        dispatch(displayError(debtManagement.confirmation.error))
        return false
      }
    }
  }
}

export const rejectPendingTransaction = (pendingTransaction: PendingTransaction) => {
  return async (dispatch, getState) => {
    const { privateKeyBuffer } = getUser(getState())()
    const { hash, multiTransactions } = pendingTransaction
    try {
      if(multiTransactions === undefined) {
        await creditProtocol.rejectPendingByHash(hash, privateKeyBuffer)
      } else {
        multiTransactions.map( async (transaction) => await creditProtocol.rejectPendingByHash(transaction.hash, privateKeyBuffer) )
      }

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

export const rejectPendingSettlement = (pendingSettlement: PendingUnilateral) => {
  return async (dispatch, getState) => {
    const { address, privateKeyBuffer } = getUser(getState())()
    const { hash, multiSettlements } = pendingSettlement
    try {
      if(multiSettlements === undefined) {
        await creditProtocol.rejectPendingByHash(hash, privateKeyBuffer)
      } else {
        multiSettlements.map( async (settlement) => await creditProtocol.rejectPendingByHash(settlement.hash, privateKeyBuffer) )
      }

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

export const addDebt = (friend: Friend, amount: string, memo: string, direction: string, currency: string, settleTotal?: boolean, denomination?: string) => {
  return async (dispatch, getState) => {
    const { address, privateKeyBuffer } = getUser(getState())()
    const ucacBalances = calculateUcacBalances(getState())(friend.address)
    const sanitizedAmount = sanitizeAmount(amount, currency)

    if(direction !== 'borrow' && direction !== 'lend') {
      return
    }

    if (sanitizedAmount <= 0) {
      return dispatch(displayError(debtManagement.createError.amountTooLow))
    } else if (sanitizedAmount >= 1e11) {
      return dispatch(displayError(debtManagement.createError.amountTooHigh))
    }

    if(settleTotal && Object.keys(ucacBalances).length > 1) {
      const { transactions, tooLow, tooHigh } = await generateMultiTransaction(address, friend.address, ucacBalances, memo, getState, privateKeyBuffer, creditProtocol, denomination)

      if (tooLow) {
        return dispatch(displayError(debtManagement.createError.amountTooLow))
      } else if (tooHigh) {
        return dispatch(displayError(debtManagement.createError.amountTooHigh))
      }

      try {
        await creditProtocol.submitMultiSettlement(transactions)

        if(denomination === 'PAYPAL' && direction === 'borrow') {
          await creditProtocol.deletePayPalSettlementRequest(address, friend.address, privateKeyBuffer)
        }
        refreshTransactions()

        dispatch(displaySuccess(debtManagement.pending.success(friend)))
        return true
      } catch (e) {
        dispatch(displayError(debtManagement.pending.error))
      }
    }

    const [ creditorAddress, debtorAddress ] = {
      lend: [ address, friend.address ],
      borrow: [ friend.address, address ]
    }[direction]

    const ucac = await getUcacAddr(getState())(currency)
    try {
      const creditRecord = await creditProtocol.createCreditRecord(
        ucac,
        creditorAddress,
        debtorAddress,
        sanitizedAmount,
        memo
      )

      const signature = creditRecord.sign(privateKeyBuffer)
      await creditProtocol.submitCreditRecord(creditRecord, direction, signature, denomination)

      if(denomination === 'PAYPAL' && direction === 'borrow') {
        await creditProtocol.deletePayPalSettlementRequest(address, friend.address, privateKeyBuffer)
      }
      refreshTransactions()

      dispatch(displaySuccess(debtManagement.pending.success(friend)))

      return true
    } catch (e) {
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
    const oldUser = await userStorage.get()
    const lockTimeout = oldUser ? oldUser.lockTimeout : 15
    const user = await createUserFromCredentials(mnemonic, hashedPassword, lockTimeout)

    await storeUserSession(user)
    let { ethBalance, ethPrices, bcptBalance } = await getEthInfo(user, creditProtocol)
    let ucacAddresses = await creditProtocol.getUcacAddresses()
    let ethTransactions = await ethTransactionsStorage.get()

    const payload = { user, hasStoredUser: true, ethBalance, ethPrices, bcptBalance, ucacAddresses, ethTransactions }
    dispatch(setState(payload))
    refreshTransactions()
    return true
  }
}

export const logoutAccount = () => {
  return async (dispatch) => {
    const payload = { user: undefined }
    userStorage.remove()
    sessionStorage.remove()
    dispatch(displaySuccess(accountManagement.logoutSuccess))
    dispatch(setState(payload))
  }
}

export const removeAccount = () => {
  return async (dispatch, getState) => {
    const { address, privateKeyBuffer } = getUser(getState())()
    const channelID = getChannelID(getState())
    console.log(3)

    try {
      await creditProtocol.deleteChannelID(address, channelID, Platform.OS, privateKeyBuffer)
      await userStorage.remove()
      await mnemonicStorage.remove()
      await hashedPasswordStorage.remove()
      const payload = { hasStoredUser: false, user: undefined }
      dispatch(setState(payload))
      dispatch(displaySuccess(accountManagement.logoutSuccess))
    } catch (e) {
      console.log('ACCOUNT REMOVAL ERROR: ', e)
      dispatch(displayError(accountManagement.logoutError))
    }
  }
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
      const payload = await confirmAccount(true, false, confirmPassword, mnemonic.toLowerCase())
      dispatch(setState(payload))
      return true
    } catch (e) {
      dispatch(displayError(accountManagement.mnemonic.unableToValidate))
      return false
    }
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

export const setWelcomeComplete = (state) => {
  const payload = { welcomeComplete: state }
  return setState(payload)
}

export const verifyPrivacyPolicy = (state) => {
  const payload = { privacyPolicyVerified: state }
  return setState(payload)
}

export const setEthBalance = () => {
  return async (dispatch, getState) => {
    const { user } = getState().store
    const ethBalance = await getEthBalance(user.address)
    dispatch(setState({ ethBalance }))
  }
}

//amount is in eth
export const sendEth = (destAddr: string, amount: string) => {
  return async (dispatch, getState) => {
    try {
      const { privateKeyBuffer, address } = getState().store.user
      //Safe Low is in 10^8 Wei (deciGigaWei)
      const gasPrice = await creditProtocol.getGasPrice()
      const ethTransaction = new EthTransaction(address, destAddr, Number(web3.toWei(Number(amount), 'ether')), gasPrice)
      const txHash = await creditProtocol.settleWithEth(ethTransaction, privateKeyBuffer)
      console.log('SENDING ETH, TXHASH:', txHash)
      storeEthTransaction(dispatch, {
        amount: ethTransaction.value,
        user: ethTransaction.from,
        time: Date.now()
      })
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

export const sendBcpt = (destAddr: string, amount: string) => {
  return async (dispatch, getState) => {
    const { bcptBalance } = getState().store
    if (Number(bcptBalance) < Number(amount)) {
      return dispatch(displayError(accountManagement.sendBcpt.error.insufficient))
    }

    try {
      const { privateKeyBuffer, address } = getState().store.user
      //Safe Low is in 10^8 Wei (deciGigaWei)
      const gasPrice = await creditProtocol.getGasPrice()
      const bcptTransaction = new BcptTransaction(address, destAddr, Number(amount), gasPrice)
      const txHash = await transferBcpt(bcptTransaction, privateKeyBuffer)
      console.log('SENDING BCPT, TXHASH:', txHash)
      return txHash
    } catch (e) {
      console.log('ERROR SENDING BCPT', e)
      if (typeof e === 'string' && e.indexOf('insufficient') !== -1) {
        return dispatch(displayError(accountManagement.sendBcpt.error.insufficient))
      } else {
        return dispatch(displayError(accountManagement.sendBcpt.error.generic))
      }
    }
  }
}

export const validatePin = async (confirmPassword: string) => {
  const hashedPassword = await hashedPasswordStorage.get()
  return bcrypt.compareSync(confirmPassword, hashedPassword)
}

export const failedValidatePin = () => {
  return async (dispatch) => {
    dispatch(displayError(accountManagement.pin.failedHashComparison))
  }
}

export const updateLockTimeout = (timeout: number) => {
  return async (dispatch, getState) => {
    try {
      const user = getUser(getState())()
      user.lockTimeout = timeout
      await storeUserSession(user)
      dispatch(setState({ user }))
      dispatch(displaySuccess(accountManagement.lockTimeout.success))
    } catch (e) {
      dispatch(displayError(accountManagement.lockTimeout.error))
    }
  }
}

export const getProfilePic = () => {
  return async (dispatch, getState) => {
    const { address } = getUser(getState())()
    try {
      const userPic = await profilePic.get(address)
      dispatch(setState({ userPic }))
    } catch (e) {
      if (e.toString().indexOf('Blank Image') === -1) {
        dispatch(displayError(accountManagement.profilePic.getError))
      }
    }
  }
}

export const setProfilePic = (imageURI: string, imageData: string) => {
  return async (dispatch, getState) => {
    const { address, privateKeyBuffer } = getUser(getState())()
    profilePic.clear(address)
    try {
      const userPic = await creditProtocol.setProfilePic(imageURI, imageData, privateKeyBuffer)
      dispatch(displaySuccess(accountManagement.profilePic.setSuccess))
      dispatch(setState({ userPic }))
    } catch (e) {
      dispatch(displayError(accountManagement.profilePic.setError))
    }
  }
}

export const copyToClipboard = (text: string) => {
  return async (dispatch) => {
    Clipboard.setString(text)
    dispatch(displaySuccess(copiedClipboard))
  }
}

export const storeEthTransaction = async (dispatch, ethTx: object) => {
  const ethTransactions = await ethTransactionsStorage.get()
  if (!ethTransactions) {
    ethTransactionsStorage.set([ ethTx ])
    dispatch(setState({ ethTransactions: [ ethTx ] }))
  } else {
    ethTransactions.push(ethTx)
    await ethTransactionsStorage.set(ethTransactions)
    dispatch(setState({ ethTransactions }))
  }
}

export const getEthTxCost = async (currency: string) => {
  return creditProtocol.getTxCost(currency)
}

export const confirmFriendRequest = (friend: string) => {
  return async (_dispatch, getState) => {
    const { address } = getUser(getState())()
    try {
      const userPic = await creditProtocol.addFriend(address, friend)
      return true
    } catch (e) {
      return false
    }
  }
}

export const rejectFriendRequest = (friend: string) => {
  return async (_dispatch, getState) => {
    const { address } = getUser(getState())()
    try {
      const userPic = await creditProtocol.removeFriend(address, friend)
      return true
    } catch (e) {
      return false
    }
  }
}

export const hasPendingMessage = () => {
  return async (dispatch) => {
    dispatch (displayError(debtManagement.createError.pending))
  }
}

export const setPrimaryCurrency = (primaryCurrency: string) => {
  return async (dispatch) => {
    await primaryCurrencyStorage.set(primaryCurrency)
    dispatch (setState({ primaryCurrency }))
  }
}

export const requestPayPalSettlement = (friend: Friend) => {
  return async (dispatch, getState) => {
    const { address, privateKeyBuffer } = getUser(getState())()
    try {
      await creditProtocol.requestPayPalSettlement(friend.address, address, privateKeyBuffer)
      return 'SUCCESS'
    } catch(e) {
      return dispatch (displayError(debtManagement.pending.error))
    }
  }
}

const getEthTransactions = async (addr: string, recovery: boolean) => {
  let ethTransactions = []
  //get all transactions from etherscan and add relevant txs to the list
  if (recovery) {
    try {
      const startBlock = await creditProtocol.getWeekAgoBlock()
      ethTransactions = await getEtherscanTransactions(addr, startBlock)
    } catch (e) {}
  }

  await ethTransactionsStorage.set(ethTransactions)
  return ethTransactions
}

const refreshTransactions = () => {
  getPending()
  getFriendRequests()
  getPayPalRequests()
  getRecentTransactions()
  setEthBalance()
}

const settleBilateral = async (user, bilateralSettlements, dispatch, getState) => {
  const gasPrice = await creditProtocol.getGasPrice()
  //Safe Low is in 10^8 Wei (deciGigaWei)
  const ethBalance = getState().store.ethBalance

  bilateralSettlements.forEach( async (settlement) => {
    if (settlement.creditorAddress.indexOf(user.address) === -1 || settlement.txHash !== undefined) {
      return
    }

    if ( Number(`${settlement.settlementAmount}`) > Number(web3.toWei(ethBalance, 'ether')) ) {
      const debtorNickname = await getNicknameForAddress(settlement.debtorAddress)
      return dispatch(displayError(settlementManagement.bilateral.error.insufficient(debtorNickname)))
    }

    const ethTransaction = new EthTransaction(settlement.creditorAddress, settlement.debtorAddress, settlement.settlementAmount, gasPrice)
    try {
      const txHash = await creditProtocol.settleWithEth(ethTransaction, user.privateKeyBuffer)
      if(settlement.multiSettlements !== undefined) {
        settlement.multiSettlements.map( async(hash) => await creditProtocol.storeSettlementHash(txHash, hash, settlement.creditorAddress, user.privateKeyBuffer) )
      } else {
        await creditProtocol.storeSettlementHash(txHash, settlement.hash, settlement.creditorAddress, user.privateKeyBuffer)
      }

      storeEthTransaction(dispatch, {
        amount: ethTransaction.value,
        user: ethTransaction.from,
        time: Date.now()
      })
    } catch (e) {
      console.log('HAD AN ERROR', e)
      const debtorNickname = await getNicknameForAddress(settlement.debtorAddress)
      if (e.toString().indexOf('insufficient') !== -1) {
        dispatch(displayError(settlementManagement.bilateral.error.insufficient(debtorNickname)))
      } else if (e.toString().indexOf('known transaction') !== -1) {

      } else {
        dispatch(displayError(settlementManagement.bilateral.error.generic(debtorNickname)))
      }
    }
  })
}

export const showPayPalSettlementError = (nickname: string) => {
  return async (dispatch, _getState) => {
    dispatch(displayError(settlementManagement.bilateral.error.generic(nickname)))
  }
}
