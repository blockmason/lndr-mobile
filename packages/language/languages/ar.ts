import { currencySymbols, transferLimits } from 'lndr/currencies'

const CUR = currencySymbols
const TL = transferLimits

const generalCommunicationError = 'حدث خطأ في الاتصال بالخادم، الرجاء إعادة المحاولة لاحقاً'

export default {

  applicationName: `Lndr`,
  helloWorld: `مرحباً بكم`,
  noConnection: `لا يوجد اتصال`,
  retry: `إعادة المحاولة`,
  submit: `إرسال`,
  next: `التالي`,
  cancel: `إلغاء`,
  back: `الرجوع`,
  copy: `نسخ إلى الحافظة`,
  confirmAccount: `تأكيد`,
  createAccount: `إنشاء حساب`,
  recoverAccount: `استعادة الحساب`,
  removeAccount: `إزالة الحساب`,
  updateAccount: `تحديث الحساب`,
  loginAction: `إلغاء القفل`,
  enterPin: `يرجى إدخال رمز PIN`,
  changePin: `تغيير رمز PIN‏`,
  enterCurrentPin: `أدخل رمز PIN الحالي`,
  logoutAction: `تسجيل الخروج`,
  seeAllActivity: `مشاهدة جميع النشاطات`,
  copiedClipboard: `تم النسخ إلى الحافظة`,
  pleaseWait: `الرجاء الانتظار`,
  addFriend: `إضافة صديق`,
  addFriendConfirmationQuestion: `هل أنت متأكد من إضافة هذا المستخدم كصديق؟`,
  removeFriend: `إزالة صديق`,
  currentFriends: `الأصدقاء الحاليين`,
  removeFriendConfirmationQuestion: `هل أنت متأكد من إزالة هذا المستخدم كصديق؟`,
  inviteFriends: `دعوة الأصدقاء إلى Lndr`,
  tryLndr: `جرب تطبيق Lndr من هنا:`,
  friendInfo: `المزيد من المعلومات حول هذه الصداقة:`,
  noFriends: `أضف بعض الأصدقاء للبدء!`,
  noMatches: `لم يتم العثور على مستخدمين متطابقين`,
  noBalances: `لا يوجد لديك ديون مسجلة`,
  addFriendButton: `إضافة صديق`,
  alreadyFriendsButton: `الأصدقاء`,
  friendShell: `صديق`,
  tip: `تلميح:`,
  notice: `ملاحظة:`,
  welcome: `أهلاً بك في LNDR`,
  noBalanceWarning: `لم نتمكن من تحميل رصيدك في الوقت الحالي، الرجاء إعادة المحاولة لاحقاً.`,
  totalBalance: `الرصيد الإجمالي:`,
  totalBalances: `مجموع الأطراف المقابلة:`,
  newTransaction: `عملية جديدة`,
  needsReview: `بانتظار الموافقة`,
  owesMe: `أنا مديون`,
  iOwe: `أنا أدين لشخص ما`,
  newPassword: `كلمة مرور جديدة (الحد الأدنى 8 أحرف)`,
  confirmPassword: `تأكيد كلمة المرور`,
  newPin: `رمز PIN جديد من 4 أرقام`,
  enterNewPin: `الرجاء تعيين رمز PIN جديد مكون من 4 أرقام`,
  confirmPin: `الرجاء تأكيد رمز PIN الخاص بك`,
  newAccount: `إنشاء حساب جديد`,
  loginAccount: `إلغاء قفل حسابك`,
  recoverExistingAccount: `استرداد حساب موجود`,
  recoverMnemonic: `استذكار (12 كلمة تم عرضها  \nعند إنشائك لحسابك)`,
  recoverMnemonicLengthError: `يجب أن يكون الاستذكار 12 كلمة بالضبط`,
  successTitle: `نجاح`,
  errorTitle: `خطأ`,
  showMnemonic: `إظهار الاستذكار المؤلف من 12-كلمة`,
  mnemonicExhortation: `هذه العبارة المؤلفة من 12-كلمة مطلوبة لاسترداد حسابك، الرجاء الاحتفاظ بها في مكان آمن وسري`,
  addressExhortation: `أرسل إثيريوم إلى عنوانك لكي تتمكن من تسديد الديون على Lndr `,
  removeAccountTitle: `هل أنت متأكد من إزالة حسابك من هذا الجهاز؟`,
  removeAccountExhortation: `تأكد من إمكانيتك الوصول إلى الاستذكار الخاص بك لكي تتمكن من استرداد حسابك لاحقاً، فهذه إزالة دائمة لمعلومات حسابك من هذا الجهاز.`,
  myAccount: `حسابي`,
  setNickname: `تعيين اسم مستعار لكي يتمكن أصدقاؤك من البحث عنك`,
  setEmail: `تعيين بريد إلكتروني لتلقي المعلومات عن تحديثات Lndr`,
  nickname: `الاسم المستعار (أحرف صغيرة & أرقام)`,
  email: `البريد الإلكتروني`,
  accountManagement: {
    nickname: {
      lengthViolation: `يجب أن يتألف الاسم المستعار من 3 أحرف على الأقل`,
      compositionViolation: `يمكن أن يتألف الاسم المستعار من أحرف صغيرة وأرقام فقط`,
      duplicationViolation: `الاسم المستعار مستخدم بالفعل`,
    },
    email: {
      compositionViolation: `البريد الإلكتروني غير صحيح`,
      duplicationViolation: `البريد الإلكتروني مستخدم بالفعل`,
    },
    pin: {
      lengthViolation: `يجب أن يتألف رمز PIN من 4 أحرف على الأقل`,
      matchViolation: `يجب أن تتطابق رموز PIN`,
      failedHashComparison: `رمز PIN غير صالح، الرجاء إعادة المحاولة.`,
      updateSuccess: `تم تحديث رمز PIN الخاص بك`,
      updateError: `حدث خطأ أثناء تحديث PIN الخاص بك`,
    },
    mnemonic: {
      lengthViolation: `يجب أن يتألف الاستذكار من 12 حرف على الأقل.`,
      unableToValidate: `الاستذكار الذي أدخلته غير صالح. الرجاء إعادة المحاولة.`,
    },
    setNickname: {
      success: `تم حفظ اسمك المستعار.`,
      error: generalCommunicationError
    },
    setEmail: {
      success: `تم حفظ بريدك الإلكتروني. `,
      error: generalCommunicationError
    },
    lockTimeout: {
      top: `يجب إدخال رمز PIN بعد`,
      bottom: `دقائق من عدم النشاط`,
      update: `تحديث`,
      error: `لم نتمكن من تحديث إعدادات حسابك`,
      success: `تم تحديث مهلة القفل`,
    },
    addFriend: {
      success: X => `تم إرسال طلب صداقة إلى @${X}`,
      error: generalCommunicationError
    },
    removeFriend: {
      success: X => `تم حذفه من الأصدقاء: @${X}`,
      error: generalCommunicationError
    },
    loadInformation: {
      error: generalCommunicationError
    },
    ethBalance: {
      display: Y => `رصيد الإثيريوم الخاص بك هو ${String(Y).slice(0,8)}`,
      getError: `تعذر استرداد رصيد إثيريوم`,
      manage: `إدارة إثيريوم`,
    },
    sendEth: {
      error: {
        insufficient: `ليس لديك ما يكفي من ETH لهذه العملية`,
        generic: `حدث خطأ في عملية التحويل، الرجاء إعادة المحاولة لاحقاً`,
        address: `الرجاء إدخال عنوان صحيح`,
        amount: `الرجاء إدخال كمية أكبر من 0`,
        limitExceeded: A => `يمكنك فقط إرسال ${CUR(A)}${TL(A)} في الأسبوع, الرجاء تحديد كمية أصغر`
      },
      amount: `المبلغ المراد إرساله`,
      address: `عنوان الوجهة (بدون اللاحقة '0x')`,
      transfer: `تحويل إثيريوم`,
      transferAll: `تحويل كل شيء`,
      balance: Y => `رصيدك الحالي من الإثيريوم هو ${typeof Y === 'string' ? Y.slice(0,8) :''}`,
      ethAddress: `عنوان إثيريوم`,
      txCost: (B, A) => `تكلفة المعاملة الحالية هو ${CUR(A)}${B}`,
      transferLowercase: `تحويل إثيريوم`,
      note: A => `يرجى الانتباه: يمكنك فقط تحويل ${CUR(A)}${TL(A)} في الأسبوع من Lndr`,
      warning: (Z, A) => `لديك ${CUR(A)}${Z} متبقي من حدك ${CUR(A)}${TL(A)}`,
    },
    sendBcpt: {
      error: {
        insufficient: `ليس لديك ما يكفي من BCPT لهذه العملية`,
        generic: `حدث خطأ في عملية التحويل، الرجاء إعادة المحاولة مرة أخرى لاحقاً`,
      },
      transfer: `تحويل BCPT`,
      address: `عنوان الوجهة (بدون اللاحقة '0x')`,
      balance: Y => `رصيدك الحالي من BCPT هو ${typeof Y === 'string' ? Y.slice(0,8) :''}`,
      bcptAddress: `عنوان BCPT`,
    },
    panelHeaders: [
      `عنوان إثيريوم (& BCPT)`,
      `رصيد الإثيريوم`,
      `رصيد BCPT`,
      `إزالة الحساب`,
      `سجل معاملات إثيريوم`,
      `تمكين باي بال`,
      `تغيير العملات الرئيسية`,
      `تغيير رمز PIN‏`,
      `تغيير البريد الإلكتروني`,
      `تغيير مهلة القفل`,
      `استذكار`,
      `إشعارات`,
    ],
    viewEtherscan: `عرض تاريخ Etherscan`,
    profilePic: {
      change: `تغيير صورة الملف الشخصي`,
      setError: `حدث خطأ اثناء رفع صورتك، الرجاء إعادة المحاولة لاحقاً`,
      getError: `حدث خطأ أثناء استرداد صورة ملفك الشخصي`,
      setSuccess: `تم تحديث صورة الملف الشخصي`,
    },
    logoutSuccess: `تم تسجيل الخروج بنجاح!`,
    logoutError: generalCommunicationError,
  },

  currentBalance: {
    eth: `رصيدك الحالي من الإثيريوم هو:`,
    bcpt: `رصيدك الحالي من BCPT هو:`,
  },

  welcomeView: {
    by: `تم تصميمه من قبل`,
    makeItEasy: `يسهّل Lndr عملية تتبع الديون البسيطة`,
    weHelpFriends: `نحن نساعد الأصدقاء للعيش والعمل واللعب معاً.`,
    len: `Len`,
    dot: `.`,
    der: `der`,
    shareDinner: `شاركوا عشاءً`,
    fillTank: `املؤوا خزان وقودكم`,
    travelTogether: `سافروا معاً`,
    runEthereum: `نحن نعمل بالإثيريوم!`,
    firstLendingApp: `أول تطبيق إقراض للهواتف المحمولة مؤمن على البلوكتشين.`,
    greatConcert: `شاهد حفلاً رائعاً`,
    youPlayWithFriends: `أنت تلعب مع الأصدقاء؛ \n سوف نتولى الفاتورة...`,
    start: `البدء`,
  },

  walkthrough: {
    skip: `تخطى`,
    continue: `استمر`,
    step1: {
      easyToUse: `Lndr هو أسهل طريقة لتقسيم الفواتير والمصاريف حصة وتسوية الديون بسيطة مع الأهل والأصدقاء، كل ذلك بشكل آمن على blockchain.`,
      len: `Len`,
      der: `der`,
    },
    step2: {
      getStarted: `لتبدأ مع Lndr، وسوف تحتاج لإضافة صديق.`,
      friendsScreen: `زيارة الأصدقاء الشاشة للبحث عن أو إضافة أو دعوة أصدقائك وعائلتك للاتصال على Lndr.`,
    },
    step3: {
      title: `تسجيل عملية`,
      easy: `تقسيم مشروع قانون أو إضافة ديون مع صديق من السهل في Lndr!`,
      selectFriend: `اختر صديقك، العملة والمبلغ.`,
      addMemo: `إضافة بعض الملاحظات في المربع مذكرة وانقر على إرسال.`,
    },
    step4: {
      title: `دفع الحساب`,
      ready: `جاهز دفع الحساب؟`,
      payPal: `عندما حان الوقت لتسوية مع Lndr، \ N- يمكنك اختيار باي بال:`,
      ether: `- cryptocurrencies مثل الأثير:`,
      cash: `- أو ببساطة تسجيل التسوية النقدية:`,
      positiveBalance: `10.46`,
    },
    step5: {
      title: `متعدد العملات`,
      multiCurrency: `Lndr يمكن تتبع المعاملات الخاصة بك حتى لو لم يحدث بعملات مختلفة.`,
      exchangeRate: `عندما تقرر لتسوية حتى مع صديقك، سيتم تحويل جميع المعاملات في العملات الأساسية باستخدام معظم أسعار صرف ما يصل إلى تاريخ المتاحة.`,
      start: `بدء استخدام Lndr!`,
    }
  },

  debtManagement: {
    shell: `عملية جديدة`,
    add: `إضافة دين`,
    selectFriend: `اختيار`,
    lend: `إقَراض جديد`,
    borrow: `دين جديد`,
    owesMe: `تدين لي`,
    iOwe: `انا مدين`,
    iLent: `صديق مدين لي`,
    iBorrowed: `أنا أدين لصديق`,
    settleUpLower: `دفع الحساب`,
    amountToSettle: `المبلغ الواجب دفعه`,
    total: `المجموع`,
    record: `سجل`,
    records: `سجلات`,
    chooseCurrency: `اختيار العملة`,

    createError: {
      amountTooLow: `يجب أن يكون المبلغ أكبر من 0$.`,
      amountTooHigh: `يجب أن يكون المبلغ أقل من 1,000,000,000$.`,
      selfAsFriend: `لا يمكنك إنشاء دين مع نفسك، اختر صديقاً آخر`,
      pending: `الرجاء حل معاملتك المعلقة مع هذا المستخدم قبل القيام بواحدة أخرى`,
      insufficientEth: E => `أنت بحاجة ${E} ETH على الأقل لسداد المبلغ, انتقل إلى الإعدادات لمعرفة الرصيد الخاص بك`,
    },
    fields: {
      currency: ` العملة`,
      amount: `المبلغ`,
      settlementAmount: `كمية مبلغ السداد`,
      selectFriend: `صديق`,
      memo: `مذكرة`,
      direction: `حدد مبلغ السداد الصحيح`,
    },
    memo: {
      example: `اكتب مذكرة هنا`,
    },
    direction: {
      lend: X => `${X} يدين لي`,
      borrow: X => `انا أدين لـ ${X}`,
      initiatedLend: X => `${X} يقول أنه/أنها مدين`,
      initiatedBorrow: X => `${X} يقول أنك مدين`,
      pendingLend: X => `@${X} مدين لك`,
      pendingBorrow: X => `أنت مدين لـ @${X}`,
      pendingLendSettlement: S => `@${S.debtorNickname} طلب سداد مبلغ بـ ${S.settlementCurrency}`,
      pendingBorrowSettlement: S => `@${S.creditorNickname} يريد السداد معك بـ ${S.settlementCurrency}`,
      pendingLendSettlementMe: S => `أنت طلبت السداد مع @${S.debtorNickname} بـ ${S.settlementCurrency}`,
      pendingBorrowSettlementMe: S => `أنت طلبت أن يسدد @${S.creditorNickname} بـ ${S.settlementCurrency}`,
    },
    pending: {
      success: F => `تم إرسال الديون المعلقة إلى @${F.nickname}`,
      error: generalCommunicationError
    },
    pendingParens: `(قيد الانتظار)`,
    confirmation: {
      transaction: CP => `تم بنجاح تأكيد المعاملة بـ ${CP}`,
      settlement: CP => `تم بنجاح تأكيد السداد بـ ${CP}`,
      error: `تعذر تأكيد المعاملة حالياً، الرجاء إعادة المحاولة لاحقاً`,
    },
    rejection: {
      success: `تم رفض المعاملة.`,
      error: `تعذر تأكيد المعاملة حالياً، الرجاء إعادة المحاولة`,
    },
    balances: {
      error: `تعذر تحميل الأرصدة حالياً، الرجاء إعادة المحاولة لاحقاً`,
    },
    for: M => `لـ ${M}`,
    settleUp: `دفع الحساب`,
    settleTotal: `إجمالي مبلغ السداد`,
    settleUpMemo: (D, A) => `${D === 'lend' ? 'سداد مبلغ لـ' :  'طلب سداد مبلغ لـ'} ${A}`,
    recordSettleUpMemo: `دفع الحساب`,
    balanceByCurrency: `تفاصيل`,
  },
  settlementManagement: {
    bilateral: {
      error: {
        insufficient: X => `عملية سدادك للمبلغ مع  ${X} فشلت نظراً لعدم توفر رصيدٍ كافي`,
        generic: X => `حدث خطأ في معالجة عملية سدادك مع ${X}`,
      }
    },
    eth: `سدد الحساب بالإثيريوم`,
    paypal: `دفع الفاتورة مع باي بال`,
    nonPayment: `سجّل مبلغ سداد`,
    select: `حدد نوع التسوية`,
  },

  accountViewLanguage: {
    lndr: `L n d r`,
    home: `الرئيسية`,
    friends: `الأصدقاء`,
    activity: `النشاط`,
  },

  notifications: {
    toggleNotifications: `تفعيل الإشعارات`,
    enable: `تشغيل`,
    disable: `إطفاء`,
  },

  pendingTransactionsLanguage: {
    shell: `معاملة قيد الانتظار`,
    title: `قيد الانتظار`,
    memo: `مذكرة:`,
    for: `إلى`,
    none: `ليس لديك أي معاملات معلقة`,
    confirmationQuestion: `هل أنت متأكد من تأكيد هذه المعاملة؟`,
    pendingAnnouncement: `هذه المعاملة في انتظار تأكيد الطرف الآخر. `,
    bilateral: `في انتظار اكتمال تحويل الإثيريوم`,
    confirm: `تأكيد`,
    reject: `رفض المعاملة`,
    rejectRequest: `رفض`,
    cancel: `إلغاء المعاملة`,
    direction: {
      lend: (X, Z) => `@${X} يدين لك بـ ${Z}`,
      borrow: (X, Z) => `أنت تدين بـ @${X} ${Z}`,
    }
  },

  pendingSettlementsLanguage: {
    shell: `مبلغ سداد معلق`,
    title: `قيد الانتظار`,
    none: `ليس لديك أي مبالغ معلق للسداد`,
    confirm: `تأكيد`,
    reject: `رفض السداد`,
    cancel: `إلغاء التسديد`,
  },

  recentTransactionsLanguage: {
    title: `مكتملة`,
    none: `ليس لديك أي معاملات مكتملة`,
    direction: {
      lend: (X, Z) => `@${X} يدين لك بـ ${Z}`,
      borrow: (X, Z) => `أنت تدين بـ @${X} ${Z}`
    },
    balance: `الرصيد`,
    consolidatedBalance: `الرصيد`,
    friends: FS => `(${FS === 1 ? 'صديق' :'أصدقاء'} ${FS} من)`,
  },

  tabs: {
    home: `الرئيسية `,
    friends: `الأصدقاء`,
    activity: `النشاط`,
  },

  confirmation: {
    shell: `تأكيد`,
    done: `تم`,
    create: {
      start: `لقد أرسلنا السجل لجون للتأكيد`,
      end: `.`,
    },
    confirm: {
      start: `لقد أكدت هذا السجل من `,
      end: `.`,
    },
    reject: {
      start: `لقد أعلمنا  `,
      end: `. أنك رفضت هذا السجل`,
    },
    confirmFriend: {
      start: `أنت الآن صديقٌ مع `,
      end: `!`,
    },
    rejectFriend: {
      start: `لقد رفضت طلب الصداقة من `,
      end: `.`,
    },
    rejectOutboundFriendRequest: {
      start: `لقد ألغت صديق طلب `,
      end: `.`,
    },
    ethSent: {
      start: `لقد أرسلت `,
      end: ` إثيريوم بنجاح ورقم الهاش لمعاملتك هو `,
    },
    bcptSent: {
      start: ` بنجاح ورقم الهاش لمعاملتك هو `,
      end: ` لقد أرسلت  BCPT `,
    },
    requestPayPalPayee: {
      start: ` أعرف أن كنت ترغب في تسوية مع باي بال`,
      end: `لقد ترك `, 
    },
    requestPayPalPayment: {
      start: ` أعرف أنك تريد أن تدفع مع باي بال`,
      end: `لقد ترك `, 
    },
    settledWithPayPal: {
      start: ` تعرف أنك قد استقر مع باي بال`,
      end: `لقد ترك `, 
    },
    status: ` حالة هذه المعاملة من تبويب النشاط`,
    activity: `يمكنك رؤية`,
  },

  pendingFriendRequestsLanguage: {
    shell: `طلب صداقة`,
    message: `طلبات الصداقة`,
    request: F => `@${F} يريد أن يصبح صديقاً معك!`,
    outbound: F => `أنت أرسلت طلب صداقة إلى @${F}`,
  },

  privacyPolicy: {
    link: `lndr.io/terms/`,
    message: `بالنقر أدناه فأنت تؤكد أنك قرأت وتوافق على سياسة الخصوصية Blockmason ل. Blockmason قد تستخدم عنوان البريد الإلكتروني لإرسال تحديثات حول Blockmason وLNDR. هنا هو وجود صلة لسياسة الخصوصية:`
  },

  payPalLanguage: {
    connectPayPal: `ربط باي بال`,
    connectSuccess: `باي بال تمكين بنجاح.`,
    disconnectPayPal: `قطع باي بال`,
    disconnected: `باي بال قطع الاتصال.`,
    requestPayPalPayment: `طلب الدفع باي بال`,
    sendWithPayPal: `إرسال مع باي بال`,
    enablePayPal: `تمكين باي بال`,
    requestPayPalPayee: `طلب باي بال`,
    enablePayPalForFriend: F => `يتيح تمكين PayPal لـ @${F} أن يدفع لك.`,
    friendNotEnabled: F => `لم يقم @${F} بتمكين دفعات PayPal`,
    friendRequestedConnect: F => `يريد @${F} الدفع لك عبر PayPal`,
    requestFriendConnect: F => `لقد طلبت من @${F} تمكين PayPal`,
    feesNotification: `لا تشمل رسوم باي بال`,
    feesInformationHeader: `باي بال معلومات الرسوم`,
    feesInformation: `1. يجب أن تكون مرتبطة حساب باي بال الخاص بك إلى حساب مصرفي.
    
2. دفع بعملة مختلفة عن العملة البنك الذي تتعامل معه سوف تتحمل رسوم $ 0.35.

3. رسوم نقل دولية:
    الولايات المتحدة الأمريكية إلى كندا / أوروبا: $ 2.99
    الولايات المتحدة الأمريكية إلى أي مكان آخر: $ 4.99

4. هذه الرسوم ليست شاملة. لأحدث المعلومات يرجى زيارة:

    https://www.paypal.com/us/webapps/mpp/paypal-fees#sending-us`,
    payPalSite: `PayPal.com`,
  }
}
