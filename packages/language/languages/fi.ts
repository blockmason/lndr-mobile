import { currencies, transferLimits } from 'language'

const CUR = currencies
const TL = transferLimits

const generalCommunicationError = 'There was a problem communicating with the server, please try again later.'

export default {

  applicationName: `Lndr`,
  helloWorld: `Hei maailma`,
  submit: `LÄHETÄ`,
  next: `Seuraava`,
  cancel: `Peruuttaa`,
  back: `Mene takaisin`,
  copy: `Kopioi leikepöydälle`,
  confirmAccount: `Vahvistaa`,
  createAccount: `Luo tili`,
  recoverAccount: `Palauta tilin`,
  removeAccount: `Poista tili`,
  updateAccount: `Päivitä tili`,
  loginAction: `Avata`,
  enterPin: `Kirjoita PIN`,
  changePin: `Muuta PIN`,
  enterCurrentPin: `Anna nykyinen PIN`,
  logoutAction: `KIRJAUTUA ULOS`,
  seeAllActivity: `Kaikki toiminta`,
  copiedClipboard: `Kopioitu leikepöydälle`,
  pleaseWait: `Odota`,
  addFriend: `Lisää ystävä`,
  addFriendConfirmationQuestion: `Oletko varma, että haluat lisätä tämän käyttäjän ystäväksi?`,
  removeFriend: `Poista ystävä`,
  currentFriends: `nykyinen Ystävät`,
  removeFriendConfirmationQuestion: `Oletko varma, että haluat poistaa tämän käyttäjän ystävänä?`,
  inviteFriends: `Kutsua ystäviä Lndr`,
  tryLndr: `Tutustu Lndr App tässä:`,
  friendInfo: `Lisätietoja tästä ystävyydestä:`,
  noFriends: `Lisää kavereita päästä alkuun!`,
  noMatches: `Ei löydetty käyttäjiä`,
  noBalances: `Sinulla ei ole tallennettuja velkoja`,
  addFriendButton: `Lisää ystävä`,
  alreadyFriendsButton: `Ystävät`,
  friendShell: `ystävä`,
  tip: `Kärki:`,
  notice: `Ilmoitus:`,
  welcome: `Tervetuloa LNDR`,
  noBalanceWarning: `Emme voineet ladata saldosi tällä hetkellä, yritä myöhemmin uudelleen.`,
  totalBalance: `Kokonaissaldo:`,
  totalBalances: `Yhteensä vastapuolet:`,
  newTransaction: `uusi tapahtuma`,
  needsReview: `tarpeisiin Review`,
  owesMe: `Olen velkaa`,
  iOwe: `Olen velkaa joku`,
  newPassword: `Uusi salasana (vähintään 8 merkkiä)`,
  confirmPassword: `Vahvista salasana`,
  newPin: `Uusi 4-numeroinen PIN`,
  enterNewPin: `ASETA UUSI 4-DIGIT PIN`,
  confirmPin: `Vahvista PIN`,
  newAccount: `Luo uusi tili`,
  loginAccount: `Avata tilin`,
  recoverExistingAccount: `Palauttaa olemassa olevaan tiliin`,
  recoverMnemonic: `Muistisääntö (12 sanat näkyvät \ nKun loit tilin)`,
  recoverMnemonicLengthError: `Muistisääntö pitäisi olla täsmälleen 12 sanaa`,
  successTitle: `Menestys`,
  errorTitle: `Virhe`,
  showMnemonic: `Näytä 12-Word Mnemonic`,
  mnemonicExhortation: `Tämä 12-sana lause vaaditaan palauttamaan tiliä, pidä se turvallisessa paikassa ja salainen`,
  addressExhortation: `Lähetä Ethereum osoitteesi, jotta voit asettua velkojaan Lndr`,
  removeAccountTitle: `Oletko varma, että haluat poistaa tilin tältä laitteelta?`,
  removeAccountExhortation: `Varmista, että sinulla on pääsy muistisääntö palauttaa tilisi myöhemmin, sillä tämä on pysyvä poisto tilitiedot tästä laitteesta.`,
  myAccount: `Tilini`,
  setNickname: `Aseta lempinimi jotta ystäväsi voivat etsiä sinua`,
  setEmail: `Asettaa sähköpostia saada tietoa Lndr päivitykset`,
  nickname: `Nimimerkki (pieniä ja numerot)`,
  email: `Sähköpostiosoite`,
  accountManagement: {
    nickname: {
      lengthViolation: `Lempinimi tulisi olla vähintään 3 merkkiä.`,
      compositionViolation: `Lempinimi voi olla vain numeroita ja isoja kirjaimia.`,
      duplicationViolation: `Nimimerkki on jo varattu`,
    },
    email: {
      compositionViolation: `Sähköposti muoto ei kelpaa`,
      duplicationViolation: `Sähköpostiosoite on jo käytössä`,
    },
    pin: {
      lengthViolation: `PIN-koodin pitäisi olla vähintään 4 merkkiä.`,
      matchViolation: `PIN pitäisi vastata.`,
      failedHashComparison: `PIN ei kelpaa, yritä uudelleen.`,
      updateSuccess: `PIN on päivitetty`,
      updateError: `Virhe päivitettäessä PIN`,
    },
    mnemonic: {
      lengthViolation: `Muistisääntö tulee olla vähintään 12 sanaa.`,
      unableToValidate: `Syötettyä muistisääntö ei kelpaa, yritä uudelleen.`,
    },
    setNickname: {
      success: `Nimimerkkisi on tallennettu.`,
      error: generalCommunicationError
    },
    setEmail: {
      success: `Sähköpostiviesti on tallennettu.`,
      error: generalCommunicationError
    },
    lockTimeout: {
      top: `Sinun on kirjoitettava PIN jälkeen`,
      bottom: `minuuttiin`,
      update: `Päivittää`,
      error: `Emme voineet päivittää tilin asetuksia`,
      success: `Lukituksen aikakatkaisu Päivitetty`,
    },
    addFriend: {
      success: X => `Ystäväpyyntö lähetetty @${X}`,
      error: generalCommunicationError
    },
    removeFriend: {
      success: X => `Poistettu ystävät: @${X}`,
      error: generalCommunicationError
    },
    loadInformation: {
      error: generalCommunicationError
    },
    ethBalance: {
      display: Y => `Your ETH saldo on ${String (Y) .slice (0,8)}`,
      inFiat: (Z, B, A) => ` (${CUR[A]}${String(Number(Z) * Number(B)).slice(0, 8)})`,
      getError: `Voitu hakea Eth tasapainon`,
      manage: `Hallitse ETH`,
    },
    sendEth: {
      error: {
        insufficient: `Siirto epäonnistui, koska varat eivät riitä`,
        generic: `Virhe siirtoon, yritä myöhemmin uudelleen`,
        address: `Anna kelvollinen osoite`,
        amount: `Anna summa on suurempi kuin 0`,
        limitExceeded: A => `Voit lähettää ${CUR [A]} ${TL [A]} viikossa, valitse pienempi amount`
      },
      amount: `Määrä Lähetä`,
      address: `Kohdeosoite (ilman '0x' etuliite)`,
      transfer: `siirto ETH`,
      transferAll: `Siirrä kaikki`,
      balance: Y => `Nykyinen ETH saldo on ${typeof Y === 'string'? Y.slice (0,8): ''} `,
      ethAddress: `Ethereum Osoite`,
      txCost: (B, A) => `Nykyinen tapahtuma hinta on ${CUR [A]} ${B}`,
      transferLowercase: `Siirrä Eth`,
      note: A => `Huomaa: Voit siirtää ${CUR [A]} ${TL [A]} viikossa pois Lndr`,
      warning: (Z, A) => `Sinulla ${CUR [A]} ${Z} jäljellä oman ${CUR [A]} ${TL [A]} limit`,
    },
    sendBcpt: {
      error: {
        insufficient: `Sinulla ei ole tarpeeksi BCPT tähän tapahtumaan`,
        generic: `Virhe siirtoon, yritä myöhemmin uudelleen`,
      },
      transfer: `siirto BCPT`,
      address: `Kohdeosoite (ilman '0x' etuliite)`,
      balance: Y => `Nykyinen BCPT saldo on ${typeof Y === 'string'? Y.slice (0,8): ''} `,
      bcptAddress: `BCPT Osoite`,
    },
    changeProfilePic: `Napauttamalla Muuta`,
    addProfilePic: `Käytä Kuva Puhelin`,
    panelHeaders: [
      `ETH (& BCPT) Osoite`,
      `ETH Balance`,
      `BCPT Balance`,
      `ETH Tapahtumahistoria`,
      `Muuta PIN`,
      `Muutos Nimimerkki`,
      `Vaihda sähköposti`,
      `Vaihda profiilikuva`,
      `Muuta avain aikakatkaisu`,
      `Muistintuki`,
      `Ilmoitukset`,
    ],
    viewEtherscan: `Näytä Etherscan History`,
    profilePic: {
      change: `Vaihda profiilikuva`,
      setError: `Virhe ladattaessa kuvan, yritä myöhemmin uudelleen`,
      getError: `Virhe noudettaessa profiilikuva`,
      setSuccess: `Profiilikuva päivitetään`,
    },
    logoutSuccess: `Olet onnistuneesti kirjautunut ulos!`,
  },

  currentBalance: {
    eth: `Nykyinen Eth saldo on:`,
    bcpt: `Nykyinen BCPT saldo on:`,
  },

  welcomeView: {
    by: `RAKENTANUT`,
    makeItEasy: `Lndr on helppo seurata yksinkertaisia ​​velat`,
    weHelpFriends: `Autamme ystävät asua, työskennellä ja pelata yhdessä.`,
    len: `Len`,
    dot: `.`,
    der: `der`,
    shareDinner: `Jaa Illallinen`,
    fillTank: `Täytä Tankin`,
    travelTogether: `matkustaa yhdessä`,
    runEthereum: `Me ajaa ETH!`,
    firstLendingApp: `Ensimmäinen liikkuva luotonanto App kiinnitetty blockchain.`,
    greatConcert: `Katso Great Concert`,
    youPlayWithFriends: `Pelaat kanssa; \ n pidämme välilehti ...`,
    start: `Aloittaa`,
  },

  debtManagement: {
    shell: `uusi tapahtuma`,
    add: `Lisää Velka`,
    selectFriend: `valita`,
    lend: `uuden lainan`,
    borrow: `uutta velkaa`,
    iLent: `Ystävä on minulle velkaa`,
    iBorrowed: `Olen velkaa ystävä`,
    settleUpLower: `sopia maksamisesta`,
    amountToSettle: `Määrä asettua`,
    total: `Kaikki yhteensä`,
    record: `ennätys`,
    records: `asiakirjat`,
    createError: {
      amountTooLow: `Määrän on oltava suurempi kuin $ 0`,
      amountTooHigh: `Määrän on oltava alle $ 1000000000`,
      selfAsFriend: `Et voi luoda velkaa itsellesi, valitse toinen ystävä`,
      pending: `Ratkaise odottava transaktion tämän käyttäjän ennen luoda toinen`,
      insufficientEth: E => `Tarvitset vähintään ${E} ETH asettua valitsemalla Asetukset nähdä saldolla`,
    },
    fields: {
      amount: `Määrä`,
      settlementAmount: `korvaussummia`,
      selectFriend: `ystävä`,
      memo: `Muistio`,
      direction: `Valitse oikea Statement`,
    },
    memo: {
      example: `Muistio täällä`,
    },
    direction: {
      lend: X => `${X} velkojaan me`,
      borrow: X => `olen velkaa ${X}`,
      initiatedLend: X => `${X} sanoo / hän owes`,
      initiatedBorrow: X => `${X} sanoo, owe`,
      pendingLend: X => `@${X} velkaa you`,
      pendingBorrow: X => `Sinä olet velkaa @${X}`,
      pendingLendSettlement: S => `@${S.debtorNickname} pyytää ratkaisun ${S.settlementCurrency}`,
      pendingBorrowSettlement: S => `@${S.creditorNickname} haluaa asettua kanssasi ${S.settlementCurrency}`,
      pendingLendSettlementMe: S => `Pyysit tyytymään @${S.debtorNickname} on ${S.settlementCurrency}`,
      pendingBorrowSettlementMe: S => `Sinä pyytänyt @${S.creditorNickname} asettua ${S.settlementCurrency}`,
    },
    pending: {
      success: F => `maksamattomista veloista toimitettu @${F.nickname}`,
      error: generalCommunicationError
    },
    pendingParens: `(Vireillä)`,
    confirmation: {
      transaction: CP => `Transactionin ${CP} on vahvistettu`,
      settlement: CP => `ratkaisun kanssa ${CP} on vahvistettu`,
      error: `Pystynyt vahvistamaan tapahtuma tällä hetkellä, yritä myöhemmin uudelleen`,
    },
    rejection: {
      success: `Tapahtuma on hylätty`,
      error: `Pysty hylkäämään tapahtuman tällä hetkellä, yritä myöhemmin uudelleen`,
    },
    balances: {
      error: `Ei voitu ladata saldot tällä hetkellä, yritä myöhemmin uudelleen`,
    },
    for: M => `for ${M}`,
    settleUp: `sopia maksamisesta`,
    settleTotal: `asettua Yhteensä`,
    settleUpMemo: (D, A) => `${D === 'lend'? 'Settling varten': 'Pyyntö tyytymään'} ${A} `,
    recordSettleUpMemo: `selvittämisestä ylös`,
  },
  settlementManagement: {
    bilateral: {
      error: {
        insufficient: X => `Your ratkaisun kanssa ${X} epäonnistui riittämättömän funds`,
        generic: X => `virhe käsiteltäessä ratkaisun kanssa ${X}`
      }
    },
    eth: `Asettua ETH`,
    nonPayment: `Nauhoittaa Settlement`,
  },

  accountViewLanguage: {
    lndr: `L n d r`,
    home: `Koti`,
    friends: `Ystävät`,
    activity: `aktiviteetti`,
  },

  notifications: {
    toggleNotifications: `toggle Ilmoitukset`,
    enable: `Kiihottua`,
    disable: `Sammuttaa`,
  },

  pendingTransactionsLanguage: {
    shell: `Odottaa Transaction`,
    title: `odotettaessa`,
    memo: `Muistio:`,
    for: `varten`,
    none: `Sinulla ei ole vireillä liiketoimia`,
    confirmationQuestion: `Oletko varma, että haluat vahvistaa tämän tapahtuman?`,
    pendingAnnouncement: `Tämä tapahtuma odottaa vahvistusta toisen osapuolen.`,
    bilateral: `Odotetaan Eth siirto loppuun`,
    confirm: `Vahvistaa`,
    reject: `Hylkää Transaction`,
    rejectRequest: `Hylätä`,
    cancel: `Peruuta tapahtuma`,
    direction: {
      lend: (X, Z) => `@${X} on velkaa sinulle ${Z}`,
      borrow: (X, Z) => `Sinä olet velkaa @${X} ${Z}`,
    }
  },

  pendingSettlementsLanguage: {
    shell: `Odottaa Settlement`,
    title: `odotettaessa`,
    none: `Sinulla ei ole vireillä siirtokuntia`,
    confirm: `Vahvistaa`,
    reject: `Hylkää Settlement`,
    cancel: `Peruuta Settlement`,
  },

  recentTransactionsLanguage: {
    title: `valmistunut`,
    none: `Sinulla ei ole kaupoista`,
    direction: {
      lend: (X, Z) => `@${X} on velkaa sinulle ${Z}`,
      borrow: (X, Z) => `Sinä olet velkaa @${X} ${Z}`,
    },
    balance: `Saldo`,
    friends: FS => `(alkaen ${FS} ${FS === 1? 'Ystävä': 'Ystävät'})`,
  },

  tabs: {
    home: `Koti`,
    friends: `Ystävät`,
    activity: `aktiviteetti`,
  },

  confirmation: {
    shell: `Vahvistus`,
    done: `Tehty`,
    create: {
      start: `Olemme lähettäneet ennätys yli `,
      end: ` vahvistusta.`,
    },
    confirm: {
      start: `Olet vahvistanut tämän tietueen `,
      end: `.`,
    },
    reject: {
      start: `Olemme ilmoittaneet `,
      end: ` tietää, että olet hylännyt tämä levy.`,
    },
    confirmFriend: {
      start: `Olet nyt ystäviä X`,
      end: `!`,
    },
    rejectFriend: {
      start: `Hylkäsit ystävä pyynnön`,
      end: `.`,
    },
    ethSent: {
      start: `Olet onnistui `,
      end: ` ETH ja lippuostoksesi hash on `,
    },
    bcptSent: {
      start: `Olet onnistui `,
      end: `BCPT ja lippuostoksesi hash on `,
    },
    status: `Näet tilan Kaupan `,
    activity: `aktiviteetin välilehti.`,
  },

  pendingFriendRequestsLanguage: {
    shell: `Kaveripyyntö`,
    message: `Ystäväpyyntöjä`,
    request: F => `${F} haluaa olla ystäväsi! `,
  }
}
