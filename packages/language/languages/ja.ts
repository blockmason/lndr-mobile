const generalCommunicationError = 'サーバーとの通信中にエラーが起きました。しばらくしてからお試しください。'

import { currencySymbols, transferLimits } from 'lndr/currencies'

export default {
  applicationName: `Lndr`,
  helloWorld: `Hello world`,
  submit: `送信する`,
  next: `次へ`,
  cancel: `取り消す`,
  back: `戻る`,
  copy: `クリップボードへコピー`,
  confirmAccount: `確認`,
  createAccount: `アカウントを作成する`,
  recoverAccount: `アカウントを復元する`,
  removeAccount: `アカウントを削除する`,
  updateAccount: `アカウントを更新する`,
  loginAction: `アンロック`,
  enterPin: `暗証番号を入力してください`,
  changePin: `暗証番号を変える`,
  enterCurrentPin: `暗証番号を入力してください`,
  logoutAction: `ログアウト`,
  seeAllActivity: `全アクティビティを閲覧`,
  copiedClipboard: `クリップボードへコピーしました`,
  pleaseWait: `お待ちください`,
  addFriend: `フレンドを追加`,
  addFriendConfirmationQuestion: `本当にこのユーザーをフレンドに追加しますか？`,
  removeFriend: `フレンドを外す`,
  currentFriends: `現在のフレンド`,
  inviteFriends: `友達をLndrに招待する`,
  tryLndr: `Lndrアプリはここから:`,
  removeFriendConfirmationQuestion: `本当にこのユーザーをフレンドから解除しますか？`,
  friendInfo: `この関係についての追加情報:`,
  noFriends: `フレンドを追加して始めよう!`,
  noMatches: `ユーザーが見つかりません`,
  noBalances: `借りがありません`,
  addFriendButton: `+ フレンドを追加`,
  alreadyFriendsButton: `フレンド`,
  friendShell: `友達`,
  tip: `チップ: `,
  notice: `通知: `,
  welcome: `あなたのLNDRへようこそ`,
  noBalanceWarning: `あなたの残高をロードすることに失敗しました。しばらくしてからお試しください。`,
  totalBalance: `残高合計: `,
  totalBalances: `相手方合計: `,
  newTransaction: `新しいやりとり`,
  needsReview: `審査が必要です`,
  owesMe: `私に貸しがあります`,
  iOwe: `私は借りがています`,
  newPassword: `新しいパスワード　(最低8文字)`,
  confirmPassword: `パスワードの確認`,
  newPin: `4桁の暗証番号`,
  enterNewPin: `新しい暗証番号を設定してください`,
  confirmPin: `あなたが入力した暗証番号はこちら`,
  newAccount: `新しいアカウントを作成する`,
  loginAccount: `アカウントをアンロックする`,
  recoverExistingAccount: `既存のアカウントを復旧する`,
  recoverMnemonic: `ニューモニック　\n(アカウントを作成した際に12個の単語が表示されます)`,
  recoverMnemonicLengthError: `ニューモニックは12個の単語です`,
  successTitle: `成功`,
  errorTitle: `エラー`,
  showMnemonic: `12個のニューモニックを表示する`,
  mnemonicExhortation: `この12個の単語は、アカウントの復活に必要です。安全な秘密の場所に保存してください`,
  addressExhortation: `イーサリアムをあなたのアドレスに送信し、Lndrで債務を果たしましょう`,
  removeAccountTitle: `本当にこのデバイスからあなたのアカウントを削除しますか？`,
  removeAccountExhortation: `このデバイスからアカウント情報を永久に削除するため、後でアカウントを復元する際にニーモニックにアクセスできることを確認してください。`,
  myAccount: `自分のアカウント`,
  setNickname: `フレンドに検索されるようにニックネームを設定しよう`,
  setEmail: `メールアドレスを入力して下さい`,
  nickname: `ニックネーム (小文字と半角数字)`,
  email: `メールアドレス`,

  accountManagement: {
  nickname: {
    lengthViolation: `ニックネームは最低3文字です.`,
    compositionViolation: `ニックネームは小文字と半角数字のみ有効です.`,
    duplicationViolation: `このニックネームは既に使用されています`,
  },
  email: {
    compositionViolation: `正しくメールアドレスを入力してください`,
    duplicationViolation: `このメールアドレスはすでに使われています`,
  },
  pin: {
    lengthViolation: `暗証番号は、4文字以上です.`,
    matchViolation: `暗証番号は合致しなければなりません.`,
    failedHashComparison: `暗証番号を正しく入力してください.`,
    updateSuccess: `暗証番号が更新されました`,
    updateError: `暗証番号を更新できませんでした`,
  },
  mnemonic: {
    lengthViolation: `ニモニックは最低12文字あるはずです.`,
    unableToValidate: `入力されたニューモニックは無効です。再度、お試しください。`,
  },
  setNickname: {
    success: `あなたのニックネームの登録が完了しました.`,
    error: generalCommunicationError
  },
  setEmail: {
    success: `メールアドレスは保存されました`,
    error: generalCommunicationError
  },
  lockTimeout: {
    top: `暗証番号は必須です`,
    bottom: `利用できません`,
    update: `更新`,
    error: `アカウント設定を更新できませんでした`,
    success: `タイムアウトする時間を変更しました`,
  },
  addFriend: {
    success: nickname => `${nickname}にフレンド申請が送られました`,
    error: generalCommunicationError
  },
  removeFriend: {
    success: nickname => `@${nickname}をあなたのフレンドから外しました`,
    error: generalCommunicationError
  },
  loadInformation: {
    error: generalCommunicationError
  },
  ethBalance: {
    display: balance => `あなたのETH残高はこちら ${String(balance).slice(0,8)} `,
    getError: `ETH残高を取得できません`,
    manage: `ETHを管理する`,
  },
  sendEth: {
    error: {
      insufficient: `必要な分のETHがありません`,
      generic: `送信時にエラーが起きました。時間をおいて、また送信してください`,
      address: `正しいアドレスを入力してください`,
      amount: `数値は0以上を入力してください`,
      limitExceeded: currency => `１週間に送れるのは ${currencySymbols(currency)}${transferLimits(currency)} までです。これより小さい数値を入力してください`,
    },
    amount: `送信額`,
    address: `送信先アドレス（先頭の0xは入力不要）`,
    transfer: `ETHを送信する`,
    transferAll: `TRANSFER EVERYTHING`,
    balance: (balance) => `現在のETH残高はこちら ${typeof balance === 'string' ? balance.slice(0,8) : ''}`,
    ethAddress: `イーサリアムアドレス`,
    txCost: (cost, currency) => `現在、1回あたりにかかるETH取引コストは ${currencySymbols(currency)}${cost}です `,
    transferLowercase: `ETHを送信する`,
    note: currency => `注意：１週間にLndrから送れるのは ${currencySymbols(currency)}${transferLimits(currency)} までです`,
    warning: (amount, currency) => `${currencySymbols(currency)}${amount} の送付上限に対し、残りは ${currencySymbols(currency)}${transferLimits(currency)} です`,
  },
  sendBcpt: {
    error: {
      insufficient: `必要な分のBCPTがありません`,
      generic: `送信時にエラーが起きました。時間をおいて、また送信してください`,
    },
    transfer: `BCPTを送信する`,
    address: `送信先アドレス（先頭の0xは入力不要）`,
    balance: (balance) => `現在のBCPT残高はこちら ${typeof balance === 'string' ? balance.slice(0,8) : ''}`,
    bcptAddress: `BCPTアドレス`,
  },
  changeProfilePic: `変更する`,
  addProfilePic: `端末の写真を使う`,
  panelHeaders: [
    `ETH (& BCPT) アドレス`,
    `EHT残高`,
    `BCPT残高`,
    `アカウントを削除する`,
    `ETHのやりとり履歴`,
    `ペイパルを有効にします`,
    `プライマリ通貨を変更`,
    `暗証番号を変える`,
    `ニックネームを変える`,
    `メールアドレスを変える`,
    `プロフィール画像を変える`,
    `タイムアウトする時間を変える`,
    `ニューモニック`,
    `通知`,
  ],
  viewEtherscan: `Etherscan履歴を確認する`,
  profilePic: {
    change: `プロフィール画像を変える`,
    setError: `プロフィール画像をアップロードできませんでした。のちほど、再度実行してください。`,
    getError: `プロフィール画像を表示できません`,
    setSuccess: `プロフィール画像がアップロードされました`,
  },
  logoutSuccess: `ログアウトしました!`,
  logoutError: generalCommunicationError,
},

  currentBalance: {
  eth: `現在のETH残高は:`,
  bcpt: `現在のBCPT残高は:`,
},

  welcomeView: {
  by: `開発元`,
  makeItEasy: `Lndrがあれば、借りを忘れません`,
  weHelpFriends: `フレンドの生活、仕事、娯楽をサポートします.`,
  len: `Len`,
  dot: `.`,
  der: `der`,
  shareDinner: `夕食を割り勘する`,
  fillTank: `ガソリンを満タンにする`,
  travelTogether: `一緒に旅行する`,
  runEthereum: `イーサリアムを活用しています！`,
  firstLendingApp: `史上初！ブロックチェーン技術を用いたレンディングアプリ`,
  greatConcert: `コンサートを見る`,
  youPlayWithFriends: `友人と遊ぶ時に。`,
  start: `始める`,
},

  debtManagement: {
  shell: `新しいやりとり`,
  add: `借りを追加する`,
  selectFriend: `選択`,
  lend: `新しい貸し`,
  borrow: `新しい借り`,
  iLent: `友人に貸しがあります`,
  iBorrowed: `友人に借りがあります`,
  settleUpLower: `帳消しにする`,
  amountToSettle: `送信額`,
  total: `合計`,
  record: `やりとり`,
  records: `やりとり`,
  chooseCurrency: `通貨を選択する`,

  createError: {
    amountTooLow: `金額は$0以上にしてください`,
    amountTooHigh: `金額は$1,000,000,000未満にしてください`,
    selfAsFriend: `自分自身に貸しを作ることはできません。フレンドを選んでください。`,
    pending: `新規のやりとりを開始する前に、承認待ちになっているやりとりに対処してください`,
    insufficientEth: eth => `帳消しするためには${eth}ETHが必要です。残高を設定で確認してください。`,
  },
  fields: {
    currency: `通貨`,
    amount: `金額`,
    settlementAmount: `決済額`,
    selectFriend: `フレンド`,
    memo: `メモ`,
    direction: `正しい説明を選択`,
  },
  memo: {
    example: `ここへメモを記入`,
  },
  direction: {
    lend: nickname => `@${nickname}はあなたに借りがあります`,
    borrow: nickname => `私は@${nickname}に借りがあります`,
    initiatedLend: nickname => `@${nickname}は彼／彼女に貸しがあります`,
    initiatedBorrow: nickname => `@${nickname}は彼／彼女に貸しがあります`,
    pendingLend: nickname => `@${nickname}はあなたに借りがあります`,
    pendingBorrow: nickname => `あなたは@${nickname}に貸しがあります`,
    pendingLendSettlement: settlement => `@${settlement.debtorNickname} は貸しとなっている${settlement.settlementCurrency}を帳消ししたいとリクエストしています`,
    pendingBorrowSettlement: settlement => `@${settlement.creditorNickname} は貸しとなっている${settlement.settlementCurrency}を帳消ししたいとリクエストしています`,
    pendingLendSettlementMe: settlement => `あなたは　@${settlement.creditorNickname}　に対し、${settlement.settlementCurrency}で帳消ししたいとリクエストしました`,
    pendingBorrowSettlementMe: settlement => `あなたは@${settlement.creditorNickname}が${settlement.settlementCurrency}で支払うように求めました`
  },
  pending: {
    success: friend => `@${friend.nickname}　に送信された負債は、承認待ちになっています`,
    error: generalCommunicationError
  },
  pendingParens: ` (承認待ち)`,
  confirmation: {
    transaction: counterParty => `${counterParty}とのやりとりは承認されました`,
    settlement: counterParty => `${counterParty}とのやりとりは完了しました`,
    error: `やりとりを確認できません。しばらくしてから再度お試しください。`,
  },
  rejection: {
    success: `取引が拒否されました。`,
    error: `やりとりを拒否できません。しばらくしてから再度お試しください。`,
  },
  balances: {
    error: `残高のロードに失敗しました。しばらくしてから再度お試しください。`,
  },
  for: memo => `${memo}のために`,
  settleUp: `帳消しにする`,
  settleTotal: `承認する`,
  settleUpMemo: (direction, amount) => direction === 'lend' ? `${amount} を設定` : `${amount} の帳消しをリクエスト`,
  recordSettleUpMemo: `アップセトリング`,
  balanceByCurrency: `細部`,
},

  settlementManagement: {
    bilateral: {
      error: {
        insufficient: nickname => `残高が少なかったため、${nickname} への支払いができませんでした`,
        generic: nickname => `${nickname} への支払い中に、エラーが発生しました`,
      }
    },
    eth: `ETHで帳消し`,
    paypal: `PayPalで帳消し`,
    nonPayment: `帳消ししたことを記録する`,
  },

  accountViewLanguage: {
  lndr: `L n d r`,
  home: `ホーム`,
  friends: `友達`,
  activity: `アクティビティ`,
},

  notifications: {
  toggleNotifications: `通知を切り替える`,
  enable: `オンにする`,
  disable: `オフにする`,
},

  pendingTransactionsLanguage: {
  shell: `保留になっているやりとり`,
  title: `承認待ち`,
  memo: `Memo:`,
  for: `For`,
  none: `あなたは承認待ちの取引がありません`,
  confirmationQuestion: `本当にこの取引を承認しますか？`,
  pendingAnnouncement: `この取引は相手方の承認待ちです.`,
  bilateral: `ETH送付が完了するのを待っています`,
  confirm: `承認`,
  reject: `取引を拒否`,
  rejectRequest: `拒否`,
  cancel: `取引のキャンセル`,
  direction: {
    lend: (nickname, amount) => `${nickname}  は、あなたに${amount}の貸しがあります`,
    borrow: (nickname, amount) => `あなたは${nickname} に${amount}の貸しがあります`,
  }
},

  pendingSettlementsLanguage: {
  shell: `まだ帳消しされていません`,
  title: `承認待ち`,
  none: `承認待ちのやりとりはありません`,
  confirm: `承認`,
  reject: `清算を拒否する`,
  cancel: `清算をキャンセルする`,
},

  recentTransactionsLanguage: {
  title: `完了`,
  none: `完了している取引がありません`,
  direction: {
    lend: (nickname, amount) => `${nickname} はあなたに${amount}の貸しがあります`,
    borrow: (nickname, amount) => `あなたは${nickname} に${amount}の貸しがあります`,
  },
  balance: `残高 `,
  friends: (friends) => `(${friends}からフレンドへ)`,
},

  tabs: {
    home: `ホーム`,
    friends: ` 友達 `,
    activity: `アクティビティ`,
  },

  confirmation: {
    shell: `承認`,
    done: `完了`,
    create: {
      start: `確認のため `,
      end: ` へ記録を送りました.`,
    },
    confirm: {
      start: ``,
      end: `から送られたこの記録は承認済みです.`,
    },
    reject: {
      start: ``,
      end: ` に通知を送ります.`,
    },
    ethSent: {
      start: `送信成功 `,
      end: ` あなたのETHとトランザクションハッシュは `,
    },
    bcptSent: {
      start: `送信成功 `,
      end: ` あなたのBCPTとトランザクションハッシュは `,
    },
    requestPayPalPayee: {
      start: `We've let `,
      end: ` know that you would like to settle with PayPal.`,
    },
    requestPayPalPayment: {
      start: `We've let `,
      end: ` know that you'd like to be paid with PayPal.`,
    },
    settledWithPayPal: {
      start: `We've let `,
      end: ` know that you've settled with PayPal.`,
    },
    status: `取引のステータスを確認するにはここ `,
    activity: `アクティビティタブ.`,
  },

  pendingFriendRequestsLanguage: {
    shell: `友達リクエスト`,
    message: `友達リクエスト`,
    request: F => `@${F}はあなたと友達になりたい！`
  },

  privacyPolicy: {
    link: `lndr.io/terms/`,
    message: `ボタンをクリックすると、Blockmasonのプライバシーポリシーに同意したことになります。 Blockmasonは、あなたのEメールアドレスを使ってBlockmasonとLNDRに関する最新情報をあなたに送信することができます。 ここでのプライバシーポリシーへのリンクは次のとおりです:`,
  },

  payPalLanguage: {
    connectPayPal: `ペイパルを接続します`,
    connectSuccess: `ペイパルは正常に有効化。`,
    disconnectPayPal: `外しペイパル`,
    disconnected: `ペイパルは切断されました。`,
    requestPayPalPayment: `ペイパルの支払いを要求`,
    sendWithPayPal: `ペイパルで送ります`,
    enablePayPal: `ペイパルを有効にします`,
    requestPayPalPayee: `ペイパルをリクエスト`,
    enablePayPalForFriend: F => `ペイパルを有効にすると、@${F}があなたに支払うことができます。`,
    friendNotEnabled: F => `@${F}はペイパル支払いを有効にしていません。`,
    friendRequestedConnect: F => `@${F}がペイパル経由でお支払いをご希望の場合`,
    requestFriendConnect: F => `@${F}にペイパルを有効にするように頼んだ`,
  }
}
