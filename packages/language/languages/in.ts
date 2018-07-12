import { currencySymbols, transferLimits } from 'lndr/currencies'

const CUR = currencySymbols
const TL = transferLimits

const generalCommunicationError = 'Terjadi masalah hubungan dengan server. Silakan coba lagi nanti.'

export default {

  applicationName: `Lndr`,
  helloWorld: `Halo, dunia!`,
  submit: `KIRIM`,
  next: `Selanjutnya`,
  cancel: `Batalkan`,
  back: `Kembali`,
  copy: `Salin ke Papan Klip`,
  confirmAccount: `Konfirmasi`,
  createAccount: `Buat Akun`,
  recoverAccount: `Pulihkan Akun`,
  removeAccount: `Hapus Akun`,
  updateAccount: `Perbarui Akun`,
  loginAction: `Buka Kunci`,
  enterPin: `MASUKKAN PIN ANDA`,
  changePin: `Ubah PIN`,
  enterCurrentPin: `Masukan PIN Saat Ini`,
  logoutAction: `KELUAR`,
  seeAllActivity: `Lihat Semua Aktivitas`,
  copiedClipboard: `Disalin ke Papan Klip`,
  pleaseWait: `Mohon tunggu`,
  addFriend: `Tambahkan Teman`,
  addFriendConfirmationQuestion: `Anda yakin ingin menambahkan pengguna ini sebagai teman?`,
  removeFriend: `Hapus Teman`,
  currentFriends: `Teman Saat Ini`,
  removeFriendConfirmationQuestion: `Anda yakin ingin menghapus pengguna ini sebagai teman?`,
  inviteFriends: `Undang Teman ke Lndr`,
  tryLndr: `Coba aplikasi Lndr di sini:`,
  friendInfo: `Informasi selengkapnya tentang pertemanan ini:`,
  noFriends: `Tambahkan beberapa teman untuk memulai!`,
  noMatches: `Tidak ditemukan pengguna yang cocok`,
  noBalances: `Anda tidak memiliki catatan utang`,
  addFriendButton: `Tambahkan Teman`,
  alreadyFriendsButton: `Teman`,
  friendShell: `Teman`,
  tip: `Tip:`,
  notice: `Pemberitahuan:`,
  welcome: `Selamat datang di LNDR Anda!`,
  noBalanceWarning: `Kami tidak dapat memuat saldo Anda saat ini. Silakan coba lagi nanti.`,
  totalBalance: `Total Saldo:`,
  totalBalances: `Total Mitra Pengimbang:`,
  newTransaction: `Transaksi Baru`,
  needsReview: `Menunggu Persetujuan`,
  owesMe: `Seseorang berutang pada saya`,
  iOwe: `Saya berutang pada seseorang`,
  newPassword: `Kata Sandi Baru (minimal 8 karakter)`,
  confirmPassword: `Konfirmasi Kata Sandi`,
  newPin: `4 digit PIN baru`,
  enterNewPin: `ATUR 4 DIGIT PIN BARU`,
  confirmPin: `KONFIRMASI PIN ANDA`,
  newAccount: `Buat akun baru`,
  loginAccount: `Buka akun Anda`,
  recoverExistingAccount: `Pulihkan akun yang sudah ada`,
  recoverMnemonic: `Frasa Pemulih Akun (12 kata yang ditampilkan \nsaat Anda membuat akun)`,
  recoverMnemonicLengthError: `Frasa pemulih akun harus tepat 12 kata.`,
  successTitle: `Berhasil`,
  errorTitle: `Terjadi kesalahan`,
  showMnemonic: `Tampilkan 12 kata frasa pemulih akun`,
  mnemonicExhortation: `Frasa 12 kata ini dibutuhkan untuk memulihkan akun Anda. Simpan di tempat yang aman dan rahasia.`,
  addressExhortation: `Kirim Ethereum ke alamat Anda agar Anda dapat melunasi utang di Lndr.`,
  removeAccountTitle: `Anda yakin ingin menghapus akun Anda dari perangkat ini?`,
  removeAccountExhortation: `Pastikan Anda memiliki akses ke frasa pemulih akun untuk memulihkan akun Anda nanti karena penghapusan informasi akun Anda dari perangkat ini bersifat permanen.`,
  myAccount: `Akun Saya`,
  setNickname: `Atur nama panggilan agar teman-teman dapat mencari Anda`,
  setEmail: `Atur email untuk menerima informasi tentang update Lndr`,
  nickname: `Nama panggilan (huruf kecil & angka)`,
  email: `Alamat Email`,
  accountManagement: {
    nickname: {
      lengthViolation: `Nama panggilan harus terdiri dari minimal 3 karakter.`,
      compositionViolation: `Nama panggilan hanya boleh berupa angka dan huruf kecil.`,
      duplicationViolation: `Nama panggilan sudah digunakan.`,
    },
    email: {
      compositionViolation: `Format email salah.`,
      duplicationViolation: `Email sudah digunakan.`,
    },
    pin: {
      lengthViolation: `PIN harus terdiri dari minimal 4 karakter.`,
      matchViolation: `PIN harus sesuai.`,
      failedHashComparison: `PIN tidak valid. Silakan coba lagi.`,
      updateSuccess: `PIN Anda telah diperbarui.`,
      updateError: `Terjadi kesalahan saat memperbarui PIN Anda.`,
    },
    mnemonic: {
      lengthViolation: `Frasa pemulih akun harus terdiri dari minimal 12 kata.`,
      unableToValidate: `Frasa pemulih akun yang dimasukkan tidak valid. Silakan coba lagi.`,
    },
    setNickname: {
      success: `Nama panggilan Anda telah disimpan.`,
      error: generalCommunicationError
    },
    setEmail: {
      success: `Email Anda telah disimpan.`,
      error: generalCommunicationError
    },
    lockTimeout: {
      top: `Anda harus memasukkan PIN Anda setelah`,
      bottom: `menit tidak aktif.`,
      update: `Perbarui`,
      error: `Kami tidak dapat memperbarui pengaturan akun Anda.`,
      success: `Waktu Kunci Layar Diperbarui`,
    },
    addFriend: {
      success: X => `Permintaan pertemanan dikirimkan ke @${X}`,
      error: generalCommunicationError
    },
    removeFriend: {
      success: X => `Dihapus dari daftar teman: @${X}`,
      error: generalCommunicationError
    },
    loadInformation: {
      error: generalCommunicationError
    },
    ethBalance: {
      display: Y => `Saldo ETH Anda adalah ${String(Y).slice(0,8)}.`,
      inFiat: (Z, B, A) => `(${CUR(A)}${String(Number(Z) * Number(B)).slice(0, 8)})`,
      getError: `Tidak dapat memuat saldo ETH`,
      manage: `Kelola ETH`,
    },
    sendEth: {
      error: {
        insufficient: `Anda tidak memiliki cukup ETH untuk transaksi ini.`,
        generic: `Terjadi kesalahan saat transfer. Silakan coba lagi nanti.`,
        address: `Masukkan alamat yang valid`,
        amount: `Masukkan jumlah yang lebih besar dari 0`,
        limitExceeded: A => `Anda hanya dapat mengirimkan ${CUR(A)}${TL(A)} per minggu. Silakan pilih jumlah yang lebih kecil.`
      },
      amount: `Jumlah yang Dikirim`,
      address: `Alamat Tujuan (tanpa awalan '0x')`,
      transfer: `Transfer ETH`,
      transferAll: `Transfer Semuanya`,
      balance: Y => `Saldo ETH Anda saat ini adalah ${typeof Y === 'string' ? Y.slice(0,8) :''}.`,
      ethAddress: `Alamat Ethereum`,
      txCost: (B, A) => `Biaya transaksi saat ini adalah ${CUR(A)}${B}.`,
      transferLowercase: `Transfer ETH`,
      note: A => `Perhatian: Anda hanya dapat mentransfer ${CUR(A)}${TL(A)} per minggu dari Lndr.`,
      warning: (Z, A) => `Anda memiliki ${CUR(A)}${Z} tersisa dari batas ${CUR(A)}${TL(A)} Anda.`,
    },
    sendBcpt: {
      error: {
        insufficient: `Anda tidak memiliki cukup BCPT untuk transaksi ini.`,
        generic: `Terjadi kesalahan saat transfer. Silakan coba lagi nanti.`,
      },
      transfer: `Transfer BCPT`,
      address: `Alamat Tujuan (tanpa awalan '0x')`,
      balance: Y => `Saldo BCPT Anda saat ini adalah ${typeof Y === 'string' ? Y.slice(0,8) :''}.`,
      bcptAddress: `Alamat BCPT`,
    },
    changeProfilePic: `Ketuk untuk Mengubah`,
    addProfilePic: `Gunakan Gambar dari Ponsel`,
    panelHeaders: [
      `Alamat ETH (& BCPT)`,
      `Saldo ETH`,
      `Saldo BCPT`,
      `Hapus Akun`,
      `Riwayat Transaksi ETH`,
      `Ubah Mata Uang Primer`,
      `Ubah PIN`,
      `Ubah Nama Panggilan`,
      `Ubah Email`,
      `Ubah Foto Profil`,
      `Ubah Waktu Kunci Layar`,
      `Frasa Pemulih Akun`,
      `Pemberitahuan`,
    ],
    viewEtherscan: `Lihat Riwayat Etherscan`,
    profilePic: {
      change: `Ubah Foto Profil`,
      setError: `Terjadi kesalahan saat mengunggah gambar Anda. Silakan coba lagi nanti.`,
      getError: `Terjadi kesalahan saat memuat foto profil Anda.`,
      setSuccess: `Foto profil diperbarui`,
    },
    logoutSuccess: `Anda berhasil keluar!`,
    logoutError: generalCommunicationError,
  },

  currentBalance: {
    eth: `Saldo ETH Anda saat ini:`,
    bcpt: `Saldo BCPT Anda saat ini:`,
  },

  welcomeView: {
    by: `DIBUAT OLEH`,
    makeItEasy: `Lndr membantu Anda melacak utang sederhana.`,
    weHelpFriends: `Kami membantu teman-teman hidup, bekerja, dan bermain bersama.`,
    len: `Pemin`,
    dot: `.`,
    der: `jam`,
    shareDinner: `Makan Malam Bersama`,
    fillTank: `Mengisi Bensin`,
    travelTogether: `Bepergian Bersama`,
    runEthereum: `Kami beroperasi menggunakan ETH!`,
    firstLendingApp: `Aplikasi pinjaman seluler pertama yang dijamin di rantai blok.`,
    greatConcert: `Menyaksikan Konser Besar`,
    youPlayWithFriends: `Anda bermain dengan teman-teman.\n Kami akan mengatur tagihannya…`,
    start: `Mulai`,
  },

  debtManagement: {
    shell: `Transaksi Baru`,
    add: `Tambahkan Utang`,
    selectFriend: `Pilih`,
    lend: `Pinjaman Baru`,
    borrow: `Utang Baru`,
    iLent: `Teman berutang pada saya`,
    iBorrowed: `Saya berutang pada teman`,
    settleUpLower: `Lunasi`,
    amountToSettle: `Jumlah yang Dilunasi`,
    total: `Total`,
    record: `catatan`,
    records: `catatan`,
    chooseCurrency: `Pilih mata uang`,
    
    createError: {
      amountTooLow: `Jumlah harus lebih besar dari $0.`,
      amountTooHigh: `Jumlah harus kurang dari $1,000,000,000.`,
      selfAsFriend: `Anda tidak dapat berutang pada diri sendiri. Pilih teman lainnya.`,
      pending: `Selesaikan transaksi tertunda Anda dengan pengguna ini sebelum melakukan transaksi lain.`,
      insufficientEth: E => `Anda membutuhkan minimal ${E} ETH untuk melunasi. Buka Pengaturan untuk melihat saldo Anda.`,
    },
    fields: {
      currency: `Mata uang`,
      amount: `Jumlah`,
      settlementAmount: `Jumlah Pelunasan`,
      selectFriend: `Teman`,
      memo: `Memo`,
      direction: `Pilih Pernyataan yang Benar`,
    },
    memo: {
      example: `Ketikkan memo di sini`,
    },
    direction: {
      lend: X => `${X} berutang pada saya.`,
      borrow: X => `Saya berutang pada ${X}.`,
      initiatedLend: X => `${X} mengatakan dia berutang.`,
      initiatedBorrow: X => `${X} mengatakan Anda berutang.`,
      pendingLend: X => `@${X} berutang pada Anda.`,
      pendingBorrow: X => `Anda berutang pada @${X}.`,
      pendingLendSettlement: S => `@${S.debtorNickname} meminta pelunasan dengan ${S.settlementCurrency}.`,
      pendingBorrowSettlement: S => `@${S.creditorNickname} ingin melunasi Anda dengan ${S.settlementCurrency}.`,
      pendingLendSettlementMe: S => `Anda diminta untuk melunasi @${S.debtorNickname} dengan ${S.settlementCurrency}.`,
      pendingBorrowSettlementMe: S => `Anda meminta agar @${S.creditorNickname} melunasi dengan ${S.settlementCurrency}.`,
    },
    pending: {
      success: F => `Utang tertunda dikirimkan ke @${F.nickname}.`,
      error: generalCommunicationError
    },
    pendingParens: `(tertunda)`,
    confirmation: {
      transaction: CP => `Transaksi dengan ${CP} berhasil dikonfirmasi.`,
      settlement: CP => `Pelunasan dengan ${CP} berhasil dikonfirmasi.`,
      error: `Tidak dapat mengonfirmasi transaksi saat ini. Silakan coba lagi nanti.`,
    },
    rejection: {
      success: `Transaksi ditolak.`,
      error: `Tidak dapat menolak transaksi saat ini. Silakan coba lagi nanti.`,
    },
    balances: {
      error: `Tidak dapat memuat saldo saat ini. Silakan coba lagi nanti.`,
    },
    for: M => `untuk ${M}`,
    settleUp: `Lunasi`,
    settleTotal: `Jumlah Pelunasan`,
    settleUpMemo: (D, A) => `${D === 'lend'? 'Melunasi': 'Permintaan pelunasan'} ${A}.`,
    recordSettleUpMemo: `melunasi`,
    balanceByCurrency: `Rincian`,
  },
  settlementManagement: {
    bilateral: {
      error: {
        insufficient: X => `Pelunasan Anda dengan ${X} gagal karena dana tidak mencukupi.`,
        generic: X => `Terjadi kesalahan saat memproses pelunasan Anda dengan ${X}.`,
      }
    },
    eth: `Lunasi dengan ETH`,
    nonPayment: `Catat Pelunasan`,
  },

  accountViewLanguage: {
    lndr: `L n d r`,
    home: `Beranda`,
    friends: `Teman`,
    activity: `Aktivitas`,
  },

  notifications: {
    toggleNotifications: `Notifikasi Beralih`,
    enable: `Aktifkan`,
    disable: `Matikan`,
  },

  pendingTransactionsLanguage: {
    shell: `Transaksi Tertunda`,
    title: `Tertunda`,
    memo: `Memo:`,
    for: `Untuk`,
    none: `Anda tidak memiliki transaksi tertunda.`,
    confirmationQuestion: `Anda yakin ingin mengonfirmasi transaksi ini?`,
    pendingAnnouncement: `Transaksi ini menunggu konfirmasi dari pihak lain.`,
    bilateral: `Menunggu transfer ETH selesai`,
    confirm: `Konfirmasi`,
    reject: `Tolak Transaksi`,
    rejectRequest: `Tolak`,
    cancel: `Batalkan Transaksi`,
    direction: {
      lend: (X, Z) => `@${X} berutang ${Z} pada Anda.`,
      borrow: (X, Z) => `Anda berutang ${Z} pada @${X}.`,
    }
  },

  pendingSettlementsLanguage: {
    shell: `Pelunasan Tertunda`,
    title: `Tertunda`,
    none: `Anda tidak memiliki pelunasan tertunda.`,
    confirm: `Konfirmasi`,
    reject: `Tolak Pelunasan`,
    cancel: `Batalkan Pelunasan`,
  },

  recentTransactionsLanguage: {
    title: `Selesai`,
    none: `Anda tidak memiliki transaksi selesai.`,
    direction: {
      lend: (X, Z) => `@${X} berutang ${Z} pada Anda.`,
      borrow: (X, Z) => `Anda berutang ${Z} pada @${X}.`
    },
    balance: `Saldo`,
    consolidatedBalance: `Saldo`,
    friends: FS => `(dari ${FS} ${FS === 1 ? 'teman' :'teman'})`,
  },

  tabs: {
    home: `Beranda `,
    friends: `Teman`,
    activity: `Aktivitas`,
  },

  confirmation: {
    shell: `Konfirmasi`,
    done: `Selesai`,
    create: {
      start: `Kami telah mengirimkan catatan ke `,
      end: ` untuk konfirmasi.`,
    },
    confirm: {
      start: `Anda telah mengonfirmasi catatan ini dari `,
      end: `.`,
    },
    reject: {
      start: `Kami memberi tahu `,
      end: ` tahu bahwa Anda menolak catatan ini.`,
    },
    confirmFriend: {
      start: `Anda sekarang berteman dengan `,
      end: `!`,
    },
    rejectFriend: {
      start: `Anda menolak permintaan pertemanan dari `,
      end: `.`,
    },
    ethSent: {
      start: `Anda berhasil mengirimkan `,
      end: ` ETH, dan hash transaksi Anda adalah `,
    },
    bcptSent: {
      start: `Anda berhasil mengirimkan `,
      end: ` BCPT, dan hash transaksi Anda adalah `,
    },
    status: `Anda dapat melihat status transaksi ini di `,
    activity: `tab aktivitas.`,
  },

  pendingFriendRequestsLanguage: {
    shell: `Permintaan Pertemanan`,
    message: `Permintaan Pertemanan`,
    request: F => `${F} ingin berteman dengan Anda!`,
  },

  privacyPolicy: {
    link: `lndr.io/terms/`,
    message: `Dengan mengklik di bawah Anda mengkonfirmasi bahwa Anda telah membaca dan setuju dengan kebijakan privasi Blockmason ini. Blockmason dapat menggunakan alamat email Anda untuk mengirim pembaruan tentang Blockmason dan LNDR. Berikut ini adalah link ke kebijakan privasi:`
  }
}
