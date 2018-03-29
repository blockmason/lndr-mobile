import { currencies, transferLimits } from 'language'

const CUR = currencies
const TL = transferLimits

const generalCommunicationError = 'There was a problem communicating with the server, please try again later.'

export default {

  applicationName: `Lndr`,
  helloWorld: `Olá Mundo`,
  submit: `ENVIAR`,
  next: `Próximo`,
  cancel: `Cancelar`,
  back: `Volte`,
  copy: `Copiar para área de transferência`,
  confirmAccount: `confirme`,
  createAccount: `Criar Conta em portugues-Brasil`,
  recoverAccount: `restaurar conta`,
  removeAccount: `Remover conta`,
  updateAccount: `Atualizar conta`,
  loginAction: `destravar`,
  enterPin: `Digite seu PIN`,
  changePin: `Alterar PIN`,
  enterCurrentPin: `Digite o PIN atual`,
  logoutAction: `SAIR`,
  seeAllActivity: `Visualizar todas as atividades`,
  copiedClipboard: `Copiado para a área de transferência`,
  pleaseWait: `Por favor, espere`,
  addFriend: `Adicionar amigo`,
  addFriendConfirmationQuestion: `Tem certeza de que você gostaria de adicionar esse usuário como amigo?`,
  removeFriend: `Remover amigo`,
  currentFriends: `atuais Amigos`,
  removeFriendConfirmationQuestion: `Tem certeza de que deseja remover este usuário como um amigo?`,
  inviteFriends: `Convidar amigos para Lndr`,
  tryLndr: `Confira o Lndr App aqui:`,
  friendInfo: `Mais informações sobre essa amizade:`,
  noFriends: `Adicione alguns amigos para começar!`,
  noMatches: `Não há usuários correspondentes foram encontrados`,
  noBalances: `Você não tem dívidas registradas`,
  addFriendButton: `Adicionar amigo`,
  alreadyFriendsButton: `Amigos`,
  friendShell: `Amigos`,
  tip: `Gorjeta:`,
  notice: `Aviso prévio:`,
  welcome: `Bem-vindo ao seu LNDR`,
  noBalanceWarning: `Não fomos capazes de carregar o seu equilíbrio neste momento, tente novamente mais tarde.`,
  totalBalance: `Balanço total:`,
  totalBalances: `Total de contrapartes:`,
  newTransaction: `New Transação`,
  needsReview: `necessidades revisão`,
  owesMe: `Estou em dívida`,
  iOwe: `Devo alguém`,
  newPassword: `Nova senha (mínimo de 8 caracteres)`,
  confirmPassword: `Confirme a Senha`,
  newPin: `New PIN de 4 dígitos`,
  enterNewPin: `DEFINA UM NOVO PIN de 4 dígitos`,
  confirmPin: `Confirme o seu PIN`,
  newAccount: `Criar uma nova conta`,
  loginAccount: `Desbloquear sua conta`,
  recoverExistingAccount: `Recuperar uma conta existente`,
  recoverMnemonic: `Mnemonic (12 palavras exibido \ Nwhen você criou sua conta)`,
  recoverMnemonicLengthError: `Mnemonic deve ser exatamente 12 palavras`,
  successTitle: `Sucesso`,
  errorTitle: `Erro`,
  showMnemonic: `Mostrar 12-Word Mnemonic`,
  mnemonicExhortation: `Esta frase de 12 palavras é necessária para restaurar sua conta, por favor mantê-lo em algum lugar seguro e secreto`,
  addressExhortation: `Enviar Ethereum para o seu endereço para que você possa liquidar as dívidas em Lndr`,
  removeAccountTitle: `Tem certeza de que deseja remover a sua conta deste dispositivo?`,
  removeAccountExhortation: `Certifique-se de que você tem acesso ao seu mnemônico para restaurar sua conta mais tarde, como esta é uma remoção permanente de informações da sua conta a partir deste dispositivo.`,
  myAccount: `Minha conta`,
  setNickname: `Definir um apelido que seus amigos possam procurar por você`,
  setEmail: `Definir um e-mail para receber informações sobre atualizações Lndr`,
  nickname: `Nome de utilizador (letras minúsculas e números)`,
  email: `Endereço de e-mail`,
  accountManagement: {
    nickname: {
      lengthViolation: `Nome de utilizador deve ser de pelo menos 3 caracteres.`,
      compositionViolation: `Apelido pode conter apenas números e letras minúsculas.`,
      duplicationViolation: `Apelido já está tomada`,
    },
    email: {
      compositionViolation: `formato de e-mail está incorreto`,
      duplicationViolation: `E-mail já está tomada`,
    },
    pin: {
      lengthViolation: `PIN deve ser de pelo menos 4 caracteres.`,
      matchViolation: `PINs devem corresponder.`,
      failedHashComparison: `PIN não é válido, por favor tente novamente.`,
      updateSuccess: `O seu PIN foi atualizado`,
      updateError: `Ocorreu um erro ao atualizar seu PIN`,
    },
    mnemonic: {
      lengthViolation: `Mnemonic deve ter pelo menos 12 palavras.`,
      unableToValidate: `O mnemônico entrou não era válida, por favor tente novamente.`,
    },
    setNickname: {
      success: `Seu apelido foi salvo.`,
      error: generalCommunicationError
    },
    setEmail: {
      success: `O seu email foi salvo.`,
      error: generalCommunicationError
    },
    lockTimeout: {
      top: `Você deve digitar o seu PIN após`,
      bottom: `minutos de inactividade`,
      update: `Atualizar`,
      error: `Não fomos capazes de atualizar suas configurações de conta`,
      success: `Bloqueio Timeout Atualizado`,
    },
    addFriend: {
      success: X => `pedido amigo enviado para @${X}`,
      error: generalCommunicationError
    },
    removeFriend: {
      success: X => `removido dos amigos: @${X}`,
      error: generalCommunicationError
    },
    loadInformation: {
      error: generalCommunicationError
    },
    ethBalance: {
      display: Y => `Seu saldo ETH é de R ${String (Y) .slice (0,8)}`,
      inFiat: (Z, B, A) => ` (${CUR[A]}${String(Number(Z) * Number(B)).slice(0, 8)})`,
      getError: `Não é possível recuperar o equilíbrio Eth`,
      manage: `Gerenciar ETH`,
    },
    sendEth: {
      error: {
        insufficient: `A transferência falhou devido a fundos insuficientes`,
        generic: `Houve um erro com a transferência, por favor tente novamente mais tarde`,
        address: `Por Favor insira um endereço válido`,
        amount: `Por favor, indique um valor superior a 0`,
        limitExceeded: A => `Você só pode enviar ${CUR [A]} ${TL [A]} por semana, por favor selecione um montante-menor`,
      },
      amount: `Quantidade a enviar`,
      address: `Endereço de destino (sem prefixo '0x')`,
      transfer: `transferência ETH`,
      transferAll: `transferir tudo`,
      balance: Y => `Seu saldo ETH atual é de R ${typeof Y === 'string'? Y.slice (0,8): ''} `,
      ethAddress: `Endereço Ethereum`,
      txCost: (B, A) => `O custo de transação atual é de R ${CUR [A]} ${B}`,
      transferLowercase: `transferir Eth`,
      note: A => `Por favor, note: você só pode transferir ${CUR [A]} ${TL [A]} por semana fora de Lndr`,
      warning: (Z, A) => `Você tem ${CUR [A]} ${Z} remanescente do seu ${CUR [A]} ${TL [A]} limit`,
    },
    sendBcpt: {
      error: {
        insufficient: `Você não tem BCPT o suficiente para esta transação`,
        generic: `Houve um erro com a transferência, por favor tente novamente mais tarde`,
      },
      transfer: `transferência BCPT`,
      address: `Endereço de destino (sem prefixo '0x')`,
      balance: Y => `Seu saldo BCPT atual é de R ${typeof Y === 'string' ? Y.slice (0,8): ''} `,
      bcptAddress: `Endereço BCPT`,
    },
    changeProfilePic: `Toque para alterar`,
    addProfilePic: `Use Foto de telefone`,
    panelHeaders: [
      `ETH (& BCPT) Endereço`,
      `Equilíbrio ETH`,
      `Equilíbrio BCPT`,
      `ETH Histórico de transações`,
      `Alterar PIN`,
      `Alterar Nome de utilizador`,
      `Mude o e-mail`,
      `Alterar foto do perfil`,
      `Alterar tempo limite de bloqueio`,
      `Mnemônico`,
      `Notificações`,
    ],
    viewEtherscan: `Ver Histórico Etherscan`,
    profilePic: {
      change: `Alterar foto do perfil`,
      setError: `Houve um erro ao enviar a sua imagem, por favor tente novamente mais tarde`,
      getError: `Houve um erro ao recuperar a sua imagem no perfil`,
      setSuccess: `Perfil quadro atualizado`,
    },
    logoutSuccess: `De ter logado com sucesso!`,
  },

  currentBalance: {
    eth: `Seu saldo Eth é:`,
    bcpt: `Seu saldo BCPT atual é:`,
  },

  welcomeView: {
    by: `CONSTRUIDO POR`,
    makeItEasy: `Lndr torna mais fácil para controlar dívidas simples`,
    weHelpFriends: `Nós ajudamos amigos vivem, trabalham e brincam juntos.`,
    len: `Len`,
    dot: `.`,
    der: `der`,
    shareDinner: `Compartilhar Jantar`,
    fillTank: `Encher o tanque`,
    travelTogether: `Viajar juntos`,
    runEthereum: `Corremos na ETH!`,
    firstLendingApp: `O primeiro aplicativo de empréstimo móvel garantido na blockchain.`,
    greatConcert: `Ver um grande concerto`,
    youPlayWithFriends: `Você joga com os amigos; \ n vamos continuar a guia ...`,
    start: `Iniciar`,
  },

  debtManagement: {
    shell: `New Transação`,
    add: `Adicionar Dívida`,
    selectFriend: `selecionar`,
    lend: `New Loan`,
    borrow: `nova dívida`,
    iLent: `Um amigo me deve`,
    iBorrowed: `Devo um amigo`,
    settleUpLower: `Contentar-se`,
    amountToSettle: `Montante a liquidar`,
    total: `Total`,
    record: `registro`,
    records: `registros`,
    createError: {
      amountTooLow: `Montante deve ser superior a US $ 0`,
      amountTooHigh: `Montante deve ser inferior a US $ 1.000.000.000`,
      selfAsFriend: `Você não pode criar dívida com você mesmo, escolher um outro amigo`,
      pending: `Por favor, resolver o seu transação pendente com este usuário antes de criar outro`,
      insufficientEth: E => `Você precisa de pelo menos US ${E} ETH para resolver, vá para Configurações de ver seu balance`,
    },
    fields: {
      amount: `Montante`,
      settlementAmount: `Montante de liquidação`,
      selectFriend: `Amigos`,
      memo: `Memorando`,
      direction: `Selecione a afirmação correta`,
    },
    memo: {
      example: `Tipo memo aqui`,
    },
    direction: {
      lend: X => `${X} deve me`,
      borrow: X => `eu devo ${X}`,
      initiatedLend: X => `${X} diz que ele / ela owes`,
      initiatedBorrow: X => `${X} diz que você owe`,
      pendingLend: X => `@${X} deve you`,
      pendingBorrow: X => `Você deve @${X} `,
      pendingLendSettlement: S => `@${S.debtorNickname} solicita um acordo em ${S.settlementCurrency} `,
      pendingBorrowSettlement: S => `@${S.creditorNickname} quer resolver com você em ${S.settlementCurrency} `,
      pendingLendSettlementMe: S => `Você solicitou a acertar com @${S.debtorNickname} em ${S.settlementCurrency} `,
      pendingBorrowSettlementMe: S => `Você solicitou que @${S.creditorNickname} estabelecer em ${S.settlementCurrency} `,
    },
    pending: {
      success: F => `Na pendência da dívida submetidos a @${F.nickname}`,
      error: generalCommunicationError
    },
    pendingParens: `(pendente)`,
    confirmation: {
      transaction: CP => `Transação com ${CP} foi confirmada com sucesso`,
      settlement: CP => `Liquidação com ${CP} foi confirmada com sucesso`,
      error: `Incapaz de confirmar a transação, neste momento, por favor tente novamente mais tarde`,
    },
    rejection: {
      success: `Transação foi rejeitada`,
      error: `Não é possível rejeitar a transação neste momento, tente novamente mais tarde`,
    },
    balances: {
      error: `Não foi possível carregar os saldos, neste momento, por favor tente novamente mais tarde`,
    },
    for: M => `para ${M}`,
    settleUp: `Contentar-se`,
    settleTotal: `Settle total`,
    settleUpMemo: (D, A) => `${D === 'lend'? 'Settling-se de': 'Pedido de se contentar com'} ${A} `,
    recordSettleUpMemo: `estabelecendo-se`,
  },
  settlementManagement: {
    bilateral: {
      error: {
        insufficient: X => `O seu assentamento com ${X} falhou devido a funds insuficiente`,
        generic: X => `Ocorreu um erro ao processar o seu assentamento com ${X} `,
      }
    },
    eth: `Resolver com ETH`,
    nonPayment: `Gravar um Settlement`,
  },

  accountViewLanguage: {
    lndr: `L n d r`,
    home: `Casa`,
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
    bilateral: `À espera de transferência Eth para completar`,
    confirm: `confirme`,
    reject: `rejeitar Transação`,
    rejectRequest: `Rejeitar`,
    cancel: `Cancelar transações`,
    direction: {
      lend: (X, Z) => `@${X} lhe deve ${Z}`,
      borrow: (X, Z) => `Você deve @${X} ${Z}`,
    }
  },

  pendingSettlementsLanguage: {
    shell: `pendentes de liquidação`,
    title: `Pendente`,
    none: `Você não tem assentamentos pendentes`,
    confirm: `confirme`,
    reject: `rejeitar Settlement`,
    cancel: `Anular Liquidação`,
  },

  recentTransactionsLanguage: {
    title: `concluído`,
    none: `Você não tem transações concluídas`,
    direction: {
      lend: (X, Z) => `@${X} lhe deve ${Z}`,
      borrow: (X, Z) => `Você deve @${X} ${Z}`
    },
    balance: `Equilibrar`,
    friends: FS => `(de ${FS} ${FS === 1 ? 'amigo': 'amigos'})`,
  },

  tabs: {
    home: `Casa`,
    friends: `Amigos`,
    activity: `Atividade`,
  },

  confirmation: {
    shell: `Confirmação`,
    done: `Feito`,
    create: {
      start: `Enviamos o registro sobre a `,
      end: ` para confirmação.`,
    },
    confirm: {
      start: `Você já confirmou este registro de`,
      end: `.`,
    },
    reject: {
      start: `Deixamos `,
      end: ` saber que você rejeitou este registro.`,
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
    status: `Você pode ver o status da operação no `,
    activity: `separador atividade.`,
  },

  pendingFriendRequestsLanguage: {
    shell: `Pedido de amizade`,
    message: `Pedidos de amizade`,
    request: F => `${F} quer ser amigos com você!`,
  }
}
