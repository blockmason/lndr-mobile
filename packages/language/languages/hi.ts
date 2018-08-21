import { currencySymbols, transferLimits } from 'lndr/currencies'

const CUR = currencySymbols
const TL = transferLimits

const generalCommunicationError = 'सर्वर से कम्यूनिकेट करते समय कोई समस्या हुई, कृपया बाद में दोबारा प्रयास करें।.'

export default {

  applicationName: `Lndr`,
  helloWorld: `हैलो दोस्तों`,
  submit: `सब्मिट करें`,
  next: `अगला`,
  cancel: `रद्द करें`,
  back: `वापस जाएँ`,
  copy: `क्लिपबोर्ड पर कॉपी करें`,
  confirmAccount: `कन्फ़र्म करें`,
  createAccount: `अकाउंट बनाएँ`,
  recoverAccount: `अकाउंट वापस लाएँ`,
  removeAccount: `अकाउंट डिलीट करें`,
  updateAccount: `अपडेट अकाउंट`,
  loginAction: `अनलॉक`,
  enterPin: `कृपया अपना पिन दर्ज करें`,
  changePin: `पिन बदलें`,
  enterCurrentPin: `वर्तमान पिन दर्ज करें`,
  logoutAction: `लॉग-आउट`,
  seeAllActivity: `पूरी एक्टिविटी दिखाएँ`,
  copiedClipboard: `क्लिपबोर्ड पर कॉपी कर दिया गया`,
  pleaseWait: `कृपया प्रतीक्षा करें`,
  addFriend: `फ्रेंड जोड़ें`,
  addFriendConfirmationQuestion: `क्या आप इस यूजर को वाकई में फ्रेंड के रूप में जोड़ना चाहते हैं?`,
  removeFriend: `फ्रेंड हटाएँ`,
  currentFriends: `वर्तमान फ्रेंड्स`,
  removeFriendConfirmationQuestion: `क्या आप वाकई में इस यूजर को फ्रेंड के रूप में हटाना चाहते हैं?`,
  inviteFriends: `Lndr पर फ्रेंड्स को इनवाइट करें`,
  tryLndr: `Lndr एप यहाँ ट्राय करें:`,
  friendInfo: `इस फ्रेंडशिप के बारे में और जानकारी:`,
  noFriends: `शुरू करने के लिए कुछ फ़्रेंड्स जोड़ें!`,
  noMatches: `कोई मैचिंग यूज़र नहीं मिला`,
  noBalances: `आपके कोई रिकॉर्डेड लोन नहीं हैं`,
  addFriendButton: `फ्रेंड जोड़ें`,
  alreadyFriendsButton: `फ्रेंड्स`,
  friendShell: `फ्रेंड`,
  tip: `टिप:`,
  notice: `नोटिस:`,
  welcome: `आपके LNDR में आपका स्वागत है`,
  noBalanceWarning: `हम इस समय आपका बैलेंस लोड नहीं कर पाए, कृपया बाद में दोबारा प्रयास करें।`,
  totalBalance: `कुल बैलेंस:`,
  totalBalances: `कुल काउंटरपार्टियाँ:`,
  newTransaction: `नया ट्रैंज़ैक्शन`,
  needsReview: `एप्रूवल पेंडिंग है`,
  owesMe: `मेरी लेनदारी है`,
  iOwe: `मेरी किसी पर देनदारी है`,
  newPassword: `नया पासवर्ड (कम से कम 8 कैरक्टर)`,
  confirmPassword: `पासवर्ड कन्फ़र्म कीजिए`,
  newPin: `नई 4 अंकों वाली पिन`,
  enterNewPin: `कृपया 4 अंकों वाली कोई नई पिन सेट करें`,
  confirmPin: `कृपया अपनी पिन कन्फ़र्म करें`,
  newAccount: `एक नया अकाउंट बनाएँ`,
  loginAccount: `अपने अकाउंट को अनलॉक करें`,
  recoverExistingAccount: `मौजूदा खाते को हटाएँ`,
  recoverMnemonic: `स्मरक (वे 12 शब्द जो \nआपको अकाउंट बनाते समय दिखाए गए थे)`,
  recoverMnemonicLengthError: `स्मरक में ठीक 12 शब्द होने चाहिए`,
  successTitle: `हो गया`,
  errorTitle: `गलती हुई`,
  showMnemonic: `12-शब्द का स्मरक दिखाएँ`,
  mnemonicExhortation: `आपके अकाउंट को बहाल करने के लिए इस 12-शब्द के वाक्यांश की जरूरत होगी, कृपया इसे कहीं सुरक्षित रखें`,
  addressExhortation: `Ethereum अपने पते पर भेजें ताकि आप Lndr पर कर्जों का निपटान कर सकें`,
  removeAccountTitle: `क्या आप वाकई में इस डिवाइस से अपने अकाउंट को हटाना चाहते हैं?`,
  removeAccountExhortation: `आप अकाउंट को डिवाइस से परमानेंट रूप से हटा रहे हैं। सुनिश्चित कर लें कि बाद में अपने खाते बहाल करने के लिए यह स्मरक आपकी पहुँच में हो।`,
  myAccount: `मेरा अकाउंट`,
  setNickname: `कोई छोटा नाम (निकनेम) सेट करें ताकि आपके फ्रेंड आपकी सर्च कर सकें`,
  setEmail: `Lndr अपडेट प्राप्त करने के लिए कोई ई-मेल सेट करें`,
  nickname: `छोटा नाम (लोअरकेस और संख्याएँ)`,
  email: `ईमेल पता`,
  accountManagement: {
    nickname: {
      lengthViolation: `सरनेम कम से कम 3 अक्षरों का होना चाहिए।`,
      compositionViolation: `सरनेम में केवल संख्याएँ और छोटे अक्षर ही हो सकते हैं।`,
      duplicationViolation: `यह छोटा नाम किसी ने पहले ही ले लिया है`,
    },
    email: {
      compositionViolation: `ईमेल फॉर्मैट गलत है`,
      duplicationViolation: `ईमेल पहले ही कोई ले चुका है`,
    },
    pin: {
      lengthViolation: `पिन कम से कम 4 कैरक्टर का होना चाहिए।`,
      matchViolation: `पिन मेल खाने चाहिए।`,
      failedHashComparison: `पिन मान्य नहीं है, कृपया दोबारा प्रयास करें।`,
      updateSuccess: `आपकी पिन अपडेट हो गई`,
      updateError: `आपकी पिन अपडेट करने में कोई गलती हुई`,
    },
    mnemonic: {
      lengthViolation: `स्मरक में कम से कम 12 शब्द होने चाहिए।`,
      unableToValidate: `एंटर किया गया स्मरक मान्य नहीं है, कृपया दोबारा प्रयास करें।`,
    },
    setNickname: {
      success: `आपका छोटा नाम सेव कर लिया गया`,
      error: generalCommunicationError
    },
    setEmail: {
      success: `आपकी ईमेल सेव कर ली गई`,
      error: generalCommunicationError
    },
    lockTimeout: {
      top: `आपको अपना पिन`,
      bottom: `मिनट निष्क्रिय रहने के बाद एंटर करना होगा`,
      update: `अपडेट करें`,
      error: `हम आपकी अकाउंट सेटिंग्स अपडेट नहीं कर सके`,
      success: `लॉक टाइमआउट अपडेट किया गया`,
    },
    addFriend: {
      success: X => `फ्रेंड रिक्वेस्ट @${X}को भेजी गई`,
      error: generalCommunicationError
    },
    removeFriend: {
      success: X => `फ्रेंड्स से हटाया गया: @${X}`,
      error: generalCommunicationError
    },
    loadInformation: {
      error: generalCommunicationError
    },
    ethBalance: {
      display: Y => `आपका ETH बैलेन्स $ है ${String(Y).slice(0,8)}`,
      getError: `Eth बैलेन्स प्राप्त नहीं कर पा रहा`,
      manage: `ETH मैनेज करें`,
    },
    sendEth: {
      error: {
        insufficient: `आपके पास इस ट्रान्सफर के लिए पर्याप्त ETH नहीं हैं`,
        generic: `ट्रान्सफर में कुछ गड़बड़ी हुई है, कृपया दोबारा कोशिश करें`,
        address: `कृपया कोई मान्य पता डालें`,
        amount: `कोई 0 से अधिक राशि एंटर करें`,
        limitExceeded: A => `आप एक हफ्ते में केवल ${CUR(A)}${TL(A)} भेज सकते हैं, कृपया कोई छोटी राशि चुनें`
      },
      amount: `भेजी जाने वाली राशि`,
      address: `गंतव्य पता ( '0x' प्रीफिक्स के बिना)`,
      transfer: `ट्रान्सफर ETH`,
      transferAll: `सब-कुछ ट्रान्सफर करें`,
      balance: Y => `आपका वर्तमान ETH बैलेन्स है ${typeof Y === 'string' ? Y.slice(0,8) :''}`,
      ethAddress: `Ethereum पता`,
      txCost: (B, A) => `वर्तमान ट्रैंज़ैक्शन खर्च है ${CUR(A)}${B}`,
      transferLowercase: `Eth ट्रान्सफर`,
      note: A => `कृपया नोट करें: आप हर हफ्ते केवल ${CUR(A)}${TL(A)} ही Lndr से बाहर भेज सकते हैं`,
      warning: (Z, A) => `आपकी ${CUR(A)}${TL(A)} लिमिट में ${CUR(A)}${Z} बाकी है`,
    },
    sendBcpt: {
      error: {
        insufficient: `आपके पास इस ट्रान्सफर के लिए पर्याप्त BCPT नहीं हैं`,
        generic: `ट्रान्सफर में कोई गड़बड़ी हुई थी, बाद में दोबारा प्रयास करें`,
      },
      transfer: `ट्रान्सफर BCPT`,
      address: `गंतव्य पता ( '0x' प्रीफिक्स के बिना)`,
      balance: Y => `आपका वर्तमान BCPT बैलेन्स ${typeof Y === 'string' ? Y.slice(0,8) :''} हैं`,
      bcptAddress: `BCPT पता`,
    },
    panelHeaders: [
      `ETH (और BCPT) पता`,
      `ETH बैलेंस`,
      `BCPT बैलेंस`,
      `अकाउंट डिलीट करें`,
      `ETH बैलेंस हिस्ट्री`,
      `पेपैल सक्षम करें`,
      `प्राथमिक मुद्रा परिवर्तित करें`,
      `पिन बदलिए`,
      `ई - मेल बदलें`,
      `लॉक टाइमआउट बदलें`,
      `स्मरक`,
      `नोटिफिकेशन्स`,
    ],
    viewEtherscan: `Etherscan हिस्ट्री देखें`,
    profilePic: {
      change: `प्रोफ़ाइल फोटो बदलें`,
      setError: `आपकी फोटो अपलोड करने में कोई गलती हुई, कृपया बाद में दोबारा प्रयास करें`,
      getError: `आपकी प्रोफ़ाइल फोटो वापस लाने में कोई गलती हुई`,
      setSuccess: `प्रोफ़ाइल फोटो अपडेट हो गई`,
    },
    logoutSuccess: `आप लॉग-आउट हो गए हैं!`,
    logoutError: generalCommunicationError,
  },

  currentBalance: {
    eth: `आपका वर्तमान Eth बैलेन्स है:`,
    bcpt: `आपका वर्तमान BCPT बैलेन्स है:`,
  },

  welcomeView: {
    by: `निर्माता`,
    makeItEasy: `Lndr से आप सादे कर्जों को आसानी से ट्रैक कर सकते हैं`,
    weHelpFriends: `हम फ्रेंड्स के साथ रहने, काम करने और साथ में मस्ती करने को आसान बनाते हैं।`,
    len: `Len`,
    dot: `।`,
    der: `der`,
    shareDinner: `डिनर शेयर करें`,
    fillTank: `अपनी टंकी भरें`,
    travelTogether: `साथ में ट्रैवल करें`,
    runEthereum: `हम ETH पर चलते हैं!`,
    firstLendingApp: `ब्लॉकचेन पर सिक्योर किया गया सबसे पहला मोबाइल उधार एप्लिकेशन।`,
    greatConcert: `कोई बढ़िया कॉन्सर्ट देखें`,
    youPlayWithFriends: `आप दोस्तों के साथ मस्ती करें, \nहिसाब हम रखेंगे...`,
    start: `शुरू करें`,
  },

  debtManagement: {
    shell: `नया ट्रैंज़ैक्शन`,
    add: `कर्ज जोड़ें`,
    selectFriend: `चुनें`,
    lend: `नया लोन`,
    borrow: `नया कर्ज`,
    iLent: `मुझे एक फ्रेंड से लेना है`,
    iBorrowed: `मुझे एक फ्रेंड को देना है`,
    settleUpLower: `निपटान करें`,
    amountToSettle: `निपटान करने की राशि`,
    total: `कुल`,
    record: `रिकॉर्ड`,
    records: `रिकॉर्ड्स`,
    chooseCurrency: `एक मुद्रा चुनें`,

    createError: {
      amountTooLow: `राशि $0 से ज़्यादा होनी चाहिए`,
      amountTooHigh: `राशि कम से कम $ 1,000,000,000  होना चाहिए`,
      selfAsFriend: `आप खुद के साथ कर्ज नहीं बना सकते, कोई और फ्रेंड चुनें`,
      pending: `नया ट्रैंज़ैक्शन शुरू करने से पहले इस यूज़र से अपने पुराने ट्रैंज़ैक्शन का निपटान करें`,
      insufficientEth: E => `आपको निपटान करने के लिए कम से कम ${E} चाहिए, अपना बैलेन्स देखने के लिए सेटिंग्स पर जाएँ`,
    },
    fields: {
      currency: `मुद्रा`,
      amount: `राशि`,
      settlementAmount: `निपटान राशि`,
      selectFriend: `फ्रेंड`,
      memo: `मेमो`,
      direction: `सही कथन का चयन करें`,
    },
    memo: {
      example: `मेमो यहाँ टाइप करें`,
    },
    direction: {
      lend: X => `मुझे ${X} से लेना है`,
      borrow: X => `मुझे ${X} को देना है`,
      initiatedLend: X => `${X} का कहना है कि उसे आपको देना है`,
      initiatedBorrow: X => `${X} का कहना है कि आपको देना है`,
      pendingLend: X => `@${X} को आपको देना`,
      pendingBorrow: X => `आपको @${X} को देना है`,
      pendingLendSettlement: S => `@${S.debtorNickname} ने ${S.settlementCurrency} में निपटान की रिक्वेस्ट की है`,
      pendingBorrowSettlement: S => `@${S.creditorNickname} आपसे ${S.settlementCurrency} में निपटान करना चाहते हैं`,
      pendingLendSettlementMe: S => `आपने @${S.debtorNickname} से ${S.settlementCurrency} में निपटान की रिक्वेस्ट की है`,
      pendingBorrowSettlementMe: S => `आपने रिक्वेस्ट की है कि @${S.creditorNickname} ${S.settlementCurrency} में निपटान करें`,
    },
    pending: {
      success: F => `पेंडिंग कर्ज @${F.nickname} को सब्मिट कर दिया गया`,
      error: generalCommunicationError
    },
    pendingParens: `(पेंडिंग)`,
    confirmation: {
      transaction: CP => `${CP} वाला ट्रैंज़ैक्शन कन्फ़र्म हो गया है`,
      settlement: CP => `${CP} वाला निपटान कन्फ़र्म हो गया है`,
      error: `इस समय ट्रैंज़ैक्शन की पुष्टि करने में असमर्थ है,  कृपया बाद में दोबारा प्रयास करें`,
    },
    rejection: {
      success: `ट्रैंज़ैक्शन रिजेक्ट हो गया है`,
      error: `इस समय ट्रैंज़ैक्शन को रिजेक्ट करने में असमर्थ है, कृपया बाद में दोबारा प्रयास करें`,
    },
    balances: {
      error: `इस समय बैलेंस लोड करने में असमर्थ है, कृपया दोबारा प्रयास करें`,
    },
    for: M => `${M} के लिए`,
    settleUp: `निपटाएँ`,
    settleTotal: `कुल निपटान करें`,
    settleUpMemo: (D, A) => ` ${A} ${D === 'lend' ? 'में निपटान करना' :  'में निपटान के लिए रिक्वेस्ट करें'}`,
    recordSettleUpMemo: `निपटाना`,
    balanceByCurrency: `विवरण`,
  },
  settlementManagement: {
    bilateral: {
      error: {
        insufficient: X => `${X} से आपका निपटान नहीं हो पाया क्योंकि राशि पर्याप्त नहीं थी`,
        generic: X => `${X} से आपका निपटान पूरा करते समय कोई गलती हुई`,
      }
    },
    eth: `ETH से निपटाएँ`,
    paypal: `PayPal से निपटाएँ`,
    nonPayment: `कोई निपटान रिकॉर्ड करें`,
  },

  accountViewLanguage: {
    lndr: `L n d r`,
    home: `होम`,
    friends: `फ्रेंड्स`,
    activity: `एक्टिविटी`,
  },

  notifications: {
    toggleNotifications: `नोटिफिकेशन टॉगल करें`,
    enable: `चालू करें`,
    disable: `बंद करें`,
  },

  pendingTransactionsLanguage: {
    shell: `पेंडिंग ट्रैंज़ैक्शन`,
    title: `पेंडिंग`,
    memo: `मेमो:`,
    for: `इनके लिए`,
    none: `आपके कोई पेंडिंग ट्रैंज़ैक्शन नहीं हैं`,
    confirmationQuestion: `क्या आप वाकई में इस ट्रैंज़ैक्शन को कन्फ़र्म करना चाहते हैं?`,
    pendingAnnouncement: `यह ट्रैंज़ैक्शन थर्ड-पार्टी के कन्फ़र्मेशन का इंतज़ार कर रहा है।`,
    bilateral: `Eth ट्रान्सफर पूरा होने का इंतज़ार कर रहा है`,
    confirm: `कन्फ़र्म करें`,
    reject: `ट्रैंज़ैक्शन रिजेक्ट करें`,
    rejectRequest: `रिजेक्ट करें`,
    cancel: `ट्रैंज़ैक्शन कैन्सल करें`,
    direction: {
      lend: (X, Z) => `@${X} से आपको ${Z} लेना है`,
      borrow: (X, Z) => `आपको @${X} को ${Z} देना है`,
    }
  },

  pendingSettlementsLanguage: {
    shell: `निपटान लंबित है`,
    title: `पेंडिंग है`,
    none: `आपके कोई पेंडिग निपटान नहीं हैं`,
    confirm: `कन्फ़र्म करें`,
    reject: `निपटान रिजेक्ट करें`,
    cancel: `निपटान कैन्सल करें`,
  },

  recentTransactionsLanguage: {
    title: `पूरा हो गया`,
    none: `आपके पास कोई पूरे किए गए ट्रैंज़ैक्शन नहीं हैं`,
    direction: {
      lend: (X, Z) => `@${X} को आपको ${Z} देना है`,
      borrow: (X, Z) => `आपको @${X} को ${Z} देना है`
    },
    balance: `बैलेन्स`,
    consolidatedBalance: `बैलेन्स`,
    friends: FS => `(${FS} फ्रेंड्स से)`,
  },

  tabs: {
    home: `होम `,
    friends: `फ्रेंड्स`,
    activity: `एक्टिविटी`,
  },

  confirmation: {
    shell: `कन्फ़र्मेशन`,
    done: `हो गया`,
    create: {
      start: `हमने कन्फ़र्म करने के लिए `,
      end: ` को रिकॉर्ड भेज दिया है।`,
    },
    confirm: {
      start: `आपने `,
      end: ` से इस रिकॉर्ड को कन्फ़र्म किया है।`,
    },
    reject: {
      start: `हमने `,
      end: ` को बता दिया है कि आपने यह रिकॉर्ड रिजेक्ट कर दिया है।`,
    },
    confirmFriend: {
      start: `अब आप `,
      end: ` के फ्रेंड हैं!`,
    },
    rejectFriend: {
      start: `आपने `,
      end: ` की फ्रेंड रिक्वेस्ट अस्वीकार दी है।`,
    },
    rejectOutboundFriendRequest: {
      start: `आप `,
      end: ` को मित्र अनुरोध रद्द कर दिया है.`,
    },
    ethSent: {
      start: `आपने `,
      end: ` ETH भेज दिये हैं और आपका ट्रैंज़ैक्शन हैश `,
    },
    bcptSent: {
      start: `आपने `,
      end: ` BCPT भेज दिए हैं और आपका ट्रैंज़ैक्शन हैश `,
    },
    requestPayPalPayee: {
      start: `हम `,
      end: ` जानते हैं कि आप पेपैल के साथ व्यवस्थित करना चाहते हैं है।`,
    },
    requestPayPalPayment: {
      start: `हम `,
      end: ` जानते हैं कि आप पेपैल के साथ भुगतान किया जाना चाहते हैं गए हैं।`,
    },
    settledWithPayPal: {
      start: `हम `,
      end: ` जानते हैं कि आप पेपैल के साथ बसे कर दिया है है।`,
    },
    status: `आप इस ट्रैंज़ैक्शन का स्टेटस एक्टिविटी टैब `,
    activity: `में देख सकते हैं।`,
  },

  pendingFriendRequestsLanguage: {
    shell: `फ्रेंड रिक्वेस्ट`,
    message: `फ्रेंड रिक्वेस्ट्स`,
    request: F => `@${F} आपका फ्रेंड बनना चाहता/चाहती है!`,
    outbound: F => `आप @${F} को मित्र अनुरोध भेजा`,
  },

  privacyPolicy: {
    link: `lndr.io/terms/`,
    message: `नीचे क्लिक करके आप पुष्टि करते हैं कि आपने ब्लॉकमसन गोपनीयता नीति को पढ़ और सहमति दी है। ब्लॉकमेसन ब्लॉकमसन और एलएनडीआर के बारे में अपडेट भेजने के लिए आपके ईमेल पते का उपयोग कर सकता है। गोपनीयता नीति का एक लिंक यहां दिया गया है:`
  },

  payPalLanguage: {
    connectPayPal: `पेपैल कनेक्ट करें`,
    connectSuccess: `पेपैल को सफलतापूर्वक सक्षम।`,
    disconnectPayPal: `डिस्कनेक्ट पेपैल`,
    disconnected: `पेपैल काट दिया।`,
    requestPayPalPayment: `अनुरोध पेपैल भुगतान`,
    sendWithPayPal: `पेपैल के साथ भेजें`,
    enablePayPal: `पेपैल सक्षम करें`,
    requestPayPalPayee: `पेपैल का अनुरोध करें`,
    enablePayPalForFriend: F => `पेपैल को सक्षम करने से आपको @${F} भुगतान करने की अनुमति मिलती है।`,
    friendNotEnabled: F => `@${F} पेपैल भुगतान सक्षम नहीं किया है।`,
    friendRequestedConnect: F => `@${F} पेपैल के माध्यम से आपको भुगतान करना चाहता है`,
    requestFriendConnect: F => `आपने पेपैल को सक्षम करने के लिए @${F} पूछा`,
    feesNotification: `पेपैल फीस शामिल नहीं है`,
    feesInformationHeader: `PayPal शुल्क सूचना`,
    feesInformation: `1. अपने पेपैल खाते में एक बैंक खाते से जुड़ा हुआ होना चाहिए।
    
2. एक मुद्रा अपने बैंक की मुद्रा से भिन्न में पेइंग एक $ 0.35 शुल्क देना पड़ेगा।

3. अंतर्राष्ट्रीय हस्तांतरण शुल्क:
    कनाडा / यूरोप करने के लिए संयुक्त राज्य अमरीका: $ 2.99
    कहीं और करने के लिए संयुक्त राज्य अमरीका: $ 4.99

4. ये शुल्क व्यापक नहीं हैं। सबसे अद्यतन जानकारी के लिए कृपया पर जाएँ:

    https://www.paypal.com/us/webapps/mpp/paypal-fees#sending-us`,
    payPalSite: `PayPal.com`,
  }
}
