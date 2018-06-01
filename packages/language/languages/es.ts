import { currencySymbols, transferLimits } from 'lndr/currencies'

const CUR = currencySymbols
const TL = transferLimits

const generalCommunicationError = 'Hubo un problema de comunicación con el servidor. Por favor inténtelo de nuevo más tarde.'

export default {

  applicationName: `Lndr`,
  helloWorld: `Hola Mundo`,
  submit: `ENVIAR`,
  next: `Siguiente`,
  cancel: `Cancelar`,
  back: `Regresar`,
  copy: `Copiar en el Portapapeles`,
  confirmAccount: `Confirmar`,
  createAccount: `Crear Cuenta`,
  recoverAccount: `Restaurar Cuenta`,
  removeAccount: `Eliminar Cuenta`,
  updateAccount: `Actualizar Cuenta`,
  loginAction: `Desbloquear`,
  enterPin: `POR FAVOR, INGRESE SU PIN`,
  changePin: `Cambiar PIN`,
  enterCurrentPin: `Introducir el PIN actual`,
  logoutAction: `CERRAR SESIÓN`,
  seeAllActivity: `Ver Toda la Actividad`,
  copiedClipboard: `Copiado al Portapapeles`,
  pleaseWait: `Por Favor, Espera`,
  addFriend: `Agregar Amigo`,
  addFriendConfirmationQuestion: `¿Está seguro que desea agregar a este usuario como amigo?`,
  removeFriend: `Eliminar Amigo`,
  currentFriends: `Amigos Actuales`,
  removeFriendConfirmationQuestion: `¿Está seguro de que quiere eliminar este usuario de su lista de amigos?`,
  inviteFriends: `Invitar amigos a Lndr`,
  tryLndr: `Pruebe Aquí la Aplicación de Lendr:`,
  friendInfo: `Más información sobre esta amistad:`,
  noFriends: `¡Agregar algunos amigos para empezar!`,
  noMatches: `No se encontraron usuarios que coincidan`,
  noBalances: `No tiene deudas registradas`,
  addFriendButton: `Agregar Amigo`,
  alreadyFriendsButton: `Amigos`,
  friendShell: `Amigo`,
  tip: `Consejo:`,
  notice: `Nota / Aviso:`,
  welcome: `Bienvenido a su cuenta de LNDR`,
  noBalanceWarning: `No fue posible cargar su saldo en este momento, Por favor inténtelo de nuevo más tarde.`,
  totalBalance: `Balance Total:`,
  totalBalances: `Contrapartes Totales`,
  newTransaction: `Nueva Transacción`,
  needsReview: `Pendiente de Aprobación`,
  owesMe: `Me Deben`,
  iOwe: `Debo`,
  newPassword: `Nueva Contraseña (mínimo 8 caracteres)`,
  confirmPassword: `Confirmar contraseña`,
  newPin: `Nuevo PIN de 4 dígitos`,
  enterNewPin: `Por Favor, Indique un Nuevo PIN de 4 Dígitos`,
  confirmPin: `Por Favor, Confirme su PIN`,
  newAccount: `Crear una Nueva Cuenta`,
  loginAccount: `Desbloquear su Cuenta`,
  recoverExistingAccount: `Recuperar una Cuenta Existente`,
  recoverMnemonic: `Recordatorio de Contraseña (Frase compuesta de 12 palabras que aparecieron \n cuando creó su cuenta)  //COMMENT: NEMOTÉCNICA MAY SOUND TOO FORMAL, I SUGGEST USING "RECORDATORIO" WHICH IS THE LAYMAN VERSION OF THAT, WHICH MAY BE INTERPRETED AS PASSWORD HINTS.`,
  recoverMnemonicLengthError: `Recordatorio de Contraseña (Debe incluir exactamente las 12 palabras que aparecieron cuando creó su cuenta)`,
  successTitle: `Éxito`,
  errorTitle: `Error`,
  showMnemonic: `Mostrar el Recordatorio de 12 Palabras`,
  mnemonicExhortation: `Se requiere esta frase de 12 palabras para restaurar su cuenta, por favor consérvela en un lugar seguro y secreto`,
  addressExhortation: `Cargue Ethereum a su Dirección para que pueda Pagar sus Deudas en Lndr`,
  removeAccountTitle: `¿Está seguro de querer eliminar su cuenta de este dispositivo?`,
  removeAccountExhortation: `Asegúrese de que tiene acceso a su Recordatorio para restaurar la cuenta más tarde, ya que está procediendo a eliminar permanentemente la información de su cuenta desde este dispositivo.`,
  myAccount: `Mi cuenta`,
  setNickname: `Establecer un Nombre de Usuario para que sus amigos puedan encontrarlo fácilmente`,
  setEmail: `Establecer un correo electrónico para recibir información sobre las novedades y actualizaciones de Lndr`,
  nickname: `Nombre de Usuario (en minúsculas y números)`,
  email: `Dirección de Correo Electrónico`,
  accountManagement: {
    nickname: {
      lengthViolation: `Nombre de Usuario (debe ser de al menos 3 caracteres.)`,
      compositionViolation: `El Nombre de Usuario puede contener sólo números y letras minúsculas.`,
      duplicationViolation: `El Nombre de Usuario ya está en uso`,
    },
    email: {
      compositionViolation: `El Formato de correo electrónico no es correcto`,
      duplicationViolation: `El Correo Electrónico ya se encuentra registrado en el sistema`,
    },
    pin: {
      lengthViolation: `PIN debe tener al menos 4 caracteres.`,
      matchViolation: `El PIN debe coincidir con su confirmación.`,
      failedHashComparison: `PIN no es válido. Por favor, intente de nuevo.`,
      updateSuccess: `Su PIN se ha actualizado`,
      updateError: `Hubo un error al actualizar el PIN`,
    },
    mnemonic: {
      lengthViolation: `El Recordatorio debe tener al menos 12 palabras.`,
      unableToValidate: `El Recordatorio introducido no es válido. Por favor, Intente de nuevo.`,
    },
    setNickname: {
      success: `Su Nombre de Usuario se ha guardado.`,
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
      error: `No se pudo Actualizar la Configuración de su Cuenta`,
      success: `Tiempo de espera de bloqueo Actualizado`,
    },
    addFriend: {
      success: X => `Solicitud de Amistad Enviada a @${X}`,
      error: generalCommunicationError
    },
    removeFriend: {
      success: X => `Eliminado de su lista de Amigos: @${X}`,
      error: generalCommunicationError
    },
    loadInformation: {
      error: generalCommunicationError
    },
    ethBalance: {
      display: Y => `Su Saldo en ETH (Ethereum) es: ${String (Y) .slice (0,8)}`,
      inFiat: (Z, B, A) => ` (${CUR(A)}${String(Number(Z) * Number(B)).slice(0, 8)})`,
      getError: `No se pudo recuperar su balance de ETH (Ethereum)`,
      manage: `Administrar ETH (Ethereum)`,
    },
    sendEth: {
      error: {
        insufficient: `Usted no posee suficiente ETH para continuar con esta transacción`,
        generic: `Hubo un error en la transferencia. Por favor, inténtelo de nuevo más tarde`,
        address: `Por favor, introduzca una dirección válida`,
        amount: `Por favor, introduzca una cantidad mayor a 0`,
        limitExceeded: A => `Sólo puede enviar ${TL(A)} ${CUR(A)} por semana, por favor seleccione un monto menor`,
      },
      amount: `Monto a Enviar`,
      address: `Dirección de Destino (sin el prefijo '0x')`,
      transfer: `Transferencia de ETH (Ethereum)`,
      transferAll: `Transferir Todo`,
      balance: Y => `Su saldo actual en ETH (Ethereum) es de ${typeof Y === 'string' ? Y.slice (0,8): ''} `,
      ethAddress: `Dirección Ethereum`,
      txCost: (B, A) => `El costo de la transacción actual es de: ${CUR(A)} ${B}`,
      transferLowercase: `Transferir ETH (Ethereum)`,
      note: A => `Atención: sólo se puede transferir ${TL(A)} ${CUR(A)} por semana a través de Lndr`,
      warning: (Z, A) => `Le quedan ${CUR(A)} ${Z} restantes de su CUR ${[A]} ${TL(A)} límite`,
    },
    sendBcpt: {
      error: {
        insufficient: `Usted no posee suficiente BCPT para continuar con esta transacción`,
        generic: `Hubo un error en la transferencia, por favor intente de nuevo más tarde`,
      },
      transfer: `Transferencia de BCPT`,
      address: `Dirección de Destino (sin el prefijo '0x')`,
      balance: Y => `Su saldo actual es de: BCPT ${typeof Y === 'string'? Y.slice (0,8): ''}`,
      bcptAddress: `Dirección BCPT`,
    },
    changeProfilePic: `Toque aquí para cambiar la`,
    addProfilePic: `Usar imagen almacenada en el teléfono`,
    panelHeaders: [
      `Dirección de ETH (y BCPT)`,
      `Saldo de Ethereum`,
      `Saldo de BCPT`,
      `Historial de Transacciones en Ethereum`,
      `Cambiar PIN`,
      `Cambio Nombre de Usuario`,
      `Cambiar Correo Electrónico`,
      `Cambiar Imagen de Perfil`,
      `Cambiar Tiempo de espera para bloqueo`,
      `Recordatorio de Cuenta`,
      `Notificaciones`,
    ],
    viewEtherscan: `Ver historial en EtherScan`,
    profilePic: {
      change: `Cambiar foto de perfil`,
      setError: `Hubo un error al cargar la imagen, por favor inténtelo de nuevo más tarde`,
      getError: `Hubo un error al recuperar su imagen de perfil`,
      setSuccess: `Imagen de Perfil Actualizada`,
    },
    logoutSuccess: `¡Ha cerrado sesión satisfactoriamente!`,
  },

  currentBalance: {
    eth: `Su Saldo Actual de ETH (Ethereum) es:`,
    bcpt: `Su Saldo Actual de BCPT es:`,
  },

  welcomeView: {
    by: `CONSTRUIDO POR`,
    makeItEasy: `Lndr facilita el seguimiento de deudas simples.`,
    weHelpFriends: `Ayudamos a amigos a vivir, trabajar, y jugar juntos.`,
    len: `Len`,
    dot: `.`,
    der: `der`,
    shareDinner: `Compartir Cena`,
    fillTank: `Repostar Combustible`,
    travelTogether: `Viajar Juntos`,
    runEthereum: `Nuestra plataforma funciona en base a ETH (Ethereum)`,
    firstLendingApp: `La primera aplicación móvil de préstamos respaldados por la seguridad que ofrece blockchain.`,
    greatConcert: `Asista a Buenos Conciertos`,
    youPlayWithFriends: `Disfrute con sus Amigos; \n y deje que nosotros llevemos la cuenta …`,
    start: `Comenzar`,
  },

  debtManagement: {
    shell: `Nueva transacción`,
    add: `Agregar Deuda`,
    selectFriend: `Seleccionar`,
    lend: `Nuevo préstamo`,
    borrow: `Nueva deuda`,
    iLent: `Me Deben`,
    iBorrowed: `Debo`,
    settleUpLower: `Pagar Deudas`,
    amountToSettle: `Monto a Pagar`,
    total: `Total`,
    record: `Historial`,
    records: `Archivos`,
    chooseCurrency: `Elija una moneda`,
    
    createError: {
      amountTooLow: `El monto debe ser mayor a $ 0`,
      amountTooHigh: `El monto debe ser menor a $ 1.000.000.000`,
      selfAsFriend: `No se puede almacenar una deuda con usted mismo. Por favor, elija a otro usuario.`,
      pending: `Por favor, concrete su transacción pendiente con este usuario antes de crear otra transacción.`,
      insufficientEth: E => `Necesita al menos: ${E} ETH (Ethereum) para pagar, vaya a la Configuración para consultar su saldo`,
    },
    fields: {
      currency: `Moneda`,
      amount: `Monto`,
      settlementAmount: `Cantidad Acordada`,
      selectFriend: `Amigo`,
      memo: `Nota`,
      direction: `Seleccione el Comprobante Correcto`,
    },
    memo: {
      example: `Añadir una nota`,
    },
    direction: {
      lend: X => `${X} Me Debe`,
      borrow: X => `Le Debo ${X} `,
      initiatedLend: X => `${X} dice que él/ella le debe`,
      initiatedBorrow: X => `${X} dice que usted debe`,
      pendingLend: X => `@${X} le debe`,
      pendingBorrow: X => `Usted debe @${X}`,
      pendingLendSettlement: S => `@${S.debtorNickname} solicita un pago en ${S.settlementCurrency}`,
      pendingBorrowSettlement: S => `@${S.creditorNickname} quiere acordar un pago con usted en ${S.settlementCurrency}`,
      pendingLendSettlementMe: S => `Ha solicitado a un acuerdo de pago con @${S.debtorNickname} en ${S.settlementCurrency}`,
      pendingBorrowSettlementMe: S => `Se le solicitó a @${S.creditorNickname} acordar un pago en ${S.settlementCurrency}`,
    },
    pending: {
      success: F => `Deuda pendiente enviada a @${F.nickname}`,
      error: generalCommunicationError
    },
    pendingParens: `(pendiente)`,
    confirmation: {
      transaction: CP => `Transacción con ${CP} se ha confirmado con éxito`,
      settlement: CP => `Pago Acordado con ${CP} se ha confirmado con éxito`,
      error: `No se ha podido confirmar la transacción en este momento. Por favor, inténtelo de nuevo más tarde`,
    },
    rejection: {
      success: `Transacción Rechazada`,
      error: `No pudimos rechazar la transacción en este momento. Por favor, inténtelo de nuevo más tarde`,
    },
    balances: {
      error: `No se puede cargar saldos en este momento. Por favor, inténtelo de nuevo más tarde`,
    },
    for: M => `para ${M}`,
    settleUp: `Pagar Deudas`,
    settleTotal: `Total Acordado`,
    settleUpMemo: (D, A) => `${D === 'lend'? 'Acordando Pago Por': 'Solicitud de Acordar Pago Por'} ${A} `,
    recordSettleUpMemo: `Pagar Deudas`,
  },
  settlementManagement: {
    bilateral: {
      error: {
        insufficient: X => `Su Pago acordado con ${X} falló por fondos insuficientes`,
        generic: X => `Hubo un error al procesar su pago con ${X}`,
      }
    },
    eth: `Pagar con ETH (Ethereum)`,
    nonPayment: `Archivar un Pago`,
  },

  accountViewLanguage: {
    lndr: `L n d r`,
    home: `Inicio`,
    friends: `Amigos`,
    activity: `Actividad`,
  },

  notifications: {
    toggleNotifications: `Activar Notificaciones`,
    enable: `Activar`,
    disable: `Desactivar`,
  },

  pendingTransactionsLanguage: {
    shell: `Transacción Pendiente`,
    title: `Pendiente`,
    memo: `Nota:`,
    for: `Para`,
    none: `No tiene transacciones pendientes`,
    confirmationQuestion: `¿Está seguro de que desea confirmar esta transacción?`,
    pendingAnnouncement: `Esta transacción está esperando la confirmación de su contraparte.`,
    bilateral: `Esperando por la transferencia de ETH (Ethereum) para completar el proceso`,
    confirm: `Confirmar`,
    reject: `Rechazar Transacción`,
    rejectRequest: `Rechazar`,
    cancel: `Cancelar la Transacción`,
    direction: {
      lend: (X, Z) => `@${X} le debe ${Z} `,
      borrow: (X, Z) => `Usted debe @${X} ${Z}`,
    }
  },

  pendingSettlementsLanguage: {
    shell: `Acuerdo Pendiente`,
    title: `Pendiente`,
    none: `No tiene acuerdos pendientes`,
    confirm: `Confirmar`,
    reject: `Rechazar Acuerdo`,
    cancel: `Cancelar Acuerdo`,
  },

  recentTransactionsLanguage: {
    title: `Completado`,
    none: `No tiene transacciones completadas`,
    direction: {
      lend: (X, Z) => `@${X} le debe ${Z} `,
      borrow: (X, Z) => `Usted debe @${X} ${Z}`
    },
    balance: `Saldo`,
    friends: FS => `(de ${FS} ${FS === 1 ? 'amigo': 'amigos'})`,
  },

  tabs: {
    home: `Inicio`,
    friends: `Amigos`,
    activity: `Actividad`,
  },

  confirmation: {
    shell: `Confirmación`,
    done: `Terminado`,
    create: {
      start: `Hemos enviado el archivo a `,
      end: ` para su confirmación.`,
    },
    confirm: {
      start: `Usted ha confirmado el  presente archivo, correspondiente a `,
      end: `.`,
    },
    reject: {
      start: `Le hemos informado a `,
      end: ` que el presente archivo fue rechazado por usted.`,
    },
    confirmFriend: {
      start: `Ahora es amigo de `,
      end: `!`,
    },
    rejectFriend: {
      start: `Ha rechazado la solicitud de amistad de `,
      end: `.`,
    },
    ethSent: {
      start: `Ha enviado `,
      end: ` ETH con éxito, y el hash de la transacción es `,
    },
    bcptSent: {
      start: `Has enviado `,
      end: ` BCPT con éxito, y el hash de la transacción es `,
    },
    status: `Puede ver el estado de esta transacción en la `,
    activity: `pestaña Actividad.`,
  },

  pendingFriendRequestsLanguage: {
    shell: `Solicitud de amistad`,
    message: `Solicitudes de amistad`,
    request: F => `${F} quiere ser su Amigo!`,
  },

  privacyPolicy: {
    link: `lndr.io/terms/`,
    message: `Al hacer clic debajo de usted confirma que ha leído y acepto la política de privacidad de Blockmason. Blockmason puede utilizar su dirección de correo electrónico para enviar actualizaciones sobre Blockmason y LNDR. Aquí hay un enlace a la política de privacidad:`
  }
}
