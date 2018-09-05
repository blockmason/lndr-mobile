import { currencySymbols, transferLimits } from 'lndr/currencies'

const CUR = currencySymbols
const TL = transferLimits

const generalCommunicationError = 'Det uppstod ett problem med anslutningen till servern, vänligen försök igen senare.'

export default {

  applicationName: `Lndr`,
  helloWorld: `Hej världen`,
  submit: `SKICKA`,
  next: `Nästa`,
  cancel: `Avbryt`,
  back: `Gå tillbaka`,
  copy: `Kopiera till Urklipp`,
  confirmAccount: `Bekräfta`,
  createAccount: `Skapa konto`,
  recoverAccount: `Återställ konto`,
  removeAccount: `Ta bort konto`,
  updateAccount: `Uppdatera konto`,
  loginAction: `Lås upp`,
  enterPin: `VAR VÄNLIG ANGE DIN PIN-KOD`,
  changePin: `Ändra PIN-kod`,
  enterCurrentPin: `Ange nuvarande PIN-kod`,
  logoutAction: `LOGGA UT`,
  seeAllActivity: `Se all aktivitet`,
  copiedClipboard: `Kopierad till Urklipp`,
  pleaseWait: `Vänligen vänta`,
  addFriend: `Lägg till vän`,
  addFriendConfirmationQuestion: `Är du säker på att du vill lägga till den här användaren som vän?`,
  removeFriend: `Ta bort vän`,
  currentFriends: `Nuvarande vänner`,
  removeFriendConfirmationQuestion: `Är du säker på att du vill ta bort den här användaren som vän?`,
  inviteFriends: `Bjud in vänner till Lndr`,
  tryLndr: `Testa Lndr-appen här:`,
  friendInfo: `Mer information om denna vänskap:`,
  noFriends: `Lägg till några vänner för att komma igång!`,
  noMatches: `Inga matchande användare hittades`,
  noBalances: `Du har inga registrerade skulder`,
  addFriendButton: `Lägg till vän`,
  alreadyFriendsButton: `Vänner`,
  friendShell: `Vän`,
  tip: `Tips:`,
  notice: `Meddelande:`,
  welcome: `Välkommen till ditt LNDR`,
  noBalanceWarning: `Vi kunde inte uppdatera ditt saldo just nu, försök igen senare.`,
  totalBalance: `Totalt saldo:`,
  totalBalances: `Totalt antal vänner:`,
  newTransaction: `Ny transaktion`,
  needsReview: `Väntar på godkännande`,
  owesMe: `Någon är skyldig mig`,
  iOwe: `Jag är skyldig någon`,
  newPassword: `Nytt lösenord (minst 8 tecken)`,
  confirmPassword: `Bekräfta lösenord`,
  newPin: `Ny 4-siffrig PIN-kod`,
  enterNewPin: `VÄNLIGEN ANGE EN NY 4-SIFFRIG PIN-KOD`,
  confirmPin: `VÄNLIGEN BEKRÄFTA DIN PIN-KOD`,
  newAccount: `Skapa ett nytt konto`,
  loginAccount: `Lås upp ditt konto`,
  recoverExistingAccount: `Återställ ett befintligt konto`,
  recoverMnemonic: `Minneskod (12 ord som visades när du skapade ditt konto)`,
  recoverMnemonicLengthError: `Minneskoden bör vara exakt 12 ord`,
  successTitle: `Godkänt`,
  errorTitle: `Felaktigt`,
  showMnemonic: `Visa 12-ords minneskod`,
  mnemonicExhortation: `Denna 12-ords minneskod krävs för att återställa ditt konto, vänligen förvarara det på ett säkert och hemligt ställe`,
  addressExhortation: `Skicka Ethereum till din Ethereum-adress så att du kan betala på Lndr`,
  removeAccountTitle: `Är du säker på att du vill ta bort ditt konto från den här enheten?`,
  removeAccountExhortation: `Se till att du har tillgång till din minneskod för att kunna återställa ditt konto senare, eftersom detta permanent kommer ta bort dina kontouppgifter från den här enheten.`,
  myAccount: `Mitt konto`,
  setNickname: `Ange ett smeknamn så att dina vänner kan söka efter dig`,
  setEmail: `Ange en e-post för att ta emot information om uppdateringar från Lndr`,
  nickname: `Användarnamn (små bokstäver & siffror)`,
  email: `E-postadress`,
  accountManagement: {
    nickname: {
      lengthViolation: `Användarnamnet ska vara minst 3 tecken.`,
      compositionViolation: `Användarnamnet kan bara innehålla siffror och små bokstäver.`,
      duplicationViolation: `Användarnamnet är upptaget`,
    },
    email: {
      compositionViolation: `E-postadressen har ett felaktigt format`,
      duplicationViolation: `E-postadressen är upptagen`,
    },
    pin: {
      lengthViolation: `PIN-koden ska vara minst 4 tecken.`,
      matchViolation: `PIN-koderna överenstämmer ej.`,
      failedHashComparison: `PIN-koden är ogiltig, försök igen.`,
      updateSuccess: `Din PIN-kod har uppdaterats`,
      updateError: `Det gick inte att uppdatera din PIN-kod`,
    },
    mnemonic: {
      lengthViolation: `Minneskoden bör ha minst 12 ord.`,
      unableToValidate: `Det angivna minneskoden var inte giltigt, försök igen.`,
    },
    setNickname: {
      success: `Din användarnamn har sparats.`,
      error: generalCommunicationError
    },
    setEmail: {
      success: `Din e-post har sparats.`,
      error: generalCommunicationError
    },
    lockTimeout: {
      top: `Du måste ange din PIN-kod efter`,
      bottom: `antal inaktiva minuter`,
      update: `Uppdatering`,
      error: `Det gick inte att uppdatera dina kontoinställningar`,
      success: `Automatisk utloggning uppdaterad`,
    },
    addFriend: {
      success: X => `Vänförfrågan skickad till @${X}`,
      error: generalCommunicationError
    },
    removeFriend: {
      success: X => `Borttagen från vänner: @${X} `,
      error: generalCommunicationError
    },
    loadInformation: {
      error: generalCommunicationError
    },
    ethBalance: {
      display: Y => `Ditt ETH saldo är ${String (Y) .slice (0,8)} `,
      getError: `Det gick inte att inhämta Eth saldo`,
      manage: `Hantera ETH`,
    },
    sendEth: {
      error: {
        insufficient: `Du har inte tillräckligt ETH för denna transaktion`,
        generic: `Det uppstod ett fel med överföringen, vänligen försök igen senare`,
        address: `Ange en giltig Etherum-adress`,
        amount: `Ange ett belopp större än 0`,
        limitExceeded: A => `Du kan endast skicka ${CUR(A)} ${TL(A)} per vecka, välj en mindre summa`,
      },
      amount: `Belopp att skicka`,
      address: `Mottagaradress (utan '0x' prefixet)`,
      transfer: `Överför ETH`,
      transferAll: `Överför allt`,
      balance: Y => `Ditt aktuella ETH saldo är ${typeof Y === 'string' ? Y.slice (0,8): ''} `,
      ethAddress: `Ethereum Adress`,
      txCost: (B, A) => `Den aktuella transaktionskostnaden är ${CUR(A)} ${B}`,
      transferLowercase: `Överför Eth`,
      note: A => `Observera: Du kan endast överföra ${CUR(A)} ${TL(A)} per vecka från Lndr`,
      warning: (Z, A) => `Du har ${CUR(A)} ${Z} återstående av din ${CUR(A)} ${TL(A)} gräns`,
    },
    sendBcpt: {
      error: {
        insufficient: `Du har inte tillräckligt BCPT för denna transaktion`,
        generic: `Det uppstod ett fel med överföringen, vänligen försök igen senare`,
      },
      transfer: `Överför BCPT`,
      address: `Mottagaradress (utan '0x' prefixet)`,
      balance: Y => `Ditt aktuella BCPT saldo är ${typeof Y === 'string'? Y.slice (0,8): ''} `,
      bcptAddress: `BCPT Adress`,
    },
    panelHeaders: [
      `ETH (& BCPT) Adress`,
      `ETH Saldo`,
      `BCPT Saldo`,
      `Ta bort konto`,
      `ETH Transaktionshistorik`,
      `Aktivera PayPal`,
      `Ändra primära valuta`,
      `Ändra PIN-kod`,
      `Ändra e-mail`,
      `Ändra Automatisk Utloggning`,
      `Minneskod`,
      `Aviseringar`,
    ],
    viewEtherscan: `Visa Etherscan historik`,
    profilePic: {
      change: `Byt profilbild`,
      setError: `Det gick inte att ladda upp din bild, vänligen försök igen senare`,
      getError: `Det gick inte att hämta din profilbild`,
      setSuccess: `Profilbild uppdaterad`,
    },
    logoutSuccess: `Du har loggat ut!`,
    logoutError: generalCommunicationError,
  },

  currentBalance: {
    eth: `Ditt nuvarande Eth saldo är:`,
    bcpt: `Din nuvarande BCPT saldo är:`,
  },

  welcomeView: {
    by: `SKAPAD AV`,
    makeItEasy: `Lndr gör det lätt att spåra enkla skulder`,
    weHelpFriends: `Vi hjälper vänner att leva, arbeta och spela tillsammans.`,
    len: `Len`,
    dot: `.`,
    der: `der`,
    shareDinner: `Dela Middag`,
    fillTank: `Fyll din tank`,
    travelTogether: `Res tillsammans`,
    runEthereum: `Vi kör på ETH!`,
    firstLendingApp: `Den första mobila utlåningsappen säkerställd på blockchain.`,
    greatConcert: `Se en Mäktig Konsert`,
    youPlayWithFriends: `Om du spelar med vänner så behåller vi notan ...`,
    start: `Komma igång`,
  },

  walkthrough: {
    skip: `hoppa`,
    continue: `fortsätta`,
    step1: {
      easyToUse: `Lndr är det enklaste sättet att dela räkningar, dela kostnader och reglera enkla skulder med vänner och familj, allt gjort säkert på blockchain.`,
      len: `Len`,
      der: `der`,
    },
    step2: {
      getStarted: `För att komma igång med Lndr, måste du lägga till en vän.`,
      friendsScreen: `Besök Friends skärmen för att söka efter, lägga till eller bjuda in dina vänner och familj för att ansluta på Lndr.`,
    },
    step3: {
      title: `Spela in ett transaktions`,
      easy: `Dela en faktura eller lägga en skuld med en vän är lätt i Lndr!`,
      selectFriend: `Välj din vän, din valuta och summa.`,
      addMemo: `Lägg till några anteckningar i Memo rutan och klicka på Skicka.`,
    },
    step4: {
      title: `Betala skuld`,
      ready: `Redo att betala skuld?`,
      payPal: `När det är dags att lösa upp med Lndr \n- kan du välja PayPal:`,
      ether: `- cryptocurrencies som eter:`,
      cash: `- eller helt enkelt spela in en kontantavräkning:`,
      positiveBalance: `10,46`,
    },
    step5: {
      title: `Flera valutor`,
      multiCurrency: `Lndr kan hålla koll på dina transaktioner, även om de råkar i olika valutor.`,
      exchangeRate: `När du väljer att Settle med din vän, kommer alla transaktioner omvandlas till din primära valuta med hjälp av de mest up-to-date växelkurser tillgängliga.`,
      start: `Börja använda Lndr!`,
    }
  },

  debtManagement: {
    shell: `Ny transaktion`,
    add: `Lägg till skuld`,
    selectFriend: `Välj`,
    lend: `Nytt lån`,
    borrow: `Ny skuld`,
    owesMe: `Skyldig mig`,
    iOwe: `Jag är skyldig`,
    iLent: `En vän är skyldig mig`,
    iBorrowed: `Jag är skyldig en vän`,
    settleUpLower: `Betala skuld`,
    amountToSettle: `Belopp att betala`,
    total: `Totalt`,
    record: `Uppgift`,
    records: `Uppgifter`,
    chooseCurrency: `Välj en valuta`,
    
    createError: {
      amountTooLow: `Beloppet måste vara större än $ 0`,
      amountTooHigh: `Beloppet måste vara mindre än $ 1000000000`,
      selfAsFriend: `Du kan inte skapa en skuld med dig själv, välj en annan vän`,
      pending: `Vänligen lös din väntande transaktion med denna användare innan du skapar en ny`,
      insufficientEth: E => `Du behöver minst ${E} ETH för att kunna betala gå till Inställningar för att se ditt saldo:`,
    },
    fields: {
      currency: `Valuta`,
      amount: `Belopp`,
      settlementAmount: `Betalningsbelopp`,
      selectFriend: `Vän`,
      memo: `Minnesanteckning`,
      direction: `Välj rätt påstående`,
    },
    memo: {
      example: `Skriv minnesanteckning här`,
    },
    direction: {
      lend: X => `${X} är skyldig mig`,
      borrow: X => `Jag är skyldig ${X}`,
      initiatedLend: X => `${X} säger att han / hon är skyldig`,
      initiatedBorrow: X => `${X} säger att du är skyldig`,
      pendingLend: X => `@${X} är skyldig dig`,
      pendingBorrow: X => `Du är skyldig @${X} `,
      pendingLendSettlement: S => `@${S.debtorNickname} begär en betalning i ${S.settlementCurrency}`,
      pendingBorrowSettlement: S => `@${S.creditorNickname} vill betala dig i ${S.settlementCurrency}`,
      pendingLendSettlementMe: S => `Du har begärt att betala @${S.debtorNickname} i ${S.settlementCurrency} `,
      pendingBorrowSettlementMe: S => `Du har begärt att @${S.creditorNickname} betalar i ${S.settlementCurrency} `,
    },
    pending: {
      success: F => `Avvaktande skuld skickad till @${F.nickname} `,
      error: generalCommunicationError
    },
    pendingParens: `(väntande)`,
    confirmation: {
      transaction: CP => `En transaktion med ${CP} har framgångsrikt bekräftats`,
      settlement: CP => `En betalning med ${CP} har framgångsrikt bekräftats`,
      error: `Det går inte att bekräfta transaktionen just nu, vänligen försök igen senare`,
    },
    rejection: {
      success: `Transaktionen har avvisats`,
      error: `Det går inte att avvisa transaktionen just nu, vänligen försök igen senare`,
    },
    balances: {
      error: `Det går inte att ladda saldo just nu, vänligen försök igen senare`,
    },
    for: M => `för ${M} `,
    settleUp: `Betala skuld`,
    settleTotal: `Betala allt`,
    settleUpMemo: (D, A) => `${D === 'lend' ? 'Betala': 'Begäran om att komma överens om'} ${A} `,
    recordSettleUpMemo: `Betala`,
    balanceByCurrency: `Detaljer`,
  },
  settlementManagement: {
    bilateral: {
      error: {
        insufficient: X => `Din betalning med ${X} misslyckades på grund av otillräcklig medel`,
        generic: X => `Det uppstod ett fel med betalningen i ${X} `,
      }
    },
    eth: `Betala genom ETH`,
    paypal: `Betala genom PayPal`,
    nonPayment: `Registrera betalning`,
  },

  accountViewLanguage: {
    lndr: `Ln d r`,
    home: `Hem`,
    friends: `Vänner`,
    activity: `Aktivitet`,
  },

  notifications: {
    toggleNotifications: `Växla Aviseringar`,
    enable: `Sätta på`,
    disable: `Stänga av`,
  },

  pendingTransactionsLanguage: {
    shell: `Väntande transaktion`,
    title: `Väntande`,
    memo: `Minnesanteckning`,
    for: `För`,
    none: `Du har inga väntande transaktioner`,
    confirmationQuestion: `Är du säker på att du vill godkänna denna transaktion?`,
    pendingAnnouncement: `Transaktionen väntar på godkännande av den andra parten.`,
    bilateral: `Väntar på Eth överföring för att slutföra`,
    confirm: `Bekräfta`,
    reject: `Avvisa transaktion`,
    rejectRequest: `Avvisa`,
    cancel: `Avbryt transaktion`,
    direction: {
      lend: (X, Z) => `@${X} är skyldig dig ${Z}`,
      borrow: (X, Z) => `Du är skyldig @${X} ${Z}`,
    }
  },

  pendingSettlementsLanguage: {
    shell: `Avvaktande betalning`,
    title: `Avvaktan`,
    none: `Du har inga avvaktande betalningar`,
    confirm: `Bekräfta`,
    reject: `Avvisa betalning`,
    cancel: `Avbryt betalning`,
  },

  recentTransactionsLanguage: {
    title: `Avslutad`,
    none: `Du har inga genomförda transaktioner`,
    direction: {
      lend: (X, Z) => `@${X} är skyldig dig ${Z}`,
      borrow: (X, Z) => `Du är skyldig @${X} ${Z}`,
    },
    balance: `Saldo`,
    consolidatedBalance: `Saldo`,
    friends: FS => `(från ${FS} ${FS === 1 ? 'vän': 'vänner'})`,
  },

  tabs: {
    home: `Hem `,
    friends: `    Vänner  `,
    activity: `Aktivitet`,
  },

  confirmation: {
    shell: `Bekräftelse`,
    done: `Klar`,
    create: {
      start: `Vi har skickat uppgifterna till `,
      end: ` för bekräftelse.`,
    },
    confirm: {
      start: `Du har bekräftat denna uppgift från `,
      end: `.`,
    },
    reject: {
      start: `Vi har låtit `,
      end: ` vet att du avvisade denna uppgift.`,
    },
    confirmFriend: {
      start: `Du är nu vän med `,
      end: `!`,
    },
    rejectFriend: {
      start: `Du har avböjt vänförfrågan från `,
      end: `.`,
    },
    rejectOutboundFriendRequest: {
      start: `Du har avbrutit vänförfrågan till `,
      end: `.`,
    },
    ethSent: {
      start: `Du har framgångsrikt skickat `,
      end: ` ETH och din transaktionshash är `,
    },
    bcptSent: {
      start: `Du har framgångsrikt skickat `,
      end: ` BCPT och din transaktionshash är `,
    },
    requestPayPalPayee: {
      start: `Vi har låtit `,
      end: ` vet att du vill nöja sig med PayPal.`,
    },
    requestPayPalPayment: {
      start: `Vi har låtit `,
      end: ` vet att du vill att betala med PayPal.`,
    },
    settledWithPayPal: {
      start: `Vi har låtit `,
      end: ` veta att du har fast med PayPal.`,
    },
    status: `Du kan se status för denna `,
    activity: `transaktion på aktivitetsfliken.`,
  },

  pendingFriendRequestsLanguage: {
    shell: `Vänförfrågan`,
    message: `Vänförfrågningar`,
    request: F => `@${F} vill vara vän med dig!`,
    outbound: F => `Du skickade en vänförfrågan till @${F} `,
  },

  privacyPolicy: {
    link: `lndr.io/terms/`,
    message: `Genom att klicka nedan bekräftar du att du har läst och godkänt Blockmason sekretesspolicy. Blockmason kan använda din e-postadress för att skicka uppdateringar om Blockmason och LNDR. Här är en länk till sekretesspolicy:`
  },

  payPalLanguage: {
    connectPayPal: `Anslut PayPal`,
    connectSuccess: `PayPal aktiverat framgångsrikt.`,
    disconnectPayPal: `Koppla PayPal`,
    disconnected: `PayPal kopplad.`,
    requestPayPalPayment: `Begär PayPal Payment`,
    sendWithPayPal: `Skicka med PayPal`,
    enablePayPal: `Aktivera PayPal`,
    requestPayPalPayee: `Begär PayPal`,
    enablePayPalForFriend: F => `Aktivera PayPal tillåter @${F} att betala you.`,
    friendNotEnabled: F => `@${F} har inte aktiverat PayPal betalningar.`,
    friendRequestedConnect: F => `@${F} vill betala via PayPal`,
    requestFriendConnect: F => `Du frågade @${F} för att aktivera PayPal`,
    feesNotification: `Inkluderar inte PayPal avgifter`,
    feesInformationHeader: `PayPal avgifter Information`,
    feesInformation: `1. Din PayPal-konto måste knytas till ett bankkonto.
    
2. betala i en annan valuta än din bank valuta kommer att medföra en $ 0.35 avgift.

3. Internationella överföringsavgifterna:
    USA till Kanada / Europa: $ 2.99
    USA till någon annanstans: $ 4.99

4. Dessa avgifter är inte heltäckande. För den mest uppdaterade informationen vänligen gå till:

    https://www.paypal.com/us/webapps/mpp/paypal-fees#sending-us`,
    payPalSite: `PayPal.com`,
  }
}
