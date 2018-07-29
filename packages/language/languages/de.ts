import { currencySymbols, transferLimits } from 'lndr/currencies'

const CUR = currencySymbols
const TL = transferLimits

const generalCommunicationError = 'Es gab ein Problem mit der Server-Verbindung, versuchen Sie es bitte später noch einmal.'

export default {

  applicationName: `Lndr`,
  helloWorld: `Hallo Welt`,
  submit: `BESTÄTIGEN`,
  next: `Weiter`,
  cancel: `Abbrechen`,
  back: `Zurück`,
  copy: `In die Zwischenablage kopieren`,
  confirmAccount: `Bestätigen`,
  createAccount: `Benutzerkonto anlegen`,
  recoverAccount: `Benutzerkonto wiederherstellen`,
  removeAccount: `Benutzerkonto löschen`,
  updateAccount: `Benutzerkonto aktualisieren`,
  loginAction: `Freischalten`,
  enterPin: `BITTE GEBEN SIE IHRE PIN EIN`,
  changePin: `PIN ändern`,
  enterCurrentPin: `Aktuelle PIN eingeben`,
  logoutAction: `AUSLOGGEN`,
  seeAllActivity: `Alle Aktivitäten anzeigen`,
  copiedClipboard: `In die Zwischenablage kopiert`,
  pleaseWait: `Bitte warten Sie`,
  addFriend: `Freund hinzufügen`,
  addFriendConfirmationQuestion: `Sind Sie sicher, dass Sie diesen Nutzer als Freund hinzufügen möchten?`,
  removeFriend: `Freund entfernen`,
  currentFriends: `aktuelle Freunde`,
  removeFriendConfirmationQuestion: `Sind Sie sicher, dass Sie diesen Nutzer als Freund entfernen möchten?`,
  inviteFriends: `Laden Sie Ihre Freunde zu Lndr ein`,
  tryLndr: `Versuchen Sie die Lndr-App hier aus:`,
  friendInfo: `Weitere Informationen zu dieser Freundschaft:`,
  noFriends: `Fügen Sie ein paar Freunde hinzu, um loszulegen!`,
  noMatches: `Keine passenden Nutzer gefunden`,
  noBalances: `Sie haben keine erfassten Schulden`,
  addFriendButton: `Freund hinzufügen`,
  alreadyFriendsButton: `Freunde`,
  friendShell: `Freund`,
  tip: `Hinweis:`,
  notice: `Anmerkung:`,
  welcome: `Willkommen in Ihrem LNDR`,
  noBalanceWarning: `Wir sind gerade nicht in der Lage, Ihren Kontostand zu laden. Bitte versuchen Sie es später noch einmal.`,
  totalBalance: `Gesamtsaldo:`,
  totalBalances: `Geschäftspartner insgesamt:`,
  newTransaction: `Neue Transaktion`,
  needsReview: `Warten auf Genehmigung`,
  owesMe: `Mir schuldet`,
  iOwe: `Ich schulde jemandem`,
  newPassword: `Neues Passwort (mindestens 8 Zeichen)`,
  confirmPassword: `Bestätigen Sie das Passwort`,
  newPin: `Neuer 4-stelliger PIN`,
  enterNewPin: `BITTE GEBEN SIE EINEN NEUEN 4-STELLIGEN PIN EIN`,
  confirmPin: `BITTE BESTÄTIGEN SIE IHREN PIN`,
  newAccount: `Erstellen Sie ein neues Benutzerkonto`,
  loginAccount: `Schalten Sie Ihr Benutzerkonto frei`,
  recoverExistingAccount: `Stellen Sie ein bestehendes Konto wieder her`,
  recoverMnemonic: `Mnemonic (12 Wörter werden angezeigt wenn Sie Ihr Konto erstellt haben)`,
  recoverMnemonicLengthError: `Mnemonic sollte genau 12 Wörter lang sein`,
  successTitle: `Erfolg`,
  errorTitle: `Fehler`,
  showMnemonic: `Zeigen Sie die 12-Wort-Mnemonic`,
  mnemonicExhortation: `Dieser Satz mit 12 Wörtern wird benötigt, um Ihr Konto wiederzuherzustellen. Bitte bewahren Sie ihn sicher und geheim auf.`,
  addressExhortation: `Senden Sie Ethereum zu Ihrer Adresse, so dass Sie Schulden auf Lndr begleichen können`,
  removeAccountTitle: `Sind Sie sicher, dass Sie Ihr Konto von diesem Gerät entfernen möchten?`,
  removeAccountExhortation: `Achten Sie darauf, dass Sie Zugriff auf Ihre Mnemonic haben, um Ihr Konto später wiederherzustellen, da dies eine dauerhafte Entfernung von Ihren Kontoinformationen von diesem Gerät ist.`,
  myAccount: `Mein Konto`,
  setNickname: `Wählen Sie einen Nickname, damit Ihre Freunde Sie suchen können`,
  setEmail: `Wählen Sie eine E-Mail-Adresse, um Informationen über Lndr-Updates zu erhalten`,
  nickname: `Nickname (Kleinbuchstaben & Zahlen)`,
  email: `E-Mail-Addresse`,
  accountManagement: {
    nickname: {
      lengthViolation: `Nickname sollte mindestens 3 Zeichen lang sein.`,
      compositionViolation: `Nickname kann nur Zahlen und Kleinbuchstaben enthalten.`,
      duplicationViolation: `Nickname ist bereits vergeben`,
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
      updateError: `Es gab einen Fehler bei der Aktualisierung Ihrer PIN`,
    },
    mnemonic: {
      lengthViolation: `Die Mnemonic sollte mindestens 12 Wörter lang sein.`,
      unableToValidate: `Die eingegebene Mnemonic war nicht gültig, bitte versuchen Sie es erneut.`,
    },
    setNickname: {
      success: `Ihr Nickname wurde gespeichert.`,
      error: generalCommunicationError
    },
    setEmail: {
      success: `Ihre E-Mail-Adresse wurde gespeichert.`,
      error: generalCommunicationError
    },
    lockTimeout: {
      top: `Sie müssen Ihre PIN eingeben nach`,
      bottom: `Minuten Inaktivität`,
      update: `Aktualisieren`,
      error: `Wir konnten Ihre Kontoeinstellungen nicht aktualisieren`,
      success: `Lock Timeout wurde aktualisiert`,
    },
    addFriend: {
      success: X => `Freundschaftsanfrage an @${X} gesendet`,
      error: generalCommunicationError
    },
    removeFriend: {
      success: X => `von der Freundschaftsliste entfernt: @${X}`,
      error: generalCommunicationError
    },
    loadInformation: {
      error: generalCommunicationError
    },
    ethBalance: {
      display: Y => `Ihr ETH-Kontostand ist ${String (Y) .slice (0,8)}`,
      inFiat: (Z, B, A) => ` (${CUR(A)}${String(Number(Z) * Number(B)).slice(0, 8)})`,
      getError: `Eth-Kontostand kann nicht abgerufen werden`,
      manage: `ETH verwalten`,
    },
    sendEth: {
      error: {
        insufficient: `Die Übertragung ist aufgrund unzureichendem Guthabens fehlgeschlagen`,
        generic: `Es gab einen Fehler bei der Übertragung, bitte versuchen Sie es später noch einmal`,
        address: `Bitte geben Sie eine gültige Adresse ein`,
        amount: `Bitte geben Sie einen Betrag größer als 0 ein`,
        limitExceeded: A => `Sie können nur ${CUR [A]} ${TL [A]} pro Woche senden, wählen Sie bitte einen kleineren Betrag`,
      },
      amount: `Betrag, der gesendet werden soll`,
      address: `Zieladresse (ohne ‚0x‘ Präfix)`,
      transfer: `ETH-Überweisung`,
      transferAll: `Überweisen Sie alles`,
      balance: Y => `Ihr aktueller ETH-Kontostand ist ${typeof Y === 'string'? Y.slice (0,8): ''} `,
      ethAddress: `Ethereum-Adresse`,
      txCost: (B, A) => `Die aktuelle Transaktion kostet ${CUR [A]} ${B}`,
      transferLowercase: `Eth-Überweisung`,
      note: A => `Bitte beachten Sie: Sie können nur ${CUR [A]} ${TL [A]} pro Woche aus Lndr überweisen`,
      warning: (Z, A) => `Sie haben ${CUR [A]} ${Z} übrig von Ihrem ${CUR [A]} ${TL [A]} Limit`,
    },
    sendBcpt: {
      error: {
        insufficient: `Sie haben nicht genug BCPT für diese Transaktion`,
        generic: `Es gab einen Fehler bei der Übertragung, bitte versuchen Sie es später noch einmal`,
      },
      transfer: `Transfer BCPT`,
      address: `Zieladresse (ohne ‚0x‘ Präfix)`,
      balance: Y => `Ihr aktueller BCPT-Kontostand ist ${typeof Y === 'string'? Y.slice (0,8): ''} `,
      bcptAddress: `BCPT-Adresse`,
    },
    changeProfilePic: `Klicken Sie hier, um Änderungen vorzunehmen`,
    addProfilePic: `Verwenden Sie ein Foto von Ihrem Telefon`,
    panelHeaders: [
      `ETH (& BCPT) Adresse`,
      `ETH-Kontostand`,
      `BCPT-Kontostand`,
      `Konto Entfernen`,
      `ETH-Transaktionshistorie`,
      `Hauptwährung ändern`,
      `PIN ändern`,
      `Nickname ändern`,
      `E-Mail-Adresse ändern`,
      `Profilbild ändern`,
      `Lock Timeout ändern`,
      `Mnemonic`,
      `Benachrichtigungen`,
    ],
    viewEtherscan: `Etherscan-Verlauf anschauen`,
    profilePic: {
      change: `Profilbild ändern`,
      setError: `Es gab einen Fehler beim Hochladen Ihres Bilds, bitte versuchen Sie es später noch einmal`,
      getError: `Es gab einen Fehler beim Abrufen Ihres Profilbilds`,
      setSuccess: `Profilbild wurde aktualisiert`,
    },
    logoutSuccess: `Sie haben sich erfolgreich abgemeldet!`,
    logoutError: generalCommunicationError,
  },

  currentBalance: {
    eth: `Ihr aktuelles Eth-Guthaben beträgt:`,
    bcpt: `Ihr aktuelles BCPT-Guthaben beträgt:`,
  },

  welcomeView: {
    by: `GEBAUT VON`,
    makeItEasy: `Lndr macht es leicht, einfache Schulden nachzuverfolgen`,
    weHelpFriends: `Wir helfen Freunden dabei, zusammen zu leben, zu arbeiten und zu spielen.`,
    len: `Len`,
    dot: `.`,
    der: `der`,
    shareDinner: `Teilen Sie Ihr Abendessen`,
    fillTank: `Füllen Sie Ihren Tank`,
    travelTogether: `Verreisen Sie zusammen`,
    runEthereum: `Wir werden mit ETH betrieben!`,
    firstLendingApp: `Das erste mobile Kredit-App, die auf dem Blockchain gesichert ist.`,
    greatConcert: `Sehen Sie ein großes Konzert`,
    youPlayWithFriends: `Sie spielen mit Freunden; und wir haben die Rechnung ...`,
    start: `Legen Sie los`,
  },

  debtManagement: {
    shell: `Neue Transaktion`,
    add: `Schulden hinzufügen`,
    selectFriend: `Wählen`,
    lend: `Neues Darlehen`,
    borrow: `Neue Schulden`,
    iLent: `Ein Freund schuldet mir`,
    iBorrowed: `Ich schulde einem Freund`,
    settleUpLower: `Abrechnen`,
    amountToSettle: `Betrag, der zu begleichen ist`,
    total: `Gesamt`,
    record: `Eintrag`,
    records: `Einträge`,
    chooseCurrency: `Wählen Sie eine Währung`,

    createError: {
      amountTooLow: `Betrag muss größer sein als $ 0`,
      amountTooHigh: `Betrag muss kleiner sein als $ 1000000000`,
      selfAsFriend: `Sie können keine Schulden bei sich selbst machen, wählen Sie einen anderen Freund aus`,
      pending: `Bitte begleichen Sie Ihre ausstehende Transaktion mit diesem Nutzer bevor Sie eine neue eröffnen`,
      insufficientEth: E => `Sie müssen mindestens ${E} ETH haben, um abzurechnen. Gehen Sie zu Einstellungen, um Ihren Kontostand zu ​​sehen`,
    },
    fields: {
      currency: `Währung`,
      amount: `Menge`,
      settlementAmount: `Abrechnungsbetrag`,
      selectFriend: `Freund`,
      memo: `Memo`,
      direction: `Wählen Sie die richtige Aussage`,
    },
    memo: {
      example: `Geben Sie das Memo hier ein`,
    },
    direction: {
      lend: X => `${X} schuldet mir`,
      borrow: X => `Ich schulde ${X}`,
      initiatedLend: X => `${X}, sagt er / sie schuldet`,
      initiatedBorrow: X => `${X} sagt, Sie schulden`,
      pendingLend: X => `@${X} schuldet Ihnen`,
      pendingBorrow: X => `Sie schulden @${X}`,
      pendingLendSettlement: S => `@${S.debtorNickname} fordert eine Abrechnung in ${S.settlementCurrency}`,
      pendingBorrowSettlement: S => `@${S.creditorNickname} möchte mit Ihnen in ${S.settlementCurrency} abrechnen`,
      pendingLendSettlementMe: S => `Sie möchten mit @${S.debtorNickname} in ${S.settlementCurrency} abrechnen`,
      pendingBorrowSettlementMe: S => `Sie haben beantragt, dass @${S.creditorNickname} in ${S.settlementCurrency} abrechnet`,
    },
    pending: {
      success: F => `F => ausstehende Schulden wurden an @${F.nickname} gesendet `,
      error: generalCommunicationError
    },
    pendingParens: `(ausstehend)`,
    confirmation: {
      transaction: CP => `Transaktion mit ${CP} wurde erfolgreich bestätigt`,
      settlement: CP => `Abrechnung mit ${CP} wurde erfolgreich bestätigt`,
      error: `Die Transaktion kann zu diesem Zeitpunkt nicht bestätigt werden, versuchen Sie es bitte später noch einmal`,
    },
    rejection: {
      success: `Transaktion wurde abgelehnt`,
      error: `Die Transaktion kann zu diesem Zeitpunkt nicht abgelehnt werden, versuchen Sie es bitte später noch einmal`,
    },
    balances: {
      error: `Der Kontostand kann zu diesem Zeitpunkt nicht geladen werden, versuchen Sie es bitte später noch einmal`,
    },
    for: M => `für ${M}`,
    settleUp: `Abrechnen`,
    settleTotal: `Gesamtbetrag begleichen`,
    settleUpMemo: (D, A) => `${D === 'leihen' ? 'Abrechnung für ' : 'Anfrage zur Abrechnung für'} ${A}`,
    recordSettleUpMemo: `Abrechnung`,
    balanceByCurrency: `Einzelheiten`,
  },
  settlementManagement: {
    bilateral: {
      error: {
        insufficient: X => `Ihre Abrechnung mit ${X} ist aufgrund unzureichendem Guthabens fehlgeschlagen`,
        generic: X => `Es gab einen Fehler bei der Verarbeitung Ihrer Abrechnung mit ${X}`,
      }
    },
    eth: `Mit ETH begleichen`,
    paypal: `Mit PayPal begleichen`,
    nonPayment: `Eine Abrechnung erfassen`,
  },

  accountViewLanguage: {
    lndr: `L n d r`,
    home: `Home`,
    friends: `Freunde`,
    activity: `Aktivität`,
  },

  notifications: {
    toggleNotifications: `Toggle Benachrichtigungen`,
    enable: `Anschalten`,
    disable: `Abschalten`,
  },

  pendingTransactionsLanguage: {
    shell: `Ausstehende Transaktion`,
    title: `ausstehend`,
    memo: `Memo:`,
    for: `Zum`,
    none: `Sie haben keine ausstehenden Transaktionen`,
    confirmationQuestion: `Sind Sie sicher, dass Sie diese Transaktion bestätigen möchten?`,
    pendingAnnouncement: `Diese Transaktion wartet auf die Bestätigung von der Gegenseite.`,
    bilateral: `Warten bis die Eth-Überweisung abgeschlossen ist`,
    confirm: `Bestätigen`,
    reject: `Transaktion ablehnen`,
    rejectRequest: `Ablehnen`,
    cancel: `Transaktion abbrechen`,
    direction: {
      lend: (X, Z) => `@${X} schuldet Ihnen ${Z}`,
      borrow: (X, Z) => `Sie schulden @${X} ${Z}`,
    }
  },

  pendingSettlementsLanguage: {
    shell: `Abrechnung ausstehend`,
    title: `ausstehend`,
    none: `Sie haben keine ausstehenden Abrechnungen`,
    confirm: `Bestätigen`,
    reject: `Abrechnung ablehnen`,
    cancel: `Abrechnung abbrechen`,
  },

  recentTransactionsLanguage: {
    title: `Abgeschlossen`,
    none: `Sie haben keine abgeschlossenen Transaktionen`,
    direction: {
      lend: (X, Z) => `@${X} schuldet Ihnen ${Z}`,
      borrow: (X, Z) => `Sie schulden @${X} ${Z}`,
    },
    balance: `Kontostand`,
    consolidatedBalance: `Konsolidierte Bilanz`,
    friends: FS => `(von ${FS} ${FS === 1 ? 'Freund': 'Freunde'})`,
  },

  tabs: {
    home: `Home`,
    friends: `Freunde`,
    activity: `Aktivität`,
  },

  confirmation: {
    shell: `Bestätigung`,
    done: `Erledigt`,
    create: {
      start: `Wir haben `,
      end: ` den Eintrag zur Bestätigung geschickt.`,
    },
    confirm: {
      start: `Sie haben diesen Eintrag von `,
      end: ` bestätigt.`,
    },
    reject: {
      start: `Wir haben `,
      end: ` wissen lassen, dass Sie diesen Datensatz abgelehnt haben.`,
    },
    confirmFriend: {
      start: `Sie sind jetzt mit `,
      end: ` befreundet!`,
    },
    rejectFriend: {
      start: `Sie haben die Freundschaftsanfrage von `,
      end: ` abgelehnt.`,
    },
    ethSent: {
      start: `Sie haben erfolgreich `,
      end: ` ETH gesendet und Ihre Transaktion-Hash ist `,
    },
    bcptSent: {
      start: `Sie haben erfolgreich `,
      end: ` BCPT gesendet und Ihre Transaktion-Hash ist `,
    },
    status: `Sie können den Status dieser Transaktion in der `,
    activity: `Aktivität-Registerkarte sehen.`,
  },

  pendingFriendRequestsLanguage: {
    shell: `Freundschaftsanfrage`,
    message: `Freundschaftsanfragen`,
    request: F => `@${F} möchte mit Ihnen befreundet sein!`,
  },

  privacyPolicy: {
    link: `Mit dem Klicken des unten stehenden Feldes bestätigen Sie, dass Sie Blockmason Datenschutzerklärung gelesen haben und damit einverstanden sind. Blockmason kann Ihre E-Mail-Adresse verwenden, um Updates über Blockmason und LNDR zu senden. Hier ist ein Link zu den Datenschutzbestimmungen:`,
    message: `lndr.io/terms/`
  },

  payPalLanguage: {
    connectPayPal: `Schließen Sie PayPal`,
    connectSuccess: `PayPal erfolgreich aktiviert.`,
    disconnectPayPal: `Trennen Sie PayPal`,
    disconnected: `PayPal getrennt.`,
    requestPayPalPayment: `Anfrage PayPal Payment`,
    sendWithPayPal: `Senden Mit PayPal`,
    enablePayPal: `Aktivieren Sie PayPal`,
    requestPayPalPayee: `Fordern Sie PayPal`,
    enablePayPalForFriend: F => `Aktivieren PayPal ermöglicht @${F} sich zu zahlen`,
    friendNotEnabled: F => `@${F} hat PayPal Zahlungen nicht aktiviert`,
    friendRequestedConnect: F => `@${F} möchte Sie über PayPal zahlen`,
    requestFriendConnect: F => `Sie werden gefragt @${F} PayPal zu ermöglichen`,
  }
}
