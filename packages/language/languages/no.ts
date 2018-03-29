import { currencies, transferLimits } from 'language'

const CUR = currencies
const TL = transferLimits

const generalCommunicationError = 'There was a problem communicating with the server, please try again later.'

export default {

  applicationName: `Lndr`,
  helloWorld: `Hei Verden`,
  submit: `SENDE INN`,
  next: `neste`,
  cancel: `Avbryt`,
  back: `Gå tilbake`,
  copy: `Kopiere til utklippstavle`,
  confirmAccount: `Bekrefte`,
  createAccount: `Opprett konto`,
  recoverAccount: `gjenopprette kontoen`,
  removeAccount: `Fjern konto`,
  updateAccount: `Oppdater konto`,
  loginAction: `Låse opp`,
  enterPin: `Angi PIN-koden`,
  changePin: `Endre PIN-kode`,
  enterCurrentPin: `Enter Current PIN`,
  logoutAction: `LOGG UT`,
  seeAllActivity: `Se alle aktivitets`,
  copiedClipboard: `Kopiert til utklippstavlen`,
  pleaseWait: `Vennligst vent`,
  addFriend: `Legge til venn`,
  addFriendConfirmationQuestion: `Er du sikker på at du vil legge til denne brukeren som en venn?`,
  removeFriend: `Fjern venn`,
  currentFriends: `nåværende Venner`,
  removeFriendConfirmationQuestion: `Er du sikker på at du vil fjerne denne brukeren som en venn?`,
  inviteFriends: `Inviter venner til Lndr`,
  tryLndr: `Sjekk ut Lndr App her:`,
  friendInfo: `Mer informasjon om dette vennskapet:`,
  noFriends: `Legg noen venner for å komme i gang!`,
  noMatches: `Ingen passende brukere funnet`,
  noBalances: `Du har ikke registrert gjeld`,
  addFriendButton: `Legge til venn`,
  alreadyFriendsButton: `venner`,
  friendShell: `Venn`,
  tip: `Tips:`,
  notice: `Legge merke til:`,
  welcome: `Velkommen til ditt LNDR`,
  noBalanceWarning: `Vi var ikke i stand til å laste saldoen på dette tidspunktet, vennligst prøv igjen senere.`,
  totalBalance: `Total balanse:`,
  totalBalances: `Totalt Motparter:`,
  newTransaction: `New Transaksjons`,
  needsReview: `behov omtale`,
  owesMe: `Jeg skyldte`,
  iOwe: `Jeg skylder noen`,
  newPassword: `Nytt passord (minimum 8 tegn)`,
  confirmPassword: `bekreft passord`,
  newPin: `Ny 4-sifret PIN`,
  enterNewPin: `Vennligst angi en ny 4-sifret PIN-kode`,
  confirmPin: `Vennligst bekreft din PIN`,
  newAccount: `Lag en ny bruker`,
  loginAccount: `Låse opp kontoen din`,
  recoverExistingAccount: `Gjenopprette en eksisterende konto`,
  recoverMnemonic: `Mnemonic (12 ord vises \ nNår du opprettet kontoen)`,
  recoverMnemonicLengthError: `Mnemonic bør være nøyaktig 12 ord`,
  successTitle: `Suksess`,
  errorTitle: `Feil`,
  showMnemonic: `Vis 12-Word Mnemonic`,
  mnemonicExhortation: `Denne 12-ord setning er nødvendig for å gjenopprette kontoen din, kan du holde det på et trygt sted og hemmelig`,
  addressExhortation: `Send Ethereum til adressen din slik at du kan avgjøre skyld på Lndr`,
  removeAccountTitle: `Er du sikker på at du vil fjerne kontoen din fra denne enheten?`,
  removeAccountExhortation: `Vær sikker på at du har tilgang til din mnemonic å gjenopprette kontoen din senere, da dette er en permanent fjerning av kontoinformasjonen din fra denne enheten.`,
  myAccount: `Min konto`,
  setNickname: `Still et kallenavn slik at vennene dine kan søke for deg`,
  setEmail: `Angi en e-post for å motta informasjon om Lndr oppdateringer`,
  nickname: `Kallenavn (små bokstaver og tall)`,
  email: `Epostadresse`,
  accountManagement: {
    nickname: {
      lengthViolation: `Kallenavn bør være minst 3 tegn.`,
      compositionViolation: `Kallenavn kan bare inneholde tall og små bokstaver.`,
      duplicationViolation: `Kallenavnet er allerede tatt`,
    },
    email: {
      compositionViolation: `E-post Formatet er feil`,
      duplicationViolation: `E-posten er allerede i bruk`,
    },
    pin: {
      lengthViolation: `PIN-koden bør være minst 4 tegn.`,
      matchViolation: `PIN-koder bør matche.`,
      failedHashComparison: `PIN-koden er ikke gyldig, prøv igjen.`,
      updateSuccess: `PIN-koden din er oppdatert`,
      updateError: `Det oppstod en feil oppdatere PIN`,
    },
    mnemonic: {
      lengthViolation: `Mnemonic bør ha minst 12 ord.`,
      unableToValidate: `Den angitte mnemonic var ikke gyldig, prøv igjen.`,
    },
    setNickname: {
      success: `Kallenavnet er lagret.`,
      error: generalCommunicationError
    },
    setEmail: {
      success: `Din e-post har blitt frelst.`,
      error: generalCommunicationError
    },
    lockTimeout: {
      top: `Du må angi PIN-koden etter`,
      bottom: `minutter uten aktivitet`,
      update: `Oppdater`,
      error: `Vi klarte ikke å oppdatere kontoinnstillingene`,
      success: `Lås Timeout Oppdatert`,
    },
    addFriend: {
      success: X => `Friend anmodning sendt til @${X}`,
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
      getError: `Kan ikke hente Eth balanse`,
      manage: `Administrer ETH`,
    },
    sendEth: {
      error: {
        insufficient: `Overføringen mislyktes på grunn av manglende dekning`,
        generic: `Det oppstod en feil med overføringen, prøv igjen senere`,
        address: `Vennligst oppgi en gyldig adresse`,
        amount: `Fyll inn et beløp større enn 0`,
        limitExceeded: A => `Du kan bare sende ${CUR [A]} ${TL [A]} per uke, kan du velge en mindre amount`
      },
      amount: `Beløp Send`,
      address: `Destination Address (uten '0x' prefiks)`,
      transfer: `Transfer ETH`,
      transferAll: `overføre alt`,
      balance: Y => `Den gjeldende ETH saldo er ${typeof Y === 'string'? Y.slice (0,8): ''} `,
      ethAddress: `Ethereum Adresse`,
      txCost: (B, A) => `Den aktuelle transaksjonskostnader er ${CUR [A]} ${B}`,
      transferLowercase: `Overfør Eth`,
      note: A => `Merk: Du kan bare overføre ${CUR [A]} ${TL [A]} per uke ut av Lndr`,
      warning: (Z, A) => `Du har ${CUR [A]} ${Z} som gjenstår av ${CUR [A]} ${TL [A]} limit`,
    },
    sendBcpt: {
      error: {
        insufficient: `Du har ikke nok BCPT for denne transaksjonen`,
        generic: `Det oppstod en feil med overføringen, prøv igjen senere`,
      },
      transfer: `Transfer BCPT`,
      address: `Destination Address (uten '0x' prefiks)`,
      balance: Y => `Den gjeldende BCPT saldo er ${typeof Y === 'string'? Y.slice (0,8): ''} `,
      bcptAddress: `BCPT Adresse`,
    },
    changeProfilePic: `Trykk for å endre`,
    addProfilePic: `Bruk Bilde fra telefon`,
    panelHeaders: [
      `ETH (og BCPT) Adresse`,
      `ETH Balance`,
      `BCPT Balance`,
      `ETH Transaksjonshistorikk`,
      `Endre PIN-kode`,
      `Endre kallenavn`,
      `Endre e-post`,
      `Bytt profilbilde`,
      `Endre Lock Timeout`,
      `Mnemonic`,
      `Varsler`,
    ],
    viewEtherscan: `Vis Etherscan History`,
    profilePic: {
      change: `Bytt profilbilde`,
      setError: `Det var en feil ved opplasting bildet ditt, prøv igjen senere`,
      getError: `Det var en feil ved henting profilbildet ditt`,
      setSuccess: `Profilbilde oppdatert`,
    },
    logoutSuccess: `Du har nå logget ut!`,
  },

  currentBalance: {
    eth: `Din nåværende Eth balanse er:`,
    bcpt: `Din nåværende BCPT balanse er:`,
  },

  welcomeView: {
    by: `BYGD AV`,
    makeItEasy: `Lndr gjør det enkelt å spore enkle gjeld`,
    weHelpFriends: `Vi hjelper venner bo, arbeide og leke sammen.`,
    len: `Len`,
    dot: `.`,
    der: `der`,
    shareDinner: `Del Middag`,
    fillTank: `Fylle tanken`,
    travelTogether: `reise sammen`,
    runEthereum: `Vi kjører på ETH!`,
    firstLendingApp: `Den første mobil utlån app sikret på blockchain.`,
    greatConcert: `Se en flott konsert`,
    youPlayWithFriends: `Du spiller med venner, \ n vi vil holde fanen ...`,
    start: `Kom i gang`,
  },

  debtManagement: {
    shell: `New Transaksjons`,
    add: `Legg gjeld`,
    selectFriend: `Plukke ut`,
    lend: `New Loan`,
    borrow: `ny gjeld`,
    iLent: `En venn skylder meg`,
    iBorrowed: `Jeg skylder en venn`,
    settleUpLower: `Bosette seg`,
    amountToSettle: `Beløpet til Settle`,
    total: `Total`,
    record: `ta opp`,
    records: `poster`,
    createError: {
      amountTooLow: `Beløpet må være større enn $ 0`,
      amountTooHigh: `Beløpet må være mindre enn $ 1000000000`,
      selfAsFriend: `Du kan ikke opprette gjeld med deg selv, velg en annen venn`,
      pending: `Vennligst løse utestående transaksjon med denne brukeren før du oppretter en annen`,
      insufficientEth: E => `Du trenger minst ${E} ETH å bosette, går du til Innstillinger for å se din balance`,
    },
    fields: {
      amount: `Beløp`,
      settlementAmount: `oppgjørsbeløpet`,
      selectFriend: `Venn`,
      memo: `Memo`,
      direction: `Velg riktig erklæringen`,
    },
    memo: {
      example: `Type memo her`,
    },
    direction: {
      lend: X => `${X} skylder me`,
      borrow: X => `I skylder ${X}`,
      initiatedLend: X => `${X} sier han / hun owes`,
      initiatedBorrow: X => `${X} sier du owe`,
      pendingLend: X => `@${X} skylder you`,
      pendingBorrow: X => `skylder @${X}`,
      pendingLendSettlement: S => `@${S.debtorNickname} ber om et oppgjør i ${S.settlementCurrency}`,
      pendingBorrowSettlement: S => `@${S.creditorNickname} ønsker å slå seg sammen med deg i ${S.settlementCurrency}`,
      pendingLendSettlementMe: S => `du bedt om å slå seg sammen med @${S.debtorNickname} i ${S.settlementCurrency}`,
      pendingBorrowSettlementMe: S => `du bedt om at @${S.creditorNickname} slå seg ned i ${S.settlementCurrency}`,
    },
    pending: {
      success: F => `Venter gjeld legges @${F.nickname}`,
      error: generalCommunicationError
    },
    pendingParens: `(i påvente av)`,
    confirmation: {
      transaction: CP => `Transaksjons med ${CP} har blitt bekreftet`,
      settlement: CP => `Oppgjør med ${CP} har blitt bekreftet`,
      error: `Kan ikke bekrefte transaksjonen på denne tiden, prøv igjen senere`,
    },
    rejection: {
      success: `Transaksjonen er avvist`,
      error: `Kan ikke avvise transaksjonen på denne tiden, prøv igjen senere`,
    },
    balances: {
      error: `Kan ikke laste balanserer på denne tiden, prøv igjen senere`,
    },
    for: M => `for ${M}`,
    settleUp: `Bosette seg`,
    settleTotal: `Settle Total`,
    settleUpMemo: (D, A) => `${D === 'lend'? 'Settling opp for': 'Forespørsel om å betale for'} ${A} `,
    recordSettleUpMemo: `settling`,
  },
  settlementManagement: {
    bilateral: {
      error: {
        insufficient: X => `Din oppgjør med ${X} mislyktes på grunn av utilstrekkelig funds`,
        generic: X => `Det oppstod en feil under oppgjøret med ${X}`,
      }
    },
    eth: `Settle Med ETH`,
    nonPayment: `Spill en Oppgjør`,
  },

  accountViewLanguage: {
    lndr: `L n d r`,
    home: `Hjem`,
    friends: `venner`,
    activity: `Aktivitet`,
  },

  notifications: {
    toggleNotifications: `Toggle Varsler`,
    enable: `Slå på`,
    disable: `Skru av`,
  },

  pendingTransactionsLanguage: {
    shell: `Avventer Transaksjons`,
    title: `I påvente av`,
    memo: `Memo:`,
    for: `Til`,
    none: `Du har ingen ventende transaksjoner`,
    confirmationQuestion: `Er du sikker på at du vil bekrefte denne transaksjonen?`,
    pendingAnnouncement: `Denne transaksjonen venter på bekreftelse av den andre parten.`,
    bilateral: `Venter på Eth overføringen er fullført`,
    confirm: `Bekrefte`,
    reject: `Avvis Transaksjons`,
    rejectRequest: `Avvis`,
    cancel: `Avbryt Transaksjons`,
    direction: {
      lend: (X, Z) => `@${X} skylder du ${Z}`,
      borrow: (X, Z) => `skylder @${X} ${Z}`,
    }
  },

  pendingSettlementsLanguage: {
    shell: `Avventer Oppgjør`,
    title: `I påvente av`,
    none: `Du har ingen ventende bosetninger`,
    confirm: `Bekrefte`,
    reject: `Avvis Oppgjør`,
    cancel: `Avbryt Oppgjør`,
  },

  recentTransactionsLanguage: {
    title: `fullført`,
    none: `Du har ingen førte transaksjoner`,
    direction: {
      lend: (X, Z) => `@${X} skylder du ${Z}`,
      borrow: (X, Z) => `skylder @${X} ${Z}`
    },
    balance: `Balansere`,
    friends: FS => `(fra ${FS} ${FS === 1 ? 'venn': 'venner'})`,
  },

  tabs: {
    home: `Hjem`,
    friends: `venner`,
    activity: `Aktivitet`,
  },

  confirmation: {
    shell: `Bekreftelse`,
    done: `Ferdig`,
    create: {
      start: `Vi har sendt posten over til `,
      end: ` for bekreftelse.`,
    },
    confirm: {
      start: `Du har bekreftet denne posten fra `,
      end: `.`,
    },
    reject: {
      start: `Vi har latt `,
      end: ` vet at du avviste denne posten.`,
    },
    confirmFriend: {
      start: `Du er nå venner med `,
      end: `!`,
    },
    rejectFriend: {
      start: `Du har avvist venneforespørsel fra `,
      end: `.`,
    },
    ethSent: {
      start: `Du har sendt `,
      end: ` ETH og transaksjonen hasj er `,
    },
    bcptSent: {
      start: `Du har sendt `,
      end: ` BCPT og transaksjonen hasj er `,
    },
    status: `Du kan se statusen for denne transaksjonen i `,
    activity: `kategorien aktivitet.`,
  },

  pendingFriendRequestsLanguage: {
    shell: `Venneforespørsel`,
    message: `Venneforespørsel`,
    request: F => `${F} ønsker å være venner med deg!`,
  }
}
