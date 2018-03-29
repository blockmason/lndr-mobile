import { currencies, transferLimits } from 'language'

const CUR = currencies
const TL = transferLimits

const generalCommunicationError = 'There was a problem communicating with the server, please try again later.'

export default {

  applicationName: `Lndr`,
  helloWorld: `Hallo Wereld`,
  submit: `SUBMIT`,
  next: `volgende`,
  cancel: `Annuleer`,
  back: `Ga terug`,
  copy: `Kopieer naar klembord`,
  confirmAccount: `Bevestigen`,
  createAccount: `Account aanmaken`,
  recoverAccount: `Herstel rekening`,
  removeAccount: `Verwijder account`,
  updateAccount: `rekening bijwerken`,
  loginAction: `ontsluiten`,
  enterPin: `Geef uw pincode`,
  changePin: `Verander pincode`,
  enterCurrentPin: `Enter Current PIN`,
  logoutAction: `UITLOGGEN`,
  seeAllActivity: `Bekijk alle activiteiten`,
  copiedClipboard: `Gekopieerd naar het klembord`,
  pleaseWait: `Even geduld aub`,
  addFriend: `Vriend toevoegen`,
  addFriendConfirmationQuestion: `Bent u zeker dat u wilt deze gebruiker toevoegen als vriend?`,
  removeFriend: `Verwijder vriend`,
  currentFriends: `huidige Friends`,
  removeFriendConfirmationQuestion: `Bent u zeker dat u deze gebruiker als een vriend te verwijderen?`,
  inviteFriends: `Nodig vrienden uit voor Lndr`,
  tryLndr: `Check out de Lndr App hier:`,
  friendInfo: `Meer informatie over deze vriendschap:`,
  noFriends: `Voeg wat vrienden aan de slag te gaan!`,
  noMatches: `Geen overeenkomende gebruikers gevonden`,
  noBalances: `Je hebt geen opgenomen schulden`,
  addFriendButton: `Vriend toevoegen`,
  alreadyFriendsButton: `vrienden`,
  friendShell: `Vriend`,
  tip: `Tip:`,
  notice: `Merk op:`,
  welcome: `Welkom bij uw LNDR`,
  noBalanceWarning: `We waren niet in staat om uw saldo op dit moment te laden, probeer het later opnieuw.`,
  totalBalance: `Eindbalans:`,
  totalBalances: `Totaal tegenpartijen:`,
  newTransaction: `nieuw Transaction`,
  needsReview: `behoeften beoordeling`,
  owesMe: `Ik ben schuldig`,
  iOwe: `Ik iemand schuldig`,
  newPassword: `Nieuw wachtwoord (minimaal 8 tekens)`,
  confirmPassword: `bevestig wachtwoord`,
  newPin: `Nieuwe 4-cijferige pincode`,
  enterNewPin: `AUB een nieuwe 4-cijferige pincode`,
  confirmPin: `Bevestig uw PIN`,
  newAccount: `Maak een nieuwe account`,
  loginAccount: `Unlock uw account`,
  recoverExistingAccount: `Herstel een bestaand account`,
  recoverMnemonic: `Mnemonic (12 weergegeven woorden \ Nwhen u uw account aangemaakt)`,
  recoverMnemonicLengthError: `Ezelsbruggetje moet precies 12 woorden`,
  successTitle: `Succes`,
  errorTitle: `Fout`,
  showMnemonic: `Toon 12-Word Mnemonic`,
  mnemonicExhortation: `Deze 12-woord zin is vereist om uw account te herstellen, houd het op een veilige en geheime`,
  addressExhortation: `Stuur Ethereum naar uw adres, zodat je schulden kunt vestigen op Lndr`,
  removeAccountTitle: `Bent u zeker dat u wilt uw account verwijderd van dit apparaat?`,
  removeAccountExhortation: `Zorg ervoor dat u toegang tot uw ezelsbruggetje moet uw account later herstellen, want dit is een permanente verwijdering van uw accountgegevens van dit apparaat.`,
  myAccount: `Mijn rekening`,
  setNickname: `Stel een bijnaam, zodat je vrienden kunt zoeken voor u`,
  setEmail: `Stel een e-mail om informatie te ontvangen over Lndr updates`,
  nickname: `Nickname (kleine letters en nummers)`,
  email: `E-mailadres`,
  accountManagement: {
    nickname: {
      lengthViolation: `Bijnaam moet minimaal 3 tekens.`,
      compositionViolation: `Bijnaam mag alleen cijfers en kleine letters bevatten.`,
      duplicationViolation: `Bijnaam is al in gebruik`,
    },
    email: {
      compositionViolation: `E-mail formaat is onjuist`,
      duplicationViolation: `Deze Email is al in gebruik`,
    },
    pin: {
      lengthViolation: `PIN moet minimaal 4 karakters.`,
      matchViolation: `Pincodes moeten overeenkomen.`,
      failedHashComparison: `PIN-code is niet geldig, probeer het opnieuw.`,
      updateSuccess: `Uw pincode is bijgewerkt`,
      updateError: `Er is een fout opgetreden het bijwerken van uw pincode`,
    },
    mnemonic: {
      lengthViolation: `Mnemonic moet minstens 12 woorden te hebben.`,
      unableToValidate: `De ingevoerde ezelsbruggetje was niet geldig, probeer het opnieuw.`,
    },
    setNickname: {
      success: `Je bijnaam is opgeslagen.`,
      error: generalCommunicationError
    },
    setEmail: {
      success: `Uw e-mail is opgeslagen.`,
      error: generalCommunicationError
    },
    lockTimeout: {
      top: `U moet uw PIN-code in te voeren nadat`,
      bottom: `minuten van inactiviteit`,
      update: `Bijwerken`,
      error: `We waren niet in staat om uw account instellingen bij te werken`,
      success: `Lock Timeout Bijgewerkt`,
    },
    addFriend: {
      success: X => `vriend verzoek gestuurd naar @${X}
      error: generalCommunicationError
    },
    removeFriend: {
      success: X => 'Verwijderd uit vrienden: @${X}`,
      error: generalCommunicationError
    },
    loadInformation: {
      error: generalCommunicationError
    },
    ethBalance: {
      display: Y => `Uw ETH balans is ${String (Y) .slice (0,8)}`,
      inFiat: (Z, B, A) => ` (${CUR[A]}${String(Number(Z) * Number(B)).slice(0, 8)})`,
      getError: `Kan Eth balans op te halen`,
      manage: `Beheer ETH`,
    },
    sendEth: {
      error: {
        insufficient: `De overdracht is mislukt als gevolg van onvoldoende middelen`,
        generic: `Er is een fout opgetreden bij de overdracht, probeer het later opnieuw`,
        address: `Vul alstublieft een geldig adres in`,
        amount: `Vul een bedrag dat groter is dan 0`,
        limitExceeded: A => `Je kunt alleen ${CUR [A]} ${TL [A]} per week, kies dan een kleinere amount`,
      },
      amount: `Hoeveelheid om te versturen`,
      address: `Doeladres (zonder voorvoegsel '0x')`,
      transfer: `Transfer ETH`,
      transferAll: `Transfer alles`,
      balance: Y => `Je huidige ETH balans is ${typeof Y === 'string'? Y.slice (0,8): ''} `,
      ethAddress: `Ethereum Adres`,
      txCost: (B, A) => 'De huidige transactie kosten ${CUR [A]} ${B}',
      transferLowercase: `Transfer Eth`,
      note: A => `Let op: je kunt pas over ${CUR [A]} ${TL [A]} per week uit Lndr`,
      warning: (Z, A) => `Je hebt ${CUR [A]} ${Z} overgebleven van uw ${CUR [A]} ${TL [A]} limit`,
    },
    sendBcpt: {
      error: {
        insufficient: `Je hebt niet genoeg BCPT voor deze transactie`,
        generic: `Er is een fout opgetreden bij de overdracht, probeer het later opnieuw`,
      },
      transfer: `Transfer BCPT`,
      address: `Doeladres (zonder voorvoegsel '0x')`,
      balance: Y => `Je huidige BCPT balans is ${typeof Y === 'string'? Y.slice (0,8): ''} `,
      bcptAddress: `BCPT Adres`,
    },
    changeProfilePic: `Tik om te wijzigen`,
    addProfilePic: `Gebruik Foto van Phone`,
    panelHeaders: [
      `ETH (& BCPT) Adres`,
      `ETH Balance`,
      `BCPT Balance`,
      `ETH Transactie Geschiedenis`,
      `Verander pincode`,
      `Nickname Change`,
      `E-mail wijzigen`,
      `Profielfoto veranderen`,
      `Change Lock Timeout`,
      `Ezelsbruggetje`,
      `Meldingen`,
    ],
    viewEtherscan: `Bekijk Etherscan Geschiedenis`,
    profilePic: {
      change: `Profielfoto veranderen`,
      setError: `Er is een fout opgetreden het uploaden van uw foto, probeer het later opnieuw`,
      getError: `Er is een fout opgetreden het ophalen van uw profiel foto`,
      setSuccess: `Profielfoto bijgewerkt`,
    },
    logoutSuccess: `Je bent succesvol uitgelogd!`,
  },

  currentBalance: {
    eth: `Uw huidige Eth balans is:`,
    bcpt: `Uw huidige BCPT balans is:`,
  },

  welcomeView: {
    by: `GEBOUWD DOOR`,
    makeItEasy: `Lndr maakt het gemakkelijk om eenvoudige schulden te volgen`,
    weHelpFriends: `Wij helpen vrienden wonen, werken en spelen.`,
    len: `Len`,
    dot: `.`,
    der: `der`,
    shareDinner: `Share Diner`,
    fillTank: `Vul uw tank`,
    travelTogether: `Samen reizen`,
    runEthereum: `We draaien op ETH!`,
    firstLendingApp: `De eerste mobiele kredietverlening app bevestigd aan de blockchain.`,
    greatConcert: `Zie een geweldig concert`,
    youPlayWithFriends: `Je speelt met vrienden; \ n we het tabblad te houden ...`,
    start: `Begin`,
  },

  debtManagement: {
    shell: `nieuw Transaction`,
    add: `Debt toevoegen`,
    selectFriend: `kiezen`,
    lend: `nieuwe lening`,
    borrow: `nieuwe Debt`,
    iLent: `Een vriend is me`,
    iBorrowed: `Heb ik te danken een vriend`,
    settleUpLower: `Settle Up`,
    amountToSettle: `Bedrag tot Settle`,
    total: `Totaal`,
    record: `record`,
    records: `archief`,
    createError: {
      amountTooLow: `Het bedrag moet groter zijn dan $ 0`,
      amountTooHigh: `Bedrag moet minder dan $ 1,000,000,000`,
      selfAsFriend: `Je kunt niet de schuld maken met jezelf, kies een andere vriend`,
      pending: `Gelieve het oplossen van uw afwachting van transactie met deze gebruiker voordat het creëren van een ander`,
      insufficientEth: E => `Je hebt minimaal ${E} ETH om zich te vestigen, ga je naar Instellingen om uw balance zien`,
    },
    fields: {
      amount: `Bedrag`,
      settlementAmount: `schikkingsbedrag`,
      selectFriend: `Vriend`,
      memo: `memo`,
      direction: `Selecteer de juiste verklaring`,
    },
    memo: {
      example: `Type memo hier`,
    },
    direction: {
      lend: X => `${X} te vorderen heeft me`,
      borrow: X => `heb ik te danken ${X} `,
      initiatedLend: X => `${X} zegt dat hij / zij owes`,
      initiatedBorrow: X => `${X} zegt dat je owe`,
      pendingLend: X => `@${X} you danken heeft`,
      pendingBorrow: X => `e bent @${X} `,
      pendingLendSettlement: S => `@${S.debtorNickname} vraagt ​​om een ​​nederzetting in ${S.settlementCurrency}`,
      pendingBorrowSettlement: S => `@${S.creditorNickname} wil om zich te vestigen met u in ${S.settlementCurrency}`,
      pendingLendSettlementMe: S => `Je verzocht om zich te vestigen met @${S.debtorNickname} in ${S.settlementCurrency}`,
      pendingBorrowSettlementMe: S => `Je verzocht @${S.creditorNickname} vestigen in ${S.settlementCurrency}`,
    },
    pending: {
      success: F => `openstaande schulden die voorgelegd aan @${F.nickname}`,
      error: generalCommunicationError
    },
    pendingParens: `(in afwachting)`,
    confirmation: {
      transaction: CP => `Transactie met ${CP} zijn bevestigd`,
      settlement: CP => `Settlement met ${CP} zijn bevestigd`,
      error: `Kan de transactie te bevestigen op dit moment, probeer het later opnieuw`,
    },
    rejection: {
      success: `Transactie is afgewezen`,
      error: `Kan de transactie af te wijzen op dit moment, probeer het later opnieuw`,
    },
    balances: {
      error: `Kan saldi op dit moment te laden, probeer het later opnieuw`,
    },
    for: M => `voor ${M}`,
    settleUp: `Settle Up`,
    settleTotal: `Settle Total`,
    settleUpMemo: (D, A) => `${D === 'lenen'? 'Settling up voor': 'Verzoek om zich te vestigen voor'} ${A} `,
    recordSettleUpMemo: `afwikkeling up`,
  },
  settlementManagement: {
    bilateral: {
      error: {
        insufficient: X => `Uw schikking met ${X} is mislukt vanwege onvoldoende funds`,
        generic: X => `Er is een fout verwerking van uw schikking met ${X}`,
      }
    },
    eth: `Settle Met ETH`,
    nonPayment: `Neem een ​​Settlement`,
  },

  accountViewLanguage: {
    lndr: `L n d r`,
    home: `Huis`,
    friends: `vrienden`,
    activity: `Activiteit`,
  },

  notifications: {
    toggleNotifications: `toggle Meldingen`,
    enable: `Aanzetten`,
    disable: `Uitschakelen`,
  },

  pendingTransactionsLanguage: {
    shell: `In afwachting van de transactie`,
    title: `In afwachting`,
    memo: `memo:`,
    for: `Voor`,
    none: `Je hebt geen transacties in behandeling`,
    confirmationQuestion: `Bent u zeker dat u deze transactie te bevestigen?`,
    pendingAnnouncement: `Deze transactie wacht op bevestiging door de andere partij.`,
    bilateral: `Wachten op Eth overdracht te voltooien`,
    confirm: `Bevestigen`,
    reject: `Weigeren Transaction`,
    rejectRequest: `afwijzen`,
    cancel: `Annuleer transactie`,
    direction: {
      lend: (X, Z) => `@${X} dankt u ${Z}`,
      borrow: (X, Z) => `Je bent @${X} ${Z}`,
    }
  },

  pendingSettlementsLanguage: {
    shell: `In afwachting van Settlement`,
    title: `In afwachting`,
    none: `Je hebt geen afwachting van nederzettingen`,
    confirm: `Bevestigen`,
    reject: `Weigeren Settlement`,
    cancel: `Annuleren Settlement`,
  },

  recentTransactionsLanguage: {
    title: `Voltooid`,
    none: `Je hebt geen afgeronde transacties`,
    direction: {
      lend: (X, Z) => `@${X} dankt u ${Z}`,
      borrow: (X, Z) => `Je bent @${X} ${Z}`
    },
    balance: `Balans`,
    friends: FS => `(van ${FS} ${FS === 1 ? 'vriend': 'vrienden'})`,
  },

  tabs: {
    home: `Huis`,
    friends: `vrienden`,
    activity: `Activiteit`,
  },

  confirmation: {
    shell: `Bevestiging`,
    done: `Gedaan`,
    create: {
      start: `We hebben de record over een bevestiging gestuurd naar `,
      end: `.`,
    },
    confirm: {
      start: `Je hebt dit record uit bevestigd`,
      end: `.`,
    },
    reject: {
      start: `We hebben laten `,
      end: ` weten dat u dit record geweigerd.`,
    },
    confirmFriend: {
      start: `U bent nu vrienden met X`,
      end: `!`,
    },
    rejectFriend: {
      start: `U heeft de aanvraag voor een vriend uit gedaald`,
      end: `.`,
    },
    ethSent: {
      start: `Je hebt verzonden `,
      end: ` ETH en uw transactie hash is `,
    },
    bcptSent: {
      start: `Je hebt verzonden `,
      end: ` BCPT en uw transactie hash is `,
    },
    status: `U kunt de status van deze transactie te zien in het `,
    activity: `tabblad activiteit.`,
  },

  pendingFriendRequestsLanguage: {
    shell: `Vriendschapsverzoek`,
    message: `Vriendschapsverzoeken`,
    request: F => `${F} wil vrienden met u!`,
  }
}
