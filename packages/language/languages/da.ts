import { currencySymbols, transferLimits } from 'lndr/currencies'

const CUR = currencySymbols
const TL = transferLimits

const generalCommunicationError = 'Der var et problem med kommunikationen med serveren, prøv igen senere.'

export default {

  applicationName: `Lndr`,
  helloWorld: `INDSEND`,
  submit: `Hej Verden`,
  next: `Næste`,
  cancel: `Afbestille`,
  back: `Gå tilbage`,
  copy: `Kopier til udklipsholder`,
  confirmAccount: `Bekræfte`,
  createAccount: `Opret konto`,
  recoverAccount: `Gendan konto`,
  removeAccount: `Fjern konto`,
  updateAccount: `Opdatering konto`,
  loginAction: `Lås`,
  enterPin: `Indtast din pinkode`,
  changePin: `PIN Skift`,
  enterCurrentPin: `Indtast aktuelle PIN`,
  logoutAction: `LOG UD`,
  seeAllActivity: `Se aktivitet`,
  copiedClipboard: `Kopieret til udklipsholder`,
  pleaseWait: `Vent venligst`,
  addFriend: `Tilføj ven`,
  addFriendConfirmationQuestion: `Er du sikker på, du ønsker at tilføje denne bruger som en ven?`,
  removeFriend: `Fjern ven`,
  currentFriends: `Aktuelle venner`,
  removeFriendConfirmationQuestion: `Er du sikker på, du vil fjerne denne bruger som en ven?`,
  inviteFriends: `Inviter venner til Lndr`,
  tryLndr: `Tjek den Lndr App her:`,
  friendInfo: `Mere information om denne venskab:`,
  noFriends: `Tilføj nogle venner til at komme i gang!`,
  noMatches: `Ingen matchende brugere fundet`,
  noBalances: `Du har ingen registrerede gæld`,
  addFriendButton: `Tilføj ven`,
  alreadyFriendsButton: `venner`,
  friendShell: `Ven`,
  tip: `Tip:`,
  notice: `Varsel:`,
  welcome: `Velkommen til dit LNDR`,
  noBalanceWarning: `Vi var ikke i stand til at indlæse din saldo på dette tidspunkt, prøv igen senere.`,
  totalBalance: `Samlet Balance:`,
  totalBalances: `Total Modparter:`,
  newTransaction: `Ny Transaktion`,
  needsReview: `behov anmeldelse`,
  owesMe: `Jeg skyldte`,
  iOwe: `Jeg skylder nogen`,
  newPassword: `Ny adgangskode (mindst 8 tegn)`,
  confirmPassword: `Bekræft kodeord`,
  newPin: `Ny PIN 4-cifret`,
  enterNewPin: `Angiv et nyt 4-cifret PIN`,
  confirmPin: `Bekræft venligst din PIN-kode`,
  newAccount: `Oprette en ny konto`,
  loginAccount: `Lås din konto`,
  recoverExistingAccount: `Gendan en eksisterende konto`,
  recoverMnemonic: `Huskeregel (12 ord vises \ nNår du oprettede din konto)`,
  recoverMnemonicLengthError: `Mnemonic bør være præcis 12 ord`,
  successTitle: `Succes`,
  errorTitle: `Fejl`,
  showMnemonic: `Vis 12-Word Mnemonic`,
  mnemonicExhortation: `Denne 12-ord sætning er nødvendig for at genoprette din konto, skal du holde det et sikkert sted og hemmelige`,
  addressExhortation: `Send Ethereum til din adresse, så du kan nøjes gæld på Lndr`,
  removeAccountTitle: `Er du sikker på, du vil fjerne din konto fra denne enhed?`,
  removeAccountExhortation: `Vær sikker på, at du har adgang til din huskeregel for at gendanne din konto senere, da dette er en permanent fjernelse af dine kontooplysninger fra denne enhed.`,
  myAccount: `Min konto`,
  setNickname: `Sæt et kaldenavn, så dine venner kan søge efter dig`,
  setEmail: `Sæt en e-mail for at modtage information om Lndr opdateringer`,
  nickname: `Brugernavn (små bogstaver & tal)`,
  email: `Email adresse`,
  accountManagement: {
    nickname: {
      lengthViolation: `Brugernavn skal være mindst 3 karakterer.`,
      compositionViolation: `Kaldenavn kan kun indeholde tal og små bogstaver.`,
      duplicationViolation: `Alias ​​er allerede taget`,
    },
    email: {
      compositionViolation: `E-mail-formatet er forkert`,
      duplicationViolation: `Email er allerede taget`,
    },
    pin: {
      lengthViolation: `PIN bør være mindst 4 tegn.`,
      matchViolation: `PIN-koder skal matche.`,
      failedHashComparison: `PIN-koden er ikke gyldig, prøv igen.`,
      updateSuccess: `Din PIN-kode er blevet opdateret`,
      updateError: `Der opstod en fejl opdatere din PIN-kode`,
    },
    mnemonic: {
      lengthViolation: `Mnemonic skal have mindst 12 ord.`,
      unableToValidate: `Den indtastede huskeregel var ikke gyldig, prøv igen.`,
    },
    setNickname: {
      success: `Dit kaldenavn er blevet gemt.`,
      error: generalCommunicationError
    },
    setEmail: {
      success: `Din e-mail er blevet gemt.`,
      error: generalCommunicationError
    },
    lockTimeout: {
      top: `Du skal indtaste din PIN-kode efter`,
      bottom: `minutters inaktivitet`,
      update: `Opdatering`,
      error: `Vi var i stand til at opdatere dine kontoindstillinger`,
      success: `Lås timeout Opdateret`,
    },
    addFriend: {
      success: X => `Ven anmodning sendt til @${X}`,
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
      display: Y => `Din ETH saldo er ${String (Y) .slice (0,8)}`,
      inFiat: (Z, B, A) => ` (${CUR[A]}${String(Number(Z) * Number(B)).slice(0, 8)})`,
      getError: `Kan ikke hente Eth balance`,
      manage: `Administrer ETH`,
    },
    sendEth: {
      error: {
        insufficient: `Overførslen mislykkedes på grund af utilstrækkelige midler`,
        generic: `Der opstod en fejl med overførslen, prøv igen senere`,
        address: `Indtast en gyldig adresse`,
        amount: `Indtast et beløb, der er større end 0`,
        limitExceeded: A => `Du kan kun sende ${CUR [A]} ${TL [A]} om ugen, skal du vælge en mindre amount`
      },
      amount: `Beløb, Send`,
      address: `Destination Address (uden '0x' præfiks)`,
      transfer: `Overførsel ETH`,
      transferAll: `Overfør alt`,
      balance: Y => `Din aktuelle ETH saldo er ${typeof Y === 'string'? Y.slice (0,8): ''} `,
      ethAddress: `Ethereum Adresse`,
      txCost: (B, A) => `Den nuværende pris transaktioner ${CUR [A]} ${B}`,
      transferLowercase: `Overfør Eth`,
      note: A => `Bemærk: du kan kun overføre ${CUR [A]} ${TL [A]} om ugen ud af Lndr`,
      warning: (Z, A) => `Du har ${CUR [A]} ${Z} resterende af din ${CUR [A]} ${TL [A]} limit`,
    },
    sendBcpt: {
      error: {
        insufficient: `Du har ikke nok BCPT for denne transaktion`,
        generic: `Der opstod en fejl med overførslen, prøv igen senere`,
      },
      transfer: `Overførsel BCPT`,
      address: `Destination Address (uden '0x' præfiks)`,
      balance: Y => `Din aktuelle BCPT saldo er ${typeof Y === 'string'? Y.slice (0,8): ''} `,
      bcptAddress: `BCPT Adresse`,
    },
    changeProfilePic: `Tryk for at ændre`,
    addProfilePic: `Brug Billede fra telefon`,
    panelHeaders: [
      `ETH (& BCPT) Adresse`,
      `ETH Balance`,
      `BCPT Balance`,
      `ETH Transaktion Historie`,
      `PIN Skift`,
      `Skift kaldenavn`,
      `Skift e-mail`,
      `Skift profilbillede`,
      `Skift Lock timeout`,
      `Mnemonic`,
      `Underretninger`,
    ],
    viewEtherscan: `Se Etherscan Historie`,
    profilePic: {
      change: `Skift profilbillede`,
      setError: `Der var en fejl ved upload dit billede, prøv igen senere`,
      getError: `Der var en fejl under hentning dit profilbillede`,
      setSuccess: `Profilbillede opdateret`,
    },
    logoutSuccess: `Du har logget ud!`,
  },

  currentBalance: {
    eth: `Din aktuelle Eth saldo er:`,
    bcpt: `Din aktuelle BCPT saldo er:`,
  },

  welcomeView: {
    by: `FREMSTILLET AF`,
    makeItEasy: `Lndr gør det nemt at spore simple gæld`,
    weHelpFriends: `Vi hjælper venner bor, arbejder og leger sammen.`,
    len: `Len`,
    dot: `.`,
    der: `der`,
    shareDinner: `Del Dinner`,
    fillTank: `Fyld din tank`,
    travelTogether: `rejse sammen`,
    runEthereum: `Vi kører på ETH!`,
    firstLendingApp: `Den første mobile udlån app sikret på blockchain.`,
    greatConcert: `Se en stor koncert`,
    youPlayWithFriends: `Du spiller med venner, \ n vi vil holde fanen ...`,
    start: `Kom igang`,
  },

  debtManagement: {
    shell: `Ny Transaktion`,
    add: `Tilføj gæld`,
    selectFriend: `Vælg`,
    lend: `nyt lån`,
    borrow: `Ny gæld`,
    iLent: `En ven skylder mig`,
    iBorrowed: `Jeg skylder en ven`,
    settleUpLower: `Gøre regningen op`,
    amountToSettle: `Beløb, Settle`,
    total: `Total`,
    record: `optage`,
    records: `optegnelser`,
    createError: {
      amountTooLow: `Beløb skal være større end $ 0`,
      amountTooHigh: `Beløb skal være mindre end $ 1.000.000.000`,
      selfAsFriend: `Du kan ikke oprette gæld med dig selv, skal du vælge en anden ven`,
      pending: `Venligst løse dit verserende transaktion med denne bruger, før du opretter en anden`,
      insufficientEth: E => `Du skal have mindst ${E} ETH at bosætte gå til Indstillinger for at se din balance`,
    },
    fields: {
      amount: `Beløb`,
      settlementAmount: `afregningsbeløbet`,
      selectFriend: `Ven`,
      memo: `Memo`,
      direction: `Vælg den rigtige Statement`,
    },
    memo: {
      example: `Type memo her`,
    },
    direction: {
      lend: X => `${X} skylder me`,
      borrow: X => `Jeg skylder ${X}`,
      initiatedLend: X => `${X} siger han / hun owes`,
      initiatedBorrow: X => `${X} siger du owe`,
      pendingLend: X => `@${X} skylder you`,
      pendingBorrow: X => `Du skylder @${X}`,
      pendingLendSettlement: S => `@${S.debtorNickname} anmoder om en løsning i ${S.settlementCurrency}`,
      pendingBorrowSettlement: S => `@${S.creditorNickname} ønsker at afregne med dig i ${S.settlementCurrency}`,
      pendingLendSettlementMe: S => `Du har anmodet om at afregne med @${S.debtorNickname} i ${S.settlementCurrency}`,
      pendingBorrowSettlementMe: S => `Du har anmodet om, at @${S.creditorNickname} bosætte sig i ${S.settlementCurrency}`,
    },
    pending: {
      success: F => `Indtil gæld forelægges @${F.nickname}`,
      error: generalCommunicationError
    },
    pendingParens: `(verserende)`,
    confirmation: {
      transaction: CP => `Transaktion med ${CP} er blevet bekræftet`,
      settlement: CP => `Afregning med ${CP} er blevet bekræftet`,
      error: `Kan ikke bekræfte transaktionen på dette tidspunkt, prøv igen senere`,
    },
    rejection: {
      success: `Transaktion er blevet afvist`,
      error: `Kan ikke afvise transaktionen på dette tidspunkt, prøv igen senere`,
    },
    balances: {
      error: `Kan ikke indlæse saldi på dette tidspunkt, prøv igen senere`,
    },
    for: M => `for ${M}`,
    settleUp: `Gøre regningen op`,
    settleTotal: `Settle alt`,
    settleUpMemo: (D, A) => `${D === 'lend'? 'Afregning op til': 'Anmodning om at nøjes med'} ${A} `,
    recordSettleUpMemo: `afregning op`,
  },
  settlementManagement: {
    bilateral: {
      error: {
        insufficient: X => `Din bebyggelse med ${X} mislykkedes på grund af utilstrækkelig funds`,
        generic: X => `Der opstod en fejl under behandling af din afregning med ${X}`,
      }
    },
    eth: `Afregne med ETH`,
    nonPayment: `Optag en afregning`,
  },

  accountViewLanguage: {
    lndr: `Ln d r`,
    home: `Hjem`,
    friends: `venner`,
    activity: `Aktivitet`,
  },

  notifications: {
    toggleNotifications: `Toggle Meddelelser`,
    enable: `Tænde for`,
    disable: `Sluk`,
  },

  pendingTransactionsLanguage: {
    shell: `Afventer Transaktion`,
    title: `Verserende`,
    memo: `BEMÆRK:`,
    for: `Til`,
    none: `Du har ingen ventende transaktioner`,
    confirmationQuestion: `Er du sikker på du vil bekræfte denne transaktion?`,
    pendingAnnouncement: `Denne transaktion venter på bekræftelse af den anden part.`,
    bilateral: `Venter på Eth overførslen er færdig`,
    confirm: `Bekræfte`,
    reject: `Afvis Transaktion`,
    rejectRequest: `Afvise`,
    cancel: `Annuller Transaktion`,
    direction: {
      lend: (X, Z) => `@${X} skylder dig ${Z}`,
      borrow: (X, Z) => `Du skylder @${X} ${Z}`,
    }
  },

  pendingSettlementsLanguage: {
    shell: `Afventer Afregning`,
    title: `Verserende`,
    none: `Du har ingen ventende bosættelser`,
    confirm: `Bekræfte`,
    reject: `Afvis Settlement`,
    cancel: `Annuller Settlement`,
  },

  recentTransactionsLanguage: {
    title: `afsluttet`,
    none: `Du har ingen gennemførte transaktioner`,
    direction: {
      lend: (X, Z) => `@${X} skylder dig ${Z}`,
      borrow: (X, Z) => `Du skylder @${X} ${Z}`
    },
    balance: `Balance`,
    friends: FS => `(fra ${FS} ${FS === 1 ? 'Ven' :'Venner'})`,
  },

  tabs: {
    home: `Hjem`,
    friends: `venner`,
    activity: `Aktivitet`,
  },

  confirmation: {
    shell: `Bekræftelse`,
    done: `Færdig`,
    create: {
      start: `Vi har sendt posten over til `,
      end: ` for bekræftelse.`,
    },
    confirm: {
      start: `Du har bekræftet denne rekord fra`,
      end: `.`,
    },
    reject: {
      start: `Vi har ladet `,
      end: ` vide, at du har afvist denne rekord.`,
    },
    confirmFriend: {
      start: `Du er nu venner med `,
      end: `!`,
    },
    rejectFriend: {
      start: `Du har afvist den venneanmodning fra `,
      end: `.`,
    },
    ethSent: {
      start: `Du har sendt `,
      end: `ETH og din transaktion hash er `,
    },
    bcptSent: {
      start: `Du har sendt `,
      end: ` BCPT og din transaktion hash er `,
    },
    status: `Du kan se status for denne transaktion i `,
    activity: `fanen aktivitet.`,
  },

  pendingFriendRequestsLanguage: {
    shell: `Venneanmodning`,
    message: `Venne anmodning`,
    request: F => `${F} ønsker at være venner med dig!`,
  }
}
