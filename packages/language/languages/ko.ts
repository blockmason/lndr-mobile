import { amountFormat } from 'lndr/format'

import { currencySymbols, transferLimits } from 'lndr/currencies'

const generalCommunicationError = '서버에 오류가 발생하였습니다. 나중에 다시 시도해주세요'

export default {
  applicationName: 'Lndr',
  helloWorld: '헬로 월드',
  submit: '제출',
  next: '다음',
  cancel: '취소',
  back: '돌아가기',
  copy: '클립보드에 복사',
  confirmAccount: '인증',
  createAccount: '계정 생성',
  recoverAccount: '계정 복원',
  removeAccount: '계정 삭제',
  updateAccount: '계정 업데이트',
  loginAction: 'UNLOCK',
  enterPin: '비밀번호를 입력해주세요',
  changePin: '비밀번호 수정',
  enterCurrentPin: '사용중인 비밀번호를 입력해주세요',
  logoutAction: '로그아웃',
  seeAllActivity: '활동보기',
  copiedClipboard: '클립보드에 복사되었습니다',
  pleaseWait: '잠시 기다려주십시오',
  addFriend: '친구 추가',
  addFriendConfirmationQuestion: '정말 친구로 추가하시겠습니까?',
  removeFriend: '친구 삭제',
  currentFriends: '친구 리스트',
  inviteFriends: 'Lndr에 친구 초대',
  tryLndr: 'Lndr 애플리케이션은 이곳에서 확인할 수 있습니다:',
  removeFriendConfirmationQuestion: '정말 해당 친구를 목록에서 삭제하시겠습니까?',
  friendInfo: '친구 관계 정보:',
  noFriends: '사용 전 친구를 추가해보세요!',
  noMatches: '검색 결과 없음',
  noBalances: '현존하는 부채가 없습니다',
  addFriendButton: '+ 친구 추가',
  alreadyFriendsButton: '친구',
  friendShell: '친구',
  tip: '팁: ',
  notice: '공지: ',
  welcome: '당신의 LNDR에 오신 것을 환영합니다',
  noBalanceWarning: '현재 잔액을 확인할 수 없음으로 나중에 다시 시도해주세요.',
  totalBalance: '총 잔액: ',
  totalBalances: '총 거래대상: ',
  newTransaction: '새로운 거래',
  needsReview: '리뷰 필요',
  owesMe: '친구가 갚을 빚이 있습니다',
  iOwe: '친구에게 빚을 갚아야합니다',
  newPassword: '새로운 비밀번호(최소 8자)',
  confirmPassword: '비밀번호 인증',
  newPin: '새로운 비밀번호 4자리',
  enterNewPin: '비밀번호 4자리를 생성해주세요',
  confirmPin: '비밀번호를 확인해주세요',
  newAccount: '계정 생성',
  loginAccount: '계정 UNLOCK',
  recoverExistingAccount: '본 계정 되돌리기',
  recoverMnemonic: '연상 기호(계정 생성\n 시 입력해야 하는 12자)',
  recoverMnemonicLengthError: '정확히 12 단어이어야합니다',
  successTitle: '성공',
  errorTitle: '에러',
  showMnemonic: '12자 연상기호 보이기',
  mnemonicExhortation: '해당 12자 기호는 계정 복구 시 필요함으로 반드시 안전한 곳에 저장하세요',
  addressExhortation: 'Lndr에서 빚을 갚기 위해 이더리움을 내 주소로 보내기',
  removeAccountTitle: '기기로부터 계정을 정말 삭제하시겠습니까?',
  removeAccountExhortation: '향후 계정을 복구할 시 입력할 연상 기호를 인지해야 합니다.',
  myAccount: '나의 계정',
  setNickname: '친구들이 알아볼 수 있도록 닉네임을 설정하세요',
  setEmail: '이메일 설정하고 Lndr 업데이트 정보 받아보기',
  nickname: '닉네임(소문자 & 숫자)',
  email: '이메일 주소',
  accountManagement: {
  nickname: {
    lengthViolation: '닉네임은 적어도 3글자 이상 가능합니다.',
    compositionViolation: '닉네임은 숫자와 소문자만 포함될 수 있습니다.',
    duplicationViolation: '이미 사용되고 있는 닉네임입니다'
  },
  email: {
    compositionViolation: '이메일 주소가 잘못되었습니다',
    duplicationViolation: '이미 사용중인 이메일 주소입니다'
  },
  pin: {
    lengthViolation: '비밀번호는 최소 4자리 이상이여야 합니다.',
    matchViolation: '비밀번호는 일치해야합니다.',
    failedHashComparison: '비밀번호가 일치하지 않습니다, 다시 시도해주세요.',
    updateSuccess: '비밀번호가 업데이트되었습니다',
    updateError: '비밀번호 업데이트에 에러가 발생했습니다'
  },
  mnemonic: {
    lengthViolation: '연상 기호는 적어도 12자 이상 가능합니다.',
    unableToValidate: '입력하신 연상 기호가 유효하지 않습니다. 다시 시도해주세요.'
  },
  setNickname: {
    success: '닉네임이 저장되었습니다.',
    error: generalCommunicationError
  },
  setEmail: {
    success: '이메일 주소가 저장되었습니다.',
    error: generalCommunicationError
  },
  lockTimeout: {
    top: '비밀번호를 추후 입력해주세요',
    bottom: '시간이 초과됐습니다',
    update: '업데이트',
    error: '계정 설정환경을 업데이트하지 못했습니다',
    success: '잠금 제한 시간이 업데이트되었습니다'
  },
  addFriend: {
    success: nickname => `친구의 요청이 접수됐습니다: @${nickname}`,
    error: generalCommunicationError
  },
  removeFriend: {
    success: nickname => `친구로부터 제거됐습니다: @${nickname}`,
    error: generalCommunicationError
  },
  loadInformation: {
    error: generalCommunicationError
  },
  ethBalance: {
    display: balance => `당신의 이더리움 잔액은 ${String(balance).slice(0,8)} `,
    inFiat: (amount, exchange, currency) => {
      const strAmnt = String(Number(amount) * Number(exchange))
      const perInd = strAmnt.indexOf('.') === -1 ? strAmnt.length : strAmnt.indexOf('.')
      return ` (${currencySymbols(currency)}${strAmnt.slice(0, perInd)})`
    },
    getError: '이더리움 잔액내역을 불러오지 못했습니다',
    manage: '이더리움 관리'
  },
  sendEth: {
    error: {
      insufficient: '해당 거래를 완료하기에 보유한 ETH 잔액이 부족합니다',
      generic: '거래 도중 에러가 발생하였습니다, 나중에 다시 시도해주세요',
      address: '정확한 주소를 입력해주세요',
      amount: '0보다 높은 금액을 입력해주세요',
      limitExceeded: currency => `한 주당 ${currencySymbols(currency)}${transferLimits(currency)} 만 보낼 수 있습니다, 이보다 더 적은 금액을 선택하세요`
    },
    amount: '보내는 금액',
    address: `수신지 주소(0x 제외)`,
    transfer: '이더리움 송금',
    transferAll: '전액 송금',
    balance: (balance) => `당신의 현재 이더리움 잔액은 ${typeof balance === 'string' ? balance.slice(0,8) : ''}`,
    ethAddress: '이더리움 주소',
    txCost: (cost, currency) => `현재 이더리움 거래에 드는 비용은 한 거래당 ${currencySymbols(currency)}${cost} 달러입니다`,
    transferLowercase: '이더리움 송금',
    note: currency => `참고 : Lndr에서는 일주일에 ${currencySymbols(currency)}${transferLimits(currency)} 만 송금할 수 있습니다.`,
    warning: (amount, currency) => `귀하의 거래 한도 ${currencySymbols(currency)}${amount} 중 ${currencySymbols(currency)}${transferLimits(currency)} 이 남아있습니다`
  },
  sendBcpt: {
    error: {
      insufficient: '해당 거래를 완료하기에 보유한 BCPT 잔액이 부족합니다',
      generic: '거래 도중 에러가 발생하였습니다, 나중에 다시 시도해주세요'
    },
    transfer: 'BCPT 송금',
    address: `수신지 주소(0x 제외)`,
    balance: (balance) => `당신의 현재 BCPT 잔액은 ${typeof balance === 'string' ? balance.slice(0,8) : ''}`,
    bcptAddress: 'BCPT 주소'
  },
  changeProfilePic: '변경하려면 터치하세요',
  addProfilePic: '폰에서 사진 불러오기',
  panelHeaders: [
    '이더리움 (& BCPT) 주소',
    '이더리움 잔액',
    'BCPT 잔액',
    '이더리움 거래 내역',
    `차 환율 변경`,
    '비밀번호 변경',
    '닉네임 변경',
    '이메일 주소',
    '프로필 사진 변경',
    '잠금 제한 시간 변경',
    '연상기호',
    '알림'
  ],
  viewEtherscan: '이더스캔 내역 조회하기',
  profilePic: {
    change: '프로필 사진 변경',
    setError: '사진 업로딩에 실패했습니다, 다시 시도해주세요',
    getError: '프로필 사진을 가져오는데 실패했습니다',
    setSuccess: '프로필 사진이 업데이트됐습니다'
  },
  logoutSuccess: '성공적으로 로그아웃했습니다!'
},

  currentBalance: {
  eth: '당신의 현재 이더리움 잔액은:',
  bcpt: '당신의 현재 BCPT 잔액은:'
},

  welcomeView: {
  by: 'BUILT BY',
  makeItEasy: 'Lndr 는 간단한 부채 기록을 추적해 볼 수 있게 해줍니다',
  weHelpFriends: '우리는 친구화 함께 살아가고, 일하고, 놀 수 있도록 서비스합니다.',
  len: '렌',
  dot: '.',
  der: '더',
  shareDinner: '저녁식사 함께하기',
  fillTank: '차동차 주유 함께채우기',
  travelTogether: '함께 여행가기',
  runEthereum: '우리는 이더리움 기반으로 실행됩니다!',
  firstLendingApp: '블록체인을 담보로 한 첫번째 모바일 대출 애플케이션.',
  greatConcert: '콘서트 보기',
  youPlayWithFriends: "친구와 시간을 보내세요; \n계산과 관련된 확인작업은 우리가 할게요...,",
  start: '시작하기'
},

  debtManagement: {
  shell: '새로운 거래',
  add: '부채 추가',
  selectFriend: '선택',
  lend: '새로운 대출',
  borrow: '새로운 부채',
  iLent: '친구가 내게 빚지고 있습니다',
  iBorrowed: '친구에게 빚을 지고 있습니다',
  settleUpLower: '  청산  ',
  amountToSettle: '청산 금액',
  total: '총액',
  record: '거래',
  records: '거래',
  chooseCurrency: `통화를 선택하십시오`,
  createError: {
    amountTooLow: '총액은 0달러보다 이상이여야 합니다 0',
    amountTooHigh: '총액은 10억달러 내외여야 합니다 $1,000,000,000',
    selfAsFriend: '본인과 부채관계를 형성할 수 없습니다, 다른 친구를 선택해주세요',
    pending: '다른 친구와 부채 관계 형성에 앞서 미결된 거래내역을 정리해주세요',
    insufficientEth: eth => `정산하려면 최소 단위의 ${eth} 이더리움이 필요로 합니다, 설정으로 가서 잔액을 확인해주세요`
  },
  fields: {
    currency: `통화`,
    amount: '액수',
    settlementAmount: '결제 금액',
    selectFriend: '친구',
    memo: '메모',
    direction: '올바른 내역을 선택하세요'
  },
  memo: {
    example: '메모를 입력하세요'
  },
  direction: {
    lend: nickname => `${nickname} 나로부터 빚을 기록했습니다`,
    borrow: nickname => `나는 친구에게 빚을 갚아야합니다 ${nickname}`,
    initiatedLend: nickname => `${nickname} 은 그/그녀가 빚지고 있다고 말합니다`,
    initiatedBorrow: nickname => `${nickname} 은 그/그녀가 빚지고 있다고 말합니다`,
    pendingLend: nickname => `@${nickname} 은 당신에게 빚이 있습니다`,
    pendingBorrow: nickname => `당신은 @${nickname} 으로부터 빚을 갚아야합니다`,
    pendingLendSettlement: settlement => `@${settlement.debtorNickname} 은 당신과의 채무관계를 청산하기를 ${settlement.settlementCurrency} 원합니다`,
    pendingBorrowSettlement: settlement => `@${settlement.creditorNickname} 은 청산을 ${settlement.settlementCurrency} 통한 요청합니다`,
    pendingLendSettlementMe: settlement => `당신은 @${settlement.debtorNickname} 에게 ${settlement.settlementCurrency} 을 통한 청산을 요청합니다`,
    pendingBorrowSettlementMe: settlement => `당신은 @${settlement.creditorNickname} 에게 ${settlement.settlementCurrency} 을 통한 청산을 요청했습니다`
  },
  pending: {
    success: friend => `계류중인 부채 내역은 @${friend.nickname} 에게 제출하였습니다`,
    error: generalCommunicationError
  },
  pendingParens: ' (미결)',
  confirmation: {
    transaction: _counterParty => '성공',
    settlement: _counterParty => '성공',
    error: '거래를 수행할 수 없음으로 다시 시도해주세요'
  },
  rejection: {
    success: '거래가 거부되었습니다',
    error: '거래 취소를 수행하지 못했음으로 다시 시도해주세요'
  },
  balances: {
    error: '잔액 내역을 로딩하지 못했음으로 다시 시도해주세요'
  },
  for: memo => `for ${memo}`,
  settleUp: '    청산    ',
  settleTotal: '전액 청산',
  settleUpMemo: (direction, amount) => direction === 'lend' ? `청산 ${amount}` : `청산 요청 ${amount} `
},

  settlementManagement: {
    bilateral: {
      error: {
        insufficient: nickname => `당신이 ${nickname} 에게 시도한 청산은 자금 부족으로 실패하였습니다`,
        generic: nickname => `${nickname} 에게 청산하는 과정에서 에러가 발생했습니다`
      }
    },
    eth: '이더리움으로 청산하기',
    nonPayment: '청산내역 기록하기'
  },

  accountViewLanguage: {
  lndr: 'L n d r',
  home: '홈',
  friends: '친구',
  activity: '액티비티'
},

  notifications: {
  toggleNotifications: '알림 표시 전환',
  enable: 'TURN ON',
  disable: 'TURN OFF'
},

  pendingTransactionsLanguage: {
  shell: '새로운 거래',
  title: '미결',
  memo: '메모:',
  for: 'FOR',
  none: '계류중인 트랜잭션 내역이 없습니다',
  confirmationQuestion: '해당 거래를 정말 진행하시겠습니까?',
  pendingAnnouncement: '해당 거래는 제3자로부터 인증절차를 기다리고 있는 상태입니다.',
  bilateral: 'ETH 송금을 기다리는 중입니다',
  confirm: '인증',
  reject: '트랜잭션 거부',
  rejectRequest: '거부',
  cancel: '트랜잭션 취소',
  direction: {
    lend: (nickname, amount) => `@${nickname} 은 ${amount} 을 당신에게 빚을 갚아야합니다`,
    borrow: (nickname, amount) => `당신은 @${nickname} 에게 ${amount} 빚을 갚아야합니다`
  }
},

  pendingSettlementsLanguage: {
  shell: '상환 계류중',
  title: '미결',
  none: '계류중인 청산 내역이 없습니다',
  confirm: 'CONFIRM',
  reject: '청산 거부',
  cancel: '청산 취소',
},

  recentTransactionsLanguage: {
  title: '완료',
  none: '완료된 트랜잭션 내역이 없습니다',
  direction: {
    lend: (nickname, amount) => `@${nickname} 은 당신에게 ${amount} 을 단신에게 갚아야합니다`,
    borrow: (nickname, amount) => `당신은 @${nickname} 에게 ${amount} 을 갚아야합니다`
  },
  balance: '잔액 ',
  friends: (friends) => `(from ${friends} 친구)`
},

  tabs: {
  home: '    홈    ',
  friends: '   친구   ',
  activity: '액티비티'
},

  confirmation: {
  shell: '인증',
  done: '완료',
  create: {
    start: "기록은 보냈어요 ",
    end: ' 확인을 위해.'
  },
  confirm: {
    start: "당신은 해당 기록을 ~에게로부터 확인했어요 ",
    end: '.'
  },
  reject: {
    start: "우리는 ",
    end: " 해당 기록을 당신이 거부한것을 전달했습니다."
  },
  ethSent: {
    start: "성공적으로 보냈습니다 ",
    end: " 이더리움과 당신의 거래는 "
  },
  bcptSent: {
    start: "성공적으로 보냈습니다 ",
    end: " BCPT 당신의 거래는 "
  },
  status: '거래 내역을 볼 수 있는 곳은 ',
  activity: '액티비티 탭.'
},

privacyPolicy: {
  link: `lndr.io/terms/`,
  message: `Blockmason의 개인 정보 보호 정책을 읽고 동의하려면 아래를 클릭하여 확인하십시오. Blockmason은 이메일 주소를 사용하여 Blockmason 및 LNDR에 대한 업데이트를 보낼 수 있습니다. 개인 정보 취급 방침에 대한 링크는 다음과 같습니다:`
}
}
