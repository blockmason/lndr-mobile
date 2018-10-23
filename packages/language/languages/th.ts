import { currencySymbols, transferLimits } from 'lndr/currencies'

const CUR = currencySymbols
const TL = transferLimits

const generalCommunicationError = 'มีปัญหาในการสื่อสารกับเซิร์ฟเวอร์ กรุณาลองใหม่ในภายหลัง.'

export default {

  applicationName: `Lndr`,
  helloWorld: `สวัสดีทุกคน`,
  noConnection: `ไม่มีการเชื่อมต่อ`,
  retry: `ลองใหม่อีกครั้ง`,
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
  lndrVerified: {
    ok: `ตกลง`,
    title: `กำหนดวงเงินการตั้งถิ่นฐานและการถอนการเข้ารหัสลับปริมาณที่สูงขึ้นโดยเติมทราบความต้องการของลูกค้าของคุณ`,
    statusTitle: `สถานะปัจจุบันของการตรวจสอบของคุณคือ:`,
    tryAgain: `เราไม่สามารถที่จะตรวจสอบตัวตนของคุณ โปรดส่งข้อมูลของคุณและให้แน่ใจว่าภาพถ่ายของคุณมีความชัดเจน`,
    formMessage: `กรุณากรอกทุกฟิลด์ต่อไปนี้`,
    button: `ยืนยันตัวตนของคุณ`,
    prefix: `อ่าน `,
    linkTitle: `นโยบายส่วนบุคคล`,
    postfix: `ของเราเพื่อดูว่าข้อมูลส่วนบุคคลของคุณจะได้รับการจัดการอย่างไร`,
    upload: `อัปโหลดรหัสที่ออก`,
    governmentId: `โดยรัฐบาล`,
    selfie: `อัปโหลดเซลฟีที่มีบัตรประชาชนของคุณ`,
    proofOfAddress: `หลักฐานการอยู่`,
    ifNotId: `(ถ้าไม่ ID)`,
    agree: `ฉันได้อ่านและเห็นด้วยกับ`,
    agreeLink: `นโยบายส่วนบุคคล`,
    success: `KYC ได้ถูกส่งมา`,
    idInfoHeader: `ตัวอย่างของรหัสรวมถึง:`,
    passport: `หนังสือเดินทาง`,
    drivers: `ใบขับขี่`,
    national: `บัตรประจำตัวประชาชน`,
    addressInfoHeader: `ตัวอย่างของหลักฐานที่อยู่:`,
    bank: `รายการเงินฝากถอนในบัญชีเงินฝาก`,
    utility: `ค่าสาธารณูปโภค`,
    other: `เอกสารอื่น ๆ`,
    chooseGovernmentPhoto: `เลือกรัฐบาล ID รูปภาพ`,
    chooseSelfiePhoto: `เลือกเซลฟีรูปภาพ`,
    chooseAddressPhoto: `เลือกหลักฐานการอยู่รูปภาพ`,
    emailRequired: `คุณต้องอีเมลเพื่อยืนยันตัวตนของคุณโปรดคลิกที่ "เปลี่ยนอีเมล์"`,
    approved: `ได้รับการอนุมัติ`,
    rejected: `ปฏิเสธ`,
    pending: `รอดำเนินการ`,
    error: generalCommunicationError,
    formFields: {
      firstName: `ชื่อจริง`,
      lastName: `นามสกุล`,
      street: `ที่อยู่ถนน`,
      city: `เมือง`,
      state: `รัฐ / จังหวัด`,
      postalCode: `รหัสไปรษณีย์`,
      country: `เลือกประเทศ`,
      phone: `หมายเลขโทรศัพท์`,
      dob: `วันเดือนปีเกิด (YYYY-MM-DD)`,
    },
    formErrors: {
      firstName: `ชื่อจริงเป็นสิ่งจำเป็น`,
      lastName: `นามสกุลเป็นสิ่งจำเป็น`,
      street: `ถนนเป็นสิ่งจำเป็น`,
      city: `เมืองเป็นสิ่งจำเป็น`,
      state: `รัฐ / จังหวัดจะต้อง`,
      postalCode: `รหัสไปรษณีย์เป็นสิ่งจำเป็น`,
      country: `ประเทศจะต้อง`,
      phone: `หมายเลขโทรศัพท์เป็นสิ่งจำเป็น`,
      dob: `วันเดือนปีเกิดเป็นสิ่งจำเป็น`,
      general: `กรุณาตรวจสอบให้แน่ใจว่าคุณได้กรอกฟิลด์ทั้งหมดและแนบรูปถ่ายที่ถูกต้อง`,
    }
  },
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
        limitExceeded: (A, M) => `คุณสามารถส่งได้ ${CUR(A)} ${TL(A, M)} ต่อสัปดาห์เท่านั้น กรุณาเลือกจำนวนที่น้อยลง`
      },
      amount: `จำนวนที่จะส่ง`,
      address: `ที่อยู่ปลายทาง`,
      transfer: `โอน ETH`,
      transferAll: `โอนทุกอย่าง`,
      balance: Y => `ยอด ETH คงเหลือในปัจจุบันของคุณคือ ${typeof Y === 'string' ? Y.slice(0,8) :''}`,
      ethAddress: `ที่อยู่ Ethereum`,
      txCost: (B, A) => `ค่าใช้จ่ายในการทำธุรกรรมในปัจจุบันคือ ${CUR(A)}${B}`,
      transferLowercase: `โอน Eth`,
      note: (A, M) => `โปรดทราบ: คุณสามารถโอนจาก Lndr ได้ ${CUR(A)} ${TL(A, M)} ต่อสัปดาห์เท่านั้น`,
      warning: (Z, A, M) => `คุณเหลือ ${CUR(A)}${Z} จากขีดจำกัด ${CUR(A)} ${TL(A, M)} ของคุณ`,
    },
    sendERC20: {
      error: {
        insufficient: (name) => `คุณมี ${name} ไม่เพียงพอสำหรับการทำธุรกรรมนี้`,
        generic: `เกิดข้อผิดพลาดในการโอน กรุณาลองใหม่ในภายหลัง`,
      },
      transfer: (name) => `โอน ${name}`,
      address: `ที่อยู่ปลายทาง`,
      balance: (name, balance) => `ยอด ${name} คงเหลือในปัจจุบันของคุณคือ ${typeof balance === 'string' ? balance.slice(0,8) :''}`,
      tokenAddress: (name) => `ที่อยู่ ${name}`,
    },
    panelHeaders: [
      `Wallet Address`, // <-- translate me
      `Crypto Balances`, // <-- translate me
      `ปิดบัญชี`,
      `ประวัติการทำธุรกรรม ETH`,
      `เปิดใช้งาน PayPal`,
      `เปลี่ยนสกุลเงินหลัก`,
      `ปลดล็อคคุณสมบัติเพิ่มเติม`,
      `เปลี่ยนอีเมล์`,
      `เปลี่ยน PIN`,
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

  walkthrough: {
    skip: `กระโดด`,
    continue: `ต่อ`,
    step1: {
      easyToUse: `Lndr เป็นวิธีที่ง่ายที่สุดในการแยกค่าใช้จ่ายค่าใช้จ่ายในหุ้นและชำระหนี้ที่เรียบง่ายกับเพื่อนและครอบครัวทำทุกอย่างปลอดภัยบน blockchain`,
      len: `Len`,
      der: `der`,
    },
    step2: {
      getStarted: `การเริ่มต้นกับ Lndr คุณจะต้องเพิ่มเพื่อน`,
      friendsScreen: `เยี่ยมชมเพื่อนหน้าจอเพื่อค้นหาเพิ่มหรือเชิญเพื่อนและครอบครัวของคุณในการเชื่อมต่อบน Lndr`,
    },
    step3: {
      title: `บันทึกการทำธุรกรรม`,
      easy: `แยกการเรียกเก็บเงินหรือการเพิ่มหนี้ให้กับเพื่อนเป็นเรื่องง่ายใน Lndr!`,
      selectFriend: `เลือกเพื่อนของคุณสกุลเงินของคุณและจำนวนเงินที่`,
      addMemo: `เพิ่มบันทึกบางอย่างในกล่องบันทึกและคลิกส่ง`,
    },
    step4: {
      title: `ชำระหนี้`,
      ready: `พร้อมแล้วหรือยัง?`,
      payPal: `เมื่อถึงเวลาที่จะชำระค่ากับ Lndr, \n- ท่านสามารถเลือก PayPal:`,
      ether: `- Cryptocurrencies เช่นอีเธอร์:`,
      cash: `- หรือเพียงแค่บันทึกการตั้งถิ่นฐานเงินสด:`,
      positiveBalance: `10.46`,
    },
    step5: {
      title: `หลายสกุล`,
      multiCurrency: `Lndr สามารถติดตามการทำธุรกรรมของคุณแม้ว่าพวกเขาเกิดขึ้นในสกุลเงินที่แตกต่างกัน`,
      exchangeRate: `เมื่อคุณตัดสินใจที่จะพักผ่อนขึ้นกับเพื่อนของคุณ, การทำธุรกรรมทั้งหมดจะถูกแปลงเป็นสกุลเงินหลักของคุณโดยใช้ส่วนใหญ่อัตราแลกเปลี่ยนขึ้นไปวันที่ใช้ได้`,
      start: `เริ่มต้นการใช้ Lndr!`,
    }
  },

  debtManagement: {
    shell: `ธุรกรรมใหม่`,
    add: `เพิ่มหนี้`,
    selectFriend: `เลือก`,
    lend: `เงินกู้ใหม่`,
    borrow: `หนี้ใหม่`,
    owesMe: `เป็นหนี้ฉัน`,
    iOwe: `ฉันเป็นหนี้`,
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
    select: `เลือกประเภทการชำระบัญชี`,
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
    rejectOutboundFriendRequest: {
      start: `คุณได้ยกเลิกคำขอเป็นเพื่อนเพื่อ `,
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
      start: `เราได้แจ้งให้ `,
      end: ` รู้ว่าคุณต้องการที่จะชำระด้วย PayPal`,
    },
    requestPayPalPayment: {
      start: `เราได้แจ้งให้ `,
      end: ` รู้ว่าคุณต้องการที่จะได้รับการชำระเงินด้วย PayPal`,
    },
    settledWithPayPal: {
      start: `เราได้แจ้งให้ `,
      end: ` ทราบว่าคุณได้ตกลงกับ PayPal`,
    },
    kycSuccess: {
      start: `ขอขอบคุณ! บัญชีของคุณจะถูกตรวจสอบ

      `,
      end: `คุณจะได้รับการแจ้งเตือนเมื่อมีคุณสมบัติเพิ่มเติมของคุณจะปลดล็อค`
    },
    status: `คุณสามารถดูสถานะของธุรกร`,
    activity: `รมนี้ได้ในแท็บกิจกรรม.`,
  },

  pendingFriendRequestsLanguage: {
    shell: `คำขอเป็นเพื่อน`,
    message: `คำขอเป็นเพื่อน`,
    request: F => `@${F} อยากเป็นเพื่อนกับคุณ!`,
    outbound: F => `คุณส่งคำขอเป็นเพื่อนเพื่อ @${F}`,
  },

  privacyPolicy: {
    link: `blockmason.io/lndr/terms/`,
    message: `โดยการคลิกที่ด้านล่างคุณยืนยันว่าคุณได้อ่านและยอมรับนโยบายความเป็นส่วนตัวของ Blockmason Blockmason อาจใช้ที่อยู่อีเมลของคุณที่จะส่งการปรับปรุงเกี่ยวกับ Blockmason และ LNDR นี่คือการเชื่อมโยงกับนโยบายความเป็นส่วนตัว:`,
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
    feesNotification: `ไม่รวมค่าธรรมเนียม PayPal`,
    feesInformationHeader: `ข้อมูลค่าธรรมเนียม PayPal`,
    feesInformation: `1. บัญชี PayPal ของคุณจะต้องเชื่อมโยงกับบัญชีธนาคาร
    
2. ชำระเงินในสกุลเงินที่แตกต่างจากสกุลเงินของธนาคารจะต้องเสียค่าธรรมเนียม $ 0.35

3. ค่าธรรมเนียมการโอนระหว่างประเทศ:
    สหรัฐอเมริกาแคนาดา / ยุโรป: $ 2.99
    ประเทศสหรัฐอเมริกาเพื่อให้ทุกที่อื่น: $ 4.99

4. ค่าใช้จ่ายเหล่านี้จะไม่ครอบคลุม สำหรับข้อมูลการปรับปรุงมากที่สุดโปรดไปที่:

    https://www.paypal.com/us/webapps/mpp/paypal-fees#sending-us`,
    payPalSite: `PayPal.com`,
  },

  countries: [
    { name: `อัฟกานิสถาน`, code: 'AFG' },
    { name: `แอลเบเนีย`, code: 'ALB' },
    { name: `แอลจีเรีย`, code: 'DZA' },
    { name: `อันดอร์รา`, code: 'AND' },
    { name: `แองโกลา`, code: 'AGO' },
    { name: `แองกวิลลา`, code: 'AIA' },
    { name: `ทวิปแอนตาร์กติกา`, code: 'ATA' },
    { name: `แอนติกาและบาร์บูดา`, code: 'ATG' },
    { name: `อาร์เจนตินา`, code: 'ARG' },
    { name: `อาร์เมเนีย`, code: 'ARM' },
    { name: `อารูบา`, code: 'ABW' },
    { name: `ออสเตรเลีย`, code: 'AUS' },
    { name: `ออสเตรีย`, code: 'AUT' },
    { name: `อาเซอร์ไบจาน`, code: 'AZE' },
    { name: `บาฮามาส`, code: 'BHS' },
    { name: `บาห์เรน`, code: 'BHR' },
    { name: `บังคลาเทศ`, code: 'BGD' },
    { name: `บาร์เบโดส`, code: 'BRB' },
    { name: `เบลารุส`, code: 'BLR' },
    { name: `เบลเยียม`, code: 'BEL' },
    { name: `เบลีซ`, code: 'BLZ' },
    { name: `ประเทศเบนิน`, code: 'BEN' },
    { name: `เบอร์มิวดา`, code: 'BMU' },
    { name: `ภูฏาน`, code: 'BTN' },
    { name: `โบลิเวีย`, code: 'BOL' },
    { name: `บอสเนียและเฮอร์เซโก`, code: 'BIH' },
    { name: `บอตสวานา`, code: 'BWA' },
    { name: `บราซิล`, code: 'BRA' },
    { name: `บรูไน`, code: 'BRN' },
    { name: `บัลแกเรีย`, code: 'BGR' },
    { name: `Burkina Faso`, code: 'BFA' },
    { name: `บุรุนดี`, code: 'BDI' },
    { name: `Cabo Verde`, code: 'CPV' },
    { name: `กัมพูชา`, code: 'KHM' },
    { name: `แคเมอรูน`, code: 'CMR' },
    { name: `แคนาดา`, code: 'CAN' },
    { name: `หมู่เกาะเคย์เเมน`, code: 'CYM' },
    { name: `สาธารณรัฐแอฟริกากลาง`, code: 'CAF' },
    { name: `ชาด`, code: 'TCD' },
    { name: `ชิลี`, code: 'CHL' },
    { name: `ประเทศจีน`, code: 'CHN' },
    { name: `โคลอมเบีย`, code: 'COL' },
    { name: `คอโมโรส`, code: 'COM' },
    { name: `ประเทศคองโก`, code: 'COG' },
    { name: `ประเทศคองโก`, code: 'COD' },
    { name: `หมู่เกาะคุก`, code: 'COK' },
    { name: `คอสตาริกา`, code: 'CRI' },
    { name: `โกตดิวัว`, code: 'CIV' },
    { name: `โครเอเชีย`, code: 'HRV' },
    { name: `คิวบา`, code: 'CUB' },
    { name: `คูราเซา`, code: 'CUW' },
    { name: `ประเทศไซปรัส`, code: 'CYP' },
    { name: `เช็ก`, code: 'CZE' },
    { name: `เดนมาร์ก`, code: 'DNK' },
    { name: `จิบูตี`, code: 'DJI' },
    { name: `โดมินิกา`, code: 'DMA' },
    { name: `สาธารณรัฐโดมินิกัน`, code: 'DOM' },
    { name: `เอกวาดอร์`, code: 'ECU' },
    { name: `อียิปต์`, code: 'EGY' },
    { name: `เอลซัลวาดอร์`, code: 'SLV' },
    { name: `ทอเรียลกินี`, code: 'GNQ' },
    { name: `เอริเทรี`, code: 'ERI' },
    { name: `เอสโตเนีย`, code: 'EST' },
    { name: `Eswatini`, code: 'SWZ' },
    { name: `สาธารณรัฐเอธิโอเปีย`, code: 'ETH' },
    { name: `ฟิจิ`, code: 'FJI' },
    { name: `ฟินแลนด์`, code: 'FIN' },
    { name: `ฝรั่งเศส`, code: 'FRA' },
    { name: `เฟรนช์เกีย`, code: 'GUF' },
    { name: `french Polynesia`, code: 'PYF' },
    { name: `ประเทศกาบอง`, code: 'GAB' },
    { name: `แกมเบีย`, code: 'GMB' },
    { name: `จอร์เจีย`, code: 'GEO' },
    { name: `ประเทศเยอรมัน`, code: 'DEU' },
    { name: `ประเทศกานา`, code: 'GHA' },
    { name: `ยิบรอลตา`, code: 'GIB' },
    { name: `กรีซ`, code: 'GRC' },
    { name: `เกาะกรีนแลนด์`, code: 'GRL' },
    { name: `เกรเนดา`, code: 'GRD' },
    { name: `ลุป`, code: 'GLP' },
    { name: `กวม`, code: 'GUM' },
    { name: `กัวเตมาลา`, code: 'GTM' },
    { name: `ประเทศกินี`, code: 'GIN' },
    { name: `กินีบิสเซา`, code: 'GNB' },
    { name: `กายอานา`, code: 'GUY' },
    { name: `ไฮติ`, code: 'HTI' },
    { name: `วาติกัน`, code: 'VAT' },
    { name: `ฮอนดูรัส`, code: 'HND' },
    { name: `ฮ่องกง`, code: 'HKG' },
    { name: `ฮังการี`, code: 'HUN' },
    { name: `ประเทศไอซ์แลนด์`, code: 'ISL' },
    { name: `อินเดีย`, code: 'IND' },
    { name: `อินโดนีเซีย`, code: 'IDN' },
    { name: `อิหร่าน`, code: 'IRN' },
    { name: `อิรัก`, code: 'IRQ' },
    { name: `ไอร์แลนด์`, code: 'IRL' },
    { name: `เกาะ Isle of Man`, code: 'IMN' },
    { name: `อิสราเอล`, code: 'ISR' },
    { name: `อิตาลี`, code: 'ITA' },
    { name: `เกาะจาเมกา`, code: 'JAM' },
    { name: `ประเทศญี่ปุ่น`, code: 'JPN' },
    { name: `จอร์แดน`, code: 'JOR' },
    { name: `คาซัคสถาน`, code: 'KAZ' },
    { name: `ประเทศเคนย่า`, code: 'KEN' },
    { name: `ประเทศคิริบาส`, code: 'KIR' },
    { name: `เกาหลี (DPRK)`, code: 'PRK' },
    { name: `เกาหลี (เกาหลีใต้)`, code: 'KOR' },
    { name: `คูเวต`, code: 'KWT' },
    { name: `คีร์กีสถาน`, code: 'KGZ' },
    { name: `ลาว`, code: 'LAO' },
    { name: `ลัตเวีย`, code: 'LVA' },
    { name: `เลบานอน`, code: 'LBN' },
    { name: `เลโซโท`, code: 'LSO' },
    { name: `ประเทศไลบีเรีย`, code: 'LBR' },
    { name: `ประเทศลิบยา`, code: 'LBY' },
    { name: `นสไตน์`, code: 'LIE' },
    { name: `ประเทศลิธัวเนีย`, code: 'LTU' },
    { name: `ลักเซมเบิร์ก`, code: 'LUX' },
    { name: `มาเก๊า`, code: 'MAC' },
    { name: `มาซิโดเนีย`, code: 'MKD' },
    { name: `มาดากัสการ์`, code: 'MDG' },
    { name: `มาลาวี`, code: 'MWI' },
    { name: `ประเทศมาเลเซีย`, code: 'MYS' },
    { name: `มัลดีฟส์`, code: 'MDV' },
    { name: `มาลี`, code: 'MLI' },
    { name: `เกาะมอลตา`, code: 'MLT' },
    { name: `หมู่เกาะมาร์แชลล์`, code: 'MHL' },
    { name: `มาร์ตินีก`, code: 'MTQ' },
    { name: `ประเทศมอริเตเนีย`, code: 'MRT' },
    { name: `มอริเชียส`, code: 'MUS' },
    { name: `เม็กซิโก`, code: 'MEX' },
    { name: `ไมโครนีเซีย`, code: 'FSM' },
    { name: `มอลโดวา`, code: 'MDA' },
    { name: `โมนาโก`, code: 'MCO' },
    { name: `ประเทศมองโกเลีย`, code: 'MNG' },
    { name: `มอนเตเนโก`, code: 'MNE' },
    { name: `มอนต์เซอร์รัต`, code: 'MSR' },
    { name: `โมร็อกโก`, code: 'MAR' },
    { name: `ประเทศโมซัมบิก`, code: 'MOZ' },
    { name: `พม่า`, code: 'MMR' },
    { name: `นามิเบีย`, code: 'NAM' },
    { name: `ประเทศนาอูรู`, code: 'NRU' },
    { name: `ประเทศเนปาล`, code: 'NPL' },
    { name: `เนเธอร์แลนด์`, code: 'NLD' },
    { name: `New Caledonia`, code: 'NCL' },
    { name: `นิวซีแลนด์`, code: 'NZL' },
    { name: `นิการากัว`, code: 'NIC' },
    { name: `ประเทศไนเธอร์`, code: 'NER' },
    { name: `ประเทศไนจีเรีย`, code: 'NGA' },
    { name: `นีอูเอ`, code: 'NIU' },
    { name: `หมู่เกาะมาเรียนาเหนือ`, code: 'MNP' },
    { name: `นอร์เวย์`, code: 'NOR' },
    { name: `โอมาน`, code: 'OMN' },
    { name: `ปากีสถาน`, code: 'PAK' },
    { name: `ปาเลา`, code: 'PLW' },
    { name: `ปาเลสไตน์`, code: 'PSE' },
    { name: `ปานามา`, code: 'PAN' },
    { name: `ปาปัวนิวกินี`, code: 'PNG' },
    { name: `ประเทศปารากวัย`, code: 'PRY' },
    { name: `เปรู`, code: 'PER' },
    { name: `ฟิลิปปินส์`, code: 'PHL' },
    { name: `พิตแคร์น`, code: 'PCN' },
    { name: `โปแลนด์`, code: 'POL' },
    { name: `โปรตุเกส`, code: 'PRT' },
    { name: `เปอร์โตริโก้`, code: 'PRI' },
    { name: `กาตาร์`, code: 'QAT' },
    { name: `เรอูนียง`, code: 'REU' },
    { name: `โรมาเนีย`, code: 'ROU' },
    { name: `สหพันธรัฐรัสเซีย`, code: 'RUS' },
    { name: `รวันดา`, code: 'RWA' },
    { name: `เซนต์บาร์เธเลมี`, code: 'BLM' },
    { name: `เซนต์เฮเลนาสวรรค์และอุโมงค์ da Cunha`, code: 'SHN' },
    { name: `เซนต์คิตส์และเนวิส`, code: 'KNA' },
    { name: `เซนต์ลูเซีย`, code: 'LCA' },
    { name: `เซนต์มาร์ติ`, code: 'MAF' },
    { name: `เซนต์ปิแอร์และมีเกอลง`, code: 'SPM' },
    { name: `เซนต์วินเซนต์และเกรนาดีน`, code: 'VCT' },
    { name: `ซามัว`, code: 'WSM' },
    { name: `ซานมารีโน`, code: 'SMR' },
    { name: `Sao Tome Principe และ`, code: 'STP' },
    { name: `ซาอุดิอาราเบีย`, code: 'SAU' },
    { name: `ประเทศเซเนกัล`, code: 'SEN' },
    { name: `เซอร์เบีย`, code: 'SRB' },
    { name: `เซเชลส์`, code: 'SYC' },
    { name: `เซียร์ราลีโอน`, code: 'SLE' },
    { name: `สิงคโปร์`, code: 'SGP' },
    { name: `เซนต์มาติน`, code: 'SXM' },
    { name: `สโลวะเกีย`, code: 'SVK' },
    { name: `สโลวีเนีย`, code: 'SVN' },
    { name: `หมู่เกาะโซโลมอน`, code: 'SLB' },
    { name: `โซมาเลีย`, code: 'SOM' },
    { name: `แอฟริกาใต้`, code: 'ZAF' },
    { name: `ซูดานใต้`, code: 'SSD' },
    { name: `สเปน`, code: 'ESP' },
    { name: `ศรีลังกา`, code: 'LKA' },
    { name: `ซูดาน`, code: 'SDN' },
    { name: `ซูรินาเม`, code: 'SUR' },
    { name: `สวีเดน`, code: 'SWE' },
    { name: `ประเทศสวิสเซอร์แลนด์`, code: 'CHE' },
    { name: `สาธารณรัฐอาหรับซีเรีย`, code: 'SYR' },
    { name: `ไต้หวัน`, code: 'TWN' },
    { name: `ทาจิกิสถาน`, code: 'TJK' },
    { name: `ประเทศแทนซาเนีย`, code: 'TZA' },
    { name: `ประเทศไทย`, code: 'THA' },
    { name: `ติมอร์เลสเต`, code: 'TLS' },
    { name: `ไป`, code: 'TGO' },
    { name: `โตเกเลา`, code: 'TKL' },
    { name: `ตองกา`, code: 'TON' },
    { name: `ตรินิแดดและโตเบโก`, code: 'TTO' },
    { name: `ตูนิเซีย`, code: 'TUN' },
    { name: `ไก่งวง`, code: 'TUR' },
    { name: `เติร์กเมนิสถาน`, code: 'TKM' },
    { name: `หมู่เกาะเติกส์และหมู่เกาะเคคอส`, code: 'TCA' },
    { name: `ตูวาลู`, code: 'TUV' },
    { name: `ยูกันดา`, code: 'UGA' },
    { name: `ยูเครน`, code: 'UKR' },
    { name: `สหรัฐอาหรับเอมิเรตส์`, code: 'ARE' },
    { name: `ประเทศอังกฤษ`, code: 'GBR' },
    { name: `สหรัฐอเมริกา`, code: 'USA' },
    { name: `เกาะเล็กรอบนอกของสหรัฐอเมริกา`, code: 'UMI' },
    { name: `อุรุกวัย`, code: 'URY' },
    { name: `อุซเบกิ`, code: 'UZB' },
    { name: `วานูอาตู`, code: 'VUT' },
    { name: `เวเนซุเอลา`, code: 'VEN' },
    { name: `เวียดนาม`, code: 'VNM' },
    { name: `หมู่เกาะบริติชเวอร์จิน`, code: 'VGB' },
    { name: `หมู่เกาะเวอร์จินของสหรัฐอเมริกา`, code: 'VIR' },
    { name: `ซาฮาร่าตะวันตก`, code: 'ESH' },
    { name: `เยเมน`, code: 'YEM' },
    { name: `แซมเบีย`, code: 'ZMB' },
    { name: `ประเทศซิมบับเว`, code: 'ZWE' },
  ]
}
