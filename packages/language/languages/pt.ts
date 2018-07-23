import { currencySymbols, transferLimits } from 'lndr/currencies'

const CUR = currencySymbols
const TL = transferLimits

const generalCommunicationError = 'Houve um problema de comunicação com o servidor, tente novamente mais tarde.'

export default {

  applicationName: `Lndr`,
  helloWorld: `Olá Mundo`,
  submit: `ENVIAR`,
  next: `Próximo`,
  cancel: `Cancelar`,
  back: `Voltar`,
  copy: `Copiar para área de transferência`,
  confirmAccount: `Confirmar`,
  createAccount: `Criar Conta em Portugues-Brasil`,
  recoverAccount: `Restaurar conta`,
  removeAccount: `Remover conta`,
  updateAccount: `Atualizar conta`,
  loginAction: `Desbloquear`,
  enterPin: `Digite seu PIN`,
  changePin: `Alterar PIN`,
  enterCurrentPin: `Digite o PIN atual`,
  logoutAction: `SAIR`,
  seeAllActivity: `Visualizar toda a atividade`,
  copiedClipboard: `Copiado para a área de transferência`,
  pleaseWait: `Por favor, espere`,
  addFriend: `Adicionar amigo`,
  addFriendConfirmationQuestion: `Tem certeza de que gostaria de adicionar esse usuário como amigo?`,
  removeFriend: `Remover amigo`,
  currentFriends: `Amigos Atuais`,
  removeFriendConfirmationQuestion: `Tem certeza de que deseja remover este usuário dos seus amigos?`,
  inviteFriends: `Convidar amigos para Lndr`,
  tryLndr: `Experimente o App Lndr aqui:`,
  friendInfo: `Mais informações sobre essa amizade:`,
  noFriends: `Adicione alguns amigos para começar!`,
  noMatches: `Não foram encontrados usuários correspondentes`,
  noBalances: `Você não tem dívidas registradas`,
  addFriendButton: `Adicionar amigo`,
  alreadyFriendsButton: `Amigos`,
  friendShell: `Amigo`,
  tip: `Gorjeta:`,
  notice: `Aviso:`,
  welcome: `Bem-vindo ao seu LNDR`,
  noBalanceWarning: `Não conseguimos carregar o seu saldo neste momento, tente novamente mais tarde.`,
  totalBalance: `Saldo Total:`,
  totalBalances: `Total de Contrapartes:`,
  newTransaction: `Nova Transação`,
  needsReview: `Aprovação Pendente`,
  owesMe: `Estou em dívida`,
  iOwe: `Devo alguém`,
  newPassword: `Nova Senha (mínimo de 8 caracteres)`,
  confirmPassword: `Confirme a Senha`,
  newPin: `Novo PIN de 4 dígitos`,
  enterNewPin: `DEFINA UM NOVO PIN DE 4 DÍGITOS`,
  confirmPin: `CONFIRME SEU PIN`,
  newAccount: `Criar uma nova conta`,
  loginAccount: `Desbloquear sua conta`,
  recoverExistingAccount: `Recuperar uma conta existente`,
  recoverMnemonic: `Mnemonic (exibindo 12 palavras \ Nwhen você criou sua conta)`,
  recoverMnemonicLengthError: `Mnemonic deve ter exatamente 12 palavras`,
  successTitle: `Sucesso`,
  errorTitle: `Erro`,
  showMnemonic: `Mostrar 12-Palavras Mnemonic`,
  mnemonicExhortation: `Esta frase de 12 palavras é necessária para restaurar sua conta, por favor salve-a em algum lugar seguro e secreto`,
  addressExhortation: `Enviar Ethereum para o seu endereço para que você possa pagar as dívidas no Lndr`,
  removeAccountTitle: `Tem certeza de que deseja remover a sua conta deste dispositivo?`,
  removeAccountExhortation: `Certifique-se de que você tem acesso ao seu mnemonic para restaurar sua conta mais tarde, pois esta é uma remoção permanente das informações da sua conta deste dispositivo.`,
  myAccount: `Minha Conta`,
  setNickname: `Defina um apelido que seus amigos possam encontrar por você`,
  setEmail: `Defina um e-mail para receber informações sobre atualizações do Lndr`,
  nickname: `Apelido (letras minúsculas e números)`,
  email: `Endereço de e-mail`,
  accountManagement: {
    nickname: {
      lengthViolation: `O Apelido deve ter pelo menos 3 caracteres.`,
      compositionViolation: `Apelido pode conter apenas números e letras minúsculas.`,
      duplicationViolation: `Apelido em uso`,
    },
    email: {
      compositionViolation: `Formato de e-mail incorreto`,
      duplicationViolation: `E-mail em uso`,
    },
    pin: {
      lengthViolation: `O PIN deve ter pelo menos 4 caracteres.`,
      matchViolation: `Os PINs devem ser iguais.`,
      failedHashComparison: `PIN inválido, por favor tente novamente.`,
      updateSuccess: `O seu PIN foi atualizado`,
      updateError: `Ocorreu um erro ao atualizar seu PIN`,
    },
    mnemonic: {
      lengthViolation: `Mnemonic deve ter pelo menos 12 palavras.`,
      unableToValidate: `Mnemonic inválido, por favor tente novamente.`,
    },
    setNickname: {
      success: `Seu apelido foi salvo.`,
      error: generalCommunicationError
    },
    setEmail: {
      success: `O seu e-mail foi salvo.`,
      error: generalCommunicationError
    },
    lockTimeout: {
      top: `Você deve digitar o seu PIN em seguida`,
      bottom: `minutos de inatividade`,
      update: `Atualizar`,
      error: `Não conseguimos atualizar as suas configurações de conta`,
      success: `Intervalo de Bloqueio Atualizado`,
    },
    addFriend: {
      success: X => `Pedido de amizade enviado para @${X}`,
      error: generalCommunicationError
    },
    removeFriend: {
      success: X => `Removido dos amigos: @${X}`,
      error: generalCommunicationError
    },
    loadInformation: {
      error: generalCommunicationError
    },
    ethBalance: {
      display: Y => `Seu saldo ETH é de R ${String (Y) .slice (0,8)}`,
      inFiat: (Z, B, A) => ` (${CUR(A)}${String(Number(Z) * Number(B)).slice(0, 8)})`,
      getError: `Não é possível recuperar o saldo Eth`,
      manage: `Gerenciar ETH`,
    },
    sendEth: {
      error: {
        insufficient: `Você não tem ETH o suficiente para esta transação`,
        generic: `Houve um erro com a transferência, por favor tente novamente mais tarde`,
        address: `Por Favor insira um endereço válido`,
        amount: `Por favor, indique um valor superior a 0`,
        limitExceeded: A => `Você só pode enviar ${CUR(A)} ${TL(A)} por semana, por favor selecione uma quantidade menor`,
      },
      amount: `Quantidade a enviar`,
      address: `Endereço de destino (sem prefixo '0x')`,
      transfer: `Transferir ETH`,
      transferAll: `Transferir tudo`,
      balance: Y => `Seu saldo ETH atual é de R ${typeof Y === 'string'? Y.slice (0,8): ''} `,
      ethAddress: `Endereço Ethereum`,
      txCost: (B, A) => `O custo de transação atual é de R ${CUR(A)} ${B}`,
      transferLowercase: `Transferir Eth`,
      note: A => `Por favor, note: você só pode transferir ${CUR(A)} ${TL(A)} por semana no Lndr`,
      warning: (Z, A) => `Você tem ${CUR(A)} ${Z} remanescente do seu ${CUR(A)} ${TL(A)} limite`,
    },
    sendBcpt: {
      error: {
        insufficient: `Você não tem BCPT o suficiente para esta transação`,
        generic: `Houve um erro com a transferência, por favor tente novamente mais tarde`,
      },
      transfer: `Transferir BCPT`,
      address: `Endereço de destino (sem prefixo '0x')`,
      balance: Y => `Seu saldo BCPT atual é de R ${typeof Y === 'string' ? Y.slice (0,8): ''} `,
      bcptAddress: `Endereço BCPT`,
    },
    changeProfilePic: `Toque para alterar`,
    addProfilePic: `Usar Imagem do Telefone`,
    panelHeaders: [
      `ETH (& BCPT) Endereço`,
      `Balanço ETH`,
      `Balanço BCPT`,
      `Remover conta`,
      `Histórico de Transações ETH`,
      `Alterar Moeda principal`,
      `Alterar PIN`,
      `Alterar Nome de utilizador`,
      `Alterar e-mail`,
      `Alterar foto do perfil`,
      `Alterar tempo limite de bloqueio`,
      `Mnemonic`,
      `Notificações`,
    ],
    viewEtherscan: `Ver Histórico Etherscan`,
    profilePic: {
      change: `Alterar Foto do Perfil`,
      setError: `Houve um erro ao enviar a sua imagem, por favor tente novamente mais tarde`,
      getError: `Houve um erro ao recuperar a sua imagem no perfil`,
      setSuccess: `Imagem do Perfil Atualizada`,
    },
    logoutSuccess: `Você deslogou com sucesso!`,
    logoutError: generalCommunicationError,
  },

  currentBalance: {
    eth: `Seu saldo Eth é:`,
    bcpt: `Seu saldo BCPT atual é:`,
  },

  welcomeView: {
    by: `CONSTRUIDO POR`,
    makeItEasy: `Com Lndr é mais fácil para você controlar dívidas simples`,
    weHelpFriends: `Nós ajudamos amigos a viverem, trabalharem e jogarem juntos.`,
    len: `Len`,
    dot: `.`,
    der: `der`,
    shareDinner: `Compartilhar Jantar`,
    fillTank: `Encher o tanque`,
    travelTogether: `Viajar Juntos`,
    runEthereum: `Corremos na ETH!`,
    firstLendingApp: `O primeiro aplicativo de empréstimo móvel garantido na blockchain.`,
    greatConcert: `Ver um Grande Concerto`,
    youPlayWithFriends: `Você joga com os amigos; \ n vamos continuar a guia ...`,
    start: `Iniciar`,
  },

  debtManagement: {
    shell: `Nova Transação`,
    add: `Adicionar Dívida`,
    selectFriend: `Selecionar`,
    lend: `Novo Empréstimo`,
    borrow: `Novo Débito`,
    iLent: `Um amigo me deve`,
    iBorrowed: `Devo um amigo`,
    settleUpLower: `Contentar-se`,
    amountToSettle: `Montante a pagar`,
    total: `Total`,
    record: `registro`,
    records: `registros`,
    chooseCurrency: `Escolha uma moeda`,
    createError: {
      amountTooLow: `Montante deve ser superior a US $ 0`,
      amountTooHigh: `Montante deve ser inferior a US $ 1.000.000.000`,
      selfAsFriend: `Você não pode criar dívida com você mesmo, escolha um outro amigo`,
      pending: `Por favor, resolva a sua transação pendente com este usuário antes de criar outra`,
      insufficientEth: E => `Você precisa de pelo menos US ${E} ETH para pagar, vá para Configurações para ver o seu balanço`,
    },
    fields: {
      currency: `Moeda`,
      amount: `Montante`,
      settlementAmount: `Quantidade do Pagamento`,
      selectFriend: `Amigos`,
      memo: `Memorando`,
      direction: `Selecione a afirmação correta`,
    },
    memo: {
      example: `Digite o memorando aqui`,
    },
    direction: {
      lend: X => `${X} me deve`,
      borrow: X => `eu devo ${X}`,
      initiatedLend: X => `${X} diz que ele / ela deve`,
      initiatedBorrow: X => `${X} diz que você deve`,
      pendingLend: X => `@${X} deve você`,
      pendingBorrow: X => `Você deve @${X} `,
      pendingLendSettlement: S => `@${S.debtorNickname} solicita um pagamento em ${S.settlementCurrency} `,
      pendingBorrowSettlement: S => `@${S.creditorNickname} quer pagar você ${S.settlementCurrency} `,
      pendingLendSettlementMe: S => `Você solicitou um pagamento de @${S.debtorNickname} em ${S.settlementCurrency} `,
      pendingBorrowSettlementMe: S => `Você solicitou que @${S.creditorNickname} pague em ${S.settlementCurrency} `,
    },
    pending: {
      success: F => `Dívida pendente enviada para @${F.nickname}`,
      error: generalCommunicationError
    },
    pendingParens: `(pendente)`,
    confirmation: {
      transaction: CP => `Transação de ${CP} foi confirmada com sucesso`,
      settlement: CP => `Pagamento de ${CP} foi confirmado com sucesso`,
      error: `Incapaz de confirmar a transação neste momento, por favor tente novamente mais tarde`,
    },
    rejection: {
      success: `A Transação foi Rejeitada`,
      error: `Não é possível rejeitar a transação neste momento, tente novamente mais tarde`,
    },
    balances: {
      error: `Não foi possível carregar os saldos neste momento, por favor tente novamente mais tarde`,
    },
    for: M => `para ${M}`,
    settleUp: `Pagar`,
    settleTotal: `Pagamento Total`,
    settleUpMemo: (D, A) => `${D === 'lend'? 'Pagar a': 'Pedido de pagamento de'} ${A} `,
    recordSettleUpMemo: `Pagando`,
    balanceByCurrency: `Detalhes`,
  },
  settlementManagement: {
    bilateral: {
      error: {
        insufficient: X => `O seu pagamento de ${X} falhou devido a fundos insuficientes`,
        generic: X => `Ocorreu um erro ao processar o seu pagamento de ${X} `,
      }
    },
    eth: `Pagar com ETH`,
    paypal: `Pagar com PayPal`,
    nonPayment: `Gravar um Pagamento`,
  },

  accountViewLanguage: {
    lndr: `L n d r`,
    home: `Principal`,
    friends: `Amigos`,
    activity: `Atividade`,
  },

  notifications: {
    toggleNotifications: `Alternar Notificações`,
    enable: `Ligar`,
    disable: `Desligar`,
  },

  pendingTransactionsLanguage: {
    shell: `Transação pendente`,
    title: `Pendente`,
    memo: `Memorando:`,
    for: `Para`,
    none: `Você não tem transações pendentes`,
    confirmationQuestion: `Tem certeza de que deseja confirmar esta transação?`,
    pendingAnnouncement: `Esta transação está aguardando a confirmação pela outra parte.`,
    bilateral: `Esperando transferência Eth para completar`,
    confirm: `Confirmar`,
    reject: `Rejeitar Transação`,
    rejectRequest: `Rejeitar`,
    cancel: `Cancelar transações`,
    direction: {
      lend: (X, Z) => `@${X} lhe deve ${Z}`,
      borrow: (X, Z) => `Você deve @${X} ${Z}`,
    }
  },

  pendingSettlementsLanguage: {
    shell: `Pagamento Pendente`,
    title: `Pendente`,
    none: `Você não tem Pagamentos Pendentes`,
    confirm: `Confirmar`,
    reject: `Rejeitar Pagamento`,
    cancel: `Anular Pagamentos`,
  },

  recentTransactionsLanguage: {
    title: `Concluído`,
    none: `Você não tem transações concluídas`,
    direction: {
      lend: (X, Z) => `@${X} deve você ${Z}`,
      borrow: (X, Z) => `Você deve @${X} ${Z}`
    },
    balance: `Balanço`,
    consolidatedBalance: `Balanço`,
    friends: FS => `(de ${FS} ${ FS === 1 ? 'amigo': 'Amigos'})`,
  },

  tabs: {
    home: `Principal `,
    friends: `Amigos`,
    activity: `Atividade`,
  },

  confirmation: {
    shell: `Confirmação`,
    done: `Feito`,
    create: {
      start: `Enviamos o registro sobre `,
      end: ` para confirmação.`,
    },
    confirm: {
      start: `Você já confirmou este registro de `,
      end: `.`,
    },
    reject: {
      start: `Avisamos `,
      end: ` que você rejeitou este registro.`,
    },
    confirmFriend: {
      start: `Agora você é amigo de `,
      end: `!`,
    },
    rejectFriend: {
      start: `Você recusou o pedido de amizade de `,
      end: `.`,
    },
    ethSent: {
      start: `Você enviou com sucesso `,
      end: ` ETH e seu hash de transação é `,
    },
    bcptSent: {
      start: `Você enviou com sucesso `,
      end: ` BCPT e seu hash de transação é `,
    },
    status: `Você pode ver o status da operação na aba atividade.`,
    activity: `.`,
  },

  pendingFriendRequestsLanguage: {
    shell: `Pedido de amizade`,
    message: `Pedidos de amizade`,
    request: F => `@${F} quer ser seu amigo!`,
  },

  privacyPolicy: {
    link: `lndr.io/terms/`,
    message: `Ao clicar abaixo, você confirma que leu e concorda com a política de privacidade da Blockmason. Blockmason pode usar seu endereço de e-mail para enviar atualizações sobre Blockmason e LNDR. Aqui está um link para a política de privacidade:`
  }
}
