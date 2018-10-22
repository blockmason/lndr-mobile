import React, { Component } from 'react'
import { Text, TextInput, View, Dimensions, ScrollView, Linking, Modal, Switch,
  TouchableHighlight, Image, KeyboardAvoidingView, Platform, NativeModules, Alert } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import Icon from 'react-native-vector-icons/Ionicons'
import firebase from 'react-native-firebase'

import Button from 'ui/components/button'
import Pinpad from 'ui/components/pinpad'
import DashboardShell from 'ui/components/dashboard-shell'
import Loading, { LoadingContext } from 'ui/components/loading'
import InputImage from 'ui/components/images/input-image'
import SpinningPicker from 'ui/components/spinning-picker'

import { ERC20_Tokens } from 'lndr/erc-20'
import { formatNick, formatLockTimeout, formatEmail, emailFormatIncorrect, formatCommaDecimal } from 'lndr/format'
import { UpdateAccountData, UserData } from 'lndr/user'

import { updateNickname, updateEmail, logoutAccount, toggleNotifications, getAccountInformation,
  setEthBalance, updateLockTimeout, updatePin, getProfilePic, setProfilePic, takenNick, takenEmail,
  copyToClipboard, validatePin, setPrimaryCurrency, failedValidatePin, getVerificationStatus } from 'actions'
import { getUser, getStore, getAllUcacCurrencies, getPrimaryCurrency, getTransferLimitLevel } from 'reducers/app'
import { getResetAction } from 'reducers/nav'
import { connect } from 'react-redux'
import { ToastActionsCreators } from 'react-native-redux-toast'

import { palsClient } from 'credit-protocol/pals-client'

import style from 'theme/form'
import general from 'theme/general'
import { underlayColor } from 'theme/general'
import popupStyle from 'theme/popup'
import pendingStyle from 'theme/pending'

import language from 'language'
const { nickname, setNickname, email, setEmail, copy, accountManagement, changePin, enterNewPin, confirmPin, pleaseWait,
  mnemonicExhortation, addressExhortation, logoutAction, notifications, currentBalance, showMnemonic, enterCurrentPin,
  myAccount, debtManagement, removeAccount, payPalLanguage, cancel, confirmAccount, lndrVerified
} = language
const updateAccountText = language.updateAccount

const loadingContext = new LoadingContext()
const loadingPayPal = new LoadingContext()

const { height } = Dimensions.get('window');

let unmounting = false

interface Props {
  navigation: any
  user: UserData
  state: any
  allCurrencies: any
  primaryCurrency: string
  logoutAccount: () => any
  getAccountInformation: () => any
  updateNickname: (accountData: UpdateAccountData) => any
  updateEmail: (accountData: UpdateAccountData) => any
  toggleNotifications: () => any
  setEthBalance: () => any
  updateLockTimeout: (timeout: number) => any
  updatePin: (password: string, confirmPassword: string) => any
  getProfilePic: (nickname: string) => any
  setProfilePic: (imageURI: string, imageData: string) => any
  copyToClipboard: (text: string) => any
  setPrimaryCurrency: (value: string) => any
  failedValidatePin: () => void
  getVerificationStatus: () => void
  transferLimitLevel: () => string
}

interface State {
  nickname: string
  email: string
  password: string
  confirmPassword: string
  lockTimeout: string
  hiddenPanels: any
  step: number
  photos: any
  authenticated: boolean
  currency: string
  scrollY: number
  nickTextInputErrorText?: string
  emailTextInputErrorText?: string
  shouldPickCurrency: boolean
  payPalEmail: any // the user's PayPal id (email)
  showNicknameInput: boolean
  cryptoBalances: any
}

