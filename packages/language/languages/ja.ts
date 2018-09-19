const generalCommunicationError = 'サーバーに接続するのにエラーが発生しました。しばらくしてから、もう一度お試しください'

import { currencySymbols, transferLimits } from 'lndr/currencies'

const CUR = currencySymbols
const TL = transferLimits

export default {
  applicationName: `Lndr`,
  helloWorld: `Hello world`,
  submit: `送信`,
  next: `次へ`,
  cancel: `キャンセル`,
  back: `戻る`,
  copy: `クリップボードにコピー`,
  confirmAccount: `決定`,
  createAccount: `アカウント作成`,
  recoverAccount: `アカウント復元`,
  removeAccount: `アカウント削除`,
  updateAccount: `アカウント更新`,
  loginAction: `アンロック`,
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
  removeFriendConfirmationQuestion: `こちらからLndrをお試しください：`,
  friendInfo: `この友達の詳細`,
  noFriends: `まずは友達を何人か追加してみよう！`,
  noMatches: `ユーザーが見つかりませんでした`,
  noBalances: `誰にも借りていません`,
  addFriendButton: `友達を追加する`,
  alreadyFriendsButton: `友達`,
  friendShell: `友達`,
  tip: `ヒント`,
  notice: `注意：`,
  welcome: `Lndrへようこそ`,
  noBalanceWarning: `残高を読み込むことが出来ませんでした。しばらく経ってから再度お試しください。`,
  totalBalance: `残高`,
  totalBalances: `取引相手の数：`,
  newTransaction: `新しい取引`,
  needsReview: `承認待ち`,
  owesMe: `貸しがあります`,
  iOwe: `借りがあります`,
  newPassword: `新しいパスワード（８字以上）`,
  confirmPassword: `パスワードを確定する`,
  newPin: `新しい４字のPINを設定してください`,
  enterNewPin: `新しい４字のPINを確認してください`,
  confirmPin: `確認のためもう一度入力してください`,
  newAccount: `新しいアカウントを作成`,
  loginAccount: `アカウントを解除する`,
  recoverExistingAccount: `既存のアカウントを復元する`,
  recoverMnemonic: `ニューモニック（アカウントを復元する際に必要です）`,
  recoverMnemonicLengthError: `復元用の単語は12個です`,
  successTitle: `成功`,
  errorTitle: `エラー`,
  showMnemonic: `12個の復元用の単語を表示`,
  mnemonicExhortation: `この12個の単語はアカウントを復元する時に使用します。大切に保管しておいてください。`,
  addressExhortation: `Lndrで貸し借りの帳消しをするため、あなたのアドレスにイーサリアムを送る`,
  removeAccountTitle: `本当にアカウントをこのデバイスから削除しますか？`,
  removeAccountExhortation: `ニューモニックが保管されていることを確認してください。さもないと、デバイスから永久にあなたのデータが消去され復元できません。`,
  myAccount: `自分のアカウント`,
  setNickname: `友達から見つけてもらうためにニックネームを設定`,
  setEmail: `Lndrから最新情報を受け取るためのメールアドレスを設定`,
  nickname: `ニックネーム（小文字と数字）`,
  email: `メールアドレス`,

  accountManagement: {
    nickname: {
      lengthViolation: `ニックネームは３字以上である必要があります`,
      compositionViolation: `ニックネームに使用できる文字：数字、小文字`,
      duplicationViolation: `このニックネームは既に使われています`,
    },
    email: {
      compositionViolation: `正しいメールアドレスを入力してください`,
      duplicationViolation: `このメールアドレスで登録されているアカウントが既に存在します`,
    },
    pin: {
      lengthViolation: `PINは最低4字である必要があります`,
      matchViolation: `PINは合致する必要があります`,
      failedHashComparison: `PINが間違っています。正しいPINを入力してください。`,
      updateSuccess: `PINが更新されました`,
      updateError: `PIN更新中にエラーが発生しました`,
    },
    mnemonic: {
      lengthViolation: `アカウント復元用の単語は最低12語です`,
      unableToValidate: `ニューモニックが違います。再度入力してください。`,
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
      display: Y => `あなたのETH残高は${String(Y).slice(0,8)}です`,
      getError: `ETHの受けとりに失敗しました`,
      manage: `ETHの管理`,
    },
    sendEth: {
      error: {
        insufficient: `送金に必要な資金が不足しています`,
        generic: `エラーが発生しました。しばらく経ってから再度お試しください。`,
        address: `正しいアドレスを入力してください`,
        amount: `０より大きい値を入力してください`,
        limitExceeded: A => `一週間にLndrから引き出せるのは ${CUR[A]}${TL[A]} までです`,
      },
      amount: `送金額`,
      address: `送金先アドレス`,
      transfer: `ETHを送金する`,
      transferAll: `全てを送金する`,
      balance: Y => `あなたの現在のETH残高は${typeof Y === 'string' ? Y.slice(0,8) :''}です`,
      ethAddress: `イーサリアムアドレス`,
      txCost: (B, A) => `現在の取引手数料は ${CUR[A]}${B}です`,
      transferLowercase: `ETHを送金する`,
      note: A => `一週間にLndrから引き出せるのは ${CUR[A]}${TL[A]} までです`,
      warning: (Z, A) => `現在 ${CUR[A]}${TL[A]} のうち ${CUR[A]}${Z}残っています `,
    },
    sendBcpt: {
      error: {
        insufficient: `送金に必要なBCPTが不足しています`,
        generic: `エラーが発生しました。しばらく経ってから再度お試しください。`,
      },
      transfer: `BCPTを送金する`,
      address: `送付先アドレス（先頭の '0x'は入力不要）`,
      balance: Y => `あなたの現在のBCPT残高は${typeof Y === 'string' ? Y.slice(0,8) :''}`,
      bcptAddress: `BCPTアドレス`,
    },
    panelHeaders: [
      `ETH (& BCPT) アドレス`,
      `ETH残高`,
      `BCPT残高`,
      `アカウントを削除する`,
      `ETHの取引履歴`,
      `ペイパルを接続します`,
      `主要通貨を変更`,
      `PINを変える`,
      `メールアドレスを変える`,
      `タイムアウトする時間を変える`,
      `復元用の単語（ニューモニック）`,
      `通知`,
    ],
    viewEtherscan: `Etherscanで履歴を確認する`,
    profilePic: {
      change: `プロフィール画像を変更する`,
      setError: `エラーが発生しました。しばらく経ってから再度お試しください。`,
      getError: `エラーが発生しました`,
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
    makeItEasy: `Lndrはお金の貸し借りを簡単に記録、管理することが出来ます`,
    weHelpFriends: `普段の生活はもちろん、仕事から娯楽までサポートします`,
    len: `Len`,
    dot: `.`,
    der: `der`,
    shareDinner: `ディナー代をシェア`,
    fillTank: `ガソリンを満タンに`,
    travelTogether: `旅をともに楽しむ`,
    runEthereum: `Lndrはイーサリアム上で機能します`,
    firstLendingApp: `ブロックチェーン上で動く、安全性が保証されているモバイルアプリ`,
    greatConcert: `素晴らしいコンサートを満喫`,
    youPlayWithFriends: `あなたは友人の時間を堪能し、会計はアプリにお任せ`,
    start: `はじめよう`,
  },

  walkthrough: {
    skip: `スキップ`,
    continue: `続ける`,
    step1: {
      easyToUse: `Lndrでは、様々な費用の分割や、友人や家族観でのお金の貸し借りを簡単に管理することが出来ます。`,
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
      title: `決済する`,
      ready: `決済してもよろしいですか？`,
      payPal: `Lndrを利用する際、\ N-あなたはペイパルを選択することができます。`,
      ether: `- Etherのような暗号通貨で`,
      cash: `- あるいは通常通りに現金で`,
      positiveBalance: `10.46`,
    },
    step5: {
      title: `複数通貨`,
      multiCurrency: `Lndrでは、異なる通貨同士での取引も追跡することができます。`,
      exchangeRate: `貸し借りを帳消しすることが決定すると、すべてのトランザクションは最新の為替レートに応じて、主要通貨に換算されます。`,
      start: `Lndrを使ってみましょう！`,
    }
  },

  debtManagement: {
    shell: `新しい取引`,
    add: `借りを追加する`,
    selectFriend: `選択する`,
    lend: `新しく貸す`,
    borrow: `新しく借りる`,
    owesMe: `友達に貸します`,
    iOwe: `友達に借ります`,
    iLent: `友達に貸します`,
    iBorrowed: `友達に借ります`,
    settleUpLower: `決済する`,
    amountToSettle: `決済額`,
    total: `総額`,
    record: `履歴`,
    records: `履歴`,
    chooseCurrency: `通貨を選択してください`,

    createError: {
      amountTooLow: `$0以上の金額を入力してください`,
      amountTooHigh: `$1,000,000,000以下の金額を入力してください`,
      selfAsFriend: `自分自身は選択できません。別の友達を選択してください。`,
      pending: `別の取引を行う前に、現在の作業を完了してください`,
      insufficientEth: E => `決済するためには少なくとも ${E} ETH 必要です, 自分の残高を確認するには設定をご覧ください`,
    },
    
    fields: {
      currency: `通貨`,
      amount: `金額`,
      settlementAmount: `決済金額`,
      selectFriend: `友達`,
      memo: `メモ`,
      direction: `Statementを選択してください`,
    },
    memo: {
      example: `ここにメモを入力してください`,
    },
    direction: {
      lend: X => `${X} は私に借りがあります`,
      borrow: X => `私には ${X}の借りがあります`,
      initiatedLend: X => `${X}は、彼らに借りがあります`,
      initiatedBorrow: X => `${X}はあなたは貸しがあります`,
      pendingLend: X => `@${X} はあなたに借りがあります`,
      pendingBorrow: X => `あなたは @${X}に借りがあります`,
      pendingLendSettlement: S => `@${S.debtorNickname} が ${S.settlementCurrency}で決済することを要請しています`,
      pendingBorrowSettlement: S => `@${S.creditorNickname} があなたと ${S.settlementCurrency}での決済を求めています`,
      pendingLendSettlementMe: S => ` @${S.debtorNickname}と  ${S.settlementCurrency}で決済することを要請しました`,
      pendingBorrowSettlementMe: S => ` @${S.creditorNickname}に ${S.settlementCurrency}で決済するようリクエストしました`,
    },
    pending: {
      success: F => `@${F.nickname}に提出した借りは保留中`,
      error: generalCommunicationError
    },
    pendingParens: `承認待ち`,
    confirmation: {
      transaction: CP => ` ${CP} との取引が確定しました`,
      settlement: CP => ` ${CP}との決済が確定しました`,
      error: `取引を承認できませんでした。しばらく経ってから再度お試しください。`,
    },
    rejection: {
      success: `取引が拒否されました`,
      error: `取引を拒否できませんでした。再度お試しください`,
    },
    balances: {
      error: `残高を読み込めませんでした。サイドお試しください`,
    },
    for: M => `${M}宛て`,
    settleUp: `決済する`,
    settleTotal: `決済総額`,
    settleUpMemo: (D, A) => `${D === '貸す' ? 'を決済する ' :  ` ${A}の決済をリクエスト`}`,
    recordSettleUpMemo: `決済しています`,
    balanceByCurrency: `詳細`,
  },

  settlementManagement: {
    bilateral: {
      error: {
        insufficient: X => `資金不足のため ${X}との取引に失敗しました`,
        generic: X => ` ${X}との取引の処理中にエラーが起きました`,
      }
    },
    eth: `ETHで決済`,
    paypal: `PayPalで決済`,
    nonPayment: `決済を記録する`,
    select: `決済タイプを選択します`,
  },

  accountViewLanguage: {
    lndr: `L n d r`,
    home: `ホーム`,
    friends: `友達`,
    activity: `アクティビティ`,
  },

  notifications: {
    toggleNotifications: `通知を設定する`,
    enable: `オンにする`,
    disable: `オフにする`,
  },

  pendingTransactionsLanguage: {
    shell: `承認待ちの取引`,
    title: `承認待ち`,
    memo: `メモ：`,
    for: `宛て`,
    none: `承認待ちの取引はありません`,
    confirmationQuestion: `本当にこの取引を承認しますか？`,
    pendingAnnouncement: `この取引は相手の承認待ちです`,
    bilateral: `ETHの送金が完了するのを待っています`,
    confirm: `確定する`,
    reject: `取引を拒否する`,
    rejectRequest: `拒否する`,
    cancel: `取引をキャンセルする`,
    direction: {
      lend: (X, Z) => `@${X} はあなたに対して ${Z}の負債（借り）があります`,
      borrow: (X, Z) => `あなたは @${X}に対して ${Z}の負債（借り）があります`,
    }
  },

  pendingSettlementsLanguage: {
    shell: `申請中の取引`,
    title: `申請中`,
    none: `承認待ちの決済はありません`,
    confirm: `確定する`,
    reject: `決済を拒否する`,
    cancel: `決済をキャンセルする`,
  },

  recentTransactionsLanguage: {
    title: `完了`,
    none: `取引は完了していません`,
    direction: {
      lend: (X, Z) => `あなたは@${X} に対して ${Z}の債権（貸し）があります`,
      borrow: (X, Z) => ` @${X}はあなたに対して ${Z}の債権（貸し）があります`,
    },
    balance: `残高`,
    consolidatedBalance: `貸し借り残高`,
    friends: FS => `(から${FS} ${FS === 1 ? '友達' :'友達'})`,
  },

  tabs: {
    home: `ホーム`,
    friends: `友達`,
    activity: `アクティビティ`,
  },

  confirmation: {
    shell: `確定`,
    done: `完了`,
    create: {
      start: ``,
      end: `へ記録を送信しました。`,
    },
    confirm: {
      start: ``,
      end: `から送信された記録を確認しました。`,
    },
    reject: {
      start: `あなたが、この記録を拒否したことを`,
      end: `に知らせました。`,
    },
    confirmFriend: {
      start: ``,
      end: `と友達になりました！`,
    },
    rejectFriend: {
      start: ``,
      end: `からの友達リクエストを拒否しました。`,
    },
    rejectOutboundFriendRequest: {
      start: `あなたは、`,
      end: `への友達リクエストをキャンセルしました`,
    },
    ethSent: {
      start: `ETHを送信するのに成功しました。あなたのトランザクション・ハッシュは`,
      end: `です`,
    },
    bcptSent: {
      start: `BCPTを送信するのに成功しました。あなたのトランザクション・ハッシュは`,
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
    status: `この取引の状況をアクティビティの`,
    activity: `タブから見ることができます。`,
  },

  pendingFriendRequestsLanguage: {
    shell: `友達リクエスト`,
    message: `友達リクエスト`,
    request: F => `${F} があなたと友達になりたがっています`,
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
    friendNotEnabled: F => `の@${F}は、PayPal支払いを有効にしていません`,
    friendRequestedConnect: F => `が@${F}はPayPal経由で支払いを希望しています`,
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
