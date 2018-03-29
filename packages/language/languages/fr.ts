import { currencies, transferLimits } from 'language'

const CUR = currencies
const TL = transferLimits

const generalCommunicationError = 'There was a problem communicating with the server, please try again later.'

export default {

  applicationName: `Bonjour le monde`,
  helloWorld: `Lndr`,
  submit: `SOUMETTRE`,
  next: `Prochain`,
  cancel: `Annuler`,
  back: `Retourner`,
  copy: `Copier dans le presse-papier`,
  confirmAccount: `Confirmer`,
  createAccount: `Créer un compte`,
  recoverAccount: `restaurer compte`,
  removeAccount: `Supprimer le compte`,
  updateAccount: `Compte mis à jour`,
  loginAction: `Ouvrir`,
  enterPin: `S'IL VOUS PLAÎT ENTRER VOTRE PIN`,
  changePin: `Modifier le code PIN`,
  enterCurrentPin: `Entrer le code PIN actuel`,
  logoutAction: `CONNECTEZ - OUT`,
  seeAllActivity: `Voir toutes les activités`,
  copiedClipboard: `Copié dans le presse-papier`,
  pleaseWait: `S'il vous plaît, attendez`,
  addFriend: `Ajouter un ami`,
  addFriendConfirmationQuestion: `Etes-vous sûr que vous voulez ajouter cet utilisateur comme un ami?`,
  removeFriend: `Supprimer un ami`,
  currentFriends: `amis en cours`,
  removeFriendConfirmationQuestion: `Etes-vous sûr que vous voulez supprimer cet utilisateur comme un ami?`,
  inviteFriends: `Inviter des amis à Lndr`,
  tryLndr: `Consultez l'App Lndr ici:`,
  friendInfo: `Plus d'informations sur cette amitié:`,
  noFriends: `Ajouter quelques amis pour commencer!`,
  noMatches: `Aucun utilisateur correspondant trouvé`,
  noBalances: `Vous avez pas de dettes enregistrées`,
  addFriendButton: `Ajouter un ami`,
  alreadyFriendsButton: `copains`,
  friendShell: `Ami`,
  tip: `Pointe:`,
  notice: `Remarquer:`,
  welcome: `Bienvenue à votre LNDR`,
  noBalanceWarning: `Nous ne sommes pas en mesure de charger votre solde à ce moment, s'il vous plaît réessayer plus tard.`,
  totalBalance: `Solde total:`,
  totalBalances: `Total des Contreparties:`,
  newTransaction: `nouvelle transaction`,
  needsReview: `besoins d'examen`,
  owesMe: `Je devais`,
  iOwe: `Je dois quelqu'un`,
  newPassword: `Nouveau mot de passe (8 caractères minimum)`,
  confirmPassword: `Confirmez le mot de passe`,
  newPin: `Nouveau code PIN à 4 chiffres`,
  enterNewPin: `S'IL VOUS PLAÎT UN NOUVEAU SET 4-DIGIT PIN`,
  confirmPin: `S'IL VOUS PLAÎT CONFIRMER VOTRE PIN`,
  newAccount: `Créer un nouveau compte`,
  loginAccount: `Débloquer votre compte`,
  recoverExistingAccount: `Récupérer un compte existant`,
  recoverMnemonic: `Mnémonique (12 mots affichés \ nLorsqu'un vous avez créé votre compte)`,
  recoverMnemonicLengthError: `Mnémonique doit être exactement 12 mots`,
  successTitle: `Succès`,
  errorTitle: `Erreur`,
  showMnemonic: `Afficher 12 Word Mnémonique`,
  mnemonicExhortation: `Cette phrase de 12 mots est nécessaire pour restaurer votre compte, s'il vous plaît garder dans un endroit sûr et secret`,
  addressExhortation: `Envoyer Ethereum à votre adresse afin que vous puissiez régler des dettes sur Lndr`,
  removeAccountTitle: `Etes-vous sûr que vous souhaitez supprimer votre compte de cet appareil?`,
  removeAccountExhortation: `Assurez-vous que vous avez accès à votre mnémotechnique pour restaurer votre compte plus tard, car cela est une suppression permanente de vos informations de compte à partir de cet appareil.`,
  myAccount: `Mon compte`,
  setNickname: `Définir un pseudonyme afin que vos amis peuvent vous rechercher`,
  setEmail: `Définir un e-mail pour recevoir des informations sur les mises à jour Lndr`,
  nickname: `Pseudo (minuscules et chiffres)`,
  email: `Adresse e-mail`,
  accountManagement: {
    nickname: {
      lengthViolation: `Pseudo doit être d'au moins 3 caractères.`,
      compositionViolation: `Pseudo peut contenir que des chiffres et des lettres minuscules.`,
      duplicationViolation: `Pseudo est déjà pris`,
    },
    email: {
      compositionViolation: `Format du courrier électronique est incorrect`,
      duplicationViolation: `Cet email est déjà pris`,
    },
    pin: {
      lengthViolation: `PIN doit être d'au moins 4 caractères.`,
      matchViolation: `PINs doivent correspondre.`,
      failedHashComparison: `PIN n'est pas valide, s'il vous plaît essayer à nouveau.`,
      updateSuccess: `Votre NIP a été mis à jour`,
      updateError: `Il y avait une erreur de mise à jour de votre NIP`,
    },
    mnemonic: {
      lengthViolation: `Mnémonique doit avoir au moins 12 mots.`,
      unableToValidate: `Le mnémonique saisi n'était pas valide, s'il vous plaît essayer à nouveau.`,
    },
    setNickname: {
      success: `Votre pseudo a été enregistré.`,
      error: generalCommunicationError
    },
    setEmail: {
      success: `Votre e-mail a été enregistré.`,
      error: generalCommunicationError
    },
    lockTimeout: {
      top: `Vous devez entrer votre code PIN après`,
      bottom: `minutes d'inactivité`,
      update: `Mettre à jour`,
      error: `Nous ne pouvons pas mettre à jour vos paramètres de compte`,
      success: `Délai de verrouillage Mise à jour`,
    },
    addFriend: {
      success: X => `demande d'ami envoyée à @${X}`,
      error: generalCommunicationError
    },
    removeFriend: {
      success: X => `Suppression des amis: @${X}`,
      error: generalCommunicationError
    },
    loadInformation: {
      error: generalCommunicationError
    },
    ethBalance: {
      display: Y => `Votre solde est ETH ${String (Y) .slice (0,8)}`,
      inFiat: (Z, B, A) => ` (${CUR[A]}${String(Number(Z) * Number(B)).slice(0, 8)})`,
      getError: `Impossible de récupérer l'équilibre Eth`,
      manage: `gérer ETH`,
    },
    sendEth: {
      error: {
        insufficient: `Le transfert a échoué en raison du manque de fonds`,
        generic: `Il y avait une erreur avec le transfert, s'il vous plaît réessayer plus tard`,
        address: `s'il-vous-plaît entrez une adresse valide`,
        amount: `S'il vous plaît entrer un montant supérieur à 0`,
        limitExceeded: A => `Vous ne pouvez envoyer ${CUR [A]} ${TL [A]} par semaine, s'il vous plaît sélectionner un amount plus petit`,
      },
      amount: `Montant à envoyer`,
      address: `Adresse de destination (sans préfixe '0x')`,
      transfer: `transfert ETH`,
      transferAll: `transfert tout`,
      balance: Y => `Votre solde est ETH ${typeof Y === 'string'? Y.slice (0,8): ''} `,
      ethAddress: `Adresse Ethereum`,
      txCost: (B, A) => `Le coût actuel de la transaction est ${CUR [A]} ${B}`,
      transferLowercase: `transfert Eth`,
      note: A => `S'il vous plaît noter: vous ne pouvez transférer ${CUR [A]} ${TL [A]} par semaine sur Lndr`,
      warning: (Z, A) => `Vous avez ${CUR [A]} ${Z} restante de votre ${CUR [A]} ${TL [A]} limit`,
    },
    sendBcpt: {
      error: {
        insufficient: `Vous n'avez pas assez BCPT pour cette transaction`,
        generic: `Il y avait une erreur avec le transfert, s'il vous plaît réessayer plus tard`,
      },
      transfer: `transfert BCPT`,
      address: `Adresse de destination (sans préfixe '0x')`,
      balance: Y => `Votre solde est BCPT ${typeof Y === 'string'? Y.slice (0,8): ''} `,
      bcptAddress: `Adresse BCPT`,
    },
    changeProfilePic: `Appuyez sur pour changer`,
    addProfilePic: `Utilisez l'image du téléphone`,
    panelHeaders: [
      `ETH (& BCPT) Adresse`,
      `Balance des ETH`,
      `BCPT équilibre`,
      `ETH Historique des transactions`,
      `Modifier le code PIN`,
      `Changement Pseudo`,
      `Changer l'e-mail`,
      `Modifier la photo de profil`,
      `Modifier le verrouillage de délai d'attente`,
      `Mnémonique`,
      `Notifications`,
    ],
    viewEtherscan: `Voir le Etherscan Histoire`,
    profilePic: {
      change: `Modifier la photo de profil`,
      setError: `Il y avait une erreur Télécharger image, s'il vous plaît réessayer plus tard`,
      getError: `Il y avait une erreur récupérer votre photo de profil`,
      setSuccess: `photo mis à jour`,
    },
    logoutSuccess: `Vous avez bien déconnecté!`,
  },

  currentBalance: {
    eth: `Votre solde actuel est Eth:`,
    bcpt: `Votre solde actuel de BCPT est:`,
  },

  welcomeView: {
    by: `CONSTRUIT PAR`,
    makeItEasy: `Lndr il est facile de suivre les dettes simples`,
    weHelpFriends: `Nous aidons les amis vivent, travaillent et jouent ensemble.`,
    len: `Len`,
    dot: `.`,
    der: `der`,
    shareDinner: `Dîner Partager`,
    fillTank: `Remplissez votre réservoir`,
    travelTogether: `Voyager ensemble`,
    runEthereum: `Nous courons sur ETH!`,
    firstLendingApp: `La première application de prêt mobile fixé sur le blockchain.`,
    greatConcert: `Voir un grand concert`,
    youPlayWithFriends: `Vous jouez avec des amis, \ n nous allons garder l'onglet ...`,
    start: `Commencer`,
  },

  debtManagement: {
    shell: `nouvelle transaction`,
    add: `Ajouter la dette`,
    selectFriend: `Sélectionner`,
    lend: `nouveau prêt`,
    borrow: `nouvelle dette`,
    iLent: `Un ami me doit`,
    iBorrowed: `Je dois un ami`,
    settleUpLower: `se contenter d'utiliser`,
    amountToSettle: `Montant Settle`,
    total: `Total`,
    record: `record`,
    records: `archives`,
    createError: {
      amountTooLow: `Le montant doit être supérieur à 0 $`,
      amountTooHigh: `Le montant doit être inférieur à $ 1.000.000.000`,
      selfAsFriend: `Vous ne pouvez pas créer la dette avec vous-même, choisir un autre ami`,
      pending: `S'il vous plaît résoudre votre transaction en cours avec cet utilisateur avant de créer un autre`,
      insufficientEth: E => `Vous devez au moins ${E} ETH pour régler, allez dans Paramètres pour voir votre balance`,
    },
    fields: {
      amount: `Montant`,
      settlementAmount: `Montant du règlement`,
      selectFriend: `Ami`,
      memo: `Note`,
      direction: `Sélectionnez la déclaration correcte`,
    },
    memo: {
      example: `mémo Entrez ici`,
    },
    direction: {
      lend: X => `${X} doit me`,
      borrow: X => `Je dois ${X}`,
      initiatedLend: X => `${X}, dit-il / elle owes`,
      initiatedBorrow: X => `${X} indique que vous owe`,
      pendingLend: X => `@${X} you doit`,
      pendingBorrow: X => `Vous devez @${X}`,
      pendingLendSettlement: S => `@${S.debtorNickname} demande un règlement en ${S.settlementCurrency}`,
      pendingBorrowSettlement: S => `@${S.creditorNickname} veut régler avec vous dans ${S.settlementCurrency}`,
      pendingLendSettlementMe: S => `Vous avez demandé à régler avec @${S.debtorNickname} dans ${S.settlementCurrency}`,
      pendingBorrowSettlementMe: S => `Vous avez demandé que @${S.creditorNickname} régler dans ${S.settlementCurrency}`,
    },
    pending: {
      success: F => `Dans l'attente dette soumise à @${F.nickname}`,
      error: generalCommunicationError
    },
    pendingParens: `(en attendant)`,
    confirmation: {
      transaction: CP => `Transaction avec ${CP} a été confirmée avec succès`,
      settlement: CP => `établissement avec ${CP} a été confirmée avec succès`,
      error: `Impossible de confirmer la transaction à ce moment, s'il vous plaît réessayer plus tard`,
    },
    rejection: {
      success: `La transaction a été rejetée`,
      error: `Impossible de rejeter la transaction à ce moment, s'il vous plaît réessayer plus tard`,
    },
    balances: {
      error: `Impossible de charger les soldes en ce moment, s'il vous plaît réessayer plus tard`,
    },
    for: M => `pour ${M}`,
    settleUp: `se contenter d'utiliser`,
    settleTotal: `total régler`,
    settleUpMemo: (D, A) => `${D === 'lend'? 'S\'établir pour': 'Demande de régler pour'} ${A}`,
    recordSettleUpMemo: `le règlement des`,
  },
  settlementManagement: {
    bilateral: {
      error: {
        insufficient: X => `votre règlement avec ${X} a échoué en raison de l'insuffisance funds`,
        generic: X => `Il y avait une erreur de traitement de votre règlement avec ${X}`,
      }
    },
    eth: `Avec ETH régler`,
    nonPayment: `Enregistrement d'un règlement`,
  },

  accountViewLanguage: {
    lndr: `L n d r`,
    home: `Accueil`,
    friends: `copains`,
    activity: `Activité`,
  },

  notifications: {
    toggleNotifications: `Basculer Notifications`,
    enable: `Allumer`,
    disable: `Éteindre`,
  },

  pendingTransactionsLanguage: {
    shell: `Dans l'attente de la transaction`,
    title: `en attendant`,
    memo: `Note:`,
    for: `Pour`,
    none: `Vous n'avez pas les transactions en attente`,
    confirmationQuestion: `Etes-vous sûr de vouloir confirmer cette transaction?`,
    pendingAnnouncement: `Cette transaction est en attente de confirmation par l'autre partie.`,
    bilateral: `En attendant le transfert Eth pour terminer`,
    confirm: `Confirmer`,
    reject: `rejeter Transaction`,
    rejectRequest: `Rejeter`,
    cancel: `Annuler la transaction`,
    direction: {
      lend: (X, Z) => `@${X} vous doit ${Z}`,
      borrow: (X, Z) => `Vous devez @${X} ${Z}`,
    }
  },

  pendingSettlementsLanguage: {
    shell: `En attendant le règlement`,
    title: `En Attendant`,
    none: `Vous n'avez pas les règlements en attente`,
    confirm: `Confirmer`,
    reject: `Rejeter Settlement`,
    cancel: `Annuler Règlement`,
  },

  recentTransactionsLanguage: {
    title: `Terminé`,
    none: `Vous avez pas de transactions réalisées`,
    direction: {
      lend: (X, Z) => `@${X} vous doit ${Z}`,
      borrow: (X, Z) => `Vous devez @${X} ${Z}`
    },
    balance: `Équilibre`,
    friends: FS => `(de ${FS} ${FS === 1 ? 'ami': 'amis'})`,
  },

  tabs: {
    home: `Accueil`,
    friends: `copains`,
    activity: `Activité`,
  },

  confirmation: {
    shell: `Confirmation`,
    done: `Terminé`,
    create: {
      start: `Nous avons envoyé le dossier à plus de `,
      end: ` pour confirmation.`,
    },
    confirm: {
      start: `Vous avez confirmé ce disque de `,
      end: `.`,
    },
    reject: {
      start: `Nous avons laissé savoir que `,
      end: ` vous avez refusé cet enregistrement.`,
    },
    confirmFriend: {
      start: `Vous êtes maintenant amis avec `,
      end: `!`,
    },
    rejectFriend: {
      start: `Vous avez refusé la demande d'ami de `,
      end: `.`,
    },
    ethSent: {
      start: `Vous avez envoyé avec succès `,
      end: ` ETH et votre hachage de transaction est `,
    },
    bcptSent: {
      start: `Vous avez envoyé avec succès `,
      end: `BCPT et votre hachage de transaction est `,
    },
    status: `Vous pouvez voir l'état de cette opération dans `,
    activity: `l'onglet d'activité.`,
  },

  pendingFriendRequestsLanguage: {
    shell: `Demande d'ami`,
    message: `Demandes d'ami`,
    request: F => `${F} veut être amis avec vous!`,
  }
}
