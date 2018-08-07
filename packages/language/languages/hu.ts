import { currencySymbols, transferLimits } from 'lndr/currencies'

const CUR = currencySymbols
const TL = transferLimits

const generalCommunicationError = 'Probléma merült fel a szerverrel való kommunikáció során, kérjük, később próbálja újra.'

export default {

  applicationName: `Lndr`,
  helloWorld: `Helló Világ`,
  submit: `BEKÜLDÉS`,
  next: `Következő`,
  cancel: `Törlés`,
  back: `Lépjen Vissza`,
  copy: `Másolja a Vágólapra`,
  confirmAccount: `Megerősítés`,
  createAccount: `Fiók Létrehozása`,
  recoverAccount: `Fiók visszaállítása`,
  removeAccount: `Fiók Törlése`,
  updateAccount: `Fiók frissítése`,
  loginAction: `Kinyitás`,
  enterPin: `KÉREM, ADJA MEG PiN-KÓDJÁT`,
  changePin: `PiN-kód Módosítása`,
  enterCurrentPin: `Adja Meg Érvényes PiN-kódját`,
  logoutAction: `KIJELENTKEZÉS`,
  seeAllActivity: `Összes tevékenysége`,
  copiedClipboard: `Vágólapra Másolva`,
  pleaseWait: `Kérem, várjon`,
  addFriend: `Ismerős Hozzáadása`,
  addFriendConfirmationQuestion: `Biztos benne, hogy ezt a felhasználót ismerősként hozzáadja?`,
  removeFriend: `Ismerős Eltávolítása`,
  currentFriends: `Jelenlegi Ismerősei`,
  removeFriendConfirmationQuestion: `Biztos, hogy ezt a felhasználót el szeretné távolítani ismerősei közül?`,
  inviteFriends: `Ismerősök Meghívása az Lndr Alkalmazásba`,
  tryLndr: `Itt kipróbálhatja a Lndr Appot:`,
  friendInfo: `További információ erről a kapcsolatról:`,
  noFriends: `A kezdéshez adjon hozzá néhány ismerőst!`,
  noMatches: `A feltételeknek megfelelő felhasználót nem találtunk`,
  noBalances: `Önnek nincs rögzített tartozása`,
  addFriendButton: `Ismerős Hozzáadása`,
  alreadyFriendsButton: `Ismerősök`,
  friendShell: `Ismerős`,
  tip: `Tipp:`,
  notice: `Értesítés:`,
  welcome: `Üdvözöljük a saját LNDR alkalmazásában`,
  noBalanceWarning: `Jelenleg nem tudjuk egyenlegét betölteni, kérjük, később próbálja újra.`,
  totalBalance: `Összes Egyenleg:`,
  totalBalances: `Összes Partner:`,
  newTransaction: `Új Tranzakció`,
  needsReview: `Elbírálás Alatt`,
  owesMe: `Nekem tartoznak`,
  iOwe: `Én tartozom valakinek`,
  newPassword: `Új Jelszó (minimum 8 karakter)`,
  confirmPassword: `Jelszó Megerősítése`,
  newPin: `Új, 4-jegyű PiN-kód`,
  enterNewPin: `ADJON MEG EGY ÚJ, 4-JEGYŰ PiN-KÓDOT`,
  confirmPin: `KÉRJÜK, ERŐSÍTSE MEG PiN-KÓDJÁT`,
  newAccount: `Új felhasználói fiók létrehozása`,
  loginAccount: `Fiók kinyitása`,
  recoverExistingAccount: `Meglévő fiók helyreállítása`,
  recoverMnemonic: `Emlékeztető (12 szó jelenik \nha létrehozta fiókját)`,
  recoverMnemonicLengthError: `Az emlékeztetőnek pontosan 12 szóból kell állnia`,
  successTitle: `Sikerült`,
  errorTitle: `Hiba`,
  showMnemonic: `Jelenítse Meg A 12 Szavas Emlékeztetőt`,
  mnemonicExhortation: `Fiókja visszaállításához erre a 12 szavas mondatra van szüksége, kérjük tárolja biztonságos és titkos helyen.`,
  addressExhortation: `Ahhoz, hogy a Lndr segítségével rendezhesse tartozásait, küldje el címére az Ethereumot.`,
  removeAccountTitle: `Biztos, hogy el szeretné távolítani fiókját erről az eszközről?`,
  removeAccountExhortation: `Ügyeljen arra, hogy később hozzá tudjon férni emlékeztetőjéhez, mivel Fiókadatai erről az eszközről végleges törlésre kerülnek.`,
  myAccount: `Saját Fiók`,
  setNickname: `Állítson be egy becenevet, hogy ismerősei erre rákereshessenek.`,
  setEmail: `Adjon meg egy email címet, hogy a Lndr frissítésekről tájékoztatást kapjon.`,
  nickname: `Becenév (kisbetűk és számok)`,
  email: `Email Cím`,
  accountManagement: {
    nickname: {
      lengthViolation: `Becenév legalább 3 karakter legyen.`,
      compositionViolation: `Becenév csak számokból és kisbetűk állhat.`,
      duplicationViolation: `Ez a becenév már foglalt`,
    },
    email: {
      compositionViolation: `Email formátuma helytelen`,
      duplicationViolation: `Ez az email már foglalt`,
    },
    pin: {
      lengthViolation: `A PiN-kód legalább 4 karakter legyen.`,
      matchViolation: `A PiN-kódok egyeznie kell.`,
      failedHashComparison: `A PiN-kód nem érvényes, kérjük, próbálja újra.`,
      updateSuccess: `PiN-kódját frissítettük`,
      updateError: `Hiba történt a PiN-kód frissítése során`,
    },
    mnemonic: {
      lengthViolation: `Az emlékeztetőnek legalább 12 szóból kell állnia.`,
      unableToValidate: `A megadott emlékeztető nem volt érvényes, kérjük, próbálja újra.`,
    },
    setNickname: {
      success: `Beceneve mentésre került.`,
      error: generalCommunicationError
    },
    setEmail: {
      success: `Email címe mentésre került.`,
      error: generalCommunicationError
    },
    lockTimeout: {
      top: `PiN-kódját újból meg kell adnia`,
      bottom: `perc inaktivitást követően`,
      update: `Frissítés`,
      error: `Fiók beállításait nem sikerült frissíteni`,
      success: `Időtúllépés Zárolása Frissítve`,
    },
    addFriend: {
      success: X => `Ismerősnek jelölés elküldve @${X} `,
      error: generalCommunicationError
    },
    removeFriend: {
      success: X => `Ismerősök közül törölve: @${X}`,
      error: generalCommunicationError
    },
    loadInformation: {
      error: generalCommunicationError
    },
    ethBalance: {
      display: Y => `ETH egyenlege ${String (Y) .slice (0,8)}`,
      getError: `Az Eth egyenleg lekérdezése nem sikerült`,
      manage: `ETH KEZELÉSE`,
    },
    sendEth: {
      error: {
        insufficient: `Ehhez a tranzakcióhoz nincs elegendő ETH`,
        generic: `Az átutalás során hiba történt, kérjük, később próbálja újra`,
        address: `Kérjük, érvényes címet adjon meg`,
        amount: `Kérjük, egy 0-nál nagyobb összeget adjon meg`,
        limitExceeded: A => `Hetente csak ${CUR(A)} ${TL(A)} összeget küldhet, kérjük, adjon meg egy kisebb összeget`
      },
      amount: `Küldésre Szánt Összeg`,
      address: `Rendeltetési Cím ('0x' előtag nélkül)`,
      transfer: `ETH Átutalása`,
      transferAll: `Minden átutalása`,
      balance: Y => `Jelenlegi ETH egyenlege ${typeof Y === 'string'? Y.slice (0,8): ''} `,
      ethAddress: `Ethereum Cím`,
      txCost: (B, A) => `Jelenlegi tranzakciós költsége ${CUR(A)} ${B}`,
      transferLowercase: `Eth Átutalása`,
      note: A => `Kérjük, vegye figyelembe: a Lndr rendszerén kívül hetente csak ${CUR(A)} ${TL(A)} összeget utalhat át`,
      warning: (Z, A) => `${CUR(A)} ${Z} a fennmaradó összeg a ${CUR(A)} ${TL(A)} limitjéből:`,
    },
    sendBcpt: {
      error: {
        insufficient: `Ehhez a tranzakcióhoz nincs elegendő BCPT`,
        generic: `Az átutalás során hiba történt, kérjük, később próbálja újra`,
      },
      transfer: `BCPT Átutalása`,
      address: `Rendeltetési Cím ('0x' előtag nélkül)`,
      balance: Y => `Jelenlegi BCPT egyenlege ${typeof Y === 'string'? Y.slice (0,8): ''} `,
      bcptAddress: `BCPT Cím`,
    },
    changeProfilePic: `Módosításhoz Érintse Meg`,
    addProfilePic: `Használjon a Telefonon Található Képet`,
    panelHeaders: [
      `ETH (& BCPT) Cím`,
      `ETH Egyenleg`,
      `BCPT Egyenleg`,
      `Fiók Törlése`,
      `ETH Tranzakció Előzmények`,
      `Engedélyezze a PayPalt`,
      `Megváltoztathatja az elsődleges pénzneme`,
      `PiN-kód Módosítása`,
      `Becenév Módosítása`,
      `Email Módosítása`,
      `Profilkép Módosítása`,
      `Időtúllépés Zárolás Módosítása`,
      `Emlékeztető`,
      `Értesítések`,
    ],
    viewEtherscan: `Etherscan Előzmények Megtekintése`,
    profilePic: {
      change: `Profilkép Módosítása`,
      setError: `Hiba történt a kép feltöltése közben, kérjük, később próbálja újra`,
      getError: `Hiba történt profilképének visszaállítása közben`,
      setSuccess: `Profilképe frissítve`,
    },
    logoutSuccess: `Sikeresen kijelentkezett!`,
    logoutError: generalCommunicationError,
  },

  currentBalance: {
    eth: `Aktuális Eth egyenlege:`,
    bcpt: `Aktuális BCPT egyenlege:`,
  },

  welcomeView: {
    by: `KÉSZÍTETTE`,
    makeItEasy: `A Lndr megkönnyíti egyszerű tartozásai nyomon követését`,
    weHelpFriends: `Segítünk abban, hogy az ismerősök együtt élhessen, dolgozhassanak és játszhassanak.`,
    len: `Len`,
    dot: `.`,
    der: `der`,
    shareDinner: `Vacsorázzanak Közösen`,
    fillTank: `Töltse Tele Tankját`,
    travelTogether: `Utazzanak Együtt`,
    runEthereum: `ETH segítségével működünk!`,
    firstLendingApp: `Az első olyan hitelezéssel foglalkozó mobil alkalmazás, melynek biztonságát blokklánc nyújtja.`,
    greatConcert: `Vegyen Részt Egy Nagyszerű Koncerten`,
    youPlayWithFriends: `Míg ismerőseivel játszik;\n mi figyelünk...`,
    start: `Kezdje El`,
  },

  debtManagement: {
    shell: `Új Tranzakció`,
    add: `Tartozás Hozzáadása`,
    selectFriend: `Kiválasztás`,
    lend: `Új Kölcsön`,
    borrow: `Új Tartozás`,
    iLent: `Egy ismerősöm tartozik nekem`,
    iBorrowed: `Tartozom egy ismerősömnek`,
    settleUpLower: `Kiegyenlítés`,
    amountToSettle: `Kiegyenlítendő Összeg`,
    total: `Összes`,
    record: `feljegyzés`,
    records: `feljegyzések`,
    chooseCurrency: `Válasszon pénznemet`,

    createError: {
      amountTooLow: `Az összegnek nagyobbnak kell lennie, mint $ 0`,
      amountTooHigh: `Az összegnek kevesebbnek kell lennie, mint $ 1.000.000.000`,
      selfAsFriend: `Saját magának nem tartozhat, válasszon egy másik ismerőst`,
      pending: `Kérjük, mielőtt ezzel a felhasználóval új tranzakciót hozna létre, rendezze vele a függőben levő tranzakciókat`,
      insufficientEth: E => `Meg kell legalább ${E} ETH összeget ki kell fizetnie, egyenlegét a Beállítások menüpontban tekintheti meg`,
    },
    fields: {
      currency: `Pénznem`,
      amount: `Összeg`,
      settlementAmount: `Kifizetendő Összeg`,
      selectFriend: `Ismerős`,
      memo: `Memó`,
      direction: `Válassza Ki a Helyes Állítást`,
    },
    memo: {
      example: `Írja ide az emlékeztető memót`,
    },
    direction: {
      lend: X => `${X} tartozik nekem`,
      borrow: X => `Nekik tartozom ${X}`,
      initiatedLend: X => `${X} mondja, ő tartozik`,
      initiatedBorrow: X => `${X} mondja, Ön tartozik`,
      pendingLend: X => `@${X} tartozik Önnek`,
      pendingBorrow: X => `Ön tartozik neki @${X} `,
      pendingLendSettlement: S => `@${S.debtorNickname} kifizetést kér az alábbi pénznemben ${S.settlementCurrency}`,
      pendingBorrowSettlement: S => `@${S.creditorNickname} szeretne fizetni Önnek az alábbi pénznemben ${S.settlementCurrency} `,
      pendingLendSettlementMe: S => `Ön kérte, hogy tartozása a @${S.debtorNickname} felhasználóval ${S.settlementCurrency} pénznemben rendezésre kerüljön`,
      pendingBorrowSettlementMe: S => `Ön kérte, hogy @${S.creditorNickname} rendezze tartozását ${S.settlementCurrency} pénznemben`,
    },
    pending: {
      success: F => `Függőben levő tartozás elküldve @${F.nickname} részére`,
      error: generalCommunicationError
    },
    pendingParens: `(függőben levő)`,
    confirmation: {
      transaction: CP => `Tranzakció ${CP}-val sikeresen megerősítve`,
      settlement: CP => `Kifizetés ${CP}-val sikeresen megerősítve`,
      error: `Jelenleg nem tudjuk visszaigazolni a tranzakciót, kérjük, később próbálja újra.`,
    },
    rejection: {
      success: `A tranzakció elutasításra került`,
      error: `Jelenleg nem tudjuk elutasítani a tranzakciót, kérjük, később próbálja újra.`,
    },
    balances: {
      error: `Jelenleg nem tudjuk betölteni az egyenlegeket, kérjük, később próbálja újra.`,
    },
    for: M => ` ${M} részére`,
    settleUp: `Kiegyenlítés`,
    settleTotal: `Összes Kiegyenlítése`,
    settleUpMemo: (D, A) => `${D === 'lend'? 'Kiegyenlítés neki': 'Kérés a kiegyenlítéshez neki'} ${A} `,
    recordSettleUpMemo: `kiegyenlítés alatt`,
    balanceByCurrency: `Részletek`,
  },
  settlementManagement: {
    bilateral: {
      error: {
        insufficient: X => `A ${X} való kifizetés elégtelen pénzeszközök miatt nem sikerült`,
        generic: X => `Hiba történt a ${X} számára történt kifizetése közben`,
      }
    },
    eth: `Kiegyenlítés ETH használatával`,
    paypal: `Kiegyenlítés PayPal használatával`,
    nonPayment: `Kifizetés Rögzítése`,
  },

  accountViewLanguage: {
    lndr: `L n d r`,
    home: `Kezdőlap`,
    friends: `Ismerősök`,
    activity: `Tevékenység`,
  },

  notifications: {
    toggleNotifications: `Toggle Értesítések`,
    enable: `Bekapcsolás`,
    disable: `Kikapcsolás`,
  },

  pendingTransactionsLanguage: {
    shell: `Függő Tranzakciók`,
    title: `Függőben levő`,
    memo: `Memó:`,
    for: `Neki:`,
    none: `Nincsenek függőben lévő tranzakciói`,
    confirmationQuestion: `Biztos, hogy szeretné megerősíteni ezt a tranzakciót?`,
    pendingAnnouncement: `Ez a tranzakció a másik fél megerősítésére vár.`,
    bilateral: `Várakozás Eth átutalás befejezéséhez`,
    confirm: `Megerősítés`,
    reject: `Tranzakció Elutasítása`,
    rejectRequest: `Elutasítás`,
    cancel: `Tranzakció Törlése`,
    direction: {
      lend: (X, Z) => `@${X} tartozik Önnek ${Z}`,
      borrow: (X, Z) => `Ön tartozik @${X} ${Z}`,
    }
  },

  pendingSettlementsLanguage: {
    shell: `Függő Kifizetés`,
    title: `Függőben levő`,
    none: `Nincsenek függőben lévő kifizetések`,
    confirm: `Megerősítés`,
    reject: `Kifizetés Elutasítása`,
    cancel: `Kifizetés Törlése`,
  },

  recentTransactionsLanguage: {
    title: `Végrehajtva`,
    none: `Nincsenek befejezett tranzakciói`,
    direction: {
      lend: (X, Z) => `@${X} tartozik Önnek ${Z}`,
      borrow: (X, Z) => `Ön tartozik @${X} ${Z}`
    },
    balance: `Egyenleg`,
    consolidatedBalance: `Egyenleg`,
    friends: FS => `(${FS} ${FS === 1? 'ismerősétől': 'ismerőseitől'})`,
  },

  tabs: {
    home: `Kezdőlap `,
    friends: `Ismerősök`,
    activity: `Tevékenység`,
  },

  confirmation: {
    shell: `Megerősítés`,
    done: `Kész`,
    create: {
      start: `Az adatot visszaigazolásra elküldtük `,
      end: `nak.`,
    },
    confirm: {
      start: ` `,
      end: `már megerősítette ezt az adatot.`,
    },
    reject: {
      start: `Tudatjuk `,
      end: `al, hogy ezt az adatot elutasította..`,
    },
    confirmFriend: {
      start: `Most már `,
      end: ` ismerőse!`,
    },
    rejectFriend: {
      start: `Elutasította `,
      end: ` ismerősnek jelölését.`,
    },
    ethSent: {
      start: `Sikeresen elküldött `,
      end: ` ETH-t, és a tranzakciós hash `,
    },
    bcptSent: {
      start: `Sikeresen elküldött `,
      end: ` BCPT-t, és a tranzakciós hash `,
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
    status: `A tevékenység fülön megtekintheti a jelen `,
    activity: `tranzakció státuszát.`,
  },

  pendingFriendRequestsLanguage: {
    shell: `Ismerősnek Jelölés`,
    message: `Ismerősnek Jelölések`,
    request: F => `@${F} szeretne az ismerőse lenni! `,
  },

  privacyPolicy: {
    link: `lndr.io/terms/`,
    message: `Az alábbi linkre kattintva Ön megerősíti, hogy elolvasta és elfogadja a Blockmason adatvédelmi irányelveit. Blockmason használhatja az e-mail címét, hogy küldjön frissítéseket Blockmason és LNDR. Itt van egy link, hogy az adatvédelmi politika:`
  },

  payPalLanguage: {
    connectPayPal: `Kapcsolatba PayPal`,
    connectSuccess: `PayPal engedélyezése sikeresen.`,
    disconnectPayPal: `Bontása PayPal`,
    disconnected: `PayPal csatlakoztatva.`,
    requestPayPalPayment: `Request PayPal fizetés`,
    sendWithPayPal: `Küldj A PayPal`,
    enablePayPal: `Engedélyezze a PayPalt`,
    requestPayPalPayee: `Kérjen PayPal`,
    enablePayPalForFriend: F => `engedélyezése PayPal lehetővé teszi @${F} fizetni you.`,
    friendNotEnabled: F => `@${F} nem tette lehetővé PayPal kifizetések.`,
    friendRequestedConnect: F => `@${F} akar fizetni ön keresztül PayPal`,
    requestFriendConnect: F => `Te kérdezted @${F}, hogy PayPal`,
  }
}
