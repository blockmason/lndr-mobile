import { currencies, transferLimits } from 'language'

const CUR = currencies
const TL = transferLimits

const generalCommunicationError = 'There was a problem communicating with the server, please try again later.'

export default {

  applicationName: `Lndr`,
  helloWorld: `Γειά σου Κόσμε`,
  submit: `ΥΠΟΒΑΛΛΟΥΝ`,
  next: `Επόμενο`,
  cancel: `Ματαίωση`,
  back: `Πήγαινε πίσω`,
  copy: `Αντιγραφή στο πρόχειρο`,
  confirmAccount: `Επιβεβαιώνω`,
  createAccount: `Δημιουργήστε λογαριασμό`,
  recoverAccount: `Επαναφορά του λογαριασμού`,
  removeAccount: `Κατάργηση Λογαριασμού`,
  updateAccount: `Αναβάθμιση λογαριασμού`,
  loginAction: `Ξεκλείδωμα`,
  enterPin: `Παρακαλώ εισάγετε το PIN`,
  changePin: `Αλλαγή PIN`,
  enterCurrentPin: `Enter Current PIN`,
  logoutAction: `ΑΠΟΣΥΝΔΕΣΗ`,
  seeAllActivity: `Δείτε Όλα Δραστηριότητα`,
  copiedClipboard: `Αντιγράφηκε στο πρόχειρο`,
  pleaseWait: `Παρακαλώ περιμένετε`,
  addFriend: `Προσθήκη φίλου`,
  addFriendConfirmationQuestion: `Είστε σίγουροι ότι θέλετε να προσθέσετε αυτό το χρήστη ως φίλο;`,
  removeFriend: `Κατάργηση φίλο`,
  currentFriends: `Τρέχουσα Φίλοι`,
  removeFriendConfirmationQuestion: `Είστε βέβαιοι ότι θέλετε να καταργήσετε αυτόν το χρήστη ως φίλο;`,
  inviteFriends: `Προσκαλέστε τους φίλους για να Lndr`,
  tryLndr: `Ελέγξτε την Lndr App εδώ:`,
  friendInfo: `Περισσότερες πληροφορίες σχετικά με αυτήν τη φιλία:`,
  noFriends: `Προσθέστε μερικούς φίλους για να ξεκινήσετε!`,
  noMatches: `Δεν χρήστες που ταιριάζουν βρέθηκαν`,
  noBalances: `Δεν έχετε εγγραφεί χρέη`,
  addFriendButton: `Προσθήκη φίλου`,
  alreadyFriendsButton: `Οι φιλοι`,
  friendShell: `Φίλος`,
  tip: `Υπόδειξη:`,
  notice: `Ειδοποίηση:`,
  welcome: `Καλώς ήρθατε στο LNDR σας`,
  noBalanceWarning: `Δεν ήταν σε θέση να φορτώσει την ισορροπία σας αυτή τη στιγμή, δοκιμάστε ξανά αργότερα.`,
  totalBalance: `Σύνολο Υπόλοιπο:`,
  totalBalances: `Σύνολο αντισυμβαλλόμενοι:`,
  newTransaction: `νέα συναλλαγών`,
  needsReview: `ανάγκες κριτική`,
  owesMe: `Είμαι οφείλεται`,
  iOwe: `Xρωστάω σε κάποιον`,
  newPassword: `Νέος κωδικός πρόσβασης (τουλάχιστον 8 χαρακτήρες)`,
  confirmPassword: `Επιβεβαίωση Κωδικού`,
  newPin: `Νέα 4-ψήφιο PIN`,
  enterNewPin: `Παρακαλούμε ρυθμίστε ένα νέο PIN 4 ψηφίων`,
  confirmPin: `ΑΠΑΡΑΙΤΗΤΟΣ PIN ΣΑΣ`,
  newAccount: `Δημιούργησε νέο λογαριασμό`,
  loginAccount: `Ξεκλειδώστε το λογαριασμό σας`,
  recoverExistingAccount: `Ανάκτηση έναν υπάρχοντα λογαριασμό`,
  recoverMnemonic: `Μνημονική (12 λέξεις που εμφανίζονται \ nΜόλις οι δημιουργήσατε τον λογαριασμό σας)`,
  recoverMnemonicLengthError: `Μνημονική πρέπει να είναι ακριβώς 12 λέξεις`,
  successTitle: `Επιτυχία`,
  errorTitle: `Λάθος`,
  showMnemonic: `Εμφάνιση 12-Word Συντόμευση`,
  mnemonicExhortation: `Αυτή η φράση 12 λέξεων είναι απαραίτητη για την αποκατάσταση του λογαριασμού σας, παρακαλούμε κρατήστε το σε ασφαλές μέρος και μυστικές`,
  addressExhortation: `Αποστολή Ethereum στη διεύθυνσή σας, ώστε να μπορείτε να εξοφλήσει τα χρέη για Lndr`,
  removeAccountTitle: `Είστε βέβαιοι ότι θέλετε να καταργήσετε το λογαριασμό σας από αυτήν τη συσκευή;`,
  removeAccountExhortation: `Να είστε βέβαιος ότι έχετε πρόσβαση στο μνημονικό σας για να επαναφέρετε το λογαριασμό σας αργότερα, καθώς αυτό είναι μια μόνιμη αφαίρεση των στοιχείων του λογαριασμού σας από αυτήν τη συσκευή.`,
  myAccount: `Ο λογαριασμός μου`,
  setNickname: `Ορίστε ένα ψευδώνυμο, ώστε οι φίλοι σας να αναζητήσετε σας`,
  setEmail: `Ορίστε ένα e-mail για να λαμβάνετε πληροφορίες σχετικά με ενημερώσεις Lndr`,
  nickname: `Ψευδώνυμο (πεζά & αριθμοί)`,
  email: `Διεύθυνση ηλεκτρονικού ταχυδρομείου`,
  accountManagement: {
    nickname: {
      lengthViolation: `Ψευδώνυμο πρέπει να είναι τουλάχιστον 3 χαρακτήρες.`,
      compositionViolation: `Ψευδώνυμο μπορεί να περιέχει μόνο αριθμούς και κεφαλαία γράμματα.`,
      duplicationViolation: `Ψευδώνυμο έχει ήδη ληφθεί`,
    },
    email: {
      compositionViolation: `μορφή ηλεκτρονικού ταχυδρομείου είναι εσφαλμένη`,
      duplicationViolation: `Email έχει ήδη ληφθεί`,
    },
    pin: {
      lengthViolation: `PIN πρέπει να είναι τουλάχιστον 4 χαρακτήρες.`,
      matchViolation: `Τα PIN θα πρέπει να ταιριάζουν.`,
      failedHashComparison: `PIN δεν είναι έγκυρο, δοκιμάστε ξανά.`,
      updateSuccess: `Ο κωδικός PIN σας έχει ενημερωθεί`,
      updateError: `Παρουσιάστηκε σφάλμα κατά την ενημέρωση του PIN σας`,
    },
    mnemonic: {
      lengthViolation: `Μνημονική θα πρέπει να έχουν τουλάχιστον 12 λέξεις.`,
      unableToValidate: `Η τέθηκε μνημονική δεν ήταν έγκυρη, δοκιμάστε ξανά.`,
    },
    setNickname: {
      success: `Το ψευδώνυμό σας έχει αποθηκευτεί.`,
      error: generalCommunicationError
    },
    setEmail: {
      success: `Το email σας έχει αποθηκευτεί.`,
      error: generalCommunicationError
    },
    lockTimeout: {
      top: `Πρέπει να εισάγετε το PIN σας μετά`,
      bottom: `λεπτά αδράνειας`,
      update: `Εκσυγχρονίζω`,
      error: `Ήμασταν σε θέση να ενημερώσετε τις ρυθμίσεις του λογαριασμού σας`,
      success: `Lock Timeout Ενημέρωση`,
    },
    addFriend: {
      success: X => `Πρόσκληση Φιλίας αποσταλεί @${X}`,
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
      display: Υ => `ισορροπία ETH σας είναι ${String (Υ) .slice (0,8)}`,
      inFiat: (Z, B, A) => ` (${CUR[A]}${String(Number(Z) * Number(B)).slice(0, 8)})`,
      getError: `Δεν είναι δυνατή η ανάκτηση ισορροπίας Εθ`,
      manage: `Διαχείριση ETH`,
    },
    sendEth: {
      error: {
        insufficient: `Η μεταφορά απέτυχε λόγω ανεπαρκούς υπολοίπου`,
        generic: `Παρουσιάστηκε σφάλμα με τη μεταφορά, δοκιμάστε ξανά αργότερα`,
        address: `Παρακαλώ εισάγετε μια έγκυρη διεύθυνση`,
        amount: `Παρακαλώ εισάγετε ένα ποσό μεγαλύτερο από 0`,
        limitExceeded: Α => `Μπορείτε να στείλετε μόνο ${CUR [Α]} ${TL [Α]} την εβδομάδα, επιλέξτε ένα μικρότερο ποσό-`,
      },
      amount: `Ποσό Αποστολή`,
      address: `Προορισμός Διεύθυνση (χωρίς πρόθεμα '0x')`,
      transfer: `ETH μεταφορά`,
      transferAll: `μεταφέρετε τα πάντα`,
      balance: Y => `τρέχον υπόλοιπο ETH σας είναι ${typeof Y === 'string' ? Y.slice (0,8): ''} `,
      ethAddress: `Ethereum Διεύθυνση`,
      txCost: (Β, Α) => `Το τρέχον κόστος συναλλαγής είναι ${CUR [Α]} ${Β}`,
      transferLowercase: `Μεταφορά Εθ`,
      note: Α => `Παρακαλώ σημειώστε: μπορείτε να μεταφέρετε μόνο ${CUR [Α]} ${TL [Α]} την εβδομάδα από Lndr`,
      warning: (Z, Α) => `Έχετε ${CUR [Α]} ${Z} υπόλοιπο των $ σας {CUR [Α]} ${TL [Α]} limit`,
    },
    sendBcpt: {
      error: {
        insufficient: `Δεν έχετε αρκετό BCPT για αυτή τη συναλλαγή`,
        generic: `Παρουσιάστηκε σφάλμα με τη μεταφορά, δοκιμάστε ξανά αργότερα`,
      },
      transfer: `BCPT μεταφορά`,
      address: `Προορισμός Διεύθυνση (χωρίς πρόθεμα '0x')`,
      balance: Y => `τρέχον υπόλοιπο BCPT σας είναι ${typeof Y === 'string' ? Y.slice (0,8): ''} `,
      bcptAddress: `BCPT Διεύθυνση`,
    },
    changeProfilePic: `Πατήστε για να αλλάξετε`,
    addProfilePic: `Xρησιμοποιήστε Εικόνα από το τηλέφωνο`,
    panelHeaders: [
      `ETH (& BCPT) Διεύθυνση`,
      `Υπόλοιπο ETH`,
      `BCPT Υπόλοιπο`,
      `Ιστορικό συναλλαγών ETH`,
      `Αλλαγή PIN`,
      `Αλλαγή Ψευδώνυμο`,
      `Αλλαγή Email`,
      `Αλλαγή φωτογραφίας προφίλ`,
      `Αλλαγή Lock Timeout`,
      `Μνημονικός`,
      `Ειδοποιήσεις`,
    ],
    viewEtherscan: `Δείτε Etherscan Ιστορία`,
    profilePic: {
      change: `Αλλαγή φωτογραφίας προφίλ`,
      setError: `Υπήρξε ένα σφάλμα κατά τη μεταφόρτωση της εικόνας σας, δοκιμάστε ξανά αργότερα`,
      getError: `Παρουσιάστηκε σφάλμα κατά την ανάκτηση φωτογραφία του προφίλ σας`,
      setSuccess: `Εικόνα προφίλ ενημερώθηκε`,
    },
    logoutSuccess: `Έχετε επιτυχία αποσυνδεθεί!`,
  },

  currentBalance: {
    eth: `τρέχον υπόλοιπο Εθν σας είναι:`,
    bcpt: `τρέχον υπόλοιπο BCPT σας είναι:`,
  },

  welcomeView: {
    by: `XΤΙΣΜΕΝΟ ΑΠΟ`,
    makeItEasy: `Lndr καθιστά εύκολο να παρακολουθείτε απλά χρέη`,
    weHelpFriends: `Βοηθάμε τους φίλους ζουν, εργάζονται και παίζουν μαζί.`,
    len: `Len`,
    dot: `.`,
    der: `der`,
    shareDinner: `Μοιραστείτε Δείπνο`,
    fillTank: `Συμπληρώστε δεξαμενή σας`,
    travelTogether: `Ταξιδέψτε μαζί`,
    runEthereum: `Τρέχουμε στο ETH!`,
    firstLendingApp: `Η πρώτη εφαρμογή για κινητά δανείων που εξασφαλίζονται από την blockchain.`,
    greatConcert: `Δείτε μια μεγάλη συναυλία`,
    youPlayWithFriends: `Μπορείτε να παίξετε με τους φίλους σας? \ N θα κρατήσει την καρτέλα ...`,
    start: `Ξεκίνα`,
  },

  debtManagement: {
    shell: `νέα συναλλαγών`,
    add: `Προσθήκη χρέους`,
    selectFriend: `Επιλέγω`,
    lend: `νέο δάνειο`,
    borrow: `νέα χρέους`,
    iLent: `Ένας φίλος μου χρωστάει`,
    iBorrowed: `Xρωστάω ένα φίλο`,
    settleUpLower: `Εγκαθίσταμαι`,
    amountToSettle: `Ποσό σε Settle`,
    total: `Σύνολο`,
    record: `Ρεκόρ`,
    records: `αρχεία`,
    createError: {
      amountTooLow: `Το ποσό πρέπει να είναι μεγαλύτερη από $ το 0`,
      amountTooHigh: `Το ποσό πρέπει να είναι λιγότερο από $ 1,000,000,000`,
      selfAsFriend: `Δεν μπορείτε να δημιουργήσετε το χρέος με τον εαυτό σας, επιλέξτε ένα άλλο φίλο`,
      pending: `Παρακαλείστε να επιλύσει εκκρεμή συναλλαγή σας με τον χρήστη πριν από τη δημιουργία ένα άλλο`,
      insufficientEth: E => `Θα χρειαστείτε τουλάχιστον ${E} ETH να εγκατασταθούν, μεταβείτε στις Ρυθμίσεις για να δείτε balance σας`,
    },
    fields: {
      amount: `Ποσό`,
      settlementAmount: `Ποσό Εκκαθάρισης`,
      selectFriend: `Φίλος`,
      memo: `Σημείωμα`,
      direction: `Επιλέξτε τη σωστή δήλωση`,
    },
    memo: {
      example: `Τύπος σημείωμα εδώ`,
    },
    direction: {
      lend: X => `${X} χρωστάει me`,
      borrow: X => `οφείλω ${X}`,
      initiatedLend: X => `${X} λέει αυτός / αυτή owes`,
      initiatedBorrow: X => `${X} λέει ότι owe`,
      pendingLend: X => `@${X} οφείλει you`,
      pendingBorrow: X => `Θα οφείλετε @${X}`,
      pendingLendSettlement: S => `@${S.debtorNickname} ζητά μια διευθέτηση στο ${S.settlementCurrency}`,
      pendingBorrowSettlement: S => `@${S.creditorNickname} θέλει να διευθετήσει μαζί σας σε ${S.settlementCurrency}`,
      pendingLendSettlementMe: S => `Zητήσατε να εγκατασταθούν με @${S.debtorNickname} στο {$ S.settlementCurrency}`,
      pendingBorrowSettlementMe: S => `Θα ζητήσει @${S.creditorNickname} εγκατασταθούν σε ${S.settlementCurrency}`,
    },
    pending: {
      success: F => `Εν αναμονή του χρέους που υποβλήθηκαν στο @${F.nickname}`,
      error: generalCommunicationError
    },
    pendingParens: `(εκκρεμής)`,
    confirmation: {
      transaction: CP => `συναλλαγή με ${CP} έχει επιβεβαιωθεί με επιτυχία`,
      settlement: CP => `διακανονισμού με ${CP} έχει επιβεβαιωθεί με επιτυχία`,
      error: `Δεν είναι δυνατή η επιβεβαίωση της συναλλαγής αυτή τη στιγμή, δοκιμάστε ξανά αργότερα`,
    },
    rejection: {
      success: `Συναλλαγή έχει απορριφθεί`,
      error: `Δεν είναι δυνατή η να απορρίψει συναλλαγή αυτή τη στιγμή, δοκιμάστε ξανά αργότερα`,
    },
    balances: {
      error: `Δεν είναι δυνατή η φόρτωση υπόλοιπα αυτή τη στιγμή, δοκιμάστε ξανά αργότερα`,
    },
    for: M => `για ${M}`,
    settleUp: `Εγκαθίσταμαι`,
    settleTotal: `Settle Σύνολο`,
    settleUpMemo: (D, A) => `${D === 'lend' ? 'Επίλυση για': 'Αίτηση για την επίλυση των'} ${A} `,
    recordSettleUpMemo: `ιδρύοντας`,
  },
  settlementManagement: {
    bilateral: {
      error: {
        insufficient: X => `οικισμός σας με ${X} απέτυχε λόγω ανεπαρκούς funds`,
        generic: X => `Παρουσιάστηκε σφάλμα κατά την επεξεργασία οικισμός σας με ${X}`,
      }
    },
    eth: `Settle Με ETH`,
    nonPayment: `Καταγράψτε μια Οικισμός`,
  },

  accountViewLanguage: {
    lndr: `L n d r`,
    home: `Σπίτι`,
    friends: `Οι φιλοι`,
    activity: `Δραστηριότητα`,
  },

  notifications: {
    toggleNotifications: `Εναλλαγή Ειδοποιήσεις`,
    enable: `Ανάβω`,
    disable: `Σβήνω`,
  },

  pendingTransactionsLanguage: {
    shell: `Εν αναμονή της συναλλαγής`,
    title: `εκκρεμής`,
    memo: `Σημείωμα:`,
    for: `Για`,
    none: `Δεν υπάρχουν εκκρεμείς συναλλαγές`,
    confirmationQuestion: `Είστε σίγουροι ότι θέλετε να επιβεβαιώσει αυτή τη συναλλαγή;`,
    pendingAnnouncement: `Αυτή η συναλλαγή είναι σε αναμονή για την επιβεβαίωση από το άλλο μέρος.`,
    bilateral: `Αναμονή για μεταφορά Εθ για να ολοκληρωθεί`,
    confirm: `Επιβεβαιώνω`,
    reject: `Απόρριψη συναλλαγής`,
    rejectRequest: `Απορρίπτω`,
    cancel: `Ακύρωση συναλλαγών`,
    direction: {
      lend: (X, Z) => `@${X} που χρωστάει ${Z}`,
      borrow: (X, Z) => `Θα οφείλετε @${X} ${Z}`,
    }
  },

  pendingSettlementsLanguage: {
    shell: `Εν αναμονή της Οικισμός`,
    title: `εκκρεμής`,
    none: `Δεν υπάρχουν σε εκκρεμότητα οικισμούς`,
    confirm: `Επιβεβαιώνω`,
    reject: `Απόρριψη Οικισμός`,
    cancel: `Ακύρωση Οικισμός`,
  },

  recentTransactionsLanguage: {
    title: `Ολοκληρώθηκε το`,
    none: `Δεν έχετε ολοκληρώσει τις συναλλαγές`,
    direction: {
      lend: (X, Z) => `@${X} που χρωστάει ${Z}`,
      borrow: (X, Z) => `Θα οφείλετε @${X} ${Z}`
    },
    balance: `Ισορροπία`,
    friends: FS => `(από ${FS} ${FS === 1 ? 'φίλος': 'φίλων'})`,
  },

  tabs: {
    home: `Σπίτι`,
    friends: `Οι φιλοι`,
    activity: `Δραστηριότητα`,
  },

  confirmation: {
    shell: `Επιβεβαίωση`,
    done: `Εγινε`,
    create: {
      start: `Στείλαμε το ρεκόρ πάνω στο `,
      end: ` για επιβεβαίωση.`,
    },
    confirm: {
      start: `Έχετε επιβεβαίωσε αυτό το αρχείο από το`,
      end: `.`,
    },
    reject: {
      start: `Έχουμε αφήσει `,
      end: ` ξέρετε ότι απέρριψε αυτό το ρεκόρ.`,
    },
    confirmFriend: {
      start: `Τώρα είστε φίλοι με το `,
      end: `!`,
    },
    rejectFriend: {
      start: `Έχετε απορρίψει το αίτημα φιλίας από`,
      end: `.`,
    },
    ethSent: {
      start: `Έχετε στείλει επιτυχώς `,
      end: ` ETH και κατακερματισμού των συναλλαγών σας είναι `,
    },
    bcptSent: {
      start: `Έχετε στείλει με επιτυχία `,
      end: ` BCPT και κατακερματισμού των συναλλαγών σας είναι`,
    },
    status: `Μπορείτε να δείτε την κατάσταση της συναλλαγής στην `,
    activity: `καρτέλα δραστηριότητα.`,
  },

  pendingFriendRequestsLanguage: {
    shell: `Αίτημα φιλίας`,
    message: `Αιτήματα φιλίας`,
    request: F => `${F} θέλει να είναι φίλοι μαζί σας!`,
  }
}
