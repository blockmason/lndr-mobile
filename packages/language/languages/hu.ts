import { currencySymbols, transferLimits } from 'lndr/currencies'

const CUR = currencySymbols
const TL = transferLimits

const generalCommunicationError = 'Volt egy probléma kommunikál a szerverrel, próbálkozzon újra később.'

export default {

  applicationName: `Lndr`,
  helloWorld: `Helló Világ`,
  submit: `BEKÜLDÉSE`,
  next: `Következő`,
  cancel: `Megszünteti`,
  back: `menjen vissza`,
  copy: `Másolja a vágólapra`,
  confirmAccount: `megerősít`,
  createAccount: `Fiók létrehozása`,
  recoverAccount: `visszaállítása számla`,
  removeAccount: `Fiók törlése`,
  updateAccount: `Fiók frissítése`,
  loginAction: `Kinyit`,
  enterPin: `Írja be a PIN`,
  changePin: `PIN-kód módosítása`,
  enterCurrentPin: `Enter Current PIN`,
  logoutAction: `KIJELENTKEZÉS`,
  seeAllActivity: `Összes tevékenysége`,
  copiedClipboard: `Vágólapra másolva`,
  pleaseWait: `Kérlek várj`,
  addFriend: `Ismerős hozzáadása`,
  addFriendConfirmationQuestion: `Biztos, hogy meg szeretné adni ezt a felhasználót mint egy barát?`,
  removeFriend: `Barát eltávolítása`,
  currentFriends: `jelenlegi barátai`,
  removeFriendConfirmationQuestion: `Biztos, hogy el szeretné távolítani ezt a felhasználót egy barát?`,
  inviteFriends: `Ismerősök meghívása, hogy Lndr`,
  tryLndr: `Nézze meg a Lndr App itt:`,
  friendInfo: `További információ erről a barátság:`,
  noFriends: `Adjunk hozzá néhány barátot, hogy az induláshoz!`,
  noMatches: `Nincs megfelelő felhasználók talált`,
  noBalances: `Ön nincs rögzített tartozások`,
  addFriendButton: `Ismerős hozzáadása`,
  alreadyFriendsButton: `barátok`,
  friendShell: `Barát`,
  tip: `Tipp:`,
  notice: `Értesítés:`,
  welcome: `Üdvözöljük a LNDR`,
  noBalanceWarning: `Nem tudtuk betölteni az egyensúlyt ebben az időben, próbáld újra később.`,
  totalBalance: `Összesen Egyenleg:`,
  totalBalances: `Összesen ügyfeleknek:`,
  newTransaction: `új Transaction`,
  needsReview: `igényeinek felülvizsgálata`,
  owesMe: `Én tartozott`,
  iOwe: `Tartozom valakinek`,
  newPassword: `Új jelszó (minimum 8 karakter)`,
  confirmPassword: `Jelszó megerősítése`,
  newPin: `Új 4-jegyű PIN`,
  enterNewPin: `ÁLLÍTSA egy új 4-számjegyű PIN`,
  confirmPin: `Kérjük, erősítse meg a PIN`,
  newAccount: `Új felhasználó létrehozása`,
  loginAccount: `Kinyit fiókjába`,
  recoverExistingAccount: `Helyreállítása egy meglévő fiókot`,
  recoverMnemonic: `Mnemonic (12 szó jelenik \ nHa a fiók létrehozása)`,
  recoverMnemonicLengthError: `Mnemonic kell pontosan 12 szó`,
  successTitle: `Siker`,
  errorTitle: `Hiba`,
  showMnemonic: `Itt található az 12-Word Mnemonic`,
  mnemonicExhortation: `Ez a 12 szavas mondat visszaállításához szükséges fiókjába, kérem, tartsa meg egy biztonságos és titkos`,
  addressExhortation: `Küldj Ethereum a címét, hogy rendezze adósságait Lndr`,
  removeAccountTitle: `Biztos, hogy el szeretné távolítani a fiókot ezen az eszközön?`,
  removeAccountExhortation: `Ügyeljen arra, hogy hozzá tud férni a emlékezeterősítő fiókjának visszaállításához később, mivel ez egy állandó eltávolítása Fiókadatai erről az eszközről.`,
  myAccount: `A fiókom`,
  setNickname: `Állítsa be a becenevet, így ismerősei lehet keresni az Ön számára`,
  setEmail: `Állítsa egy e-mailt, hogy tájékoztatást kapjon Lndr frissítések`,
  nickname: `Becenév (kisbetűs és számok)`,
  email: `Email cím`,
  accountManagement: {
    nickname: {
      lengthViolation: `Becenév legyen legalább 3 karaktert.`,
      compositionViolation: `Becenevet csak számokból és kisbetűk.`,
      duplicationViolation: `Becenév már foglalt`,
    },
    email: {
      compositionViolation: `E-mail formátuma helytelen`,
      duplicationViolation: `Email már foglalt`,
    },
    pin: {
      lengthViolation: `PIN legyen legalább 4 karakter.`,
      matchViolation: `PIN-kódok egyeznie kell.`,
      failedHashComparison: `PIN-kód nem érvényes, kérjük, próbálja újra.`,
      updateSuccess: `A PIN kód frissült`,
      updateError: `Hiba frissítése a PIN`,
    },
    mnemonic: {
      lengthViolation: `Mnemonic kell legalább 12 szó.`,
      unableToValidate: `A megadott emlékeztető nem volt érvényes, kérjük, próbálja újra.`,
    },
    setNickname: {
      success: `Beceneve lett mentve.`,
      error: generalCommunicationError
    },
    setEmail: {
      success: `Az e-mail lett mentve.`,
      error: generalCommunicationError
    },
    lockTimeout: {
      top: `Meg kell adnia a PIN után`,
      bottom: `perc inaktivitás`,
      update: `frissítés`,
      error: `Nem sikerült frissíteni a fiók beállításait`,
      success: `Lock Timeout időpontja`,
    },
    addFriend: {
      success: X => `Friend kérelmet küldött @${X} `,
      error: generalCommunicationError
    },
    removeFriend: {
      success: X => `Eltávolítva a barátok: @${X}`,
      error: generalCommunicationError
    },
    loadInformation: {
      error: generalCommunicationError
    },
    ethBalance: {
      display: Y => `A ETH egyenleg ${String (Y) .slice (0,8)}`,
      inFiat: (Z, B, A) => ` (${CUR[A]}${String(Number(Z) * Number(B)).slice(0, 8)})`,
      getError: `Nem sikerült lekérdezni Eth egyensúly`,
      manage: `kezelése ETH`,
    },
    sendEth: {
      error: {
        insufficient: `Az átvitel sikertelen fedezethiány miatt`,
        generic: `Hiba az átutalás, kérjük, próbálja újra később`,
        address: `Adjon meg egy érvényes címet`,
        amount: `Adjon meg egy összeget nagyobb, mint 0`,
        limitExceeded: A => `Csak küld ${CUR [A]} ${TL [A]} hetente, válasszon kisebb amount`,
      },
      amount: `Összeg küldése`,
      address: `Destination Address (nélkül '0x' előtag)`,
      transfer: `Transfer ETH`,
      transferAll: `Transzfer mindent`,
      balance: Y => `A jelenlegi ETH egyenleg ${typeof Y === 'string'? Y.slice (0,8): ''} `,
      ethAddress: `Ethereum Cím`,
      txCost: (B, A) => `A jelenlegi tranzakciós költsége ${CUR [A]} ${B}`,
      transferLowercase: `Transzfer Eth`,
      note: A => `Kérjük, vegye figyelembe: csak át ${CUR [A]} ${TL [A]} hetente ki Lndr`,
      warning: (Z, A) => `Van ${CUR [A]} ${Z} fennmaradó a ${CUR [A]} ${TL [A]} határa:`,
    },
    sendBcpt: {
      error: {
        insufficient: `Nem elég BCPT ehhez a tranzakcióhoz`,
        generic: `Hiba az átutalás, kérjük, próbálja újra később`,
      },
      transfer: `Transfer BCPT`,
      address: `Destination Address (nélkül '0x' előtag)`,
      balance: Y => `A jelenlegi BCPT egyenleg ${typeof Y === 'string'? Y.slice (0,8): ''} `,
      bcptAddress: `BCPT Cím`,
    },
    changeProfilePic: `Érintésre módosítása`,
    addProfilePic: `Használja Kép Phone`,
    panelHeaders: [
      `ETH (& BCPT) Cím`,
      `ETH Balance`,
      `BCPT Balance`,
      `ETH Transaction History`,
      `PIN-kód módosítása`,
      `Változás becenév`,
      `E-mailt változtatni`,
      `Megváltoztatni a profilkèpet`,
      `Change Lock Timeout`,
      `Emlékezeterősítő`,
      `értesítések`,
    ],
    viewEtherscan: `Részletek Etherscan története`,
    profilePic: {
      change: `Megváltoztatni a profilkèpet`,
      setError: `Hiba feltöltésével a képet, kérjük, próbálja újra később`,
      getError: `Hiba lekérése profilképednek`,
      setSuccess: `Profile picture frissítve`,
    },
    logoutSuccess: `Sikeresen kijelentkezett!`,
  },

  currentBalance: {
    eth: `Az aktuális Eth egyenlege:`,
    bcpt: `Az aktuális BCPT egyenlege:`,
  },

  welcomeView: {
    by: `ÁLTAL ÉPÍTVE`,
    makeItEasy: `Lndr megkönnyíti követni egyszerű adósságait`,
    weHelpFriends: `Segítünk barátai élnek, dolgoznak, és együtt játszanak.`,
    len: `Len`,
    dot: `.`,
    der: `der`,
    shareDinner: `Share vacsora`,
    fillTank: `Töltsük meg a Tank`,
    travelTogether: `együtt utaznak`,
    runEthereum: `Mi fut ETH!`,
    firstLendingApp: `Az első mobil app hitelezési rögzítve a blockchain.`,
    greatConcert: `Lásd Nagy Concert`,
    youPlayWithFriends: `Játszunk a barátaival; \ n fogjuk tartani a lapot ...`,
    start: `Fogj neki`,
  },

  debtManagement: {
    shell: `új Transaction`,
    add: `Add adósság`,
    selectFriend: `választ`,
    lend: `új hitel`,
    borrow: `új adósság`,
    iLent: `Egy barátom tartozik nekem`,
    iBorrowed: `Tartozom egy ismerősének`,
    settleUpLower: `Betelepül`,
    amountToSettle: `Összeg Settle`,
    total: `Teljes`,
    record: `rekord`,
    records: `feljegyzések`,
    createError: {
      amountTooLow: `Az összeg nem lehet nagyobb, mint $ 0`,
      amountTooHigh: `Az összeg nem lehet kevesebb, mint $ 1000000000`,
      selfAsFriend: `Ön nem hozhat létre adósság magaddal, válasszon egy másik barátja`,
      pending: `Kérjük, oldja meg a függőben lévő ügyletet a felhasználótól mielőtt létrehoz egy másik`,
      insufficientEth: E => `Meg kell legalább ${E} ETH rendezni, menjen a Beállítások látni a balance`,
    },
    fields: {
      amount: `Összeg`,
      settlementAmount: `elszámolás`,
      selectFriend: `Barát`,
      memo: `Memo`,
      direction: `Válassza ki a helyes állítást`,
    },
    memo: {
      example: `Típus emlékeztető itt`,
    },
    direction: {
      lend: X => `${X} köszönheti me`,
      borrow: X => `tartozom ${X}`,
      initiatedLend: X => `${X} mondja ő / ő owes`,
      initiatedBorrow: X => `${X} azt mondja, owe`,
      pendingLend: X => `@${X} tartozik you`,
      pendingBorrow: X => `Jössz @${X} `,
      pendingLendSettlement: S => `@${S.debtorNickname} kér egy település ${S.settlementCurrency}`,
      pendingBorrowSettlement: S => `@${S.creditorNickname} akarja rendezni veled a ${S.settlementCurrency}`,
      pendingLendSettlementMe: S => `Azt kérte, hogy rendezze a @${S.debtorNickname} az ${S.settlementCurrency}`,
      pendingBorrowSettlementMe: S => `Azt kérte, hogy @${S.creditorNickname} rendezze ${S.settlementCurrency}`,
    },
    pending: {
      success: F => `Függőben tartozás benyújtott @${F.nickname}`,
      error: generalCommunicationError
    },
    pendingParens: `(függőben levő)`,
    confirmation: {
      transaction: CP => `Tranzakció ${CP} sikeresen megerősítette`,
      settlement: CP => `kiegyenlítés ${CP} sikeresen megerősítette`,
      error: `Nem sikerült megerősíteni tranzakció ebben az időben, később próbálkozzon újra`,
    },
    rejection: {
      success: `Tranzakciós elutasításra került`,
      error: `Nem lehet elutasítani tranzakció ebben az időben, később próbálkozzon újra`,
    },
    balances: {
      error: `Nem sikerült betölteni egyenlegek ebben az időben, később próbálkozzon újra`,
    },
    for: M => `a ${M}`,
    settleUp: `Betelepül`,
    settleTotal: `rendezni Összesen`,
    settleUpMemo: (D, A) => `${D === 'lend'? 'Ülepítő fel': 'Request ülepedni'} ${A} `,
    recordSettleUpMemo: `ülepítő up`,
  },
  settlementManagement: {
    bilateral: {
      error: {
        insufficient: X => `A település ${X} sikertelen elégtelensége miatt pénzeszközeinek`,
        generic: X => `Hiba feldolgozásakor település ${X}`,
      }
    },
    eth: `Rendezze ETH`,
    nonPayment: `Rögzítése Settlement`,
  },

  accountViewLanguage: {
    lndr: `L n d r`,
    home: `itthon`,
    friends: `barátok`,
    activity: `Tevékenység`,
  },

  notifications: {
    toggleNotifications: `toggle értesítések`,
    enable: `Bekapcsol`,
    disable: `Kikapcsolni`,
  },

  pendingTransactionsLanguage: {
    shell: `Függő Tranzakciós`,
    title: `Függőben levő`,
    memo: `Memo:`,
    for: `mert`,
    none: `Nincsenek függőben lévő tranzakciók`,
    confirmationQuestion: `Biztos, hogy szeretné megerősíteni a tranzakció?`,
    pendingAnnouncement: `Ez a tranzakció vár megerősítését a másik félnek.`,
    bilateral: `Várakozás Eth átutalás befejezéséhez`,
    confirm: `megerősít`,
    reject: `Tranzakció elutasítása`,
    rejectRequest: `Elutasít`,
    cancel: `Mégsem Tranzakciós`,
    direction: {
      lend: (X, Z) => `@${X} tartozik magának ${Z}`,
      borrow: (X, Z) => `Tartozol @${X} ${Z}`,
    }
  },

  pendingSettlementsLanguage: {
    shell: `elszámolás alatt`,
    title: `Függőben levő`,
    none: `Nincsenek függőben lévő települések`,
    confirm: `megerősít`,
    reject: `Elutasítás Settlement`,
    cancel: `Mégsem Settlement`,
  },

  recentTransactionsLanguage: {
    title: `befejezték`,
    none: `Nincs befejezett ügyletek`,
    direction: {
      lend: (X, Z) => `@${X} tartozik magának ${Z}`,
      borrow: (X, Z) => `Tartozol @${X} ${Z}`
    },
    balance: `Egyensúly`,
    friends: FS => `(a ${FS} ${FS === 1 ? 'Barátja': 'barátok'})`,
  },

  tabs: {
    home: `itthon`,
    friends: `barátok`,
    activity: `Tevékenység`,
  },

  confirmation: {
    shell: `Megerősítés`,
    done: `Kész`,
    create: {
      start: `Küldtünk a rekord fölött `,
      end: ` megerősítést.`,
    },
    confirm: {
      start: `Már megerősítette ezt rekordot `,
      end: `.`,
    },
    reject: {
      start: `Már legyen .`,
      end: ` tudja, hogy elutasították ezt a rekordot`,
    },
    confirmFriend: {
      start: `Ön most már barát vele `,
      end: `!`,
    },
    rejectFriend: {
      start: `Ön elutasította a barátja kérésére `,
      end: `.`,
    },
    ethSent: {
      start: `Sikeresen elküldött `,
      end: ` ETH, és a tranzakciót hash `,
    },
    bcptSent: {
      start: `Sikeresen elküldött `,
      end: ` BCPT a tranzakciós hash `,
    },
    status: `Láthatjuk állapotát a tranzakció a `,
    activity: `tevékenységi lapon.`,
  },

  pendingFriendRequestsLanguage: {
    shell: `Baráti felkérés`,
    message: `Friend kérések`,
    request: F => `${F} akarja, hogy barátok veled! `,
  }
}
