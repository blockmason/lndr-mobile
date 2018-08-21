import { currencySymbols, transferLimits } from 'lndr/currencies'

const generalCommunicationError = 'There was a problem communicating with the server, please try again later.'

export default {

  applicationName: `Lndr`,
  helloWorld: `Hello world`,
  submit: `SUBMIT`,
  next: `Next`,
  cancel: `Cancel`,
  back: `Go Back`,
  copy: `Copy to Clipboard`,
  confirmAccount: `CONFIRM`,
  createAccount: `CREATE ACCOUNT`,
  recoverAccount: `RESTORE ACCOUNT`,
  removeAccount: `REMOVE ACCOUNT`,
  updateAccount: `UPDATE ACCOUNT`,
  loginAction: `UNLOCK`,
  enterPin: `PLEASE ENTER YOUR PIN`,
  changePin: `CHANGE PIN`,
  enterCurrentPin: `ENTER CURRENT PIN`,
  logoutAction: `LOG OUT`,
  seeAllActivity: `See All Activity`,
  copiedClipboard: `Copied to Clipboard`,
  pleaseWait: `Please Wait`,
  addFriend: `Add Friend`,
  addFriendConfirmationQuestion: `Are you sure you would like to add this user as a friend?`,
  removeFriend: `Remove Friend`,
  currentFriends: `Current Friends`,
  removeFriendConfirmationQuestion: `Are you sure you would like to remove this user as a friend?`,
  inviteFriends: `Invite Friends to Lndr`,
  tryLndr: `Check out the Lndr App here:`,
  friendInfo: `More information about this friendship:`,
  noFriends: `Add some friends to get started!`,
  noMatches: `No matching users found`,
  noBalances: `You have no recorded debts`,
  addFriendButton: `+ ADD FRIEND`,
  alreadyFriendsButton: `FRIENDS`,
  friendShell: `Friend`,
  tip: `Tip:  `,
  notice: `Notice: `,
  welcome: `Welcome to your LNDR`,
  noBalanceWarning: `We were not able to load your balance at this time, please try again later.`,
  totalBalance: `Total Balance:  `,
  totalBalances: `Total Counterparties:  `,
  newTransaction: `New Transaction`,
  needsReview: `Needs Review`,
  owesMe: `I AM OWED`,
  iOwe: `I OWE SOMEONE`,
  newPassword: `New Password (minimum 8 characters)`,
  confirmPassword: `Confirm Password`,
  newPin: `New 4-digit PIN`,
  enterNewPin: `PLEASE SET A NEW 4-DIGIT PIN`,
  confirmPin: `PLEASE CONFIRM YOUR PIN`,
  newAccount: `Create a new account`,
  loginAccount: `Unlock your account`,
  recoverExistingAccount: `Recover an existing account`,
  recoverMnemonic: `Mnemonic (12 words displayed \nwhen you created your account)`,
  recoverMnemonicLengthError: `Mnemonic should be exactly 12 words`,
  successTitle: `Success`,
  errorTitle: `Error`,
  showMnemonic: `Show 12-Word Mnemonic`,
  mnemonicExhortation: `This 12-word phrase is required to restore your account, please keep it somewhere safe and secret`,
  addressExhortation: `Send Ethereum to your address so you can settle debts on Lndr`,
  removeAccountTitle: `Are you sure you would like to remove your account from this device?`,
  removeAccountExhortation: `Be sure that you have access to your mnemonic to restore your account later, as this is a permanent removal of your account information from this device.`,
  myAccount: `My Account`,
  setNickname: `Set a nickname so your friends can search for you`,
  setEmail: `Set an email to receive information on Lndr updates`,
  nickname: `Nickname (lowercase & numbers)`,
  email: `Email Address`,
  accountManagement: {
    nickname: {
      lengthViolation: `Nickname should be at least 3 characters.`,
      compositionViolation: `Nickname can contain only numbers and lowercase letters.`,
      duplicationViolation: `Nickname is already taken`,
    },
    email: {
      compositionViolation: `Email format is incorrect`,
      duplicationViolation: `Email is already taken`,
    },
    pin: {
      lengthViolation: `PIN should be at least 4 characters.`,
      matchViolation: `PINs should match.`,
      failedHashComparison: `PIN is not valid, please try again.`,
      updateSuccess: `Your PIN has been updated`,
      updateError: `There was an error updating your PIN`,
    },
    mnemonic: {
      lengthViolation: `Mnemonic should have at least 12 words.`,
      unableToValidate: `The entered mnemonic was not valid, please try again.`,
    },
    setNickname: {
      success: `Your nickname has been saved.`,
      error: generalCommunicationError
    },
    setEmail: {
      success: `Your email has been saved.`,
      error: generalCommunicationError
    },
    lockTimeout: {
      top: `You must enter your PIN after`,
      bottom: `minutes of inactivity`,
      update: `UPDATE`,
      error: `We were unable to update your account settings`,
      success: `Lock Timeout Updated`,
    },
    addFriend: {
      success: nickname => `Friend request sent to @${nickname}`,
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
      display: balance => `Your ETH balance is ${String(balance).slice(0,8)}`,
      getError: `Unable to retrieve Eth balance`,
      manage: `Manage ETH`,
    },
    sendEth: {
      error: {
        insufficient: `You do not have enough ETH for this transaction`,
        generic: `There was an error with the transfer, please try again later`,
        address: `Please enter a valid address`,
        amount: `Please enter an amount greater than 0`,
        limitExceeded: currency => `You can only send ${currencySymbols(currency)}${transferLimits(currency)} per week, please select a smaller amount`
      },
      amount: `AMOUNT TO SEND`,
      address: `Destination Address (without '0x' prefix)`,
      transfer: `TRANSFER ETH`,
      transferAll: `TRANSFER EVERYTHING`,
      balance: (balance) => `Your current ETH balance is ${typeof balance === 'string' ? balance.slice(0,8) :''}`,
      ethAddress: `Ethereum Address`,
      txCost: (cost, currency) => `The current transaction cost is ${currencySymbols(currency)}${cost}`,
      transferLowercase: `Transfer Eth`,
      note: currency => `Please note: you can only transfer ${currencySymbols(currency)}${transferLimits(currency)} per week out of Lndr`,
      warning: (amount, currency) => `You have ${currencySymbols(currency)}${amount} remaining of your ${currencySymbols(currency)}${transferLimits(currency)} limit`,
    },
    sendBcpt: {
      error: {
        insufficient: `You do not have enough BCPT for this transaction`,
        generic: `There was an error with the transfer, please try again later`,
      },
      transfer: `TRANSFER BCPT`,
      address: `Destination Address (without '0x' prefix)`,
      balance: balance => `Your current BCPT balance is ${typeof balance === 'string' ? balance.slice(0,8) :''}`,
      bcptAddress: `BCPT Address`,
    },
    panelHeaders: [
      `ETH (& BCPT) Address`,
      `ETH Balance`,
      `BCPT Balance`,
      `Remove Account`,
      `ETH Transaction History`,
      `Receive PayPal Payments`,
      `Change Primary Currency`,
      `Change PIN`,
      `Change Email`,
      `Change Lock Timeout`,
      `Mnemonic`,
      `Notifications`,
    ],
    viewEtherscan: `View Etherscan History`,
    profilePic: {
      change: `Change Profile Picture`,
      setError: `There was an error uploading your picture, please try again later`,
      getError: `There was an error retrieving your profile picture`,
      setSuccess: `Profile picture updated`,
    },
    logoutSuccess: `You have successfully logged out!`,
    logoutError: generalCommunicationError,
  },

  currentBalance: {
    eth: `Your current Eth balance is:`,
    bcpt: `Your current BCPT balance is:`,
  },

  welcomeView: {
    by: `BUILT BY`,
    makeItEasy: `Lndr makes it easy to track simple debts`,
    weHelpFriends: `We help friends live, work, and play together.`,
    len: `Len`,
    dot: `.`,
    der: `der`,
    shareDinner: `SHARE DINNER`,
    fillTank: `FILL YOUR TANK`,
    travelTogether: `TRAVEL TOGETHER`,
    runEthereum: `WE RUN ON ETHEREUM!`,
    firstLendingApp: `The first mobile lending app secured on the blockchain.`,
    greatConcert: `SEE A GREAT CONCERT`,
    youPlayWithFriends: `You play with friends;\nwe'll keep the tab...`,
    start: `GET STARTED`,
  },

  debtManagement: {
    shell: `New Transaction`,
    add: `Add Debt`,
    selectFriend: `SELECT`,
    lend: `New Loan`,
    borrow: `New Debt`,
    iLent: `A friend owes me`,
    iBorrowed: `I owe a friend`,
    settleUpLower: `Settle Up`,
    amountToSettle: `AMOUNT TO SETTLE`,
    total: `Total`,
    record: `record`,
    records: `records`,
    chooseCurrency: `Choose a Currency`,

    createError: {
      amountTooLow: `Amount must be greater than $0`,
      amountTooHigh: `Amount must be less than $1,000,000,000`,
      selfAsFriend: `You can\'t create debt with yourself, choose another friend`,
      pending: `Please resolve your pending transaction with this user before creating another`,
      insufficientEth: eth => `You need at least ${eth} ETH to settle, go to Settings to see your balance`,
    },
    fields: {
      currency: `CURRENCY`,
      amount: `AMOUNT`,
      settlementAmount: `  SETTLEMENT AMOUNT  `,
      selectFriend: `FRIEND`,
      memo: `MEMO`,
      direction: `SELECT THE CORRECT STATEMENT`,
    },
    memo: {
      example: `Type memo here`,
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
      pendingBorrowSettlementMe: settlement => `You requested that @${settlement.creditorNickname} settle in ${settlement.settlementCurrency}`,
    },
    pending: {
      success: friend => `Pending debt submitted to @${friend.nickname}`,
      error: generalCommunicationError
    },
    pendingParens: ` (pending)`,
    confirmation: {
      transaction: counterParty => `Transaction with ${counterParty} has been successfully confirmed`,
      settlement: counterParty => `Settlement with ${counterParty} has been successfully confirmed`,
      error: `Unable to confirm transaction at this time, please try again later`,
    },
    rejection: {
      success: `Transaction has been rejected`,
      error: `Unable to reject transaction at this time, please try again later`,
    },
    balances: {
      error: `Unable to load balances at this time, please try again later`,
    },
    for: memo => `for ${memo}`,
    settleUp: `SETTLE UP`,
    settleTotal: `SETTLE TOTAL`,
    settleUpMemo: (direction, amount) => direction === 'lend' ? `Settling up for ${amount}` :  `Request to settle for ${amount}`,
    recordSettleUpMemo: `settling up`,
    balanceByCurrency: `      Balance by Currency      `,
  },
  settlementManagement: {
    bilateral: {
      error: {
        insufficient: nickname => `Your settlement with ${nickname} failed due to insufficient funds`,
        generic: nickname => `There was an error processing your settlement with ${nickname}`,
      }
    },
    eth: `Settle With ETH`,
    paypal: `Settle With PayPal`,
    nonPayment: `Record a Settlement`,
  },

  accountViewLanguage: {
    lndr: `L n d r`,
    home: `Home`,
    friends: `Friends`,
    activity: `Activity`,
  },

  notifications: {
    toggleNotifications: `Toggle Notifications`,
    enable: `TURN ON`,
    disable: `TURN OFF`,
  },

  pendingTransactionsLanguage: {
    shell: `Pending Transaction`,
    title: `Pending`,
    memo: `Memo:`,
    for: `For`,
    none: `You have no pending transactions`,
    confirmationQuestion: `Are you sure you want to confirm this transaction?`,
    pendingAnnouncement: `This transaction is waiting for confirmation by the other party.`,
    bilateral: `Waiting on Eth transfer to complete`,
    confirm: `CONFIRM`,
    reject: `Reject Transaction`,
    rejectRequest: `Reject`,
    cancel: `Cancel Transaction`,
    direction: {
      lend: (nickname, amount) => `@${nickname} owes you ${amount}`,
      borrow: (nickname, amount) => `You owe @${nickname} ${amount}`,
    }
  },

  pendingSettlementsLanguage: {
    shell: `Pending Settlement`,
    title: `Pending`,
    none: `You have no pending settlements`,
    confirm: `CONFIRM`,
    reject: `Reject Settlement`,
    cancel: `Cancel Settlement`,
  },

  recentTransactionsLanguage: {
    title: `Completed`,
    none: `You have no completed transactions`,
    direction: {
      lend: (nickname, amount) => `@${nickname} owes you ${amount}`,
      borrow: (nickname, amount) => `You owe @${nickname} ${amount}`
    },
    balance: `Balance `,
    consolidatedBalance: `Consolidated Balance`,
    friends: (friends) => `(from ${friends} ${friends === 1 ? 'friend' :'friends'})`,
  },

  tabs: {
    home: `HOME `,
    friends: `FRIENDS`,
    activity: `ACTIVITY`,
  },

  confirmation: {
    shell: `Confirmation`,
    done: `DONE`,
    create: {
      start: `We've sent the record over to `,
      end: ` for confirmation.`,
    },
    confirm: {
      start: `You've confirmed this record from `,
      end: `.`,
    },
    reject: {
      start: `We've let `,
      end: ` know that you rejected this record.`,
    },
    confirmFriend: {
      start: `You are now friends with `,
      end: `!`,
    },
    rejectFriend: {
      start: `You have declined the friend request from `,
      end: `.`,
    },
    rejectOutboundFriendRequest: {
      start: `You have cancelled the friend request to `,
      end: `.`,
    },
    ethSent: {
      start: `You have successfully sent `,
      end: ` ETH and your transaction hash is `,
    },
    bcptSent: {
      start: `You have successfully sent `,
      end: ` BCPT and your transaction hash is `,
    },
    requestPayPalPayee: {
      start: `We've let `,
      end: ` know that you would like to settle with PayPal.`,
    },
    requestPayPalPayment: {
      start: `We've let `,
      end: ` know that you'd like to be paid with PayPal.`,
    },
    settledWithPayPal: {
      start: `We've let `,
      end: ` know that you've settled with PayPal.`,
    },
    status: `You can see the status of this transaction in the `,
    activity: `activity tab.`,
  },

  pendingFriendRequestsLanguage: {
    shell: `Friend Request`,
    message: `Friend Requests`,
    request: friend => `@${friend} wants to be friends with you!`,
    outbound: friend => `You sent a friend request to @${friend}`,
  },

  privacyPolicy: {
    link: `lndr.io/terms/`,
    message: `By clicking below you confirm that you have read and agree to Blockmason's privacy policy. Blockmason may use your email address to send updates about Blockmason and LNDR. Here is a link to the privacy policy:`
  },

  payPalLanguage: {
    connectPayPal: `Connect PayPal`,
    connectSuccess: `PayPal enabled successfully.`,
    disconnectPayPal: `Disconnect PayPal`,
    disconnected: `PayPal disconnected.`,
    requestPayPalPayment: `Request PayPal Payment`,
    sendWithPayPal: `Send With PayPal`,
    enablePayPal: `Enable PayPal`,
    requestPayPalPayee: `Request PayPal`,
    enablePayPalForFriend: F => `Enabling PayPal allows @${F} to pay you.`,
    friendNotEnabled: F => `@${F} has not enabled PayPal payments.`,
    friendRequestedConnect: F => `@${F} wants to pay you via PayPal`,
    requestFriendConnect: F => `You asked @${F} to enable PayPal`,
    feesNotification: `Does not include PayPal fees`,
    feesInformationHeader: `PayPal Fees Information`,
    feesInformation: `1. Your PayPal account must be tied to a bank account.
    
2. Paying in a currency different from your bank's currency will incur a $0.35 fee.

3. International transfer fees:
    U.S. to Canada/Europe: $2.99
    U.S. to anywhere else: $4.99

4. These fees are not comprehensive. For the most updated information please go to:

    https://www.paypal.com/us/webapps/mpp/paypal-fees#sending-us`,
    payPalSite: `PayPal.com`,
  }
}
