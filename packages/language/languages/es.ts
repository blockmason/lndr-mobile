import { currencySymbols, transferLimits } from 'lndr/currencies'

const CUR = currencySymbols
const TL = transferLimits

const generalCommunicationError = 'Había un problema de comunicación con el servidor, por favor intente de nuevo más tarde.'

export default {

  applicationName: `Lndr`,
  helloWorld: `Hola Mundo`,
  submit: `ENVIAR`,
  next: `Siguiente`,
  cancel: `Cancelar`,
  back: `Regresa`,
  copy: `Copiar al portapapeles`,
  confirmAccount: `Confirmar`,
  createAccount: `Crear una cuenta`,
  recoverAccount: `restaurar la cuenta`,
  removeAccount: `Eliminar cuenta`,
  updateAccount: `Actualizar cuenta`,
  loginAction: `desbloquear`,
  enterPin: `POR FAVOR INGRESE SU PIN`,
  changePin: `Cambiar PIN`,
  enterCurrentPin: `Introducir el PIN actual`,
  logoutAction: `CERRAR SESIÓN`,
  seeAllActivity: `Ver toda la actividad`,
  copiedClipboard: `Copiado al portapapeles`,
  pleaseWait: `Por favor espera`,
  addFriend: `Añadir amigo`,
  addFriendConfirmationQuestion: `¿Está seguro que desea añadir a este usuario como amigo?`,
  removeFriend: `Eliminar amigo`,
  currentFriends: `Amigos actuales`,
  removeFriendConfirmationQuestion: `¿Estás seguro de que quieres eliminar este usuario como amigo?`,
  inviteFriends: `Invitar a amigos a Lndr`,
  tryLndr: `Echa un vistazo a la App Lndr aquí:`,
  friendInfo: `Más información sobre esta amistad:`,
  noFriends: `Añadir algunos amigos para empezar!`,
  noMatches: `No se encontraron usuarios coincidentes`,
  noBalances: `No tiene deudas registradas`,
  addFriendButton: `Añadir amigo`,
  alreadyFriendsButton: `Amigos`,
  friendShell: `Amigo`,
  tip: `Propina:`,
  notice: `Darse cuenta:`,
  welcome: `Bienvenido a su LNDR`,
  noBalanceWarning: `No fuimos capaces de cargar su saldo en este momento, por favor inténtelo de nuevo más tarde.`,
  totalBalance: `Balance total:`,
  totalBalances: `Las contrapartes en total:`,
  newTransaction: `nueva Transacción`,
  needsReview: `Revisión necesidades`,
  owesMe: `Me deben`,
  iOwe: `Se lo debo a alguien`,
  newPassword: `Nueva contraseña (mínimo 8 caracteres)`,
  confirmPassword: `Confirmar contraseña`,
  newPin: `Nuevo PIN de 4 dígitos`,
  enterNewPin: `AJU UN NUEVO PIN de 4 dígitos`,
  confirmPin: `Por favor confirme su PIN`,
  newAccount: `Crea una cuenta nueva`,
  loginAccount: `Desbloquear su cuenta`,
  recoverExistingAccount: `Recuperar una cuenta existente`,
  recoverMnemonic: `Mnemotécnica (12 palabras que aparecen \ncuando creó su cuenta)`,
  recoverMnemonicLengthError: `Mnemotécnica debe ser exactamente 12 palabras`,
  successTitle: `Éxito`,
  errorTitle: `Error`,
  showMnemonic: `Mostrar 12-Word mnemotécnico`,
  mnemonicExhortation: `Se requiere esta frase de 12 palabras para restaurar la cuenta, por favor mantenga en un lugar seguro y secreto`,
  addressExhortation: `Enviar Etereum a su dirección para que pueda pagar las deudas en Lndr`,
  removeAccountTitle: `¿Estás seguro de que quieres eliminar tu cuenta de este dispositivo?`,
  removeAccountExhortation: `Asegúrese de que tiene acceso a su nemotécnico para restaurar la cuenta más tarde, ya que esto es una eliminación permanente de la información de su cuenta desde este dispositivo.`,
  myAccount: `Mi cuenta`,
  setNickname: `Establecer un apodo para que tus amigos pueden buscar para usted`,
  setEmail: `Establecer un correo electrónico para recibir información sobre las actualizaciones Lndr`,
  nickname: `Apodo (en minúsculas y números)`,
  email: `Dirección de correo electrónico`,
  accountManagement: {
    nickname: {
      lengthViolation: `Apodo debe ser de al menos 3 caracteres.`,
      compositionViolation: `Apodo puede contener sólo números y letras minúsculas.`,
      duplicationViolation: `Apodo ya está en uso`,
    },
    email: {
      compositionViolation: `formato de correo electrónico no es correcta`,
      duplicationViolation: `el correo electronico ya ha sido tomado`,
    },
    pin: {
      lengthViolation: `PIN debe tener al menos 4 caracteres.`,
      matchViolation: `PINs deben coincidir.`,
      failedHashComparison: `PIN no es válido, por favor intente de nuevo.`,
      updateSuccess: `Su PIN se ha actualizado`,
      updateError: `Hubo un error al actualizar el PIN`,
    },
    mnemonic: {
      lengthViolation: `Mnemotécnica debe tener por lo menos 12 palabras.`,
      unableToValidate: `La tecla de acceso introducida no es válida, por favor intente de nuevo.`,
    },
    setNickname: {
      success: `Su apodo se ha guardado.`,
      error: generalCommunicationError
    },
    setEmail: {
      success: `Su correo electrónico se ha guardado.`,
      error: generalCommunicationError
    },
    lockTimeout: {
      top: `Debe introducir su PIN después`,
      bottom: `minutos de inactividad`,
      update: `Actualizar`,
      error: `No se pudo actualizar la configuración de cuenta`,
      success: `Tiempo de espera de bloqueo Actualizado`,
    },
    addFriend: {
      success: X => `La solicitud de amistad enviada a @${X}`,
      error: generalCommunicationError
    },
    removeFriend: {
      success: X => `Fuera amigos: @${X}`,
      error: generalCommunicationError
    },
    loadInformation: {
      error: generalCommunicationError
    },
    ethBalance: {
      display: Y => `El saldo de ETH es ${String (Y) .slice (0,8)}`,
      inFiat: (Z, B, A) => ` (${CUR[A]}${String(Number(Z) * Number(B)).slice(0, 8)})`,
      getError: `No se puede recuperar el equilibrio Eth`,
      manage: `Manejo de ETH`,
    },
    sendEth: {
      error: {
        insufficient: `La transferencia fracasó debido a la falta de fondos`,
        generic: `Hubo un error en la transferencia, por favor intente de nuevo más tarde`,
        address: `Por favor introduce una dirección válida`,
        amount: `Por favor, introduzca una cantidad mayor que 0`,
        limitExceeded: A => `Sólo puede enviar ${CUR [A]} ${TL [A]} por semana, por favor seleccione una amount más pequeña`,
      },
      amount: `La cantidad a enviar`,
      address: `Dirección de destino (sin prefijo '0x')`,
      transfer: `ETH transferencia`,
      transferAll: `transferir todo`,
      balance: Y => `Tu saldo actual es de ETH ${typeof Y === 'string' ? Y.slice (0,8): ''}`,
      ethAddress: `Dirección Etereum`,
      txCost: (B, A) => `El costo transacción actual es ${CUR [A]} ${B}`,
      transferLowercase: `transferir Eth`,
      note: A => `Atención: sólo se puede transferir ${CUR [A]} ${TL [A]} por semana fuera de Lndr`,
      warning: (Z, A) => `Usted tiene ${CUR [A]} ${Z} restante de su CUR ${[A]} ${TL [A]} Límite de las aguas`,
    },
    sendBcpt: {
      error: {
        insufficient: `Usted no tiene suficiente BCPT para esta transacción`,
        generic: `Hubo un error en la transferencia, por favor intente de nuevo más tarde`,
      },
      transfer: `BCPT transferencia`,
      address: `Dirección de destino (sin prefijo '0x')`,
      balance: Y => `Tu saldo actual es de BCPT ${typeof Y === 'string' ? Y.slice (0,8): ''}`,
      bcptAddress: `Dirección BCPT`,
    },
    changeProfilePic: `Toque para cambiar`,
    addProfilePic: `Foto de utilizar el teléfono`,
    panelHeaders: [
      `ETH (y BCPT) Dirección`,
      `Equilibrio ETH`,
      `BCPT Equilibrio`,
      `ETH historial de transacciones`,
      `Cambiar PIN`,
      `cambio Apodo`,
      `Cambiar e-mail`,
      `Cambiar foto de perfil`,
      `Cambio de tiempo de espera de bloqueo`,
      `Mnemotécnico`,
      `Notificaciones`,
    ],
    viewEtherscan: `Ver antecedentes de EtherScan`,
    profilePic: {
      change: `Cambiar foto de perfil`,
      setError: `Hubo un error al subir la imagen, por favor intente de nuevo más tarde`,
      getError: `Hubo un error al recuperar su imagen de perfil`,
      setSuccess: `Perfil de actualiza`,
    },
    logoutSuccess: `¡Has terminado tu sesion satisfactoriamente!`,
  },

  currentBalance: {
    eth: `Su corriente de la balanza Eth es:`,
    bcpt: `El saldo de su BCPT actual es:`,
  },

  welcomeView: {
    by: `CONSTRUIDO POR`,
    makeItEasy: `Lndr hace que sea fácil hacer un seguimiento deudas simples`,
    weHelpFriends: `Ayudamos a amigos viven, trabajan y juegan juntos.`,
    len: `Len`,
    dot: `.`,
    der: `der`,
    shareDinner: `Compartir Cena`,
    fillTank: `Llenar el tanque`,
    travelTogether: `Viajar juntas`,
    runEthereum: `Corremos el ETH!`,
    firstLendingApp: `La primera aplicación móvil de préstamo asegurado en el blockchain.`,
    greatConcert: `Ver un gran concierto`,
    youPlayWithFriends: `Juegas con amigos; \n vamos a mantener la pestaña ...`,
    start: `Empezar`,
  },

  debtManagement: {
    shell: `nueva Transacción`,
    add: `Añadir deuda`,
    selectFriend: `Seleccionar`,
    lend: `nuevo Préstamo`,
    borrow: `nueva deuda`,
    iLent: `Un amigo me debe`,
    iBorrowed: `Le debo un amigo`,
    settleUpLower: `Saldar cuentas`,
    amountToSettle: `La cantidad a Settle`,
    total: `Total`,
    record: `grabar`,
    records: `archivos`,
    createError: {
      amountTooLow: `La cantidad debe ser mayor que $ 0`,
      amountTooHigh: `La cantidad debe ser inferior a $ 1,000,000,000`,
      selfAsFriend: `No se puede crear la deuda con usted mismo, elegir otro amigo`,
      pending: `Por favor, resolver su transacción pendiente con este usuario antes de crear otra`,
      insufficientEth: E => `Se necesita al menos ${E} ETH se asiente, vaya a Configuración para ver a su Por balanza`,
    },
    fields: {
      amount: `Cantidad`,
      settlementAmount: `Cantidad fijada`,
      selectFriend: `Amigo`,
      memo: `Memorándum`,
      direction: `Seleccione la declaración correcta`,
    },
    memo: {
      example: `Tipo nota aquí`,
    },
    direction: {
      lend: X => `${X} debe me`,
      borrow: X => `le debo ${X}`,
      initiatedLend: X => `${X} dice que él / ella owes`,
      initiatedBorrow: X => `${X} dice que owe`,
      pendingLend: X => `@${X} debe you`,
      pendingBorrow: X => `Te debes @${X}`,
      pendingLendSettlement: S => `@${S.debtorNickname} solicita un asentamiento en ${S.settlementCurrency}`,
      pendingBorrowSettlement: S => `@${S.creditorNickname} quiere establecerse con usted en ${S.settlementCurrency}`,
      pendingLendSettlementMe: S => `Ha solicitado a un acuerdo con @${S.debtorNickname} en ${S.settlementCurrency}`, 
      pendingBorrowSettlementMe: S => `Se solicitó que @${S.creditorNickname} establecerse en ${S.settlementCurrency}`, 
    },
    pending: {
      success: F => `deuda pendiente sometido a @${F.nickname}`,
      error: generalCommunicationError
    },
    pendingParens: `(pendiente)`,
    confirmation: {
      transaction: CP => `transacción con ${CP} se ha confirmado con éxito`,
      settlement: CP => `Solución con ${CP} se ha confirmado con éxito`,
      error: `No se ha podido confirmar la transacción en este momento, por favor, inténtelo de nuevo más tarde`,
    },
    rejection: {
      success: `Transacción ha sido rechazada`,
      error: `Incapaz de rechazar la transacción en este momento, por favor, inténtelo de nuevo más tarde`,
    },
    balances: {
      error: `No se puede cargar saldos en este momento, por favor, inténtelo de nuevo más tarde`,
    },
    for: M => `para ${M}`,
    settleUp: `Saldar cuentas`,
    settleTotal: `Settle total`,
    settleUpMemo: (D, A) => `${D === 'lend'? 'Liquidar por': 'Solicitud que conformarse con'} ${A} `,
    recordSettleUpMemo: `colocarnos`,
  },
  settlementManagement: {
    bilateral: {
      error: {
        insufficient: X => `Su arreglo con ${X} fracasó debido a la insuficiente funds`,
        generic: X => `Hubo un error al procesar su arreglo con ${X}`,
      }
    },
    eth: `Con conformarse ETH`,
    nonPayment: `Grabar una Solución`,
  },

  accountViewLanguage: {
    lndr: `L n d r`,
    home: `Casa`,
    friends: `Amigos`,
    activity: `Actividad`,
  },

  notifications: {
    toggleNotifications: `Toggle Notificaciones`,
    enable: `Encender`,
    disable: `Apagar`,
  },

  pendingTransactionsLanguage: {
    shell: `Transacción pendiente`,
    title: `Pendiente`,
    memo: `Memorándum:`,
    for: `por`,
    none: `No tiene transacciones pendientes`,
    confirmationQuestion: `¿Está seguro de que desea confirmar esta transacción?`,
    pendingAnnouncement: `Esta transacción está esperando la confirmación de la otra parte.`,
    bilateral: `Esperando en la transferencia de Eth para completar`,
    confirm: `Confirmar`,
    reject: `rechazar Transacción`,
    rejectRequest: `Rechazar`,
    cancel: `cancelar la transacción`,
    direction: {
      lend: (X, Z) => `@${X} le debe ${Z}`,
      borrow: (X, Z) => `Te debes @${X} ${Z}`,
    }
  },

  pendingSettlementsLanguage: {
    shell: `Convenio pendiente`,
    title: `Pendiente`,
    none: `No tiene asentamientos pendientes`,
    confirm: `Confirmar`,
    reject: `rechazar Solución`,
    cancel: `Cancelar Liquidación`,
  },

  recentTransactionsLanguage: {
    title: `Terminado`,
    none: `No tiene transacciones completadas`,
    direction: {
      lend: (X, Z) => `@${X} le debe ${Z} `,
      borrow: (X, Z) => `Te debes @${X} ${Z}`,
    },
    balance: `Equilibrar`,
    friends: FS => `(de ${FS} ${ FS === 1 ? 'amigo': 'amigos'})`,
  },

  tabs: {
    home: `Casa`,
    friends: `Amigos`,
    activity: `Actividad`,
  },

  confirmation: {
    shell: `Confirmación`,
    done: `Hecho`,
    create: {
      start: `Hemos enviado el expediente a `,
      end: ` para su confirmación.`,
    },
    confirm: {
      start: `Que confirme este registro de`,
      end: `.`,
    },
    reject: {
      start: `Hemos dejado que `,
      end: ` sabe que rechazó este registro.`,
    },
    confirmFriend: {
      start: `Ahora eres amigo con `,
      end: `!`,
    },
    rejectFriend: {
      start: `Ha rechazado la solicitud de amistad de `,
      end: `.`,
    },
    ethSent: {
      start: `Has enviado con éxito `,
      end: ` ETH y el hash de la transacción es `,
    },
    bcptSent: {
      start: `Has enviado con éxito `,
      end: ` BCPT y el hash de la transacción es `,
    },
    status: `Puede ver el estado de esta transacción en `,
    activity: `la pestaña de actividad.`,
  },

  pendingFriendRequestsLanguage: {
    shell: `Solicitud de amistad`,
    message: `Peticiones de amistad`,
    // request: F => `${F} quiere ser amigos con usted!`,
  }
}
