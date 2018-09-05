const generalCommunicationError = 'サーバーに接続するのにエラーが発生しました。しばらくしてから、もう一度お試しください'

import { currencySymbols, transferLimits } from 'lndr/currencies'

const CUR = currencySymbols
const TL = transferLimits

export default {
  applicationName: `Lndr`,
  helloWorld: `Hello world`,
  submit: `送信`,
  next: `次`,
  cancel: `キャンセル`,
  back: `戻る`,
  copy: `クリップボードにコピー`,
  confirmAccount: `決定`,
  createAccount: `アカウント作成`,
  recoverAccount: `アカウント復元`,
  removeAccount: `アカウント削除`,
  updateAccount: `アカウント更新`,
  loginAction: `解除する`,
  enterPin: `PINコードを入力してください`,
  changePin: `PINコードを変更する`,
  enterCurrentPin: `現在のPINコードを入力してください`,
  logoutAction: `ログアウト`,
  seeAllActivity: `全アクティビティを表示`,
  copiedClipboard: `クリップボードにコピーされました`,
  pleaseWait: `しばらくお待ちください`,
  addFriend: `友達を追加する`,
  addFriendConfirmationQuestion: `本当にこのユーザーを友達に追加しますか`,
  removeFriend: `友達からはずす`,
  currentFriends: `友達`,
  inviteFriends: `本当にこのユーザーを友達からはずしますか？`,
  tryLndr: `友達をLndrに招待する`,
  removeFriendConfirmationQuestion: `Lndrを試したい方はこちらから：`,
  friendInfo: `この友達の詳細`,
  noFriends: `まずは友達を何人か追加してみよう！`,
  noMatches: `ユーザーが見つかりませんでした`,
  noBalances: `記録されているあなたの負債（借り）は、現在ありません。`,
  addFriendButton: `友達を追加する`,
  alreadyFriendsButton: `友達`,
  friendShell: `友達`,
  tip: `ヒント`,
  notice: `注意：`,
  welcome: `Lndrへようこそ`,
  noBalanceWarning: `現在、あなたの残高をロードすることができませんでした。しばらく経ってからお試しください。`,
  totalBalance: `残高`,
  totalBalances: `取引相手の数：`,
  newTransaction: `新しい取引`,
  needsReview: `承認の保留中`,
  owesMe: `貸しがある`,
  iOwe: `借りがある`,
  newPassword: `新しいパスワード（８字以上）`,
  confirmPassword: `パスワードを確定する`,
  newPin: `新しい４字のPINを設定してください`,
  enterNewPin: `新しい４字のPINを確認してください`,
  confirmPin: `PINを確認してください`,
  newAccount: `新しいアカウントを作成`,
  loginAccount: `アカウントを解除する`,
  recoverExistingAccount: `既存のアカウントを復元する`,
  recoverMnemonic: `アカウント情報を忘れた時の復元用の単語`,
  recoverMnemonicLengthError: `復元用の単語は12個です`,
  successTitle: `成功`,
  errorTitle: `エラー`,
  showMnemonic: `12個の復元用の単語を表示`,
  mnemonicExhortation: `この12個の単語はアカウントを復元する時に使用します。大切に保管しておいてください。`,
  addressExhortation: `Lndrで貸し借りの帳消しをするため、あなたのアドレスにEthereumを送る`,
  removeAccountTitle: `本当にアカウントをこのデバイスから削除しますか？`,
  removeAccountExhortation: `アカウント復元に必要な12個の単語が保管されていることを、確認してください。さもないと、デバイスから永久にあなたのデータが消去され復元できません。`,
  myAccount: `自分のアカウント`,
  setNickname: `友達から見つけてもらうためにニックネームを設定`,
  setEmail: `Lndrから最新情報を受け取るためのメールアドレスを設定`,
  nickname: `ニックネーム（小文字と数字）`,
  email: `メールアドレス`,

  accountManagement: {
    nickname: {
      lengthViolation: `ニックネームは３字以上です`,
      compositionViolation: `ニックネームに使用できる文字：数字、小文字`,
      duplicationViolation: `このニックネームは既に使われています`,
    },
    email: {
      compositionViolation: `正しいメールアドレスを入力してください`,
      duplicationViolation: `このメールアドレスで登録されているアカウントが既に存在します`,
    },
    pin: {
      lengthViolation: `PINは最低4文字です`,
      matchViolation: `PINは合致する必要があります`,
      failedHashComparison: `PINが間違っています。正しいPINを入力してください。`,
      updateSuccess: `PINが更新されました`,
      updateError: `PIN更新中にエラーが発生しました`,
    },
    mnemonic: {
      lengthViolation: `アカウント復元用の単語は最低12語です`,
      unableToValidate: `復元用の単語が違います。再度入力してください。`,
    },
    setNickname: {
      success: `ニックネームが保存されました`,
      error: generalCommunicationError
    },
    setEmail: {
      success: `メールアドレスが登録されました`,
      error: generalCommunicationError
    },
    lockTimeout: {
      top: `後でPINを入力する必要があります`,
      bottom: `セッションが無効になるまでの時間`,
      update: `アップデート`,
      error: `アカウントの更新に失敗しました`,
      success: `ロックタイムアウト更新`,
    },
    addFriend: {
      success: X => `@${X}にフレンド・リクエストが送信されました`,
      error: generalCommunicationError
    },
    removeFriend: {
      success: X => `@${X}が友達から削除されました`,
      error: generalCommunicationError
    },
    loadInformation: {
      error: generalCommunicationError
    },
    ethBalance: {
      display:Y => `あなたのETH残高は${String(Y).slice(0,8)}です`,
      getError: `ETHの受けとりに失敗しました`,
      manage: `ETHの管理`,
    },
    sendEth: {
      error: {
        insufficient: `資金不足のため送付に失敗しました`,
        generic: `送付に失敗しました。しばらくしてからもう一度お試しください`,
        address: `正しいアドレスを入力してください`,
        amount: `０より大きい値を入力してください`,
        limitExceeded: A => `一週間にLndrから引き出せるのは ${CUR[A]}${TL[A]} までです`,
      },
      amount: `送付額`,
      address: `送付先アドレス（先頭の '0x'は入力不要）`,
      transfer: `ETHをやりとりする`,
      transferAll: `全てを送付する`,
      balance: Y =>　`あなたの現在のETH残高は${ typeof Y === 'string' ? Y.slice(0,8) :''}です`,
      ethAddress: `イーサリアムアドレス`,
      txCost: (B, A) => `現在の取引手数料は ${CUR[A]}${B}です`,
      transferLowercase: `イーサリアムを送付する`,
      note: A =>　`一週間にLndrから引き出せるのは ${CUR[A]}${TL[A]} までです`,
      warning: (Z, A) => `現在 ${CUR[A]}${TL[A]} のうち ${CUR[A]}${Z}残っています `,
    },
    sendBcpt: {
      error: {
        insufficient: `BCPTが不足しているため送付できません`,
        generic: `エラーがありました。しばらくしてから、もう一度お試しください`,
      },
      transfer: `BCPTのやりとり`,
      address: `送付先アドレス（先頭の '0x'は入力不要）`,
      balance: Y => `あなたの現在のBCPT残高は${typeof Y === 'string' ? Y.slice(0,8) :''}`,
      bcptAddress: `BCPTアドレス`,
    },
    panelHeaders: [
      `ETH (& BCPT) アドレス`,
      `ETH残高`,
      `BCPT残高`,
      `アカウントを削除する`,
      `ETHのやりとり履歴`,
      `ペイパルを接続します`,
      `主要通貨を変更`,
      `PINを変える`,
      `メールアドレスを変える`,
      `タイムアウトする時間を変える`,
      `復元用の単語（ニューモニック）`,
      `通知`,
    ],
    viewEtherscan: `Etherscanで履歴を見る`,
    profilePic: {
      change: `プロフィール画像を変更する`,
      setError: `画像のアップロード中にエラーが起きました。しばらくしてからもう一度お試しください。`,
      getError: `画像の読み込みでエラーが起きました`,
      setSuccess: `プロフィール画像が更新されました`,
    },
    logoutSuccess: `ログアウトに成功しました`,
    logoutError: generalCommunicationError,
  },

  currentBalance: {
    eth: `現在のETH残高：`,
    bcpt: `現在のBCPT残高：`,
  },

  welcomeView: {
    by: `BUILT BY`,
    makeItEasy: `Lndrは簡単な債務（借り）を追跡するのに便利です`,
    weHelpFriends: `生活、仕事、娯楽をサポートします`,
    len: `Len`,
    dot: `.`,
    der: `der`,
    shareDinner: `ディナー代をシェア`,
    fillTank: `ガソリンを満タンに`,
    travelTogether: `旅をともに楽しむ`,
    runEthereum: `イーサリアム上で稼働`,
    firstLendingApp: `ブロックチェーン上で動く、安全性が保証されているモバイルアプリ`,
    greatConcert: `素晴らしいコンサートを楽しむ`,
    youPlayWithFriends: `あなたは友人の時間を堪能し、会計はアプリにお任せ`,
    start: `はじめよう`,
  },

  walkthrough: {
    skip: `スキップ`,
    continue: `続ける`,
    step1: {
      easyToUse: `Lndrは様々な出費の割り勘、友人や家族間でのちょっとした貸し借りを管理するシンプルな手段です。`,
      len: `Len`,
      der: `der`,
    },
    step2: {
      getStarted: `友達を追加して、Lndrを使ってみましょう`,
      friendsScreen: `Lndrを友人や家族に紹介するために、を検索・追加・招待しましょう`,
    },
    step3: {
      title: `トランザクションの記録`,
      easy: `支払いを友人と分割や貸し借りの追跡は、Lndrであれば簡単です！`,
      selectFriend: `友達を選び、利用する通貨と金額を選択します。`,
      addMemo: `必要に応じてメモを追加し、[送信]をクリックします。`,
    },
    step4: {
      title: `実行する`,
      ready: `実行してよろしいですか？`,
      payPal: `Lndrを利用する際、\ N-あなたはペイパルを選択することができます。`,
      ether: `- Etherのような暗号通貨で`,
      cash: `- あるいは通常通りに現金で`,
      positiveBalance: `10.46`,
    },
    step5: {
      title: `複数通貨`,
      multiCurrency: `Lndrでは、異なる通貨同士でのやりとりも追跡することができます。`,
      exchangeRate: `貸し借りを帳消しすることが決定すると、すべてのトランザクションは最新の為替レートに応じて、主要通貨に換算されます。`,
      start: `Lndrを使ってみましょう！`,
    }
  },

  debtManagement: {
    shell: `新しい取引`,
    add: `負債（借り）を追加する`,
    selectFriend: `選択する`,
    lend: `新しい債権（貸し）`,
    borrow: `新しい負債（借り）`,
    owesMe: `あなたは債権（貸し）があります`,
    iOwe: `あなたは借りがあります`,
    iLent: `友達はあなたに負債（借り）があります`,
    iBorrowed: `友達に負債（借り）があります`,
    settleUpLower: `清算する`,
    amountToSettle: `清算額`,
    total: `総額`,
    record: `履歴`,
    records: `履歴`,
    chooseCurrency: `通貨を選択してください`,

    createError: {
      amountTooLow: `$0以上の金額を入力してください`,
      amountTooHigh: `$1,000,000,000以下の金額を入力してください`,
      selfAsFriend: `自分自身の債務（借り）は選択できません。別の友達を選択してください。`,
      pending: `別のやりとりを始める前に、現在の分を済ませてください`,
      insufficientEth: E => `決済するためには少なくとも ${E} ETH 必要です, 自分の残高を確認するには設定をご覧ください`,
    },
    
    fields: {
      currency: `通貨`,
      amount: `金額`,
      settlementAmount: `決済金額`,
      selectFriend: `友達`,
      memo: `メモ`,
      direction: `正しい貸借表を選択してください`,
    },
    memo: {
      example: `ここにメモを入力してください`,
    },
    direction: {
      lend: X => `${X} は私に対して負債（借り）があります`,
      borrow: X => `私には ${X}の負債（借り）があります`,
      initiatedLend: X => `${X}は、彼らに負債（借り）があると言っています`,
      initiatedBorrow: X => `${X}はあなたは債権（貸し）があると言っています`,
      pendingLend: X => `@${X} はあなたに負債（借り）があります`,
      pendingBorrow: X => `あなたは @${X}に負債（借り）があります`,
      pendingLendSettlement: S => `@${S.debtorNickname} が ${S.settlementCurrency}で決済することを要請しています`,
      pendingBorrowSettlement: S => `@${S.creditorNickname} があなたと ${S.settlementCurrency}で決済したがっています`,
      pendingLendSettlementMe: S => ` @${S.debtorNickname}と  ${S.settlementCurrency}で決済することを要請しました`,
      pendingBorrowSettlementMe: S => ` @${S.creditorNickname}に ${S.settlementCurrency}で決済する申請を出しました`,
    },
    pending: {
      success: F => `@${F.nickname}に提出した負債（借り）は保留中`,
      error: generalCommunicationError
    },
    pendingParens: `(保留中)`,
    confirmation: {
      transaction: CP => ` ${CP} とのやりとりが確定しました`,
      settlement: CP => ` ${CP}との決済が確定しました`,
      error: `現在やりとりを承認できません。しばらくして、もう一度お試しください。`,
    },
    rejection: {
      success: `やりとりが失敗しました`,
      error: `現在、やりとりを拒否できません。再度お試しください`,
    },
    balances: {
      error: `残高を表示することができません。しばらくして、もう一度お試しください`,
    },
    for: M => `${M}宛て`,
    settleUp: `帳消しする`,
    settleTotal: `帳消し総額`,
    settleUpMemo: (D, A) => `${A}${D === 'lend' ? 'に清算する ' :  ' を決算する申請'}`,
    recordSettleUpMemo: `帳消し中`,
    balanceByCurrency: `ETHで決済`,
  },

  settlementManagement: {
    bilateral: {
      error: {
        insufficient: X => `資金不足のため @${X}とのやりとりに失敗しました`,
        generic: X => `@${X}とのやりとりの処理中にエラーが起きました`,
      }
    },
    eth: `PayPalで決済`,
    paypal: `決済を記録する`,
    nonPayment: `Lndr`,
  },

  accountViewLanguage: {
    lndr: `ホーム`,
    home: `友達`,
    friends: `アクティビティ`,
    activity: `通知を設定する`,
  },

  notifications: {
    toggleNotifications: `オンにする`,
    enable: `オフにする`,
    disable: `申請中の取引`,
  },

  pendingTransactionsLanguage: {
    shell: `申請中`,
    title: `メモ：`,
    memo: `宛て`,
    for: `申請中の取引はありません`,
    none: `申請中のやりとりはありません`,
    confirmationQuestion: `本当にこのやりとりを承認しますか`,
    pendingAnnouncement: `このやりとりは相手の承認待ちです`,
    bilateral: `ETHの送付完了待ちです`,
    confirm: `確定する`,
    reject: `やりとりを拒否する`,
    rejectRequest: `拒否する`,
    cancel: `取引をキャンセルする`,
    direction: {
      lend: (X, Z) => `@${X} はあなたに対して ${Z}の負債（借り）があります`,
      borrow: (X, Z) => `あなたは @${X}に対して ${Z}の負債（借り）があります`,
    }
  },

  pendingSettlementsLanguage: {
    shell: `申請中のやりとり`,
    title: `申請中`,
    none: `申請中のやりとりはありません`,
    confirm: `確定する`,
    reject: `やりとりを拒否する`,
    cancel: `やりとりをキャンセルする`,
  },

  recentTransactionsLanguage: {
    title: `完了`,
    none: `完了したやりとりはありません`,
    direction: {
      lend: (X, Z) => `あなたは@${X} に対して ${Z}の債権（貸し）があります`,
      borrow: (X, Z) => ` @${X}はあなたに対して ${Z}の債権（貸し）があります`
    },
    balance: `貸し借り残高`,
    friends: FS => `(から${FS} ${FS === 1 ? '友達' :'友達'})`,
  },

  tabs: {
    home: ` ホーム `,
    friends: `  友達  `,
    activity: `アクティビティ`,
  },

  confirmation: {
    shell: `確定`,
    done: `完了`,
    create: {
      start: ``,
      end: `へ記録を送信しました`,
    },
    confirm: {
      start: ``,
      end: `から送信された記録を確認しました`,
    },
    reject: {
      start: `あなたが、この記録を拒否したことを`,
      end: `に知らせました`,
    },
    confirmFriend: {
      start: `と友達になりました`,
      end: `！`,
    },
    rejectFriend: {
      start: `からの友達リクエストを拒否しました`,
      end: `。`,
    },
    rejectOutboundFriendRequest: {
      start: `あなたは、`,
      end: `への友達リクエストをキャンセルしました.`,
    },
    ethSent: {
      start: `を送信するのに成功しました。あなたのトランザクション・ハッシュは`,
      end: `です`,
    },
    bcptSent: {
      start: `を送信するのに成功しました。あなたのトランザクション・ハッシュは`,
      end: `です`,
    },
    requestPayPalPayee: {
      start: `あなたがPayPalで決済したい旨を`,
      end: `に知らせました。`,
    },
    requestPayPalPayment: {
      start: `あなたがPayPalで決済したい旨を`,
      end: `に知らせました。`,
    },
    settledWithPayPal: {
      start: `あなたがPayPalで決済したことを`,
      end: `に知らせました。`,
    },
    status: `この取引の状況をアクティビティ`,
    activity: `のタブから見ることができます。`,
  },

  pendingFriendRequestsLanguage: {
    shell: `友達リクエスト`,
    message: `友達リクエスト`,
    request: F => `@${F} があなたと友達になりたがっています`,
    outbound: F => `あなたは @${F}に友達リクエストを送信しました`,
  },

  privacyPolicy: {
    link: `lndr.io/terms/`,
    message: `以下をクリックすることでBlockmasonのプライバシー・ポリシーに同意します。あなたのメールアドレスにBlockmasonやLndrに関する最新情報が送信される可能性があります。プライバシー・ポリシーへのリンクはこちら：`,
  },

  payPalLanguage: {
    connectPayPal: `ペイパルを接続する`,
    connectSuccess: `ペイパル利用が有効になりました`,
    disconnectPayPal: `ペイパルとの接続を解除`,
    disconnected: `ペイパルは切断されました`,
    requestPayPalPayment: `ペイパルの支払いを要求`,
    sendWithPayPal: `ペイパルで送ります`,
    enablePayPal: `ペイパルを有効にします`,
    requestPayPalPayee: `ペイパルをリクエスト`,
    enablePayPalForFriend: F => `PayPalを利用可能にすることで、@${F}はあなたに支払いができるようになります.`,
    friendNotEnabled: F => `@${F}は、PayPal支払いを有効にしていません`,
    friendRequestedConnect: F => `@${F}はPayPal経由であなたに支払いを希望しています`,
    requestFriendConnect: F => `PayPalを有効にするようにi、@${F} に依頼しました`,
    feesNotification: `PayPalの手数料が含まれていません`,
    feesInformationHeader: `PayPalの手数料情報`,
    feesInformation: `1.あなたのPayPalアカウントを銀行口座に接続する必要があります。
    
2.あなたの銀行の通貨と異なる通貨で支払う場合$ 0.35の手数料が発生します。

3.国際取引手数料：
    アメリカからカナダ/ヨーロッパへ：$ 2.99
    アメリカから他の国へ：$ 4.99

4.これらの手数料は変更される可能性があります。最新情報をご確認ください。`,
    payPalSite: `PayPal.com`,
  }
}
