import { currencySymbols, transferLimits } from 'lndr/currencies'

const CUR = currencySymbols
const TL = transferLimits

const generalCommunicationError = 'הייתה בעיה בזמן ההתקשורת עם השרת, אנא נסה שוב מאוחר יותר'

export default {

  applicationName: `Lndr`,
  helloWorld: `שלום עולם`,
  submit: `לשלוח`,
  next: `הבא`,
  cancel: `לבטל`,
  back: `לחזור`,
  copy: `להעתיק ללוח`,
  confirmAccount: `לאשר`,
  createAccount: `ליצור חשבון`,
  recoverAccount: `לשחזר חשבון`,
  removeAccount: `להסיר חשבון`,
  updateAccount: `לעדכן חשבון`,
  loginAction: `לבטל נעילה`,
  enterPin: `אנא הזן את קוד ה- PIN שלך`,
  changePin: `לשנות PIN`,
  enterCurrentPin: `הזן PIN נוכחי`,
  logoutAction: `להתנתק`,
  seeAllActivity: `צפייה בכל הפעולות`,
  copiedClipboard: `הועתק ללוח`,
  pleaseWait: `המתן בבקשה`,
  addFriend: `הוסף חבר`,
  addFriendConfirmationQuestion: `האם אתה בטוח שברצונך להוסיף משתמש זה כחבר?`,
  removeFriend: `להסיר חבר`,
  currentFriends: `חברים נוכחיים`,
  removeFriendConfirmationQuestion: `האם אתה בטוח שברצונך להסיר משתמש זה כחבר?`,
  inviteFriends: `להזמין חברים ל-Lndr`,
  tryLndr: `נסה את אפליקצית Lndr כאן:`,
  friendInfo: `מידע נוסף על הידידות הזאת:`,
  noFriends: `הוסף כמה חברים כדי להתחיל!`,
  noMatches: `לא נמצאו משתמשים מתאימים`,
  noBalances: `אין לך חובות רשומים`,
  addFriendButton: `הוסף חבר`,
  alreadyFriendsButton: `חברים`,
  friendShell: `חבר`,
  tip: `עצה`,
  notice: `הודעה:`,
  welcome: `ברוכים הבאים ל-LNDR שלך`,
  noBalanceWarning: `לא הצלחנו לטעון את יתרתך בשלב זה, אנא נסה שוב מאוחר יותר.`,
  totalBalance: `סה"כ יתרה:`,
  totalBalances: `סה"כ צדדים:`,
  newTransaction: `עסקה חדשה`,
  needsReview: `ממתין לאישור`,
  owesMe: `אני חייב`,
  iOwe: `אני חייב למישהו`,
  newPassword: `סיסמה חדשה (8 תווים לפחות)`,
  confirmPassword: `אישור סיסמה`,
  newPin: `  בן 4 ספרות חדש PIN`,
  enterNewPin: `  בן 4 ספרות חדש PIN הגדר`,
  confirmPin: `אנא אשר את ה- PIN שלך`,
  newAccount: `צור חשבון חדש`,
  loginAccount: `בטל את נעילת החשבון שלך`,
  recoverExistingAccount: `לשחזר חשבון קיים`,
  recoverMnemonic: `רמז (12 מילות מוצגות \n כאשר יצרת את חשבונך)`,
  recoverMnemonicLengthError: `על הרמז להיות בעל 12 מילים בדיוק`,
  successTitle: `הצלחה`,
  errorTitle: `שגיאה`,
  showMnemonic: `להציג רמז בעל 12 מילים`,
  mnemonicExhortation: `ביטוי בעל 12 מילים זה נדרש כדי לשחזר את חשבונך, יש לשמור אותו במקום סודי ובטוח`,
  addressExhortation: `לשלוח Ethereum לכתובת שלך, בכדי שתוכל להסדיר חובות ב Lndr`,
  removeAccountTitle: `האם אתה בטוח שברצונך להסיר את חשבונך ממכשיר זה?`,
  removeAccountExhortation: `ודא שיש לך גישה לרמז שלך בכדי שתוכל לשחזר את חשבונך מאוחר יותר, שכן פרטי חשבונך יוסרו לצמיתות ממכשיר זה.`,
  myAccount: `החשבון שלי`,
  setNickname: `הגדר כינוי כדי שחבריך יוכלו למצוא אותך`,
  setEmail: `הגדר דואר אלקטרוני כדי שתוכל לקבל מידע על עדכונים ב-Lndr`,
  nickname: `כינוי (אותיות קטנות & מספרים)`,
  email: `כתובת דוא"ל`,
  accountManagement: {
    nickname: {
      lengthViolation: `על הכינוי להיות בעל 3 תווים לפחות.`,
      compositionViolation: `על הכינוי להכיל מספרים ואותיות קטנות בלבד.`,
      duplicationViolation: `הכינוי כבר תפוס`,
    },
    email: {
      compositionViolation: `פורמט דוא"ל שגוי`,
      duplicationViolation: `כתובת הדוא"ל כבר תפוס`,
    },
    pin: {
      lengthViolation: `על ה-PIN להיות בעל 4 תווים לפחות.`,
      matchViolation: `על ה-PIN להיות תואם.`,
      failedHashComparison: ` .לא חוקי, אנא נסה שנית PIN`,
      updateSuccess: `ה-PIN שלך עודכן`,
      updateError: `ארעה שגיאה בעת עדכון ה-PIN שלך`,
    },
    mnemonic: {
      lengthViolation: `על הרמז להכיל 12 מילים לפחות.`,
      unableToValidate: `הרמז שהזנת אינו חוקי, אנא נסה שנית.`,
    },
    setNickname: {
      success: `הכינוי שלך נשמר.`,
      error: generalCommunicationError
    },
    setEmail: {
      success: `האימייל שלך נשמר.`,
      error: generalCommunicationError
    },
    lockTimeout: {
      top: `עליך להזין את ה-PIN שלך אחרי`,
      bottom: `דקות של חוסר פעילות`,
      update: `עדכון`,
      error: `לא הצלחנו לעדכן את הגדרות החשבון שלך`,
      success: `פסק זמן הנעילה עודכן`,
    },
    addFriend: {
      success: X => `@${X} -בקשת חברות נשלחה ל`,
      error: generalCommunicationError
    },
    removeFriend: {
      success: X => `@${X} :להסיר מחברים`,
      error: generalCommunicationError
    },
    loadInformation: {
      error: generalCommunicationError
    },
    ethBalance: {
      display: Y => `${String(Y).slice(0,8)} שלך היא ETH -יתרת ה`,
      getError: `לא ניתן לאחזר את יתרת Eth`,
      manage: `ניהול ETH`,
    },
    sendEth: {
      error: {
        insufficient: `אין ברשותך מספיק ETH עבור עסקה זו`,
        generic: `ארעה שגיאה בזמן העסקה, אנא נסה שוב מאוחר יותר`,
        address: `אנא הזן כתובת חוקית`,
        amount: `אנא הזן סכום גדול מ-0`,
        limitExceeded: A => `בלבד, יש לבחור כמות קטנה יותר  ${CUR(A)}${TL(A)} אתה יכול לשלוח בשבוע`,
      },
      amount: `כמות לשליחה`,
      address: `כתובת יעד (ללא קידומת "0x")`,
      transfer: `ETH להעביר`,
      transferAll: `להעביר הכל`,
      balance: Y => `${typeof Y === 'string' ? Y.slice(0,8) :''} הנוכחית שלך היא ETH- יתרת ה`,
      ethAddress: `כתובת Ethereum`,
      txCost: (B, A) => `${CUR(A)}${B} מחיר ההעברה הנוכחי הוא`,
      transferLowercase: `להעביר Eth`,
      note: A => `Lndr-בלבד מחוץ ל ${CUR(A)}${TL(A)} שים לב: אתה יכול להעביר בשבוע`,
      warning: (Z, A) => `שלך ${CUR(A)}${TL(A)} -מהמגבלת ה ${CUR(A)}${Z} נותרו לך`,
    },
    sendBcpt: {
      error: {
        insufficient: `אין ברשותך מספיק BCPT עבור עסקה זו`,
        generic: `ארעה שגיאה בעת ההעברה, אנא נסה שוב מאוחר יותר`,
      },
      transfer: `להעביר BCPT`,
      address: `כתובת יעד (ללא קידומת "0x")`,
      balance: Y => ` ${typeof Y === 'string' ? Y.slice(0,8) :''} שלך היא BCPT -יתרת ה`,
      bcptAddress: `כתובת BCPT`,
    },
    changeProfilePic: `הקש לשינוי`,
    addProfilePic: `להשתמש בתמונה מהטלפון`,
    panelHeaders: [
      `ETH (& BCPT) כתובת`,
      `יתרת ETH`,
      `יתרת BCPT`,
      `להסיר חשבון`,
      `היסטוריית עסקאות ETH`,
      `הפוך את PayPal`,
      `שינוי מטבע ראשי`,
      `לשנות PIN`,
      `לשנות כינוי`,
      `לדנות דוא"ל`,
      `לשנות תמונת פרופיל`,
      `לשנות פסק זמן נעילה`,
      `רמז`,
      `התראות`,
    ],
    viewEtherscan: `צפייה בהיסטורית Etherscan `,
    profilePic: {
      change: `לשנות תמונת פרופיל`,
      setError: `ארעה שגיאה בעת העלאת התמונה שלך, אנא נסה שוב מאוחר יותר`,
      getError: `ארעה שגיאה באחזור תמונת הפרופיל שלך`,
      setSuccess: `תמונת הפרופיל עודכנה`,
    },
    logoutSuccess: `התנתקת בהצלחה!`,
    logoutError: generalCommunicationError,
  },

  currentBalance: {
    eth: `יתרת ה-Eth הנוכחית שלך היא:`,
    bcpt: `יתרת ה-BCPT הנוכחית שלך היא:`,
  },

  welcomeView: {
    by: `נוצר ע"י`,
    makeItEasy: `    עושה את תהליך המעקב אחר חובות פשוטים קל יותר Lndr`,
    weHelpFriends: `אנחנו עוזרים לחברים לחיות, לעבוד ולשחק ביחד.`,
    len: `Len`,
    dot: `.`,
    der: `der`,
    shareDinner: `לשתף ארוחת ערב`,
    fillTank: `למלא את המיכל שלך`,
    travelTogether: `לטייל ביחד`,
    runEthereum: `אנו פועלים על ETH!`,
    firstLendingApp: `אפליקציית ההלוואות הניידת הראשונה המאובטחת ע"י blockchain.`,
    greatConcert: `לראות קונצרט גדול`,
    youPlayWithFriends: `אתה משחק עם חברים; \n נשמור את הכרטיסייה ...`,
    start: `להתחיל`,
  },

  debtManagement: {
    shell: `עסקה חדשה`,
    add: `הוספת חוב`,
    selectFriend: `לבחור`,
    lend: `הלוואה חדשה`,
    borrow: `חוב חדש`,
    iLent: `חבר חייב לי`,
    iBorrowed: `אני חייד לחבר`,
    settleUpLower: `להחזיר חוב`,
    amountToSettle: `הסכום שיש להחזיר`,
    total: `סה"כ`,
    record: `רשומה`,
    records: `רמשומות`,
    chooseCurrency: `בחר מטבע`,

    createError: {
      amountTooLow: `הסכום חייב להיות גדול מ 0 $`,
      amountTooHigh: `הסכום חייב להיות פחות מ $ 1,000,000,000`,
      selfAsFriend: `אתה לא יכול ליצור חוב עם עצמך, בחר חבר אחר`,
      pending: `אנא פתור את העסקה הממתינה שלך עם משתמש זה לפני יצירת אחת חדשה`,
      insufficientEth: E => `עבור להגדרות כדי לצפות ביתרתך ,ETH ${E} חייבים להיות ברשותך לפחות`,
    },
    fields: {
      currency: `מַטְבֵּעַ`,
      amount: `סכום`,
      settlementAmount: `סכום פשרה`,
      selectFriend: `חבר`,
      memo: `תזכיר`,
      direction: `בחר את ההצהרה הנכונה`,
    },
    memo: {
      example: `הקלד תזכיר כאן`,
    },
    direction: {
      lend: X => `חייב לי ${X} `,
      borrow: X => `${X} -אני חייב ל`,
      initiatedLend: X => `אומר/ת שהוא/היא חייב/ת ${X}`,
      initiatedBorrow: X => `אומר שאתה חייב ${X}`,
      pendingLend: X => `חייב לך @${X}`,
      pendingBorrow: X => `@${X} אתה חייב`,
      pendingLendSettlement: S => `${S.settlementCurrency} -מבקש החזרת חוב ב @${S.debtorNickname}`,
      pendingBorrowSettlement: S => `${S.settlementCurrency} -רצה להחזיר לך חוב ב @${S.debtorNickname}`,
      pendingLendSettlementMe: S => `${S.settlementCurrency} -ב @${S.debtorNickname} -בקשת להחזיר חוב ל`,
      pendingBorrowSettlementMe: S => `${S.settlementCurrency} -יחזיר חוב ב @${S.debtorNickname} -בקשת ש`,
    },
    pending: {
      success: F => `@${F.nickname} -חוב ממתין נשלח ל`,
      error: generalCommunicationError
    },
    pendingParens: `(ממתין)`,
    confirmation: {
      transaction: CP => `אושרה בהצלחה ${CP} העסקה עם`,
      settlement: CP => `אושר בהצלחה ${CP} החזר חוב עם`,
      error: `לא ניתן לאשר את העסקה בשלב זה, אנא נסה שוב מאוחר יותר`,
    },
    rejection: {
      success: `העסקה נדחתה`,
      error: `לא ניתן לדחות את העסקה בשלב זה, אנא נסה שוב מאוחר יותר`,
    },
    balances: {
      error: `לא ניתן לטעון יתרות בשלב זה, אנא נסה שוב מאוחר יותר`,
    },
    for: M => `${M} עבור`,
    settleUp: `להחזיר חוב`,
    settleTotal: `להסדיר סכום כולל`,
    settleUpMemo: (D, A) => `${D === 'lend' ? 'החזרת חוב עבור' : 'בקשת החזרת חוב עבור'} ${A}`,
    recordSettleUpMemo: `החזרת חוב`,
    balanceByCurrency: `פרטים`,
  },
  settlementManagement: {
    bilateral: {
      error: {
        insufficient: X => `נכשל עקב תקציב לא מספיק${X} ההסדר שלך עם`,
        generic: X => `${X} ארעה שגיאה בעת עיבוד ההסדר שלך עם`,
      }
    },
    eth: `החזרה בעזרת ETH`,
    paypal: `החזרה בעזרת PayPal`,
    nonPayment: `לרשום הסדר`,
  },

  accountViewLanguage: {
    lndr: `L n d r`,
    home: `דף הבית`,
    friends: `חברים`,
    activity: `פעילות`,
  },

  notifications: {
    toggleNotifications: `החלפת מצב התראות`,
    enable: `להדליק`,
    disable: `לכבות`,
  },

  pendingTransactionsLanguage: {
    shell: `עסקה ממתינה`,
    title: `בהמתנה`,
    memo: `תזכיר`,
    for: `עבור`,
    none: `אין לך עסקאות ממתינות`,
    confirmationQuestion: `האם אתה בטוח שברצונך לאשר עסקה זו?`,
    pendingAnnouncement: `עסקה זו מחכה לאישור על ידי הצד השני.`,
    bilateral: `ממתין עד שהעברת Eth תסתיים`,
    confirm: `לאשר`,
    reject: `לדחות עסקה`,
    rejectRequest: `לדחות`,
    cancel: `לבטל עסקה`,
    direction: {
      lend: (X, Z) => `${Z} חייב לך @${X}`,
      borrow: (X, Z) => `@${X} -ל ${Z} אתה חייב`,
    }
  },

  pendingSettlementsLanguage: {
    shell: `הסדר ממתין`,
    title: `בהמתנה`,
    none: `אין לך הסדרים ממתינים`,
    confirm: `לאשר`,
    reject: `לדחות הסדר`,
    cancel: `לבטל הסדר`,
  },

  recentTransactionsLanguage: {
    title: `הושלם`,
    none: `אין לך עסקאות שהושלמו`,
    direction: {
      lend: (X, Z) => `${Z} חייב לך@${X}`,
      borrow: (X, Z) => `@${X} -ל ${Z} אתה חייב`
    },
    balance: `יתרה`,
    consolidatedBalance: `יתרה`,
    friends: FS => `(${FS === 1 ? 'חבר': 'חברים'} ${FS} -מ)`,
  },

  tabs: {
    home: `דף הבית `,
    friends: `חברים`,
    activity: `פעילות`,
  },

  confirmation: {
    shell: `אשור`,
    done: `בוצע`,
    create: {
      start: `שלחנו את הרשומה `,
      end: ` לאשור`,
    },
    confirm: {
      start: `אישרת רשומה זו מ `,
      end: `.`,
    },
    reject: {
      start: `הודענו ל   `,
      end: `. שדחית רשומה זו`,
    },
    confirmFriend: {
      start: `אתה ו   `,
      end: `! חברים עכשיו`,
    },
    rejectFriend: {
      start: `דחית את בקשת החברות מ   `,
      end: `.`,
    },
    ethSent: {
      start: `שלחת ETH `,
      end: ` בהצלחה ומספר העסקה שלך הוא`,
    },
    bcptSent: {
      start: `שלחת BCPT `,
      end: `בהצלחה ומספר העסקה שלך הוא `,
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
    status: `אתה יכול לראות את סטטוס העסקה הזאת `,
    activity: `.בלשונית הפעילות`,
  },

  pendingFriendRequestsLanguage: {
    shell: `בקשת חברות`,
    message: `בקשות חברות`,
    request: F => `!רוצה להיות חבר שלך @${F}`,
  },

  privacyPolicy: {
    link: `lndr.io/terms/`,
    message: `על ידי לחיצה בהמשך שתאשר כי קראת מסכים למדיניות הפרטיות של Blockmason. Blockmason עשויים להשתמש בכתובת הדוא"ל שלך כדי לשלוח עדכונים על Blockmason ו LNDR. הנה קישור למדיניות הפרטיות`
  },

  payPalLanguage: {
    connectPayPal: `חבר PayPal`,
    connectSuccess: `PayPal הופעלו בהצלחה.`,
    disconnectPayPal: `נתק PayPal`,
    disconnected: `PayPal מנותק.`,
    requestPayPalPayment: `תשלום בקשת PayPal`,
    sendWithPayPal: `שלח עם PayPal`,
    enablePayPal: `הפוך את PayPal`,
    requestPayPalPayee: `בקש PayPal`,
    enablePayPalForFriend: F => `הפעלת PayPal מאפשרת ל- @${F} לשלם לך.`,
    friendNotEnabled: F => `@${F} לא אפשר תשלומים PayPal.`,
    friendRequestedConnect: F => `@${F} רוצה לשלם לך באמצעות PayPal`,
    requestFriendConnect: F => `ביקשת מ- @${F} להפעיל את PayPal`,
  }
}
