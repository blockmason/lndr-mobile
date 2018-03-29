import { currencies, transferLimits } from 'language'

const CUR = currencies
const TL = transferLimits

const generalCommunicationError = 'There was a problem communicating with the server, please try again later.'

export default {

  applicationName: `Lndr`,
  helloWorld: `Hallo Welt`,
  submit: `EINREICHEN`,
  next: `Nächster`,
  cancel: `Stornieren`,
  back: `Geh zurück`,
  copy: `In die Zwischenablage kopieren`,
  confirmAccount: `Bestätigen`,
  createAccount: `Benutzerkonto anlegen`,
  recoverAccount: `wiederherstellen Konto`,
  removeAccount: `Konto entfernen`,
  updateAccount: `Account aktualisieren`,
  loginAction: `Freischalten`,
  enterPin: `Bitte geben Sie Ihre PIN`,
  changePin: `PIN ändern`,
  enterCurrentPin: `Aktuelle PIN eingeben`,
  logoutAction: `AUSLOGGEN`,
  seeAllActivity: `Alle Aktivitäten anzeigen`,
  copiedClipboard: `In die Zwischenablage kopiert`,
  pleaseWait: `Warten Sie mal`,
  addFriend: `Freund hinzufügen`,
  addFriendConfirmationQuestion: `Sind Sie sicher, dass Sie möchten uns an dieser Benutzer als Freund hinzufügen?`,
  removeFriend: `Freund entfernen`,
  currentFriends: `aktuelle Freunde`,
  removeFriendConfirmationQuestion: `Sind Sie sicher, dass Sie möchten uns an dieser Benutzer als Freund entfernen?`,
  inviteFriends: `Lade deine Freund in Lndr`,
  tryLndr: `Schauen Sie sich die Lndr App hier aus:`,
  friendInfo: `Weitere Informationen zu dieser Freundschaft:`,
  noFriends: `Fügen Sie ein paar Freunde, um loszulegen!`,
  noMatches: `Keine passenden Benutzer gefunden`,
  noBalances: `Sie haben keine Schulden aufgenommen`,
  addFriendButton: `Freund hinzufügen`,
  alreadyFriendsButton: `Freunde`,
  friendShell: `Freund`,
  tip: `Spitze:`,
  notice: `Beachten:`,
  welcome: `Willkommen in Ihrem LNDR`,
  noBalanceWarning: `Wir waren nicht in der Lage, das Gleichgewicht zu dieser Zeit zu laden, bitte versuchen Sie es später noch einmal.`,
  totalBalance: `Gesamtsaldo:`,
  totalBalances: `Insgesamt Partner:`,
  newTransaction: `neue Transaktion`,
  needsReview: `Needs Bewertung`,
  owesMe: `Ich schuldete`,
  iOwe: `Ich verdanke jemand`,
  newPassword: `Neues Passwort (mindestens 8 Zeichen)`,
  confirmPassword: `Bestätige das Passwort`,
  newPin: `Neuer 4-stellige PIN`,
  enterNewPin: `BITTE NEUEN 4-stellige PIN`,
  confirmPin: `Bitte bestätigen Sie Ihre PIN`,
  newAccount: `Ein neues Konto erstellen`,
  loginAccount: `Entsperren Sie Ihr Konto`,
  recoverExistingAccount: `Gewinnen Sie ein bestehendes Konto`,
  recoverMnemonic: `Mnemonic (12 Wörter angezeigt \n when Sie Ihr Konto erstellt)`,
  recoverMnemonicLengthError: `Mnemonic sollte genau 12 Wörter sein`,
  successTitle: `Erfolg`,
  errorTitle: `Error`,
  showMnemonic: `Zeige 12-Word-Mnemonic`,
  mnemonicExhortation: `Dieser 12-Wort-Satz benötigt, um Ihr Konto wiederzuherzustellen, bitte halten irgendwo sicher und geheim`,
  addressExhortation: `Senden Astraleum zu Ihrer Adresse, so dass Sie Schulden auf Lndr absetzen können`,
  removeAccountTitle: `Sind Sie sicher, dass Sie mögen, dass Ihr Konto von diesem Gerät entfernen?`,
  removeAccountExhortation: `Achten Sie darauf, dass Sie den Zugriff auf Ihre mnemonic haben Ihr Konto später wieder herzustellen, da dies eine dauerhafte Entfernung von Ihren Kontoinformationen von diesem Gerät ist.`,
  myAccount: `Mein Konto`,
  setNickname: `Legen Sie einen Spitznamen, damit Ihre Freunde Sie suchen`,
  setEmail: `Stellen Sie eine E-Mail Informationen über Lndr-Updates zu erhalten`,
  nickname: `Spitzname (Klein & Zahlen)`,
  email: `E-Mail-Addresse`,
  accountManagement: {
    nickname: {
      lengthViolation: `Spitzname sollte mindestens 3 Zeichen lang sein.`,
      compositionViolation: `Spitzname kann nur Zahlen und Kleinbuchstaben enthalten.`,
      duplicationViolation: `Spitzname ist bereits vergeben`,
    },
    email: {
      compositionViolation: `E-Mail-Format ist falsch`,
      duplicationViolation: `E-Mail ist bereits vergeben`,
    },
    pin: {
      lengthViolation: `PIN sollte mindestens 4 Zeichen lang sein.`,
      matchViolation: `PINs sollten übereinstimmen.`,
      failedHashComparison: `PIN ist nicht gültig, bitte versuchen Sie es erneut.`,
      updateSuccess: `Ihre PIN wurde aktualisiert`,
      updateError: `Es gab einen Fehler PIN-Aktualisierung`,
    },
    mnemonic: {
      lengthViolation: `Mnemonic sollte mindestens 12 Worte.`,
      unableToValidate: `Die eingegebene mnemonic war ungültig, bitte versuchen Sie es erneut.`,
    },
    setNickname: {
      success: `Ihr Spitzname wurde gespeichert.`,
      error: generalCommunicationError
    },
    setEmail: {
      success: `Ihre E-Mail wurde gespeichert.`,
      error: generalCommunicationError
    },
    lockTimeout: {
      top: `Sie müssen Ihre PIN eingeben nach`,
      bottom: `Minuten Inaktivität`,
      update: `Aktualisieren`,
      error: `Wir konnten Ihre Kontoeinstellungen aktualisieren`,
      success: `Lock Timeout Aktualisiert`,
    },
    addFriend: {
      success: X => `Freund Anfrage an @${X} gesendet`,
      error: generalCommunicationError
    },
    removeFriend: {
      success: X => `von Freunden entfernt: @${X}`,
      error: generalCommunicationError
    },
    loadInformation: {
      error: generalCommunicationError
    },
    ethBalance: {
      display: Y => `Ihr ETH Gleichgewicht ist ${String (Y) .slice (0,8)}`,
      inFiat: (Z, B, A) => ` (${CUR[A]}${String(Number(Z) * Number(B)).slice(0, 8)})`,
      getError: `Unfähig Eth Balance abrufen`,
      manage: `verwalten ETH`,
    },
    sendEth: {
      error: {
        insufficient: `Die Übertragung wurde aufgrund unzureichender Mittel`,
        generic: `Es gab einen Fehler bei der Übertragung, bitte versuchen Sie es später noch einmal`,
        address: `Bitte geben Sie eine gültige Adresse ein`,
        amount: `Bitte geben Sie eine Menge von mehr als 0`,
        limitExceeded: A => `Sie können nur $ senden {CUR [A]} ${TL [A]} pro Woche, wählen Sie bitte eine kleinere amount`,
      },
      amount: `Betrag zu senden`,
      address: `Zieladresse (ohne ‚0x‘ Präfix)`,
      transfer: `Transfer ETH`,
      transferAll: `Bringen Sie alles`,
      balance: Y => `Ihr aktuelles ETH Gleichgewicht ist ${typeof Y === 'string'? Y.slice (0,8): ''} `,
      ethAddress: `Astraleum Anschrift`,
      txCost: (B, A) => `Die aktuelle Transaktion kostet ${CUR [A]} ${B}`,
      transferLowercase: `übertragen Eth`,
      note: A => `Bitte beachten Sie: Sie können nur $ übertragen {CUR [A]} ${TL [A]} pro Woche aus Lndr`,
      warning: (Z, A) => `Sie haben ${CUR [A]} ${Z} Rest Ihres ${CUR [A]} ${TL [A]} limit`,
    },
    sendBcpt: {
      error: {
        insufficient: `Sie haben nicht genug BCPT für diese Transaktion`,
        generic: `Es gab einen Fehler bei der Übertragung, bitte versuchen Sie es später noch einmal`,
      },
      transfer: `Transfer BCPT`,
      address: `Zieladresse (ohne ‚0x‘ Präfix)`,
      balance: Y => `Ihr aktuelles BCPT Gleichgewicht ist ${typeof Y === 'string'? Y.slice (0,8): ''} `,
      bcptAddress: `BCPT Anschrift`,
    },
    changeProfilePic: `Tippen Sie auf Ändern`,
    addProfilePic: `Verwenden Sie Bild von Telefon`,
    panelHeaders: [
      `ETH (& BCPT) Adresse`,
      `ETH Gleichgewicht`,
      `BCPT Gleichgewicht`,
      `ETH Transaktionshistorie`,
      `PIN ändern`,
      `Spitznamen ändern`,
      `Ändern Sie die E-Mail`,
      `Profilbild ändern`,
      `Änderungssperre Timeout`,
      `Mnemotechnisch`,
      `Benachrichtigungen`,
    ],
    viewEtherscan: `Ansicht Etherscan Geschichte`,
    profilePic: {
      change: `Profilbild ändern`,
      setError: `Es gab einen Fehler Ihr Bild hochladen, bitte versuchen Sie es später noch einmal`,
      getError: `Es ist ein Fehler aufgetreten Profilbild Abrufen`,
      setSuccess: `Bild aktualisiert`,
    },
    logoutSuccess: `Du hast dich erfolgreich abgemeldet!`,
  },

  currentBalance: {
    eth: `Ihr aktuelles Eth Gleichgewicht ist:`,
    bcpt: `Ihr aktuelles BCPT Gleichgewicht ist:`,
  },

  welcomeView: {
    by: `GEBAUT VON`,
    makeItEasy: `Lndr macht es leicht, einfach Schulden verfolgen`,
    weHelpFriends: `Wir helfen Freunde leben, arbeiten und spielen zusammen.`,
    len: `Len`,
    dot: `.`,
    der: `der`,
    shareDinner: `Teilen Abendessen`,
    fillTank: `Füllen Sie Ihren Tank`,
    travelTogether: `Zusammen reisen`,
    runEthereum: `Wir laufen auf ETH!`,
    firstLendingApp: `Das erste mobile Kredit App auf dem blockchain gesichert.`,
    greatConcert: `Sehen Sie ein großes Konzert`,
    youPlayWithFriends: `Sie spielen mit Freunden; \n wir die Registerkarte halten ...`,
    start: `Loslegen`,
  },

  debtManagement: {
    shell: `neue Transaktion`,
    add: `In Debt`,
    selectFriend: `Wählen`,
    lend: `neue Darlehen`,
    borrow: `neue Schulden`,
    iLent: `Ein Freund schuldet mir`,
    iBorrowed: `Ich schulde einen Freund`,
    settleUpLower: `Abrechnen`,
    amountToSettle: `Betrag zu begleichen`,
    total: `Gesamt`,
    record: `Aufzeichnung`,
    records: `Aufzeichnungen`,
    createError: {
      amountTooLow: `Betrag muss größer sein als $ 0`,
      amountTooHigh: `Betrag muss weniger als $ 1000000000`,
      selfAsFriend: `Sie können nicht Schulden schaffen mit sich selbst, wählen Sie einen anderen Freund`,
      pending: `Bitte lösen Sie Ihre anstehende Transaktion mit diesem Benutzer vor einem anderen zu schaffen`,
      insufficientEth: E => `Sie müssen mindestens ${E} ETH, gehen Sie zu Einstellungen zu begleichen Ihre balance zu ​​sehen`,
    },
    fields: {
      amount: `Menge`,
      settlementAmount: `Abrechnungsbetrag`,
      selectFriend: `Freund`,
      memo: `Memo`,
      direction: `Wählen Sie die richtige Aussage`,
    },
    memo: {
      example: `Typ Memo hier`,
    },
    direction: {
      lend: X => `${X} verdankt me`,
      borrow: X => `Ich schulde ${X}`,
      initiatedLend: X => `${X}, sagt er / sie owes`,
      initiatedBorrow: X => `${X} sagt, Sie owe`,
      pendingLend: X => `@${X} verdankt you`,
      pendingBorrow: X => `Sie schulden @${X}`,
      pendingLendSettlement: S => `@${S.debtorNickname} fordert eine Siedlung in ${S.settlementCurrency}`,
      pendingBorrowSettlement: S => `@${S.creditorNickname} möchte mit Ihnen in ${S.settlementCurrency} regeln`,
      pendingLendSettlementMe: S => `Sie werden gebeten mit @${S.debtorNickname} in ${S.settlementCurrency} zu regeln`,
      pendingBorrowSettlementMe: S => `Sie haben beantragt, @${S.creditorNickname} siedeln in ${S.settlementCurrency}`,
    },
    pending: {
      success: F => `pending Schulden vorgelegt @${F.nickname}`,
      error: generalCommunicationError
    },
    pendingParens: `(steht aus)`,
    confirmation: {
      transaction: CP => `Transaktion mit $ {CP} wurde erfolgreich bestätigt`,
      settlement: CP => `Abrechnung mit $ {CP} wurde erfolgreich bestätigt`,
      error: `Transaktion nicht möglich zu diesem Zeitpunkt zu bestätigen, versuchen Sie es erneut bitte später`,
    },
    rejection: {
      success: `Transaktion wurde abgelehnt`,
      error: `Transaktion nicht möglich zu diesem Zeitpunkt ablehnen, versuchen Sie es erneut bitte später`,
    },
    balances: {
      error: `Unfähig Salden zu diesem Zeitpunkt zu laden, versuchen Sie es erneut bitte später`,
    },
    for: M => `für ${M}`,
    settleUp: `Abrechnen`,
    settleTotal: `Settle Gesamt`,
    settleUpMemo: (D, A) => `${D === 'lend'? 'Settling up für': 'Antrag beizulegen für'} $ {A} `,
    recordSettleUpMemo: `Absetzen up`,
  },
  settlementManagement: {
    bilateral: {
      error: {
        insufficient: X => `Ihre Siedlung mit ${X} ist fehlgeschlagen aufgrund unzureichender funds`,
        generic: X => `Es war ein Fehler bei der Verarbeitung Ihrer Siedlung mit ${X}`,
      }
    },
    eth: `Settle mit der ETH`,
    nonPayment: `Nehmen Sie eine Abrechnung`,
  },

  accountViewLanguage: {
    lndr: `L n d r`,
    home: `Zuhause`,
    friends: `Freunde`,
    activity: `Aktivität`,
  },

  notifications: {
    toggleNotifications: `Toggle Benachrichtigungen`,
    enable: `Anmachen`,
    disable: `Abschalten`,
  },

  pendingTransactionsLanguage: {
    shell: `Ausstehende Transaktion`,
    title: `steht aus`,
    memo: `Memo:`,
    for: `Zum`,
    none: `Sie haben keine ausstehenden Transaktionen`,
    confirmationQuestion: `Sind Sie sicher, dass Sie diese Transaktion bestätigen?`,
    pendingAnnouncement: `Diese Transaktion wird von der anderen Partei für die Bestätigung warten.`,
    bilateral: `Warten auf Eth Übertragung abgeschlossen`,
    confirm: `Bestätigen`,
    reject: `ablehnen Transaktion`,
    rejectRequest: `Ablehnen`,
    cancel: `Abbrechen der Transaktion`,
    direction: {
      lend: (X, Z) => `@${X} schuldet Ihnen ${Z}`,
      borrow: (X, Z) => `Sie schulden @${X} ${Z}`,
    }
  },

  pendingSettlementsLanguage: {
    shell: `Bis zur Abrechnung`,
    title: `steht aus`,
    none: `Sie haben keine ausstehenden Siedlungen`,
    confirm: `Bestätigen`,
    reject: `ablehnen Settlement`,
    cancel: `Abbrechen Settlement`,
  },

  recentTransactionsLanguage: {
    title: `Abgeschlossen`,
    none: `Sie haben keine abgeschlossenen Transaktionen`,
    direction: {
      lend: (X, Z) => `@${X} schuldet Ihnen ${Z}`,
      borrow: (X, Z) => `Sie schulden @${X} ${Z}`
    },
    balance: `Balance`,
    friends: FS => `(von ${FS} ${FS === 1 ? 'Freund': 'Freunde'})`,
  },

  tabs: {
    home: `Zuhause`,
    friends: `Freunde`,
    activity: `Aktivität`,
  },

  confirmation: {
    shell: `Bestätigung`,
    done: `Erledigt`,
    create: {
      start: `Wir haben den Rekord über `,
      end: ` zur Bestätigung geschickt.`,
    },
    confirm: {
      start: `Sie haben diesen Datensatz bestätigt aus`,
      end: `.`,
    },
    reject: {
      start: `Wir haben lassen `,
      end: ` wissen, dass Sie diesen Datensatz abgelehnt.`,
    },
    confirmFriend: {
      start: `Sie sind jetzt befreundet mit `,
      end: `!`,
    },
    rejectFriend: {
      start: `Sie haben die Freundschaftsanfrage sank von`,
      end: `.`,
    },
    ethSent: {
      start: `Sie haben erfolgreich gesendet `,
      end: ` ETH und Ihre Transaktion Hash ist: `,
    },
    bcptSent: {
      start: `Sie haben erfolgreich `,
      end: ` BCPT und Ihre Transaktion Hash gesendet`,
    },
    status: `Sie können den Status dieser Transaktion in `,
    activity: `der Aktivität Registerkarte sehen.`,
  },

  pendingFriendRequestsLanguage: {
    shell: `Frage von einem Freund`,
    message: `Freundschaftsanfragen`,
    request: F => `${F} möchte mit Ihnen Freunde sein!`,
  }
}
