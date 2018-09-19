import { currencySymbols, transferLimits } from 'lndr/currencies'

const CUR = currencySymbols
const TL = transferLimits

const generalCommunicationError = 'Došlo k potížím při komunikaci se serverem, zkuste to znovu později.'

export default {

  applicationName: `Lndr`,
  helloWorld: `Ahoj světe`,
  submit: `PŘEDLOŽIT`,
  next: `Další`,
  cancel: `Zrušit`,
  back: `Zpět`,
  copy: `Zkopírovat do schránky`,
  confirmAccount: `Potvrdit`,
  createAccount: `Vytvořit účet`,
  recoverAccount: `Obnovit účet`,
  removeAccount: `Odstranit účet`,
  updateAccount: `Aktualizovat účet`,
  loginAction: `Odemknout`,
  enterPin: `Prosím, zadejte svůj PIN`,
  changePin: `Změnit PIN`,
  enterCurrentPin: `Zadejte aktuální PIN`,
  logoutAction: `ODHLÁSIT SE`,
  seeAllActivity: `Zobrazit veškerou aktivitu`,
  copiedClipboard: `Zkopírováno do schránky`,
  pleaseWait: `Čekejte, prosím`,
  addFriend: `Přidat přítele`,
  addFriendConfirmationQuestion: `Opravdu chcete přidat tohoto uživatele jako přítele?`,
  removeFriend: `Odebrat přítele`,
  currentFriends: `Současní přátelé`,
  removeFriendConfirmationQuestion: `Opravdu chcete odstranit tohoto uživatele jako přítele?`,
  inviteFriends: `Pozvat přátele na Lndr`,
  tryLndr: `Vyzkoušejte Lndr App zde:`,
  friendInfo: `Více informací o tomto přátelství:`,
  noFriends: `Začněte tím, že si přidáte nějaké přátele!`,
  noMatches: `Nebyly nalezeny žádní odpovídající uživatelé`,
  noBalances: `Nemáte žádné nahrané dluhy`,
  addFriendButton: `Přidat přítele`,
  alreadyFriendsButton: `Přátelé`,
  friendShell: `Přítel`,
  tip: `Tip:`,
  notice: `Oznámení:`,
  welcome: `Vítejte ve své LNDR`,
  noBalanceWarning: `Nebylo možné nahrát váš zůstatek, zkuste to prosím později.`,
  totalBalance: `Celkový zůstatek:`,
  totalBalances: `Celkem Protistrany:`,
  newTransaction: `Nová transakce`,
  needsReview: `Čeká na schválení`,
  owesMe: `Já dlužím`,
  iOwe: `Dlužím někomu`,
  newPassword: `Nové heslo (minimálně 8 znaků)`,
  confirmPassword: `Potvrďte heslo`,
  newPin: `Nový 4-místný PIN`,
  enterNewPin: `NASTAVTE SI NOVÝ 4-MÍSTNÝ PIN`,
  confirmPin: `POTVRĎTE SVŮJ PIN`,
  newAccount: `Vytvořit nový účet`,
  loginAccount: `Odemknout svůj účet`,
  recoverExistingAccount: `Obnovit existující účet`,
  recoverMnemonic: `Mnemotechnika (12 slov zobrazených \npři vytváření účtu)`,
  recoverMnemonicLengthError: `Mnemotechnika by měla mít přesně 12 slov`,
  successTitle: `Úspěch`,
  errorTitle: `Chyba`,
  showMnemonic: `Ukázat 12 slov mnemotechniky`,
  mnemonicExhortation: `Tato fráze o 12 slovech je vyžadována k obnovení účtu, bezpečně ji proto uschovejte.`,
  addressExhortation: `Zaslat Ethereum na email za účelem vypořádání dluhů na Lndr`,
  removeAccountTitle: `Opravdu chcete odstranit svůj účet z tohoto zařízení?`,
  removeAccountExhortation: `Ujistěte se, že máte přístup ke své mnemotechnické pomůcce pro obnovení účtu, protože odstranění vašeho účtu z tohoto zařízení je trvalé.`,
  myAccount: `Můj účet`,
  setNickname: `Nastavit přezdívku, aby vás přátelé mohli vyhledat`,
  setEmail: `Nastavit e-mail pro účely zasílání aktualit z Lndr`,
  nickname: `Přezdívka (malá písmena a čísla)`,
  email: `Emailová adresa`,
  accountManagement: {
    nickname: {
      lengthViolation: `Přezdívka by měla být nejméně 3 znaky.`,
      compositionViolation: `Přezdívka může obsahovat pouze čísla a malá písmena.`,
      duplicationViolation: `Tuto přezdívku již někdo používá`,
    },
    email: {
      compositionViolation: `Nesprávný formát emailu`,
      duplicationViolation: `Na tento email již byl vytvořen účet`,
    },
    pin: {
      lengthViolation: `PIN by měl být alespoň 4 znaky.`,
      matchViolation: `PINy se musí shodovat.`,
      failedHashComparison: `PIN není platný, zkuste to znovu.`,
      updateSuccess: `Váš PIN byl aktualizován`,
      updateError: `Došlo k chybě při aktualizaci PINu`,
    },
    mnemonic: {
      lengthViolation: `Mnemotechnická pomůcka by měla mít alespoň 12 slov.`,
      unableToValidate: `Zadaná mnemotechnická pomůcka je neplatná, zkuste to znovu, prosím.`,
    },
    setNickname: {
      success: `Vaše přezdívka byla uložena.`,
      error: generalCommunicationError
    },
    setEmail: {
      success: `Váš email byl uložen.`,
      error: generalCommunicationError
    },
    lockTimeout: {
      top: `Zadání PINu je vyžadováno po`,
      bottom: `minutách nečinnosti`,
      update: `Aktualizace`,
      error: `Nepodařilo se aktualizovat nastavení účtu`,
      success: `Timeout zámek aktualizován`,
    },
    addFriend: {
      success: X => `Zádost o přátelství odeslána @${X}`,
      error: generalCommunicationError
    },
    removeFriend: {
      success: X => `Odebrán(a) z přátel: @${X}`,
      error: generalCommunicationError
    },
    loadInformation: {
      error: generalCommunicationError
    },
    ethBalance: {
      display: Y => `Váš zůstatek ETH je ${String(Y).slice(0,8)}`,
      getError: `Nelze načíst Eth rovnováhu`,
      manage: `Správovat ETH`,
    },
    sendEth: {
      error: {
        insufficient: `Pro tuto transakci nemáte dostatek ETH`,
        generic: `Došlo k chybě při převodu, zkuste to prosím později`,
        address: `Zadejte prosím platnou adresu`,
        amount: `Zadejte částku větší než 0`,
        limitExceeded: A => `Můžete poslat pouze ${CUR(A)}${TL(A)} týdně, zvolte menší částku`
      },
      amount: `Částka k odeslání`,
      address: `Cílová adresa (bez předpon '0x')`,
      transfer: `Převést ETH`,
      transferAll: `Převést vše`,
      balance: Y => `Aktuální zůstatek ETH je ${typeof Y === 'string' ? Y.slice(0,8) :''}`,
      ethAddress: `Ethereum adresa`,
      txCost: (B, A) => `Aktuální cena transakce je ${CUR(A)}${B}`,
      transferLowercase: `Převést Eth`,
      note: A => `Poznámka: můžete převést max. ${CUR(A)}${TL(A)} týdně z Lndr`,
      warning: (Z, A) => `Zbývá vám ${CUR(A)}${Z} z vašeho limitu ${CUR(A)}${TL(A)}`,
    },
    sendBcpt: {
      error: {
        insufficient: `Pro tuto transakci nemáte dostatek BCPT`,
        generic: `Došlo k chybě při převodu, zkuste to prosím později`,
      },
      transfer: `Převést BCPT`,
      address: `Cílová adresa (bez '0x' prefix)`,
      balance: Y => `Aktuální BCPT zůstatek je ${typeof Y === 'string' ? Y.slice(0,8) :''}`,
      bcptAddress: `BCPT adresa`,
    },
    panelHeaders: [
      `ETH (a BCPT) adresa`,
      `Zůstatek ETH`,
      `Zůstatek BCPT`,
      `Odstranit účet`,
      `ETH Transakční historie`,
      `Umožnit PayPal`,
      `Změnit hlavní měně`,
      `Změna PIN`,
      `Změnit email`,
      `Změna zámku Timeout`,
      `Mnemo`,
      `Poznámka`,
    ],
    viewEtherscan: `Přehled Etherscanové historie`,
    profilePic: {
      change: `Změnit profilovou fotku`,
      setError: `Při nahrávání fotky došlo k chybě, zkuste to později znovu`,
      getError: `Při načítání fotky došlo k chybě, zkuste to později znovu`,
      setSuccess: `Profilová fotka změněna`,
    },
    logoutSuccess: `Došlo k úspěšnému odhlášení!`,
    logoutError: generalCommunicationError,
  },

  currentBalance: {
    eth: `Váš současný Eth zůstatek:`,
    bcpt: `Váš současný BCPT zůstatek:`,
  },

  welcomeView: {
    by: `VYTVOŘENO`,
    makeItEasy: `Lndr usnadňuje sledování jednoduchých dluhů`,
    weHelpFriends: `Pomáháme přátelům společně žít, pracovat a hrát si.`,
    len: `Len`,
    dot: `,`,
    der: `der`,
    shareDinner: `Sdílejte večeři`,
    fillTank: `Natankujte nádrž`,
    travelTogether: `Cestujte společně`,
    runEthereum: `Používáme ETH!`,
    firstLendingApp: `První mobilní aplikace zaměřená na půjčování zabezpečená blockchainem.`,
    greatConcert: `Běžte na super koncert`,
    youPlayWithFriends: `Bavte se s přáteli, \n my se postaráme o kartu ...`,
    start: `Začínáme`,
  },

  walkthrough: {
    skip: `přeskočit`,
    continue: `pokračovat`,
    step1: {
      easyToUse: `Lndr je nejjednodušší způsob, jak rozdělit účty, sdílení nákladů a usadit jednoduché dluhy s přáteli a rodinou, to vše provedeno bezpečně na blockchain.`,
      len: `Len`,
      der: `der`,
    },
    step2: {
      getStarted: `Chcete-li začít s Lndr, budete muset přidat přítele.`,
      friendsScreen: `Navštívit Friends obrazovky hledat, přidat nebo pozvat své přátele a rodinu se připojit k Lndr.`,
    },
    step3: {
      title: `Nahrávání transakce`,
      easy: `Rozdělením účet nebo přidání dluh s přítelem, je snadné v Lndr!`,
      selectFriend: `Zvolit svého přítele, měnu a částku.`,
      addMemo: `Přidat nějaké poznámky do poznámkového pole a klikněte na tlačítko Odeslat.`,
    },
    step4: {
      title: `Vyrovnat`,
      ready: `Připraven vyrovnat?`,
      payPal: `Když je čas se usadit s Lndr, \n- můžete zvolit PayPal:`,
      ether: `- cryptocurrencies jako Ether:`,
      cash: `- nebo jednoduše nahrát výplatu v hotovosti:`,
      positiveBalance: `10.46`,
    },
    step5: {
      title: `Více měn`,
      multiCurrency: `Lndr mohou sledovat své transakce, i když se stalo v různých měnách.`,
      exchangeRate: `Když jste se rozhodli vyřídit se svým přítelem, budou všechny transakce bude převedena na primární měnu za použití nejvíce směnné kurzy up-to-date k dispozici.`,
      start: `Začněte používat Lndr!`,
    }
  },

  debtManagement: {
    shell: `Nová transakce`,
    add: `Přidat dluh`,
    selectFriend: `Vybrat`,
    lend: `Nová půjčka`,
    borrow: `Nový dluh`,
    owesMe: `Mi dluží`,
    iOwe: `Dlužím`,
    iLent: `Přítel mi dluží`,
    iBorrowed: `Dlužím příteli`,
    settleUpLower: `Vyrovnat`,
    amountToSettle: `Částka k vyrovnání`,
    total: `Celkem`,
    record: `záznam`,
    records: `záznamy`,
    chooseCurrency: `Vyberte měnu`,

    createError: {
      amountTooLow: `Částka musí být větší než 0 $`,
      amountTooHigh: `Částka musí být menší než 1.000.000.000 $`,
      selfAsFriend: `Není možné vytvořit dluh se sebou, vyberte přítele`,
      pending: `Vyřešte prosím čekající transakci s tímto uživatelem, než založíte transakci novou`,
      insufficientEth: E => `K vypořádání je třeba alespoň ${E} ETH, info o vašem zůstatku naleznete v Nastavení`,
    },
    fields: {
      currency: `Měna`,
      amount: `Částka`,
      settlementAmount: `Částka k vypořádání`,
      selectFriend: `Přítel`,
      memo: `Poznámka`,
      direction: `Zvolte odpovídající zprávu`,
    },
    memo: {
      example: `Druh poznámky zde`,
    },
    direction: {
      lend: X => `${X} dluží mi`,
      borrow: X => `Dlužím ${X}`,
      initiatedLend: X => `${X} říká, že dluží`,
      initiatedBorrow: X => `${X} říká, že dlužíš`,
      pendingLend: X => ` '${X} ti dluží`,
      pendingBorrow: X => `Dlužíte @${X}`,
      pendingLendSettlement: S => `@${S.debtorNickname} žádá vypořádání v ${S.settlementCurrency}`,
      pendingBorrowSettlement: S => `@${S.creditorNickname} se chce s vámi vypořádat v ${S.settlementCurrency}`,
      pendingLendSettlementMe: S => `Zažádal(a) jste o vyrovnání s @${S.debtorNickname} v ${S.settlementCurrency}`,
      pendingBorrowSettlementMe: S => `Požádal(a) jste @${S.creditorNickname} o vyrovnání v ${S.settlementCurrency}`,
    },
    pending: {
      success: F => `Nesplacený dluh předložen @${F.nickname}`,
      error: generalCommunicationError
    },
    pendingParens: `(čekající)`,
    confirmation: {
      transaction: CP => `Transakce s ${CP} byla úspěšně potvrzena`,
      settlement: CP => `Vypořádání s ${CP} bylo úspěšně potvrzeno`,
      error: `V tuto chvíli nelze transakce potvrdit, zkuste to později prosím`,
    },
    rejection: {
      success: `Transakce byla zamítnuta`,
      error: `V tuto chvíli nelze transakci odmítnout, zkuste to později prosím`,
    },
    balances: {
      error: `V tuto chvíli nelze načíst zůstatky, zkuste to později prosím`,
    },
    for: M => `za ${M}`,
    settleUp: `Vyrovnat`,
    settleTotal: `Celkem k vyrovnání`,
    settleUpMemo: (D, A) => `${D === 'lend' ? 'Vypořádání na' : 'Žádost o vypořádání na'} ${A}`,
    recordSettleUpMemo: `probíhá vypořádání`,
    balanceByCurrency: `Podrobnosti`,
  },
  settlementManagement: {
    bilateral: {
      error: {
        insufficient: X => `Vaše vypořádání s ${X} selhalo z důvodu nedostatečných fin. prostředků`,
        generic: X => `Došlo k chybě při zpracování vašeho vyrovnání s ${X}`,
      }
    },
    eth: `Vyrovnat prostřednictvím ETH`,
    paypal: `Vyrovnat prostřednictvím PayPal`,
    nonPayment: `Nahrát vyrovnání`,
    select: `Vyberte typ vypořádání`,
  },

  accountViewLanguage: {
    lndr: `L n d r`,
    home: `Domů`,
    friends: `Přátelé`,
    activity: `Aktivita`,
  },

  notifications: {
    toggleNotifications: `Přepnout oznámení`,
    enable: `Zapnout`,
    disable: `Vypnout`,
  },

  pendingTransactionsLanguage: {
    shell: `Čekající transakce`,
    title: `Čekající`,
    memo: `Poznámka:`,
    for: `Pro`,
    none: `Nemáte žádné nevyřízené transakce`,
    confirmationQuestion: `Opravdu chcete potvrdit tuto transakci?`,
    pendingAnnouncement: `Tato transakce čeká na potvrzení druhou stranou.`,
    bilateral: `Čekání na dokončení převodu Eth`,
    confirm: `Potvrdit`,
    reject: `Odmítnout transakci`,
    rejectRequest: `Odmítnout`,
    cancel: `Zrušit transakci`,
    direction: {
      lend: (X, Z) => ` '${X} vám dluží ${Z}`,
      borrow: (X, Z) => `Dlužíte @${X}${Z}`,
    }
  },

  pendingSettlementsLanguage: {
    shell: `Čekající na vyrovnání`,
    title: `Čekající`,
    none: `Nemáte žádná nevyřízená vyrovnání`,
    confirm: `Potvrdit`,
    reject: `Odmítnout vyrovnání`,
    cancel: `Zrušit vyrovnání`,
  },

  recentTransactionsLanguage: {
    title: `Dokončeno`,
    none: `Nemáte žádné dokončené transakce`,
    direction: {
      lend: (X, Z) => ` '${X} dluží vám ${Z}`,
      borrow: (X, Z) => `Dlužíte @${X}${Z}`
    },
    balance: `Zůstatek`,
    consolidatedBalance: `Zůstatek`,
    friends: FS => `(od ${FS} ${FS === 1 ? 'přítele' :'přátel'})`,
  },

  tabs: {
    home: `Domů `,
    friends: `Přátelé`,
    activity: `Aktivita`,
  },

  confirmation: {
    shell: `Potvrzení`,
    done: `Hotovo`,
    create: {
      start: `Transakce byla poslána `,
      end: `ovi k potvrzení.`,
    },
    confirm: {
      start: `Tento záznam od `,
      end: `a jste potvrdil(a).`,
    },
    reject: {
      start: ``,
      end: ` byl informová, že jste tento záznam zamítl(a).`,
    },
    confirmFriend: {
      start: `S `,
      end: `em jste nyní přáteli!`,
    },
    rejectFriend: {
      start: `Odmítli jste žádost o přátelství od `,
      end: `a.`,
    },
    rejectOutboundFriendRequest: {
      start: `Zrušili jste žádost o přátelství na `,
      end: `.`,
    },
    ethSent: {
      start: `Úspěšně jste odeslal(a) `,
      end: ` ETH a hash vaší transakce je `,
    },
    bcptSent: {
      start: `Úspěšně jste odeslali `,
      end: ` BCPT a hash vaší transakce je `,
    },
    requestPayPalPayee: {
      start: `Máme nechat `,
      end: ` vědět, že byste chtěli usadit přes PayPal.`,
    },
    requestPayPalPayment: {
      start: `Máme nechat `,
      end: ` vědět, že byste chtěli být zaplacena přes PayPal.`,
    },
    settledWithPayPal: {
      start: `Máme nechat `,
      end: ` vědět, že jste se vyrovnal s PayPal.`,
    },
    status: `Stav této transakce můžete sledovat v `,
    activity: `záložce Aktivita.`,
  },

  pendingFriendRequestsLanguage: {
    shell: `Žádost o přátelství`,
    message: `Žádosti o přátelství`,
    request: F => `@${F} si vás chce přidat mezi přátele!`,
    outbound: F => `jste poslal žádost o přátelství na @${F}`,
  },

  privacyPolicy: {
    link: `lndr.io/terms/`,
    message: `Kliknutím na tlačítko níže potvrzujete, že jste si přečetli a souhlasíte se zásadami ochrany osobních údajů Blockmason je. Blockmason může používat e-mailovou adresu pro zaslání aktualizací o Blockmason a LNDR. Zde je odkaz na zásady ochrany osobních údajů:`
  },

  payPalLanguage: {
    connectPayPal: `Připojit PayPal`,
    connectSuccess: `PayPal úspěšně povoleno.`,
    disconnectPayPal: `Odpojení PayPal`,
    disconnected: `PayPal odpojen.`,
    requestPayPalPayment: `Požadavek PayPal Payment`,
    sendWithPayPal: `Poslat PayPal`,
    enablePayPal: `Umožnit PayPal`,
    requestPayPalPayee: `Vyžádat PayPal`,
    enablePayPalForFriend: F => `Povolení PayPal umožňuje @${F} zaplatit you.`,
    friendNotEnabled: F => `${F} není povoleno PayPal platby.`,
    friendRequestedConnect: F => `${F} chce zaplatit přes PayPal`,
    requestFriendConnect: F => `Ptal ses @${F} umožnit PayPal`,
    feesNotification: `Nezahrnuje PayPal poplatky`,
    feesInformationHeader: `PayPal Poplatky Informace`,
    feesInformation: `1. Váš účet PayPal musí být vázána na bankovní účet.
    
2. Platba v měně odlišné od měny vaší banky bude vynakládat $ 0.35 poplatek.

3. Mezinárodní poplatky za převod:
    USA do Kanady / Evropa: $ 2,99
    USA se nikde jinde: $ 4,99

4. Tyto poplatky nejsou vyčerpávající. Pro většinu aktualizované informace naleznete na adrese:

    https://www.paypal.com/us/webapps/mpp/paypal-fees#sending-us`,
    payPalSite: `PayPal.com`,
  }
}
