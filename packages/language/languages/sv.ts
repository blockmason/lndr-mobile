import { currencies, transferLimits } from 'language'

const CUR = currencies
const TL = transferLimits

const generalCommunicationError = 'There was a problem communicating with the server, please try again later.'

export default {

  applicationName: `Lndr`,
  helloWorld: `Hej världen`,
  submit: `LÄMNA`,
  next: `Nästa`,
  cancel: `Annullera`,
  back: `Gå tillbaka`,
  copy: `Kopiera till Urklipp`,
  confirmAccount: `Bekräfta`,
  createAccount: `Skapa konto`,
  recoverAccount: `Återställ konto`,
  removeAccount: `Ta bort konto`,
  updateAccount: `Uppdatera konto`,
  loginAction: `Låsa upp`,
  enterPin: `Ange din PIN-kod`,
  changePin: `Ändra PIN`,
  enterCurrentPin: `Ange nuvarande PIN`,
  logoutAction: `LOGGA UT`,
  seeAllActivity: `Se alla aktivitet`,
  copiedClipboard: `Kopierad till Urklipp`,
  pleaseWait: `Vänta`,
  addFriend: `Lägg till vän`,
  addFriendConfirmationQuestion: `Är du säker på att du vill lägga till den här användaren som en vän?`,
  removeFriend: `Ta bort vän`,
  currentFriends: `Aktuella Friends`,
  removeFriendConfirmationQuestion: `Är du säker på att du vill ta bort den här användaren som en vän?`,
  inviteFriends: `Bjud in vänner till Lndr`,
  tryLndr: `Kolla Lndr App här:`,
  friendInfo: `Mer information om denna vänskap:`,
  noFriends: `Lägg till några vänner att komma igång!`,
  noMatches: `Inga matchande användare hittades`,
  noBalances: `Du har inga registrerade skulder`,
  addFriendButton: `Lägg till vän`,
  alreadyFriendsButton: `Vänner`,
  friendShell: `Vän`,
  tip: `Tips:`,
  notice: `Lägga märke till:`,
  welcome: `Välkommen till din LNDR`,
  noBalanceWarning: `Vi kunde inte ladda ditt saldo vid denna tid, försök igen senare.`,
  totalBalance: `Total balans:`,
  totalBalances: `Totalt Motparter:`,
  newTransaction: `ny transaktion`,
  needsReview: `behov Review`,
  owesMe: `Jag var skyldig`,
  iOwe: `Jag är skyldig någon`,
  newPassword: `Nytt lösenord (minst 8 tecken)`,
  confirmPassword: `Bekräfta lösenord`,
  newPin: `Nya 4-siffriga PIN`,
  enterNewPin: `STÄLL EN NY 4-siffriga PIN`,
  confirmPin: `Vänligen bekräfta ditt PIN`,
  newAccount: `Skapa ett nytt konto`,
  loginAccount: `Lås upp ditt konto`,
  recoverExistingAccount: `Återskapa ett befintligt konto`,
  recoverMnemonic: `Mnemonic (12 ord som visas \ Nwhen du skapade ditt konto)`,
  recoverMnemonicLengthError: `Mnemonic bör vara exakt 12 ord`,
  successTitle: `Framgång`,
  errorTitle: `Fel`,
  showMnemonic: `Visa 12-Word Mnemonic`,
  mnemonicExhortation: `Denna 12-ord fras som krävs för att återställa ditt konto hålla det någonstans säkert och hemligt`,
  addressExhortation: `Skicka Ethereum i din adressbok så att du kan reglera skulder på Lndr`,
  removeAccountTitle: `Är du säker på att du vill ta bort ditt konto från den här enheten?`,
  removeAccountExhortation: `Se till att du har tillgång till din mnemonic för att återställa ditt konto senare, eftersom detta är en permanent borttagning av dina kontouppgifter från den här enheten.`,
  myAccount: `Mitt konto`,
  setNickname: `Ställ ett smeknamn så att dina vänner kan söka efter dig`,
  setEmail: `Ange en e-post för att ta emot information om Lndr uppdateringar`,
  nickname: `Smeknamn (gemener & siffror)`,
  email: `E-postadress`,
  accountManagement: {
    nickname: {
      lengthViolation: `Smeknamn ska vara minst 3 tecken.`,
      compositionViolation: `Smeknamn kan bara innehålla siffror och små bokstäver.`,
      duplicationViolation: `Smeknamn redan tagit`,
    },
    email: {
      compositionViolation: `E-postformat är felaktigt`,
      duplicationViolation: `Email är redan taget`,
    },
    pin: {
      lengthViolation: `PIN ska vara minst 4 tecken.`,
      matchViolation: `PIN ska matcha.`,
      failedHashComparison: `PIN-koden är ogiltig, försök igen.`,
      updateSuccess: `Din PIN har uppdaterats`,
      updateError: `Det gick inte att uppdatera din PIN-kod`,
    },
    mnemonic: {
      lengthViolation: `Mnemonic bör ha minst 12 ord.`,
      unableToValidate: `Det angivna mnemonic var inte giltigt, försök igen.`,
    },
    setNickname: {
      success: `Din smeknamn har sparats.`,
      error: generalCommunicationError
    },
    setEmail: {
      success: `Din e-post har sparats.`,
      error: generalCommunicationError
    },
    lockTimeout: {
      top: `Du måste ange PIN-kod efter`,
      bottom: `minuters inaktivitet`,
      update: `Uppdatering`,
      error: `Det gick inte att uppdatera dina kontoinställningar`,
      success: `Lock Timeout Uppdaterad`,
    },
    addFriend: {
      success: X => `Vänförfrågan skickas till @${X}`,
      error: generalCommunicationError
    },
    removeFriend: {
      success: X => `Borttagen från vänner: @${X} `,
      error: generalCommunicationError
    },
    loadInformation: {
      error: generalCommunicationError
    },
    ethBalance: {
      display: Y => `Din ETH balans är ${String (Y) .slice (0,8)} `,
      inFiat: (Z, B, A) => ` (${CUR[A]}${String(Number(Z) * Number(B)).slice(0, 8)})`,
      getError: `Det går inte att hämta Eth balans`,
      manage: `Hantera ETH`,
    },
    sendEth: {
      error: {
        insufficient: `Överföringen misslyckades på grund av otillräckliga medel`,
        generic: `Det uppstod ett fel med överföringen, försök igen senare`,
        address: `Ange en giltig adress`,
        amount: `Ange ett belopp större än 0`,
        limitExceeded: A => `Du kan bara skicka ${CUR [A]} ${TL [A]} per vecka, välj en mindre amount`
      },
      amount: `Belopp att skicka`,
      address: `Destinationsadress (utan '0x' prefixet)`,
      transfer: `Transfer ETH`,
      transferAll: `överför allt`,
      balance: Y => `Din aktuella ETH balans är ${typeof Y === 'string'? Y.slice (0,8): ''} `,
      ethAddress: `Ethereum Adress`,
      txCost: (B, A) => `Den aktuella transaktionen kostnaden är ${CUR [A]} ${B}`,
      transferLowercase: `överför Eth`,
      note: A => `Observera: Du kan bara överföra ${CUR [A]} ${TL [A]} per vecka av Lndr`,
      warning: (Z, A) => `Du har ${CUR [A]} ${Z} återstående din ${CUR [A]} ${TL [A]} limit`,
    },
    sendBcpt: {
      error: {
        insufficient: `Du har inte tillräckligt BCPT för denna transaktion`,
        generic: `Det uppstod ett fel med överföringen, försök igen senare`,
      },
      transfer: `Transfer BCPT`,
      address: `Destinationsadress (utan '0x' prefixet)`,
      balance: Y => `Din aktuella BCPT balans är ${typeof Y === 'string'? Y.slice (0,8): ''} `,
      bcptAddress: `BCPT Adress`,
    },
    changeProfilePic: `Tryck för att ändra`,
    addProfilePic: `Använd Bild från telefon`,
    panelHeaders: [
      `ETH (& BCPT) Adress`,
      `ETH Balance`,
      `BCPT Balance`,
      `ETH Transaktionshistoria`,
      `Ändra PIN`,
      `Ändra smeknamn`,
      `Byta e-mail`,
      `Byt profilbild`,
      `Change Lock Timeout`,
      `Mnemonic`,
      `Anmälningar`,
    ],
    viewEtherscan: `Visa Etherscan History`,
    profilePic: {
      change: `Byt profilbild`,
      setError: `Det gick inte att ladda upp din bild, försök igen senare`,
      getError: `Det gick inte att hämta din profilbild`,
      setSuccess: `Profilbild uppdaterad`,
    },
    logoutSuccess: `Du har loggat ut!`,
  },

  currentBalance: {
    eth: `Din nuvarande Eth balans är:`,
    bcpt: `Din nuvarande BCPT balans är:`,
  },

  welcomeView: {
    by: `BYGGD AV`,
    makeItEasy: `Lndr gör det enkelt att spåra enkla skulder`,
    weHelpFriends: `Vi hjälper vänner bor, arbetar och spela tillsammans.`,
    len: `Len`,
    dot: `.`,
    der: `der`,
    shareDinner: `Dela Middag`,
    fillTank: `Fyll din tank`,
    travelTogether: `resa tillsammans`,
    runEthereum: `Vi kör på ETH!`,
    firstLendingApp: `Den första mobil utlåning app fäst på blockchain.`,
    greatConcert: `Ser en stor konsert`,
    youPlayWithFriends: `Du spelar med vänner, \ n vi kommer att hålla fliken ...`,
    start: `Komma igång`,
  },

  debtManagement: {
    shell: `ny transaktion`,
    add: `Lägg Skuld`,
    selectFriend: `Välj`,
    lend: `New Loan`,
    borrow: `nya lån`,
    iLent: `En vän är skyldig mig`,
    iBorrowed: `Jag är skyldig en vän`,
    settleUpLower: `Settle Up`,
    amountToSettle: `Belopp som Settle`,
    total: `Total`,
    record: `spela in`,
    records: `uppgifter`,
    createError: {
      amountTooLow: `Belopp måste vara större än $ 0`,
      amountTooHigh: `Belopp måste vara mindre än $ 1000000000`,
      selfAsFriend: `Du kan inte skapa skuld med dig själv, välj en annan vän`,
      pending: `Vänligen lösa väntande transaktion med denna användare innan du skapar en annan`,
      insufficientEth: E => `Du behöver minst ${E} ETH att lösa, gå till Inställningar för att se din balansen:`,
    },
    fields: {
      amount: `Belopp`,
      settlementAmount: `Avräkningsbelopp`,
      selectFriend: `Vän`,
      memo: `PM`,
      direction: `Välj rätt Statement`,
    },
    memo: {
      example: `Typ memo här`,
    },
    direction: {
      lend: X => `${X} skyldig me`,
      borrow: X => `Jag är skyldig ${X} `,
      initiatedLend: X => `${X} säger att han / hon owes`,
      initiatedBorrow: X => `${X} säger att du owe`,
      pendingLend: X => `@${X} owes you`,
      pendingBorrow: X => `Du är skyldig @${X} `,
      pendingLendSettlement: S => `@${S.debtorNickname} begär en avveckling i ${S.settlementCurrency}`,
      pendingBorrowSettlement: S => `@${S.creditorNickname} vill bosätta sig med dig i ${S.settlementCurrency}`,
      pendingLendSettlementMe: S => `Du har begärt att nöja sig med @${S.debtorNickname} in ${S.settlementCurrency} `,
      pendingBorrowSettlementMe: S => `Du har begärt att @${S.creditorNickname} bosätta sig i ${S.settlementCurrency} `,
    },
    pending: {
      success: F => `I avvaktan skuld överlämnas till @${F.nickname} `,
      error: generalCommunicationError
    },
    pendingParens: `(avvaktan)`,
    confirmation: {
      transaction: CP => `Transaktions med ${CP} har framgångsrikt bekräftats`,
      settlement: CP => `Settlement med ${CP} har framgångsrikt bekräftats`,
      error: `Det går inte att bekräfta transaktionen vid denna tid, försök igen senare`,
    },
    rejection: {
      success: `Transaktions har avvisats`,
      error: `Det går inte att avvisa transaktionen vid denna tid, försök igen senare`,
    },
    balances: {
      error: `Det går inte att ladda saldon vid denna tid, försök igen senare`,
    },
    for: M => `för ${M} `,
    settleUp: `Settle Up`,
    settleTotal: `Settle Total`,
    settleUpMemo: (D, A) => `${D === 'låna ut'? 'Lösa upp för': 'Begäran om att nöja sig med'} ${A} `,
    recordSettleUpMemo: `lösa upp`,
  },
  settlementManagement: {
    bilateral: {
      error: {
        insufficient: X => `Din uppgörelse med ${X} misslyckades på grund av otillräcklig vägandena om`,
        generic: X => `Det uppstod ett fel bearbeta din uppgörelse med ${X} `,
      }
    },
    eth: `Nöja sig med ETH`,
    nonPayment: `Spela in ett Settlement`,
  },

  accountViewLanguage: {
    lndr: `Ln d r`,
    home: `Hem`,
    friends: `Vänner`,
    activity: `Aktivitet`,
  },

  notifications: {
    toggleNotifications: `Växla Notifications`,
    enable: `Sätta på`,
    disable: `Stäng av`,
  },

  pendingTransactionsLanguage: {
    shell: `I väntan på transaktions`,
    title: `Avvaktan`,
    memo: `PM:`,
    for: `För`,
    none: `Du har inga pågående transaktioner`,
    confirmationQuestion: `Är du säker på att du vill bekräfta denna transaktion?`,
    pendingAnnouncement: `Transaktionen väntar på bekräftelse av den andra parten.`,
    bilateral: `Väntar på Eth överföring för att slutföra`,
    confirm: `Bekräfta`,
    reject: `avvisa transaktion`,
    rejectRequest: `Avvisa`,
    cancel: `avbryta transaktion`,
    direction: {
      lend: (X, Z) => `@${X} skyldig dig ${Z}`,
      borrow: (X, Z) => `Du är skyldig @${X} ${Z}`,
    }
  },

  pendingSettlementsLanguage: {
    shell: `I väntan Settlement`,
    title: `Avvaktan`,
    none: `Du har inga pågående bosättningar`,
    confirm: `Bekräfta`,
    reject: `avvisa Settlement`,
    cancel: `avbryta Settlement`,
  },

  recentTransactionsLanguage: {
    title: `Avslutad`,
    none: `Du har inga genomförda transaktioner`,
    direction: {
      lend: (X, Z) => `@${X} skyldig dig ${Z}`,
      borrow: (X, Z) => `Du är skyldig @${X} ${Z}`,
    },
    balance: `Balans`,
    friends: FS => `(från ${FS} ${FS === 1 ? 'vän': 'vänner'})`,
  },

  tabs: {
    home: `Hem`,
    friends: `Vänner`,
    activity: `Aktivitet`,
  },

  confirmation: {
    shell: `Bekräftelse`,
    done: `Gjort`,
    create: {
      start: `Vi har skickat rekordet över till `,
      end: ` för att bekräfta.`,
    },
    confirm: {
      start: `Du har bekräftat denna post från `,
      end: `.`,
    },
    reject: {
      start: `Vi har låtit `,
      end: ` veta att du avvisade denna post.`,
    },
    confirmFriend: {
      start: `Du är nu vänner med `,
      end: `!`,
    },
    rejectFriend: {
      start: `Du har avböjt vänförfrågan från `,
      end: `.`,
    },
    ethSent: {
      start: `Du har skickat `,
      end: ` ETH och transaktions hash är `,
    },
    bcptSent: {
      start: `Du har skickats `,
      end: ` BCPT och transaktions hash är `,
    },
    status: `Du kan se status för denna transaktion på `,
    activity: `fliken aktiviteten.`,
  },

  pendingFriendRequestsLanguage: {
    shell: `Vänförfrågan`,
    message: `Vänförfrågan`,
    request: F => `${F} vill vara vänner med dig!`,
  }
}
