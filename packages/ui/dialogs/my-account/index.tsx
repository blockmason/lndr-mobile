import React, { Component } from 'react'

import { defaultUpdateAccountData, UpdateAccountData, UserData } from 'lndr/user'

import { Text, TextInput, View, Dimensions, ScrollView, CameraRoll,
  TouchableHighlight, Image, BackHandler, FlatList } from 'react-native'

import Button from 'ui/components/button'
import Pinpad from 'ui/components/pinpad'
import Loading, { LoadingContext } from 'ui/components/loading'

import { getAccountInformation, updateNickname, updateEmail, logoutAccount, toggleNotifications, 
  setEthBalance, updateLockTimeout, updatePin, getProfilePic, setProfilePic, takenNick, takenEmail,
  copyToClipboard, validatePin } from 'actions'
import { getUser, getStore } from 'reducers/app'
import { connect } from 'react-redux'
import { formatNick, formatLockTimeout, formatEmail, emailFormatIncorrect } from 'lndr/format'
import { getBcptBalance } from 'lndr/bcpt-utils'
import defaultCurrency from 'lndr/default-currency'

import TextLogo from 'ui/components/images/text-logo'
import BMLogo from 'ui/components/images/bm-logo'
import InputImage from 'ui/components/images/input-image'

const loadingContext = new LoadingContext()

const { height } = Dimensions.get('window');

import style from 'theme/form'
import general from 'theme/general'
import { underlayColor } from 'theme/general'
import slideStyle from 'theme/slide'

import language, { currencies } from 'language'
const { nickname, setNickname, email, setEmail, copy, accountManagement, changePin, enterNewPin, confirmPin,
  cancel, mnemonicExhortation, addressExhortation, logoutAction, notifications, currentBalance, showMnemonic, enterCurrentPin
 } = language
 const updateAccountText = language.updateAccount

interface Props {
  logoutAccount: () => any
  closePopup: () => void
  navigation: any
  getAccountInformation: () => any
  user: UserData
  updateNickname: (accountData: UpdateAccountData) => any
  updateEmail: (accountData: UpdateAccountData) => any
  state: any
  toggleNotifications: () => any
  setEthBalance: () => any
  updateLockTimeout: (timeout: number) => any
  updatePin: (password: string, confirmPassword: string) => any
  getProfilePic: (nickname: string) => any
  setProfilePic: (imageURI: string) => any
  copyToClipboard: (text: string) => any
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
  nickTextInputErrorText?: string
  emailTextInputErrorText?: string
  authenticated: boolean
  currency: string
}

class MyAccount extends Component<Props, State> {
  constructor() {
    super()
    this.state = {
      ...defaultUpdateAccountData(),
      lockTimeout: '',
      hiddenPanels: [true, true, true, true, true, true, true, true, true, true],
      step: 1,
      photos: [],
      authenticated: false,
      currency: defaultCurrency
    }
  }

  async componentWillMount() {
    const { address } = this.props.user
    this.props.setEthBalance()
    this.props.getProfilePic(address)
  }

