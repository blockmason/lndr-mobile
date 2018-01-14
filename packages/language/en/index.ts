const generalCommunicationError = 'There was a problem communicating with the server, please try again later.'

export const applicationName = 'Lndr'
export const helloWorld = 'Hello world'

export const submit = 'Submit'
export const next = 'Next'
export const cancel = 'Cancel'
export const back = 'Go Back'
export const copy = 'Copy to Clipboard'

export const confirmAccount = 'CONFIRM'
export const createAccount = 'CREATE ACCOUNT'
export const recoverAccount = 'RESTORE ACCOUNT'
export const removeAccount = 'REMOVE ACCOUNT'
export const updateAccount = 'UPDATE ACCOUNT'
export const loginAction = 'UNLOCK'
export const logoutAction = 'LOCK ACCOUNT'
export const seeAllActivity = 'See All Activity'

export const addFriend = 'Add Friend'
export const addFriendConfirmationQuestion = 'Are you sure you would like to add this user as a friend?'
export const removeFriend = 'Remove Friend'
export const currentFriends = 'Current Friends'
export const removeFriendConfirmationQuestion = 'Are you sure you would like to remove this user as a friend?'
export const friendInfo = 'More information about this friendship:'
export const noFriends = 'You have no friends'
export const noMatches = 'No matching users found'
export const noBalances = 'You have no recorded debts'

export const tip = 'Tip: '
export const notice = 'Notice: '
export const welcome = 'Welcome to your LNDR'
export const noBalanceWarning = 'We were not able to load your balance at this time, please try again later.'
export const totalBalance = 'Total Balance: '
export const totalBalances = 'Total Counterparties: '
export const startNewDebt = 'Start New Debt'
export const needsReview = 'Needs Review'
export const owesMe = 'I AM OWED'
export const iOwe = 'I OWE SOMEONE'

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

export const setNickname = 'Set a nickname so your friends can search for you'
export const nickname = 'Nickname (lowercase & numbers)'

export const accountManagement = {
  nickname: {
    lengthViolation: 'Nickname should be at least 3 characters.',
    compositionViolation: 'Nickname can contain only numbers and lowercase letters.',
    duplicationViolation: 'Nickname is already taken'
  },
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
  len: 'Len',
  dot: '.',
  der: 'der',
  shareDinner: 'SHARE DINNER',
  fillTank: 'FILL YOUR TANK',
  travelTogether: 'TRAVEL TOGETHER',
  runEthereum: 'WE RUN ON ETHEREUM!',
  firstLendingApp: 'The first mobile lending app secured on the blockchain.',
  greatConcert: 'SEE A GREAT CONCERT',
  youPlayWithFriends: "You play with friends;\nwe'll keep the tab...",
  start: 'GET STARTED'
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
    lend: nickname => `${nickname} owes me`,
    borrow: nickname => `I owe ${nickname}`,
    initiatedLend: nickname => `${nickname} says he/she owes`,
    initiatedBorrow: nickname => `${nickname} says he/she owes`,
    pendingLend: nickname => `${nickname} owes you`,
    pendingBorrow: nickname => `${nickname} is owed`
  },
  pending: {
    success: friend => `Pending debt submitted to @${friend.nickname}`,
    error: generalCommunicationError
  },
  pendingParens: ' (pending)',
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
  },
  for: (memo) => `for ${memo}`
}

export const accountViewLanguage = {
  lndr: 'L n d r',
  home: 'Home',
  friends: 'Friends',
  activity: 'Activity'
}

export const pendingTransactionsLanguage = {
  title: 'Pending',
  none: 'You have no pending transactions',
  confirmationQuestion: 'Are you sure you want to confirm this transaction?',
  pendingAnnouncement: 'This transaction is waiting for confirmation by the other party.',
  confirm: 'Confirm',
  reject: 'Reject',
  direction: {
    lend: (nickname, amount) => `@${nickname} owes you ${amount}`,
    borrow: (nickname, amount) => `You owe @${nickname} ${amount}`
  }
}

export const recentTransactionsLanguage = {
  title: 'Completed',
  none: 'You have no previous transactions',
  direction: {
    lend: (nickname, amount) => `@${nickname} owes you ${amount}`,
    borrow: (nickname, amount) => `You owe @${nickname} ${amount}`
  },
  balance: 'Balance ',
  friends: (friends) => `(from ${friends} friends)`
}
