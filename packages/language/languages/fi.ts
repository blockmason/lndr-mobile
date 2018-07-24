import { currencySymbols, transferLimits } from 'lndr/currencies'

const CUR = currencySymbols
const TL = transferLimits

const generalCommunicationError = 'Tällä hetkellä palvelimeen ei saada yhteyttä, yritä myöhemmin uudelleen.'

export default {

  applicationName: `Lndr`,
  helloWorld: `Hei maailma`,
  submit: `LÄHETÄ`,
  next: `Seuraava`,
  cancel: `Peruuta`,
  back: `Palaa takaisin`,
  copy: `Kopioi leikepöydälle`,
  confirmAccount: `Vahvista`,
  createAccount: `Luo tili`,
  recoverAccount: `Palauta tili`,
  removeAccount: `Poista tili`,
  updateAccount: `Päivitä tili`,
  loginAction: `Avaa`,
  enterPin: `SYÖTÄ PIN-KOODISI`,
  changePin: `Muuta PIN-koodisi`,
  enterCurrentPin: `Syötä nykyinen PIN-koodisi`,
  logoutAction: `KIRJAUDU ULOS`,
  seeAllActivity: `Katso kaikki tapahtumat`,
  copiedClipboard: `Kopioitu leikepöydälle`,
  pleaseWait: `Odota`,
  addFriend: `Lisää ystävä`,
  addFriendConfirmationQuestion: `Oletko varma, että haluat lisätä tämän käyttäjän ystäväksi?`,
  removeFriend: `Poista ystävä`,
  currentFriends: `Nykyiset ystävät`,
  removeFriendConfirmationQuestion: `Oletko varma, että haluat poistaa tämän käyttäjän ystävistäsi?`,
  inviteFriends: `Kutsu ystäviäsi käyttämään Lndr-sovellusta`,
  tryLndr: `Kokeile Lndr-sovellusta tässä:`,
  friendInfo: `Lisätietoja tästä ystäväsuhteesta:`,
  noFriends: `Aloita lisäämällä ystäviä!`,
  noMatches: `Sopivaa käyttäjää ei löydy`,
  noBalances: `Sinulla ei ole tallennettuja velkoja`,
  addFriendButton: `Lisää ystävä`,
  alreadyFriendsButton: `Ystävät`,
  friendShell: `Ystävä`,
  tip: `Vinkki:`,
  notice: `Ilmoitus:`,
  welcome: `Tervetuloa LNDR-maailmaasi`,
  noBalanceWarning: `Emme pystyneet lataamaan saldoasi tällä hetkellä, yritä myöhemmin uudelleen.`,
  totalBalance: `Kokonaissaldo:`,
  totalBalances: `Kaikki vastapuolet:`,
  newTransaction: `Uusi tapahtuma`,
  needsReview: `Odottaa hyväksyntää`,
  owesMe: `Minulle ollaan velkaa `,
  iOwe: `Olen velkaa muille`,
  newPassword: `Uusi salasana (vähintään 8 merkkiä)`,
  confirmPassword: `Vahvista salasana`,
  newPin: `Uusi 4-numeroinen PIN-koodisi`,
  enterNewPin: `LUO UUSI 4-NUMEROINEN PIN-KOODISI`,
  confirmPin: `VAHVISTA PIN-KOODISI`,
  newAccount: `Luo uusi tili`,
  loginAccount: `Avaa tilisi`,
  recoverExistingAccount: `Palauta olemassa oleva tili`,
  recoverMnemonic: `Muistisääntö (12 sanaa on näkyvissä, kun luot tilin)`,
  recoverMnemonicLengthError: `Muistisäännön pitäisi sisältää täsmälleen 12 sanaa`,
  successTitle: `Menestys`,
  errorTitle: `Virhe`,
  showMnemonic: `Näytä 12-sanainen muistisääntö`,
  mnemonicExhortation: `Sinulta vaaditaan tämä 12-sanainen lause, kun haluat palauttaa tilisi - pidä se turvassa ja salassa muilta`,
  addressExhortation: `Lähetä Ethereum osoitteeseesi, jotta voit maksaa velkasi Lndr-sovelluksessa`,
  removeAccountTitle: `Oletko varma, että haluat poistaa tilisi tältä laitteelta?`,
  removeAccountExhortation: `Varmista, että sinulla on pääsy muistisääntöön joka tarvitaan tilisi palauttamiseksi, sillä tämä toiminto poistaa tilisi pysyvästi  tältä laitteelta.`,
  myAccount: `Tilini`,
  setNickname: `Luo käyttäjänimi, jolla ystäväsi voi hakea sinua `,
  setEmail: `Syötä sähköpostiosoite, johon voit saada tietoja Lndr-päivityksistä`,
  nickname: `Käyttäjänimi (pieniä kirjaimia ja numeroita)`,
  email: `Sähköpostiosoite`,
  accountManagement: {
    nickname: {
      lengthViolation: `Käyttäjänimen pitäisi sisältää vähintään 3 merkkiä.`,
      compositionViolation: `Käyttäjänimi voi sisältää vain numeroita ja pikkukirjaimia.`,
      duplicationViolation: `Tämä käyttäjänimi on jo varattu`,
    },
    email: {
      compositionViolation: `Sähköpostiosoitteen muoto on virheellinen`,
      duplicationViolation: `Tämä sähköpostiosoite on jo käytössä`,
    },
    pin: {
      lengthViolation: `PIN-koodin pitäisi olla vähintään 4 merkkiä.`,
      matchViolation: `PIN-koodien pitäisi olla identtisiä.`,
      failedHashComparison: `Valitsemasi PIN-koodi ei kelpaa, yritä uudelleen.`,
      updateSuccess: `PIN-koodisi on päivitetty`,
      updateError: `PIN-koodin päivittämisen yhteydessä on tapahtunut virhe`,
    },
    mnemonic: {
      lengthViolation: `Muistisäännön pitäisi sisältää vähintään 12 sanaa.`,
      unableToValidate: `Valitsemasi muistisääntö ei kelpaa, yritä uudelleen.`,
    },
    setNickname: {
      success: `Käyttäjänimesi on tallennettu.`,
      error: generalCommunicationError
    },
    setEmail: {
      success: `Sähköpostiosoitteesi on tallennettu.`,
      error: generalCommunicationError
    },
    lockTimeout: {
      top: `Sinun on syötettävä PIN-koodisi uudelleen, kun on kulunut`,
      bottom: `minuuttia ilman toimintaa`,
      update: `Päivitä`,
      error: `Emme voineet päivittää tilisi asetuksia`,
      success: `Lukituksen aika-asetukset on päivitetty`,
    },
    addFriend: {
      success: X => `Ystäväpyyntö lähetetty @${X}:lle`,
      error: generalCommunicationError
    },
    removeFriend: {
      success: X => `Poistettu ystävistä: @${X}`,
      error: generalCommunicationError
    },
    loadInformation: {
      error: generalCommunicationError
    },
    ethBalance: {
      display: Y => `ETH-saldosi on ${String (Y) .slice (0,8)}`,
      inFiat: (Z, B, A) => ` (${CUR(A)}${String(Number(Z) * Number(B)).slice(0, 8)})`,
      getError: `Emme pystyneet hakea Eth-saldoa`,
      manage: `Hallitse ETH:ta`,
    },
    sendEth: {
      error: {
        insufficient: `Sinulla ei ole tarpeeksi ETH:tä tämän tapahtuman toteuttamiseksi`,
        generic: `Siirron yhteydessä on tapahtunut virhe, yritä myöhemmin uudelleen`,
        address: `Syötä kelvollinen osoite`,
        amount: `Anna summa, joka on suurempi kuin 0`,
        limitExceeded: A => `Voit lähettää vain ${CUR(A)} ${TL(A)} viikossa, valitse pienempi summa`
      },
      amount: `Lähetettävä summa`,
      address: `Kohdeosoite (ilman '0x' -etuliitettä)`,
      transfer: `Siirrä ETH`,
      transferAll: `Siirrä kaikki`,
      balance: Y => `Nykyinen ETH-saldosi on ${typeof Y === 'string' ? Y.slice (0,8): ''} `,
      ethAddress: `Ethereum-osoite`,
      txCost: (B, A) => `Nykyinen tapahtuma maksaa ${CUR(A)} ${B}`,
      transferLowercase: `Siirrä Eth`,
      note: A => `Huom.: Voit siirtää Lndr-sovelluksesta vain ${CUR(A)} ${TL(A)} viikossa`,
      warning: (Z, A) => `Sinulla on jäljellä ${CUR(A)} ${Z}, ennen kuin saavutat ${CUR(A)} ${TL(A)} ylärajasi`,
    },
    sendBcpt: {
      error: {
        insufficient: `Sinulla ei ole tarpeeksi BCPT:tä tämän tapahtuman toteuttamiseksi`,
        generic: `Siirron yhteydessä on tapahtunut virhe, yritä myöhemmin uudelleen`,
      },
      transfer: `Siirrä BCPT`,
      address: `Kohdeosoite (ilman '0x' -etuliitettä)`,
      balance: Y => `Nykyinen BCPT-saldosi on ${typeof Y === 'string' ? Y.slice (0,8): ''} `,
      bcptAddress: `BCPT-Osoite`,
    },
    changeProfilePic: `Napsauta, jos haluat muuttaa`,
    addProfilePic: `Käytä puhelimessa olevaa kuvaa`,
    panelHeaders: [
      `ETH (& BCPT) Osoite`,
      `ETH-saldo`,
      `BCPT-saldo`,
      `Poista tili`,
      `ETH-tapahtumahistoria`,
      `Muuta päävaluutta`,
      `Muuta PIN-koodisi`,
      `Muuta käyttäjänimesi`,
      `Muuta sähköpostiosoitteesi`,
      `Vaihda profiilikuva`,
      `Muuta lukituksen aika-asetukset`,
      `Muistisääntö`,
      `Ilmoitukset`,
    ],
    viewEtherscan: `Näytä Etherscan-tapahtumahistoriaa`,
    profilePic: {
      change: `Vaihda profiilikuva`,
      setError: `Kuvan lataamisen yhteydessä on tapahtunut virhe, yritä myöhemmin uudelleen`,
      getError: `Profiilikuvan noudattamisen yhteydessä on tapahtunut virhe, yritä myöhemmin uudelleen`,
      setSuccess: `Profiilikuva on päivitetty`,
    },
    logoutSuccess: `Olet onnistuneesti kirjautunut ulos!`,
    logoutError: generalCommunicationError,
  },

  currentBalance: {
    eth: `Nykyinen Eth-saldosi on:`,
    bcpt: `Nykyinen BCPT-saldosi on:`,
  },

  welcomeView: {
    by: `TEKIJÄ:`,
    makeItEasy: `Lndr-sovelluksen avulla on helppo seurata yksinkertaisia ​​velkoja`,
    weHelpFriends: `Autamme ystäviämme elämään, työskentelemään ja pelaamaan `,
    len: `Len`,
    dot: `.`,
    der: `der`,
    shareDinner: `Jaa illallisesi`,
    fillTank: `Täytä bensatankkisi`,
    travelTogether: `Matkusta ystävien kanssa`,
    runEthereum: `Me toimimme ETH:lla!`,
    firstLendingApp: `Ensimmäinen mobiili lainasovellus, joka hyödyntää blockchain-teknologiaa.`,
    greatConcert: `Käy katsomassa upeata konserttia`,
    youPlayWithFriends: `Vietät aikaa ystäviesi kanssa; \ ja me pidämme laskua silmällä….`,
    start: `Aloita`,
  },

  debtManagement: {
    shell: `Uusi tapahtuma`,
    add: `Lisää velka`,
    selectFriend: `Valitse`,
    lend: `Uusi laina`,
    borrow: `Uusi velka`,
    iLent: `Ystävä on minulle velkaa`,
    iBorrowed: `Olen velkaa ystävälle`,
    settleUpLower: `Sovi velan maksamisesta`,
    amountToSettle: `Maksettava summa`,
    total: `Yhteissumma`,
    record: `merkintä`,
    records: `merkinnät`,
    chooseCurrency: `Valitse valuutta`,
    
    createError: {
      amountTooLow: `Summan on oltava suurempi kuin $ 0`,
      amountTooHigh: `Summan on oltava alle $ 1000000000`,
      selfAsFriend: `Et voi olla velkaa itsellesi, valitse toinen ystävä`,
      pending: `Suorita loppuun odotustilassa oleva tapahtuma, joka on sinun ja tämän käyttäjän välillä ennen uuden tapahtuman luomista`,
      insufficientEth: E => `Tarvitset vähintään ${E} ETH:ta velan maksamiseen, näet saldosi Asetuksista.`,
    },
    fields: {
      currency: `Valuutta`,
      amount: `Summa`,
      settlementAmount: `Maksettava summa`,
      selectFriend: `Ystävä`,
      memo: `Muistio`,
      direction: `Valitse oikea tiliote`,
    },
    memo: {
      example: `Kirjoita muistiosi tähän`,
    },
    direction: {
      lend: X => `${X} on velkaa minulle`,
      borrow: X => `olen velkaa ${X}:lle`,
      initiatedLend: X => `${X} sanoo, että hän on velkaa`,
      initiatedBorrow: X => `${X} sanoo, että olen velkaa hänelle`,
      pendingLend: X => `@${X} on velkaa sinulle`,
      pendingBorrow: X => `Sinä olet velkaa @${X}:lle`,
      pendingLendSettlement: S => `@${S.debtorNickname} pyytää, että maksat tässä valuutassa: ${S.settlementCurrency}`,
      pendingBorrowSettlement: S => `@${S.creditorNickname} haluaa maksaa sinulle tässä valuutassa: ${S.settlementCurrency}`,
      pendingLendSettlementMe: S => `Halusit maksaa velkasi @${S.debtorNickname}:lle tässä valuutassa: ${S.settlementCurrency}`,
      pendingBorrowSettlementMe: S => `Pyysit, että @${S.creditorNickname} maksaa sinulle velkansa tässä valuutassa: ${S.settlementCurrency}`,
    },
    pending: {
      success: F => `Odotustilassa olevat velat, jotka on toimitettu @${F.nickname}:lle`,
      error: generalCommunicationError
    },
    pendingParens: `(Odotustilassa)`,
    confirmation: {
      transaction: CP => `Tapahtuma ${CP}:n kanssa on vahvistettu`,
      settlement: CP => `Velan maksu  ${CP}:lle on vahvistettu`,
      error: `Emme voineet vahvistaa tapahtumaa tällä hetkellä, yritä myöhemmin uudelleen`,
    },
    rejection: {
      success: `Tapahtuma on hylätty`,
      error: `Emme voineet hylätä tapahtumaa tällä hetkellä, yritä myöhemmin uudelleen`,
    },
    balances: {
      error: `Emme voineet ladata saldoja tällä hetkellä, yritä myöhemmin uudelleen`,
    },
    for: M => `tarkoittaa ${M}`,
    settleUp: `Sovi velan maksamisesta`,
    settleTotal: `Maksettavien velkojen kokonaissumma`,
    settleUpMemo: (D, A) => `${D === 'lend' ? 'Maksetaan velkaa' : 'Pyydetään velan maksua summasta'} ${A}`,
    recordSettleUpMemo: `Maksetaan velka`,
    balanceByCurrency: `Yksityiskohdat`,
  },
  settlementManagement: {
    bilateral: {
      error: {
        insufficient: X => `Velan maksu ${X}:lle epäonnistui, koska tililläsi olevat varat eivät riitä`,
        generic: X => `Tapahtui virhe, kun yritit maksaa velkasi ${X}:lle`
      }
    },
    eth: `Maksa velkasi ETH:lla`,
    paypal: `Maksa velkasi PAYPAL:lla`,
    nonPayment: `Kirjaa maksu`,
  },

  accountViewLanguage: {
    lndr: `L n d r`,
    home: `Koti`,
    friends: `Ystävät`,
    activity: `Tapahtumat`,
  },

  notifications: {
    toggleNotifications: `Toggle-ilmoitukset`,
    enable: `Kytke päälle`,
    disable: `Kytke pois päältä`,
  },

  pendingTransactionsLanguage: {
    shell: `Odotustilassa oleva tapahtuma`,
    title: `Odotustilassa`,
    memo: `Muistio:`,
    for: `varten`,
    none: `Sinulla ei ole odotustilassa olevia tapahtumia`,
    confirmationQuestion: `Oletko varma, että haluat vahvistaa tämän tapahtuman?`,
    pendingAnnouncement: `Toinen osapuoli odottaa tämän tapahtuman vahvistusta.`,
    bilateral: `Odotetaan, että Eth-siirto on saatu loppuun`,
    confirm: `Vahvista`,
    reject: `Hylkää tapahtuma`,
    rejectRequest: `Hylkää`,
    cancel: `Peruuta tapahtuma`,
    direction: {
      lend: (X, Z) => `@${X} on velkaa sinulle ${Z}`,
      borrow: (X, Z) => `Sinä olet velkaa @${X} ${Z}:lle`,
    }
  },

  pendingSettlementsLanguage: {
    shell: `Odotustilassa oleva maksu`,
    title: `Odotustilassa`,
    none: `Sinulla ei ole odotustilassa olevia maksuja`,
    confirm: `Vahvista`,
    reject: `Hylkää maksu`,
    cancel: `Peruuta maksu`,
  },

  recentTransactionsLanguage: {
    title: `Valmis`,
    none: `Sinulla ei ole loppuun suoritettuja tapahtumia`,
    direction: {
      lend: (X, Z) => `@${X} on velkaa sinulle ${Z}`,
      borrow: (X, Z) => `Sinä olet velkaa @${X} ${Z}:lle`,
    },
    balance: `Saldo`,
    consolidatedBalance: `Saldo`,
    friends: FS => `(alkaen ${FS} ${FS === 1? 'Ystävä': 'ystävät'})`,
  },

  tabs: {
    home: `Koti `,
    friends: `Ystävät`,
    activity: `Tapahtumat`,
  },

  confirmation: {
    shell: `Vahvistus`,
    done: `Tehty`,
    create: {
      start: `Olemme lähettäneet merkinnän `,
      end: ` vahvistettavaksi.`,
    },
    confirm: {
      start: `Olet vahvistanut tämän `,
      end: ` saadun merkinnän.`,
    },
    reject: {
      start: `Olemme ilmoittaneet `,
      end: `, että olet hylännyt tämä merkinnän.`,
    },
    confirmFriend: {
      start: `Sinä ja `,
      end: ` olette nyt ystäviä!`,
    },
    rejectFriend: {
      start: `Olet hylännyt `,
      end: ` ystäväpyynnön.`,
    },
    ethSent: {
      start: `Olet onnistuneesti lähettänyt `,
      end: ` ETH:ta ja tapahtumasi tunnusnumero on `,
    },
    bcptSent: {
      start: `Olet onnistuneesti lähettänyt `,
      end: ` BCPT:tä ja tapahtumasi tunnusnumero on `,
    },
    status: `Tämän tapahtuman tila `,
    activity: `näkyy tapahtumavalikossa.`,
  },

  pendingFriendRequestsLanguage: {
    shell: `Ystäväpyyntö`,
    message: `Ystäväpyynnöt`,
    request: F => `@${F} haluaa olla ystäväsi! `,
  },

  privacyPolicy: {
    link: `lndr.io/terms/`,
    message: `Klikkaamalla alla olevaa linkkiä vahvistaa, että olet lukenut ja hyväksynyt Blockmason-tietosuojakäytännön. Blockmason voi käyttää sähköpostiosoitteesi lähettää päivityksiä Blockmason ja LNDR. Tässä on linkki tietosuojakäytäntöön:`
  },

  payPalLanguage: {
    connectPayPal: `Yhdistä PayPal`,
    connectSuccess: `PayPal käytössä onnistuneesti.`,
    disconnected: `PayPal irrotettu.`,
    requestPayPalPayment: `Pyydä PayPal`,
    sendWithPayPal: `Send PayPalin`,
    enablePayPal: `Ota PayPal`,
    requestPayPalPayee: `Pyydä PayPal`,
    enablePayPalForFriend: F => `ottaminen PayPalin avulla @${F} maksaa you.`,
    friendNotEnabled: F => `@${F} ei käytössä PayPal maksut.`,
    friendRequestedConnect: F => `@${F} haluaa maksaa sinulle kautta PayPal`,
    requestFriendConnect: F => `Kysyit @${F} jotta PayPal`,
  }
}
