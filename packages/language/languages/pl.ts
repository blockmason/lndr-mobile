import { currencies, transferLimits } from 'language'

const CUR = currencies
const TL = transferLimits

const generalCommunicationError = 'There was a problem communicating with the server, please try again later.'

export default {

  applicationName: `Lndr`,
  helloWorld: `Witaj świecie`,
  submit: `ZATWIERDŹ`,
  next: `Kolejny`,
  cancel: `Anuluj`,
  back: `Wróć`,
  copy: `Skopiuj do schowka`,
  confirmAccount: `Potwierdzać`,
  createAccount: `Utwórz konto`,
  recoverAccount: `przywrócić konto`,
  removeAccount: `Usuń konto`,
  updateAccount: `Zaktualizuj konto`,
  loginAction: `Odblokować`,
  enterPin: `Wpisz swój kod PIN`,
  changePin: `Zmień PIN`,
  enterCurrentPin: `Wprowadź aktualny kod PIN`,
  logoutAction: `WYLOGUJ`,
  seeAllActivity: `Zobacz wszystkie Aktywny`,
  copiedClipboard: `Skopiowane do schowka`,
  pleaseWait: `Proszę czekać`,
  addFriend: `Dodaj znajomego`,
  addFriendConfirmationQuestion: `Czy na pewno chcesz dodać tego użytkownika jako znajomego?`,
  removeFriend: `Usunąć znajomego`,
  currentFriends: `Aktualne Znajomi`,
  removeFriendConfirmationQuestion: `Czy na pewno chcesz usunąć tego użytkownika jako przyjaciela?`,
  inviteFriends: `Zaproś przyjaciół do Lndr`,
  tryLndr: `Sprawdź Lndr aplikację tutaj:`,
  friendInfo: `Więcej informacji na temat tej przyjaźni:`,
  noFriends: `Dodaj znajomych, aby zacząć!`,
  noMatches: `Nie znaleziono użytkowników pasujących`,
  noBalances: `Nie masz nagrane długów`,
  addFriendButton: `Dodaj znajomego`,
  alreadyFriendsButton: `Przyjaciele`,
  friendShell: `Przyjaciel`,
  tip: `Wskazówka:`,
  notice: `Ogłoszenie:`,
  welcome: `Witamy w LNDR`,
  noBalanceWarning: `Nie byliśmy w stanie załadować równowagi w tym czasie, spróbuj ponownie później.`,
  totalBalance: `Całkowity bilans:`,
  totalBalances: `Wszystkich Kontrahenci:`,
  newTransaction: `Nowa transakcja`,
  needsReview: `potrzeby weryfikacja`,
  owesMe: `Jestem winien`,
  iOwe: `Zawdzięczam kogoś`,
  newPassword: `Nowe hasło (minimum 8 znaków)`,
  confirmPassword: `Potwierdź hasło`,
  newPin: `Nowy 4-cyfrowy kod PIN`,
  enterNewPin: `PROSZĘ ustanowił nowy 4-cyfrowy kod PIN`,
  confirmPin: `Potwierdź swój kod PIN`,
  newAccount: `Stwórz nowe konto`,
  loginAccount: `Odblokować konto`,
  recoverExistingAccount: `Odzyskiwanie istniejące konto`,
  recoverMnemonic: `Mnemonic (12 słowa wyświetlane \ nKiedy tworzenia konta)`,
  recoverMnemonicLengthError: `Mnemonic powinny być dokładnie 12 słów`,
  successTitle: `Powodzenie`,
  errorTitle: `Błąd`,
  showMnemonic: `Pokaż 12 Słowo Mnemonic`,
  mnemonicExhortation: `Fraza ta 12-słowo jest konieczne, aby przywrócić swoje konto, należy przechowywać je w bezpiecznym miejscu i tajne`,
  addressExhortation: `Wyślij Ethereum na Twój adres, dzięki czemu można regulować swoje zobowiązania na Lndr`,
  removeAccountTitle: `Czy na pewno chcesz usunąć swoje konto z tego urządzenia?`,
  removeAccountExhortation: `Upewnij się, że masz dostęp do swojej mnemoników przywrócić swoje konto później, jak to jest trwałe usunięcie informacji o koncie z tym urządzeniem.`,
  myAccount: `Moje konto`,
  setNickname: `Ustaw pseudonim więc twoi przyjaciele mogą szukać dla Ciebie`,
  setEmail: `Ustaw e-mail, aby otrzymywać informacje o aktualizacjach Lndr`,
  nickname: `Nick (małe litery i cyfry)`,
  email: `Adres e-mail`,
  accountManagement: {
    nickname: {
      lengthViolation: `Nick powinna wynosić co najmniej 3 znaków.`,
      compositionViolation: `Pseudonim może zawierać tylko cyfry i małe litery.`,
      duplicationViolation: `Nick jest już zajęty`,
    },
    email: {
      compositionViolation: `Format email jest nieprawidłowy`,
      duplicationViolation: `Adres e-mail jest już zajęty`,
    },
    pin: {
      lengthViolation: `PIN powinien wynosić co najmniej 4 znaków.`,
      matchViolation: `PIN powinien pasować.`,
      failedHashComparison: `PIN jest nieprawidłowy, spróbuj ponownie.`,
      updateSuccess: `Kod PIN został zaktualizowany`,
      updateError: `Wystąpił błąd podczas aktualizacji kodu PIN`,
    },
    mnemonic: {
      lengthViolation: `Mnemonic powinien mieć co najmniej 12 słów.`,
      unableToValidate: `Wprowadzona pamięciowy nie był prawidłowy, spróbuj ponownie.`,
    },
    setNickname: {
      success: `Twój nick został zapisany.`,
      error: generalCommunicationError
    },
    setEmail: {
      success: `Twój e-mail został zapisany.`,
      error: generalCommunicationError
    },
    lockTimeout: {
      top: `Musisz podać kod PIN po`,
      bottom: `minutach bezczynności`,
      update: `Aktualizacja`,
      error: `Nie udało się zaktualizować ustawień konta`,
      success: `Blokada Timeout Zaktualizowany`,
    },
    addFriend: {
      success: X => `Przyjaciel żądania wysyłane do @${X}`,
      error: generalCommunicationError
    },
    removeFriend: {
      success: X => `Usunięto z przyjaciółmi: @${X}`,
      error: generalCommunicationError
    },
    loadInformation: {
      error: generalCommunicationError
    },
    ethBalance: {
      display: Y => `Waga ETH jest ${String(Y).slice (0,8)}`,
      inFiat: (Z, B, A) => ` (${CUR[A]}${String(Number(Z) * Number(B)).slice(0, 8)})`,
      getError: `Nie można odzyskać równowagę Eth`,
      manage: `Zarządzaj ETH`,
    },
    sendEth: {
      error: {
        insufficient: `Przeniesienie powiodło się z powodu niewystarczających funduszy`,
        generic: `Wystąpił błąd z przeniesieniem, spróbuj ponownie później`,
        address: `proszę wprowadzić poprawny adres`,
        amount: `Proszę wprowadzić kwotę większą niż 0`,
        limitExceeded: A => `można tylko wysłać ${CUR [A]} ${TL [A]} tygodniowo, wybierz mniejszy amount`
      },
      amount: `Kwota Wyślij`,
      address: `Adres docelowy (bez prefiksu "0x")`,
      transfer: `przeniesienie ETH`,
      transferAll: `przenieść wszystko`,
      balance: Y => `Obecne saldo ETH jest ${typeof Y === 'string'? Y.slice (0,8): ''} `,
      ethAddress: `Ethereum Adres`,
      txCost: (B, A) => `Obecny koszt transakcji jest ${CUR [A]} ${B}`,
      transferLowercase: `Przelew ETH`,
      note: A => `Uwaga: można tylko przenieść ${CUR [A]} ${TL [A]} tygodniowo z Lndr`,
      warning: (Z, A) => `masz ${CUR[A]} ${Z} pozostały Twojego ${CUR [A]} ${TL [A]} limit`,
    },
    sendBcpt: {
      error: {
        insufficient: `Nie masz wystarczająco dużo BCPT dla tej transakcji`,
        generic: `Wystąpił błąd z przeniesieniem, spróbuj ponownie później`,
      },
      transfer: `przeniesienie BCPT`,
      address: `Adres docelowy (bez prefiksu "0x")`,
      balance: Y => `Obecne saldo BCPT jest ${typeof Y === 'string' ? Y.slice (0,8): ''} `,
      bcptAddress: `BCPT Adres`,
    },
    changeProfilePic: `Stuknij, aby zmienić`,
    addProfilePic: `Użyj obraz z telefonu`,
    panelHeaders: [
      `ETH (& BCPT) Adres`,
      `Bilans ETH`,
      `BCPT Wagi`,
      `ETH Historia transakcji`,
      `Zmień PIN`,
      `Zmień Nick`,
      `Zmień adres e-mail`,
      `Zmień zdjęcie profilowe`,
      `Zmiana limitu czasu blokady`,
      `Mnemoniczny`,
      `Powiadomienia`,
    ],
    viewEtherscan: `Zobacz historię Etherscan`,
    profilePic: {
      change: `Zmień zdjęcie profilowe`,
      setError: `Wystąpił błąd podczas przesyłania obrazu, spróbuj ponownie później`,
      getError: `Wystąpił błąd podczas pobierania swoje zdjęcie profilowe`,
      setSuccess: `obraz profilu aktualizowane`,
    },
    logoutSuccess: `Pomyślnie wylogować!`,
  },

  currentBalance: {
    eth: `Obecne saldo Eth jest:`,
    bcpt: `Obecne saldo BCPT jest:`,
  },

  welcomeView: {
    by: `ZBUDOWANE PRZEZ`,
    makeItEasy: `Lndr ułatwia śledzenie prostych długów`,
    weHelpFriends: `Pomagamy przyjaciele żyją, pracują i bawią się razem.`,
    len: `Len`,
    dot: `,`,
    der: `der`,
    shareDinner: `Kolacja udział`,
    fillTank: `Napełnić zbiornik`,
    travelTogether: `Podróżować razem`,
    runEthereum: `Prowadzimy na ETH!`,
    firstLendingApp: `Pierwsza aplikacja mobilna kredyty zabezpieczone na blockchain.`,
    greatConcert: `Zobacz wielkim koncercie`,
    youPlayWithFriends: `Grasz z przyjaciółmi; \ n będziemy trzymać kartę ...`,
    start: `Zaczynać`,
  },

  debtManagement: {
    shell: `Nowa transakcja`,
    add: `Dodaj dług`,
    selectFriend: `Wybierz`,
    lend: `Nowa pożyczka`,
    borrow: `Nowe Obligacje`,
    iLent: `Znajomy mi zawdzięcza`,
    iBorrowed: `Zawdzięczam znajomego`,
    settleUpLower: `Osiedlić się`,
    amountToSettle: `Kwoty do zapłaty`,
    total: `Całkowity`,
    record: `rekord`,
    records: `dokumentacja`,
    createError: {
      amountTooLow: `Kwota musi być większa niż $ 0`,
      amountTooHigh: `Kwota musi być mniej niż $ 1000000000`,
      selfAsFriend: `Nie można tworzyć dług wobec siebie, wybrać innego przyjaciela`,
      pending: `Proszę rozwiązać oczekującą transakcji z tym użytkownikiem przed utworzeniem innego`,
      insufficientEth: E => `Trzeba przynajmniej ${E} ETH na osiedlenie się, przejdź do menu Ustawienia, aby zobaczyć swój balance`,
    },
    fields: {
      amount: `Ilość`,
      settlementAmount: `Kwota rozliczenia`,
      selectFriend: `Przyjaciel`,
      memo: `Notatka`,
      direction: `Wybierz słuszne jest stwierdzenie`,
    },
    memo: {
      example: `Rodzaj notatka tutaj`,
    },
    direction: {
      lend: X => `${X} zawdzięcza me`,
      borrow: X => `zawdzięczam ${X}`,
      initiatedLend: X => `${X} mówi, że on / ona owes`,
      initiatedBorrow: X => `${X} mówi, że owe`,
      pendingLend: X => `@${X} zawdzięcza you`,
      pendingBorrow: X => `Wisisz @${X}`,
      pendingLendSettlement: S => `@${S.debtorNickname} żąda rozliczenia w ${S.settlementCurrency}`,
      pendingBorrowSettlement: S => `@${S.creditorNickname} chce osiedlić się z wami w ${S.settlementCurrency}`,
      pendingLendSettlementMe: S => `Zażądano do rozliczenia z @${S.debtorNickname} w ${S.settlementCurrency}`,
      pendingBorrowSettlementMe: S => `Zażądano że @${S.creditorNickname} osiedlić się w ${S.settlementCurrency}`,
    },
    pending: {
      success: F => `nieuregulowanych należności przedłożony @${F.nickname}`,
      error: generalCommunicationError
    },
    pendingParens: `(w oczekiwaniu)`,
    confirmation: {
      transaction: CP => `Transakcja z ${CP} został pomyślnie potwierdzone`,
      settlement: CP => `Rozliczenie z ${CP} został pomyślnie potwierdzone`,
      error: `Nie można potwierdzić transakcję w tym czasie, spróbuj ponownie później`,
    },
    rejection: {
      success: `Transakcja została odrzucona`,
      error: `Nie można odrzucić transakcję w tym czasie, spróbuj ponownie później`,
    },
    balances: {
      error: `Nie można załadować równowagi w tym czasie, spróbuj ponownie później`,
    },
    for: M => `dla ${M}`,
    settleUp: `Osiedlić się`,
    settleTotal: `osiedlić Razem`,
    settleUpMemo: (D, A) => `${D === 'pożyczać'? 'Rozliczanie się za': 'Wniosek zadowolić się'} ${A} `,
    recordSettleUpMemo: `rozliczania się`,
  },
  settlementManagement: {
    bilateral: {
      error: {
        insufficient: X => `rozliczenie z ${X} nie powiodło się z powodu niewystarczającej funds`,
        generic: X => `Wystąpił błąd podczas przetwarzania rozliczenie z ${X}`,
      }
    },
    eth: `Rozliczenia z ETH`,
    nonPayment: `Nagraj osadzie`,
  },

  accountViewLanguage: {
    lndr: `L n d r`,
    home: `Dom`,
    friends: `Przyjaciele`,
    activity: `Czynność`,
  },

  notifications: {
    toggleNotifications: `Przegubowe Powiadomienia`,
    enable: `Włączyć`,
    disable: `Wyłączyć`,
  },

  pendingTransactionsLanguage: {
    shell: `Transakcja w toku`,
    title: `W oczekiwaniu`,
    memo: `Notatka:`,
    for: `Dla`,
    none: `Nie masz żadnych oczekujących transakcji`,
    confirmationQuestion: `Czy na pewno chcesz, aby potwierdzić tę transakcję?`,
    pendingAnnouncement: `Transakcja czeka na potwierdzenie przez drugą stronę.`,
    bilateral: `Oczekiwanie na przeniesienie Eth aby zakończyć`,
    confirm: `Potwierdzać`,
    reject: `odrzucić Transakcję`,
    rejectRequest: `Odrzucać`,
    cancel: `Anuluj transakcję`,
    direction: {
      lend: (X, Z) => `@${X} zawdzięcza Ci ${Z}`,
      borrow: (X, Z) => `Wisisz @${X} ${Z}`,
    }
  },

  pendingSettlementsLanguage: {
    shell: `Rozliczenie w toku`,
    title: `W oczekiwaniu`,
    none: `Nie masz żadnych oczekujących rozliczeń`,
    confirm: `Potwierdzać`,
    reject: `Odrzuć Rozliczenie`,
    cancel: `Anuluj Rozliczenie`,
  },

  recentTransactionsLanguage: {
    title: `Zakończony`,
    none: `Nie masz ukończonych transakcji`,
    direction: {
      lend: (X, Z) => `@${X} zawdzięcza Ci ${Z}`,
      borrow: (X, Z) => `Wisisz @${X} ${Z}`
    },
    balance: `Saldo`,
    friends: FS => `(z ${FS} ${FS === 1 ? 'przyjaciel': 'Przyjaciół'})`,
  },

  tabs: {
    home: `Dom`,
    friends: `Przyjaciele`,
    activity: `Czynność`,
  },

  confirmation: {
    shell: `Potwierdzenie`,
    done: `Gotowe`,
    create: {
      start: `Wysłaliśmy rekord ponad `,
      end: ` o potwierdzenie.`,
    },
    confirm: {
      start: `Pan potwierdził ten rekord z`,
      end: `,`,
    },
    reject: {
      start: `Mamy niech `,
      end: ` wiedzieć, że odrzucił ten rekord.`,
    },
    confirmFriend: {
      start: `Jesteś teraz przyjaciółmi z `,
      end: `!`,
    },
    rejectFriend: {
      start: `Masz odrzucił zaproszenie od `,
      end: `,`,
    },
    ethSent: {
      start: `Pomyślnie wysłane `,
      end: ` ETH a transakcja jest hash `,
    },
    bcptSent: {
      start: `Pomyślnie wysłana `,
      end: ` BCPT a transakcja jest hash `,
    },
    status: `Można sprawdzić status transakcji na `,
    activity: `karcie aktywności.`,
  },

  pendingFriendRequestsLanguage: {
    shell: `Prośba przyjaciela`,
    message: `Przyjaciel Wnioski`,
    request: F => `${F} chce przyjaźnić się z wami!`,
  }
}