  async componentDidMount() {
    this.setState(
      await loadingContext.wrap(
        this.props.getAccountInformation()
      )
    )
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
    const { password, confirmPassword, step } = this.state

    if (step === 4 && confirmPassword.length === 4 ) {
      const authenticated = loadingContext.wrap(validatePin(confirmPassword))
      this.setState({ step: 1, confirmPassword: '', authenticated })
    } else if (step === 3 && password.length === 4 && confirmPassword.length === 4) {
      await loadingContext.wrap(this.props.updatePin(password, confirmPassword))
      this.clearPinView()
    } else if (password.length === 4 && step === 2) {
      this.setState({ step: 3 })
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
    const { hiddenPanels } = this.state
    hiddenPanels[index] = !hiddenPanels[index]
    this.setState({ hiddenPanels })
  }

  async getCameraRoll() {
    if (this.state.photos.length) {
      return
    }
    const photos = await CameraRoll.getPhotos({ first: 50 })
    this.setState({ photos: photos.edges })
  }

  async setNewProfilePic(imageURI: string) {
    const image = await loadingContext.wrap( this.props.setProfilePic(imageURI) )
    this.setState({ photos: [] })
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

  _keyExtractor = (item, index) => index

  renderPhoto = ({ item, index }) => {
    const uri = item.node.image.uri
    return <TouchableHighlight { ...underlayColor } onPress={() => this.setNewProfilePic(item.node.image.uri)}>
      <Image source={{ uri }} style={style.cameraImage}/>
    </TouchableHighlight>
  }

  renderPanels() {
    const { user, closePopup, updateNickname, updateEmail, copyToClipboard } = this.props
    const { notificationsEnabled, ethBalance, bcptBalance, userPic } = this.props.state
    const { lockTimeout, hiddenPanels, photos, nickTextInputErrorText, emailTextInputErrorText, authenticated, currency } = this.state
    const imageSource = userPic ? { uri: userPic } : require('images/person-outline-dark.png')

    const submitNickname = async () => {
      await loadingContext.wrap(updateNickname(this.state))
    }

    const submitEmail = async () => {
      await loadingContext.wrap(updateEmail(this.state))
    }

    const panelContent = [
      (<View style={style.spaceHorizontalL}>
        <Text style={[style.text, style.spaceTopL, style.center]}>{addressExhortation}</Text>
        <Text style={[style.smallText, style.spaceTop, style.center]}>{accountManagement.sendEth.note(currency)}</Text>
        <Text selectable style={style.displayText}>{`0x${user.address}`}</Text>
        <Button round onPress={() => copyToClipboard(user.address)} text={copy} />
      </View>),
      (<View style={style.spaceHorizontalL}>
        <Text style={[style.text, style.spaceTopL, style.center]}>{currentBalance.eth}</Text>
        <Text selectable style={style.displayText}>{ethBalance}</Text>
        <Button round onPress={() => this.props.navigation.navigate('TransferEth')} text={accountManagement.sendEth.transfer} />
      </View>),
      (<View style={style.spaceHorizontalL}>
        <Text style={[style.text, style.spaceTopL, style.center]}>{currentBalance.bcpt}</Text>
        <Text selectable style={style.displayText}>{bcptBalance}</Text>
        <Button round onPress={() => this.props.navigation.navigate('TransferBcpt')} text={accountManagement.sendBcpt.transfer} />
      </View>),
      (<View style={style.spaceHorizontalL}>
        {authenticated ? <Button round onPress={() => this.setState({ step: 2 })} text={changePin} /> :
        <Button round onPress={() => this.setState({ step: 4 })} text={enterCurrentPin} />}
      </View>),
      (<View style={style.spaceHorizontalL}>
        <Text style={[style.text, style.spaceTopL, style.center]}>{setNickname}</Text>
        <View style={style.textInputContainer}>
          <InputImage name='person'/>
          <TextInput
            autoCapitalize='none'
            style={style.textInput}
            placeholder={nickname}
            value={this.state.nickname}
            underlineColorAndroid='transparent'
            maxLength={20}
            onChangeText={nickname => this.setState({ nickname: formatNick(nickname) })}
            onBlur={(): any => this.onNickTextInputBlur(this.state.nickname)}
          />
        </View>
        { !!nickTextInputErrorText && <Text style={style.warningText}>{nickTextInputErrorText}</Text>}
        <Button round onPress={submitNickname} text={updateAccountText} />
      </View>),
      (<View style={style.spaceHorizontalL}>
        <Text style={[style.text, style.spaceTopL, style.center]}>{setEmail}</Text>
        <View style={style.textInputContainer}>
          <InputImage name='email'/>
          <TextInput
            autoCapitalize='none'
            style={style.textInput}
            placeholder={email}
            value={this.state.email}
            underlineColorAndroid='transparent'
            keyboardType='email-address'
            onChangeText={email => this.setState({ email: formatEmail(email) })}
            onBlur={(): any => this.onEmailTextInputBlur(this.state.email)}
          />
        </View>
        { !!emailTextInputErrorText && <Text style={style.warningText}>{emailTextInputErrorText}</Text>}
        <Button round onPress={submitEmail} text={updateAccountText} />
      </View>),
      (<View style={style.spaceHorizontalL}>
        <TouchableHighlight {...underlayColor} onPress={() => this.getCameraRoll()}>
          <View style={general.centeredColumn}>
            <Text style={[style.text, style.spaceTopL, style.center]}>{userPic ? accountManagement.changeProfilePic : accountManagement.addProfilePic}</Text>
            {!photos.length ? <Image source={imageSource} style={[style.image, style.spaceBottomL]}/> : null}
          </View>
        </TouchableHighlight>
        <FlatList
          data={photos}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderPhoto}
          horizontal
        />
      </View>),
      (<View style={style.spaceHorizontalL}>
        <Text style={[style.text, style.spaceTopL, style.center]}>{accountManagement.lockTimeout.top}</Text>
        <View style={style.textInputContainerMinor}>
          <TextInput
            autoCapitalize='none'
            style={style.textInputMinor}
            placeholder={`${user.lockTimeout}`}
            value={lockTimeout}
            underlineColorAndroid='transparent'
            maxLength={6}
            keyboardType='numeric'
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
    const { password, confirmPassword, step } = this.state

    if (step === 3 || step === 4) {
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
      return <ScrollView style={general.view} keyboardShouldPersistTaps='handled'>
        <Button close onPress={() => this.props.navigation.goBack()} />
        <View style={[style.account, {minHeight: height}]}>
          <Loading context={loadingContext} />
          {/* <TextLogo name='black'/> */}
          {/* <Text>BY</Text> */}
          <BMLogo type='square' size='medium'/>
          <Text style={slideStyle.inc}>INC.</Text>
          <Button round danger onPress={() => this.props.logoutAccount()} text={logoutAction} containerStyle={style.spaceVertical} />
          <View style={general.centeredColumn}>
            {this.renderPanels()}
          </View>
        </View>
      </ScrollView>
    }
  }
}

export default connect((state) => ({ user: getUser(state)(), state: getStore(state)() }), { updateEmail, updateNickname, 
  getAccountInformation, logoutAccount, toggleNotifications, setEthBalance, updateLockTimeout, updatePin, 
  getProfilePic, setProfilePic, copyToClipboard })(MyAccount)
