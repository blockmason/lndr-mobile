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
  friendInfo: `この友人関係の詳細`,
  noFriends: `まずは友達を何人か追加してみよう！`,
  noMatches: `ユーザーが見つかりませんでした`,
  noBalances: `記録されているあなたの負債は、現在ありません。`,
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
  newPassword: `新しいパスワード（８文字以上）`,
  confirmPassword: `パスワードを確定する`,
  newPin: `新しい４字のPINを設定してください`,
  enterNewPin: `新しい４文字のPINを確認してください`,
  confirmPin: `PINコードを確認してください`,
  newAccount: `新しいアカウントを作成`,
  loginAccount: `アカウントを解除する`,
  recoverExistingAccount: `既存のアカウントを復元する`,
  recoverMnemonic: `アカウント情報を忘れた時の復元用の単語`,
  recoverMnemonicLengthError: `復元用の単語は12単語です`,
  successTitle: `成功`,
  errorTitle: `エラー`,
  showMnemonic: `12個の復元用の単語を表示`,
  mnemonicExhortation: `この12の単語はアカウントを復元する時に使用します。大切に保管しておいてください。`,
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
      lengthViolation: `ニックネームは３文字以上です`,
      compositionViolation: `ニックネームに使用できる文字：数字、小文字`,
      duplicationViolation: `このニックネームは既に使われています`,
    },
    email: {
      compositionViolation: `正しいメールアドレスを入力してください`,
      duplicationViolation: `このメールアドレスで登録されているアカウントが既に存在します`,
    },
    pin: {
      lengthViolation: `PINコードは最低4文字です`,
      matchViolation: `PINコードは合致する必要があります`,
      failedHashComparison: `PINコードが間違っています。正しいPINを入力してください。`,
      updateSuccess: `PINコードが更新されました`,
      updateError: `PINコード更新中にエラーが発生しました`,
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
      top: `後でPINコードを入力する必要があります`,
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
        insufficient: `資金不足のため取引に失敗しました`,
        generic: `取引に失敗しました。しばらくしてからもう一度お試しください`,
        address: `正しいアドレスを入力してください`,
        amount: `０より大きい値を入力してください`,
        limitExceeded: A => `一週間にLndrから引き出せるのは ${CUR[A]}${TL[A]} までです`,
      },
      amount: `送金する金額`,
      address: `送信先アドレス（先頭の '0x'は入力不要）`,
      transfer: `ETHを取引する`,
      transferAll: `全てを送信する`,
      balance: Y =>　`あなたの現在のETH残高は${ typeof Y === 'string' ? Y.slice(0,8) :''}です`,
      ethAddress: `イーサリアムアドレス`,
      txCost: (B, A) => `現在の取引手数料は ${CUR[A]}${B}です`,
      transferLowercase: `ETHを取引する`,
      note: A =>　`一週間にLndrから引き出せるのは ${CUR[A]}${TL[A]} までです`,
      warning: (Z, A) => `現在 ${CUR[A]}${TL[A]} のうち ${CUR[A]}${Z}残っています `,
    },
    sendBcpt: {
      error: {
        insufficient: `BCPTが不足しているため取引ができません`,
        generic: `取引にエラーがありました。しばらくしてから、もう一度お試しください`,
      },
      transfer: `BCPTの取引`,
      address: `送信先アドレス（先頭の '0x'は入力不要）`,
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
    viewEtherscan: `Etherscanで取引履歴を見る`,
    profilePic: {
      change: `プロフィール画像を変更する`,
      setError: `画像のアップロード中にエラーが起きました。しばらくしてからもう一度お試しください。`,
      getError: `画像の読み込みにエラーが起きました`,
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
    makeItEasy: `Lndrは簡単な債務を追跡するのに便利です`,
    weHelpFriends: `生活、仕事、娯楽をサポートします`,
    len: `Len`,
    dot: `.`,
    der: `der`,
    shareDinner: `ディナー代をシェア`,
    fillTank: `ガソリンを満タンに`,
    travelTogether: `旅をともに楽しむ`,
    runEthereum: `Ethereum上で稼働`,
    firstLendingApp: `ブロックチェーン上で動く、安全性が保証されているモバイルアプリ`,
    greatConcert: `素晴らしいコンサートを楽しむ`,
    youPlayWithFriends: `あなたは友人の時間を堪能し、会計はアプリにお任せ`,
    start: `はじめよう`,
  },

  walkthrough: {
    skip: `スキップ`,
    continue: `持続する`,
    step1: {
      easyToUse: `Lndrは法案、共有費用を分割し、すべてのblockchainにしっかりと行って、友人や家族と簡単な借金を解決する最も簡単な方法です。`,
      len: `Len`,
      der: `der`,
    },
    step2: {
      getStarted: `Lndrを開始するには、あなたは友人を追加する必要があります。`,
      friendsScreen: `、の検索、追加、またはLndrに接続するためにお友達やご家族を招待する友人の画面にアクセスしてください。`,
    },
    step3: {
      title: `トランザクションの記録`,
      easy: `法案を分割するか、友人との債務を追加するとLndrに簡単です！`,
      selectFriend: `あなたの友人、あなたの通貨と金額を選択します。`,
      addMemo: `メモボックスにいくつかのメモを追加し、[送信]をクリックします。`,
    },
    step4: {
      title: `手形を決済する`,
      ready: `あなたの請求書を決済する準備ができましたか?`,
      payPal: `それはLndrにアップ落ち着くための時間だときは、\ N-あなたはペイパルを選択することができます。`,
      ether: `- エーテルのようなcryptocurrencies：`,
      cash: `- あるいは単に現金決済を記録します。`,
      positiveBalance: `1046`,
    },
    step5: {
      title: `マルチ通貨`,
      multiCurrency: `Lndrは、彼らが異なる通貨で発生しても、あなたのトランザクションを追跡することができます。`,
      exchangeRate: `あなたはあなたの友人とアップセトルすることを決定した場合は、すべてのトランザクションは、最新の為替レートが使用可能に使用して、主要通貨に換算されます。`,
      start: `Lndrを使用してスタート！`,
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
      selfAsFriend: `自分に対する債務を追うことはできません。別の友達を選択してください。`,
      pending: `他の取引を始める前に、申請中の取引を済ませてください、`,
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
      success: F => `@${F.nickname}に保留中の債務を送信しました`,
      error: generalCommunicationError
    },
    pendingParens: `(保留中)`,
    confirmation: {
      transaction: CP => ` ${CP} との取引が確定しました`,
      settlement: CP => ` ${CP}との決済が確定しました`,
      error: `現在取引を確定することができません。しばらくして、もう一度お試しください。`,
    },
    rejection: {
      success: `取引が失敗しました`,
      error: `現在、取引を拒否することができません。再度お試しください`,
    },
    balances: {
      error: `残高を表示することができません。しばらくして、もう一度お試しください`,
    },
    for: M => `${M}宛て`,
    settleUp: `清算する`,
    settleTotal: `清算総額`,
    settleUpMemo: (D, A) => `${D === 'lend' ? 'に清算する ' :  ' ${A}を決算する申請'}`,
    recordSettleUpMemo: `詳細`,
    balanceByCurrency: `ETHで決済`,
  },

  settlementManagement: {
    bilateral: {
      error: {
        insufficient: X => `資金不足のため ${X}との決済に失敗しました`,
        generic: X => ` ${X}との決済の処理中にエラーが起きました`,
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
    none: `本当にこの取引を確定しますか`,
    confirmationQuestion: `この取引は取引相手の確定待ちです`,
    pendingAnnouncement: `ETHの取引の完了待ちです`,
    bilateral: `確定する`,
    confirm: `取引を拒否する`,
    reject: `拒否する`,
    rejectRequest: `取引をキャンセルする`,
    cancel: `申請中の決済`,
    direction: {
      lend: (X, Z) => `@${X} はあなたに対して ${Z}の負債（借り）があります`,
      borrow: (X, Z) => `あなたは @${X}に対して ${Z}の負債（借り）があります`,
    }
  },

  pendingSettlementsLanguage: {
    shell: `申請中`,
    title: `申請中の決済はありません`,
    none: `確定する`,
    confirm: `決済を拒否する`,
    reject: `決済をキャンセルする`,
    cancel: `完了`,
  },

  recentTransactionsLanguage: {
    title: `完了した取引はありません`,
    none: `残高`,
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
      end: `に友達リクエストをキャンセルしました.`,
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
    friendRequestedConnect: F => `@${F}はPayPal経由であなたに支払いたがっています`,
    requestFriendConnect: F => `PayPalを有効にするようにi、@${F} に要請しました`,
    feesNotification: `PayPalの手数料が含まれていません`,
    feesInformationHeader: `PayPalの手数料情報`,
    feesInformation: `1.あなたのPayPalアカウントを銀行口座に接続する必要があります。
    
2.あなたの銀行の通貨と異なる通貨で支払う場合$ 0.35の手数料が発生します。
    
3.国際取引手数料：
    アメリカからカナダ/ヨーロッパへ：$ 2.99
    アメリカから他の国へ：$ 4.99
    
4.これらの手数料は、包括的ではありません。最新情報をご確認ください。`,
    payPalSite: `PayPal.com`,
  }
}
