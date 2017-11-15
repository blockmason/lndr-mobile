const generalCommunicationError = 'There was a problem communicating with the server, please try again later.'

export const applicationName = 'LNDR'
export const helloWorld = 'Hello world'

export const cancel = 'Cancel'
export const back = 'Go Back'

export const confirmAccount = 'Confirm'
export const createAccount = 'Create Account'
export const recoverAccount = 'Restore Account'
export const removeAccount = 'Remove Account'
export const updateAccount = 'Update Account'
export const loginAction = 'Unlock'

export const addFriend = 'Add Friend'
export const addFriendConfirmationQuestion = 'Are you sure you would like to add this user as a friend?'
export const noFriends = 'You have no friends'
export const noMatches = 'No matching users found'


export const welcomeBack = nickname => `Welcome back, ${nickname}!`
export const noNicknameWarning = 'You don\'t have a nickname set and your friends won\'t be able to find you!'

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
  },
  addFriend: {
    success: nickname => `Added to friends: @${nickname}`,
    error: generalCommunicationError
  },
  loadInformation: {
    error: generalCommunicationError
  }
}

export const accountViewLanguage = {
  home: 'Home',
  friends: 'Friends',
  activity: 'Activity'
}
