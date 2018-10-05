import { currencySymbols, transferLimits } from 'lndr/currencies'

const CUR = currencySymbols
const TL = transferLimits

const generalCommunicationError = 'Il y a eu un problème de communication avec le serveur, veuillez réessayer plus tard.'

export default {

  applicationName: `Lndr`,
  helloWorld: `Bonjour tout le monde,`,
  noConnection: `Pas de connection`,
  retry: `Recommencez`,
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
  lndrVerified: {
    ok: `D'accord`,
    title: `Définir la limite de règlement et des montants de retrait de Crypto en complétant connaître vos besoins clients.`,
    statusTitle: `L'état actuel de votre vérification est:`,
    tryAgain: `Nous avons pu vérifier votre identité. S'il vous plaît soumettre à nouveau vos informations et faire en sorte que vos photos soient lisibles.`,
    formMessage: `S'il vous plaît remplir tous les champs suivants`,
    button: `Vérifiez Votre Identité`,
    prefix: `Lisez notre `,
    linkTitle: `Politique de confidentialité `,
    postfix: `pour savoir comment vos données personnelles seront gérées.`,
    upload: `Ajouter une `,
    governmentId: `pièce d'identité officielle`,
    selfie: `Ajouter une selfie avec votre ID émise par le gouvernement`,
    proofOfAddress: `Un justificatif de domicile`,
    ifNotId: `(Sinon ID)`,
    agree: `Je l'ai lu et accepté la `,
    agreeLink: `politique de confidentialité`,
    success: `KYC a été soumise.`,
    idInfoHeader: `Des exemples de ID comprennent:`,
    passport: `Passeport`,
    drivers: `Permis de conduire`,
    national: `Carte d'identité`,
    addressInfoHeader: `Des exemples de preuve d'adresse:`,
    bank: `Relevé bancaire`,
    utility: `Facture d'électricité`,
    other: `autres documents`,
    chooseGovernmentPhoto: `Choisissez gouvernement d'identité avec photo`,
    chooseSelfiePhoto: `Choisissez selfie photo`,
    chooseAddressPhoto: `Choisissez Preuve d'adresse photo`,
    emailRequired: `Vous avez besoin d'un e-mail pour vérifier votre identité, s'il vous plaît cliquer sur "Changer l'adresse e-mail"`,
    approved: `APPROUVÉ`,
    rejected: `REJETÉ`,
    pending: `En attente`,
    error: generalCommunicationError,
    formFields: {
      firstName: `Prénom`,
      lastName: `Nom de famille`,
      street: `Adresse de rue`,
      city: `Ville`,
      state: `État / Province`,
      postalCode: `code postal`,
      country: `Choisissez le pays`,
      phone: `Numéro de téléphone`,
      dob: `Date de naissance (AAAA-MM-JJ)`,
    },
    formErrors: {
      firstName: `Le prénom est requis`,
      lastName: `Le nom est requis`,
      street: `Street est nécessaire`,
      city: `La ville est requise`,
      state: `État / Province est nécessaire`,
      postalCode: `Code postal est requis`,
      country: `Pays est nécessaire`,
      phone: `Numéro de téléphone est nécessaire`,
      dob: `Date de naissance est requis`,
      general: `faites s'il vous plaît que vous avez rempli tous les champs et attachés photos correctes`,
    }
  },
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
      getError: `Impossible de récupérer votre solde en ETH`,
      manage: `Gérer vos ETH`,
    },
    sendEth: {
      error: {
        insufficient: `Vous n'avez pas assez de ETH pour cette transaction`,
        generic: `Il y a eu une erreur lors du transfert, merci de réessayer plus tard.`,
        address: `Merci d'entrer une adresse valide`,
        amount: `Merci d'entrer un montant supérieur à 0`,
        limitExceeded: (A, M) => `Vous ne pouvez envoyer que ${CUR(A)} ${TL(A, M)} par semaine, merci de sélectionner un montant inférieur`,
      },
      amount: `Montant à envoyer`,
      address: `Adresse de destination (sans préfixe '0x')`,
      transfer: `Transférer de l'ETH`,
      transferAll: `Tout transférer`,
      balance: Y => `Votre solde en ETH est de ${typeof Y === 'string'? Y.slice (0,8): ''} `,
      ethAddress: `Adresse Ethereum`,
      txCost: (B, A) => `Le coût actuel de la transaction est de ${CUR(A)} ${B}`,
      transferLowercase: `Transférer de l'ETH`,
      note: (A, M) => `Merci de noter que vous ne pouvez transférer que ${CUR(A)} ${TL(A, M)} par semaine sur Lndr`,
      warning: (Z, A, M) => `Vous avez ${CUR(A)} ${Z} restants sur votre limite de ${CUR(A)} ${TL(A, M)} `,
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
    panelHeaders: [
      `Adresse ETH (& BCPT)`,
      `Solde ETH`,
      `Solde BCPT`,
      `Supprimer le compte`,
      `Historique des transactions en ETH`,
      `Activer PayPal`,
      `Changer la devise primaire`,
      `Caractéristiques supplémentaires Déverrouillez`,
      `Changer l'adresse e-mail`,
      `Modifier le code PIN`,
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
    logoutError: generalCommunicationError,
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

  walkthrough: {
    skip: `sauter`,
    continue: `continuer`,
    step1: {
      easyToUse: `Lndr est la meilleure façon de diviser les factures, les frais d'actions et régler les dettes simples avec des amis et la famille, tout se fait en toute sécurité sur le blockchain.`,
      len: `Len`,
      der: `der`,
    },
    step2: {
      getStarted: `Pour commencer à utiliser Lndr, vous devrez ajouter un ami.`,
      friendsScreen: `Visitez l'écran Amis pour rechercher, ajouter ou inviter vos amis et votre famille de se connecter sur Lndr.`,
    },
    step3: {
      title: `Enregistrement d'une transaction`,
      easy: `Fractionnement un projet de loi ou l'ajout d'une dette avec un ami est facile à Lndr!`,
      selectFriend: `Sélectionnez votre ami, votre monnaie et le montant.`,
      addMemo: `Ajoutez quelques notes dans la zone de mémo et cliquez sur Envoyer.`,
    },
    step4: {
      title: `Régler`,
      ready: `Prêt à régler?`,
      payPal: `Quand il est temps de régler avec Lndr, \n vous pouvez choisir PayPal:`,
      ether: `- cryptocurrencies comme l'éther:`,
      cash: `- ou simplement enregistrer un règlement en espèces:`,
      positiveBalance: `10,46`,
    },
    step5: {
      title: `Multi-devise`,
      multiCurrency: `Lndr peut garder une trace de vos transactions, même si elles se produisent dans des devises différentes.`,
      exchangeRate: `Lorsque vous décidez de régler avec votre ami, toutes les transactions seront converties en votre monnaie primaire en utilisant le plus les taux de change mis à jour disponibles.`,
      start: `Commencez à utiliser Lndr!`,
    }
  },

  debtManagement: {
    shell: `Nouvelle transaction`,
    add: `Ajouter une dette`,
    selectFriend: `Sélectionner`,
    lend: `Nouveau prêt`,
    borrow: `Nouvelle dette`,
    owesMe: `Il me doit`,
    iOwe: `Je dois`,
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
    settleUpMemo: (D, A) => `${D === 'lend' ? 'Régler pour': 'Demande de régler pour'} ${A} `,
    recordSettleUpMemo: `régler`,
    balanceByCurrency: `Détails`,
  },
  settlementManagement: {
    bilateral: {
      error: {
        insufficient: X => `votre règlement avec ${X} a échoué en raison d'une insuffisance de fonds`,
        generic: X => `Il y a eu une erreur de traitement de votre règlement avec ${X}`,
      }
    },
    eth: `Régler avec de l'ETH`,
    paypal: `Régler avec de PayPal`,
    nonPayment: `Enregistrement un règlement`,
    select: `Sélectionner le type de règlement`,
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
    consolidatedBalance: `Solde complet :`,
    friends: FS => `(de ${FS} ${FS === 1 ? 'ami' :'amis'})`,
  },

  tabs: {
    home: `Accueil `,
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
    rejectOutboundFriendRequest: {
      start: `Vous avez annulé la demande d'ami à `,
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
    requestPayPalPayee: {
      start: `Nous avons laissé `,
      end: ` savoir que vous souhaitez régler avec PayPal.`,
    },
    requestPayPalPayment: {
      start: `Nous avons laissé `,
      end: ` savoir que vous souhaitez payer avec PayPal.`,
    },
    settledWithPayPal: {
      start: `Nous avons laissé `,
      end: ` savoir que vous avez réglé avec PayPal.`,
    },
    kycSuccess: {
      start: `Je vous remercie! Votre compte est en cours de vérification.  
      
      `,
      end: `Vous serez averti lorsque vos fonctions supplémentaires sont déverrouillées.` 
    },
    status: `Vous pouvez voir l'état de cette opération dans `,
    activity: `l'onglet d'activité.`,
  },

  pendingFriendRequestsLanguage: {
    shell: `Demande d'ami`,
    message: `Demandes d'ami`,
    request: F => `@${F} veut être ami avec vous !`,
    outbound: F => `Vous a envoyé une demande d'ami à @${F}`,
  },

  privacyPolicy: {
    link: `blockmason.io/lndr/terms/`,
    message: `En cliquant ci-dessous vous confirmez que vous avez lu et accepté la politique de confidentialité de Blockmason. Blockmason peut utiliser votre adresse e-mail pour envoyer des mises à jour sur les Blockmason et LNDR. Voici un lien vers la politique de confidentialité:`,
  },

  payPalLanguage: {
    connectPayPal: `Se connecter PayPal`,
    connectSuccess: `PayPal a permis avec succès.`,
    disconnectPayPal: `Déconnecter PayPal`,
    disconnected: `PayPal déconnecté.`,
    requestPayPalPayment: `Demande de paiement PayPal`,
    sendWithPayPal: `Envoyer avec PayPal`,
    enablePayPal: `Activer PayPal`,
    requestPayPalPayee: `Demande PayPal`,
    enablePayPalForFriend: F => `Activation PayPal permet @${F} pour vous payer`,
    friendNotEnabled: F => `@${F} n'a pas activé PayPal paiements.`,
    friendRequestedConnect: F => `@${F} veut vous payer par PayPal`,
    requestFriendConnect: F => `Vous avez demandé @${F} pour permettre PayPal`,
    feesNotification: `Ne comprend pas les frais de PayPal`,
    feesInformationHeader: `Informations sur les frais PayPal`,
    feesInformation: `1. Votre compte PayPal doit être liée à un compte bancaire.
    
2. Payer dans une devise différente de la monnaie de votre banque entraînera des frais de 0,35 $.
    
3. Frais de transfert international:
    États-Unis au Canada / Europe: 2,99 $
    Etats nulle part ailleurs: 4,99 $
    
4. Ces frais ne sont pas exhaustives. Pour les informations les plus à jour s'il vous plaît visitez:

    https://www.paypal.com/us/webapps/mpp/paypal-fees#sending-us`,
    payPalSite: `PayPal.com`,
  },

  countries: [
    { name: `Afghanistan`, code: 'AFG' },
    { name: `Albanie`, code: 'ALB' },
    { name: `Algérie`, code: 'DZA' },
    { name: `Andorre`, code: 'AND' },
    { name: `Angola`, code: 'AGO' },
    { name: `Anguilla`, code: 'AIA' },
    { name: `Antarctique`, code: 'ATA' },
    { name: `Antigua-et-Barbuda`, code: 'ATG' },
    { name: `Argentine`, code: 'ARG' },
    { name: `Arménie`, code: 'ARM' },
    { name: `Aruba`, code: 'ABW' },
    { name: `Australie`, code: 'AUS' },
    { name: `L'Autriche`, code: 'AUT' },
    { name: `Azerbaïdjan`, code: 'AZE' },
    { name: `Bahamas`, code: 'BHS' },
    { name: `Bahreïn`, code: 'BHR' },
    { name: `Bangladesh`, code: 'BGD' },
    { name: `Barbade`, code: 'BRB' },
    { name: `Biélorussie`, code: 'BLR' },
    { name: `Belgique`, code: 'BEL' },
    { name: `Belize`, code: 'BLZ' },
    { name: `Bénin`, code: 'BEN' },
    { name: `Bermudes`, code: 'BMU' },
    { name: `Bhoutan`, code: 'BTN' },
    { name: `Bolivie`, code: 'BOL' },
    { name: `Bosnie Herzégovine`, code: 'BIH' },
    { name: `Botswana`, code: 'BWA' },
    { name: `Brésil`, code: 'BRA' },
    { name: `Brunei`, code: 'BRN' },
    { name: `Bulgarie`, code: 'BGR' },
    { name: `Burkina Faso`, code: 'BFA' },
    { name: `Burundi`, code: 'BDI' },
    { name: `Cabo Verde`, code: 'CPV' },
    { name: `Cambodge`, code: 'KHM' },
    { name: `Cameroun`, code: 'CMR' },
    { name: `Canada`, code: 'CAN' },
    { name: `Îles Caïmans`, code: 'CYM' },
    { name: `République centrafricaine`, code: 'CAF' },
    { name: `Tchad`, code: 'TCD' },
    { name: `Chili`, code: 'CHL' },
    { name: `Chine`, code: 'CHN' },
    { name: `Colombie`, code: 'COL' },
    { name: `Comores`, code: 'COM' },
    { name: `Congo`, code: 'COG' },
    { name: `Congo`, code: 'COD' },
    { name: `les Îles Cook`, code: 'COK' },
    { name: `Costa Rica`, code: 'CRI' },
    { name: `Côte d'Ivoire`, code: 'CIV' },
    { name: `Croatie`, code: 'HRV' },
    { name: `Cuba`, code: 'CUB' },
    { name: `Curacao`, code: 'CUW' },
    { name: `Chypre`, code: 'CYP' },
    { name: `czechia`, code: 'CZE' },
    { name: `Danemark`, code: 'DNK' },
    { name: `Djibouti`, code: 'DJI' },
    { name: `Dominique`, code: 'DMA' },
    { name: `République Dominicaine`, code: 'DOM' },
    { name: `Equateur`, code: 'ECU' },
    { name: `Egypte`, code: 'EGY' },
    { name: `Le Salvador`, code: 'SLV' },
    { name: `Guinée Équatoriale`, code: 'GNQ' },
    { name: `Érythrée`, code: 'ERI' },
    { name: `Estonie`, code: 'EST' },
    { name: `Eswatini`, code: 'SWZ' },
    { name: `Ethiopie`, code: 'ETH' },
    { name: `Fidji`, code: 'FJI' },
    { name: `Finlande`, code: 'FIN' },
    { name: `France`, code: 'FRA' },
    { name: `Guinée Française`, code: 'GUF' },
    { name: `Polynésie française`, code: 'PYF' },
    { name: `Gabon`, code: 'GAB' },
    { name: `Gambie`, code: 'GMB' },
    { name: `Géorgie`, code: 'GEO' },
    { name: `Allemagne`, code: 'DEU' },
    { name: `Ghana`, code: 'GHA' },
    { name: `Gibraltar`, code: 'GIB' },
    { name: `Grèce`, code: 'GRC' },
    { name: `Groenland`, code: 'GRL' },
    { name: `Grenade`, code: 'GRD' },
    { name: `Guadeloupe`, code: 'GLP' },
    { name: `Guam`, code: 'GUM' },
    { name: `Guatemala`, code: 'GTM' },
    { name: `Guinée`, code: 'GIN' },
    { name: `Guinée-Bissau`, code: 'GNB' },
    { name: `Guyane`, code: 'GUY' },
    { name: `Haïti`, code: 'HTI' },
    { name: `Vatican`, code: 'VAT' },
    { name: `Honduras`, code: 'HND' },
    { name: `Hong Kong`, code: 'HKG' },
    { name: `Hongrie`, code: 'HUN' },
    { name: `Islande`, code: 'ISL' },
    { name: `Inde`, code: 'IND' },
    { name: `Indonésie`, code: 'IDN' },
    { name: `Iran`, code: 'IRN' },
    { name: `Irak`, code: 'IRQ' },
    { name: `Irlande`, code: 'IRL' },
    { name: `Isle of Man`, code: 'IMN' },
    { name: `Israël`, code: 'ISR' },
    { name: `Italie`, code: 'ITA' },
    { name: `Jamaïque`, code: 'JAM' },
    { name: `Japon`, code: 'JPN' },
    { name: `Jordan`, code: 'JOR' },
    { name: `Kazakhstan`, code: 'KAZ' },
    { name: `Kenya`, code: 'KEN' },
    { name: `Kiribati`, code: 'KIR' },
    { name: `Corée (RPDC)`, code: 'PRK' },
    { name: `Corée (ROK)`, code: 'KOR' },
    { name: `Koweit`, code: 'KWT' },
    { name: `Kirghizistan`, code: 'KGZ' },
    { name: `Laos`, code: 'LAO' },
    { name: `Lettonie`, code: 'LVA' },
    { name: `Liban`, code: 'LBN' },
    { name: `Lesotho`, code: 'LSO' },
    { name: `Libéria`, code: 'LBR' },
    { name: `Libye`, code: 'LBY' },
    { name: `Liechtenstein`, code: 'LIE' },
    { name: `Lituanie`, code: 'LTU' },
    { name: `Luxembourg`, code: 'LUX' },
    { name: `Macao`, code: 'MAC' },
    { name: `Macédoine`, code: 'MKD' },
    { name: `Madagascar`, code: 'MDG' },
    { name: `Malawi`, code: 'MWI' },
    { name: `Malaisie`, code: 'MYS' },
    { name: `Maldives`, code: 'MDV' },
    { name: `Mali`, code: 'MLI' },
    { name: `Malte`, code: 'MLT' },
    { name: `Iles Marshall`, code: 'MHL' },
    { name: `Martinique`, code: 'MTQ' },
    { name: `Mauritanie`, code: 'MRT' },
    { name: `Ile Maurice`, code: 'MUS' },
    { name: `Mexique`, code: 'MEX' },
    { name: `Micronésie`, code: 'FSM' },
    { name: `Moldavie`, code: 'MDA' },
    { name: `Monaco`, code: 'MCO' },
    { name: `Mongolie`, code: 'MNG' },
    { name: `Monténégro`, code: 'MNE' },
    { name: `Montserrat`, code: 'MSR' },
    { name: `Maroc`, code: 'MAR' },
    { name: `Mozambique`, code: 'MOZ' },
    { name: `Myanmar`, code: 'MMR' },
    { name: `Namibie`, code: 'NAM' },
    { name: `Nauru`, code: 'NRU' },
    { name: `Népal`, code: 'NPL' },
    { name: `Pays-Bas`, code: 'NLD' },
    { name: `Nouvelle Calédonie`, code: 'NCL' },
    { name: `Nouvelle-Zélande`, code: 'NZL' },
    { name: `Nicaragua`, code: 'NIC' },
    { name: `Niger`, code: 'NER' },
    { name: `Nigeria`, code: 'NGA' },
    { name: `Niue`, code: 'NIU' },
    { name: `Îles Mariannes du Nord`, code: 'MNP' },
    { name: `Norvège`, code: 'NOR' },
    { name: `Oman`, code: 'OMN' },
    { name: `Pakistan`, code: 'PAK' },
    { name: `Palau`, code: 'PLW' },
    { name: `Palestine`, code: 'PSE' },
    { name: `Panama`, code: 'PAN' },
    { name: `Papouasie Nouvelle Guinée`, code: 'PNG' },
    { name: `Paraguay`, code: 'PRY' },
    { name: `Pérou`, code: 'PER' },
    { name: `Philippines`, code: 'PHL' },
    { name: `Pitcairn`, code: 'PCN' },
    { name: `Pologne`, code: 'POL' },
    { name: `le Portugal`, code: 'PRT' },
    { name: `Porto Rico`, code: 'PRI' },
    { name: `Qatar`, code: 'QAT' },
    { name: `Réunion`, code: 'REU' },
    { name: `Roumanie`, code: 'ROU' },
    { name: `Fédération Russe`, code: 'RUS' },
    { name: `Rwanda`, code: 'RWA' },
    { name: `Saint Barthélemy`, code: 'BLM' },
    { name: `Sainte-Hélène, Ascension et Tristan da Cunha`, code: 'SHN' },
    { name: `Saint-Christophe-et-Niévès`, code: 'KNA' },
    { name: `Sainte-Lucie`, code: 'LCA' },
    { name: `Saint Martin`, code: 'MAF' },
    { name: `Saint-Pierre-et-Miquelon`, code: 'SPM' },
    { name: `Saint-Vincent-et-les-Grenadines`, code: 'VCT' },
    { name: `Samoa`, code: 'WSM' },
    { name: `Saint Marin`, code: 'SMR' },
    { name: `Sao Tomé-et-Principe`, code: 'STP' },
    { name: `Arabie Saoudite`, code: 'SAU' },
    { name: `Sénégal`, code: 'SEN' },
    { name: `Serbie`, code: 'SRB' },
    { name: `les Seychelles`, code: 'SYC' },
    { name: `Sierra Leone`, code: 'SLE' },
    { name: `Singapour`, code: 'SGP' },
    { name: `Sint Maarten`, code: 'SXM' },
    { name: `Slovaquie`, code: 'SVK' },
    { name: `Slovénie`, code: 'SVN' },
    { name: `Les îles Salomon`, code: 'SLB' },
    { name: `Somalie`, code: 'SOM' },
    { name: `Afrique du Sud`, code: 'ZAF' },
    { name: `Soudan du sud`, code: 'SSD' },
    { name: `Espagne`, code: 'ESP' },
    { name: `Sri Lanka`, code: 'LKA' },
    { name: `Soudan`, code: 'SDN' },
    { name: `Suriname`, code: 'SUR' },
    { name: `Suède`, code: 'SWE' },
    { name: `Suisse`, code: 'CHE' },
    { name: `République arabe syrienne`, code: 'SYR' },
    { name: `Taïwan`, code: 'TWN' },
    { name: `Tadjikistan`, code: 'TJK' },
    { name: `Tanzanie`, code: 'TZA' },
    { name: `Thaïlande`, code: 'THA' },
    { name: `Timor-Leste`, code: 'TLS' },
    { name: `Aller`, code: 'TGO' },
    { name: `Tokelau`, code: 'TKL' },
    { name: `Tonga`, code: 'TON' },
    { name: `Trinité-et-Tobago`, code: 'TTO' },
    { name: `Tunisie`, code: 'TUN' },
    { name: `dinde`, code: 'TUR' },
    { name: `Turkménistan`, code: 'TKM' },
    { name: `îles Turques-et-Caïques`, code: 'TCA' },
    { name: `Tuvalu`, code: 'TUV' },
    { name: `Ouganda`, code: 'UGA' },
    { name: `Ukraine`, code: 'UKR' },
    { name: `Emirats Arabes Unis`, code: 'ARE' },
    { name: `Royaume-Uni`, code: 'GBR' },
    { name: `les États-Unis d'Amérique`, code: 'USA' },
    { name: `Îles mineures éloignées des États-Unis`, code: 'UMI' },
    { name: `Uruguay`, code: 'URY' },
    { name: `Ouzbékistan`, code: 'UZB' },
    { name: `Vanuatu`, code: 'VUT' },
    { name: `Venezuela`, code: 'VEN' },
    { name: `Viet Nam`, code: 'VNM' },
    { name: `Îles Vierges britanniques`, code: 'VGB' },
    { name: `Îles Vierges américaines`, code: 'VIR' },
    { name: `Sahara occidental`, code: 'ESH' },
    { name: `Yémen`, code: 'YEM' },
    { name: `Zambie`, code: 'ZMB' },
    { name: `Zimbabwe`, code: 'ZWE' },
  ]
}
