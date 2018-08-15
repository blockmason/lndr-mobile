import { currencySymbols, transferLimits } from 'lndr/currencies'

const CUR = currencySymbols
const TL = transferLimits

const generalCommunicationError = 'Terdapat masalah untuk berkomunikasi dengan pelayan, sila cuba lagi kemudian.'

export default {

  applicationName: `Lndr`,
  helloWorld: `Hai dunia`,
  submit: `HANTAR`,
  next: `Seterusnya`,
  cancel: `Batal`,
  back: `Pergi balik`,
  copy: `Salin ke Papan Klip`,
  confirmAccount: `Sahkan`,
  createAccount: `Buat akaun`,
  recoverAccount: `Pulihkan akaun`,
  removeAccount: `Hapus Akaun`,
  updateAccount: `Kemas kini akaun`,
  loginAction: `Buka Kunci`,
  enterPin: `SILA MASUKKAN PIN ANDA`,
  changePin: `Tukar PIN`,
  enterCurrentPin: `Masukkan PIN Semasa`,
  logoutAction: `LOG KELUAR`,
  seeAllActivity: `Lihat Semua Aktiviti`,
  copiedClipboard: `Disalin ke Papan Klip`,
  pleaseWait: `Sila tunggu`,
  addFriend: `Tambah Rakan`,
  addFriendConfirmationQuestion: `Adakah anda pasti anda ingin menambah pengguna ini sebagai rakan?`,
  removeFriend: `Singkir Rakan`,
  currentFriends: `Rakan Terkini`,
  removeFriendConfirmationQuestion: `Adakah anda pasti anda mahu menyingkir pengguna ini sebagai rakan?`,
  inviteFriends: `Jemput Rakan-rakan ke Lndr`,
  tryLndr: `Cuba Lndr App di sini:`,
  friendInfo: `Maklumat lanjut tentang persahabatan ini:`,
  noFriends: `Tambah beberapa rakan untuk bermula!`,
  noMatches: `Tiada pengguna yang sepadan ditemui`,
  noBalances: `Anda tidak mempunyai hutang direkodkan`,
  addFriendButton: `Menambah rakan`,
  alreadyFriendsButton: `Rakan-rakan`,
  friendShell: `Rakan`,
  tip: `Tip:`,
  notice: `Notis:`,
  welcome: `Selamat datang ke LNDR anda`,
  noBalanceWarning: `Kami tidak dapat memuatkan baki anda pada masa ini, sila cuba lagi kemudian.`,
  totalBalance: `Jumlah Baki:`,
  totalBalances: `Jumlah pihak pengguna:`,
  newTransaction: `Transaksi Baharu`,
  needsReview: `Menunggu Kelulusan`,
  owesMe: `Saya memberi hutang`,
  iOwe: `Saya berhutang dengan seseorang`,
  newPassword: `Kata Laluan Baharu (minimum 8 karakter)`,
  confirmPassword: `Sahkan Kata Laluan`,
  newPin: `PIN 4 digit baharu`,
  enterNewPin: `SILA TETAPKAN PIN 4 DIGIT BAHARU`,
  confirmPin: `SILA SAHKAN PIN ANDA`,
  newAccount: `Buat akaun baru`,
  loginAccount: `Buka kunci akaun anda`,
  recoverExistingAccount: `Pulihkan akaun sedia ada`,
  recoverMnemonic: `Mnemonik (12 perkataan yang dipaparkan \ napabila anda membuat akaun)`,
  recoverMnemonicLengthError: `Mnemonik perlu tepat 12 perkataan`,
  successTitle: `Berjaya`,
  errorTitle: `Ralat`,
  showMnemonic: `Tunjukkan Mnemonik 12 Perkataan`,
  mnemonicExhortation: `Frasa 12 perkataan ini diperlukan untuk memulihkan akaun anda, sila simpan ia di tempat selamat dan rahsia`,
  addressExhortation: `Hantar Ethereum ke alamat anda supaya anda boleh menyelesaikan hutang di Lndr`,
  removeAccountTitle: `Adakah anda pasti anda mahu menghapuskan akaun anda dari peranti ini?`,
  removeAccountExhortation: `Pastikan anda mempunyai akses kepada mnemonik anda untuk memulihkan akaun anda kemudian, kerana ini adalah penghapusan kekal maklumat akaun anda dari peranti ini.`,
  myAccount: `Akaun Saya`,
  setNickname: `Tetapkan nama samaran supaya rakan anda boleh mencari anda`,
  setEmail: `Tetapkan e-mel untuk menerima maklumat mengenai kemas kini Lndr`,
  nickname: `Nama samaran (huruf kecil dan nombor)`,
  email: `Alamat e-mel`,
  accountManagement: {
    nickname: {
      lengthViolation: `Nama samaran hendaklah sekurang-kurangnya 3 karakter.`,
      compositionViolation: `Nama samaran hanya boleh mengandungi nombor dan huruf kecil.`,
      duplicationViolation: `Nama samaran sudah digunakan`,
    },
    email: {
      compositionViolation: `Format e-mel tidak betul`,
      duplicationViolation: `E-mel sudah digunakan`,
    },
    pin: {
      lengthViolation: `PIN hendaklah sekurang-kurangnya 4 karakter.`,
      matchViolation: `PIN harus sepadan.`,
      failedHashComparison: `PIN tidak sah, sila cuba lagi.`,
      updateSuccess: `PIN anda telah dikemas kini`,
      updateError: `Terdapat ralat semasa mengemas kini PIN anda`,
    },
    mnemonic: {
      lengthViolation: `Mnemonik harus mempunyai sekurang-kurangnya 12 perkataan.`,
      unableToValidate: `Mnemonik yang dimasukkan tidak sah, sila cuba lagi.`,
    },
    setNickname: {
      success: `Nama panggilan anda telah disimpan.`,
      error: generalCommunicationError
    },
    setEmail: {
      success: `E-mel anda telah disimpan.`,
      error: generalCommunicationError
    },
    lockTimeout: {
      top: `Anda mesti memasukkan PIN anda selepas ini`,
      bottom: `minit tidak aktif`,
      update: `Kemas kini`,
      error: `Kami tidak dapat mengemas kini tetapan akaun anda`,
      success: `Masa senggang kunci dikemas kini`,
    },
    addFriend: {
      success: X => `Permintaan jadi rakan dihantar ke @${X}`,
      error: generalCommunicationError
    },
    removeFriend: {
      success: X => `Disingkirkan daripada senarai rakan: @${X}`,
      error: generalCommunicationError
    },
    loadInformation: {
      error: generalCommunicationError
    },
    ethBalance: {
      display: Y => `Baki ETH anda adalah ${String(Y).slice(0,8)}`,
      getError: `Tidak dapat mencari data baki ETH`,
      manage: `Uruskan ETH`,
    },
    sendEth: {
      error: {
        insufficient: `Anda tidak mempunyai ETH cukup untuk transaksi ini`,
        generic: `Terdapat ralat semasa pemindahan, sila cuba lagi kemudian`,
        address: `Sila masukkan alamat e-mel yang sah`,
        amount: `Sila masukkan jumlah yang lebih besar daripada 0`,
        limitExceeded: A => `Anda hanya boleh menghantar ${CUR[A]}${TL[A]} setiap minggu, sila pilih amaun yang lebih kecil`
      },
      amount: `Jumlah untuk Dihantar`,
      address: `Alamat Destinasi (tanpa awalan '0x')`,
      transfer: `Pindahkan ETH`,
      transferAll: `Pindahkan semua`,
      balance: Y => `Baki semasa ETH anda ialah ${typeof Y === 'string' ? Y.slice (0,8): ''} `,
      ethAddress: `Alamat Ethereum`,
      txCost: (B, A) => `Kos transaksi semasa adalah ${CUR[A]}${B}`,
      transferLowercase: `Pindahkan ETH`,
      note: A => `Sila ambil perhatian: anda hanya boleh memindahkan ${CUR[A]}${TL[A]} setiap minggu daripada Lndr`,
      warning: (Z, A) => `Anda mempunyai ${CUR[A]}${Z} baki daripada ${CUR[A]}${TL[A]} had anda`,
    },
    sendBcpt: {
      error: {
        insufficient: `Anda tidak mempunyai BCPT cukup untuk transaksi ini`,
        generic: `Terdapat ralat semasa pemindahan, sila cuba lagi kemudian`,
      },
      transfer: `Pindahkan BCPT`,
      address: `Alamat Destinasi (tanpa awalan '0x')`,
      balance: Y => `Baki semasa BCPT anda ialah ${typeof Y === 'string' ? Y.slice(0,8) : ''} `,
      bcptAddress: `Alamat BCPT`,
    },
    changeProfilePic: `Sentuh untuk Tukar`,
    addProfilePic: `Gunakan Gambar dari Telefon`,
    panelHeaders: [
      `Alamat ETH (& BCPT)`,
      `Baki ETH`,
      `Baki BCPT`,
      `Hapus Akaun`,
      `Sejarah Transaksi ETH`,
      `Membolehkan PayPal`,
      `Tukar Mata Wang Utama`,
      `Tukar PIN`,
      `Tukar E-mel`,
      `Tukar Masa Senggang Kunci`,
      `Mnemonik`,
      `Pemberitahuan`,
    ],
    viewEtherscan: `Lihat Sejarah Etherscan `,
    profilePic: {
      change: `Tukar Gambar Profil`,
      setError: `Terdapat ralat semasa memuat naik gambar anda, sila cuba lagi kemudian`,
      getError: `Terdapat ralat semasa mendapatkan semula gambar profil anda`,
      setSuccess: `Gambar profil telah dikemas kini`,
    },
    logoutSuccess: `Anda telah berjaya log keluar!`,
    logoutError: generalCommunicationError,
  },

  currentBalance: {
    eth: `Baki ETH semasa anda ialah:`,
    bcpt: `Baki BCPT semasa anda ialah:`,
  },

  welcomeView: {
    by: `DIBINA OLEH`,
    makeItEasy: `Lndr memudahkan pengguna mengesan hutang kecil-kecilan`,
    weHelpFriends: `Kami membantu sesama rakan untuk hidup, bekerja, dan bermain dengan rukun.`,
    len: `Len`,
    dot: `.`,
    der: `der`,
    shareDinner: `Kongsi Makan Malam`,
    fillTank: `Isi Tangki Anda`,
    travelTogether: `Melancong Bersama-sama`,
    runEthereum: `Kami berfungsi dengan ETH!`,
    firstLendingApp: `Aplikasi mudah alih pertama untuk meminjam wang menerusi rantaian blok.`,
    greatConcert: `Tonton Konsert Hebat`,
    youPlayWithFriends: `Bermainlah dengan rakan anda; \ n biar kami uruskan hal ini...`,
    start: `Bermula`,
  },

  debtManagement: {
    shell: `Transaksi Baharu`,
    add: `Tambah Hutang`,
    selectFriend: `Pilih`,
    lend: `Pinjaman Baharu`,
    borrow: `Hutang Baharu`,
    iLent: `Seorang rakan berhutang dengan saya`,
    iBorrowed: `Saya berhutang dengan seorang rakan`,
    settleUpLower: `Selesaikan Hutang`,
    amountToSettle: `Jumlah untuk Diselesaikan`,
    total: `Jumlah`,
    record: `rekod`,
    records: `rekod`,
    chooseCurrency: `Pilih mata wang`,

    createError: {
      amountTooLow: `Jumlah mesti lebih besar daripada $0`,
      amountTooHigh: `Jumlah mesti kurang daripada $ 1,000,000,000`,
      selfAsFriend: `Anda tidak boleh berhutang dengan diri sendiri, pilih rakan lain`,
      pending: `Sila selesaikan urus niaga anda yang belum selesai dengan pengguna ini sebelum mewujudkan urus niaga lain`,
      insufficientEth: E => `Anda memerlukan sekurang-kurangnya ${E} ETH untuk selesaikan hutang, pergi ke tetapan untuk melihat baki anda`,
    },
    fields: {
      currency: `Mata wang`,
      amount: `Jumlah`,
      settlementAmount: `Jumlah Penyelesaian`,
      selectFriend: `Rakan`,
      memo: `Memo`,
      direction: `Pilih Pernyataan yang Betul`,
    },
    memo: {
      example: `Taip memo di sini`,
    },
    direction: {
      lend: X => `${X} berhutang dengan saya`,
      borrow: X => `Saya berhutang dengan ${X}`,
      initiatedLend: X => `${X} berkata dia berhutang`,
      initiatedBorrow: X => `${X} kata anda berhutang`,
      pendingLend: X => `@${X} berhutang dengan anda`,
      pendingBorrow: X => `Anda berhutang @${X}`,
      pendingLendSettlement: S => `@${S.debtorNickname} meminta penyelesaian hutang dibuat dengan ${S.settlementCurrency}`,
      pendingBorrowSettlement: S => `@${S.creditorNickname} mahu menyelesaikan hutang dengan anda dalam ${S.settlementCurrency}`,
      pendingLendSettlementMe: S => `Anda minta untuk selesaikan hutang dengan @${S.debtorNickname} dalam ${S.settlementCurrency} `,
      pendingBorrowSettlementMe: S => `Anda telah meminta supaya @${S.creditorNickname} selesaikan hutang dalam ${S.settlementCurrency}`,
    },
    pending: {
      success: F => `Hutang belum selesai dikemukakan kepada @${F.nickname}`,
      error: generalCommunicationError
    },
    pendingParens: `(yang belum selesai)`,
    confirmation: {
      transaction: CP => `Transaksi dengan ${CP} telah berjaya disahkan`,
      settlement: CP => `Penyelesaian dengan ${CP} telah berjaya disahkan`,
      error: `Tidak dapat mengesahkan transaksi pada masa ini, sila cuba lagi kemudian`,
    },
    rejection: {
      success: `Transaksi telah ditolak`,
      error: `Tidak dapat menolak transaksi pada masa ini, sila cuba lagi kemudian`,
    },
    balances: {
      error: `Tidak dapat memuatkan baki pada masa ini, sila cuba lagi kemudian`,
    },
    for: M => `untuk ${M}`,
    settleUp: `Selesaikan Hutang`,
    settleTotal: `Jumlah Penyelesaian`,
    settleUpMemo: (D, A) => `${D === 'lend'? 'Menyelesaikan hutang untuk' : 'Mohon untuk menyelesaikan bagi'} ${A} `,
    recordSettleUpMemo: `Sedang Selesaikan Hutang`,
    balanceByCurrency: `Maklumat`,
  },
  settlementManagement: {
    bilateral: {
      error: {
        insufficient: X => `Penyelesaian anda dengan ${X} gagal kerana dana tidak mencukupi` ,
        generic: X => `Terdapat ralat semasa memproses penyelesaian anda dengan ${X}`,
      }
    },
    eth: `Selesaikan dengan ETH`,
    paypal: `Selesaikan dengan PayPal`,
    nonPayment: `Rekodkan Penyelesaian`,
  },

  accountViewLanguage: {
    lndr: `L n d r`,
    home: `Laman Utama`,
    friends: `Rakan`,
    activity: `Aktiviti`,
  },

  notifications: {
    toggleNotifications: `Togol Pemberitahuan`,
    enable: `Hidupkan`,
    disable: `Matikan`,
  },

  pendingTransactionsLanguage: {
    shell: `Transaksi Belum Selesai`,
    title: `Belum Selesai`,
    memo: `Memo:`,
    for: `Untuk`,
    none: `Anda tidak mempunyai transaksi yang belum selesai`,
    confirmationQuestion: `Adakah anda pasti anda mahu mengesahkan urus niaga ini?`,
    pendingAnnouncement: `Urus niaga ini menunggu pengesahan pihak yang satu lagi.`,
    bilateral: `Menunggu pemindahan ETH disempurnakan`,
    confirm: `Sahkan Kata Laluan`,
    reject: `Tolak Transaksi`,
    rejectRequest: `Tolak`,
    cancel: `Batalkan Transaksi`,
    direction: {
      lend: (X, Z) => `@${X} berhutang dengan anda ${Z}`,
      borrow: (X, Z) => `Anda berhutang dengan @${X} ${Z}`,
    }
  },

  pendingSettlementsLanguage: {
    shell: `Penyelesaian Tertangguh`,
    title: `Belum Selesai`,
    none: `Anda tidak mempunyai penyelesaian yang tertangguh`,
    confirm: `Sahkan`,
    reject: `Tolak Penyelesaian`,
    cancel: `Batalkan Penyelesaian`,
  },

  recentTransactionsLanguage: {
    title: `Telah Sempurna`,
    none: `Anda tidak mempunyai urus niaga yang telah disempurnakan`,
    direction: {
      lend: (X, Z) => `@${X} berhutang dengan anda ${Z}`,
      borrow: (X, Z) => `Anda berhutang dengan @${X} ${Z}`
    },
    balance: `Baki`,
    consolidatedBalance: `Baki`,
    friends: FS => `(dari ${FS} ${FS === 1 ? 'rakan' : 'rakan'})`,
  },

  tabs: {
    home: `Laman Utama `,
    friends: `Rakan`,
    activity: `Aktiviti`,
  },

  confirmation: {
    shell: `Pengesahan`,
    done: `Selesai`,
    create: {
      start: `Kami telah menghantar rekod itu kepada `,
      end: ` untuk pengesahan.`,
    },
    confirm: {
      start: `Anda mengesahkan rekod ini daripada `,
      end: `.`,
    },
    reject: {
      start: `Kami telah maklumkan `,
      end: ` bahawa anda telah menolak rekod ini.`,
    },
    confirmFriend: {
      start: `Sekarang anda kawan `,
      end: `!`,
    },
    rejectFriend: {
      start: `Anda telah menolak permintaan `,
      end: ` untuk menjadi rakan.`,
    },
    ethSent: {
      start: `Anda telah berjaya menghantar `,
      end: ` ETH dan cincangan transaksi anda adalah `,
    },
    bcptSent: {
      start: `Anda telah berjaya menghantar `,
      end: ` BCPT dan cincangan transaksi anda adalah `,
    },
    requestPayPalPayee: {
      start: `Kami telah biarkan `,
      end: ` tahu bahawa anda ingin untuk menyelesaikan dengan PayPal.`,
    },
    requestPayPalPayment: {
      start: `Kami telah biarkan `,
      end: ` tahu bahawa anda sedang dibayar dengan PayPal.`,
    },
    settledWithPayPal: {
      start: `Kami telah biarkan `,
      end: ` tahu yang anda telah diselesaikan dengan PayPal.`,
    },
    status: `Anda boleh melihat status transaksi ini dalam tab `,
    activity: `aktiviti tersebut.`,
  },

  pendingFriendRequestsLanguage: {
    shell: `Permintaan jadi rakan`,
    message: `Permintaan jadi rakan`,
    request: F => `@${F} mahu menjadi rakan anda!`,
  },

  privacyPolicy: {
    link: `lndr.io/terms/`,
    message: `Dengan mengklik di bawah anda mengesahkan yang anda telah membaca dan bersetuju dengan dasar privasi Blockmason ini. Blockmason boleh menggunakan alamat e-mel anda untuk menghantar kemas kini mengenai Blockmason dan LNDR. Berikut adalah pautan kepada dasar privasi:`
  },

  payPalLanguage: {
    connectPayPal: `Sambung PayPal`,
    connectSuccess: `PayPal berjaya yang aktif.`,
    disconnectPayPal: `Cabut PayPal`,
    disconnected: `PayPal diputuskan.`,
    requestPayPalPayment: `Permintaan PayPal Payment`,
    sendWithPayPal: `Menghantar Dengan PayPal`,
    enablePayPal: `Membolehkan PayPal`,
    requestPayPalPayee: `Meminta PayPal`,
    enablePayPalForFriend: F => `Membolehkan PayPal membolehkan @${F} membayar anda.`,
    friendNotEnabled: F => `@${F} belum mendayakan PayPal pembayaran.`,
    friendRequestedConnect: F => `@${F} mahu membayar anda melalui PayPal`,
    requestFriendConnect: F => `Anda meminta @${F} untuk membolehkan PayPal`,
    feesNotification: `Tidak termasuk yuran PayPal`,
    feesInformationHeader: `PayPal Maklumat Bayaran`,
    feesInformation: `1. akaun PayPal anda mesti terikat kepada akaun bank.
    
2. Membayar dalam mata wang yang berbeza daripada mata wang bank anda akan dikenakan bayaran $ 0.35.

3. yuran pemindahan Antarabangsa:
    Amerika Syarikat ke Kanada / Europe: $ 2.99
    Amerika Syarikat ke mana-mana yang lain: $ 4.99

4. Yuran tersebut tidak menyeluruh. Untuk maklumat yang terkini sila ke:

    https://www.paypal.com/us/webapps/mpp/paypal-fees#sending-us`,
    payPalSite: `PayPal.com`,
  }
}
