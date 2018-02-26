import { ethToFiat } from 'lndr/eth-price-utils'

const generalCommunicationError = 'There was a problem communicating with the server, please try again later.'

export const applicationName = 'Lndr'
export const helloWorld = 'Hello world'

export const submit = 'SUBMIT'
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
export const enterPin = 'PLEASE ENTER YOUR PIN'
export const changePin = 'CHANGE PIN'
export const enterCurrentPin = 'ENTER CURRENT PIN'
export const logoutAction = 'LOG OUT'
export const seeAllActivity = 'See All Activity'
export const copiedClipboard = 'Copied to Clipboard'

export const addFriend = 'Add Friend'
export const addFriendConfirmationQuestion = 'Are you sure you would like to add this user as a friend?'
export const removeFriend = 'Remove Friend'
export const currentFriends = 'Current Friends'
export const removeFriendConfirmationQuestion = 'Are you sure you would like to remove this user as a friend?'
export const friendInfo = 'More information about this friendship:'
export const noFriends = 'Add some friends to get started!'
export const noMatches = 'No matching users found'
export const noBalances = 'You have no recorded debts'
export const addFriendButton = '+ ADD FRIEND'
export const alreadyFriendsButton = 'FRIENDS'
export const friendShell = 'Friend'

export const tip = 'Tip: '
export const notice = 'Notice: '
export const welcome = 'Welcome to your LNDR'
export const noBalanceWarning = 'We were not able to load your balance at this time, please try again later.'
export const totalBalance = 'Total Balance: '
export const totalBalances = 'Total Counterparties: '
export const newTransaction = 'New Transaction'
export const needsReview = 'Needs Review'
export const owesMe = 'I AM OWED'
export const iOwe = 'I OWE SOMEONE'

export const newPassword = 'New Password (minimum 8 chars)'
export const confirmPassword = 'Confirm Password'
export const newPin = 'New 4-digit PIN'
export const enterNewPin = 'PLEASE SET A NEW 4-DIGIT PIN'
export const confirmPin = 'PLEASE CONFIRM YOUR PIN'
export const newAccount = 'Create a new account'
export const loginAccount = 'Unlock your account'

export const recoverExistingAccount = 'Recover an existing account'
export const recoverMnemonic = 'Mnemonic (12 words displayed \nwhen you created your account)'

export const successTitle = 'Success'
export const errorTitle = 'Error'

export const showMnemonic = 'Show 12-Word Mnemonic'
export const mnemonicExhortation = 'This 12-word phrase is required to restore your account, please keep it somewhere safe and secret'
export const addressExhortation = 'Send Ethereum to your address so you can settle debts on Lndr'
export const removeAccountTitle = 'Are you sure you would like to remove your account from this device?'
export const removeAccountExhortation = 'Be sure that you have access to your mnemonic to restore your account later, as this is a permanent removal of your account information from this device.'

export const myAccount = 'My Account'

export const setNickname = 'Set a nickname so your friends can search for you'
export const setEmail = 'Set an email to receive information on Lndr updates'
export const nickname = 'Nickname (lowercase & numbers)'
export const email = 'Email Address'

