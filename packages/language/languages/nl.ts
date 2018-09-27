import { currencySymbols, transferLimits } from 'lndr/currencies'

const CUR = currencySymbols
const TL = transferLimits

const generalCommunicationError = 'Er was een probleem in de communicatie met de server, probeer het later opnieuw.'

export default {

  applicationName: `Lndr`,
  helloWorld: `Hallo wereld`,
  noConnection: `Geen connectie`,
  retry: `Opnieuw proberen`,
  submit: `INSTUREN`,
  next: `Volgende`,
  cancel: `Annuleer`,
  back: `Ga terug`,
  copy: `Kopieer naar klembord`,
  confirmAccount: `Bevestig`,
  createAccount: `Maak account aan`,
  recoverAccount: `Herstel account`,
  removeAccount: `Verwijder account`,
  updateAccount: `Werk account bij`,
  loginAction: `Ontgrendel`,
  enterPin: `TOETS ALSTUBLIEFT UW PINCODE IN`,
  changePin: `Wijzig pincode`,
  enterCurrentPin: `Toets huidige pincode in`,
  logoutAction: `UITLOGGEN`,
  seeAllActivity: `Bekijk alle activiteiten`,
  copiedClipboard: `Gekopieerd naar het klembord`,
  pleaseWait: `Even geduld alstublieft`,
  addFriend: `Vriend toevoegen`,
  addFriendConfirmationQuestion: `Bent u zeker dat u deze gebruiker wilt toevoegen als vriend?`,
  removeFriend: `Verwijder vriend`,
  currentFriends: `Huidige vrienden`,
  removeFriendConfirmationQuestion: `Bent u zeker dat u deze gebruiker wilt verwijderen als vriend?`,
  inviteFriends: `Nodig vrienden uit voor Lndr`,
  tryLndr: `Probeer de Lndr App hier:`,
  friendInfo: `Meer informatie over deze vriendschap:`,
  noFriends: `Voeg vrienden toe om aan de slag te gaan!`,
  noMatches: `Geen overeenkomende gebruikers gevonden`,
  noBalances: `U heeft geen geregistreerde schulden`,
  addFriendButton: `Vriend toevoegen`,
  alreadyFriendsButton: `Vrienden`,
  friendShell: `Vriend`,
  tip: `Tip:`,
  notice: `Let op:`,
  welcome: `Welkom bij uw LNDR`,
  noBalanceWarning: `We waren niet in staat om uw saldo op dit moment te laden, probeer het later opnieuw.`,
  totalBalance: `Totaal saldo:`,
  totalBalances: `Totaal tegenpartijen:`,
  newTransaction: `Nieuwe transactie`,
  needsReview: `In behandeling`,
  owesMe: `Ik heb tegoed`,
  iOwe: `Ik ben aan iemand schuldig`,
  newPassword: `Nieuw wachtwoord (minimaal 8 tekens)`,
  confirmPassword: `Bevestig wachtwoord`,
  newPin: `Nieuwe 4-cijferige pincode`,
  enterNewPin: `STEL ALSTUBLIEFT EEN NIEUWE 4-CIJFERIGE PINCODE IN`,
  confirmPin: `BEVESTIG UW PINCODE`,
  newAccount: `Maak een nieuw account aan`,
  loginAccount: `Ontgrendel uw account`,
  recoverExistingAccount: `Herstel een bestaand account`,
  recoverMnemonic: `Geheugensteun (12 woorden die weergegeven zijn \ntoen u uw account heeft aangemaakt)`,
  recoverMnemonicLengthError: `De geheugensteun moet precies 12 woorden bevatten`,
  successTitle: `Succes`,
  errorTitle: `Fout`,
  showMnemonic: `Toon geheugensteun van 12 woorden`,
  mnemonicExhortation: `Deze zin van 12 woorden is vereist om uw account te herstellen, bewaar het op een veilige en geheime plek`,
  addressExhortation: `Stuur Ethereum naar uw adres, zodat u uw schulden kunt betalen op Lndr`,
  removeAccountTitle: `Bent u zeker dat u uw account wilt verwijderen van dit apparaat?`,
  removeAccountExhortation: `Zorg ervoor dat u toegang tot uw geheugensteun heeft om later uw account te herstellen, want dit is een permanente verwijdering van uw accountgegevens van dit apparaat.`,
  myAccount: `Mijn account`,
  setNickname: `Stel een gebruikersnaam in, zodat uw vrienden naar u kunnen zoeken`,
  setEmail: `Stel een e-mailadres in om informatie over Lndr updates te ontvangen`,
  nickname: `Gebruikersnaam (kleine letters en nummers)`,
  email: `E-mailadres`,
  accountManagement: {
    nickname: {
      lengthViolation: `Gebruikersnaam moet minimaal 3 tekens bevatten.`,
      compositionViolation: `Gebruikersnaam mag alleen cijfers en kleine letters bevatten.`,
      duplicationViolation: `Gebruikersnaam is al in gebruik`,
    },
    email: {
      compositionViolation: `Formaat van het e-maildres is onjuist`,
      duplicationViolation: `Dit e-mailadres is al in gebruik`,
    },
    pin: {
      lengthViolation: `Pincode moet minimaal 4 tekens bevatten.`,
      matchViolation: `Pincodes moeten overeenkomen.`,
      failedHashComparison: `Pincode is niet geldig, probeer het opnieuw.`,
      updateSuccess: `Uw pincode is bijgewerkt`,
      updateError: `Er is een fout opgetreden bij het bijwerken van uw pincode`,
    },
    mnemonic: {
      lengthViolation: `De geheugensteun moet minstens 12 woorden bevatten.`,
      unableToValidate: `De ingevoerde geheugensteun was niet geldig, probeer het opnieuw.`,
    },
    setNickname: {
      success: `Uw gebruikersnaam is opgeslagen.`,
      error: generalCommunicationError
    },
    setEmail: {
      success: `Uw e-mailadres is opgeslagen.`,
      error: generalCommunicationError
    },
    lockTimeout: {
      top: `U moet uw pincode invoeren na`,
      bottom: `minuten van inactiviteit`,
      update: `Bijwerken`,
      error: `We waren niet in staat om uw accountinstellingen bij te werken`,
      success: `Lock timeout bijgewerkt`,
    },
    addFriend: {
      success: X => `Vriendschapsverzoek gestuurd naar @${X}`,
      error: generalCommunicationError
    },
    removeFriend: {
      success: X => `Verwijderd uit vrienden: @${X} `,
      error: generalCommunicationError
    },
    loadInformation: {
      error: generalCommunicationError
    },
    ethBalance: {
      display: Y => `Uw ETH saldo is ${String(Y).slice(0,8)}`,
      getError: `Kan Eth balans niet ophalen`,
      manage: `Beheer ETH`,
    },
    sendEth: {
      error: {
        insufficient: `U heeft niet genoeg ETH voor deze transactie`,
        generic: `Er is een fout opgetreden bij de overboeking, probeer het later opnieuw`,
        address: `Vul alstublieft een geldig adres in`,
        amount: `Vul alstublieft een bedrag in dat groter is dan 0`,
        limitExceeded: A => `U kunt maar ${CUR(A)}${TL(A)} per week versturen, kies een kleiner bedrag`
      },
      amount: `Hoeveelheid te versturen`,
      address: `Ontvangstadres (zonder voorvoegsel '0x')`,
      transfer: `Boek ETH over`,
      transferAll: `Boek alles over`,
      balance: Y => `Uw huidige ETH saldo is ${typeof Y === 'string'? Y.slice(0,8) : ''} `,
      ethAddress: `Ethereum Adres`,
      txCost: (B, A) => `De huidige transactie kost ${CUR(A)}${B}`,
      transferLowercase: `Boek ETH over`,
      note: A => `Let op: u kunt maar ${CUR(A)}${TL(A)} per week overboeken uit Lndr`,
      warning: (Z, A) => `U heeft ${CUR(A)}${Z} over van uw ${CUR(A)}${TL(A)} limiet`,
    },
    sendBcpt: {
      error: {
        insufficient: `U heeft niet genoeg BCPT voor deze transactie`,
        generic: `Er is een fout opgetreden bij de overboeking, probeer het later opnieuw`,
      },
      transfer: `Boek BCPT over`,
      address: `Ontvangstadres (zonder voorvoegsel '0x')`,
      balance: Y => `Uw huidige BCPT saldo is ${typeof Y === 'string'? Y.slice (0,8) : ''} `,
      bcptAddress: `BCPT Adres`,
    },
    panelHeaders: [
      `ETH (& BCPT) Adres`,
      `ETH saldo`,
      `BCPT saldo`,
      `Verwijder account`,
      `ETH transactiegeschiedenis`,
      `Inschakelen PayPal`,
      `Wijzig primaire valuta`,
      `Wijzig pincode`,
      `Wijzig e-mailadres`,
      `Wijzig Lock Timeout`,
      `Geheugensteun  `,
      `Notificaties`,
    ],
    viewEtherscan: `Bekijk Etherscan geschiedenis`,
    profilePic: {
      change: `Profielfoto veranderen`,
      setError: `Er is een fout opgetreden bij het uploaden van uw foto, probeer het later opnieuw`,
      getError: `Er is een fout opgetreden bij het ophalen van uw profielfoto`,
      setSuccess: `Profielfoto bijgewerkt`,
    },
    logoutSuccess: `U bent succesvol uitgelogd!`,
    logoutError: generalCommunicationError,
  },

  currentBalance: {
    eth: `Uw huidige Eth saldo is:`,
    bcpt: `Uw huidige BCPT saldo is:`,
  },

  welcomeView: {
    by: `GEBOUWD DOOR`,
    makeItEasy: `Lndr maakt het gemakkelijk om eenvoudige schulden te volgen`,
    weHelpFriends: `Wij helpen vrienden samen te wonen, werken en spelen.`,
    len: `Len`,
    dot: `.`,
    der: `der`,
    shareDinner: `Deel diner`,
    fillTank: `Vul uw tank`,
    travelTogether: `Samen reizen`,
    runEthereum: `We draaien op ETH!`,
    firstLendingApp: `De eerste mobiele kredietverleningsapp beveiligd met blockchain.`,
    greatConcert: `Zie een geweldig concert`,
    youPlayWithFriends: `U speelt met vrienden; \n wij houden de rekening bij...`,
    start: `Begin`,
  },

  walkthrough: {
    skip: `overspringen`,
    continue: `doorgaan met`,
    step1: {
      easyToUse: `Lndr is de makkelijkste manier om rekeningen, kosten delen te splitsen en te regelen eenvoudige schulden met vrienden en familie, alles gebeurt stevig op de blockchain.`,
      len: `Len`,
      der: `der`,
    },
    step2: {
      getStarted: `Aan de slag met Lndr, moet u een vriend.`,
      friendsScreen: `Bezoek de Vrienden scherm te zoeken, toevoegen of uitnodigen uw vrienden en familie aan te sluiten op Lndr.`,
    },
    step3: {
      title: `Het opnemen van een Transactie`,
      easy: `Het splitsen van een rekening of het toevoegen van een schuld met een vriend is gemakkelijk in Lndr!`,
      selectFriend: `Kies je vriend, je valuta en het bedrag.`,
      addMemo: `Voeg wat noten in de memo in en klik op Verzenden.`,
    },
    step4: {
      title: `Betalen`,
      ready: `Klaar om te betalen?`,
      payPal: `Wanneer het tijd is om af te rekenen met Lndr, \n- U kunt kiezen PayPal:`,
      ether: `- cryptocurrencies zoals Ether:`,
      cash: `- of gewoon neem een ​​cash settlement:`,
      positiveBalance: `10.46`,
    },
    step5: {
      title: `Meerdere valuta`,
      multiCurrency: `Lndr kunt bijhouden van uw transacties, zelfs als ze toevallig in verschillende valuta's te houden.`,
      exchangeRate: `Wanneer u besluit om Up Settle met je vriend, zullen alle transacties worden omgezet in uw primaire valuta met behulp van de meest up-to-date wisselkoersen beschikbaar.`,
      start: `Start met behulp van Lndr!`,
    }
  },

  debtManagement: {
    shell: `Nieuwe transactie`,
    add: `Schuld toevoegen`,
    selectFriend: `Kies`,
    lend: `Nieuwe lening`,
    borrow: `Nieuwe schuld`,
    owesMe: `Is me`,
    iOwe: `Ik ben verschuldigd`,
    iLent: `Een vriend is me verschuldigd`,
    iBorrowed: `Ik ben verschuldigd aan een vriend`,
    settleUpLower: `Betalen`,
    amountToSettle: `Bedrag te betalen`,
    total: `Totaal`,
    record: `Document`,
    records: `Documentatie`,
    chooseCurrency: `Kies een valuta`,
    
    createError: {
      amountTooLow: `Het bedrag moet groter zijn dan $0`,
      amountTooHigh: `Het bedrag moet kleiner zijn dan $1.000.000.000`,
      selfAsFriend: `U kunt geen schulden maken met uzelf, kies een andere vriend`,
      pending: `Los alstublieft de openstaande transactie met deze gebruiker op voordat u een nieuwe aanmaakt`,
      insufficientEth: E => `U heeft minimaal ${E} ETH nodig om te betalen, ga naar Instellingen om uw saldo te zien`,
    },
    fields: {
      currency: `Valuta`,
      amount: `Bedrag`,
      settlementAmount: `Betalingsbedrag`,
      selectFriend: `Vriend`,
      memo: `Notitie`,
      direction: `Selecteer de juiste verklaring`,
    },
    memo: {
      example: `Typ notitie hier`,
    },
    direction: {
      lend: X => `${X} is mij verschuldigd`,
      borrow: X => `Ik ben ${X} verschuldigd`,
      initiatedLend: X => `${X} zegt dat hij/zij is mij verschuldigd`,
      initiatedBorrow: X => `${X} zegt dat u verschuldigd bent`,
      pendingLend: X => `@${X} is u verschuldigd`,
      pendingBorrow: X => `U bent verschuldigd @${X} `,
      pendingLendSettlement: S => `@${S.debtorNickname} vraagt ​​om een ​​betaling in ${S.settlementCurrency}`,
      pendingBorrowSettlement: S => `@${S.creditorNickname} wil u betalen in ${S.settlementCurrency}`,
      pendingLendSettlementMe: S => `U verzocht om betaling aan @${S.debtorNickname} in ${S.settlementCurrency} `,
      pendingBorrowSettlementMe: S => `U heeft @${S.creditorNickname} verzocht te betalen in ${S.settlementCurrency} `,
    },
    pending: {
      success: F => `Openstaande schulden verstuurd aan @${F.nickname}`,
      error: generalCommunicationError
    },
    pendingParens: `(in behandeling)`,
    confirmation: {
      transaction: CP => `Transactie met ${CP} is succesvol bevestigd`,
      settlement: CP => `Betaling aan ${CP} is succesvol bevestigd`,
      error: `Kan de transactie niet bevestigen op dit moment, probeer het later opnieuw`,
    },
    rejection: {
      success: `Transactie is afgewezen`,
      error: `Kan de transactie niet afwijzen op dit moment, probeer het later opnieuw`,
    },
    balances: {
      error: `Kan saldi op dit moment niet laden, probeer het later opnieuw`,
    },
    for: M => `voor ${M}`,
    settleUp: `Betalen`,
    settleTotal: `Betaal totaal`,
    settleUpMemo: (D, A) => `${D === 'lend' ? 'Betaling voor': 'Verzoek om te betalen voor'} ${A} `,
    recordSettleUpMemo: `Betalen`,
    balanceByCurrency: `Details`,
  },
  settlementManagement: {
    bilateral: {
      error: {
        insufficient: X => `Uw betaling aan ${X} is mislukt vanwege onvoldoende saldo`,
        generic: X => `Er is een fout opgetreden in de verwerking van uw betaling aan ${X} `,
      }
    },
    eth: `Betaal met ETH`,
    paypal: `Betaal met PayPal`,
    nonPayment: `Documenteer een betaling`,
  },

  accountViewLanguage: {
    lndr: `L n d r`,
    home: `Home`,
    friends: `Vrienden`,
    activity: `Activiteit`,
  },

  notifications: {
    toggleNotifications: `Wijzig notificaties`,
    enable: `Aanzetten`,
    disable: `Uitschakelen`,
  },

  pendingTransactionsLanguage: {
    shell: `Transactie in behandeling`,
    title: `In behandeling`,
    memo: `Notitie:`,
    for: `Voor`,
    none: `U heeft geen transacties in behandeling`,
    confirmationQuestion: `Bent u zeker dat u deze transactie wilt bevestigen?`,
    pendingAnnouncement: `Deze transactie wacht op bevestiging door de andere partij.`,
    bilateral: `Wachten op voltooien van de Eth overboeking`,
    confirm: `Bevestig`,
    reject: `Weiger transactie`,
    rejectRequest: `Wijs af`,
    cancel: `Annuleer transactie`,
    direction: {
      lend: (X, Z) => `@${X} is u ${Z} verschuldigd`,
      borrow: (X, Z) => `U bent @${X} ${Z} verschuldigd`,
    }
  },

  pendingSettlementsLanguage: {
    shell: `Betaling in behandeling`,
    title: `In behandeling`,
    none: `U heeft geen betalingen in behandeling`,
    confirm: `Bevestig`,
    reject: `Weiger betaling`,
    cancel: `Annuleer betaling`,
  },

  recentTransactionsLanguage: {
    title: `Voltooid`,
    none: `U heeft geen afgeronde transacties`,
    direction: {
      lend: (X, Z) => `@${X} is u ${Z} verschuldigd`,
      borrow: (X, Z) => `U bent @${X} ${Z} verschuldigd`
    },
    balance: `Saldo`,
    consolidatedBalance: `Saldo`,
    friends: FS => `(van ${FS} ${FS === 1 ? 'vriend': 'vrienden'})`,
  },

  tabs: {
    home: `Home `,
    friends: `Vrienden`,
    activity: `Activiteit`,
  },

  confirmation: {
    shell: `Bevestiging`,
    done: `Afgerond`,
    create: {
      start: `We hebben het document naar `,
      end: ` gestuurd ter bevestiging.`,
    },
    confirm: {
      start: ``,
      end: ` heeft dit document bevestigd.`,
    },
    reject: {
      start: `We hebben `,
      end: ` laten weten dat u dit document heeft geweigerd.`,
    },
    confirmFriend: {
      start: `U bent nu vrienden met `,
      end: `!`,
    },
    rejectFriend: {
      start: `U heeft de vriendschapsaanvraag van `,
      end: ` geweigerd.`,
    },
    rejectOutboundFriendRequest: {
      start: `U heeft de aanvraag voor een vriend te `,
      end: ` geannuleerd.`,
    },
    ethSent: {
      start: `U heeft succesvol `,
      end: ` ETH verzonden en uw transactiekenmerk is `,
    },
    bcptSent: {
      start: `U heeft succesvol `,
      end: ` BCPT verzonden en uw transactiekenmerk is `,
    },
    requestPayPalPayee: {
      start: `We hebben laten `,
      end: ` weten dat je zou willen om zich te vestigen met PayPal.`,
    },
    requestPayPalPayment: {
      start: `We hebben laten `,
      end: ` weten dat u wilt worden betaald met PayPal.`,
    },
    settledWithPayPal: {
      start: `We hebben laten `,
      end: ` weten dat je hebt verrekend met PayPal.`,
    },
    status: `U kunt de status van deze transactie zien in het `,
    activity: `tabblad activiteit.`,
  },

  pendingFriendRequestsLanguage: {
    shell: `Vriendschapsverzoek`,
    message: `Vriendschapsverzoeken`,
    request: F => `@${F} wil vrienden met u worden! `,
    outbound: F => `Je stuurde een vriend verzoek aan @${F} `,
  },

  privacyPolicy: {
    link: `lndr.io/terms/`,
    message: `Door te klikken, bevestigt u dat u het privacybeleid van Blockmason hebt gelezen en hiermee akkoord gaat. Blockmason kan uw e-mailadres gebruiken om updates over Blockmason en LNDR te verzenden. Hier is een link naar het privacybeleid:`
  },

  payPalLanguage: {
    connectPayPal: `Sluit PayPal`,
    connectSuccess: `PayPal ingeschakeld succes.`,
    disconnectPayPal: `Koppel PayPal los`,
    disconnected: `PayPal verbroken.`,
    requestPayPalPayment: `Verzoek PayPal Payment`,
    sendWithPayPal: `Stuur Met PayPal`,
    enablePayPal: `Inschakelen PayPal`,
    requestPayPalPayee: `Verzoek PayPal`,
    enablePayPalForFriend: F => `Inschakelt PayPal laat @${F} om je te betalen`,
    friendNotEnabled: F => `@${F} is niet ingeschakeld PayPal betalingen.`,
    friendRequestedConnect: F => `@${F} wil je betalen via PayPal`,
    requestFriendConnect: F => `Je vroeg @${F} om PayPal mogelijk te maken`,
    feesNotification: `Omvat niet PayPal kosten`,
    feesInformationHeader: `PayPal Fees Informatie`,
    feesInformation: `1. Uw PayPal-rekening moet worden gekoppeld aan een bankrekening.
    
2. Niet gratis in een andere valuta dan de valuta van uw bank zal oplopen een $ 0.35 kosten.
    
3. Internationale transfersommen:
    Verenigde Staten naar Canada / Europa: $ 2.99
    USA om ergens anders: $ 4.99
    
4. Deze kosten zijn niet volledig. Voor de meest actuele informatie ga naar:

    https://www.paypal.com/us/webapps/mpp/paypal-fees#sending-us`,
    payPalSite: `PayPal.com`,
  }
}
