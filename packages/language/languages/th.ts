import { currencySymbols, transferLimits } from 'lndr/currencies'

const CUR = currencySymbols
const TL = transferLimits

const generalCommunicationError = 'มีปัญหาในการสื่อสารกับเซิร์ฟเวอร์ กรุณาลองใหม่ในภายหลัง.'

export default {

  applicationName: `Lndr`,
  helloWorld: `สวัสดีทุกคน`,
  submit: `ส่ง`,
  next: `ถัดไป`,
  cancel: `ยกเลิก`,
  back: `ย้อนกลับ`,
  copy: `คัดลอกไปยังคลิปบอร์ด`,
  confirmAccount: `ยืนยัน`,
  createAccount: `สร้างบัญชี`,
  recoverAccount: `เรียกคืนบัญชี`,
  removeAccount: `ปิดบัญชี`,
  updateAccount: `อัปเดตบัญชี`,
  loginAction: `ปลดล็อค`,
  enterPin: `กรุณากรอก PIN ของคุณ`,
  changePin: `เปลี่ยน PIN`,
  enterCurrentPin: `กรอก PIN ปัจจุบัน`,
  logoutAction: `ออกจากระบบ`,
  seeAllActivity: `ดูกิจกรรมทั้งหมด`,
  copiedClipboard: `คัดลอกไปยังคลิปบอร์ดแล้ว`,
  pleaseWait: `กรุณารอสักครู่`,
  addFriend: `เพิ่มเพื่อน`,
  addFriendConfirmationQuestion: `คุณแน่ใจหรือว่าต้องการเพิ่มผู้ใช้รายนี้เป็นเพื่อน?`,
  removeFriend: `ลบเพื่อน`,
  currentFriends: `เพื่อนในปัจจุบัน`,
  removeFriendConfirmationQuestion: `คุณแน่ใจหรือว่าต้องการลบผู้ใช้รายนี้ออกจากลิสต์เพื่อน?`,
  inviteFriends: `เชิญชวนเพื่อนให้ใช้ Lndr`,
  tryLndr: `ลองใช้แอป Lndr ที่นี่:`,
  friendInfo: `ข้อมูลเพิ่มเติมเกี่ยวกับมิตรภาพนี้:`,
  noFriends: `เพิ่มเพื่อนเพื่อเริ่มต้นใช้งาน`,
  noMatches: `ไม่พบผู้ใช้ที่ตรงกัน`,
  noBalances: `คุณไม่มีหนี้ที่บันทึกไว้`,
  addFriendButton: `เพิ่มเพื่อน`,
  alreadyFriendsButton: `เพื่อน`,
  friendShell: `เพื่อน`,
  tip: `เคล็ดลับ:`,
  notice: `หมายเหตุ:`,
  welcome: `ยินดีต้อนรับสู่ LNDR ของคุณ`,
  noBalanceWarning: `เราไม่สามารถโหลดยอดคงเหลือของคุณได้ในขณะนี้ กรุณาลองใหม่ในภายหลัง`,
  totalBalance: `ยอดคงเหลือทั้งหมด:`,
  totalBalances: `คู่สัญญาทั้งหมด:`,
  newTransaction: `ธุรกรรมใหม่`,
  needsReview: `รอการอนุมัติ`,
  owesMe: `มีผู้ติดหนี้ฉัน`,
  iOwe: `ฉันติดหนี้ใครบางคน`,
  newPassword: `รหัสผ่านใหม่ (อย่างน้อย 8 อักขระ)`,
  confirmPassword: `ยืนยันรหัสผ่าน`,
  newPin: `PIN 4 หลักใหม่`,
  enterNewPin: `กรุณาตั้งค่า PIN 4 หลักใหม่`,
  confirmPin: `กรุณายืนยัน PIN ของคุณ`,
  newAccount: `สร้างบัญชีใหม่`,
  loginAccount: `ปลดล็อคบัญชีของคุณ`,
  recoverExistingAccount: `กู้คืนบัญชีที่มีอยู่`,
  recoverMnemonic: `วลีช่วยจำ (12 คำที่จะแสดง \nเมื่อคุณสร้างบัญชีของคุณ)`,
  recoverMnemonicLengthError: `วลีช่วยจำควรมี 12 คำพอดี`,
  successTitle: `สำเร็จ`,
  errorTitle: `ข้อผิดพลาด`,
  showMnemonic: `แสดงวลีช่วยจำ 12 คำ`,
  mnemonicExhortation: `วลี 12 คำนี้จำเป็นต้องใช้ในการกู้คืนบัญชีของคุณ กรุณาเก็บรักษาไว้ในที่ปลอดภัยและเป็นความลับ`,
  addressExhortation: `ส่ง Ethereum ไปยังที่อยู่ของคุณ เพื่อให้คุณสามารถชำระหนี้ใน Lndr ได้`,
  removeAccountTitle: `คุณแน่ใจหรือว่าต้องการลบบัญชีของคุณออกจากอุปกรณ์นี้?`,
  removeAccountExhortation: `คุณต้องแน่ใจว่า คุณสามารถเข้าถึงวลีช่วยจำของคุณเพื่อกู้คืนบัญชีของคุณในภายหลัง เพราะนี่เป็นการลบข้อมูลบัญชีของคุณออกจากอุปกรณ์นี้โดยถาวร`,
  myAccount: `บัญชีของฉัน`,
  setNickname: `ตั้งค่าชื่อเล่นเพื่อให้เพื่อนของคุณสามารถค้นหาคุณได้`,
  setEmail: `ตั้งค่าอีเมลเพื่อรับข้อมูลอัพเดตจาก Lndr`,
  nickname: `ชื่อเล่น (ตัวพิมพ์เล็กและตัวเลข)`,
  email: `อีเมลแอดเดรส`,
  accountManagement: {
    nickname: {
      lengthViolation: `ชื่อเล่นควรมีอย่างน้อย 3 อักขระ`,
      compositionViolation: `ชื่อเล่นมีได้เฉพาะตัวเลขและอักษรตัวพิมพ์เล็ก`,
      duplicationViolation: `ชื่อเล่นถูกใช้ไปแล้ว`,
    },
    email: {
      compositionViolation: `รูปแบบอีเมลไม่ถูกต้อง`,
      duplicationViolation: `อีเมล์ถูกใช้ไปแล้ว`,
    },
    pin: {
      lengthViolation: `PIN ควรมีอย่างน้อย 4 อักขระ`,
      matchViolation: `PIN ควรตรงกัน`,
      failedHashComparison: `PIN ไม่ถูกต้อง กรุณาลองอีกครั้ง`,
      updateSuccess: `PIN ของคุณได้รับการอัพเดตแล้ว`,
      updateError: `เกิดข้อผิดพลาดในการอัพเดต PIN ของคุณ`,
    },
    mnemonic: {
      lengthViolation: `วลีช่วยจำควรมีอย่างน้อย 12 คำ`,
      unableToValidate: `วลีช่วยจำที่กรอกไม่ถูกต้อง กรุณาลองอีกครั้ง`,
    },
    setNickname: {
      success: `ชื่อเล่นของคุณได้รับการบันทึกแล้ว`,
      error: generalCommunicationError
    },
    setEmail: {
      success: `อีเมลของคุณได้รับการบันทึกแล้ว`,
      error: generalCommunicationError
    },
    lockTimeout: {
      top: `คุณต้องกรอก PIN ของคุณหลังจาก`,
      bottom: `นาทีที่ไม่มีการใช้งาน`,
      update: `อัพเดต`,
      error: `เราไม่สามารถอัพเดตการตั้งค่าบัญชีของคุณได้`,
      success: `ระยะเวลาในการล็อคได้รับการอัพเดตแล้ว`,
    },
    addFriend: {
      success: X => `คำขอเป็นเพื่อนถูกส่งไปยัง @${X} แล้ว`,
      error: generalCommunicationError
    },
    removeFriend: {
      success: X => `ลบออกจากลิสต์เพื่อนแล้ว: @${X}`,
      error: generalCommunicationError
    },
    loadInformation: {
      error: generalCommunicationError
    },
    ethBalance: {
      display: Y => `ยอด ETH คงเหลือของคุณคือ ${String(Y).slice(0,8)}`,
      getError: `ไม่สามารถเรียกข้อมูลยอด ETH คงเหลือคืนมาได้ `,
      manage: `จัดการ ETH`,
    },
    sendEth: {
      error: {
        insufficient: `คุณมี ETH ไม่เพียงพอสำหรับการทำธุรกรรมนี้`,
        generic: `เกิดข้อผิดพลาดในการโอน กรุณาลองใหม่ในภายหลัง`,
        address: `กรุณากรอกที่อยู่ที่ถูกต้อง`,
        amount: `กรุณากรอกจำนวนที่มากกว่า 0`,
        limitExceeded: A => `คุณสามารถส่งได้ ${CUR(A)}${TL(A)} ต่อสัปดาห์เท่านั้น กรุณาเลือกจำนวนที่น้อยลง`
      },
      amount: `จำนวนที่จะส่ง`,
      address: `ที่อยู่ปลายทาง (ไม่มีคำนำหน้า '0x')`,
      transfer: `โอน ETH`,
      transferAll: `โอนทุกอย่าง`,
      balance: Y => `ยอด ETH คงเหลือในปัจจุบันของคุณคือ ${typeof Y === 'string' ? Y.slice(0,8) :''}`,
      ethAddress: `ที่อยู่ Ethereum`,
      txCost: (B, A) => `ค่าใช้จ่ายในการทำธุรกรรมในปัจจุบันคือ ${CUR(A)}${B}`,
      transferLowercase: `โอน Eth`,
      note: A => `โปรดทราบ: คุณสามารถโอนจาก Lndr ได้ ${CUR(A)}${TL(A)} ต่อสัปดาห์เท่านั้น`,
      warning: (Z, A) => `คุณเหลือ ${CUR(A)}${Z} จากขีดจำกัด ${CUR(A)}${TL(A)} ของคุณ`,
    },
    sendBcpt: {
      error: {
        insufficient: `คุณมี BCPT ไม่เพียงพอสำหรับการทำธุรกรรมนี้`,
        generic: `เกิดข้อผิดพลาดในการโอน กรุณาลองใหม่ในภายหลัง`,
      },
      transfer: `โอน BCPT`,
      address: `ที่อยู่ปลายทาง (ไม่มีคำนำหน้า '0x')`,
      balance: Y => `ยอด BCPT คงเหลือในปัจจุบันของคุณคือ ${typeof Y === 'string' ? Y.slice(0,8) :''}`,
      bcptAddress: `ที่อยู่ BCPT`,
    },
    changeProfilePic: `แตะเพื่อเปลี่ยน`,
    addProfilePic: `ใช้ภาพจากโทรศัพท์`,
    panelHeaders: [
      `ที่อยู่ ETH (และ BCPT)`,
      `ยอด ETH คงเหลือ`,
      `ยอด BCPT คงเหลือ`,
      `ปิดบัญชี`,
      `ประวัติการทำธุรกรรม ETH`,
      `เปิดใช้งาน PayPal`,
      `เปลี่ยนสกุลเงินหลัก`,
      `เปลี่ยน PIN`,
      `เปลี่ยนชื่อเล่น`,
      `เปลี่ยนอีเมล์`,
      `เปลี่ยนภาพโปรไฟล์`,
      `เปลี่ยนระยะเวลาในการล็อค`,
      `วลีช่วยจำ`,
      `การแจ้งเตือน`,
    ],
    viewEtherscan: `ดูประวัติ Etherscan`,
    profilePic: {
      change: `เปลี่ยนภาพโปรไฟล์`,
      setError: `เกิดข้อผิดพลาดในการอัพโหลดภาพของคุณ กรุณาลองใหม่ในภายหลัง`,
      getError: `เกิดข้อผิดพลาดในการกู้ภาพโปรไฟล์ของคุณ`,
      setSuccess: `ภาพโปรไฟล์ได้รับการอัพเดตแล้ว`,
    },
    logoutSuccess: `คุณออกจากระบบเรียบร้อยแล้ว!`,
    logoutError: generalCommunicationError,
  },

  currentBalance: {
    eth: `ยอด Eth คงเหลือในปัจจุบันของคุณคือ:`,
    bcpt: `ยอด BCPT คงเหลือในปัจจุบันของคุณคือ:`,
  },

  welcomeView: {
    by: `สร้างโดย`,
    makeItEasy: `Lndr ทำให้การติดตามหนี้เป็นเรื่องง่าย`,
    weHelpFriends: `เราช่วยให้เพื่อนๆ ใช้ชีวิต ทำงาน และสนุกด้วยกันได้`,
    len: `เลน`,
    dot: `.`,
    der: `เดอร์`,
    shareDinner: `แชร์ค่าอาหารเย็น`,
    fillTank: `เติมน้ำมันรถ`,
    travelTogether: `เดินทางไปด้วยกัน`,
    runEthereum: `เราใช้ ETH!`,
    firstLendingApp: `แอปมือถือสำหรับการกู้ยืมเงินแอปแรกที่ได้รับการรักษาความปลอดภัยในบล็อกเชน`,
    greatConcert: `ชมคอนเสิร์ตที่ยอดเยี่ยม`,
    youPlayWithFriends: `คุณสนุกกับเพื่อนๆ\n เราจะเก็บรักษาแท็บ...`,
    start: `เริ่มต้น`,
  },

  debtManagement: {
    shell: `ธุรกรรมใหม่`,
    add: `เพิ่มหนี้`,
    selectFriend: `เลือก`,
    lend: `เงินกู้ใหม่`,
    borrow: `หนี้ใหม่`,
    iLent: `เพื่อนติดหนี้ฉัน`,
    iBorrowed: `ฉันติดหนี้เพื่อน`,
    settleUpLower: `ชำระหนี้`,
    amountToSettle: `จำนวนที่จะชำระหนี้`,
    total: `รวม`,
    record: `บันทึกรายการ`,
    records: `บันทึกรายการ`,
    chooseCurrency: `เลือกสกุลเงิน`,
    createError: {
      amountTooLow: `จำนวนต้องมากกว่า $0`,
      amountTooHigh: `จำนวนต้องน้อยกว่า $1,000,000,000`,
      selfAsFriend: `คุณไม่สามารถสร้างหนี้กับตัวเองได้ กรุณาเลือกเพื่อนคนอื่น`,
      pending: `กรุณาจัดการธุรกรรมที่รอดำเนินการกับผู้ใช้รายนี้ก่อนที่จะสร้างธุรกรรมอื่น`,
      insufficientEth: E => `คุณจำเป็นต้องมีอย่างน้อย ${E} ETH เพื่อชำระหนี้ กรุณาไปยังการตั้งค่าเพื่อดูยอดคงเหลือของคุณ`,
    },
    fields: {
      currency: `เงินตรา`,
      amount: `จำนวน`,
      settlementAmount: `จำนวนในการชำระหนี้`,
      selectFriend: `เพื่อน`,
      memo: `บันทึกช่วยจำ`,
      direction: `เลือกข้อความที่ถูกต้อง`,
    },
    memo: {
      example: `พิมพ์บันทึกช่วยจำที่นี่`,
    },
    direction: {
      lend: X => `${X} ติดหนี้ฉัน`,
      borrow: X => `ฉันติดหนี้ ${X}`,
      initiatedLend: X => `${X} บอกว่าเขา/ เธอติดหนี้`,
      initiatedBorrow: X => `${X} บอกว่าคุณติดหนี้`,
      pendingLend: X => `@${X} ติดหนี้คุณ`,
      pendingBorrow: X => `คุณติดหนี้ @${X}`,
      pendingLendSettlement: S => `@${S.debtorNickname} ขอชำระหนี้ในสกุลเงิน ${S.settlementCurrency}`,
      pendingBorrowSettlement: S => `@${S.creditorNickname} ต้องการรับชำระหนี้จากคุณในสกุลเงิน ${S.settlementCurrency}`,
      pendingLendSettlementMe: S => `คุณขอรับชำระหนี้จาก @${S.debtorNickname} ในสกุลเงิน ${S.settlementCurrency}`,
      pendingBorrowSettlementMe: S => `คุณขอให้ @${S.creditorNickname} รับชำระหนี้ในสกุลเงิน ${S.settlementCurrency}`,
    },
    pending: {
      success: F => `หนี้ที่ค้างอยู่ถูกส่งไปยัง @${F.nickname}`,
      error: generalCommunicationError
    },
    pendingParens: `(รอดำเนินการ)`,
    confirmation: {
      transaction: CP => `ธุรกรรมกับ ${CP} ได้รับการยืนยันเรียบร้อยแล้ว`,
      settlement: CP => `การชำระหนี้กับ ${CP} ได้รับการยืนยันเรียบร้อยแล้ว`,
      error: `ไม่สามารถยืนยันธุรกรรมในขณะนี้ได้ กรุณาลองใหม่ในภายหลัง`,
    },
    rejection: {
      success: `ธุรกรรมได้รับการปฏิเสธ`,
      error: `ไม่สามารถปฏิเสธธุรกรรมในขณะนี้ได้ กรุณาลองใหม่ในภายหลัง`,
    },
    balances: {
      error: `ไม่สามารถโหลดยอดคงเหลือในขณะนี้ได้ กรุณาลองใหม่ในภายหลัง`,
    },
    for: M => `สำหรับ ${M}`,
    settleUp: `ชำระหนี้`,
    settleTotal: `ยอดรวมชำระหนี้`,
    settleUpMemo: (D, A) => `${D === 'lend' ? 'ชำระหนี้เป็นจำนวน ' :  'ขอชำระหนี้เป็นจำนวน'} ${A}`,
    recordSettleUpMemo: `กำลังชำระหนี้`,
    balanceByCurrency: `รายละเอียด`,
  },
  settlementManagement: {
    bilateral: {
      error: {
        insufficient: X => `การชำระหนี้ของคุณกับ ${X} ไม่สำเร็จเนื่องจากมีเงินไม่เพียงพอ`,
        generic: X => `เกิดข้อผิดพลาดในการประมวลผลการชำระหนี้ของคุณกับ ${X}`,
      }
    },
    eth: `ชำระหนี้ด้วย ETH`,
    paypal: `ชำระหนี้ด้วย PayPal`,
    nonPayment: `บันทึกการชำระหนี้`,
  },

  accountViewLanguage: {
    lndr: `L n d R`,
    home: `หน้าแรก`,
    friends: `เพื่อน`,
    activity: `กิจกรรม`,
  },

  notifications: {
    toggleNotifications: `การแจ้งเตือนแบบ toggle`,
    enable: `เปิด`,
    disable: `ปิด`,
  },

  pendingTransactionsLanguage: {
    shell: `ธุรกรรมรอดำเนินการ`,
    title: `รอดำเนินการ`,
    memo: `บันทึกช่วยจำ:`,
    for: `สำหรับ`,
    none: `คุณไม่มีธุรกรรมที่ค้างอยู่`,
    confirmationQuestion: `คุณแน่ใจหรือว่าต้องการยืนยันธุรกรรมนี้?`,
    pendingAnnouncement: `ธุรกรรมนี้กำลังรอการยืนยันจากอีกฝ่าย`,
    bilateral: `กำลังรอให้การโอน Eth เสร็จสมบูรณ์`,
    confirm: `ยืนยัน`,
    reject: `ปฏิเสธธุรกรรม`,
    rejectRequest: `ปฏิเสธ`,
    cancel: `ยกเลิกธุรกรรม`,
    direction: {
      lend: (X, Z) => `@${X} ติดหนี้คุณ ${Z}`,
      borrow: (X, Z) => `คุณติดหนี้ @${X} ${Z}`,
    }
  },

  pendingSettlementsLanguage: {
    shell: `การชำระหนี้ที่รอดำเนินการ`,
    title: `รอดำเนินการ`,
    none: `คุณไม่มีการชำระหนี้ที่ค้างอยู่`,
    confirm: `ยืนยัน`,
    reject: `ปฏิเสธการชำระหนี้`,
    cancel: `ยกเลิกการชำระหนี้`,
  },

  recentTransactionsLanguage: {
    title: `เสร็จสมบูรณ์`,
    none: `คุณไม่มีธุรกรรมที่เสร็จสมบูรณ์`,
    direction: {
      lend: (X, Z) => `@${X} ติดหนี้คุณ ${Z}`,
      borrow: (X, Z) => `คุณติดหนี้ @${X} ${Z}`
    },
    balance: `ยอดคงเหลือ`,
    consolidatedBalance: `ยอดคงเหลือ`,
    friends: FS => `(จาก ${FS} ${FS === 1 ? 'เพื่อน' :'เพื่อน'})`,
  },

  tabs: {
    home: `หน้าแรก `,
    friends: `เพื่อน`,
    activity: `กิจกรรม`,
  },

  confirmation: {
    shell: `การยืนยัน`,
    done: `เสร็จสิ้น`,
    create: {
      start: `เราได้ส่งบันทึกรายการไปให้`,
      end: `เพื่อยืนยันแล้ว.`,
    },
    confirm: {
      start: `คุณได้ยืนยันบันทึกรายการนี้จาก`,
      end: `แล้ว.`,
    },
    reject: {
      start: `เราได้แจ้งให้`,
      end: `รู้ว่าคุณปฏิเสธบันทึกรายการนี้.`,
    },
    confirmFriend: {
      start: `ตอนนี้คุณเป็นเพื่อนกับ`,
      end: `แล้ว!`,
    },
    rejectFriend: {
      start: `คุณได้ปฏิเสธคำขอเป็นเพื่อนจาก`,
      end: `.`,
    },
    ethSent: {
      start: `คุณได้ส่ง `,
      end: ` ETH เรียบร้อยแล้ว และแฮชธุรกรรมของคุณคือ `,
    },
    bcptSent: {
      start: `คุณได้ส่ง `,
      end: ` BCPT เรียบร้อยแล้ว และแฮชธุรกรรมของคุณคือ `,
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
    status: `คุณสามารถดูสถานะของธุรกร`,
    activity: `รมนี้ได้ในแท็บกิจกรรม.`,
  },

  pendingFriendRequestsLanguage: {
    shell: `คำขอเป็นเพื่อน`,
    message: `คำขอเป็นเพื่อน`,
    request: F => `@${F} อยากเป็นเพื่อนกับคุณ!`,
  },

  privacyPolicy: {
    link: `lndr.io/terms/`,
    message: `โดยการคลิกที่ด้านล่างคุณยืนยันว่าคุณได้อ่านและยอมรับนโยบายความเป็นส่วนตัวของ Blockmason Blockmason อาจใช้ที่อยู่อีเมลของคุณที่จะส่งการปรับปรุงเกี่ยวกับ Blockmason และ LNDR นี่คือการเชื่อมโยงกับนโยบายความเป็นส่วนตัว:`
  },

  payPalLanguage: {
    connectPayPal: `เชื่อมต่อ PayPal`,
    connectSuccess: `เปิดการใช้งาน PayPal ประสบความสำเร็จ`,
    disconnectPayPal: `ยกเลิกการเชื่อมต่อ PayPal`,
    disconnected: `PayPal ตัดการเชื่อมต่อ`,
    requestPayPalPayment: `ขอใช้บริการชำระเงิน PayPal`,
    sendWithPayPal: `ส่งด้วย PayPal`,
    enablePayPal: `เปิดใช้งาน PayPal`,
    requestPayPalPayee: `ขอ PayPal`,
    enablePayPalForFriend: F => `การเปิดใช้งาน PayPal ช่วยให้ @${F} จะจ่าย you.`,
    friendNotEnabled: F => `@${F} ยังไม่ได้เปิดใช้งาน PayPal การชำระเงิน`,
    friendRequestedConnect: F => `@${F} ต้องการจ่ายเงินให้คุณผ่าน PayPal`,
    requestFriendConnect: F => `คุณถาม @${F} เพื่อเปิดใช้งาน PayPal`,
  }
}
