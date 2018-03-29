import { currencies, transferLimits } from 'language'

const CUR = currencies
const TL = transferLimits

const generalCommunicationError = 'There was a problem communicating with the server, please try again later.'

export default {

  applicationName: `Lndr`,
  helloWorld: `Ciao mondo`,
  submit: `SOTTOSCRIVI`,
  next: `Il prossimo`,
  cancel: `Annulla`,
  back: `Torna indietro`,
  copy: `Copia negli appunti`,
  confirmAccount: `Confermare`,
  createAccount: `Creare un profilo`,
  recoverAccount: `ripristinare conto`,
  removeAccount: `Rimuovi l'account`,
  updateAccount: `Aggiorna account`,
  loginAction: `Sbloccare`,
  enterPin: `Inserire PIN`,
  changePin: `Modifica PIN`,
  enterCurrentPin: `Inserire il PIN attuale`,
  logoutAction: `DISCONNETTERSI`,
  seeAllActivity: `Vedi Tutte le attività`,
  copiedClipboard: `Copiato negli appunti`,
  pleaseWait: `Attendere prego`,
  addFriend: `Aggiungi amico`,
  addFriendConfirmationQuestion: `Sei sicuro di voler aggiungere questo utente come amico?`,
  removeFriend: `Rimuovi amico`,
  currentFriends: `Amici correnti`,
  removeFriendConfirmationQuestion: `Sei sicuro di voler rimuovere questo utente come amico?`,
  inviteFriends: `Invitare amici a Lndr`,
  tryLndr: `Scopri l'App Lndr qui:`,
  friendInfo: `Maggiori informazioni su questa amicizia:`,
  noFriends: `Aggiungete un po 'amici per iniziare!`,
  noMatches: `Nessun utente corrispondente trovato`,
  noBalances: `Non ci sono debiti iscritti`,
  addFriendButton: `Aggiungi amico`,
  alreadyFriendsButton: `Amici`,
  friendShell: `Amico`,
  tip: `Mancia:`,
  notice: `Avviso:`,
  welcome: `Benvenuti nella vostra LNDR`,
  noBalanceWarning: `Non siamo stati in grado di caricare il vostro equilibrio in questo momento, si prega di riprovare più tardi.`,
  totalBalance: `Saldo totale:`,
  totalBalances: `Le controparti totali:`,
  newTransaction: `nuova transazione`,
  needsReview: `bisogni recensione`,
  owesMe: `Mi dovevo`,
  iOwe: `Devo qualcuno`,
  newPassword: `Nuova password (minimo 8 caratteri)`,
  confirmPassword: `conferma password`,
  newPin: `PIN a 4 cifre Nuovo`,
  enterNewPin: `IMPOSTARE UN NUOVO PIN di 4 cifre`,
  confirmPin: `Prego confermano il vostro PIN`,
  newAccount: `Creare un nuovo account`,
  loginAccount: `Sbloccare il tuo account`,
  recoverExistingAccount: `Recuperare un account esistente`,
  recoverMnemonic: `Mnemonic (12 parole visualizzate \ Nwhen hai creato il tuo account)`,
  recoverMnemonicLengthError: `Mnemonico dovrebbe essere esattamente 12 parole`,
  successTitle: `Successo`,
  errorTitle: `Errore`,
  showMnemonic: `Mostra 12-Word Mnemonic`,
  mnemonicExhortation: `Questa frase 12-parola è necessario per ripristinare l'account, conservarla in un luogo sicuro e segreto`,
  addressExhortation: `Invia Ethereum al tuo indirizzo in modo da poter saldare debiti in Lndr`,
  removeAccountTitle: `Sei sicuro di voler rimuovere il tuo account da questo dispositivo?`,
  removeAccountExhortation: `Essere sicuri che si ha accesso al mnemonico per ripristinare il tuo account in seguito, in quanto questo è un rimozione permanente di informazioni sul tuo conto da questo dispositivo.`,
  myAccount: `Il mio account`,
  setNickname: `Impostare un soprannome così i tuoi amici possono cercare per voi`,
  setEmail: `Impostare una e-mail per ricevere informazioni sugli aggiornamenti Lndr`,
  nickname: `Soprannome (minuscolo e numeri)`,
  email: `Indirizzo email`,
  accountManagement: {
    nickname: {
      lengthViolation: `Nickname deve essere di almeno 3 caratteri.`,
      compositionViolation: `Nickname può contenere solo numeri e lettere minuscole.`,
      duplicationViolation: `Nickname è già preso`,
    },
    email: {
      compositionViolation: `formato e-mail non è corretto`,
      duplicationViolation: `E-mail è già stato preso`,
    },
    pin: {
      lengthViolation: `PIN deve essere di almeno 4 caratteri.`,
      matchViolation: `PIN devono corrispondere.`,
      failedHashComparison: `PIN non è valido, si prega di riprovare.`,
      updateSuccess: `Il PIN è stato aggiornato`,
      updateError: `Si è verificato un errore durante l'aggiornamento PIN`,
    },
    mnemonic: {
      lengthViolation: `Mnemonic dovrebbe avere almeno 12 parole.`,
      unableToValidate: `Lo mnemonico inserito non era valido, si prega di riprovare.`,
    },
    setNickname: {
      success: `Il tuo nickname è stato salvato.`,
      error: generalCommunicationError
    },
    setEmail: {
      success: `Il tuo indirizzo email è stato salvato.`,
      error: generalCommunicationError
    },
    lockTimeout: {
      top: `È necessario inserire il codice PIN dopo`,
      bottom: `minuti di inattività`,
      update: `Aggiornare`,
      error: `Siamo stati in grado di aggiornare le impostazioni dell'account`,
      success: `Blocco Timeout Aggiornato`,
    },
    addFriend: {
      success: X => `richiesta di amicizia inviata a @${X}`,
      error: generalCommunicationError
    },
    removeFriend: {
      success: X => `Rimosso da amici: @${X}`,
      error: generalCommunicationError
    },
    loadInformation: {
      error: generalCommunicationError
    },
    ethBalance: {
      display: Y => `Il saldo ETH è ${String(Y).slice(0,8)}`,
      inFiat: (Z, B, A) => ` (${CUR[A]}${String(Number(Z) * Number(B)).slice(0, 8)})`,
      getError: `Impossibile recuperare l'equilibrio Eth`,
      manage: `gestire ETH`,
    },
    sendEth: {
      error: {
        insufficient: `Il trasferimento non è riuscita a causa di fondi insufficienti`,
        generic: `C'è stato un errore con il trasferimento, si prega di riprovare più tardi`,
        address: `Per favore, inserisci un indirizzo valido`,
        amount: `Si prega di inserire una quantità maggiore di 0`,
        limitExceeded: A => `È possibile inviare solo ${CUR [A]} ${TL [A]} a settimana, si prega di selezionare un importo-piccola`,
      },
      amount: `Importo da inviare`,
      address: `Indirizzo di destinazione (senza prefisso '0x')`,
      transfer: `Trasferimento ETH`,
      transferAll: `trasferire tutto`,
      balance: Y => `Il tuo saldo corrente è ETH ${typeof Y === 'string'? Y.slice (0,8): ''} `,
      ethAddress: `Ethereum Indirizzo`,
      txCost: (B, A) => `Il costo transazione corrente è di ${CUR [A]} ${B}`,
      transferLowercase: `Trasferimento Eth`,
      note: A => `Si prega di notare: è possibile trasferire solo ${CUR [A]} ${TL [A]} a settimana fuori Lndr`,
      warning: (Z, A) => `avete ${CUR [A]} ${Z} rimanente della ${CUR [A]} ${TL [A]} limit`,
    },
    sendBcpt: {
      error: {
        insufficient: `Non si dispone di abbastanza BCPT per questa transazione`,
        generic: `C'è stato un errore con il trasferimento, si prega di riprovare più tardi`,
      },
      transfer: `Trasferimento BCPT`,
      address: `Indirizzo di destinazione (senza prefisso '0x')`,
      balance: Y => `Il tuo saldo corrente è BCPT ${typeof Y === 'string' ? Y.slice (0,8): ''} `,
      bcptAddress: `BCPT Indirizzo`,
    },
    changeProfilePic: `Toccare per cambiare`,
    addProfilePic: `Utilizzare Picture da Telefono`,
    panelHeaders: [
      `ETH (& BCPT) Indirizzo`,
      `Equilibrio ETH`,
      `BCPT Balance`,
      `ETH Cronologia delle Transazioni`,
      `Modifica PIN`,
      `Cambio Nickname`,
      `Cambia email`,
      `Cambia immagine del profilo`,
      `Cambio di blocco Timeout`,
      `Mnemonico`,
      `Notifiche`,
    ],
    viewEtherscan: `Visualizza Etherscan Storia`,
    profilePic: {
      change: `Cambia immagine del profilo`,
      setError: `Si è verificato un errore durante il caricamento dell'immagine, riprova più tardi`,
      getError: `Si è verificato un errore durante il recupero tua immagine del profilo`,
      setSuccess: `immagine del profilo aggiornato`,
    },
    logoutSuccess: `Ti sei disconnesso con successo!`,
  },

  currentBalance: {
    eth: `Il tuo saldo Eth corrente è:`,
    bcpt: `Il tuo saldo BCPT corrente è:`,
  },

  welcomeView: {
    by: `COSTRUITO DA`,
    makeItEasy: `Lndr rende facile rintracciare i debiti semplici`,
    weHelpFriends: `Aiutiamo gli amici vivono, lavorano, e giocare insieme.`,
    len: `Len`,
    dot: `.`,
    der: `der`,
    shareDinner: `Condividi Cena`,
    fillTank: `Riempire il serbatoio`,
    travelTogether: `viaggiare insieme`,
    runEthereum: `Corriamo su ETH!`,
    firstLendingApp: `Il primo prestito app mobile fissata sul blockchain.`,
    greatConcert: `Vedere un grande concerto`,
    youPlayWithFriends: `Si gioca con gli amici; \ n Terremo la scheda ...`,
    start: `Iniziare`,
  },

  debtManagement: {
    shell: `nuova transazione`,
    add: `Aggiungere debito`,
    selectFriend: `Selezionare`,
    lend: `nuovo prestito`,
    borrow: `nuovo debito`,
    iLent: `Un amico mi deve`,
    iBorrowed: `Devo un amico`,
    settleUpLower: `saldare i conti`,
    amountToSettle: `Importo da Settle`,
    total: `Totale`,
    record: `disco`,
    records: `record`,
    createError: {
      amountTooLow: `L'importo deve essere maggiore di $ 0`,
      amountTooHigh: `L'importo deve essere inferiore a $ 1.000.000.000 di`,
      selfAsFriend: `Non è possibile creare il debito con te stesso, scegli un altro amico`,
      pending: `Si prega di risolvere il vostro transazione in sospeso con questo utente prima di creare un altro`,
      insufficientEth: E => `Avete bisogno di almeno ${E} ETH a stabilirsi, andare su Impostazioni per vedere il tuo balance`,
    },
    fields: {
      amount: `Quantità`,
      settlementAmount: `Importo di liquidazione`,
      selectFriend: `Amico`,
      memo: `promemoria`,
      direction: `Selezionare l'affermazione corretta`,
    },
    memo: {
      example: `Tipo appunto qui`,
    },
    direction: {
      lend: X => `${X} deve il me`,
      borrow: X => `devo ${X}`,
      initiatedLend: X => `${X} dice che lui / lei owes`,
      initiatedBorrow: X => `${X} dice che owe`,
      pendingLend: X => `@${X} you deve`,
      pendingBorrow: X => `Lo dovete @${X}`,
      pendingLendSettlement: S => `@${S.debtorNickname} richiede un insediamento in ${S.settlementCurrency}`,
      pendingBorrowSettlement: S => `@${S.creditorNickname} vuole stabilirsi con voi in ${S.settlementCurrency}`,
      pendingLendSettlementMe: S => `È stato richiesto di risolvere con @${S.debtorNickname} in ${S.settlementCurrency}`,
      pendingBorrowSettlementMe: S => `È richiesto che @${S.creditorNickname} stabilirsi in ${S.settlementCurrency}`,
    },
    pending: {
      success: F => `In attesa debito sottoposto a @${F.nickname}`,
      error: generalCommunicationError
    },
    pendingParens: `(in attesa di)`,
    confirmation: {
      transaction: CP => `transazione con ${CP} è stata confermata con successo`,
      settlement: CP => `Transazione con ${CP} è stata confermata con successo`,
      error: `In grado di confermare transazione in questo momento, riprova più tardi`,
    },
    rejection: {
      success: `Transazione è stata rifiutata`,
      error: `Impossibile respingere transazione in questo momento, riprova più tardi`,
    },
    balances: {
      error: `Impossibile caricare i saldi in questo momento, riprova più tardi`,
    },
    for: M => `a ${M}`,
    settleUp: `saldare i conti`,
    settleTotal: `Settle totale`,
    settleUpMemo: (D, A) => `${D === 'lend'? 'Assestamento per': 'Richiesta accontentare di'} ${A} `,
    recordSettleUpMemo: `sedimentazione up`,
  },
  settlementManagement: {
    bilateral: {
      error: {
        insufficient: X => `Il vostro accordo con ${X} riuscita a causa di funds insufficiente`,
        generic: X => `Si è verificato un errore durante l'elaborazione vostro insediamento con ${X}`,
      }
    },
    eth: `Settle Con ETH`,
    nonPayment: `Registrare un pagamento`,
  },

  accountViewLanguage: {
    lndr: `L n d r`,
    home: `Casa`,
    friends: `Amici`,
    activity: `Attività`,
  },

  notifications: {
    toggleNotifications: `Toggle Notifiche`,
    enable: `Accendere`,
    disable: `Spegni`,
  },

  pendingTransactionsLanguage: {
    shell: `transazione in sospeso`,
    title: `in attesa di`,
    memo: `Memo:`,
    for: `Per`,
    none: `Non ci sono transazioni in sospeso`,
    confirmationQuestion: `Sei sicuro di voler confermare questa transazione?`,
    pendingAnnouncement: `Questa transazione è in attesa di conferma da parte della controparte.`,
    bilateral: `In attesa di trasferimento Eth per completare`,
    confirm: `Confermare`,
    reject: `Rifiuta di transazione`,
    rejectRequest: `Rifiutare`,
    cancel: `Annulla transazione`,
    direction: {
      lend: (X, Z) => `@${X} si deve ${Z}`,
      borrow: (X, Z) => `ti devo @${X} ${Z}`,
    }
  },

  pendingSettlementsLanguage: {
    shell: `In attesa Settlement`,
    title: `in attesa di`,
    none: `Non ci sono insediamenti in sospeso`,
    confirm: `Confermare`,
    reject: `Rifiuta Settlement`,
    cancel: `Annulla Settlement`,
  },

  recentTransactionsLanguage: {
    title: `Completato`,
    none: `Non ci sono transazioni completate`,
    direction: {
      lend: (X, Z) => `@${X} si deve ${Z}`,
      borrow: (X, Z) => `Lo dovete @${X} ${Z}`
    },
    balance: `Equilibrio`,
    friends: FS => `(da ${FS} ${FS === 1 ? 'amico': 'amici'})`,
  },

  tabs: {
    home: `Casa`,
    friends: `Amici`,
    activity: `Attività`,
  },

  confirmation: {
    shell: `Conferma`,
    done: `Fatto`,
    create: {
      start: `Abbiamo inviato il record verso `,
      end: ` per la conferma.`,
    },
    confirm: {
      start: `Hai confermato questo record dal `,
      end: `.`,
    },
    reject: {
      start: `Abbiamo lasciato `,
      end: ` sa che si ha respinto questo record.`,
    },
    confirmFriend: {
      start: `Tu sei amico di `,
      end: `!`,
    },
    rejectFriend: {
      start: `Hai rifiutato la richiesta di amicizia da `,
      end: `.`,
    },
    ethSent: {
      start: `Hai inviato con successo `,
      end: ` ETH e il vostro hash delle transazioni è `,
    },
    bcptSent: {
      start: `Hai inviato con successo `,
      end: `BCPT e il vostro hash delle transazioni è `,
    },
    status: `È possibile visualizzare lo stato di tale operazione nella `,
    activity: `scheda attività.`,
  },

  pendingFriendRequestsLanguage: {
    shell: `Richiesta di amicizia`,
    message: `Richieste di amicizia`,
    request: F => `${F} vuole essere amici con voi!`,
  }
}
