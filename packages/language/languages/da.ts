import { currencySymbols, transferLimits } from 'lndr/currencies'

const CUR = currencySymbols
const TL = transferLimits

const generalCommunicationError = 'Der kunne ikke kommunikeres med serveren, prøv venligst igen.'

export default {

  applicationName: `Lndr`,
  helloWorld: `Hej Verden`,
  submit: `INDSEND`,
  next: `Næste`,
  cancel: `Annuller`,
  back: `Gå tilbage`,
  copy: `Kopier til udklipsholder`,
  confirmAccount: `Bekræft`,
  createAccount: `Opret konto`,
  recoverAccount: `Gendan konto`,
  removeAccount: `Fjern konto`,
  updateAccount: `Opdater konto`,
  loginAction: `Lås op`,
  enterPin: `INDTAST VENLIGST DIN PINKODE`,
  changePin: `Skift PIN`,
  enterCurrentPin: `Indtast nuværende PIN`,
  logoutAction: `LOG UD`,
  seeAllActivity: `Se al aktivitet`,
  copiedClipboard: `Kopieret til udklipsholder`,
  pleaseWait: `Vent venligst`,
  addFriend: `Tilføj ven`,
  addFriendConfirmationQuestion: `Er du sikker på, at du ønsker at tilføje denne bruger som en ven?`,
  removeFriend: `Fjern ven`,
  currentFriends: `Nuværende venner`,
  removeFriendConfirmationQuestion: `Er du sikker på, at du ønsker at fjerne denne bruger som en ven?`,
  inviteFriends: `Inviter venner til Lndr`,
  tryLndr: `Prøv Lndr Appen her:`,
  friendInfo: `Mere information om denne venskab:`,
  noFriends: `Tilføj nogle venner for at komme i gang!`,
  noMatches: `Ingen matchende brugere fundet`,
  noBalances: `Du har ingen registrerede gældsposter`,
  addFriendButton: `Tilføj ven`,
  alreadyFriendsButton: `Venner`,
  friendShell: `Ven`,
  tip: `Tip:`,
  notice: `Bemærk:`,
  welcome: `Velkommen til din LNDR`,
  noBalanceWarning: `VI kunne ikke indlæse din saldo på nuværende tidspunkt, prøv venligst igen senere.`,
  totalBalance: `Total saldo:`,
  totalBalances: `Total modparter:`,
  newTransaction: `Ny transaktion`,
  needsReview: `Afventer godkendelse`,
  owesMe: `Jeg skyldes`,
  iOwe: `Jeg skylder andre`,
  newPassword: `Ny adgangskode (mindst 8 tegn)`,
  confirmPassword: `Bekræft kodeord`,
  newPin: `Ny 4-cifret PIN`,
  enterNewPin: `ANGIV EN NY 4-CIFRET PIN`,
  confirmPin: `BEKRÆFT VENLIGST DIN PINKODE`,
  newAccount: `Opret en ny konto`,
  loginAccount: `Lås op for din konto`,
  recoverExistingAccount: `Gendan en eksisterende konto`,
  recoverMnemonic: `Mnemonic (12 ord vist \ nda du oprettede din konto)`,
  recoverMnemonicLengthError: `Mnemonic skal være på 12 ord`,
  successTitle: `Succes`,
  errorTitle: `Fejl`,
  showMnemonic: `Vis Mnemonic på 12 ord`,
  mnemonicExhortation: `Denne 12-ords sætning er nødvendig for at kunne oprette din konto. Opbevar venligst koden et sikkert og hemmeligt sted`,
  addressExhortation: `Send Ethereum til din adresse, så du kan indfri gæld på Lndr`,
  removeAccountTitle: `Er du sikker på, du vil fjerne din konto fra denne enhed?`,
  removeAccountExhortation: `Sørg for at du har adgang til din mnemonic for at gendanne din konto siden, da dette er en permanent fjernelse af dine kontooplysninger fra denne enhed.`,
  myAccount: `Min konto`,
  setNickname: `Vælg et brugernavn så dine venner kan søge efter dig`,
  setEmail: `Vælg en e-mail for at modtage information om Lndr opdateringer`,
  nickname: `Brugernavn (små bogstaver & tal)`,
  email: `Email adresse`,
  accountManagement: {
    nickname: {
      lengthViolation: `Brugernavn skal være mindst 3 tegn.`,
      compositionViolation: `Brugernavnet må kun bestå af cifre og små bogstaver.`,
      duplicationViolation: `Brugernavnet er allerede taget`,
    },
    email: {
      compositionViolation: `E-mail formaten er forkert`,
      duplicationViolation: `E-mail er allerede i brug`,
    },
    pin: {
      lengthViolation: `PIN-kode bør være på mindst 4 tegn.`,
      matchViolation: `PIN-koderne skal matche.`,
      failedHashComparison: `PIN-koden er ikke gyldig, prøv venligst igen. `,
      updateSuccess: `Din PIN-kode er blevet opdateret`,
      updateError: `Der opstod en fejl under opdateringen af din PIN-kode`,
    },
    mnemonic: {
      lengthViolation: `Mnemonic skal være på mindst 12 ord.`,
      unableToValidate: `Det indtastede mnemonic er ikke gyldigt, prøv venligst igen.`,
    },
    setNickname: {
      success: `Dit brugernavn er blevet gemt.`,
      error: generalCommunicationError
    },
    setEmail: {
      success: `Din e-mail adresse er blevet gemt.`,
      error: generalCommunicationError
    },
    lockTimeout: {
      top: `Du skal indtaste din PIN-kode efter`,
      bottom: `minutters inaktivitet`,
      update: `Opdater`,
      error: `Vi var i stand til at opdatere dine kontoindstillinger`,
      success: `Låst Timeout Opdateret`,
    },
    addFriend: {
      success: X => `Venneanmodning sendt til @${X}`,
      error: generalCommunicationError
    },
    removeFriend: {
      success: X => `Fjernet fra venner: @${X}`,
      error: generalCommunicationError
    },
    loadInformation: {
      error: generalCommunicationError
    },
    ethBalance: {
      display: Y => `Din ETH saldo er ${String(Y).slice(0,8)}`,
      inFiat: (Z, B, A) => ` (${CUR(A)}${String(Number(Z) * Number(B)).slice(0, 8)})`,
      getError: `Kunne ikke indlæse Eth saldo`,
      manage: `Administrer ETH`,
    },
    sendEth: {
      error: {
        insufficient: `Du har ikke tilstrækkeligt ETH til at udføre denne transaktion`,
        generic: `Der opstod en fejl med overførslen, prøv igen senere`,
        address: `Indtast en gyldig adresse`,
        amount: `Indtast et beløb, der er større end 0`,
        limitExceeded: A => `Du kan kun sende ${CUR(A)}${TL(A)} om ugen, vælg et mindre beløb`,
      },
      amount: `Beløb der skal sendes`,
      address: `Destinationsadresse (uden '0x' præfiks)`,
      transfer: `Overfør ETH`,
      transferAll: `Overfør alt`,
      balance: Y => `Din aktuelle ETH saldo er ${typeof Y === 'string'? Y.slice (0,8): ''} `,
      ethAddress: `Ethereum Adresse`,
      txCost: (B, A) => `Den nuværende transaktionspris er ${CUR(A)}${B}`,
      transferLowercase: `Overfør Eth`,
      note: A => `Bemærk: du kan kun overføre ${CUR(A)}${TL(A)} om ugen på Lndr`,
      warning: (Z, A) => `Du har ${CUR(A)}${Z} resterende af din ${CUR(A)}${TL(A)} grænse`,
    },
    sendBcpt: {
      error: {
        insufficient: `Du har ikke tilstrækkeligt BCPT til at udføre denne transaktion`,
        generic: `Der opstod en fejl med overførslen, prøv igen senere`,
      },
      transfer: `Overfør BCPT`,
      address: `Destinationsadresse (uden '0x' præfiks)`,
      balance: Y => `Din aktuelle BCPT saldo er ${typeof Y === 'string'? Y.slice(0,8):''} `,
      bcptAddress: `BCPT Adresse`,
    },
    changeProfilePic: `Tryk for at ændre`,
    addProfilePic: `Brug billede fra telefon`,
    panelHeaders: [
      `ETH (& BCPT) Adresse`,
      `ETH Saldo`,
      `BCPT Saldo`,
      `ETH Transaktionshistorik`,
      `Skift PIN`,
      `Skift brugernavn`,
      `Skift e-mail`,
      `Skift profilbillede`,
      `Skift låst timeout`,
      `Mnemonic`,
      `Underretninger`,
    ],
    viewEtherscan: `Se Etherscan historik`,
    profilePic: {
      change: `Skift profilbillede`,
      setError: `Der opstod en fejl under upload af dit billede, prøv igen senere`,
      getError: `Der opstod en fejl under indlæsningen af dit profilbillede`,
      setSuccess: `Profilbilledet blev opdateret`,
    },
    logoutSuccess: `Du har logget ud!`,
  },

  currentBalance: {
    eth: `Din aktuelle Eth saldo er:`,
    bcpt: `Din aktuelle BCPT saldo er:`,
  },

  welcomeView: {
    by: `BYGGET AF`,
    makeItEasy: `Lndr gør det nemt at holde styr på enkle gældsposter`,
    weHelpFriends: `Vi hjælper venner med at bo, arbejde og have det sjovt sammen.`,
    len: `Len`,
    dot: `.`,
    der: `der`,
    shareDinner: `Del middag`,
    fillTank: `Fyld tanken op`,
    travelTogether: `Rejs sammen`,
    runEthereum: `Vi kører på ETH!`,
    firstLendingApp: `Den første mobile låne app der er sikret på blockchain.`,
    greatConcert: `Se en fantastisk koncert`,
    youPlayWithFriends: `Hyg dig med vennerne;\n vi holder styr på regningen…`,
    start: `Kom igang`,
  },

  debtManagement: {
    shell: `Ny Transaktion`,
    add: `Tilføj gæld`,
    selectFriend: `Vælg`,
    lend: `Nyt lån`,
    borrow: `Ny gæld`,
    iLent: `En ven skylder mig`,
    iBorrowed: `Jeg skylder en ven`,
    settleUpLower: `Gør regningen op`,
    amountToSettle: `Skyldigt beløb`,
    total: `Total`,
    record: `optegnelse`,
    records: `optegnelser`,
    chooseCurrency: `Vælg en valuta`,
    
    createError: {
      amountTooLow: `Beløb skal være større end $0`,
      amountTooHigh: `Beløb skal være mindre end $1.000.000.000`,
      selfAsFriend: `Du kan ikke oprette gældposter mod dig selv, vælg en anden ven`,
      pending: `Løs venligst din afventende transaktion med denne bruger før at en ny oprettes`,
      insufficientEth: E => `Du skal have mindst ${E} ETH for at gøre det skyldige beløb op, gå til Indstillinger for at se din saldoat bosætte gå til Indstillinger for at se din balance`,
    },
    fields: {
      currency: `Valuta`,
      amount: `Beløb`,
      settlementAmount: `Skyldigt beløb`,
      selectFriend: `Ven`,
      memo: `Memo`,
      direction: `Vælg det rigtige udskrift her`,
    },
    memo: {
      example: `Indtast memo her`,
    },
    direction: {
      lend: X => `${X} skylder mig`,
      borrow: X => `Jeg skyldes ${X}`,
      initiatedLend: X => `${X} siger han/hun skyæder`,
      initiatedBorrow: X => `${X} siger du skylder`,
      pendingLend: X => `@${X} skylder dig`,
      pendingBorrow: X => `Du skylder @${X}`,
      pendingLendSettlement: S => `@${S.debtorNickname} anmoder om en opgørelse i ${S.settlementCurrency}`,
      pendingBorrowSettlement: S => `@${S.creditorNickname} ønsker at afregne med dig i ${S.settlementCurrency}`,
      pendingLendSettlementMe: S => `Du har anmodet om at afregne med @${S.debtorNickname} i ${S.settlementCurrency}`,
      pendingBorrowSettlementMe: S => `Du har anmodet om, at @${S.creditorNickname} afregner i ${S.settlementCurrency}`,
    },
    pending: {
      success: F => `Afventende gæld indsendt til @${F.nickname}`,
      error: generalCommunicationError
    },
    pendingParens: `(afventer)`,
    confirmation: {
      transaction: CP => `Transaktion med ${CP} er blevet bekræftet`,
      settlement: CP => `Afregning med ${CP} er blevet bekræftet`,
      error: `Transaktionen kan ikke bekræftes på nuværende tidspunkt, prøv igen senere`,
    },
    rejection: {
      success: `Transaktion er blevet afvist`,
      error: `Transaktionen kan ikke afvises på nuværende tidspunkt, prøv igen senere`,
    },
    balances: {
      error: `Kan ikke indlæse saldi på dette tidspunkt, prøv igen senere`,
    },
    for: M => `for ${M}`,
    settleUp: `Gør regningen op`,
    settleTotal: `Skyldigt beløb`,
    settleUpMemo: (D, A) => `${ D === 'lend' ? 'Afregner' : 'Anmodning om at afregne med'} ${A}`,
    recordSettleUpMemo: `til betaling`,
  },
  settlementManagement: {
    bilateral: {
      error: {
        insufficient: X => `Din afregning med ${X} mislykkedes på grund af utilstrækkelige midler`,
        generic: X => `Der opstod en fejl under behandlingen af din afregning med ${X}`,
      }
    },
    eth: `Gør op med ETH`,
    nonPayment: `Gem afregningen`,
  },

  accountViewLanguage: {
    lndr: `Ln d r`,
    home: `Hjem`,
    friends: `Venner`,
    activity: `Aktivitet`,
  },

  notifications: {
    toggleNotifications: `Skjul meddelelser`,
    enable: `Tænd `,
    disable: `Sluk`,
  },

  pendingTransactionsLanguage: {
    shell: `Afventende Transaktion`,
    title: `Afventende`,
    memo: `Memo:`,
    for: `For`,
    none: `Du har ingen ventende transaktioner`,
    confirmationQuestion: `Er du sikker på du vil bekræfte denne transaktion?`,
    pendingAnnouncement: `Denne transaktion afventer bekræftelse fra modparten.`,
    bilateral: `Afventer fuldførelse af Eth overførslen`,
    confirm: `Bekræft`,
    reject: `Afvis transaktion`,
    rejectRequest: `Afvis`,
    cancel: `Annuller transaktion`,
    direction: {
      lend: (X, Z) => `@${X} skylder dig ${Z}`,
      borrow: (X, Z) => `Du skylder @${X} ${Z}`,
    }
  },

  pendingSettlementsLanguage: {
    shell: `Afventende opgørelser`,
    title: `Afventende`,
    none: `Du har ingen afventende opgørelser`,
    confirm: `Bekræft`,
    reject: `Afvis opgørelse`,
    cancel: `Annuller opgørelse`,
  },

  recentTransactionsLanguage: {
    title: `Fuldført`,
    none: `Du har ikke gennemførte transaktioner`,
    direction: {
      lend: (X, Z) => `@${X} skylder dig ${Z}`,
      borrow: (X, Z) => `Du skylder @${X} ${Z}`
    },
    balance: `Saldo`,
    friends: FS => `(fra ${FS} ${FS === 1 ? 'ven': 'Venner'})`,
  },

  tabs: {
    home: `Hjem`,
    friends: `Venner`,
    activity: `Aktivitet`,
  },

  confirmation: {
    shell: `Bekræft`,
    done: `Færdig`,
    create: {
      start: `Vi har sendt opgørelsen videre til `,
      end: ` for bekræftelse.`,
    },
    confirm: {
      start: `Du har bekræftet denne opgørelse fra `,
      end: `.`,
    },
    reject: {
      start: `Vi har givet `,
      end: ` besked om, at du har afvist denne opgørelse.`,
    },
    confirmFriend: {
      start: `Du er nu venner med `,
      end: `!`,
    },
    rejectFriend: {
      start: `Du har afvist venneanmodningen fra `,
      end: `.`,
    },
    ethSent: {
      start: `Du har nu sendt `,
      end: ` ETH og dit transaktion ID er `,
    },
    bcptSent: {
      start: `Du har nu sendt `,
      end: ` BCPT og dit transaktion ID er `,
    },
    status: `Du kan se statussen for denne transaktion `,
    activity: `i aktivitetsfanen.`,
  },

  pendingFriendRequestsLanguage: {
    shell: `Venneanmodning`,
    message: `Venneanmodninger`,
    request: F => `${F} ønsker at være venner med dig!`,
  },

  privacyPolicy: {
    link: `lndr.io/terms/`,
    message: `Ved at klikke herunder bekræfter du at du har læst og accepteret Blockmasons privatlivspolitik. Blockmason kan bruge din email-adresse til at sende opdateringer om Blockmason og LNDR. Her er et link til privatlivspolitikken:`
  }
}
