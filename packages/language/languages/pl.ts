import { currencySymbols, transferLimits } from 'lndr/currencies'

const CUR = currencySymbols
const TL = transferLimits

const generalCommunicationError = 'Wystąpił problem podczas komunikacji z serwerem, spróbuj ponownie później.'

export default {

  applicationName: `Lndr`,
  helloWorld: `Witaj`,
  submit: `PRZEŚLIJ`,
  next: `Dalej`,
  cancel: `Anuluj`,
  back: `Wróć`,
  copy: `Skopiuj do schowka`,
  confirmAccount: `Potwierdź`,
  createAccount: `Utwórz konto`,
  recoverAccount: `Przywrócić konto`,
  removeAccount: `Usuń Konto`,
  updateAccount: `Zaktualizuj konto`,
  loginAction: `Odblokuj`,
  enterPin: `WPISZ SWÓJ KOD PIN`,
  changePin: `Zmień PIN`,
  enterCurrentPin: `Wprowadź aktualny kod PIN`,
  logoutAction: `WYLOGUJ`,
  seeAllActivity: `Zobacz Aktywność`,
  copiedClipboard: `Skopiowane do Schowka`,
  pleaseWait: `Zaczekaj`,
  addFriend: `Dodaj Znajomego`,
  addFriendConfirmationQuestion: `Czy na pewno chcesz dodać tego użytkownika jako znajomego?`,
  removeFriend: `Usuń znajomego`,
  currentFriends: `Aktualni Znajomi`,
  removeFriendConfirmationQuestion: `Czy na pewno chcesz usunąć tego znajomego?`,
  inviteFriends: `Zaproś przyjaciół do Lndr`,
  tryLndr: `Wypróbuj aplikację Lndr tutaj:`,
  friendInfo: `Więcej informacji o tej znajomości:`,
  noFriends: `Aby zacząć, dodaj znajomych!`,
  noMatches: `Nie znaleziono pasujących użytkowników`,
  noBalances: `Nie masz żadnych zapisanych długów`,
  addFriendButton: `Dodaj znajomego`,
  alreadyFriendsButton: `Znajomi`,
  friendShell: `Znajomy:`,
  tip: `Tip:`,
  notice: `Uwaga:`,
  welcome: `Witamy w LNDR`,
  noBalanceWarning: `Nie udało nam się załadować Twojego stanu konta, spróbuj później.`,
  totalBalance: `Całkowity stan konta:`,
  totalBalances: `Wszyscy Kontrahenci:`,
  newTransaction: `Nowa transakcja`,
  needsReview: `Oczekujące na zatwierdzenie`,
  owesMe: `Ktoś jest Ci dłużny`,
  iOwe: `Jesteś dłużny/dłużna`,
  newPassword: `Nowe hasło (minimum 8 znaków)`,
  confirmPassword: `Potwierdź hasło`,
  newPin: `Nowy 4-cyfrowy kod PIN`,
  enterNewPin: `USTAW NOWY 4-CYFROWY KOD PIN`,
  confirmPin: `POTWIERDŹ SWÓJ KOD PIN`,
  newAccount: `Stwórz nowe konto`,
  loginAccount: `Odblokuj konto`,
  recoverExistingAccount: `Odzyskaj istniejące konto`,
  recoverMnemonic: `Mnemonik (12 słów wyświetlonych przy zakładaniu konta)`,
  recoverMnemonicLengthError: `Mnemonik powinien wynosić dokładnie 12 słów`,
  successTitle: `Udało się`,
  errorTitle: `Błąd`,
  showMnemonic: `Pokaż Składający się z 12 Słów Mnemonik`,
  mnemonicExhortation: `Fraza składająca się z 12-słów jest konieczna, aby odzyskać konto, należy ją przechowywać w bezpiecznym miejscu`,
  addressExhortation: `Wyślij Ethereum na Twój adres, by móc zarządzać długami przez Lndr`,
  removeAccountTitle: `Czy na pewno chcesz usunąć swoje konto z tego urządzenia?`,
  removeAccountExhortation: `Nastąpi całkowite usunięcie informacji o Twoim koncie z tego urządzenia, upewnij się, że masz dostęp do swoich mnemoników koniecznych do przywrócenia konta.`,
  myAccount: `Moje konto`,
  setNickname: `Ustaw nazwę użytkownika, by Twoi znajomi mogli Cię znaleźć`,
  setEmail: `Ustaw e-mail, aby otrzymywać informacje o aktualizacjach Lndr`,
  nickname: `Nazwa użytkownika (małe litery i cyfry)`,
  email: `Adres e-mail`,
  accountManagement: {
    nickname: {
      lengthViolation: `Nazwa użytkownika powinna liczyć co najmniej 3 znaki.`,
      compositionViolation: `Nazwa użytkownika może zawierać tylko cyfry i małe litery.`,
      duplicationViolation: `Nazwa użytkownika jest już zajęta`,
    },
    email: {
      compositionViolation: `Format email jest nieprawidłowy`,
      duplicationViolation: `Adres e-mail jest już zajęty`,
    },
    pin: {
      lengthViolation: `PIN powinien mieć co najmniej 4 znaki.`,
      matchViolation: `PIN powinien być taki sam.`,
      failedHashComparison: `PIN jest nieprawidłowy, spróbuj ponownie.`,
      updateSuccess: `Kod PIN został zaktualizowany`,
      updateError: `Wystąpił błąd podczas aktualizacji kodu PIN`,
    },
    mnemonic: {
      lengthViolation: `Mnemonik powinien mieć co najmniej 12 słów.`,
      unableToValidate: `Wprowadzony mnemonik jest nieprawidłowy, spróbuj ponownie.`,
    },
    setNickname: {
      success: `Twoja nazwa użytkownika została zapisana.`,
      error: generalCommunicationError
    },
    setEmail: {
      success: `Twój e-mail został zapisany.`,
      error: generalCommunicationError
    },
    lockTimeout: {
      top: `Musisz podać kod PIN po`,
      bottom: `minutach braku aktywności`,
      update: `Aktualizacja`,
      error: `Nie udało się zaktualizować ustawień konta`,
      success: `Czas Aktywowania Blokady Został Zaktualizowany`,
    },
    addFriend: {
      success: X => `Prośba o przyjęcie do grona znajomych wysłana do @${X}`,
      error: generalCommunicationError
    },
    removeFriend: {
      success: X => `Usunięto z grona znajomych: @${X}`,
      error: generalCommunicationError
    },
    loadInformation: {
      error: generalCommunicationError
    },
    ethBalance: {
      display: Y => `Bilans ETH wynosi ${String (Y) .slice (0,8)}`,
      inFiat: (Z, B, A) => ` (${CUR(A)}${String(Number(Z) * Number(B)).slice(0, 8)})`,
      getError: `Nie udało się uzyskać bilansu Eth`,
      manage: `Zarządzaj ETH`,
    },
    sendEth: {
      error: {
        insufficient: `Nie masz wystarczająco dużo ETH dla tej transakcji`,
        generic: `Wystąpił błąd z transferem, spróbuj ponownie później`,
        address: `Wprowadzić poprawny adres`,
        amount: `Proszę wprowadzić kwotę większą niż 0`,
        limitExceeded: A => `można wysłać tylko ${CUR(A)} ${TL(A)} tygodniowo, wybierz mniejszą sumę`,
      },
      amount: `Kwota do Wysłania`,
      address: `Adres docelowy (bez prefiksu „0x”)`,
      transfer: `Prześlij ETH`,
      transferAll: `Prześlij wszystko`,
      balance: Y => `Obecne saldo ETH wynosi ${typeof Y === 'string'? Y.slice (0,8): ''} `,
      ethAddress: `Adres Ethereum`,
      txCost: (B, A) => `Obecny koszt transakcji to ${CUR(A)} ${B}`,
      transferLowercase: `Przelew ETH`,
      note: A => `Uwaga: można wysłać tylko ${CUR(A)} ${TL(A)} tygodniowo z Lndr`,
      warning: (Z, A) => `masz ${CUR(A)} ${Z} z Twojego limitu równego ${CUR(A)} ${TL(A)}`,
    },
    sendBcpt: {
      error: {
        insufficient: `Nie masz wystarczająco dużo BCPT dla tej transakcji`,
        generic: `Wystąpił błąd z transferem, spróbuj ponownie później`,
      },
      transfer: `Prześlij BCPT`,
      address: `Adres docelowy (bez prefiksu „0x”)`,
      balance: Y => `Obecne saldo BCPT wynosi ${typeof Y === 'string' ? Y.slice (0,8): ''} `,
      bcptAddress: `Adres BCPT`,
    },
    changeProfilePic: `Wybierz, aby zmienić`,
    addProfilePic: `Wczytaj Zdjęcie z Telefonu`,
    panelHeaders: [
      `Adres ETH (& BCPT)`,
      `Bilans ETH`,
      `Bilans BCPT`,
      `Usuń Konto`,
      `Historia transakcji ETH`,
      `Zmień walutę podstawowy`,
      `Zmień PIN`,
      `Zmień Nazwę Użytkownika`,
      `Zmień adres e-mail`,
      `Zmień zdjęcie profilowe`,
      `Zmiana czasu, po którym nastąpi blokada`,
      `Mnemonik`,
      `Powiadomienia`,
    ],
    viewEtherscan: `Zobacz historię Etherscan`,
    profilePic: {
      change: `Zmień zdjęcie profilowe`,
      setError: `Wystąpił błąd podczas przesyłania zdjęcia, spróbuj ponownie później`,
      getError: `Wystąpił błąd podczas pobierania zdjęcia profilowego`,
      setSuccess: `Zdjęcie profilowe zostało zaktualizowane`,
    },
    logoutSuccess: `Wylogowanie zakończone sukcesem`,
    logoutError: generalCommunicationError,
  },

  currentBalance: {
    eth: `Obecne saldo Eth:`,
    bcpt: `Obecne saldo BCPT:`,
  },

  welcomeView: {
    by: `ZBUDOWANE PRZEZ`,
    makeItEasy: `Lndr ułatwia zarządzanie prostymi długami`,
    weHelpFriends: `Pomagamy znajomym wspólnie żyć, pracować i spędzać czas.`,
    len: `Len`,
    dot: `,`,
    der: `der`,
    shareDinner: `Wspólna Kolacja`,
    fillTank: `Napełnij Bak`,
    travelTogether: `Wspólna Podróż`,
    runEthereum: `Działamy na ETH!`,
    firstLendingApp: `Pierwsza aplikacja mobilna do pożyczek zabezpieczona przez blockchain.`,
    greatConcert: `Zobacz Wspaniały Koncert`,
    youPlayWithFriends: `Ty bawisz się z przyjaciółmi; \ n my zajmiemy się rachunkiem ...`,
    start: `Zacznij`,
  },

  debtManagement: {
    shell: `Nowa transakcja`,
    add: `Dodaj dług`,
    selectFriend: `Wybierz`,
    lend: `Nowa Pożyczka`,
    borrow: `Nowy Dług`,
    iLent: `Znajomy jest mi dłużny`,
    iBorrowed: `Jestem dłużny/dłużna znajomemu`,
    settleUpLower: `Rozlicz Dług`,
    amountToSettle: `Kwoty do zapłaty`,
    total: `Całość`,
    record: `dokument`,
    records: `dokumentacja`,
    chooseCurrency: `Wybierz walutę`,
    createError: {
      amountTooLow: `Kwota musi być większa niż $ 0`,
      amountTooHigh: `Kwota musi być mniej niż $ 1000000000`,
      selfAsFriend: `Nie możesz mieć długu wobec siebie, wybierz innego znajomego`,
      pending: `Rozlicz oczekującą transakcję z tym użytkownikiem zanim utworzysz nową transakcję`,
      insufficientEth: E => `Potrzeba co najmniejj ${E} ETH by się rozliczyć, przejdź do menu Ustawienia, aby zobaczyć swój stan konta`,
    },
    fields: {
      currency: `Waluta`,
      amount: `Ilość`,
      settlementAmount: `Kwota rozliczenia`,
      selectFriend: `Znajomy`,
      memo: `Notatka`,
      direction: `Wybierz Odpowiednie Potwierdzenie`,
    },
    memo: {
      example: `Wpisz notatkę`,
    },
    direction: {
      lend: X => `${X} jest mi dłużny/dłużna`,
      borrow: X => `jestem dłużny/dłużna ${X}`,
      initiatedLend: X => `${X} mówi, że jest mi dłużny/dłużna`,
      initiatedBorrow: X => `${X} mówi, że jesteś dłużny/dłużna`,
      pendingLend: X => `@${X} jest Ci dłużny/dłużna`,
      pendingBorrow: X => `Jesteś dłużny/dłużna @${X}`,
      pendingLendSettlement: S => `@${S.debtorNickname} żąda rozliczenia w ${S.settlementCurrency}`,
      pendingBorrowSettlement: S => `@${S.creditorNickname} chce się z Tobą rozliczyć w ${S.settlementCurrency}`,
      pendingLendSettlementMe: S => `Zażądano rozliczenia z @${S.debtorNickname} w ${S.settlementCurrency}`,
      pendingBorrowSettlementMe: S => `Zażądano by @${S.creditorNickname} rozliczył/rozliczyła się w ${S.settlementCurrency}`,
    },
    pending: {
      success: F => `oczekujące rozliczenie @${F.nickname}`,
      error: generalCommunicationError
    },
    pendingParens: `(oczekujące)`,
    confirmation: {
      transaction: CP => `Transakcja z ${CP} został potwierdzona`,
      settlement: CP => `Rozliczenie z ${CP} zostało potwierdzone`,
      error: `Nie udało się potwierdzić transakcji, spróbuj ponownie później`,
    },
    rejection: {
      success: `Transakcja została odrzucona`,
      error: `Nie udało się odrzucić transakcji, spróbuj ponownie później`,
    },
    balances: {
      error: `Nie udało się załadować stanu konta, spróbuj ponownie później`,
    },
    for: M => `dla ${M}`,
    settleUp: `Rozlicz Się`,
    settleTotal: `Rozlicz Całość`,
    settleUpMemo: (D, A) => `${D === 'lend'? 'Rozliczenie za': 'Rozlicz za'} ${A} `,
    recordSettleUpMemo: `rozliczenia`,
    balanceByCurrency: `Detale`,
  },
  settlementManagement: {
    bilateral: {
      error: {
        insufficient: X => `Rozliczenie z ${X} nie powiodło się z powodu niewystarczających funduszy`,
        generic: X => `Wystąpił błąd podczas przetwarzania rozliczenie z ${X}`,
      }
    },
    eth: `Rozliczenia z ETH`,
    paypal: `Rozliczenia z PayPal`,
    nonPayment: `Zapisz Rozliczenie`,
  },

  accountViewLanguage: {
    lndr: `L n d r`,
    home: `Główna`,
    friends: `Znajomi`,
    activity: `Aktywność`,
  },

  notifications: {
    toggleNotifications: `Powiadomienia`,
    enable: `Włącz`,
    disable: `Wyłącz`,
  },

  pendingTransactionsLanguage: {
    shell: `Transakcja w toku`,
    title: `Oczekujące`,
    memo: `Notatka:`,
    for: `Dla`,
    none: `Nie masz żadnych oczekujących transakcji`,
    confirmationQuestion: `Czy na pewno chcesz, potwierdzić tę transakcję?`,
    pendingAnnouncement: `Transakcja czeka na potwierdzenie przez drugą stronę.`,
    bilateral: `Oczekiwanie na transfer Eth`,
    confirm: `Potwierdź`,
    reject: `Odrzucić Transakcję`,
    rejectRequest: `Odrzuć`,
    cancel: `Anuluj transakcję`,
    direction: {
      lend: (X, Z) => `@${X} jest Ci dłużny/dłużna Ci ${Z}`,
      borrow: (X, Z) => `Jesteś dłużny/dłużna @${X} ${Z}`,
    }
  },

  pendingSettlementsLanguage: {
    shell: `Rozliczenie w toku`,
    title: `Oczekujące`,
    none: `Nie masz żadnych oczekujących rozliczeń`,
    confirm: `Potwierdź`,
    reject: `Odrzuć Rozliczenie`,
    cancel: `Anuluj Rozliczenie`,
  },

  recentTransactionsLanguage: {
    title: `Zakończono`,
    none: `Nie masz zakończonych transakcji`,
    direction: {
      lend: (X, Z) => `@${X} Jest Ci dłużny/dłużna ${Z}`,
      borrow: (X, Z) => `Jesteś dłużny/dłużna @${X} ${Z}`
    },
    balance: `Saldo`,
    consolidatedBalance: `Saldo`,
    friends: FS => `(z ${FS} ${FS === 1 ? 'znajomy' :'Znajomi'})`,
  },

  tabs: {
    home: `Główna `,
    friends: `Znajomi`,
    activity: `Aktywność`,
  },

  confirmation: {
    shell: `Potwierdzenie`,
    done: `Gotowe`,
    create: {
      start: `Wysłaliśmy dokument do `,
      end: `, aby dokonał potwierdzenia.`,
    },
    confirm: {
      start: `Zatwierdziłeś/zatwierdziłaś dokument od `,
      end: `.`,
    },
    reject: {
      start: `Poinformujemy `,
      end: `, że odrzuciłeś/odrzuciłaś ten dokument.`,
    },
    confirmFriend: {
      start: `Jesteś znajomym `,
      end: `!`,
    },
    rejectFriend: {
      start: `Odrzuciłeś/odrzuciłaś zaproszenie od `,
      end: `.`,
    },
    ethSent: {
      start: `Udało się wysłać `,
      end: ` ETH, hash dla tej transakcji to `,
    },
    bcptSent: {
      start: `Udało się wysłać `,
      end: ` BCPT, hash dla tej transakcji to `,
    },
    status: `Można sprawdzić status transakcji w `,
    activity: `zakładce aktywności.`,
  },

  pendingFriendRequestsLanguage: {
    shell: `Prośba o Przyjęcie do grona Znajomych`,
    message: `Prośby o Przyjęcie do grona Znajomych`,
    request: F => `@${F} chce być Twoim znajomym!`,
  },

  privacyPolicy: {
    link: `lndr.io/terms/`,
    message: `Klikając poniżej, potwierdzasz, że przeczytałeś i zgadzasz się z polityką prywatności Blockmason użytkownika. Blockmason może wykorzystywać Twój adres e-mail do wysyłania aktualizacji o Blockmason i LNDR. Oto link do polityki prywatności:`
  },

  payPalLanguage: {
    connectPayPal: `Podłączyć PayPal`,
    connectSuccess: `PayPal włączona pomyślnie.`,
    disconnectPayPal: `Odłączyć PayPal`,
    disconnected: `PayPal odłączony.`,
    requestPayPalPayment: `Żądanie płatności PayPal`,
    sendWithPayPal: `Wyślij Z PayPal`,
    enablePayPal: `Włącz PayPal`,
    requestPayPalPayee: `Prośba PayPal`,
    enablePayPalForFriend: F => `Włączanie PayPal umożliwia @${F} zapłacić you.`,
    friendNotEnabled: F => `@${F} nie włączył PayPal płatności.`,
    friendRequestedConnect: F => `@${F} chce zapłacić za PayPal`,
    requestFriendConnect: F => `Pytałeś @${F}, aby umożliwić PayPal`,
  }
}
