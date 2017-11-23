const generalCommunicationError = 'There was a problem communicating with the server, please try again later.'

export const applicationName = 'Lndr'
export const helloWorld = 'Hello world'

export const submit = 'Submit'
export const cancel = 'Cancel'
export const back = 'Go Back'

export const confirmAccount = 'Confirm'
export const createAccount = 'Create Account'
export const recoverAccount = 'Restore Account'
export const removeAccount = 'Remove Account'
export const updateAccount = 'Update Account'
export const loginAction = 'Unlock'
export const logoutAction = 'Lock Account'

export const addFriend = 'Add Friend'
export const addFriendConfirmationQuestion = 'Are you sure you would like to add this user as a friend?'
export const removeFriend = 'Remove Friend'
export const removeFriendConfirmationQuestion = 'Are you sure you would like to remove this user as a friend?'
export const noFriends = 'You have no friends'
export const noMatches = 'No matching users found'
export const noBalances = 'You have no recorded debts'

export const tip = 'Tip: '
export const notice = 'Notice: '
export const welcome = 'Welcome to your LNDR'
export const welcomeBack = nickname => `Welcome back, @${nickname}!`
export const noBalanceWarning = 'We were not able to load your balance at this time, please try again later.'
export const totalBalance = 'Total Balance: '
export const totalBalances = 'Total Counterparties: '

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

export const myAccount = 'My Account'
export const aboutLndr = 'About Lndr'
export const getHelp = 'Get Help'

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
  removeFriend: {
    success: nickname => `Removed from friends: @${nickname}`,
    error: generalCommunicationError
  },
  loadInformation: {
    error: generalCommunicationError
  }
}

export const welcomeView = {
  makeItEasy: 'Lndr makes it easy to track simple debts',
  weHelpFriends: 'We help friends live, work, and play together.',
  lender: 'Len.der',
  shareDinner: 'Share dinner...',
  fillTank: 'Fill your tank...',
  travelTogether: 'Travel together...',
  runEthereum: 'We run on Ethereum!',
  firstLendingApp: 'The first lending app secured on the blockchain.',
  greatConcert: 'See a great concert...',
  youPlayWithFriends: "You play with friends; we'll keep the tab...",
  start: 'Start'
}

export const debtManagement = {
  add: 'Add Debt',
  selectFriend: 'Select Friend',
  fields: {
    amount: 'AMOUNT',
    selectFriend: 'SELECT FRIEND',
    memo: 'MEMO',
    direction: 'SELECT THE CORRECT STATEMENT'
  },
  memo: {
    example: 'Thanks for dinner.'
  },
  direction: {
    lend: (nickname, amount) => `@${nickname} owes me ${amount || ''}`,
    borrow: (nickname, amount) => `I owe @${nickname} ${amount || ''}`
  },
  pending: {
    success: friend => `Pending debt submitted to @${friend.nickname}`,
    error: generalCommunicationError
  },
  confirmation: {
    success: 'Transaction has been successfully confirmed',
    error: 'Unable to confirm transaction at this time, please try again later'
  },
  rejection: {
    success: 'Transaction has been rejected',
    error: 'Unable to reject transaction at this time, please try again later'
  },
  balances: {
    error: 'Unable to load balances at this time, please try again later'
  }
}

export const accountViewLanguage = {
  lndr: 'L n d r',
  home: 'Home',
  friends: 'Friends',
  activity: 'Activity'
}

export const pendingTransactionsLanguage = {
  title: 'Pending Transaction',
  none: 'You have no pending transactions',
  confirmationQuestion: 'Are you sure you want to confirm this transaction?',
  pendingAnnouncement: 'This transaction is waiting for confirmation by the other party.',
  confirm: 'Confirm',
  reject: 'Reject'
}

export const recentTransactionsLanguage = {
  title: 'Transaction Details',
  none: 'You have no previous transactions',
  direction: {
    lend: (nickname, amount) => `@${nickname} owes you ${amount}`,
    borrow: (nickname, amount) => `You owe @${nickname} ${amount}`
  }
}
