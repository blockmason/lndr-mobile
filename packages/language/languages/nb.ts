import { currencySymbols, transferLimits } from 'lndr/currencies'

const CUR = currencySymbols
const TL = transferLimits

const generalCommunicationError = 'Det oppstod et problem i kommunikasjonen med serveren, venligst prøv igjen senere.'

export default {

  applicationName: `Lndr`,
  helloWorld: `Hei verden`,
  submit: `SEND INN`,
  next: `Neste`,
  cancel: `Avbryt`,
  back: `Gå tilbake`,
  copy: `Kopier til utklippstavle`,
  confirmAccount: `Bekreft`,
  createAccount: `Opprett konto`,
  recoverAccount: `Gjenopprett konto`,
  removeAccount: `Fjern konto`,
  updateAccount: `Oppdater konto`,
  loginAction: `Lås opp`,
  enterPin: `TAST INN DIN PIN-KODE`,
  changePin: `Endre PIN-kode`,
  enterCurrentPin: `Tast inn nåværende PIN-kode`,
  logoutAction: `LOGG UT`,
  seeAllActivity: `Se alle aktiviteter`,
  copiedClipboard: `Kopiert til utklippstavlen`,
  pleaseWait: `Vennligst vent`,
  addFriend: `Legg til venn`,
  addFriendConfirmationQuestion: `Er du sikker på at du vil legge til denne brukeren som en venn?`,
  removeFriend: `Fjern venn`,
  currentFriends: `Nåværende venner`,
  removeFriendConfirmationQuestion: `Er du sikker på at du vil fjerne denne brukeren som en venn?`,
  inviteFriends: `Inviter venner til Lndr`,
  tryLndr: `Prøv ut Lndr Appen her:`,
  friendInfo: `Mer informasjon om dette vennskapet:`,
  noFriends: `Legg til venner for å komme i gang!`,
  noMatches: `Ingen matchende brukere funnet`,
  noBalances: `Du har ikke registrert gjeld`,
  addFriendButton: `Legg til venn`,
  alreadyFriendsButton: `Venner`,
  friendShell: `Venn`,
  tip: `Tips:`,
  notice: `Merk:`,
  welcome: `Velkommen til ditt LNDR`,
  noBalanceWarning: `Vi var ikke i stand til å laste saldoen din på dette tidspunktet, vennligst prøv igjen senere.`,
  totalBalance: `Total saldo:`,
  totalBalances: `Total motparter:`,
  newTransaction: `Nye Transaksjoner`,
  needsReview: `Venter på godkjenning`,
  owesMe: `Jeg har tilgode`,
  iOwe: `Jeg skylder noen`,
  newPassword: `Nytt passord (minimum 8 tegn)`,
  confirmPassword: `Bekreft passord`,
  newPin: `Ny 4-sifret PIN-kode`,
  enterNewPin: `Vennligst tast inn en ny 4-sifret PIN-kode`,
  confirmPin: `Vennligst bekreft din PIN-kode`,
  newAccount: `Opprett en ny konto`,
  loginAccount: `Lås opp kontoen din`,
  recoverExistingAccount: `Gjenopprett en eksisterende konto`,
  recoverMnemonic: `Minnestøtte (12 ord som ble vist \n når du opprettet kontoen)`,
  recoverMnemonicLengthError: `Minnestøtte bør være nøyaktig 12 ord`,
  successTitle: `Suksess`,
  errorTitle: `Feil`,
  showMnemonic: `Vis minnestøtte på 12 ord`,
  mnemonicExhortation: `Denne setningen på 12 ord er nødvendig for å gjenopprette kontoen din, bevar det på et trygt og hemmelig sted`,
  addressExhortation: `Send Ethereum til adressen din slik at du kan gjøre opp for deg på Lndr`,
  removeAccountTitle: `Er du sikker på at du vil fjerne kontoen din fra denne enheten?`,
  removeAccountExhortation: `Vær sikker på at du har tilgang til din minnestøtte for å gjenopprette kontoen din senere, da dette er en permanent fjerning av kontoinformasjonen din fra denne enheten.`,
  myAccount: `Min konto`,
  setNickname: `Still inn et brukernavn slik at vennene dine kan søke etter deg`,
  setEmail: `Angi en e-postadresse for å motta informasjon om Lndr oppdateringer`,
  nickname: `Brukernavn (små bokstaver og tall)`,
  email: `E-postadresse`,
  accountManagement: {
    nickname: {
      lengthViolation: `Brukernavn bør være minst 3 tegn.`,
      compositionViolation: `Brukernavn kan bare inneholde tall og små bokstaver.`,
      duplicationViolation: `Brukernavn er allerede i bruk`,
    },
    email: {
      compositionViolation: `E-postformatet er feil`,
      duplicationViolation: `E-postadressen er allerede i bruk`,
    },
    pin: {
      lengthViolation: `PIN-koden bør være minst 4 tegn.`,
      matchViolation: `PIN-koder bør matche.`,
      failedHashComparison: `PIN-koden er ikke gyldig, vennligst prøv igjen.`,
      updateSuccess: `PIN-koden din er oppdatert`,
      updateError: `Det oppstod en feil i å oppdatere PIN-koden din`,
    },
    mnemonic: {
      lengthViolation: `Minnestøtte bør ha minst 12 ord.`,
      unableToValidate: `Den angitte minnestøtten var ikke gyldig, vennligst prøv igjen.`,
    },
    setNickname: {
      success: `Brukernavnet ditt er lagret.`,
      error: generalCommunicationError
    },
    setEmail: {
      success: `Din e-postadressen har blitt lagret.`,
      error: generalCommunicationError
    },
    lockTimeout: {
      top: `Du må angi PIN-koden din etter`,
      bottom: `minutter uten aktivitet`,
      update: `Oppdater`,
      error: `Vi klarte ikke å oppdatere kontoinnstillingene dine`,
      success: `Lås timeout oppdatert`,
    },
    addFriend: {
      success: X => `Venneforespørsel sendt til @${X}`,
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
      getError: `Kan ikke hente Eth saldoen`,
      manage: `Administrer ETH`,
    },
    sendEth: {
      error: {
        insufficient: `Du har ikke nok ETH for denne transaksjonen`,
        generic: `Det oppstod en feil med overføringen, vennligst prøv igjen senere`,
        address: `Vennligst oppgi en gyldig adresse`,
        amount: `Venligst fyll inn et beløp større enn 0`,
        limitExceeded: A => `Du kan bare sende ${CUR(A)}${TL(A)} per uke, vennligst velg et mindre beløp`,
      },
      amount: `Beløpet som skal sendes`,
      address: `Bestemmelsesadresse (uten '0x' prefiks)`,
      transfer: `Overfør ETH`,
      transferAll: `Overfør alt`,
      balance: Y => `Din nåværende ETH saldo er ${typeof Y === 'string' ? Y.slice (0,8) :''} `,
      ethAddress: `Ethereum adresse`,
      txCost: (B, A) => `De aktuelle transaksjonskostnader er ${CUR(A)}${B}`,
      transferLowercase: `Overfør Eth`,
      note: A => `Merk: Du kan bare overføre ${CUR(A)}${TL(A)} per uke ut av Lndr`,
      warning: (Z, A) => `Du har ${CUR(A)}${Z} igjen av ditt ${CUR(A)}${TL(A)} maksbeløpet`,
    },
    sendBcpt: {
      error: {
        insufficient: `Du har ikke nok BCPT for denne transaksjonen`,
        generic: `Det oppstod en feil med overføringen, vennligst prøv igjen senere`,
      },
      transfer: `Overfør BCPT`,
      address: `Bestemmelsesadresse (uten '0x' prefiks)`,
      balance: Y => `Din nåværende BCPT saldo er ${typeof Y === 'string' ? Y.slice(0,8) :''} `,
      bcptAddress: `BCPT Adresse`,
    },
    panelHeaders: [
      `ETH (og BCPT) Adresse`,
      `ETH Balance`,
      `BCPT Balance`,
      `Fjern konto`,
      `ETH Transaksjonshistorikk`,
      `Aktiver PayPal`,
      `Endre Primær Valuta`,
      `Endre PIN-kode`,
      `Endre e-post`,
      `Endre Lock Timeout`,
      `Mnemonic`,
      `Varsler`,
    ],
    viewEtherscan: `Vis Etherscan historikk`,
    profilePic: {
      change: `Bytt profilbilde`,
      setError: `Det oppstod en feil ved opplasting av bildet ditt, vennligst prøv igjen senere`,
      getError: `Det oppstod en feil ved henting av profilbildet ditt`,
      setSuccess: `Profilbilde er oppdatert`,
    },
    logoutSuccess: `Du har nå logget ut!`,
    logoutError: generalCommunicationError,
  },

  currentBalance: {
    eth: `Din nåværende Eth saldoen er:`,
    bcpt: `Din nåværende BCPT saldoen er:`,
  },

  welcomeView: {
    by: `BYGD AV`,
    makeItEasy: `Lndr gjør det enkelt å følge enkle gjeldLndr gjør det enkelt å følge enkle gjeld`,
    weHelpFriends: `Vi hjelper venner å bo, arbeide og leke sammen.`,
    len: `Ut`,
    dot: `.`,
    der: `lånerlånerlånerlånerlånerlånerlåner`,
    shareDinner: `Del middag`,
    fillTank: `Fyll tanken din`,
    travelTogether: `Reis sammen`,
    runEthereum: `Vi kjører på ETH!`,
    firstLendingApp: `Den første mobile utlånsappen som er sikret på blockchain.`,
    greatConcert: `Se en flott konsert`,
    youPlayWithFriends: `Du spiller med venner, \n vi vil holde styr på regningen...`,
    start: `Kom i gang`,
  },

  debtManagement: {
    shell: `Ny transaksjon`,
    add: `Legg til gjeld`,
    selectFriend: `Selekter`,
    lend: `Nytt lånNytt lånNytt lånNytt lånNytt lånNytt lån`,
    borrow: `Ny gjeld`,
    iLent: `En venn skylder meg`,
    iBorrowed: `Jeg skylder en venn`,
    settleUpLower: `Gjør opp`,
    amountToSettle: `Beløpet til å gjøre opp`,
    total: `Total`,
    record: `Oversikt`,
    records: `Oversikter`,
    chooseCurrency: `Velg en valuta`,
    
    createError: {
      amountTooLow: `Beløpet må være større enn $ 0`,
      amountTooHigh: `Beløpet må være mindre enn $ 1.000.000.000`,
      selfAsFriend: `Du kan ikke opprette gjeld med deg selv, velg en annen venn`,
      pending: `Vennligst gjør opp din utestående transaksjon med denne brukeren før du oppretter en annen`,
      insufficientEth: E => `Du trenger minst ${E} ETH til å gjøre opp for deg, gå til Innstillinger for å se din saldo`,
    },
    fields: {
      currency: `Valuta`,
      amount: `Beløp`,
      settlementAmount: `Oppgjørsbeløpet`,
      selectFriend: `Venn`,
      memo: `Notat`,
      direction: `Velg den riktige erklæringen`,
    },
    memo: {
      example: `Skriv notatet her`,
    },
    direction: {
      lend: X => `${X} skylder meg`,
      borrow: X => `Jeg skylder ${X}`,
      initiatedLend: X => `${X} sier han / hun skylder`,
      initiatedBorrow: X => `${X} sier du skylder`,
      pendingLend: X => `@${X} skylder deg`,
      pendingBorrow: X => `Du skylder @${X}`,
      pendingLendSettlement: S => `@${S.debtorNickname} ber om et oppgjør i ${S.settlementCurrency}`,
      pendingBorrowSettlement: S => `@${S.creditorNickname} ønsker å gjøre opp med deg i ${S.settlementCurrency}`,
      pendingLendSettlementMe: S => `Du har bedt om å gjøre opp for deg med @${S.debtorNickname} i ${S.settlementCurrency}`,
      pendingBorrowSettlementMe: S => `Du har bedt om at @${S.creditorNickname} gjør opp for seg i ${S.settlementCurrency}`,
    },
    pending: {
      success: F => `Gjeld under vurdering sendt inn til @${F.nickname}`,
      error: generalCommunicationError
    },
    pendingParens: `(under vurdering)`,
    confirmation: {
      transaction: CP => `Transaksjon med ${CP} har blitt bekreftet`,
      settlement: CP => `Oppgjør med ${CP} har blitt bekreftet`,
      error: `Kan ikke bekrefte transaksjonen på denne tiden, vennligst prøv igjen senere`,
    },
    rejection: {
      success: `Transaksjonen er avvist`,
      error: `Kan ikke avvise transaksjonen på denne tiden, vennligst prøv igjen senere`,
    },
    balances: {
      error: `Kan ikke laste saldoer på denne tiden, vennligst prøv igjen senere`,
    },
    for: M => `for ${M}`,
    settleUp: `Gjør opp`,
    settleTotal: `Gjør opp totalbeløpet`,
    settleUpMemo: (D, A) => `${D === 'lend' ? 'Gjør opp for': 'Forespørsel om å betale for'} ${A} `,
    recordSettleUpMemo: `Gjør opp`,
    balanceByCurrency: `Detaljer`,
  },
  settlementManagement: {
    bilateral: {
      error: {
        insufficient: X => `Ditt oppgjør med ${X} mislyktes på grunn av utilstrekkelige midler`,
        generic: X => `Det oppstod en feil under oppgjøret med ${X}`,
      }
    },
    eth: `Gjør opp med ETH`,
    paypal: `Gjør opp med PayPal`,
    nonPayment: `Ta opp et oppgjør`,
  },

  accountViewLanguage: {
    lndr: `L n d r`,
    home: `Hjem`,
    friends: `Venner`,
    activity: `Aktivitet`,
  },

  notifications: {
    toggleNotifications: `Endre varsler`,
    enable: `Slå på`,
    disable: `Slå av`,
  },

  pendingTransactionsLanguage: {
    shell: `Transaksjon under vurdering`,
    title: `Under vurdering`,
    memo: `Notat:`,
    for: `Til`,
    none: `Du har ingen transaksjoner under vurdering`,
    confirmationQuestion: `Er du sikker på at du vil bekrefte denne transaksjonen?`,
    pendingAnnouncement: `Denne transaksjonen venter på bekreftelse av den andre parten.`,
    bilateral: `Venter på at Eth overføringen er fullført`,
    confirm: `Bekreft`,
    reject: `Avvis transaksjon`,
    rejectRequest: `Avvis`,
    cancel: `Avbryt transaksjon`,
    direction: {
      lend: (X, Z) => `@${X} skylder deg ${Z}`,
      borrow: (X, Z) => `Du skylder @${X} ${Z}`,
    }
  },

  pendingSettlementsLanguage: {
    shell: `Oppgjør under vurdering`,
    title: `Under vurdering`,
    none: `Du har ingen oppgjør under vurdering`,
    confirm: `Bekreft`,
    reject: `Avvis Oppgjør`,
    cancel: `Avbryt Oppgjør`,
  },

  recentTransactionsLanguage: {
    title: `Fullført`,
    none: `Du har ingen fullførte transaksjoner`,
    direction: {
      lend: (X, Z) => `@${X} skylder deg ${Z}`,
      borrow: (X, Z) => `Du skylder @${X} ${Z}`
    },
    balance: `Saldo`,
    consolidatedBalance: `Saldo`,
    friends: FS => `(fra ${FS} ${FS === 1 ? 'venn': 'venner'})`,
  },

  tabs: {
    home: `Hjem `,
    friends: `  Venner  `,
    activity: `Aktivitet`,
  },

  confirmation: {
    shell: `Bekreftelse`,
    done: `Ferdig`,
    create: {
      start: `Vi har sendt oversikten over til `,
      end: ` for bekreftelse.`,
    },
    confirm: {
      start: ``,
      end: ` har bekreftet denne oversikten.`,
    },
    reject: {
      start: `Vi har informert `,
      end: ` over at du avviste denne oversikten.`,
    },
    confirmFriend: {
      start: `Du er nå venner med `,
      end: `!`,
    },
    rejectFriend: {
      start: `Du har avvist venneforespørselen fra `,
      end: `.`,
    },
    ethSent: {
      start: `Du har sendt `,
      end: ` ETH og transaksjonens referanse er `,
    },
    bcptSent: {
      start: `Du har sendt `,
      end: ` BCPT og transaksjonens referanse er `,
    },
    requestPayPalPayee: {
      start: `Vi har latt `,
      end: ` vet at du ønsker å bosette seg med PayPal.`,
    },
    requestPayPalPayment: {
      start: `Vi har latt `,
      end: ` vet at du ønsker å bli betalt med PayPal.`,
    },
    settledWithPayPal: {
      start: `Vi har latt `,
      end: ` vet at du har avgjort med PayPal.`,
    },
    status: `Du kan se statusen for denne transaksjonen `,
    activity: `i aktivitetsfanen.`,
  },

  pendingFriendRequestsLanguage: {
    shell: `Venneforespørsel`,
    message: `Venneforespørsler`,
    request: F => `@${F} ønsker å være venner med deg!`,
  },

  privacyPolicy: {
    link: `lndr.io/terms/`,
    message: `Ved å klikke nedenfor bekrefter du at du har lest og aksepterer Blockmasons personvernreglene. Blockmason kan bruke e-postadressen din til å sende oppdateringer om Blockmason og LNDR. Her er en lenke til personvernreglene:`
  },

  payPalLanguage: {
    connectPayPal: `Koble PayPal`,
    connectSuccess: `PayPal aktivert vellykket.`,
    disconnectPayPal: `Koble PayPal`,
    disconnected: `PayPal frakoblet.`,
    requestPayPalPayment: `Forespørsel om PayPal Payment`,
    sendWithPayPal: `Send Med PayPal`,
    enablePayPal: `Aktiver PayPal`,
    requestPayPalPayee: `Be om PayPal`,
    enablePayPalForFriend: F => `Aktivering PayPal tillater @${F} for å betale you.`,
    friendNotEnabled: F => `@${F} har ikke aktivert PayPal betalinger.`,
    friendRequestedConnect: F => `@${F} ønsker å betale deg via PayPal`,
    requestFriendConnect: F => `Du ba @${F} for å muliggjøre PayPal`,
    feesNotification: `Inkluderer ikke PayPal avgifter`,
    feesInformationHeader: `PayPal gebyrer Informasjon`,
    feesInformation: `1. PayPal-kontoen din må være knyttet til en bankkonto.
    
2. Betale i en annen valuta enn bankens valuta vil medføre en $ 0.35 gebyr.

3. Internasjonale overføre avgifter:
    USA til Canada / Europa: $ 2.99
    USA til noe annet: $ 4.99

4. Disse avgiftene er ikke fullstendig. For den mest oppdaterte informasjon vennligst gå til:

    https://www.paypal.com/us/webapps/mpp/paypal-fees#sending-us`,
    payPalSite: `PayPal.com`,
  }
}
