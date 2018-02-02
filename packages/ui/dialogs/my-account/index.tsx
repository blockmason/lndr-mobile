import React, { Component } from 'react'

import { defaultUpdateAccountData, UpdateAccountData, UserData } from 'lndr/user'

import { Text, TextInput, View, Clipboard, Dimensions, ScrollView, TouchableHighlight, Image } from 'react-native'

import Button from 'ui/components/button'
import Loading, { LoadingContext } from 'ui/components/loading'

import { getAccountInformation, updateAccount, logoutAccount, toggleNotifications, setEthBalance, updateLockTimeout } from 'actions'
import { getUser, getStore } from 'reducers/app'
import { connect } from 'react-redux'
import { formatNick, formatLockTimeout } from 'lndr/format'

import TextLogo from 'ui/components/images/text-logo'

import InputImage from 'ui/components/images/input-image'

const loadingContext = new LoadingContext()

const { height } = Dimensions.get('window');

import style from 'theme/form'
import general from 'theme/general'

import { nickname, setNickname, updateAccount as updateAccountText, copy, accountManagement,
  cancel, mnemonicExhortation, addressExhortation, logoutAction, notifications, currentBalance } from 'language'

interface Props {
  logoutAccount: () => any
  closePopup: () => void
  navigation: any
  getAccountInformation: () => any
  user: UserData
  updateAccount: (accountData: UpdateAccountData) => any
  state: any
  toggleNotifications: () => any
  setEthBalance: () => any
  updateLockTimeout: (timeout: number) => any
}

interface State {
  nickname: string
  lockTimeout: string
  hiddenPanels: [boolean]
}

class MyAccount extends Component<Props, State> {
  constructor() {
    super()
    this.state = {
      ...defaultUpdateAccountData(),
      lockTimeout: '',
      hiddenPanels: [true, true, true, true, true, true, true]
    }
  }

  componentWillMount() {
    this.props.setEthBalance()
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

  togglePanel(index: number) {
    const { hiddenPanels } = this.state
    hiddenPanels[index] = !hiddenPanels[index]
    this.setState({ hiddenPanels })
  }

  renderPanels() {
    const { user, closePopup } = this.props
    const { notificationsEnabled, ethBalance } = this.props.state
    const { lockTimeout, hiddenPanels } = this.state

    const submit = async () => {
      await loadingContext.wrap(this.props.updateAccount(this.state))
    }

    const panelContent = [
      (<View style={style.spaceHorizontalL}>
        <Text style={[style.text, style.spaceTopL, style.center]}>{notifications.toggleNotifications}</Text>
        <Button round onPress={() => this.props.toggleNotifications()} text={notificationsEnabled ? notifications.disable : notifications.enable} containerStyle={{marginBottom: 20}} />
      </View>),
      (<View style={style.spaceHorizontalL}>
        <Text style={[style.text, style.spaceTopL, style.center]}>{mnemonicExhortation}</Text>
        <Text selectable style={style.displayText}>{user.mnemonic}</Text>
        <Button round onPress={() => Clipboard.setString(user.mnemonic)} text={copy} />
      </View>),
      (<View style={style.spaceHorizontalL}>
        <Text style={[style.text, style.spaceTopL, style.center]}>{currentBalance.eth}</Text>
        <Text selectable style={style.displayText}>{ethBalance}</Text>
        <Button round onPress={() => this.props.navigation.navigate('TransferEth')} text={accountManagement.sendEth.transfer} />
      </View>),
      (<View style={style.spaceHorizontalL}>
        <Text style={[style.text, style.spaceTopL, style.center]}>{addressExhortation}</Text>
        <Text selectable style={style.displayText}>{user.address}</Text>
        <Button round onPress={() => Clipboard.setString(user.address)} text={copy} />
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
          />
        </View>
        <Button round onPress={submit} text={updateAccountText} />
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
            onChangeText={ timeout => this.setState({ lockTimeout: formatLockTimeout(timeout) })}
          />
        </View>
        <Text style={[style.text, style.center]}>{accountManagement.lockTimeout.bottom}</Text>
        <Button round onPress={() => this.setLockTimeout()} text={accountManagement.lockTimeout.update} />
      </View>)
    ]

    const panelHeader = index => <TouchableHighlight onPress={() => this.togglePanel(index)}>
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
    return <ScrollView style={general.view} keyboardShouldPersistTaps='handled'>
      <Button close onPress={() => this.props.navigation.goBack()} />
      <View style={[style.account, {minHeight: height}]}>
        <Loading context={loadingContext} />
        <TextLogo name='black'/>
        <Button round danger onPress={() => this.props.logoutAccount()} text={logoutAction} containerStyle={style.spaceVertical} />
        <View style={general.centeredColumn}>
          {this.renderPanels()}
        </View>
      </View>
    </ScrollView>
  }
}

export default connect((state) => ({ user: getUser(state)(), state: getStore(state)() }), { updateAccount, getAccountInformation, logoutAccount, toggleNotifications, setEthBalance, updateLockTimeout })(MyAccount)
