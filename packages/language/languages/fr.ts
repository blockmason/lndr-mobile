import { currencySymbols, transferLimits } from 'lndr/currencies'

const CUR = currencySymbols
const TL = transferLimits

const generalCommunicationError = 'Il y a eu un problème de communication avec le serveur, veuillez réessayer plus tard.'

export default {

  applicationName: `Lndr`,
  helloWorld: `Bonjour tout le monde,`,
  submit: `SOUMETTRE`,
  next: `Suivant`,
  cancel: `Annuler`,
  back: `Retourner`,
  copy: `Copier dans le presse-papier`,
  confirmAccount: `Confirmer`,
  createAccount: `Créer un compte`,
  recoverAccount: `Restaurer un compte`,
  removeAccount: `Supprimer le compte`,
  updateAccount: `Mettre à jour le compte`,
  loginAction: `Déverouiller`,
  enterPin: `MERCI D'ENTRER VOTRE CODE PIN`,
  changePin: `Modifier le code PIN`,
  enterCurrentPin: `Entrer le code PIN actuel`,
  logoutAction: `DECONNEXION`,
  seeAllActivity: `Voir toutes les activités`,
  copiedClipboard: `Copié dans le presse-papier`,
  pleaseWait: `Merci de patienter`,
  addFriend: `Ajouter un ami`,
  addFriendConfirmationQuestion: `Etes-vous sûr de vouloir ajouter cet utilisateur dans votre liste d'amis ?`,
  removeFriend: `Supprimer un ami`,
  currentFriends: `Amis en ligne`,
  removeFriendConfirmationQuestion: `Êtes-vous sûr de vouloir supprimer cet utilisateur de votre liste d'amis ?`,
  inviteFriends: `Inviter des amis sur Lndr`,
  tryLndr: `Essayez Lndr ici :`,
  friendInfo: `Plus d'informations sur cette amitié :`,
  noFriends: `Ajoutez quelques amis pour commencer !`,
  noMatches: `Aucun utilisateur correspondant trouvé`,
  noBalances: `Vous n'avez pas de dettes enregistrées`,
  addFriendButton: `Ajouter un ami`,
  alreadyFriendsButton: `Amis`,
  friendShell: `Ami`,
  tip: `Astuce :`,
  notice: `Notice :`,
  welcome: `Bienvenue sur votre LNDR`,
  noBalanceWarning: `Nous ne sommes pas en mesure de charger votre solde actuellement, merci de réessayer plus tard.`,
  totalBalance: `Solde complet :`,
  totalBalances: `Nombre total des contreparties :`,
  newTransaction: `Nouvelle transaction`,
  needsReview: `Validation en attente`,
  owesMe: `On me doit`,
  iOwe: `Je dois à quelqu'un`,
  newPassword: `Nouveau mot de passe (8 caractères minimum)`,
  confirmPassword: `Confirmez le mot de passe`,
  newPin: `Nouveau code PIN à 4 chiffres`,
  enterNewPin: `MERCI D'ENTRER UN NOUVEAU CODE PIN à 4 CHIFFRES`,
  confirmPin: `MERCI DE CONFIRMER VOTRE CODE PIN`,
  newAccount: `Créer un nouveau compte`,
  loginAccount: `Débloquer votre compte`,
  recoverExistingAccount: `Récupérer un compte existant`,
  recoverMnemonic: `Code mnémonique (12 mots qui ont été affichés \n lorsqu'un vous avez créé votre compte)`,
  recoverMnemonicLengthError: `Le code mnémonique doit être composé d'exactement 12 mots`,
  successTitle: `Succès`,
  errorTitle: `Erreur`,
  showMnemonic: `Afficher le code mnémonique de 12 mots`,
  mnemonicExhortation: `Cette phrase de 12 mots est nécessaire afin restaurer votre compte, merci de la garder dans un endroit sûr et secret`,
  addressExhortation: `Envoyer de l'ethereum à votre adresse afin que vous puissiez régler des dettes sur Lndr`,
  removeAccountTitle: `Etes-vous sûr de vouloir supprimer votre compte sur cet appareil ?`,
  removeAccountExhortation: `Assurez-vous d'avoir accès à votre code mnémonique afin de restaurer votre compte plus tard, car votre compte sera supprimé de manière permanente sur cet appareil`,
  myAccount: `Mon compte`,
  setNickname: `Définir un pseudonyme afin que vos amis puissent vous retrouver`,
  setEmail: `Définir un e-mail pour recevoir des informations sur les mises à jour Lndr`,
  nickname: `Pseudonyme (lettres en minuscules et chiffres)`,
  email: `Adresse e-mail`,
  accountManagement: {
    nickname: {
      lengthViolation: `Le pseudonyme doit comporter au moins 3 caractères.`,
      compositionViolation: `Pseudo peut contenir que des chiffres et des lettres minuscules.`,
      duplicationViolation: `Ce pseudonyme est déjà utilisé`,
    },
    email: {
      compositionViolation: `Votre adresse e-mail est invalide`,
      duplicationViolation: `Cette adresse e-mail est déjà utilisée`,
    },
    pin: {
      lengthViolation: `Le code PIN doit comporter au moins 4 caractères.`,
      matchViolation: `Les codes PIN doivent correspondre.`,
      failedHashComparison: `Le code PIN n'est pas valide, merci de réessayer.`,
      updateSuccess: `Votre code PIN a été mis à jour`,
      updateError: `Il y a eu erreur dans la mise à jour de votre code PIN`,
    },
    mnemonic: {
      lengthViolation: `Le code mnémonique doit être composé d'au moins 12 mots.`,
      unableToValidate: `Le code mnémonique saisi n'est pas valide, merci de réessayer.`,
    },
    setNickname: {
      success: `Votre pseudonyme a été enregistré.`,
      error: generalCommunicationError
    },
    setEmail: {
      success: `Votre adresse e-mail a été enregistrée.`,
      error: generalCommunicationError
    },
    lockTimeout: {
      top: `Vous devez entrer votre code PIN après`,
      bottom: `minutes d'inactivité`,
      update: `Mettre à jour`,
      error: `Nous n'avons pas pu mettre à jour les paramètres de votre compte`,
      success: `Délai de verrouillage mis à jour`,
    },
    addFriend: {
      success: X => `demande d'ami envoyée à @${X}`,
      error: generalCommunicationError
    },
    removeFriend: {
      success: X => `Supprimé des amis : @${X}`,
      error: generalCommunicationError
    },
    loadInformation: {
      error: generalCommunicationError
    },
    ethBalance: {
      display: Y => `Votre solde en ETH est de ${String (Y) .slice (0,8)}`,
      inFiat: (Z, B, A) => ` (${CUR(A)}${String(Number(Z) * Number(B)).slice(0, 8)})`,
      getError: `Impossible de récupérer votre solde en ETH`,
      manage: `Gérer vos ETH`,
    },
    sendEth: {
      error: {
        insufficient: `Vous n'avez pas assez de ETH pour cette transaction`,
        generic: `Il y a eu une erreur lors du transfert, merci de réessayer plus tard.`,
        address: `Merci d'entrer une adresse valide`,
        amount: `Merci d'entrer un montant supérieur à 0`,
        limitExceeded: A => `Vous ne pouvez envoyer que ${CUR(A)} ${TL(A)} par semaine, merci de sélectionner un montant inférieur`,
      },
      amount: `Montant à envoyer`,
      address: `Adresse de destination (sans préfixe '0x')`,
      transfer: `Transférer de l'ETH`,
      transferAll: `Tout transférer`,
      balance: Y => `Votre solde en ETH est de ${typeof Y === 'string'? Y.slice (0,8): ''} `,
      ethAddress: `Adresse Ethereum`,
      txCost: (B, A) => `Le coût actuel de la transaction est de ${CUR(A)} ${B}`,
      transferLowercase: `Transférer de l'ETH`,
      note: A => `Merci de noter que vous ne pouvez transférer que ${CUR(A)} ${TL(A)} par semaine sur Lndr`,
      warning: (Z, A) => `Vous avez ${CUR(A)} ${Z} restants sur votre limite de ${CUR(A)} ${TL(A)} `,
    },
    sendBcpt: {
      error: {
        insufficient: `Vous n'avez pas assez de BCPT pour cette transaction`,
        generic: `Il y a eu une erreur pendant le transfer, merci de réessayer plus tard`,
      },
      transfer: `Transférez des BPCT`,
      address: `Adresse de destination (sans préfixe '0x')`,
      balance: Y => `Votre solde en BCPT est de ${typeof Y === 'string'? Y.slice (0,8): ''} `,
      bcptAddress: `Adresse BCPT`,
    },
    changeProfilePic: `Appuyez sur pour changer`,
    addProfilePic: `Utilisez une photo prise depuis votre téléphone`,
    panelHeaders: [
      `Adresse ETH (& BCPT)`,
      `Solde ETH`,
      `Solde BCPT`,
      `Historique des transactions en ETH`,
      `Changer la devise primaire`,
      `Modifier le code PIN`,
      `Modifier le pseudonyme`,
      `Changer l'adresse e-mail`,
      `Modifier la photo de profil`,
      `Modifier le délai de verrouillage`,
      `Code mnémonique`,
      `Notifications`,
    ],
    viewEtherscan: `Voir l'historique Etherscan`,
    profilePic: {
      change: `Modifier votre photo de profil`,
      setError: `Il y a eu une erreur pendant le téléchargement de votre photo, merci de réessayer plus tard`,
      getError: `Il y a eu une erreur pendant le recouvrement de votre photo de profil`,
      setSuccess: `Photo de profil mise à jour`,
    },
    logoutSuccess: `Vous avez bien été déconnecté !`,
  },

  currentBalance: {
    eth: `Votre solde actuel en ETH est :`,
    bcpt: `Votre solde actuel en BCPT est :`,
  },

  welcomeView: {
    by: `CONSTRUIT PAR`,
    makeItEasy: `Lndr facilite le recouvrement des petites dettes`,
    weHelpFriends: `Nous aidons nos amis à vivre, travailler, et s'amuser ensemble.`,
    len: `Len`,
    dot: `.`,
    der: `der`,
    shareDinner: `Partagez votre dîner`,
    fillTank: `Remplissez votre réservoir`,
    travelTogether: `Voyagez ensemble`,
    runEthereum: `Nous acceptons les ETH !`,
    firstLendingApp: `La première application mobile de prêt sécurisée sur la blockchain.`,
    greatConcert: `Assistez à un super concert`,
    youPlayWithFriends: `Amusez-vous avec vos amis / nous nous occupons de l'addition…`,
    start: `Commencer`,
  },

  debtManagement: {
    shell: `Nouvelle transaction`,
    add: `Ajouter une dette`,
    selectFriend: `Sélectionner`,
    lend: `Nouveau prêt`,
    borrow: `Nouvelle dette`,
    iLent: `Un ami me doit de l'argent`,
    iBorrowed: `Je dois de l'argent à un ami`,
    settleUpLower: `Régler`,
    amountToSettle: `Montant à régler`,
    total: `Total`,
    record: `Enregistrement`,
    records: `Enregistrements`,
    chooseCurrency: `Choisissez une devise`,
    
    createError: {
      amountTooLow: `Le montant doit être supérieur à 0 $`,
      amountTooHigh: `Le montant doit être inférieur à $ 1.000.000.000`,
      selfAsFriend: `Vous ne pouvez pas créer une dette avec vous-même, veuillez choisir un autre ami`,
      pending: `Merci de terminer votre transaction en cours avec cet utilisateur avant d'en créer une autre`,
      insufficientEth: E => `Vous devez avoir au moins ${E} ETH pour régler, allez dans Paramètres pour voir votre solde`,
    },
    fields: {
      currency: `Devise`,
      amount: `Montant`,
      settlementAmount: `Montant du règlement`,
      selectFriend: `Ami`,
      memo: `Mémo`,
      direction: `Sélectionnez la phrase correcte`,
    },
    memo: {
      example: `Entrez le mémo ici`,
    },
    direction: {
      lend: X => `${X} me doit`,
      borrow: X => `Je dois ${X}`,
      initiatedLend: X => `${X}, dit qu'il/elle me doit`,
      initiatedBorrow: X => `${X} indique qu'elle vous doit`,
      pendingLend: X => `@${X} vous doit` ,
      pendingBorrow: X => `Vous devez @${X}`,
      pendingLendSettlement: S => `@${S.debtorNickname} demande un règlement en ${S.settlementCurrency}`,
      pendingBorrowSettlement: S => `@${S.creditorNickname} veut régler avec vous en ${S.settlementCurrency}`,
      pendingLendSettlementMe: S => `Vous avez demandé à régler avec @${S.debtorNickname} en ${S.settlementCurrency}`,
      pendingBorrowSettlementMe: S => `Vous avez demandé que @${S.creditorNickname} règle en ${S.settlementCurrency}`,
    },
    pending: {
      success: F => `Dette en attente envoyée à @${F.nickname}`,
      error: generalCommunicationError
    },
    pendingParens: `(en attente)`,
    confirmation: {
      transaction: CP => `La ransaction avec ${CP} a été confirmée avec succès`,
      settlement: CP => `Le règlement avec ${CP} a été confirmé avec succès`,
      error: `Il est actuellement impossible de confirmer la transaction, veuillez réessayer plus tard.`,
    },
    rejection: {
      success: `La transaction a été rejetée`,
      error: `Il est actuellement impossible de rejeter la transaction, veuillez réessayer plus tard`,
    },
    balances: {
      error: `Il est actuellement impossible de charger les soldes, veuillez réessayer plus tard`,
    },
    for: M => `pour ${M}`,
    settleUp: `Régler`,
    settleTotal: `Régler le Total`,
    settleUpMemo: (D, A) => `${D === 'lend'? 'Régler pour': 'Demande de régler pour'} ${A} `,
    recordSettleUpMemo: `régler`,
  },
  settlementManagement: {
    bilateral: {
      error: {
        insufficient: X => `votre règlement avec ${X} a échoué en raison d'une insuffisance de fonds`,
        generic: X => `Il y a eu une erreur de traitement de votre règlement avec ${X}`,
      }
    },
    eth: `Régler avec de l'ETH`,
    nonPayment: `Enregistrement un règlement`,
  },

  accountViewLanguage: {
    lndr: `L n d r`,
    home: `Accueil`,
    friends: `Amis`,
    activity: `Activité`,
  },

  notifications: {
    toggleNotifications: `Gérer les notifications`,
    enable: `Activer`,
    disable: `Désactiver`,
  },

  pendingTransactionsLanguage: {
    shell: `En attente de la transaction`,
    title: `En attente`,
    memo: `Mémo :`,
    for: `Pour`,
    none: `Vous n'avez pas de transaction en attente`,
    confirmationQuestion: `Êtes-vous sûr de vouloir confirmer cette transaction?`,
    pendingAnnouncement: `Cette transaction est en attente de confirmation par l'autre partie.`,
    bilateral: `En attente du transfert Eth pour terminer`,
    confirm: `Confirmer`,
    reject: `Rejeter la transaction`,
    rejectRequest: `Rejeter`,
    cancel: `Annuler la transaction`,
    direction: {
      lend: (X, Z) => `@${X} vous doit ${Z}`,
      borrow: (X, Z) => `Vous devez @${X} ${Z}`,
    }
  },

  pendingSettlementsLanguage: {
    shell: `En attente du règlement`,
    title: `En attente`,
    none: `Vous n'avez pas de règlement en attente`,
    confirm: `Confirmer`,
    reject: `Rejeter le règlement`,
    cancel: `Annuler le règlement`,
  },

  recentTransactionsLanguage: {
    title: `Terminé`,
    none: `Vous avez pas de transaction terminée`,
    direction: {
      lend: (X, Z) => `@${X} vous doit ${Z}`,
      borrow: (X, Z) => `Vous devez @${X} ${Z}`
    },
    balance: `Solde complet :`,
    friends: FS => `(de ${FS} ${FS === 1 ? 'ami' :'amis'})`,
  },

  tabs: {
    home: `Accueil`,
    friends: `   Amis   `,
    activity: `Activité`,
  },

  confirmation: {
    shell: `Confirmation`,
    done: `Terminé`,
    create: {
      start: `Nous avons envoyé le dossier à `,
      end: ` pour confirmation.`,
    },
    confirm: {
      start: `Vous avez confirmé le dossier de `,
      end: `.`,
    },
    reject: {
      start: `Nous avons laissé savoir que `,
      end: `vous avez refusé cet enregistrement.`,
    },
    confirmFriend: {
      start: `Vous êtes maintenant ami avec `,
      end: `!`,
    },
    rejectFriend: {
      start: `Vous avez refusé la demande d'ami de `,
      end: `.`,
    },
    ethSent: {
      start: `Vous avez envoyé avec succès `,
      end: ` ETH et le hachage de votre transaction est `,
    },
    bcptSent: {
      start: `Vous avez envoyé avec succès `,
      end: ` BCPT et le hachage de votre transaction est `,
    },
    status: `Vous pouvez voir l'état de cette opération dans `,
    activity: `l'onglet d'activité.`,
  },

  pendingFriendRequestsLanguage: {
    shell: `Demande d'ami`,
    message: `Demandes d'ami`,
    request: F => `${F} veut être ami avec vous !`,
  },

  privacyPolicy: {
    link: `lndr.io/terms/`,
    message: `En cliquant ci-dessous vous confirmez que vous avez lu et accepté la politique de confidentialité de Blockmason. Blockmason peut utiliser votre adresse e-mail pour envoyer des mises à jour sur les Blockmason et LNDR. Voici un lien vers la politique de confidentialité:`
  }
}
