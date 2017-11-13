const generalCommunicationError = 'There was a problem communicating with the server, please try again later.'

export const applicationName = 'LNDR'
export const helloWorld = 'Hello world'

export const cancel = 'Cancel'

export const confirmAccount = 'Confirm'
export const createAccount = 'Create Account'
export const recoverAccount = 'Restore Account'
export const removeAccount = 'Remove Account'
export const updateAccount = 'Update Account'
export const loginAction = 'Unlock'

export const addFriend = 'Add Friend'

export const newPassword = 'New Password (minimum 8 chars)'
export const confirmPassword = 'Confirm Password'
export const newAccount = 'Create a new account'
export const loginAccount = 'Unlock your account'

export const recoverExistingAccount = 'Recover an existing account'
export const recoverMnemonic = 'Mnemonic (12 words displayed \nwhen you created your account)'

export const successTitle = 'Success'
export const errorTitle = 'Error'

export const mnemonicExhortation = 'Record these 12 words somewhere safe and secret'
export const removeAccountTitle = 'Are you sure you would like to remove your account from this device?'
export const removeAccountExhortation = 'Be sure that you have access to your mnemonic to restore your account later, as this is a permanent removal of your account information from this device.'

export const myAccount = 'My account'
export const addNewFriend = 'Add new friend'
export const addNewDebt = 'Add new debt'

export const welcomeMakeItEasy = 'Lndr makes it easy to track simple debts'
export const welcomeWeHelpFriends = 'We help friends live, work, and play together.'
export const welcomeLender = 'Len.der'
export const welcomeShareDinner = 'Share dinner...'
export const welcomeFillTank = 'Fill your tank...'
export const welcomeTravelTogether = 'Travel together...'
export const welcomeRunEthereum = 'We run on Ethereum!'
export const welcomeFirstLendingApp = 'The first lending app secured on the blockchain.'
export const welcomeGreatConcert = 'See a great concert...'
export const welcomeYouPlayWithFriends = "You play with friends; we'll keep the tab..."

export const setNickname = 'Set a nickname so your friends can find you'
export const nickname = 'Nickname'

export const searchUsersByNickname = 'Search for your friends by nickname'

export const accountManagement = {
  password: {
    lengthViolation: 'Password should be at least 8 characters.',
    matchViolation: 'Passwords should match.',
    failedHashComparison: 'Password is not valid, please try again.'
  },
  mnemonic: {
    lengthViolation: 'Mnemonic should have at least 12 words.',
    unableToValidate: 'The entered mnemonic was not valid, please try again.'
  },
  setNickname: {
    success: 'Your nickname has been saved.',
    error: generalCommunicationError
  }
}

export const accountViewLanguage = {
  home: 'Home',
  friends: 'Friends',
  activity: 'Activity'
}