export const accountManagement = {
  nickname: {
    lengthViolation: 'Nickname should be at least 3 characters.',
    compositionViolation: 'Nickname can contain only numbers and lowercase letters.',
    duplicationViolation: 'Nickname is already taken'
  },
  email: {
    compositionViolation: 'Email format is incorrect',
    duplicationViolation: 'Email is already taken'
  },
  pin: {
    lengthViolation: 'PIN should be at least 4 characters.',
    matchViolation: 'PINs should match.',
    failedHashComparison: 'PIN is not valid, please try again.',
    updateSuccess: 'Your PIN has been updated',
    updateError: 'There was an error updating your PIN'
  },
  mnemonic: {
    lengthViolation: 'Mnemonic should have at least 12 words.',
    unableToValidate: 'The entered mnemonic was not valid, please try again.'
  },
  setNickname: {
    success: 'Your nickname has been saved.',
    error: generalCommunicationError
  },
  setEmail: {
    success: 'Your email has been saved.',
    error: generalCommunicationError
  },
  lockTimeout: {
    top: 'You must enter your PIN after',
    bottom: 'minutes of inactivity',
    update: 'UPDATE',
    error: 'We were unable to update your account settings',
    success: 'Lock Timeout Updated'
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
  },
  ethBalance: {
    display: balance => `Your ETH balance is ${String(balance).slice(0,8)} `,
    inFiat: (balance, exchange, currency) => ` (${currencies[currency]}${ethToFiat(balance, exchange)})`,
    getError: 'Unable to retrieve Eth balance',
    manage: 'Manage ETH'
  },
  sendEth: {
    error: {
      insufficient: 'The transfer failed due to insufficient funds',
      generic: 'There was an error with the transfer, please try again later'
    },
    amount: 'AMOUNT TO SEND',
    address: `Destination Address (without '0x' prefix)`,
    transfer: 'TRANSFER ETH',
    balance: (balance) => `Your current ETH balance is ${typeof balance === 'string' ? balance.slice(0,8) : ''}`,
    ethAddress: 'Ethereum Address',
    txCost: (cost, currency) => `The current transaction cost is ${currencies[currency]}${cost}`,
    transferLowercase: 'Transfer Eth'
  },
  sendBcpt: {
    error: {
      insufficient: 'You do not have enough BCPT for this transaction',
      generic: 'There was an error with the transfer, please try again later'
    },
    transfer: 'TRANSFER BCPT',
    address: `Destination Address (without '0x' prefix)`,
    balance: (balance) => `Your current BCPT balance is ${typeof balance === 'string' ? balance.slice(0,8) : ''}`,
    bcptAddress: 'BCPT Address'
  },
  changeProfilePic: 'Tap to Change',
  addProfilePic: 'Use Picture from Phone',
  panelHeaders: [
    'ETH Address',
    'ETH Balance',
    'BCPT Balance',
    'Change PIN',
    'Change Nickname',
    'Change Email',
    'Change Profile Picture',
    'Change Lock Timeout',
    'Mnemonic',
    'Notifications'
  ],
  profilePic: {
    setError: 'There was an error uploading your picture, please try again later',
    getError: 'There was an error retrieving your profile picture',
    setSuccess: 'Profile picture updated'
  }
}

export const currentBalance = {
  eth: 'Your current Eth balance is:',
  bcpt: 'Your current BCPT balance is:'
}

export const welcomeView = {
  by: 'BUILT BY',
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
  shell: 'New Transaction',
  add: 'Add Debt',
  selectFriend: 'SELECT',
  lend: 'New Loan',
  borrow: 'New Debt',
  settleUpLower: 'Settle Up',
  total: 'Total',
  createError: {
    amountTooLow: 'Amount must be greater than $0',
    amountTooHigh: 'Amount must be less than $1,000,000,000',
    selfAsFriend: 'You can\'t create debt with yourself, choose another friend',
    pending: 'Please resolve your pending transaction with this user before creating another',
    insufficientEth: eth => `You need at least ${eth} ETH to settle, go to Settings to see your balance`
  },
  fields: {
    amount: 'AMOUNT',
    settlementAmount: 'SETTLEMENT AMOUNT',
    selectFriend: 'FRIEND',
    memo: 'MEMO',
    direction: 'SELECT THE CORRECT STATEMENT',
    to: 'to',
    for: 'for'
  },
  memo: {
    example: 'Type memo here'
  },
  direction: {
    lend: nickname => `${nickname} owes me`,
    borrow: nickname => `I owe ${nickname}`,
    initiatedLend: nickname => `${nickname} says he/she owes`,
    initiatedBorrow: nickname => `${nickname} says you owe`,
    pendingLend: nickname => `@${nickname} owes you`,
    pendingBorrow: nickname => `You owe @${nickname}`,
    pendingLendSettlement: settlement => `@${settlement.debtorNickname} requests a settlement in ${settlement.settlementCurrency}`,
    pendingBorrowSettlement: settlement => `@${settlement.creditorNickname} wants to settle with you in ${settlement.settlementCurrency}`,
    pendingLendSettlementMe: settlement => `You requested to settle with @${settlement.debtorNickname} in ${settlement.settlementCurrency}`,
    pendingBorrowSettlementMe: settlement => `You requested that @${settlement.creditorNickname} settle in ${settlement.settlementCurrency}`
  },
  pending: {
    success: friend => `Pending debt submitted to @${friend.nickname}`,
    error: generalCommunicationError
  },
  pendingParens: ' (pending)',
  confirmation: {
    transaction: counterParty => `Transaction with ${counterParty} has been successfully confirmed`,
    settlement: counterParty => `Settlement with ${counterParty} has been successfully confirmed`,
    error: 'Unable to confirm transaction at this time, please try again later'
  },
  rejection: {
    success: 'Transaction has been rejected',
    error: 'Unable to reject transaction at this time, please try again later'
  },
  balances: {
    error: 'Unable to load balances at this time, please try again later'
  },
  for: memo => `for ${memo}`,
  settleUp: 'SETTLE UP',
  settleTotal: 'SETTLE TOTAL',
  settleUpMemo: (direction, amount) => direction === 'lend' ? `Settling up for ${amount}` : `Request to settle for ${amount} `
}

