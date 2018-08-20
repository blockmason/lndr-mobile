import { currencySymbols, transferLimits } from 'lndr/currencies'

const CUR = currencySymbols
const TL = transferLimits

const generalCommunicationError = 'Có vấn đề xảy ra khi đang kết nối với máy chủ, vui lòng thử lại sau.'

export default {

  applicationName: `Lndr`,
  helloWorld: `Chào thế giới`,
  submit: `GỬI`,
  next: `Kế tiếp`,
  cancel: `Hủy bỏ`,
  back: `Quay lại`,
  copy: `Sao chép vào clipboard`,
  confirmAccount: `Xác nhận`,
  createAccount: `Tạo tài khoản`,
  recoverAccount: `Khôi phục tài khoản`,
  removeAccount: `Xoá tài khoản`,
  updateAccount: `Cập nhật tài khoản`,
  loginAction: `Mở khóa`,
  enterPin: `VUI LÒNG NHẬP MÃ PIN`,
  changePin: `Thay đổi mã PIN`,
  enterCurrentPin: `Nhập mã PIN hiện tại`,
  logoutAction: `ĐĂNG XUẤT`,
  seeAllActivity: `Xem tất cả Hoạt động`,
  copiedClipboard: `Đã sao chép vào clipboard`,
  pleaseWait: `Vui lòng chờ`,
  addFriend: `Thêm bạn`,
  addFriendConfirmationQuestion: `Bạn có chắc chắn muốn thêm người dùng này như một người bạn?`,
  removeFriend: `Hủy bỏ bạn bè`,
  currentFriends: `Bạn bè hiện tại`,
  removeFriendConfirmationQuestion: `Bạn có chắc chắn muốn xoá người dùng này như một người bạn?`,
  inviteFriends: `Mời bạn bè tham gia Lndr`,
  tryLndr: `Trải nghiệm ứng dụng Lndr tại đây:`,
  friendInfo: `Xem chi tiết về tình bạn này:`,
  noFriends: `Thêm một số người bạn để bắt đầu!`,
  noMatches: `Không tìm thấy người dùng phù hợp`,
  noBalances: `Bạn không có khoản nợ được ghi nhận`,
  addFriendButton: `Thêm bạn`,
  alreadyFriendsButton: `Bạn bè`,
  friendShell: `Bạn bè`,
  tip: `Mẹo nhỏ:`,
  notice: `Chú ý:`,
  welcome: `Chào mừng bạn đến với LNDR`,
  noBalanceWarning: `Không thể tải số tiền còn lại của bạn ở thời điểm hiện tại, vui lòng thử lại sau.`,
  totalBalance: `Tổng Số tiền còn lại:`,
  totalBalances: `Tổng Các bên tham gia:`,
  newTransaction: `Giao dịch mới`,
  needsReview: `Chờ phê duyệt`,
  owesMe: `Người khác nợ tôi`,
  iOwe: `Tôi nợ người khác`,
  newPassword: `Mật khẩu mới (tối thiểu 8 ký tự)`,
  confirmPassword: `Xác nhận mật khẩu`,
  newPin: `4 chữ số mã PIN mới`,
  enterNewPin: `VUI LÒNG CÀI ĐẶT 4 CHỮ SỐ MÃ PIN MỚI`,
  confirmPin: `VUI LÒNG XÁC NHẬN MÃ PIN CỦA BẠN`,
  newAccount: `Tạo tài khoản mới`,
  loginAccount: `Mở khóa tài khoản của bạn`,
  recoverExistingAccount: `Khôi phục tài khoản đã có`,
  recoverMnemonic: `Gợi ý (12 chữ hiển thị \nkhi bạn đã tạo tài khoản)`,
  recoverMnemonicLengthError: `Gợi ý phải chính xác 12 chữ`,
  successTitle: `Thành công`,
  errorTitle: `Lỗi`,
  showMnemonic: `Hiển thị 12-Chữ Gợi ý`,
  mnemonicExhortation: `Cụm 12 chữ này cần thiết để khôi phục lại tài khoản của bạn, xin vui lòng giữ nó an toàn và bảo mật`,
  addressExhortation: `Gửi Ethereum đến địa chỉ của bạn để bạn có thể thanh toán các khoản nợ trên Lndr`,
  removeAccountTitle: `Bạn có chắc chắn muốn xóa tài khoản của bạn từ thiết bị này?`,
  removeAccountExhortation: `Hãy chắc chắn rằng bạn có thể truy cập vào gợi ý ghi nhớ để khôi phục lại tài khoản của bạn sau này, do thao tác này sẽ xóa bỏ vĩnh viễn thông tin tài khoản của bạn từ thiết bị này.`,
  myAccount: `Tài khoản của tôi`,
  setNickname: `Đặt biệt danh để bạn bè của bạn có thể tìm kiếm bạn`,
  setEmail: `Đặt email để nhận thông tin cập nhật về Lndr`,
  nickname: `Biệt danh (chữ thường & số)`,
  email: `Địa chỉ email`,
  accountManagement: {
    nickname: {
      lengthViolation: `Biệt danh nên có ít nhất 3 ký tự.`,
      compositionViolation: `Biệt danh chỉ có thể bao gồm số và chữ thường.`,
      duplicationViolation: `Biệt danh đã được sử dụng`,
    },
    email: {
      compositionViolation: `Định dạng email không đúng`,
      duplicationViolation: `Email này đã được sử dụng`,
    },
    pin: {
      lengthViolation: `Mã PIN phải có ít nhất 4 ký tự.`,
      matchViolation: `Mã PIN phải trùng khớp.`,
      failedHashComparison: `Mã PIN không hợp lệ, xin vui lòng thử lại.`,
      updateSuccess: `Mã PIN đã được cập nhật`,
      updateError: `Có lỗi khi cập nhật mã PIN của bạn`,
    },
    mnemonic: {
      lengthViolation: `Gợi ý ghi nhớ nên có ít nhất 12 chữ.`,
      unableToValidate: `Các gợi ý đã nhập không hợp lệ, xin vui lòng thử lại.`,
    },
    setNickname: {
      success: `Đã lưu biệt danh.`,
      error: generalCommunicationError
    },
    setEmail: {
      success: `Đã lưu email.`,
      error: generalCommunicationError
    },
    lockTimeout: {
      top: `Bạn phải nhập mã PIN sau`,
      bottom: `phút không kích hoạt`,
      update: `Cập nhật`,
      error: `Chúng tôi không thể cập nhật cài đặt tài khoản của bạn`,
      success: `Đã cập nhật Thời gian Timeout`,
    },
    addFriend: {
      success: X => `Yêu cầu kết bạn đã gởi đến @${X}`,
      error: generalCommunicationError
    },
    removeFriend: {
      success: X => `Đã gỡ bỏ khỏi danh sách bạn bè: @${X}`,
      error: generalCommunicationError
    },
    loadInformation: {
      error: generalCommunicationError
    },
    ethBalance: {
      display: Y => `Số dư ETH của bạn là ${String(Y).slice(0,8)}`,
      getError: `Không thể lấy số dư Eth`,
      manage: `Quản lý ETH`,
    },
    sendEth: {
      error: {
        insufficient: `Bạn không có đủ ETH để thực hiện giao dịch này`,
        generic: `Có lỗi xảy ra khi chuyển tiền, vui lòng thử lại sau`,
        address: `Vui lòng nhập địa chỉ hợp lệ`,
        amount: `Vui lòng nhập số tiền lớn hơn 0`,
        limitExceeded: A => `Bạn chỉ có thể gởi ${CUR(A)}${TL(A)} mỗi tuần, vui lòng chọn lựa số nhỏ hơn`
      },
      amount: `Số tiền gửi`,
      address: `Địa chỉ Gửi đến (không gắn tiền tố '0x')`,
      transfer: `Chuyển tiền ETH`,
      transferAll: `Chuyển hết`,
      balance: Y => `Số dư ETH hiện tại của bạn là ${typeof Y === 'string' ? Y.slice(0,8) :''}`,
      ethAddress: `Địa chỉ Ethereum`,
      txCost: (B, A) => `Chi phí giao dịch hiện tại là ${CUR(A)}${B}`,
      transferLowercase: `Chuyển tiền Eth`,
      note: A => `Lưu ý: bạn chỉ có thể chuyển ${CUR(A)}${TL(A)} mỗi tuần trên Lndr`,
      warning: (Z, A) => `Bạn còn lại ${CUR(A)}${Z} trong hạn mức ${CUR(A)}${TL(A)}`,
    },
    sendBcpt: {
      error: {
        insufficient: `Bạn không có đủ BCPT để thực hiện giao dịch này`,
        generic: `Có lỗi xảy ra khi chuyển tiền, vui lòng thử lại sau`,
      },
      transfer: `Chuyển tiền BCPT`,
      address: `Địa chỉ Gửi đến (không gắn tiền tố '0x')`,
      balance: Y => `Số dư BCPT hiện tại là ${typeof Y === 'string' ? Y.slice(0,8) :''}`,
      bcptAddress: `Địa chỉ BCPT`,
    },
    changeProfilePic: `Bấm để Thay đổi`,
    addProfilePic: `Sử dụng Hình ảnh từ Điện thoại`,
    panelHeaders: [
      `Địa chỉ ETH (& BCPT)`,
      `Số dư ETH`,
      `Số dư BCPT`,
      `Xoá tài khoản`,
      `Lịch sử giao dịch ETH`,
      `Bật PayPal`,
      `Thay đổi tiền tệ chính`,
      `Thay đổi mã PIN`,
      `Thay đổi Biệt danh`,
      `Thay đổi Email`,
      `Thay đổi Hình ảnh Đại diện`,
      `Thay đổi Thời gian Timeout`,
      `Gợi ý`,
      `Thông báo`,
    ],
    viewEtherscan: `Xem Lịch sử Etherscan`,
    profilePic: {
      change: `Thay đổi Ảnh đại diện`,
      setError: `Có lỗi xảy ra khi tải hình ảnh, vui lòng thử lại sau`,
      getError: `Có lỗi xảy ra khi lấy ảnh đại diện`,
      setSuccess: `Đã cập nhật ảnh đại diện`,
    },
    logoutSuccess: `Bạn đã đăng xuất thành công!`,
    logoutError: generalCommunicationError,
  },

  currentBalance: {
    eth: `Số Eth còn lại hiện tại của bạn là:`,
    bcpt: `Số BCPT còn lại hiện tại của bạn là:`,
  },

  welcomeView: {
    by: `ĐƯỢC XÂY DỰNG BỞI`,
    makeItEasy: `Lndr giúp bạn dễ dàng theo dõi các khoản nợ đơn giản`,
    weHelpFriends: `Giúp bạn và bạn bè của mình sống, làm việc, và giải trí cùng nhau.`,
    len: `Người`,
    dot: `.`,
    der: `cho mượn`,
    shareDinner: `Chia sẻ bữa tối`,
    fillTank: `Làm đầy két của bạn`,
    travelTogether: `Du lịch cùng nhau`,
    runEthereum: `Chúng tôi chạy trên ETH!`,
    firstLendingApp: `Ứng dụng di động về tín dụng đầu tiên được bảo mật trên blockchain.`,
    greatConcert: `Xem Buổi hòa nhạc hoành tráng`,
    youPlayWithFriends: `Bạn giải trí với bạn bè;\n chúng tôi sẽ lưu hóa đơn...`,
    start: `Bắt đầu`,
  },

  debtManagement: {
    shell: `Giao dịch mới`,
    add: `Thêm khoản nợ`,
    selectFriend: `Chọn`,
    lend: `Khoản vay mới`,
    borrow: `Khoản nợ mới`,
    owesMe: `Nợ tôi`,
    iOwe: `Tôi nợ`,
    iLent: `Một người bạn nợ tôi`,
    iBorrowed: `Tôi nợ một người bạn`,
    settleUpLower: `Trả tiền`,
    amountToSettle: `Số tiền thanh toán`,
    total: `Toàn bộ`,
    record: `ghi chép`,
    records: `ghi chép`,
    chooseCurrency: `Chọn một tệ`,
    
    createError: {
      amountTooLow: `Số tiền phải lớn hơn $0`,
      amountTooHigh: `Số tiền phải nhỏ hơn $1,000,000,000`,
      selfAsFriend: `Bạn không thể tạo khoản nợ với chính mình, hãy chọn một người bạn khác`,
      pending: `Hãy giải quyết giao dịch tồn động của bạn với người dùng này trước khi tạo thêm`,
      insufficientEth: E => `Bạn cần ít nhất ${E} ETH để thanh toán, đi đến Cài đặt để xem số dư của bạn`,
    },
    fields: {
      currency: `Tiền tệ`,
      amount: `Số tiền`,
      settlementAmount: `Số tiền thanh toán`,
      selectFriend: `Bạn bè`,
      memo: `Ghi chú`,
      direction: `Chọn Báo cáo Chính xác`,
    },
    memo: {
      example: `Nhập ghi chú tại đây`,
    },
    direction: {
      lend: X => `${X} nợ tôi`,
      borrow: X => `Tôi nợ ${X}`,
      initiatedLend: X => `${X} nói rằng anh ấy/cô ấy nợ`,
      initiatedBorrow: X => `${X} nói rằng bạn nợ`,
      pendingLend: X => `@${X} nợ bạn`,
      pendingBorrow: X => `Bạn nợ @${X}`,
      pendingLendSettlement: S => `@${S.debtorNickname} yêu cầu thanh toán bằng ${S.settlementCurrency}`,
      pendingBorrowSettlement: S => `@${S.creditorNickname} muốn thanh toán với bạn bằng ${S.settlementCurrency}`,
      pendingLendSettlementMe: S => `Bạn đã yêu cầu thanh toán với @${S.debtorNickname} bằng ${S.settlementCurrency}`,
      pendingBorrowSettlementMe: S => `Bạn đã yêu cầu @${S.creditorNickname} thanh toán bằng ${S.settlementCurrency}`,
    },
    pending: {
      success: F => `Khoản nợ tồn động đã được gởi đến @${F.nickname}`,
      error: generalCommunicationError
    },
    pendingParens: `(đang chờ xử lý)`,
    confirmation: {
      transaction: CP => `Giao dịch với ${CP} đã được xác nhận thành công`,
      settlement: CP => `Thanh toán với ${CP} đã được xác nhận thành công`,
      error: `Không thể xác nhận giao dịch ở thời điểm hiện tại, vui lòng thử lại sau`,
    },
    rejection: {
      success: `Giao dịch đã bị từ chối`,
      error: `Không thể từ chối giao dịch ở thời điểm hiện tại, vui lòng thử lại sau`,
    },
    balances: {
      error: `Không thể tải số dư ở thời điểm hiện tại, vui lòng thử lại sau`,
    },
    for: M => `cho ${M}`,
    settleUp: `Trả tiền`,
    settleTotal: `Tổng số Thanh toán`,
    settleUpMemo: (D, A) => `${D === 'lend' ? 'Thanh toán cho ' : 'Yêu cầu thanh toán cho'} ${A}`,
    recordSettleUpMemo: `đang thanh toán`,
    balanceByCurrency: `Chi tiết`,
  },
  settlementManagement: {
    bilateral: {
      error: {
        insufficient: X => `Thanh toán ${X} không thành công do không đủ tiền`,
        generic: X => `Đã có lỗi xảy ra khi đang thực hiện thanh toán ${X}`,
      }
    },
    eth: `Thanh toán bằng ​​ETH`,
    paypal: `Thanh toán bằng ​​PayPal`,
    nonPayment: `Ghi chép Thanh toán`,
  },

  accountViewLanguage: {
    lndr: `L n d r`,
    home: `Trang chủ`,
    friends: `Bạn bè`,
    activity: `Hoạt động`,
  },

  notifications: {
    toggleNotifications: `Chuyển đổi Thông báo`,
    enable: `Bật`,
    disable: `Tắt`,
  },

  pendingTransactionsLanguage: {
    shell: `Giao dịch đang chờ xử lý`,
    title: `Đang chờ`,
    memo: `Ghi chú:`,
    for: `Cho`,
    none: `Bạn không có giao dịch đang chờ xử lý`,
    confirmationQuestion: `Bạn có chắc chắn muốn xác nhận giao dịch này?`,
    pendingAnnouncement: `Giao dịch này đang chờ xác nhận của bên còn lại.`,
    bilateral: `Đang chờ chuyển tiền Eth hoàn tất`,
    confirm: `Xác nhận`,
    reject: `Từ chối Giao dịch`,
    rejectRequest: `Từ chối`,
    cancel: `Hủy Giao dịch`,
    direction: {
      lend: (X, Z) => `@${X} nợ bạn ${Z}`,
      borrow: (X, Z) => `Bạn nợ @${X} ${Z}`,
    }
  },

  pendingSettlementsLanguage: {
    shell: `Thanh toán đang chờ`,
    title: `Đang chờ`,
    none: `Bạn không có thanh toán đang chờ xử lý`,
    confirm: `Xác nhận`,
    reject: `Từ chối Thanh toán`,
    cancel: `Hủy bỏ Thanh toán`,
  },

  recentTransactionsLanguage: {
    title: `Hoàn tất`,
    none: `Bạn không có giao dịch đã hoàn tất`,
    direction: {
      lend: (X, Z) => `@${X} nợ bạn ${Z}`,
      borrow: (X, Z) => `Bạn nợ @${X} ${Z}`
    },
    balance: `Số dư`,
    consolidatedBalance: `Số dư`,
    friends: FS => `(từ ${FS} ${FS === 1 ? 'bạn bè' :'bạn bè'})`,
  },

  tabs: {
    home: `Trang chủ `,
    friends: `Bạn bè`,
    activity: `Hoạt động`,
  },

  confirmation: {
    shell: `Xác nhận`,
    done: `Hoàn tất`,
    create: {
      start: `Chúng tôi đã gửi bản ghi chép giao dịch đến `,
      end: ` để xác nhận.`,
    },
    confirm: {
      start: `Bạn đã xác nhận ghi chép này từ `,
      end: `.`,
    },
    reject: {
      start: `Chúng tôi đã thông báo cho `,
      end: ` biết bạn từ chối bản ghi này.`,
    },
    confirmFriend: {
      start: `Bạn đã kết bạn với `,
      end: `!`,
    },
    rejectFriend: {
      start: `Bạn đã từ chối yêu cầu kết bạn từ `,
      end: `.`,
    },
    ethSent: {
      start: `Bạn đã gửi thành công `,
      end: ` ETH và mã hóa giao dịch của bạn là `,
    },
    bcptSent: {
      start: `Bạn đã gửi thành công `,
      end: ` BCPT và mã hóa giao dịch của bạn là `,
    },
    requestPayPalPayee: {
      start: `Chúng tôi đã để cho `,
      end: ` biết rằng bạn muốn giải quyết với PayPal.`,
    },
    requestPayPalPayment: {
      start: `Chúng tôi đã để cho `,
      end: ` biết rằng bạn muốn được thanh toán bằng PayPal.`,
    },
    settledWithPayPal: {
      start: `Chúng tôi đã để cho `,
      end: ` biết rằng bạn đã giải quyết với PayPal.`,
    },
    status: `Bạn có thể xem trạng thái của giao dịch này trong `,
    activity: `tab hoạt động.`,
  },

  pendingFriendRequestsLanguage: {
    shell: `Yêu cầu kết bạn`,
    message: `Yêu cầu kết bạn`,
    request: F => `@${F} muốn kết bạn với bạn!`,
  },

  privacyPolicy: {
    link: `lndr.io/terms/`,
    message: `Bằng cách nhấp bên dưới, bạn xác nhận rằng bạn đã đọc và đồng ý với chính sách bảo mật của Blockmason. Blockmason có thể sử dụng địa chỉ email của bạn để gửi thông tin cập nhật về Blockmason và LNDR. Dưới đây là một liên kết đến chính sách bảo mật:`
  },

  payPalLanguage: {
    connectPayPal: `Kết nối PayPal`,
    connectSuccess: `PayPal kích hoạt thành công.`,
    disconnectPayPal: `Ngắt kết nối PayPal`,
    disconnected: `PayPal bị ngắt kết nối.`,
    requestPayPalPayment: `Yêu cầu thanh toán PayPal`,
    sendWithPayPal: `Gửi Với PayPal`,
    enablePayPal: `Bật PayPal`,
    requestPayPalPayee: `Yêu cầu PayPal`,
    enablePayPalForFriend: F => `Cho phép PayPal cho phép @${F} trả you.`,
    friendNotEnabled: F => `@${F} chưa kích hoạt PayPal thanh toán.`,
    friendRequestedConnect: F => `@${F} muốn trả tiền cho bạn thông qua PayPal`,
    requestFriendConnect: F => `Bạn hỏi @${F} để cho phép PayPal`,
    feesNotification: `Không bao gồm lệ phí PayPal`,
    feesInformationHeader: `PayPal Thông tin Phí`,
    feesInformation: `1. Tài khoản PayPal của bạn phải được gắn với một tài khoản ngân hàng.
    
2. Thanh toán bằng đồng tiền khác với tiền tệ của ngân hàng sẽ phải chịu một khoản phí $ 0,35.

3. Phí chuyển quốc tế:
    Mỹ sang Canada / Châu Âu: $ 2.99
    Mỹ đến bất cứ nơi nào khác: $ 4.99

4. Các khoản phí này là không toàn diện. Để biết thông tin cập nhật mới nhất hãy truy cập vào:

    https://www.paypal.com/us/webapps/mpp/paypal-fees#sending-us`,
    payPalSite: `PayPal.com`,
  }
}