class MyAccount extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      nickname: props.user.nickname,
      email: props.user.email,
      password: '',
      confirmPassword: '',
      lockTimeout: '',
      hiddenPanels: accountManagement.panelHeaders.map( () => true),
      step: 1,
      photos: [],
      authenticated: false,
      currency: props.primaryCurrency,
      scrollY: 0,
      shouldPickCurrency: false,
      payPalEmail: null,
      showNicknameInput: false,
      cryptoBalances: {}
    }

    this.submitNickname = this.submitNickname.bind(this)
  }

  async componentWillMount() {
    const { address } = this.props.user
    this.props.setEthBalance()
    this.props.getProfilePic(address)
    this.props.getAccountInformation()
    this.props.getVerificationStatus()

    // init PayPal and check if user is connected
    await NativeModules.PayPalManager.initPayPal()
    if (this.state.payPalEmail == null) {
      const payPalEmail = await palsClient.getPayPalAccount(this.props.user)
      this.setState({payPalEmail: payPalEmail})
    }

    // note: we're relying on the Http cache for caching here
    const cryptoBalances = {}
    ERC20_Tokens.forEach( (token) => {
      token.getBalance(address).then( (balance) => {
        cryptoBalances[token.tokenName] = balance
      })
    })
    this.setState({cryptoBalances: cryptoBalances})
  }

  componentDidMount( ) {
    firebase.analytics().setCurrentScreen('my-account', 'MyAccount');
  }

  componentWillUnmount() {
    unmounting = true
  }

  handleOnCancel() {
    this.props.navigation.goBack()
  }

  async setLockTimeout() {
    const { lockTimeout } = this.state
    await this.props.updateLockTimeout(Number(lockTimeout))
    this.setState({ lockTimeout: '' })
  }

  async componentDidUpdate() {
    const { password, confirmPassword, step, scrollY } = this.state

    if (step === 4 && confirmPassword.length === 4 ) {
      const authenticated = await loadingContext.wrap(validatePin(confirmPassword))

      const self = this as any
      if(!authenticated) {
        this.props.failedValidatePin()
      }
      setTimeout( () => self.refs.scrollContent.scrollTo({ x: 0, y: scrollY, animated: true }), 200)
      this.setState({ step: 1, confirmPassword: '', authenticated })
    } else if (step === 3 && password.length === 4 && confirmPassword.length === 4) {
      this.setState({ step: 5 })
    } else if (password.length === 4 && step === 2) {
      this.setState({ step: 3 })
    } else if (step === 5) {
      const self = this
      setTimeout(async function() {
        await loadingContext.wrap(self.props.updatePin(password, confirmPassword))
        self.clearPinView()
      }, 1000)
    }
  }

  clearPinView() {
    this.setState({ password: '', confirmPassword: '', step: 1 })
  }

  enterPin(num: string) {
    const { password } = this.state
    const fullPin = password + num
    this.setState({ password: fullPin })
  }

  confirmPin(num: string) {
    const { confirmPassword } = this.state
    const fullPin = confirmPassword + num
    this.setState({ confirmPassword: fullPin })
  }

  clearPin() {
    const { password } = this.state
    this.setState({ password: password.slice(0, -1) })
  }

  clearConfirmPin() {
    const { confirmPassword } = this.state
    this.setState({ confirmPassword: confirmPassword.slice(0, -1) })
  }

  togglePanel(index: number) {
    const { hiddenPanels, scrollY } = this.state
    const panelHeights = [150, 250, 60, 60, 60, 60, 140, 60, 190, 180, 60, 120]
    const y = panelHeights[index]

    hiddenPanels[index] = !hiddenPanels[index]
    const scrollContent = this.refs.scrollContent as any
    setTimeout( () => scrollContent.scrollTo({ x: 0, y: scrollY + (hiddenPanels[index] ? -y : y), animated: true }), 100)
    this.setState({ hiddenPanels })
  }

  async getPhoto() {
    var options = {
      title: accountManagement.profilePic.change,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    }

    try {
      ImagePicker.showImagePicker(options, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker')
        }
        else if (response.error) {
          console.log('ImagePicker Error: ', response.error)
        }
        else {
          const { uri, data } =  response
          this.setNewProfilePic(uri, data)
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  async setNewProfilePic(imageURI: string, imageData: string) {
    loadingContext.wrap( this.props.setProfilePic(imageURI, imageData) )
  }

  async onNickTextInputBlur(nickname: string) {
    const duplicateNick = await takenNick(nickname)
    if (duplicateNick) {
      this.setState({ nickTextInputErrorText: accountManagement.nickname.duplicationViolation })
    } else {
      this.setState({ nickTextInputErrorText: '' })
    }
  }

  async onEmailTextInputBlur(email: string) {
    if (emailFormatIncorrect(email)) {
      this.setState({ emailTextInputErrorText: accountManagement.email.compositionViolation})
    } else {
      const duplicateEmail = await takenEmail(email)

      if (duplicateEmail) {
        this.setState({ emailTextInputErrorText: accountManagement.email.duplicationViolation })
      } else {
        this.setState({ emailTextInputErrorText: '' })
      }
    }
  }

  async connectPayPal() {
    try {
      const authToken = await loadingPayPal.wrap(NativeModules.PayPalManager.connectPayPal())
      if (authToken) {
        // send response to server
        await loadingPayPal.wrap(palsClient.createPayPalAccount(this.props.user, authToken))
        const payPalEmail = await loadingPayPal.wrap(palsClient.getPayPalAccount(this.props.user))
        this.setState({payPalEmail: payPalEmail})
        if (payPalEmail)
          this.props.navigation.dispatch(ToastActionsCreators.displayInfo(payPalLanguage.connectSuccess));
      } else {
        this.setState({payPalEmail: null})
      }
    } catch (e) {
      console.log('USER CANCELLED PAYPAL CONNECTION: ', e)
    }
  }

  confirmDisconnectPayPal() {
      Alert.alert(
        payPalLanguage.disconnectPayPal,
        "",
        [
          {text: cancel.toUpperCase(), onPress: () => null, style: 'destructive'},
          {text: confirmAccount.toUpperCase(), onPress: () => this.disconnectPayPal()},
        ],
        { cancelable: true }
      )
  }

  async disconnectPayPal() {
    try {
      await loadingPayPal.wrap(palsClient.deletePayPalAccount(this.props.user))
      this.setState({payPalEmail: null})
      this.props.navigation.dispatch(ToastActionsCreators.displayInfo(payPalLanguage.disconnected));
    } catch (e) {
      console.log('USER CANCELLED PAYPAL DISCONNECTION: ', e)
    }
  }

  logout() {
    this.props.navigation.dispatch( getResetAction({ routeName: 'Dashboard' }) )
    this.props.logoutAccount()
  }

  handleScroll(event) {
    this.setState({ scrollY: event.nativeEvent.contentOffset.y });
  }

  async handlePickerDone(currency: string) {
    await this.props.setPrimaryCurrency(currency)
    this.setState({currency, shouldPickCurrency: false})
  }

  _keyExtractor = (_item, index) => index

  renderPayPalContent() {
    return (this.state.payPalEmail) ? (
      <View style={[general.flexRow, style.spaceTopS, style.spaceBottomS, style.spaceHorizontalBig]}>
        <Image source={require('images/PayPalLogo.png')} style={{marginRight: 20}} />
        <Switch value={true} onValueChange={() => this.confirmDisconnectPayPal()} />
      </View>
    ) : (
      <View style={[style.spaceTopS, style.spaceBottomS, style.spaceHorizontalL]}>
        <Loading context={loadingPayPal} />
        <Button zicon="paypal" round text={payPalLanguage.connectPayPal} onPress={() => this.connectPayPal()} />
      </View>)
  }

  async submitNickname() {
    await loadingContext.wrap(this.props.updateNickname(this.state))
  }

  renderVerify() {
    const { identityVerificationStatus } = this.props.state
    const hasStatus = !identityVerificationStatus.status && identityVerificationStatus.sumsubId

    let statusText = ''
    let imageSource = require('images/hourglass.png')
    if (identityVerificationStatus.status === 'GREEN') {
      statusText = lndrVerified.approved
      imageSource = require('images/check-circle.png')
    } else if (identityVerificationStatus.status === 'RED') {
      statusText = lndrVerified.rejected
      imageSource = require('images/thumbs-down.png')
    } else if (hasStatus) {
      statusText = lndrVerified.pending
    }

    const statusSection = (<View style={general.centeredColumn}>
      <Text style={[style.title, identityVerificationStatus.status === 'RED' ? style.redAmount : style.greenAmount]}>{statusText}</Text>
      {!!hasStatus && <Image source={imageSource} style={[{height: 50, width: 50}, general.smallTopMargin]} />}
    </View>)

    const showButtonOrEmail = identityVerificationStatus.status === 'RED' || (!identityVerificationStatus.status && !identityVerificationStatus.sumsubId)

    const centerMessage = this.props.user.email ?
      <Button round onPress={() => {this.props.navigation.navigate('VerifyIdentityForm')}} text={lndrVerified.button} containerStyle={style.spaceTop} /> :
      <Text style={[style.smallText, style.spaceTop]}>{lndrVerified.emailRequired}</Text>

    return (
      //TODO: add pending logic
      <View style={[general.centeredColumn, style.spaceHorizontalL]}>
        <Text style={[style.smallText, style.spaceTop]}>{identityVerificationStatus.sumsubId ? lndrVerified.statusTitle : lndrVerified.title}</Text>
        {statusSection}
        {!!showButtonOrEmail && centerMessage}
        {identityVerificationStatus.status === 'RED' && <Text style={[style.smallText, style.spaceTop]}>{lndrVerified.tryAgain}</Text>}
        <Text style={[style.smallText, style.spaceTop, general.spaceBelowM]}>{lndrVerified.prefix} <Text style={[style.link]} onPress={() => Linking.openURL('https://blockmason.io/lndr/terms/')}>{lndrVerified.linkTitle}</Text>{lndrVerified.postfix}</Text>
      </View>
    )
  }

  renderCryptoBalancesSubpanel() {
    const { ethBalance } = this.props.state
    const { cryptoBalances } = this.state

    const cryptoSubpanels = ERC20_Tokens.map( (token, index) => {
      const cryptoBalance = cryptoBalances[token.tokenName] === undefined ? "0.0" : cryptoBalances[token.tokenName]
      return (
        <View style={style.spaceHorizontalL} key={`cryptosub-${index}`}>
          <Text style={[style.text, style.spaceTopL, style.center]}>{currentBalance(token.tokenName)}</Text>
          <Text selectable style={style.displayText}>{cryptoBalance}</Text>
          <Button disabled={Number(cryptoBalance) <= 0} round onPress={() => this.props.navigation.navigate('TransferERC20', { token })} text={accountManagement.sendERC20.transfer(token.tokenName)} />
        </View>
      )
    })

    return (
      <View>
        <View style={style.spaceHorizontalL}>
          <Text style={[style.text, style.spaceTopL, style.center]}>{currentBalance('Eth')}</Text>
          <Text selectable style={style.displayText}>{formatCommaDecimal(ethBalance)}</Text>
          <Button disabled={Number(ethBalance) <= 0} round onPress={() => this.props.navigation.navigate('TransferEth')} text={accountManagement.sendEth.transfer} />
        </View>
        {cryptoSubpanels}
      </View>
    )
  }
  renderPanels() {
    const { user, updateEmail, copyToClipboard, transferLimitLevel } = this.props
    const { notificationsEnabled, ethBalance } = this.props.state
    const { lockTimeout, hiddenPanels, emailTextInputErrorText, authenticated, currency } = this.state

    const submitEmail = async () => {
      await loadingContext.wrap(updateEmail(this.state))
    }

    const hexAddress = `0x${user.address}`
    const panelContent = [
      (<View style={style.spaceHorizontalL}>
        <Text style={[style.text, style.spaceTopL, style.center]}>{addressExhortation}</Text>
        <Text style={[style.smallText, style.spaceTop, style.center]}>{accountManagement.sendEth.note(currency, transferLimitLevel())}</Text>
        <Text selectable style={style.displayText}>{hexAddress}</Text>
        <Button round onPress={() => copyToClipboard(hexAddress)} text={copy} />
      </View>),
      (<View>
        {this.renderCryptoBalancesSubpanel()}
      </View>),
      (<View style={style.spaceHorizontalL}>
        <Button round onPress={() => this.props.navigation.navigate('RemoveAccount')} text={removeAccount} />
      </View>),
      (<View style={style.spaceHorizontalL}>
        <Button round onPress={() => Linking.openURL(`https://etherscan.io/address/${user.address}`)} text={accountManagement.viewEtherscan} />
      </View>),
      this.renderPayPalContent(),
      (<View style={style.spaceHorizontalL}>
        <Button black onPress={() => this.setState({shouldPickCurrency: true})} text={currency} />
      </View>),
      this.renderVerify(),
      (<View style={style.spaceHorizontalL}>
        <Text style={[style.text, style.spaceTopL, style.center]}>{setEmail}</Text>
        <View style={style.textInputContainer}>
          <InputImage name='email'/>
          <TextInput autoCapitalize='none' style={style.textInput} placeholder={email}
            value={this.state.email} underlineColorAndroid='transparent' keyboardType='email-address'
            onChangeText={email => this.setState({ email: formatEmail(email) })}
            onBlur={(): any => this.onEmailTextInputBlur(this.state.email)}
          />
        </View>
        { !!emailTextInputErrorText && <Text style={style.warningText}>{emailTextInputErrorText}</Text>}
        <Button round onPress={submitEmail} text={updateAccountText} />
      </View>),
      (<View style={style.spaceHorizontalL}>
        {authenticated ? <Button round onPress={() => this.setState({ step: 2 })} text={changePin} /> :
        <Button round onPress={() => this.setState({ step: 4 })} text={enterCurrentPin} />}
      </View>),
      (<View style={style.spaceHorizontalL}>
        <Text style={[style.text, style.spaceTopL, style.center]}>{accountManagement.lockTimeout.top}</Text>
        <View style={style.textInputContainerMinor}>
          <TextInput autoCapitalize='none' style={style.textInputMinor} placeholder={`${user.lockTimeout}`}
            value={lockTimeout} underlineColorAndroid='transparent' maxLength={6} keyboardType='numeric'
            onChangeText={ timeout => this.setState({ lockTimeout: formatLockTimeout(timeout) })}
          />
        </View>
        <Text style={[style.text, style.center]}>{accountManagement.lockTimeout.bottom}</Text>
        <Button round onPress={() => this.setLockTimeout()} text={accountManagement.lockTimeout.update} />
      </View>),
      (<View style={style.spaceHorizontalL}>
        {authenticated ? <View>
          <Text style={[style.text, style.spaceTopL, style.center]}>{mnemonicExhortation}</Text>
          <Text selectable style={style.displayText}>{user.mnemonic}</Text>
          <Button round onPress={() => copyToClipboard(user.mnemonic)} text={copy} />
        </View> :
        <Button round onPress={() => this.setState({ step: 4 })} text={showMnemonic} />}
      </View>),
      (<View style={style.spaceHorizontalL}>
        <Text style={[style.text, style.spaceTopL, style.center]}>{notifications.toggleNotifications}</Text>
        <Button round onPress={() => this.props.toggleNotifications()} text={notificationsEnabled ? notifications.disable : notifications.enable} containerStyle={{marginBottom: 20}} />
      </View>)
    ]

    const panelHeader = index => <TouchableHighlight {...underlayColor} onPress={() => this.togglePanel(index)}>
      <View style={style.panelHeader}>
        <Text style={style.panelText}>{accountManagement.panelHeaders[index]}</Text>
        <Image source={require('images/button-arrow.png')} style={hiddenPanels[index] ? style.panelIconRight : style.panelIconDown} />
      </View>
    </TouchableHighlight>

    return panelContent.map( (panel, index) => (
      <View key={'panel' + index}>
        {panelHeader(index)}
        {hiddenPanels[index] ? null : panel}
      </View>
    ))
  }

  render() {
    const { password, confirmPassword, step, nickTextInputErrorText, shouldPickCurrency, currency, showNicknameInput, photos } = this.state
    const { user, userPic } = this.props.state
    const imageSource = userPic ? { uri: userPic } : require('images/person-outline-dark.png')

    if (step === 5) {
      return <View style={[general.fullHeight, general.view]}>
        <View style={style.form}>
          <Pinpad onNumPress={() => null} onBackspace={() => null} pin={confirmPassword} headerText={pleaseWait} />
        </View>
      </View>
    } else if (step === 3 || step === 4) {
      return <View style={[general.fullHeight, general.view]}>
        <Button close onPress={() => this.clearPinView()} />
        <View style={style.form}>
          <Pinpad onNumPress={(pin) => this.confirmPin(pin)} onBackspace={() => this.clearConfirmPin()} pin={confirmPassword} headerText={confirmPin} />
        </View>
      </View>
    } else if (step === 2) {
      return <View style={[general.fullHeight, general.view]}>
        <Button close onPress={() => this.clearPinView()} />
        <View style={style.form}>
          <Pinpad onNumPress={(pin) => this.enterPin(pin)} onBackspace={() => this.clearPin()} pin={password} headerText={enterNewPin} />
        </View>
      </View>
    } else {
      const vertOffset = (Platform.OS === 'android') ? -300 : 0;
      return <View style={general.whiteFlex}>
        <View style={general.view}>
          <DashboardShell text={myAccount} navigation={this.props.navigation} hideSettings />
          <Button close onPress={() => this.props.navigation.goBack()} />
        </View>
        <KeyboardAvoidingView style={general.whiteFlex} behavior={'padding'} keyboardVerticalOffset={vertOffset} >
          <ScrollView ref='scrollContent' style={general.view} onScroll={event => this.handleScroll(event)} scrollEventThrottle={50} keyboardShouldPersistTaps='handled'>
            <View style={[style.account, {minHeight: height}]}>
              <Loading context={loadingContext} />
              <TouchableHighlight {...underlayColor} onPress={() => this.getPhoto()}>
                <View style={general.centeredColumn}>
                  <Icon style={style.cameraImage} name="md-camera" />
                  {!photos.length ? <Image source={imageSource} style={style.accountImage}/> : null}
                </View>
              </TouchableHighlight>
              <TouchableHighlight {...underlayColor} onPress={() => this.setState({ showNicknameInput: !showNicknameInput })}>
                <View style={general.flexRow}>
                  <Text style={pendingStyle.title}>{`@${user.nickname}`}</Text>
                  <Image source={require('images/button-arrow.png')} style={[showNicknameInput ? style.panelIconDown : style.panelIconRight, {marginTop: 34, marginLeft: 15, marginRight: 0}]} />
                </View>
              </TouchableHighlight>
              {showNicknameInput ? <View style={style.spaceHorizontalM}>
                {nickname ? <Text style={[style.text, style.spaceTopM, style.center]}>{setNickname}</Text> : null}
                <View style={style.textInputContainer}>
                  <InputImage name='person'/>
                  <TextInput autoCapitalize='none' style={style.textInput} placeholder={nickname}
                    value={this.state.nickname} underlineColorAndroid='transparent' maxLength={20}
                    onChangeText={nickname => this.setState({ nickname: formatNick(nickname) })}
                    onBlur={(): any => this.onNickTextInputBlur(this.state.nickname)}
                  />
                </View>
                { !!nickTextInputErrorText && <Text style={style.warningText}>{nickTextInputErrorText}</Text>}
                <Button round onPress={this.submitNickname} text={updateAccountText} />
              </View> : null }
              <View style={general.centeredColumn}>
                {this.renderPanels()}
              </View>
              <Button round danger onPress={() => this.logout()} text={logoutAction} containerStyle={style.spaceVertical} />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <Modal
          animationType="slide"
          transparent={false}
          visible={shouldPickCurrency}
          onRequestClose={() => this.setState({shouldPickCurrency: false})}>
          <View style={[popupStyle.modalOverlay, general.flexColumn, general.justifyEnd]}>
            <View style={{backgroundColor:'white', paddingTop:4}}>
              <SpinningPicker label={debtManagement.chooseCurrency} allItems={this.props.allCurrencies} selectedItem={currency} onPickerDone={(value) => this.handlePickerDone(value)} />
            </View>
          </View>
        </Modal>
      </View>
    }
  }
}

export default connect((state) => ({ user: getUser(state)(), state: getStore(state)(), allCurrencies: getAllUcacCurrencies(state),
  primaryCurrency: getPrimaryCurrency(state), transferLimitLevel: getTransferLimitLevel(state)}), { updateEmail, updateNickname,
  getAccountInformation, logoutAccount, toggleNotifications, setEthBalance, updateLockTimeout, updatePin,
  getProfilePic, setProfilePic, copyToClipboard, setPrimaryCurrency, failedValidatePin, getVerificationStatus })(MyAccount)
