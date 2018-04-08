import { currencySymbols, transferLimits } from 'lndr/currencies'

const CUR = currencySymbols
const TL = transferLimits

const generalCommunicationError = '服务器通信有问题，请稍后再试。'

export default {

  applicationName: `Lndr`,
  helloWorld: `你好，世界`,
  submit: `提交`,
  next: `下一个`,
  cancel: `取消`,
  back: `回去`,
  copy: `复制到剪贴板`,
  confirmAccount: `确认`,
  createAccount: `创建帐号`,
  recoverAccount: `恢复帐户`,
  removeAccount: `删除帐户`,
  updateAccount: `更新账户`,
  loginAction: `开锁`,
  enterPin: `请输入您的密码`,
  changePin: `更改密码`,
  enterCurrentPin: `输入当前密码`,
  logoutAction: `登出`,
  seeAllActivity: `查看所有活动`,
  copiedClipboard: `复制到剪贴板`,
  pleaseWait: `请等一下`,
  addFriend: `添加好友`,
  addFriendConfirmationQuestion: `你确定你想将此用户添加为好友？`,
  removeFriend: `删除好友`,
  currentFriends: `现在的朋友`,
  removeFriendConfirmationQuestion: `你确定你想删除此用户为好友？`,
  inviteFriends: `邀请好友加入Lndr`,
  tryLndr: `试行Lndr应用程序：`,
  friendInfo: `友谊的信息：`,
  noFriends: `添加一些朋友！`,
  noMatches: `没有匹配的用户发现`,
  noBalances: `你没有记录的债务`,
  addFriendButton: `添加好友`,
  alreadyFriendsButton: `好友`,
  friendShell: `朋友`,
  tip: `温馨提示：`,
  notice: `注意：`,
  welcome: `欢迎您LNDR`,
  noBalanceWarning: `我们无法在这个时候来装载您的余额，请稍后再试。`,
  totalBalance: `总余额：`,
  totalBalances: `总交易对手：`,
  newTransaction: `新交易`,
  needsReview: `需要回顾`,
  owesMe: `别人欠了我`,
  iOwe: `我欠了别人`,
  newPassword: `新密码（最少8个字符）`,
  confirmPassword: `确认密码`,
  newPin: `新的4位数的密码`,
  enterNewPin: `请设置一个新的4位数的密码`,
  confirmPin: `请确认您的密码`,
  newAccount: `创建一个新账户`,
  loginAccount: `解锁您的帐户`,
  recoverExistingAccount: `恢复现有帐户`,
  recoverMnemonic: `助记符（12个字显示当您创建帐户）`,
  recoverMnemonicLengthError: `助记符应该正好12个字`,
  successTitle: `成功`,
  errorTitle: `错误`,
  showMnemonic: `显示12个字助记符`,
  mnemonicExhortation: `需要这12个字的短语来恢复您的帐户，请妥善保存在安全和秘密的地方`,
  addressExhortation: `发送复仇到您的地址，因此您可以在Lndr偿还债务`,
  removeAccountTitle: `你确定你想从该设备上移除您的帐户？`,
  removeAccountExhortation: `请确保您可以访问你的记忆后，恢复您的账户，因为这是一个永久性的去除此设备您的帐户信息。`,
  myAccount: `我的帐户`,
  setNickname: `设置一个昵称，让您的朋友可以搜索你`,
  setEmail: `设置邮件接收上Lndr更新的信息`,
  nickname: `昵称（小写＆号）`,
  email: `电子邮件地址`,
  accountManagement: {
    nickname: {
      lengthViolation: `昵称至少应为3个字符。`,
      compositionViolation: `昵称只能包含数字和小写字母。`,
      duplicationViolation: `昵称已被使用`,
    },
    email: {
      compositionViolation: `电子邮件格式不正确`,
      duplicationViolation: `电子邮件已经被采取`,
    },
    pin: {
      lengthViolation: `密码应至少为4个字符。`,
      matchViolation: `密码应该匹配。`,
      failedHashComparison: `密码无效，请重试。`,
      updateSuccess: `您的验证码被更新`,
      updateError: `有一个错误，不能更新您的密码`,
    },
    mnemonic: {
      lengthViolation: `助记符应该至少有12个字。`,
      unableToValidate: `输入的助记符无效，请重试。`,
    },
    setNickname: {
      success: `您的昵称被保存了。`,
      error: generalCommunicationError
    },
    setEmail: {
      success: `您的邮箱被保存了。`,
      error: generalCommunicationError
    },
    lockTimeout: {
      top: `您必须在闲置`,
      bottom: `分钟后登录`,
      update: `更新`,
      error: `我们无法更新您的帐户设置`,
      success: `锁定超时更新`,
    },
    addFriend: {
      success: X => `发送到@${X}朋友请求`,
      error: generalCommunicationError
    },
    removeFriend: {
      success: X =>`从好友中删除：@${X}`,
      error: generalCommunicationError
    },
    loadInformation: {
      error: generalCommunicationError
    },
    ethBalance: {
      display: Y =>`你ETH余额是${String(Y).slice(0,8) }`,
      inFiat: (Z, B, A) => ` (${CUR[A]}${String(Number(Z) * Number(B)).slice(0, 8)})`,
      getError: `检索的Eth有错误`,
      manage: `管理ETH`,
    },
    sendEth: {
      error: {
        insufficient: `传送失败，由于资金不足`,
        generic: `有一个与传输错误，请稍后再试`,
        address: `请输入一个有效的地址`,
        amount: `请输入大于0的金额`,
        limitExceeded: A => `你只能发送${CUR[A]} ${TL [A]}每周，请选择一个较小的数额`,
      },
      amount: `量发送`,
      address: `目标地址（无“0x”前缀）`,
      transfer: `转让ETH`,
      transferAll: `一切转移`,
      balance: Y => `您当前ETH余额为${typeof Y === 'string'? Y.slice(0,8) :''}`,
      ethAddress: `以太坊地址`,
      txCost: (B, A) => `当前交易成本是${CUR[A]} ${B}`,
      transferLowercase: `转移的Eth`,
      note: A => `请注意：您从Lndr只能转移${CUR[A]} ${TL [A]}每周`,
      warning: (Z, A) => `你有${CUR[A]} ${Z}剩余的${CUR[A]} ${TL [A]} 限制`,
    },
    sendBcpt: {
      error: {
        insufficient: `您没有足够的BCPT此交易`,
        generic: `有一个与传输错误，请稍后再试`,
      },
      transfer: `转让BCPT`,
      address: `目标地址（无“0x”前缀）`,
      balance: Y => `您当前BCPT余额为${typeof Y === 'string'? Y.slice(0,8) : ''}`,
      bcptAddress: `BCPT地址`,
    },
    changeProfilePic: `更改头像`,
    addProfilePic: `选择头像`,
    panelHeaders: [
      `ETH（BCPT）地址`,
      `ETH平衡`,
      `BCPT平衡`,
      `ETH交易记录`,
      `更改密码`,
      `更改昵称`,
      `更改电子邮件`,
      `更改头像`,
      `更改锁定超时`,
      `助记符`,
      `通知`,
    ],
    viewEtherscan: `查看Etherscan历史`,
    profilePic: {
      change: `更改头像`,
      setError: `有一个错误上传你的照片，请稍后重试`,
      getError: `发生错误检索您的头像`,
      setSuccess: `头像被更新了`,
    },
    logoutSuccess: `您退出了！`,
  },

  currentBalance: {
    eth: `您当前的Eth余额为：`,
    bcpt: `您当前的BCPT余额为：`,
  },

  welcomeView: {
    by: `由BLOCKMASON`,
    makeItEasy: `Lndr可以很容易地追踪简单的债务`,
    weHelpFriends: `我们帮助朋友一起生活，工作，和玩。`,
    len: `LEN`,
    dot: `.`,
    der: `DER`,
    shareDinner: `分享晚餐`,
    fillTank: `加满油箱`,
    travelTogether: `一起旅行`,
    runEthereum: `我们在ETHEREUM区块链网络上运行！`,
    firstLendingApp: `第一移动应用程序的贷款固定在区块链。`,
    greatConcert: `参加一个伟大的音乐会`,
    youPlayWithFriends: `你跟朋友一起玩; \n我们会跟踪帐户...`,
    start: `入门`,
  },

  debtManagement: {
    shell: `新交易`,
    add: `新债务`,
    selectFriend: `选择好友`,
    lend: `借给朋友`,
    borrow: `从朋友借`,
    iLent: `好友欠了我`,
    iBorrowed: `我欠了好友`,
    settleUpLower: `偿清债务`,
    amountToSettle: `解决的金额`,
    total: `总`,
    record: `记录`,
    records: `记录`,
    createError: {
      amountTooLow: `金额必须大于 0`,
      amountTooHigh: `金额必须低于$ 1,000,000,000`,
      selfAsFriend: `你不能和自己创建债务，选择另一位好友`,
      pending: `创建之前，请解决您和这位好友的未决事务`,
      insufficientEth: E => `你至少需要${E} ETH`,
    },
    fields: {
      amount: `量`,
      settlementAmount: `解决的金额`,
      selectFriend: `朋友`,
      memo: `备忘录`,
      direction: `选择正确的语句`,
    },
    memo: {
      example: `类型备忘录这里`,
    },
    direction: {
      lend: X =>`${X}欠我`,
      borrow: X =>`我欠${X}`,
      initiatedLend: X =>`${X}说他/她欠你`,
      initiatedBorrow: X =>`${X}说你欠`,
      pendingLend: X =>`@${X}欠你`,
      pendingBorrow: X => `你欠@${X}`,
      pendingLendSettlement: S =>`@${S.debtorNickname}请求用${S.settlementCurrency}偿清债务`,
      pendingBorrowSettlement: S =>`@${S.creditorNickname}希望用${S.settlementCurrency}偿清债务`,
      pendingLendSettlementMe: S => `你要求用${S.settlementCurrency}与@${S.debtorNickname}偿清债务`,
      pendingBorrowSettlementMe: S => `你要求@${S.creditorNickname}用${S.settlementCurrency}偿清债务`,
    },
    pending: {
      success: F =>`债务提交对@${F.nickname}`,
      error: generalCommunicationError
    },
    pendingParens: `（ 未决定 ）`,
    confirmation: {
      transaction: CP =>`与${CP}交易已确认了`,
      settlement: CP =>`与${CP}偿清债务已确认了`,
      error: `此时无法确认交易，请稍后再试`,
    },
    rejection: {
      success: `交易被拒绝了`,
      error: `此时无法拒绝的交易，请稍后再试`,
    },
    balances: {
      error: `此时无法装载余额，请稍后再试`,
    },
    for: M =>`为${M}`,
    settleUp: `偿清债务`,
    settleTotal: `偿清总债务`,
    settleUpMemo: (D, A) => `${D === 'lend' ? "偿清债务" : "请求偿清债务"} ${A}`,
    recordSettleUpMemo: `债务偿清了`,
  },
  settlementManagement: {
    bilateral: {
      error: {
        insufficient: X => `资金不足和${X}偿清债务`,
        generic: X => `时出错使和${X}偿清您的债务`,
      }
    },
    eth: `用ETH偿清债务`,
    nonPayment: `偿清债务`,
  },

  accountViewLanguage: {
    lndr: `LEN - DER`,
    home: `家`,
    friends: `朋友`,
    activity: `活动`,
  },

  notifications: {
    toggleNotifications: `更改通知`,
    enable: `打开`,
    disable: `关掉`,
  },

  pendingTransactionsLanguage: {
    shell: `未决定交易`,
    title: `未决定交易`,
    memo: `备忘录：`,
    for: `对于`,
    none: `没有未决定交易`,
    confirmationQuestion: `你确定要确认此笔交易？`,
    pendingAnnouncement: `本次交易是由对方等待确认。`,
    bilateral: `等待Eth的转让完成`,
    confirm: `确认交易`,
    reject: `拒绝交易`,
    rejectRequest: `拒绝交易`,
    cancel: `取消交易`,
    direction: {
      lend: (X, Z) =>`@${X}欠你${Z}`,
      borrow: (X, Z) => `你欠@${X} ${Z}`
    }
  },

  pendingSettlementsLanguage: {
    shell: `未偿清债务`,
    title: `未偿清债务`,
    none: `您没有未偿清债务`,
    confirm: `确认交易`,
    reject: `拒绝交易`,
    cancel: `取消交易`,
  },

  recentTransactionsLanguage: {
    title: `完成交易`,
    none: `您还没有完成交易`,
    direction: {
      lend: (X, Z) =>`@${X}欠你${Z}`,
      borrow: (X, Z) => `你欠@${X} ${Z}`
    },
    balance: `账户余额`,
    friends: FS => `(由${FS} ${FS === 1 ? '朋友' : '朋友'}) `,
  },

  tabs: {
    home: `   家   `,
    friends: `  好友们  `,
    activity: `  活动  `,
  },

  confirmation: {
    shell: `确认交易`,
    done: `完成交易`,
    create: {
      start: `我们已将相关记录到`,
      end: `确认。`,
    },
    confirm: {
      start: `您确认此交易`,
      end: `。`,
    },
    reject: {
      start: `我们已经通知 `,
      end: `你拒绝了这个交易。`,
    },
    confirmFriend: {
      start: `您和`,
      end: `是新好友！`,
    },
    rejectFriend: {
      start: `您拒绝好友的要求`,
      end: `。`,
    },
    ethSent: {
      start: `您发送`,
      end: `ETH和您的交易记录号是：`,
    },
    bcptSent: {
      start: `您发送`,
      end: `BCPT和您的交易记录号是`,
    },
    status: `你可以在活动选项卡看到`,
    activity: `这个交易的状态。`,
  },

  pendingFriendRequestsLanguage: {
    shell: `请求好友`,
    message: `请求好友`,
    request: F =>`${F}愿意跟你做好友！`
  }
}
