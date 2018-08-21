import { currencySymbols, transferLimits } from 'lndr/currencies'

const CUR = currencySymbols
const TL = transferLimits

const generalCommunicationError = 'C\'è stato un problema di comunicazione con il server, si prega di riprovare più tardi.'

export default {

  applicationName: `Lndr`,
  helloWorld: `Ciao, mondo`,
  submit: `INVIA`,
  next: `Successivo`,
  cancel: `Annulla`,
  back: `Torna indietro`,
  copy: `Copia negli appunti`,
  confirmAccount: `Conferma`,
  createAccount: `Crea un profilo`,
  recoverAccount: `Ripristina l'account`,
  removeAccount: `Rimuovi l'account`,
  updateAccount: `Aggiorna l'account`,
  loginAction: `Sblocca`,
  enterPin: `Inserisci PIN`,
  changePin: `Modifica PIN`,
  enterCurrentPin: `Inserisci il PIN attuale`,
  logoutAction: `DISCONNETTITI`,
  seeAllActivity: `Vedi tutte le attività`,
  copiedClipboard: `Copiato negli appunti`,
  pleaseWait: `Attendi, per favore`,
  addFriend: `Aggiungi amico`,
  addFriendConfirmationQuestion: `Sei sicuro di voler aggiungere questo utente come amico?`,
  removeFriend: `Rimuovi amico`,
  currentFriends: `Amici correnti`,
  removeFriendConfirmationQuestion: `Sei sicuro di voler rimuovere questo utente come amico?`,
  inviteFriends: `Invita amici a Lndr`,
  tryLndr: `Prova l'App Lndr qui:`,
  friendInfo: `Maggiori informazioni su questa amicizia:`,
  noFriends: `Aggiungi qualche amico per iniziare!`,
  noMatches: `Nessun utente corrispondente trovato`,
  noBalances: `Non hai debiti registrati`,
  addFriendButton: `Aggiungi amico`,
  alreadyFriendsButton: `Amici`,
  friendShell: `Amico`,
  tip: `Suggerimento:`,
  notice: `Avviso:`,
  welcome: `Benvenuto nella tua LNDR`,
  noBalanceWarning: `Non siamo stati in grado di caricare il tuo saldo in questo momento, ti preghiamo di riprovare più tardi.`,
  totalBalance: `Saldo totale:`,
  totalBalances: `Controparti totali:`,
  newTransaction: `Nuova transazione`,
  needsReview: `In attesa di approvazione`,
  owesMe: `Sono debitore`,
  iOwe: `Sono in debito con qualcuno`,
  newPassword: `Nuova password (minimo 8 caratteri)`,
  confirmPassword: `Conferma password`,
  newPin: `Nuovo PIN a 4 cifre`,
  enterNewPin: `IMPOSTARE UN NUOVO PIN da 4 cifre`,
  confirmPin: `PER FAVORE CONFERMA IL TUO PIN`,
  newAccount: `Crea un nuovo account`,
  loginAccount: `Sblocca il tuo account`,
  recoverExistingAccount: `Recupera un account esistente`,
  recoverMnemonic: `Mnemonico (12 parole visualizzate \n quando hai creato il tuo account)`,
  recoverMnemonicLengthError: `Lo mnemonico dovrebbe contenere esattamente 12 parole`,
  successTitle: `Successo`,
  errorTitle: `Errore`,
  showMnemonic: `Mostra mnemonico contenente 12 parole`,
  mnemonicExhortation: `Questa frase lunga 12 parole è necessaria per ripristinare l'account, conservarla in un luogo sicuro e segreto`,
  addressExhortation: `Invia Ethereum al tuo indirizzo in modo da poter saldare debiti su Lndr`,
  removeAccountTitle: `Sei sicuro di voler rimuovere il tuo account da questo dispositivo?`,
  removeAccountExhortation: `Assicurati di aver accesso allo mnemonico per ripristinare il tuo account in seguito, in quanto questa è un rimozione permanente da questo dispositivo delle informazioni sul tuo account.`,
  myAccount: `Il mio account`,
  setNickname: `Imposta un soprannome così i tuoi amici possono cercarti`,
  setEmail: `Imposta una e-mail per ricevere informazioni sugli aggiornamenti Lndr`,
  nickname: `Soprannome (lettere minuscole e cifre)`,
  email: `Indirizzo email`,
  accountManagement: {
    nickname: {
      lengthViolation: `Il soprannome deve contenere almeno 3 caratteri.`,
      compositionViolation: `Il soprannome può contenere solo cifre e lettere minuscole.`,
      duplicationViolation: `Soprannome già in uso`,
    },
    email: {
      compositionViolation: `Formato e-mail non corretto`,
      duplicationViolation: `E-mail già in uso`,
    },
    pin: {
      lengthViolation: `Il PIN deve essere di almeno 4 caratteri.`,
      matchViolation: `I codici PIN devono corrispondere.`,
      failedHashComparison: `PIN non valido, si prega di riprovare.`,
      updateSuccess: `Il PIN è stato aggiornato`,
      updateError: `Si è verificato un errore durante l'aggiornamento del PIN`,
    },
    mnemonic: {
      lengthViolation: `Lo mnemonico dovrebbe avere almeno 12 parole.`,
      unableToValidate: `Lo mnemonico inserito non è valido, si prega di riprovare.`,
    },
    setNickname: {
      success: `Il tuo soprannome è stato salvato.`,
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
      error: `Non siamo stati in grado di aggiornare le impostazioni dell'account`,
      success: `Timeout di blocco aggiornato`,
    },
    addFriend: {
      success: X => `Richiesta di amicizia inviata a @${X}`,
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
      getError: `Impossibile recuperare il saldo Eth`,
      manage: `Gestire ETH`,
    },
    sendEth: {
      error: {
        insufficient: `Non si dispone di abbastanza ETH per questa transazione`,
        generic: `C'è stato un errore con il trasferimento, si prega di riprovare più tardi`,
        address: `Per favore, inserisci un indirizzo valido`,
        amount: `Si prega di inserire un importo maggiore di 0`,
        limitExceeded: A => `È possibile inviare solo ${CUR(A)}${TL(A)} a settimana, si prega di selezionare un importo minore`,
      },
      amount: `Importo da inviare`,
      address: `Indirizzo di destinazione (senza il prefisso '0x')`,
      transfer: `Trasferimento ETH`,
      transferAll: `Trasferire tutto`,
      balance: Y => `Il tuo saldo corrente è ETH ${typeof Y === 'string'? Y.slice (0,8): ''} `,
      ethAddress: `Indirizzo Ethereum`,
      txCost: (B, A) => `Il costo della transazione corrente è di ${CUR(A)} ${B}`,
      transferLowercase: `Trasferimento Eth`,
      note: A => `Si prega di notare: è possibile trasferire solo ${CUR(A)}${TL(A)} a settimana fuori Lndr`,
      warning: (Z, A) => `Ti sono rimasti ${CUR(A)}${Z} del tuo limite ${CUR(A)}${TL(A)}`,
    },
    sendBcpt: {
      error: {
        insufficient: `Non si dispone di abbastanza BCPT per questa transazione`,
        generic: `C'è stato un errore con il trasferimento, si prega di riprovare più tardi`,
      },
      transfer: `Trasferimento BCPT`,
      address: `Indirizzo di destinazione (senza il prefisso '0x')`,
      balance: Y => `Il tuo saldo corrente è ${typeof Y === 'string' ? Y.slice(0,8) :''}`,
      bcptAddress: `Indirizzo BCPT`,
    },
    panelHeaders: [
      `Indirizzo ETH (& BCPT)`,
      `Saldo ETH`,
      `Saldo BCPT`,
      `Rimuovi l'account`,
      `Cronologia delle Transazioni ETH`,
      `Abilita PayPal`,
      `Cambia primario valuta`,
      `Modifica PIN`,
      `Cambia email`,
      `Timeout blocco modifiche`,
      `Mnemonico`,
      `notifiche`,
    ],
    viewEtherscan: `Visualizza storico Etherscan`,
    profilePic: {
      change: `Cambia immagine del profilo`,
      setError: `Si è verificato un errore durante il caricamento dell'immagine, riprova più tardi`,
      getError: `Si è verificato un errore durante il recupero della tua immagine del profilo`,
      setSuccess: `Immagine del profilo aggiornata`,
    },
    logoutSuccess: `Ti sei disconnesso con successo!`,
    logoutError: generalCommunicationError,
  },

  currentBalance: {
    eth: `Il tuo saldo Eth corrente è:`,
    bcpt: `Il tuo saldo BCPT corrente è:`,
  },

  welcomeView: {
    by: `REALIZZATO DA`,
    makeItEasy: `Lndr rende facile rintracciare i debiti semplici`,
    weHelpFriends: `Aiutiamo gli amici a vivere, lavorare e giocare insieme.`,
    len: `Len`,
    dot: `.`,
    der: `der`,
    shareDinner: `Condividi Cena`,
    fillTank: `Riempire il serbatoio`,
    travelTogether: `Viaggiare insieme`,
    runEthereum: `Funzioniamo con ETH!`,
    firstLendingApp: `La prima app di prestito mobile protetta sulla blockchain`,
    greatConcert: `Vedere un grande concerto`,
    youPlayWithFriends: `Tu giochi con gli amici;\n noi terremo sotto controllo...`,
    start: `Iniziare`,
  },

  debtManagement: {
    shell: `Nuova transazione`,
    add: `Aggiungere debito`,
    selectFriend: `Selezionare`,
    lend: `Nuovo prestito`,
    borrow: `Nuovo debito`,
    iLent: `Un amico mi deve`,
    iBorrowed: `Devo a un amico`,
    settleUpLower: `Saldare i debiti`,
    amountToSettle: `Importo da saldare`,
    total: `Totale`,
    record: `registro`,
    records: `registri`,
    chooseCurrency: `Scegli una valuta`,

    createError: {
      amountTooLow: `L'importo deve essere superiore a $0`,
      amountTooHigh: `L'importo deve essere inferiore a $1.000.000.000`,
      selfAsFriend: `Non è possibile creare il debito con te stesso, scegli un altro amico`,
      pending: `Si prega di completare le tue transazioni in sospeso con questo utente prima di crearne un'altra`,
      insufficientEth: E => `Hai bisogno di almeno ${E} ETH per saldare il debito, vai in Impostazioni per visualizzare il tuo saldo`,
    },
    fields: {
      currency: `Valuta`,
      amount: `Importo`,
      settlementAmount: `Importo da saldare`,
      selectFriend: `Amico`,
      memo: `Promemoria`,
      direction: `Selezionare la dichiarazione corretta`,
    },
    memo: {
      example: `Scrivi qui il promemoria`,
    },
    direction: {
      lend: X => `${X} mi deve`,
      borrow: X => `devo ${X}`,
      initiatedLend: X => `${X} dice che ti deve`,
      initiatedBorrow: X => `${X} dice che gli devi`,
      pendingLend: X => `@${X} ti deve`,
      pendingBorrow: X => `Devi@${X}`,
      pendingLendSettlement: S => `@${S.debtorNickname} vuole un pagamento in ${S.settlementCurrency}`,
      pendingBorrowSettlement: S => `@${S.creditorNickname} vuole saldare un debito con te in ${S.settlementCurrency}`,
      pendingLendSettlementMe: S => `Hai richiesto di saldare un debito con @${S.debtorNickname} in ${S.settlementCurrency}`,
      pendingBorrowSettlementMe: S => `Hai richiesto che @${S.creditorNickname} saldi il debito in ${S.settlementCurrency}`,
    },
    pending: {
      success: F => `Debito in sospeso inviato a @${F.nickname}`,
      error: generalCommunicationError
    },
    pendingParens: `(in sospeso)`,
    confirmation: {
      transaction: CP => `La transazione con ${CP} è stata confermata con successo`,
      settlement: CP => `La transazione con ${CP} è stata confermata con successo`,
      error: `Non è possibile confermare la transazione in questo momento, riprova più tardi`,
    },
    rejection: {
      success: `La transazione è stata rifiutata`,
      error: `Impossibile rifiutare la transazione in questo momento, riprova più tardi`,
    },
    balances: {
      error: `Impossibile caricare i saldi in questo momento, riprova più tardi`,
    },
    for: M => `a ${M}`,
    settleUp: `Saldare un debito`,
    settleTotal: `Totale debito da saldare`,
    settleUpMemo: (D, A) => `${D === 'lend'? 'Saldare debito per': 'Richiesta di pagamento di'} ${A} `,
    recordSettleUpMemo: `Salda debito`,
    balanceByCurrency: `Dettagli`,
  },
  settlementManagement: {
    bilateral: {
      error: {
        insufficient: X => `La tua transazione con ${X} non è riuscita a causa di fondi insufficienti`,
        generic: X => `Si è verificato un errore durante l'elaborazione della transazione con ${X}`,
      }
    },
    eth: `Salda debito con ETH`,
    paypal: `Salda debito con PayPal`,
    nonPayment: `Registrare un pagamento`,
  },

  accountViewLanguage: {
    lndr: `L n d r`,
    home: `Home`,
    friends: `Amici`,
    activity: `Attività`,
  },

  notifications: {
    toggleNotifications: `Attiva/Disattiva le notifiche`,
    enable: `Attiva`,
    disable: `Disattiva`,
  },

  pendingTransactionsLanguage: {
    shell: `Transazione in sospeso`,
    title: `In sospeso`,
    memo: `Memo:`,
    for: `Per`,
    none: `Non ci sono transazioni in sospeso`,
    confirmationQuestion: `Sei sicuro di voler confermare questa transazione?`,
    pendingAnnouncement: `Questa transazione è in attesa di conferma da parte della controparte.`,
    bilateral: `In attesa del completamento del trasferimento Eth`,
    confirm: `Confermare`,
    reject: `Rifiuta la transazione`,
    rejectRequest: `Rifiutare`,
    cancel: `Annulla transazione`,
    direction: {
      lend: (X, Z) => `Devi @${X} ${Z}`,
      borrow: (X, Z) => `Devi @${X} ${Z}`,
    }
  },

  pendingSettlementsLanguage: {
    shell: `Pagamento in sospeso`,
    title: `In sospeso`,
    none: `Non ci sono pagamenti in sospeso`,
    confirm: `Confermare`,
    reject: `Rifiuta pagamento`,
    cancel: `Annulla pagamento`,
  },

  recentTransactionsLanguage: {
    title: `Completato`,
    none: `Non ci sono transazioni completate`,
    direction: {
      lend: (X, Z) => `@${X} ti deve ${Z}`,
      borrow: (X, Z) => `Devi @${X} ${Z}`
    },
    balance: `Saldo`,
    consolidatedBalance: `Saldo`,
    friends: FS => `(da ${FS} ${FS === 1 ? 'friend' :'friends'})`,
  },

  tabs: {
    home: `Home `,
    friends: `   Amici   `,
    activity: `Attività`,
  },

  confirmation: {
    shell: `Conferma`,
    done: `Fatto`,
    create: {
      start: `Abbiamo inviato il documento a `,
      end: ` per la conferma.`,
    },
    confirm: {
      start: `Hai confermato questo archivio da `,
      end: `.`,
    },
    reject: {
      start: `Abbiamo fatto sapere a `,
      end: `che hai rifiutato questo archivio.`,
    },
    confirmFriend: {
      start: `Ora tu e `,
      end: ` siete amici!`,
    },
    rejectFriend: {
      start: `Hai rifiutato la richiesta di amicizia da `,
      end: `.`,
    },
    rejectOutboundFriendRequest: {
      start: `Hai annullato la richiesta di amicizia di `,
      end: `.`,
    },
    ethSent: {
      start: `Hai inviato con successo `,
      end: ` ETH e l'hash per la transazione è `,
    },
    bcptSent: {
      start: `Hai inviato con successo `,
      end: ` BCPT e l'hash per la transazione è `,
    },
    requestPayPalPayee: {
      start: `Abbiamo lasciato `,
      end: ` sa che si vorrebbe risolvere con PayPal.`,
    },
    requestPayPalPayment: {
      start: `Abbiamo lasciato `,
      end: ` sapere che desideri essere pagato con PayPal.`,
    },
    settledWithPayPal: {
      start: `Abbiamo lasciato `,
      end: ` sapere che hai sistemato con PayPal.`,
    },
    status: `È possibile visualizzare lo stato di tale operazione nella `,
    activity: `scheda attività.`,
  },

  pendingFriendRequestsLanguage: {
    shell: `Richiesta di amicizia`,
    message: `Richieste di amicizia`,
    request: F => `@${F} vuole essere tuo amico!`,
    outbound: F => `È inviato una richiesta di amicizia a @${F}`,
  },

  privacyPolicy: {
    link: `lndr.io/terms/`,
    message: `Cliccando sotto confermi di aver letto e accettato l'informativa sulla privacy di Blockmason. Blockmason può usare il tuo indirizzo e-mail per inviare aggiornamenti su Blockmason e LNDR. Ecco un link all'informativa sulla privacy:`
  },

  payPalLanguage: {
    connectPayPal: `Collegare PayPal`,
    connectSuccess: `PayPal attivato con successo.`,
    disconnectPayPal: `Scollegare PayPal`,
    disconnected: `PayPal scollegato.`,
    requestPayPalPayment: `Richiesta PayPal Payment`,
    sendWithPayPal: `Invia Con PayPal`,
    enablePayPal: `Abilita PayPal`,
    requestPayPalPayee: `Richiedi PayPal`,
    enablePayPalForFriend: F => `Attivazione di PayPal permette @${F} a pagare you.`,
    friendNotEnabled: F => `@${F} non ha abilitato PayPal pagamenti.`,
    friendRequestedConnect: F => `@${F} vuole pagare tramite PayPal`,
    requestFriendConnect: F => `È chiesto @${F} per abilitare PayPal`,
    feesNotification: `Non include tasse di PayPal`,
    feesInformationHeader: `PayPal Tasse Informazioni`,
    feesInformation: `1. Il tuo conto PayPal deve essere legato a un conto bancario.
    
2. A pagamento in una valuta diversa da quella della vostra banca incorrerà in una tassa di $ 0,35.
    
3. spese di trasferimento internazionali:
    USA a Canada / Europa: $ 2.99
    USA a altrove: $ 4.99
    
4. Queste spese non sono complete. Per le informazioni più aggiornate visitare il sito:

    https://www.paypal.com/us/webapps/mpp/paypal-fees#sending-us`,
    payPalSite: `PayPal.com`,
  }
}
