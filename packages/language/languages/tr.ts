import { currencySymbols, transferLimits } from 'lndr/currencies'

const CUR = currencySymbols
const TL = transferLimits

const generalCommunicationError = 'Sunucuyla iletişimde bir sorun oluştu, lütfen daha sonra tekrar deneyiniz.'

export default {

  applicationName: `Lndr`,
  helloWorld: `Merhaba Dünya`,
  submit: `GÖNDER`,
  next: `İleri`,
  cancel: `İptal et`,
  back: `Geri dön`,
  copy: `Panoya kopyala`,
  confirmAccount: `Onayla`,
  createAccount: `Hesap Oluştur`,
  recoverAccount: `Hesap Kurtarma`,
  removeAccount: `Hesabı Kaldır`,
  updateAccount: `Hesabı güncelle`,
  loginAction: `Kilidini aç`,
  enterPin: `Lütfen PİN kodunuzu girin`,
  changePin: `PİN'i değiştir`,
  enterCurrentPin: `Güncel PİN'i girin`,
  logoutAction: `ÇIKIŞ YAP`,
  seeAllActivity: `Tüm Hareketleri Görüntüle`,
  copiedClipboard: `Panoya kopyalandı`,
  pleaseWait: `Lütfen Bekleyin`,
  addFriend: `Arkadaş Ekle`,
  addFriendConfirmationQuestion: `Bu kullanıcıyı arkadaş olarak eklemek istediğine emin misin?`,
  removeFriend: `Arkadaş Sil`,
  currentFriends: `Güncel Arkadaşlar`,
  removeFriendConfirmationQuestion: `Bu kullanıcıyı arkadaşlarınızdan kaldırmak istediğinizden emin misiniz?`,
  inviteFriends: `Arkadaşlarını Lndr ’a Davet Et`,
  tryLndr: `Lndr Uygulamasını buradan deneyin:`,
  friendInfo: `Bu dostluk hakkında daha fazla bilgi:`,
  noFriends: `Başlamak için birkaç arkadaş ekle!`,
  noMatches: `Eşleşen kullanıcı bulunamadı`,
  noBalances: `Hiç kayıtlı borcunuz bulunmamakta`,
  addFriendButton: `Arkadaş Ekle`,
  alreadyFriendsButton: `Arkadaşlar`,
  friendShell: `Arkadaş`,
  tip: `İpucu:`,
  notice: `Uyarı:`,
  welcome: `LNDR ’ına hoş geldin`,
  noBalanceWarning: `Şu anda bakiyenizi yükleyemedik, daha sonra tekrar deneyin.`,
  totalBalance: `Toplam Bakiye:`,
  totalBalances: `Toplam karşı taraf:`,
  newTransaction: `Yeni İşlem`,
  needsReview: `Onay beklemede`,
  owesMe: `Bana borçlu olunan`,
  iOwe: `Başkasına borçlu olduğum`,
  newPassword: `Yeni Şifre (en az 8 karakter)`,
  confirmPassword: `Şifreyi Onayla`,
  newPin: `Yeni 4 haneli PİN`,
  enterNewPin: `LÜTFEN 4 HANELİ YENİ BİR PİN AYARLAYIN`,
  confirmPin: `LÜTFEN PİN’İNİZİ ONAYLAYIN`,
  newAccount: `Yeni bir hesap oluştur`,
  loginAccount: `Hesabınızın kilidini kaldırın`,
  recoverExistingAccount: `Mevcut bir hesabı kurtar`,
  recoverMnemonic: `Anımsatıcı Kod (Hesabınızı oluştururken \n bu 12 kelime görüntülenir)`,
  recoverMnemonicLengthError: `Anımsatıcı Kod tam olarak 12 kelime olmalıdır`,
  successTitle: `Başarılı`,
  errorTitle: `Hata`,
  showMnemonic: `12-Kelimelik Anımsatıcı Kodu göster`,
  mnemonicExhortation: `Bu 12 kelimelik öbek hesabınızı kurtarmak için gereklidir, lütfen gizli ve güvenli bir yerde saklayın.`,
  addressExhortation: `Lndr üzerindeki borçları kapatmak için adresinize Ethereum gönderin`,
  removeAccountTitle: `Bu cihazdan hesabınızı kaldırmak istediğinize emin misiniz?`,
  removeAccountExhortation: `Daha sonra hesabınızı kurtarmak için anımsatıcı kodunuza erişiminiz olduğundan emin olun, çünkü bu hareket hesap bilgilerinizin bu cihazdan kalıcı olarak silinmesi anlamına gelmektedir.`,
  myAccount: `Hesabım`,
  setNickname: `Bir kullanıcı adı seçin böylece arkadaşlarınız sizi arayabilsinler`,
  setEmail: `Lndr güncellemeleri hakkında bilgi almak için bir e-posta girin`,
  nickname: `Kullanıcı adı (sadece küçük harfler ve sayılar)`,
  email: `E-posta Adresi`,
  accountManagement: {
    nickname: {
      lengthViolation: `Kullanıcı adı en az 3 karakter olmalıdır.`,
      compositionViolation: `Kullanıcı adı yalnızca sayıları ve küçük harfleri içerebilir.`,
      duplicationViolation: `Kullanıcı adı zaten alınmış`,
    },
    email: {
      compositionViolation: `E-posta biçimi yanlış`,
      duplicationViolation: `E-posta zaten alınmış`,
    },
    pin: {
      lengthViolation: `PİN en az 4 karakter uzunluğunda olmalıdır.`,
      matchViolation: `PİN'ler eşleşmesi gerekir.`,
      failedHashComparison: `PİN geçerli değil, lütfen tekrar deneyin.`,
      updateSuccess: `PİN güncellendi`,
      updateError: `PİN güncellenirken bir hata oluştu`,
    },
    mnemonic: {
      lengthViolation: `Anımsatıcı kod en az 12 kelime olmalıdır.`,
      unableToValidate: `Girilen anımsatıcı kod doğru değil, lütfen tekrar deneyin.`,
    },
    setNickname: {
      success: `Kullanıcı adınız kaydedildi.`,
      error: generalCommunicationError
    },
    setEmail: {
      success: `E-posta’nız kaydedildi.`,
      error: generalCommunicationError
    },
    lockTimeout: {
      top: ``,
      bottom: `dakika hareketsiz olunca PIN’inizi yeniden girmeniz gereklidir.`,
      update: `Güncelleştirme`,
      error: `Hesap ayarlarınızı güncelleştiremedik`,
      success: `Kilitleme Süresi Güncellendi`,
    },
    addFriend: {
      success: X => `@${X}’a arkadaşlık isteği gönderildi`,
      error: generalCommunicationError
    },
    removeFriend: {
      success: X => `@${X} arkadaşlardan çıkarıldı`,
      error: generalCommunicationError
    },
    loadInformation: {
      error: generalCommunicationError
    },
    ethBalance: {
      display: Y => `ETH bakiyeniz ${String (Y) .slice (0,8)}`,
      inFiat: (Z, B, A) => ` (${CUR(A)}${String(Number(Z) * Number(B)).slice(0, 8)})`,
      getError: `Eth bakiyesi çekilemedi`,
      manage: `ETH yönetimi`,
    },
    sendEth: {
      error: {
        insufficient: `Bu işlem için yeterli ETH ‘niz mevcut değil`,
        generic: `Aktarımda bir sorun oluştu, lütfen daha sonra tekrar deneyin`,
        address: `Lütfen geçerli bir adres girin`,
        amount: `Lütfen 0’dan yüksek bir tutar girin`,
        limitExceeded: A => `Haftada sadece ${CUR(A)}${TL(A)} gönderebilirsiniz, daha düşük bir miktar seçiniz`
      },
      amount: `Gönderilecek Tutar`,
      address: `Hedef Adres ('0x' ön eki olmadan)`,
      transfer: `ETH Aktar`,
      transferAll: `Her şeyi aktarın`,
      balance: Y => `Mevcut ETH bakiyeniz ${typeof Y === 'string' ? Y.slice(0,8) :''}`,
      ethAddress: `Ethereum Adresi`,
      txCost: (B, A) => `Mevcut işlem maliyeti ${CUR(A)}${B} 'dir` ,
      transferLowercase: `ETH Aktar`,
      note: A => `Lütfen dikkat: Lndr dışına haftada sadece ${CUR(A)}${TL(A)} aktarabilirsiniz`,
      warning: (Z, A) => `${CUR(A)}${TL(A)} limitinizin ${CUR(A)}${Z} kısmı kalmış bulunmaktadır`
    },
    sendBcpt: {
      error: {
        insufficient: `Bu işlem için yeterli BCPT ‘niz mevcut değil`,
        generic: `Aktarımda bir hata oluştu, lütfen daha sonra tekrar deneyin`,
      },
      transfer: `BCPT aktar`,
      address: `Hedef Adresi ( '0x' ön eki olmadan)`,
      balance: Y => `Geçerli BCPT bakiyeniz ${typeof Y === 'string' ? Y.slice(0,8) :''}`,
      bcptAddress: `BCPT Adresi`,
    },
    changeProfilePic: `Değiştirmek için Dokunun`,
    addProfilePic: `Telefondan bir Resmi Kullanın`,
    panelHeaders: [
      `ETH (ve BCPT) Adresi`,
      `ETH Bakiyesi`,
      `BCPT Bakiyesi`,
      `ETH İşlem Geçmişi`,
      `Birincil Para değiştirme`,
      `Pin'i Değiştir`,
      `Kullanıcı Adını Değiştir`,
      `E-postanı Değiştir`,
      `Profil Resmini Değiştir`,
      `Kilitleme Süresini Değiştir`,
      `Anımsatıcı Kod`,
      `Bildirimler`,
    ],
    viewEtherscan: `Etherscan Geçmişini Görüntüle`,
    profilePic: {
      change: `Profil resmini değiştir`,
      setError: `Resminizi yüklerken bir hata oluştu, lütfen tekrar deneyiniz`,
      getError: `Profil resminiz alınırken bir hata oluştu`,
      setSuccess: `Profil resmi güncellendi`,
    },
    logoutSuccess: `Başarıyla çıkış yaptınız!`,
  },

  currentBalance: {
    eth: `Geçerli Eth bakiyeniz:`,
    bcpt: `Geçerli BCPT bakiyeniz:`,
  },

  welcomeView: {
    by: `GELİŞTİREN FİRMA`,
    makeItEasy: `Lndr basit borçlarınızı izlemeyi kolaylaştırır`,
    weHelpFriends: `Biz arkadaşların birlikte yaşamasına, çalışmasına ve oynamasına yardımcı oluruz.`,
    len: `Len`,
    dot: `.`,
    der: `dır`,
    shareDinner: `Yemekte Hesabı Paylaşın`,
    fillTank: `Deponuzu Doldurun`,
    travelTogether: `Birlikte Seyahat Edin`,
    runEthereum: `Biz ETH ile çalışırız!`,
    firstLendingApp: `Blockchain ile güvenliği sağlanan ilk mobil borç verme uygulaması.`,
    greatConcert: `Harika bir Konseri İzleyin`,
    youPlayWithFriends: `Sen arkadaşlarınla ​​eğlen; \n Biz hesabını tutalım…`,
    start: `Buradan Başlayın`,
  },

  debtManagement: {
    shell: `Yeni İşlem`,
    add: `Borç ekle`,
    selectFriend: `Seç`,
    lend: `Yeni Borç Verme`,
    borrow: `Yeni Borç Alma`,
    iLent: `Bir arkadaşım bana borçlu`,
    iBorrowed: `Bir arkadaşıma borçluyum`,
    settleUpLower: `Ödeşin`,
    amountToSettle: `Ödeşilecek Tutar`,
    total: `Toplam`,
    record: `kayıt`,
    records: `kayıt`,
    chooseCurrency: `Bir para birimi seç`,
    createError: {
      amountTooLow: `Tutar 0$ 'dan büyük olmalıdır`,
      amountTooHigh: `Tutar 1,000,000,000$ ‘dan az olmalıdır`,
      selfAsFriend: `Kendinize borç oluşturamazsınız, başka bir arkadaş seçin`,
      pending: `Lütfen başka bir işlem oluşturmadan önce bu kullanıcı ile olan bekleyen işleminizi sonuçlandırın.`,
      insufficientEth: E => `Borcunu ödemek için ${E} ETH’e ihtiyaç duymaktasın, Ayarlara giderek bakiyenizi görüntüleyebilirsiniz`,
    },
    fields: {
      currency: `Para birimi`,
      amount: `Miktar`,
      settlementAmount: `Kapanacak hesap tutarı`,
      selectFriend: `Arkadaş`,
      memo: `Not`,
      direction: `Doğru İfadeyi Seçin`,
    },
    memo: {
      example: `Buraya not yazabilirsiniz`,
    },
    direction: {
      lend: X => `${X} bana borçludur`,
      borrow: X => `Ben ${X}’a borçluyum`,
      initiatedLend: X => `${X} onun borçlu olduğunu söylüyor`,
      initiatedBorrow: X => `${X} sizin borçlu olduğunuzu söylüyor`,
      pendingLend: X => `@${X} size borçlu`,
      pendingBorrow: X => `@${X}’a borçlusunuz`,
      pendingLendSettlement: S => `@${S.debtorNickname} ${S.settlementCurrency} üzerinden ödeşmeyi talep ediyor`,
      pendingBorrowSettlement: S => `@${S.debtorNickname} ${S.settlementCurrency} üzerinden ödeşmek istiyor`,
      pendingLendSettlementMe: S => `@${S.debtorNickname} ile ${S.settlementCurrency} üzerinden ödeşmeyi talep ettiniz`,
      pendingBorrowSettlementMe: S => `@${S.debtorNickname} ile ödeşmenizin ${S.settlementCurrency} üzerinden olmasını talep ettiniz`,
    },
    pending: {
      success: F => `Beklemeye alınan borç bilgisi @${F.nickname}’a gönderildi`,
      error: generalCommunicationError
    },
    pendingParens: `(Beklemede)`,
    confirmation: {
      transaction: CP => `${CP} ile olan işlem başarıyla onaylandı`,
      settlement: CP => `${CP} ile olan ödeşme başarıyla onaylandı`,
      error: `Şu anda işlemi onaylayamadık, lütfen daha sonra tekrar deneyin`,
    },
    rejection: {
      success: `İşlem reddedildi`,
      error: `Şu anda işlem reddedilemiyor, lütfen daha sonra tekrar deneyiniz`,
    },
    balances: {
      error: `Şu anda bakiyeler yüklenemiyor, lütfen daha sonra tekrar deneyiniz`,
    },
    for: M => `sebebi ${M}`,
    settleUp: `Ödeşin`,
    settleTotal: `Tüm Hesabı Kapat`,
    settleUpMemo: (D, A) => `${D === 'lend' ? 'Size ödenecek tutar' : 'Ödenmesini istediğiniz tutar'} ${A}`,
    recordSettleUpMemo: `Ödeşiliyor`,
    balanceByCurrency: `Ayrıntılar`,
  },
  settlementManagement: {
    bilateral: {
      error: {
        insufficient: X => `${X} ile olan ödeşmeniz, yetersiz bakiye sebebiyle başarısız oldu`,
        generic: X => `${X} ile olan ödeşmeniz işlenirken bir hata oluştu`,
      }
    },
    eth: `Eth kullanarak ödeşin`,
    nonPayment: `Bir ödeme kaydı oluşturun`,
  },

  accountViewLanguage: {
    lndr: `L n d r`,
    home: `Anasayfa`,
    friends: `Arkadaş`,
    activity: `Hareketler`,
  },

  notifications: {
    toggleNotifications: `Bildirimleri Aç/Kapat`,
    enable: `Aç`,
    disable: `Kapat`,
  },

  pendingTransactionsLanguage: {
    shell: `Bekleyen işlem`,
    title: `Beklemede`,
    memo: `Not:`,
    for: `Sebebi`,
    none: `Beklemede olan işleminiz bulunmamakta`,
    confirmationQuestion: `Bu işlemi onaylamak istediğinize emin misiniz?`,
    pendingAnnouncement: `Bu işlem diğer tarafın onayını bekliyor.`,
    bilateral: `Eth aktarımının tamamlanması bekleniyor`,
    confirm: `Onayla`,
    reject: `İşlemi Reddet`,
    rejectRequest: `Reddet`,
    cancel: `İşlemi iptal et`,
    direction: {
      lend: (X, Z) => `@${X} size ${Z} borçlu`,
      borrow: (X, Z) => `@${X}’a ${Z} borçlusunuz`,
    }
  },

  pendingSettlementsLanguage: {
    shell: `Beklemedeki Ödeme`,
    title: `Bekliyor`,
    none: `Beklemede olan işleminiz bulunmamakta`,
    confirm: `Onayla`,
    reject: `Ödemeyi Reddet`,
    cancel: `Ödemeyi İptal Et`,
  },

  recentTransactionsLanguage: {
    title: `Devam`,
    none: `Tamamlanmış işleminiz bulunmamakta`,
    direction: {
      lend: (X, Z) => `@${X} size ${Z} borçlu`,
      borrow: (X, Z) => `@${X}’a ${Z} borçlusunuz`,
    },
    balance: `Bakiye`,
    consolidatedBalance: `Bakiye`,
    friends: FS => `(${FS} ${FS === 1 ? 'arkadaştan' :'arkadastan'})`,
  },

  tabs: {
    home: `Anasayfa `,
    friends: `Arkadaş`,
    activity: `Hareketler`,
  },

  confirmation: {
    shell: `Onay`,
    done: `Tamamlandı`,
    create: {
      start: `Kaydı onaylanması için `,
      end: `’a gönderdik.`,
    },
    confirm: {
      start: ``,
      end: `’daki bu kaydı onayladınız.`,
    },
    reject: {
      start: `Bu kaydı reddettiğinizi `,
      end: `’a bildirdij.`,
    },
    confirmFriend: {
      start: ``,
      end: ` ile arkadaş oldunuz!`,
    },
    rejectFriend: {
      start: ``,
      end: `’dan gelen arkadaşlık isteğini reddettiniz.`,
    },
    ethSent: {
      start: `Başarıyla `,
      end: ` ETH gönderdiniz ve işlem sağlama kodunuz `,
    },
    bcptSent: {
      start: `Başarıyla `,
      end: ` BCPT gönderdiniz ve işlem sağlama kodunuz `,
    },
    status: ``,
    activity: `Hareketler sekmesinde bu işlemin durumunu görebilirsiniz.`,
  },

  pendingFriendRequestsLanguage: {
    shell: `Arkadaşlık isteği`,
    message: `Arkadaş istekleri`,
    request: F => `${F} seninle arkadaş olmak istiyor!`,
  },

  privacyPolicy: {
    link: `lndr.io/terms/`,
    message: `Altınızda tıklayarak okuyup Blockmason gizlilik politikasına kabul ettiğinizi onaylayın. Blockmason Blockmason ve LNDR hakkında güncellemeleri göndermek için e-posta adresinizi kullanabiliriz. İşte gizlilik politikasına bir link:`
  }
}
