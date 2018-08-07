import { currencySymbols, transferLimits } from 'lndr/currencies'

const CUR = currencySymbols
const TL = transferLimits

const generalCommunicationError = 'Παρουσιάστηκε ένα πρόβλημα με την επικοινωνία με τον διακομιστή, δοκιμάστε ξανά αργότερα.'

export default {

  applicationName: `Lndr`,
  helloWorld: `Γεια σου Κόσμε`,
  submit: `YΠΟΒΟΛΗ`,
  next: `Επόμενο`,
  cancel: `Ακύρωση`,
  back: `Επιστροφή`,
  copy: `Αντιγραφή στο πρόχειρο`,
  confirmAccount: `Επιβεβαίωση`,
  createAccount: `Δημιουργία Λογαριασμού`,
  recoverAccount: `Επαναφορά Λογαριασμού`,
  removeAccount: `Κατάργηση Λογαριασμού`,
  updateAccount: `Ενημέρωση Λογαριασμού`,
  loginAction: `Ξεκλείδωμα`,
  enterPin: `ΠΑΡΑΚΑΛΟYΜΕ ΕΙΣΑΓΕΤΕ ΤΟ PIN ΣΑΣ`,
  changePin: `Αλλαγή PIN`,
  enterCurrentPin: `Εισαγωγή Τρέχοντος PIN`,
  logoutAction: `ΑΠΟΣYΝΔΕΣΗ`,
  seeAllActivity: `Δείτε Όλα τη Δραστηριότητα`,
  copiedClipboard: `Αντιγράφηκε στο Πρόχειρο`,
  pleaseWait: `Παρακαλούμε Περιμένετε`,
  addFriend: `Προσθήκη Φίλου`,
  addFriendConfirmationQuestion: `Είστε σίγουροι ότι θέλετε να προσθέσετε αυτόν το χρήστη ως φίλο;`,
  removeFriend: `Αφαίρεση Φίλου`,
  currentFriends: `Τρέχοντες Φίλοι`,
  removeFriendConfirmationQuestion: `Είστε βέβαιοι ότι θέλετε να αφαιρέσετε τον χρήστη αυτόν από φίλο;`,
  inviteFriends: `Προσκαλέστε Φίλους στο Lndr`,
  tryLndr: `Δοκιμάστε την εφαρμογή Lndr εδώ:`,
  friendInfo: `Περισσότερες πληροφορίες σχετικά με την φιλία αυτή:`,
  noFriends: `Προσθέστε μερικούς φίλους για να ξεκινήσετε!`,
  noMatches: `Δεν βρέθηκαν χρήστες που να ταιριάζουν`,
  noBalances: `Δεν έχετε καταγεγραμμένα χρέη`,
  addFriendButton: `Προσθήκη Φίλου`,
  alreadyFriendsButton: `Φίλοι`,
  friendShell: `Φίλος`,
  tip: `Συμβουλή:`,
  notice: `Ειδοποίηση:`,
  welcome: `Καλώς ήρθατε στο LNDR σας`,
  noBalanceWarning: `Δεν μπορέσαμε να φορτώσουμε το υπόλοιπο των χρημάτων σας αυτή τη στιγμή, δοκιμάστε ξανά αργότερα.`,
  totalBalance: `Σύνολο Yπόλοιπο:`,
  totalBalances: `Σύνολο Αντισυμβαλλόμενων:`,
  newTransaction: `Νέα Συναλλαγή`,
  needsReview: `Εν αναμονή Έγκρισης`,
  owesMe: `Μου οφείλουν`,
  iOwe: `Χρωστάω σε κάποιον`,
  newPassword: `Νέο Συνθηματικό (τουλάχιστον 8 χαρακτήρες)`,
  confirmPassword: `Επιβεβαίωση Συνθηματικού`,
  newPin: `Νέα 4-ψήφιο PIN`,
  enterNewPin: `ΠΑΡΑΚΑΛΟYΜΕ ΔΩΣΤΕ ΕΝΑ ΝΕΟ ΤΕΤΡΑΨΗΦΙΟ PIN`,
  confirmPin: `ΠΑΡΑΚΑΛΟYΜΕ ΕΠΙΒΕΒΑΙΩΣΤΕ ΤΟ PIN ΣΑΣ`,
  newAccount: `Δημιουργήστε έναν νέο λογαριασμό`,
  loginAccount: `Ξεκλειδώστε τον λογαριασμό σας`,
  recoverExistingAccount: `Ανάκτηση υπάρχοντος λογαριασμού`,
  recoverMnemonic: `Μνημονικό (12 λέξεις που εμφανίστηκαν \ nμόλις δημιουργήσατε τον λογαριασμό σας)`,
  recoverMnemonicLengthError: `Το μνημονικό πρέπει να είναι ακριβώς 12 λέξεις`,
  successTitle: `Επιτυχία`,
  errorTitle: `Σφάλμα`,
  showMnemonic: `Εμφάνιση Μνημονικού 12 Λέξεων`,
  mnemonicExhortation: `Αυτή η φράση 12 λέξεων είναι απαραίτητη για την αποκατάσταση του λογαριασμού σας, παρακαλούμε κρατήστε την σε ασφαλές μέρος και μυστική`,
  addressExhortation: `Αποστολή Ethereum στη διεύθυνσή σας, ώστε να μπορείτε να εξοφλήσετε όσα οφείλετε στο Lndr`,
  removeAccountTitle: `Είστε βέβαιοι ότι θέλετε να καταργήσετε το λογαριασμό σας από αυτήν τη συσκευή;`,
  removeAccountExhortation: `Βεβαιωθείτε ότι έχετε πρόσβαση στο μνημονικό σας για να επαναφέρετε το λογαριασμό σας αργότερα, καθώς πρόκειται για μόνιμη αφαίρεση των στοιχείων του λογαριασμού σας από αυτήν τη συσκευή.`,
  myAccount: `Ο Λογαριασμός μου`,
  setNickname: `Ορίστε ένα ψευδώνυμο, ώστε οι φίλοι σας να μπορούν να σας αναζητήσουν`,
  setEmail: `Ορίστε ένα email για να λαμβάνετε πληροφορίες σχετικά με ενημερώσεις του Lndr`,
  nickname: `Ψευδώνυμο (πεζά & αριθμοί)`,
  email: `Διεύθυνση Ηλεκτρονικού Ταχυδρομείου`,
  accountManagement: {
    nickname: {
      lengthViolation: `Το ψευδώνυμο πρέπει να είναι τουλάχιστον 3 χαρακτήρες.`,
      compositionViolation: `Το ψευδώνυμο μπορεί να περιέχει μόνο αριθμούς και πεζά γράμματα.`,
      duplicationViolation: `Το ψευδώνυμο χρησιμοποιείται ήδη`,
    },
    email: {
      compositionViolation: `Η μορφή του email είναι εσφαλμένη`,
      duplicationViolation: `Το εmail χρησιμοποιείται ήδη`,
    },
    pin: {
      lengthViolation: `Το PIN πρέπει να είναι τουλάχιστον 4 χαρακτήρες.`,
      matchViolation: `Τα PIN θα πρέπει να ταιριάζουν.`,
      failedHashComparison: `PIN δεν είναι έγκυρο, παρακαλούμε δοκιμάστε ξανά.`,
      updateSuccess: `Το PIN σας δεν έχει ενημερωθεί`,
      updateError: `Παρουσιάστηκε σφάλμα κατά την ενημέρωση του PIN σας`,
    },
    mnemonic: {
      lengthViolation: `Το μνημονικό θα πρέπει να έχουν τουλάχιστον 12 λέξεις.`,
      unableToValidate: `Το μνημονικό που δώσατε δεν είναι έγκυρο, παρακαλούμε δοκιμάστε ξανά.`,
    },
    setNickname: {
      success: `Το ψευδώνυμό σας αποθηκεύτηκε.`,
      error: generalCommunicationError
    },
    setEmail: {
      success: `Το email σας αποθηκεύτηκε.`,
      error: generalCommunicationError
    },
    lockTimeout: {
      top: `Πρέπει να εισάγετε το PIN σας μετά`,
      bottom: `λεπτά αδράνειας`,
      update: `Ενημέρωση`,
      error: `Δεν ήμασταν σε θέση να ενημερώσουμε τις ρυθμίσεις του λογαριασμού σας`,
      success: `Η Λήξη Κλειδώματος Ενημερώθηκε`,
    },
    addFriend: {
      success: X => `Αίτημα Φιλίας εσταλεί σε @${X}`,
      error: generalCommunicationError
    },
    removeFriend: {
      success: X => `Αφαιρέθηκε από τους φίλους: @${X}`,
      error: generalCommunicationError
    },
    loadInformation: {
      error: generalCommunicationError
    },
    ethBalance: {
      display: Y => `Το υπόλοιπο ETH σας είναι ${String(Y).slice (0,8)}`,
      getError: `Αδυναμία ενημέρωσης υπολοίπου Eth`,
      manage: `Διαχείριση ETH`,
    },
    sendEth: {
      error: {
        insufficient: `Δεν έχετε αρκετά ETH για τη συναλλαγή αυτή`,
        generic: `Παρουσιάστηκε κάποιο σφάλμα κατά τη μεταφορά, παρακαλούμε δοκιμάστε ξανά αργότερα`,
        address: `Παρακαλώ εισάγετε μια έγκυρη διεύθυνση`,
        amount: `Παρακαλώ εισάγετε ένα ποσό μεγαλύτερο από 0`,
        limitExceeded: A => `Μπορείτε να στείλετε μόνο ${CUR(A)} ${TL(A)} ανά εβδομάδα, παρακαλούμε επιλέξτε ένα μικρότερο ποσό`,
      },
      amount: `Ποσό προς Αποστολή`,
      address: `Διεύθυνση Προορισμού (χωρίς πρόθεμα «0x»)`,
      transfer: `Μεταφορά ETH`,
      transferAll: `Μεταφορά όλων`,
      balance: Y => `Το τρέχον υπόλοιπο ETH σας είναι ${typeof Y ==='string' ? Y.slice (0,8): ''} `,
      ethAddress: `Διεύθυνση Ethereum`,
      txCost: (Β, A) => `Το τρέχον κόστος συναλλαγής είναι ${CUR(A)}${Β}`,
      transferLowercase: `Μεταφορά Eth`,
      note: A => `Παρακαλώ σημειώστε: μπορείτε να μεταφέρετε μόνο ${CUR(A)}${TL(A)} την εβδομάδα εκτός Lndr`,
      warning: (Z, A) => `Έχετε ${CUR(A)} ${Z} υπόλοιπο ${CUR(A)} ${TL(A)} στο όριό σας`,
    },
    sendBcpt: {
      error: {
        insufficient: `Δεν έχετε αρκετά BCPT για τη συναλλαγή αυτή`,
        generic: `Παρουσιάστηκε κάποιο σφάλμα κατά τη μεταφορά, δοκιμάστε ξανά αργότερα`,
      },
      transfer: `Μεταφορά BCPT`,
      address: `Διεύθυνση Προορισμού (χωρίς πρόθεμα «0x»)`,
      balance: Y => `Το τρέχον υπόλοιπο BCPT σας είναι ${typeof Y === 'string' ? Y.slice (0,8): ''} `,
      bcptAddress: `Διεύθυνση BCPT`,
    },
    changeProfilePic: `Πατήστε για Αλλαγή`,
    addProfilePic: `Χρησιμοποιήστε Εικόνα από το Τηλέφωνο`,
    panelHeaders: [
      `Διεύθυνση ETH (& BCPT)`,
      `Yπόλοιπο ETH`,
      `Yπόλοιπο BCPT`,
      `Κατάργηση Λογαριασμού`,
      `Ιστορικό Συναλλαγών ETH`,
      `Ενεργοποίηση PayPal`,
      `Αλλαγή Πρωτοβάθμια νομίσματος`,
      `Αλλαγή PIN`,
      `Αλλαγή Ψευδώνυμου`,
      `Αλλαγή Email`,
      `Αλλαγή Φωτογραφίας Προφίλ`,
      `Αλλαγή Λήξης Κλειδώματος`,
      `Μνημονικό`,
      `Ειδοποιήσεις`,
    ],
    viewEtherscan: `Δείτε το ιστορικό Etherscan`,
    profilePic: {
      change: `Αλλαγή Φωτογραφίας Προφίλ`,
      setError: `Yπήρξε ένα σφάλμα κατά τη ανέβασμα της εικόνας σας, παρακαλούμε δοκιμάστε ξανά αργότερα`,
      getError: `Παρουσιάστηκε κάποιο σφάλμα κατά την ανάκτηση της φωτογραφίας του προφίλ σας`,
      setSuccess: `Ενημερώθηκε η εικόνα του προφίλ σας`,
    },
    logoutSuccess: `Έχετε αποσυνδεθεί με επιτυχία!`,
    logoutError: generalCommunicationError,
  },

  currentBalance: {
    eth: `Το τρέχον υπόλοιπό σας Eth είναι:`,
    bcpt: `Το τρέχον υπόλοιπό σας BCPT είναι:`,
  },

  welcomeView: {
    by: `ΚΑΤΑΣΚΕYΑΣΜΕΝΟ ΑΠΟ`,
    makeItEasy: `Το Lndr κάνει εύκολη την καταγραφή απλών χρεών`,
    weHelpFriends: `Βοηθάμε φίλους να ζουν, να εργάζονται και να παίζουν μαζί.`,
    len: `Len`,
    dot: `.`,
    der: `der`,
    shareDinner: `Μοιραστείτε Δείπνο`,
    fillTank: `Βάλτε Καύσιμα`,
    travelTogether: `Ταξιδέψτε Μαζί`,
    runEthereum: `Λειτουργούμε με ETH!`,
    firstLendingApp: `Η πρώτη εφαρμογή για δανεισμό από κινητό με την ασφάλεια της blockchain.`,
    greatConcert: `Παρακολουθήστε μια Μεγάλη Συναυλία`,
    youPlayWithFriends: `Παίζετε με φίλους;\n θα κρατήσουμε την καρτέλα...`,
    start: `Ξεκινήστε`,
  },

  debtManagement: {
    shell: `Νέα Συναλλαγή`,
    add: `Προσθήκη Χρέους`,
    selectFriend: `Επιλέξτε`,
    lend: `Νέο Δάνειο`,
    borrow: `Νέο Χρέος`,
    iLent: `Ένας φίλος μου χρωστάει`,
    iBorrowed: `Χρωστάω σε έναν φίλο`,
    settleUpLower: `Διακανονισμός`,
    amountToSettle: `Ποσό προς διακανονισμό`,
    total: `Σύνολο`,
    record: `καταγραφή`,
    records: `καταγραφές`,
    chooseCurrency: `Επιλέξτε ένα νόμισμα`,

    createError: {
      amountTooLow: `Το ποσό πρέπει να είναι μεγαλύτερο από $0`,
      amountTooHigh: `Το ποσό πρέπει να είναι μικρότερο από $1.000.000.000`,
      selfAsFriend: `Δεν μπορείτε να δημιουργήσετε το χρέος με τον εαυτό σας, επιλέξτε κάποιον άλλο φίλο`,
      pending: `Παρακαλούμε επιλύστε την εκκρεμή σας συναλλαγή με τον χρήστη αυτόν πριν τη δημιουργία κάποιας άλλης`,
      insufficientEth: E => `Θα χρειαστείτε τουλάχιστον ${E} ETH για διακανονισμό, μεταβείτε στις Ρυθμίσεις για να δείτε το υπόλοιπό σας`,
    },
    fields: {
      currency: `Νόμισμα`,
      amount: `Ποσό`,
      settlementAmount: `Ποσό Διακανονισμού`,
      selectFriend: `Φίλος`,
      memo: `Σημείωμα`,
      direction: `Επιλέξτε την Σωστή Κατάσταση`,
    },
    memo: {
      example: `Τύπος σημείωσης εδώ`,
    },
    direction: {
      lend: X => `${X} μου χρωστάει`,
      borrow: X => `Οφείλω σε ${X}`,
      initiatedLend: X => `${X} λέει μου χρωστά`,
      initiatedBorrow: X => `${X} λέει χρωστάμε`,
      pendingLend: X => `@${X} σου χρωστά`,
      pendingBorrow: X => `Xρωστάτε @${X}`,
      pendingLendSettlement: S => `@${S.debtorNickname} ζητά διακανονισμό σε ${S.settlementCurrency}`,
      pendingBorrowSettlement: S => `@${S.creditorNickname} θέλει να πραγματοποιήσει διακανονισμό μαζί σας σε ${S.settlementCurrency}`,
      pendingLendSettlementMe: S => `Zητήσατε να πραγματοποιήσετε διακανονισμό με @${S.debtorNickname} σε ${S.settlementCurrency}`,
      pendingBorrowSettlementMe: S => `Zητήσατε από @${S.creditorNickname} διακανονισμό σε ${S.settlementCurrency}`,
    },
    pending: {
      success: F => `Το υπόλοιπο του χρέους εστάλη σε @${F.nickname}`,
      error: generalCommunicationError
    },
    pendingParens: `(σε εκκρεμότητα)`,
    confirmation: {
      transaction: CP => `Η συναλλαγή με ${CP} επιβεβαιώθηκε με επιτυχία`,
      settlement: CP => `Ο διακανονισμού με ${CP} επιβεβαιώθηκε με επιτυχία`,
      error: `Αδυναμία επιβεβαίωσης της συναλλαγής αυτή τη στιγμή, παρακαλούμε δοκιμάστε ξανά αργότερα`,
    },
    rejection: {
      success: `Η συναλλαγή απορρίφθηκε`,
      error: `Αδυναμία απόρριψης συναλλαγής αυτή τη στιγμή, δοκιμάστε ξανά αργότερα`,
    },
    balances: {
      error: `Αδυναμία φόρτωσης υπολοίπου αυτή τη στιγμή, δοκιμάστε ξανά αργότερα`,
    },
    for: M => `για ${M}`,
    settleUp: `Διακανονισμός`,
    settleTotal: `Σύνολο Διακανονισμού`,
    settleUpMemo: (D, A) => `${D === 'lend' ? 'Διακανονισμός για': 'Αίτηση διακανονισμού για'} ${A}`,
    recordSettleUpMemo: `Γίνεται διακανονισμός`,
    balanceByCurrency: `Λεπτομέριες`,
  },
  settlementManagement: {
    bilateral: {
      error: {
        insufficient: X => `Ο διακανονισμός σας με ${X} απέτυχε λόγω ανεπαρκούς ποσού`,
        generic: X => `Παρουσιάστηκε κάποιο σφάλμα κατά την επεξεργασία του διακανονισμού σας με ${X}`,
      }
    },
    eth: `Διακανονισμός Με ETH`,
    paypal: `Διακανονισμός Με PayPal`,
    nonPayment: `Καταγράψτε έναν Διακανονισμό`,
  },

  accountViewLanguage: {
    lndr: `L n d r`,
    home: `Σπίτι`,
    friends: `Φίλοι`,
    activity: `Δραστηριότητα`,
  },

  notifications: {
    toggleNotifications: `Εναλλαγή Ειδοποιήσεων`,
    enable: `Ενεργοποίηση`,
    disable: `Απενεργοποίηση`,
  },

  pendingTransactionsLanguage: {
    shell: `Συναλλαγή σε Εκκρεμότητα`,
    title: `Σε εκκρεμότητα`,
    memo: `Σημείωση:`,
    for: `Για`,
    none: `Δεν διαθέτετε εκκρεμείς συναλλαγές`,
    confirmationQuestion: `Σίγουρα θέλετε να επιβεβαιώσει αυτή τη συναλλαγή;`,
    pendingAnnouncement: `Η συναλλαγή αυτή βρίσκεται σε αναμονή προς επιβεβαίωση από το άλλο μέρος.`,
    bilateral: `Αναμονή μεταφοράς Eth για ολοκλήρωση`,
    confirm: `Επιβεβαίωση`,
    reject: `Απόρριψη Συναλλαγής`,
    rejectRequest: `Απόρριψη`,
    cancel: `Ακύρωση Συναλλαγής`,
    direction: {
      lend: (X, Z) => `@${X} σας χρωστάει ${Z}`,
      borrow: (X, Z) => `Xρωστάτε @${X} ${Z}`,
    }
  },

  pendingSettlementsLanguage: {
    shell: `Διακανονισμός σε εκκρεμότητα`,
    title: `Σε εκκρεμότητα`,
    none: `Δεν διαθέτετε διακανονισμούς σε εκκρεμότητα`,
    confirm: `Επιβεβαίωση`,
    reject: `Απόρριψη Διακανονισμού`,
    cancel: `Ακύρωση Διακανονισμού`,
  },

  recentTransactionsLanguage: {
    title: `Ολοκληρώθηκε`,
    none: `Δεν διαθέτετε ολοκληρωμένες συναλλαγές`,
    direction: {
      lend: (X, Z) => `Ο/Η @${X} σας χρωστάει ${Z}`,
      borrow: (X, Z) => `Xρωστάτε @${X} ${Z}`
    },
    balance: `Yπόλοιπο`,
    consolidatedBalance: `Yπόλοιπο`,
    friends: FS => `(από ${FS} ${FS === 1 ? 'φίλος' :'φίλοι'})`,
  },

  tabs: {
    home: `Σπίτι `,
    friends: `Φίλοι`,
    activity: `Δραστηριότητα`,
  },

  confirmation: {
    shell: `Επιβεβαίωση`,
    done: `Έγινε`,
    create: {
      start: `Στείλαμε την καταγραφή στον `,
      end: ` προς επιβεβαίωση.`,
    },
    confirm: {
      start: `Επιβεβαιώσαμε την καταγραφή από τον `,
      end: `.`,
    },
    reject: {
      start: `Ενημερώσαμε τον `,
      end: ` ότι απορρίψατε την καταγραφή αυτή.`,
    },
    confirmFriend: {
      start: `Είστε τώρα φίλοι με τον `,
      end: `!`,
    },
    rejectFriend: {
      start: `Έχετε απορρίψει το αίτημα φιλίας του `,
      end: `.`,
    },
    ethSent: {
      start: `Έχετε στείλει με επιτυχία `,
      end: ` ETH και το hash της συναλλαγής σας είναι `,
    },
    bcptSent: {
      start: `Έχετε στείλει με επιτυχία `,
      end: ` BCPT και το hash της συναλλαγής σας είναι `,
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
    status: `Μπορείτε να δείτε την κατάσταση της συναλλαγής στην `,
    activity: `καρτέλα δραστηριότητας.`,
  },

  pendingFriendRequestsLanguage: {
    shell: `Αίτημα Φιλίας`,
    message: `Αιτήματα φιλίας`,
    request: F => `Ο/Η @${F} θέλει να γίνετε φίλοι!`,
  },

  privacyPolicy: {
    link: `lndr.io/terms/`,
    message: `Κάνοντας κλικ παρακάτω, επιβεβαιώνετε ότι έχετε διαβάσει και συμφωνήσετε με την πολιτική απορρήτου της Blockmason. Το Blockmason μπορεί να χρησιμοποιήσει τη διεύθυνση ηλεκτρονικού ταχυδρομείου σας για να στείλει ενημερώσεις σχετικά με το Blockmason και το LNDR. Ακολουθεί ένας σύνδεσμος προς την πολιτική απορρήτου μας:`
  },

  payPalLanguage: {
    connectPayPal: `Συνδέστε το PayPal`,
    connectSuccess: `PayPal ενεργοποιηθεί με επιτυχία.`,
    disconnectPayPal: `Αποσύνδεση PayPal`,
    disconnected: `PayPal αποσυνδεθεί.`,
    requestPayPalPayment: `Αίτηση PayPal Πληρωμή`,
    sendWithPayPal: `Αποστολή με PayPal`,
    enablePayPal: `Ενεργοποίηση PayPal`,
    requestPayPalPayee: `Ζητήστε PayPal`,
    enablePayPalForFriend: F => `Η ενεργοποίηση PayPal επιτρέπει @${F} για να πληρώσει you.`,
    friendNotEnabled: F => `@${F} δεν έχει ενεργοποιηθεί PayPal πληρωμές.`,
    friendRequestedConnect: F => `@${F} θέλει να σας πληρώσει μέσω PayPal`,
    requestFriendConnect: F => `Θα ζητηθεί @${F} για να ενεργοποιήσετε PayPal`,
    feesNotification: `Δεν περιλαμβάνονται αμοιβές PayPal`,
    feesInformationHeader: `PayPal Τέλη πληροφορίες`,
    feesInformation: `1. Ο λογαριασμός σας PayPal πρέπει να συνδέεται με έναν τραπεζικό λογαριασμό.
    
2. Πληρωμή σε νόμισμα διαφορετικό από το νόμισμα της τράπεζάς σας θα υποστούν ένα πρόστιμο $ 0,35.
    
3. Διεθνής τέλη μεταφοράς:
    ΗΠΑ στον Καναδά / Ευρώπης: $ 2.99
    ΗΠΑ για να οπουδήποτε αλλού: $ 4.99
    
4. Τα τέλη αυτά δεν είναι ολοκληρωμένη. Για τις πιο πρόσφατες πληροφορίες, παρακαλούμε επισκεφθείτε την ιστοσελίδα:

    https://www.paypal.com/us/webapps/mpp/paypal-fees#sending-us`,
    payPalSite: `PayPal.com`,
  }
}