export const settlementManagement = {
  bilateral: {
    error: {
      insufficient: nickname => `Your settlement with ${nickname} failed due to insufficient funds`,
      generic: nickname => `There was an error processing your settlement with ${nickname}`
    }
  }
}

export const accountViewLanguage = {
  lndr: 'L n d r',
  home: 'Home',
  friends: 'Friends',
  activity: 'Activity'
}

export const notifications = {
  toggleNotifications: 'Toggle Notifications',
  enable: 'TURN ON',
  disable: 'TURN OFF'
}

export const pendingTransactionsLanguage = {
  shell: 'Pending Transaction',
  title: 'Pending',
  memo: 'Memo:',
  for: 'For',
  none: 'You have no pending transactions',
  confirmationQuestion: 'Are you sure you want to confirm this transaction?',
  pendingAnnouncement: 'This transaction is waiting for confirmation by the other party.',
  confirm: 'CONFIRM',
  reject: 'Reject Transaction',
  cancel: 'Cancel Transaction',
  direction: {
    lend: (nickname, amount) => `@${nickname} owes you ${amount}`,
    borrow: (nickname, amount) => `You owe @${nickname} ${amount}`
  }
}

export const pendingSettlementsLanguage = {
  shell: 'Pending Settlement',
  title: 'Pending',
  none: 'You have no pending settlements',
  confirm: 'CONFIRM',
  reject: 'Reject Settlement',
  cancel: 'Cancel Settlement',
}

export const recentTransactionsLanguage = {
  title: 'Completed',
  none: 'You have no completed transactions',
  direction: {
    lend: (nickname, amount) => `@${nickname} owes you ${amount}`,
    borrow: (nickname, amount) => `You owe @${nickname} ${amount}`
  },
  balance: 'Balance ',
  friends: (friends) => `(from ${friends} friend${friends === 1 ? '' : 's'})`
}

export const tabs = {
  home: 'HOME',
  friends: 'FRIENDS',
  activity: 'ACTIVITY'
}

export const confirmation = {
  shell: 'Confirmation',
  done: 'DONE',
  create: {
    start: "We've sent the record over to ",
    end: ' for confirmation.'
  },
  confirm: {
    start: "You've confirmed this record from ",
    end: '.'
  },
  reject: {
    start: "We've let ",
    end: " know that you rejected this record."
  },
  ethSent: {
    start: "You have successfully sent ",
    end: " ETH and your transaction hash is "
  },
  bcptSent: {
    start: "You have successfully sent ",
    end: " BCPT and your transaction hash is "
  },
  status: 'You can see the status of this transaction in the ',
  activity: 'activity tab.'
}

export const currencies = {
  USD: '$',
  JPY: '¥',
  KRW: '₩'
}
