import { currencySymbols, transferLimits } from 'lndr/currencies'

const CUR = currencySymbols
const TL = transferLimits

const generalCommunicationError = 'Terdapat masalah untuk berkomunikasi dengan pelayan, sila cuba lagi kemudian.'

export default {

  applicationName: `Lndr`,
  helloWorld: `Hai dunia`,
  noConnection: `Tiada sambungan`,
  retry: `Cuba semula`,
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
  recoverMnemonic: `Mnemonik (12 perkataan yang dipaparkan \napabila anda membuat akaun)`,
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
  lndrVerified: {
    ok: `Okey`,
    title: `Menetapkan had penyelesaian dan pengeluaran crypto jumlah yang lebih tinggi dengan melengkapkan Tahu keperluan Pelanggan Anda.`,
    statusTitle: `Status semasa pengesahan anda ialah:`,
    tryAgain: `Kami tidak dapat mengesahkan identiti anda. Sila serahkan semula maklumat anda dan memastikan bahawa gambar anda adalah mudah dibaca.`,
    formMessage: `Sila isi semua bidang-bidang berikut`,
    button: `Sahkan Pengenalan Anda`,
    prefix: `Membaca `,
    linkTitle: `Dasar Privasi kami `,
    postfix: `untuk bagaimana data peribadi anda akan berjaya.`,
    upload: `Muat naik `,
    governmentId: `ID yang dikeluarkan oleh kerajaan`,
    selfie: `Memuat naik gambar diri sendiri yang dengan ID yang dikeluarkan oleh kerajaan`,
    proofOfAddress: `Bukti alamat`,
    ifNotId: `(Jika tidak ID)`,
    agree: `Saya telah membaca dan bersetuju dengan `,
    agreeLink: `Dasar Privasi`,
    success: `KYC telah diserahkan.`,
    idInfoHeader: `Contoh ID termasuk:`,
    passport: `pasport`,
    drivers: `Lesen memandu`,
    national: `Kad Pengenalan Negara`,
    addressInfoHeader: `Contoh bukti alamat:`,
    bank: `Penyata bank`,
    utility: `Bil utiliti`,
    other: `Dokumen lain`,
    chooseGovernmentPhoto: `Pilih ID Kerajaan Photo`,
    chooseSelfiePhoto: `Pilih Selfie Photo`,
    chooseAddressPhoto: `Pilih Bukti Alamat Photo`,
    emailRequired: `Anda perlu e-mel untuk mengesahkan identiti anda, sila klik pada "Tukar E-mel"`,
    approved: `DILULUSKAN`,
    rejected: `DITOLAK`,
    pending: `Belum Selesai`,
    error: generalCommunicationError,
    formFields: {
      firstName: `Nama pertama`,
      lastName: `Nama terakhir`,
      street: `Alamat jalan`,
      city: `City`,
      state: `Negeri / Wilayah`,
      postalCode: `Poskod`,
      country: `Pilih negara`,
      phone: `Nombor telefon`,
      dob: `Tarikh Lahir (YYYY-MM-DD)`,
    },
    formErrors: {
      firstName: `Nama pertama diperlukan`,
      lastName: `Nama terakhir dikehendaki`,
      street: `Street diperlukan`,
      city: `Bandar diperlukan`,
      state: `Negeri / Daerah dikehendaki`,
      postalCode: `Poskod diperlukan`,
      country: `Negara ini diperlukan`,
      phone: `Nombor telefon diperlukan`,
      dob: `Tarikh Lahir diperlukan`,
      general: `Sila pastikan anda telah mengisi semua medan dan dilampirkan gambar-gambar yang betul`,
    }
  },
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
        limitExceeded: (A, M) => `Anda hanya boleh menghantar ${CUR(A)} ${TL(A, M)} setiap minggu, sila pilih amaun yang lebih kecil`
      },
      amount: `Jumlah untuk Dihantar`,
      address: `Alamat Destinasi (tanpa awalan '0x')`,
      transfer: `Pindahkan ETH`,
      transferAll: `Pindahkan semua`,
      balance: Y => `Baki semasa ETH anda ialah ${typeof Y === 'string' ? Y.slice (0,8): ''} `,
      ethAddress: `Alamat Ethereum`,
      txCost: (B, A) => `Kos transaksi semasa adalah ${CUR(A)}${B}`,
      transferLowercase: `Pindahkan ETH`,
      note: (A, M) => `Sila ambil perhatian: anda hanya boleh memindahkan ${CUR(A)} ${TL(A, M)} setiap minggu daripada Lndr`,
      warning: (Z, A, M) => `Anda mempunyai ${CUR(A)}${Z} baki daripada ${CUR(A)} ${TL(A, M)} had anda`,
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
    panelHeaders: [
      `Alamat ETH (& BCPT)`,
      `Baki ETH`,
      `Baki BCPT`,
      `Hapus Akaun`,
      `Sejarah Transaksi ETH`,
      `Membolehkan PayPal`,
      `Tukar Mata Wang Utama`,
      `Membuka kunci ciri Tambahan`,
      `Tukar E-mel`,
      `Tukar PIN`,
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
    youPlayWithFriends: `Bermainlah dengan rakan anda; \n biar kami uruskan hal ini...`,
    start: `Bermula`,
  },

  walkthrough: {
    skip: `skip`,
    continue: `terus`,
    step1: {
      easyToUse: `Lndr adalah cara yang paling mudah untuk berpecah bil, perbelanjaan saham dan menyelesaikan hutang yang ringkas dengan rakan-rakan dan keluarga, semua dilakukan dengan selamat pada blockchain.`,
      len: `Len`,
      der: `der`,
    },
    step2: {
      getStarted: `Untuk bermula dengan Lndr, anda perlu untuk menambah kawan.`,
      friendsScreen: `Lawati Rakan skrin untuk mencari, menambah, atau menjemput kawan-kawan anda dan keluarga untuk menyambung pada Lndr.`,
    },
    step3: {
      title: `Rakaman Transaksi`,
      easy: `Membelah rang undang-undang atau menambah hutang dengan rakan adalah mudah dalam Lndr!`,
      selectFriend: `Pilih rakan anda, mata wang dan jumlah.`,
      addMemo: `Menambah beberapa nota dalam kotak memo dan klik Serah.`,
    },
    step4: {
      title: `Selesaikan Hutang`,
      ready: `Bersedia untuk  selesaikan hutang?`,
      payPal: `Apabila tiba masa untuk menyesuaikan diri dengan Lndr, \n- anda boleh memilih PayPal:`,
      ether: `- cryptocurrencies seperti Eter:`,
      cash: `- atau hanya mencatat penyelesaian tunai:`,
      positiveBalance: `10.46`,
    },
    step5: {
      title: `Pelbagai mata wang`,
      multiCurrency: `Lndr boleh memantau semua transaksi anda walaupun mereka berlaku dalam mata wang yang berbeza.`,
      exchangeRate: `Apabila anda membuat keputusan untuk Settle Up dengan rakan anda, semua transaksi akan ditukar kepada mata wang utama anda menggunakan yang paling kadar pertukaran up-to-date didapati.`,
      start: `Mula menggunakan Lndr!`,
    }
  },

  debtManagement: {
    shell: `Transaksi Baharu`,
    add: `Tambah Hutang`,
    selectFriend: `Pilih`,
    lend: `Pinjaman Baharu`,
    borrow: `Hutang Baharu`,
    owesMe: `Berhutang saya`,
    iOwe: `Saya hutang`,
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
    settleUpMemo: (D, A) => `${D === 'lend' ? 'Menyelesaikan hutang untuk' : 'Mohon untuk menyelesaikan bagi'} ${A} `,
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
    select: `Pilih Jenis Penyelesaian`,
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
    rejectOutboundFriendRequest: {
      start: `Anda telah membatalkan permintaan rakan untuk `,
      end: `.`,
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
    kycSuccess: {
      start: `Terima kasih! Akaun anda sedang disahkan.  
      
      `,
      end: `Anda akan diberitahu apabila ciri-ciri tambahan anda tidak dikunci.` 
    },
    status: `Anda boleh melihat status transaksi ini dalam tab `,
    activity: `aktiviti tersebut.`,
  },

  pendingFriendRequestsLanguage: {
    shell: `Permintaan jadi rakan`,
    message: `Permintaan jadi rakan`,
    request: F => `@${F} mahu menjadi rakan anda!`,
    outbound: F => `Anda menghantar permintaan rakan kepada @${F} `,
  },

  privacyPolicy: {
    link: `blockmason.io/lndr/terms/`,
    message: `Dengan mengklik di bawah anda mengesahkan yang anda telah membaca dan bersetuju dengan dasar privasi Blockmason ini. Blockmason boleh menggunakan alamat e-mel anda untuk menghantar kemas kini mengenai Blockmason dan LNDR. Berikut adalah pautan kepada dasar privasi:`,
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
  },

  countries: [
    { name: `Afghanistan`, code: 'AFG' },
    { name: `Albania`, code: 'ALB' },
    { name: `Algeria`, code: 'DZA' },
    { name: `Andorra`, code: 'AND' },
    { name: `Angola`, code: 'AGO' },
    { name: `Anguilla`, code: 'AIA' },
    { name: `Antartika`, code: 'ATA' },
    { name: `Antigua dan Barbuda`, code: 'ATG' },
    { name: `Argentina`, code: 'ARG' },
    { name: `Armenia`, code: 'ARM' },
    { name: `Aruba`, code: 'ABW' },
    { name: `Australia`, code: 'AUS' },
    { name: `Austria`, code: 'AUT' },
    { name: `Azerbaijan`, code: 'AZE' },
    { name: `Bahamas`, code: 'BHS' },
    { name: `Bahrain`, code: 'BHR' },
    { name: `Bangladesh`, code: 'BGD' },
    { name: `Barbados`, code: 'BRB' },
    { name: `Belarus`, code: 'BLR' },
    { name: `Belgium`, code: 'BEL' },
    { name: `Belize`, code: 'BLZ' },
    { name: `Benin`, code: 'BEN' },
    { name: `Bermuda`, code: 'BMU' },
    { name: `Bhutan`, code: 'BTN' },
    { name: `Bolivia`, code: 'BOL' },
    { name: `Bosnia dan Herzegovina`, code: 'BIH' },
    { name: `Botswana`, code: 'BWA' },
    { name: `Brazil`, code: 'BRA' },
    { name: `Brunei`, code: 'BRN' },
    { name: `Bulgaria`, code: 'BGR' },
    { name: `Burkina Faso`, code: 'BFA' },
    { name: `Burundi`, code: 'BDI' },
    { name: `Cabo Verde`, code: 'CPV' },
    { name: `Kemboja`, code: 'KHM' },
    { name: `Cameroon`, code: 'CMR' },
    { name: `Kanada`, code: 'CAN' },
    { name: `Pulau Cayman`, code: 'CYM' },
    { name: `Republik Afrika Tengah`, code: 'CAF' },
    { name: `Chad`, code: 'TCD' },
    { name: `Chile`, code: 'CHL' },
    { name: `China`, code: 'CHN' },
    { name: `Colombia`, code: 'COL' },
    { name: `Comoros`, code: 'COM' },
    { name: `Congo`, code: 'COG' },
    { name: `Congo`, code: 'COD' },
    { name: `Kepulauan Cook`, code: 'COK' },
    { name: `Costa rica`, code: 'CRI' },
    { name: `Côte d'Ivoire`, code: 'CIV' },
    { name: `Croatia`, code: 'HRV' },
    { name: `Cuba`, code: 'CUB' },
    { name: `Curaçao`, code: 'CUW' },
    { name: `Cyprus`, code: 'CYP' },
    { name: `Czechia`, code: 'CZE' },
    { name: `Denmark`, code: 'DNK' },
    { name: `Djibouti`, code: 'DJI' },
    { name: `Dominica`, code: 'DMA' },
    { name: `Republik Dominican`, code: 'DOM' },
    { name: `Ecuador`, code: 'ECU' },
    { name: `Mesir`, code: 'EGY' },
    { name: `El Salvador`, code: 'SLV' },
    { name: `Guinea Khatulistiwa`, code: 'GNQ' },
    { name: `Eritrea`, code: 'ERI' },
    { name: `Estonia`, code: 'EST' },
    { name: `Eswatini`, code: 'SWZ' },
    { name: `Ethiopia`, code: 'ETH' },
    { name: `Fiji`, code: 'FJI' },
    { name: `Finland`, code: 'FIN' },
    { name: `Perancis`, code: 'FRA' },
    { name: `Guiana Perancis`, code: 'GUF' },
    { name: `Polynesia Perancis`, code: 'PYF' },
    { name: `Gabon`, code: 'GAB' },
    { name: `Gambia`, code: 'GMB' },
    { name: `Georgia`, code: 'GEO' },
    { name: `Jerman`, code: 'DEU' },
    { name: `Ghana`, code: 'GHA' },
    { name: `Gibraltar`, code: 'GIB' },
    { name: `Greece`, code: 'GRC' },
    { name: `Greenland`, code: 'GRL' },
    { name: `Grenada`, code: 'GRD' },
    { name: `Guadeloupe`, code: 'GLP' },
    { name: `Guam`, code: 'GUM' },
    { name: `Guatemala`, code: 'GTM' },
    { name: `Guinea`, code: 'GIN' },
    { name: `Guinea-Bissau`, code: 'GNB' },
    { name: `Guyana`, code: 'GUY' },
    { name: `Haiti`, code: 'HTI' },
    { name: `Vatican`, code: 'VAT' },
    { name: `Honduras`, code: 'HND' },
    { name: `Hong Kong`, code: 'HKG' },
    { name: `Hungary`, code: 'HUN' },
    { name: `Iceland`, code: 'ISL' },
    { name: `India`, code: 'IND' },
    { name: `Indonesia`, code: 'IDN' },
    { name: `Iran`, code: 'IRN' },
    { name: `Iraq`, code: 'IRQ' },
    { name: `Ireland`, code: 'IRL' },
    { name: `Isle of Man`, code: 'IMN' },
    { name: `Israel`, code: 'ISR' },
    { name: `Italy`, code: 'ITA' },
    { name: `Jamaica`, code: 'JAM' },
    { name: `Jepun`, code: 'JPN' },
    { name: `Jordan`, code: 'JOR' },
    { name: `Kazakhstan`, code: 'KAZ' },
    { name: `Kenya`, code: 'KEN' },
    { name: `Kiribati`, code: 'KIR' },
    { name: `Korea (DPRK)`, code: 'PRK' },
    { name: `Korea (ROK)`, code: 'KOR' },
    { name: `Kuwait`, code: 'KWT' },
    { name: `Kyrgyzstan`, code: 'KGZ' },
    { name: `Laos`, code: 'LAO' },
    { name: `Latvia`, code: 'LVA' },
    { name: `Lebanon`, code: 'LBN' },
    { name: `Lesotho`, code: 'LSO' },
    { name: `Liberia`, code: 'LBR' },
    { name: `Libya`, code: 'LBY' },
    { name: `Liechtenstein`, code: 'LIE' },
    { name: `Lithuania`, code: 'LTU' },
    { name: `Luxembourg`, code: 'LUX' },
    { name: `Macao`, code: 'MAC' },
    { name: `Macedonia`, code: 'MKD' },
    { name: `Madagascar`, code: 'MDG' },
    { name: `Malawi`, code: 'MWI' },
    { name: `Malaysia`, code: 'MYS' },
    { name: `Maldives`, code: 'MDV' },
    { name: `Mali`, code: 'MLI' },
    { name: `Malta`, code: 'MLT' },
    { name: `Pulau Marshall`, code: 'MHL' },
    { name: `Martinique`, code: 'MTQ' },
    { name: `Mauritania`, code: 'MRT' },
    { name: `Mauritius`, code: 'MUS' },
    { name: `Mexico`, code: 'MEX' },
    { name: `Micronesia`, code: 'FSM' },
    { name: `Moldova`, code: 'MDA' },
    { name: `Monaco`, code: 'MCO' },
    { name: `Mongolia`, code: 'MNG' },
    { name: `Montenegro`, code: 'MNE' },
    { name: `Montserrat`, code: 'MSR' },
    { name: `Morocco`, code: 'MAR' },
    { name: `Mozambique`, code: 'MOZ' },
    { name: `Myanmar`, code: 'MMR' },
    { name: `Namibia`, code: 'NAM' },
    { name: `Nauru`, code: 'NRU' },
    { name: `Nepal`, code: 'NPL' },
    { name: `Belanda`, code: 'NLD' },
    { name: `New Caledonia`, code: 'NCL' },
    { name: `New Zealand`, code: 'NZL' },
    { name: `Nicaragua`, code: 'NIC' },
    { name: `Niger`, code: 'NER' },
    { name: `Nigeria`, code: 'NGA' },
    { name: `Niue`, code: 'NIU' },
    { name: `Kepulauan Mariana Utara`, code: 'MNP' },
    { name: `Norway`, code: 'NOR' },
    { name: `Oman`, code: 'OMN' },
    { name: `pakistan`, code: 'PAK' },
    { name: `Palau`, code: 'PLW' },
    { name: `Palestin`, code: 'PSE' },
    { name: `Panama`, code: 'PAN' },
    { name: `Papua New Guinea`, code: 'PNG' },
    { name: `Paraguay`, code: 'PRY' },
    { name: `Peru`, code: 'PER' },
    { name: `filipina`, code: 'PHL' },
    { name: `Pitcairn`, code: 'PCN' },
    { name: `Poland`, code: 'POL' },
    { name: `Portugal`, code: 'PRT' },
    { name: `Puerto Rico`, code: 'PRI' },
    { name: `Qatar`, code: 'QAT' },
    { name: `Réunion`, code: 'REU' },
    { name: `Romania`, code: 'ROU' },
    { name: `Persekutuan Russia`, code: 'RUS' },
    { name: `Rwanda`, code: 'RWA' },
    { name: `Saint Barthélemy`, code: 'BLM' },
    { name: `Saint Helena, Ascension dan Tristan da Cunha`, code: 'SHN' },
    { name: `Saint Kitts dan Nevis`, code: 'KNA' },
    { name: `Saint Lucia`, code: 'LCA' },
    { name: `Saint Martin`, code: 'MAF' },
    { name: `Saint Pierre dan Miquelon`, code: 'SPM' },
    { name: `Saint Vincent dan Grenadines`, code: 'VCT' },
    { name: `Samoa`, code: 'WSM' },
    { name: `San Marino`, code: 'SMR' },
    { name: `Sao Tome dan Principe`, code: 'STP' },
    { name: `Arab Saudi`, code: 'SAU' },
    { name: `Senegal`, code: 'SEN' },
    { name: `Serbia`, code: 'SRB' },
    { name: `Seychelles`, code: 'SYC' },
    { name: `Sierra Leone`, code: 'SLE' },
    { name: `singapore`, code: 'SGP' },
    { name: `Sint Maarten`, code: 'SXM' },
    { name: `Slovakia`, code: 'SVK' },
    { name: `Slovenia`, code: 'SVN' },
    { name: `Kepulauan Solomon`, code: 'SLB' },
    { name: `Somalia`, code: 'SOM' },
    { name: `Afrika Selatan`, code: 'ZAF' },
    { name: `selatan Sudan`, code: 'SSD' },
    { name: `Sepanyol`, code: 'ESP' },
    { name: `Sri Lanka`, code: 'LKA' },
    { name: `Sudan`, code: 'SDN' },
    { name: `Suriname`, code: 'SUR' },
    { name: `Sweden`, code: 'SWE' },
    { name: `Switzerland`, code: 'CHE' },
    { name: `Syrian Arab Republic`, code: 'SYR' },
    { name: `Taiwan`, code: 'TWN' },
    { name: `Tajikistan`, code: 'TJK' },
    { name: `Tanzania`, code: 'TZA' },
    { name: `Thailand`, code: 'THA' },
    { name: `Timor-Leste`, code: 'TLS' },
    { name: `Untuk pergi`, code: 'TGO' },
    { name: `Tokelau`, code: 'TKL' },
    { name: `Tonga`, code: 'TON' },
    { name: `Trinidad dan Tobago`, code: 'TTO' },
    { name: `Tunisia`, code: 'TUN' },
    { name: `Turki`, code: 'TUR' },
    { name: `Turkmenistan`, code: 'TKM' },
    { name: `Kepulauan Turks dan Caicos`, code: 'TCA' },
    { name: `Tuvalu`, code: 'TUV' },
    { name: `Uganda`, code: 'UGA' },
    { name: `Ukraine`, code: 'UKR' },
    { name: `Emiriah Arab Bersatu`, code: 'ARE' },
    { name: `United Kingdom`, code: 'GBR' },
    { name: `Amerika Syarikat`, code: 'USA' },
    { name: `Amerika Syarikat Kepulauan Minor Outlying`, code: 'UMI' },
    { name: `Uruguay`, code: 'URY' },
    { name: `Uzbekistan`, code: 'UZB' },
    { name: `Vanuatu`, code: 'VUT' },
    { name: `Venezuela`, code: 'VEN' },
    { name: `Viet Nam`, code: 'VNM' },
    { name: `Pulau British Virgin`, code: 'VGB' },
    { name: `Kepulauan Virgin Amerika Syarikat`, code: 'VIR' },
    { name: `Sahara Barat`, code: 'ESH' },
    { name: `Yaman`, code: 'YEM' },
    { name: `Zambia`, code: 'ZMB' },
    { name: `Zimbabwe`, code: 'ZWE' },
  ]
}
