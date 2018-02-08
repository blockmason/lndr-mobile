import React, { Component } from 'react'

import { defaultUpdateAccountData, UpdateAccountData, UserData } from 'lndr/user'

import { Text, TextInput, View, Clipboard, Dimensions, ScrollView } from 'react-native'

import Button from 'ui/components/button'
import Loading, { LoadingContext } from 'ui/components/loading'

import { getAccountInformation, updateAccount, logoutAccount, toggleNotifications } from 'actions'
import { getUser, getStore } from 'reducers/app'
import { connect } from 'react-redux'

import TextLogo from 'ui/components/images/text-logo'

import InputImage from 'ui/components/images/input-image'

const loadingContext = new LoadingContext()

const { height } = Dimensions.get('window');

import style from 'theme/form'

import { nickname, setNickname, updateAccount as updateAccountText, copy, 
  cancel, mnemonicExhortation, addressExhortation, logoutAction, notifications } from 'language'

interface Props {
  logoutAccount: () => any
  closePopup: () => void
  navigation: any
  getAccountInformation: () => any
  user: UserData
  updateAccount: (accountData: UpdateAccountData) => any
  state: any
  toggleNotifications: () => any
}

interface State {
  nickname: string
}

class MyAccount extends Component<Props, State> {
  constructor() {
    super()
    this.state = defaultUpdateAccountData()
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

  render() {
    const { user, closePopup } = this.props
    const { notificationsEnabled } = this.props.state

    const submit = async () => {
      await loadingContext.wrap(
        this.props.updateAccount(this.state)
      )
      this.props.navigation.goBack()
    }

    return <ScrollView keyboardShouldPersistTaps='handled'>
      <View style={[style.account, {minHeight: height}]}>
        <Loading context={loadingContext} />
        <TextLogo name='black'/>
        <View style={style.spaceTopL}/>
        <Button round danger onPress={() => this.props.logoutAccount()} text={logoutAction} />
        <Text style={[style.text, style.spaceTopL, style.center]}>{notifications.toggleNotifications}</Text>
        <Button round onPress={() => this.props.toggleNotifications()} text={notificationsEnabled ? notifications.disable : notifications.enable} />
        <Text style={[style.text, style.spaceTopL, style.center]}>{mnemonicExhortation}</Text>
        <Text selectable style={style.displayText}>{user.mnemonic}</Text>
        <Button round onPress={() => Clipboard.setString(user.mnemonic)} text={copy} />
        <Text style={[style.text, style.spaceTopL, style.center]}>{addressExhortation}</Text>
        <Text selectable style={style.displayText}>{user.address}</Text>
        <Button round onPress={() => Clipboard.setString(user.address)} text={copy} />
        <Text style={[style.text, style.spaceTopL, style.center]}>{setNickname}</Text>
        <View style={style.textInputContainer}>
          <InputImage name='person'/>
          <TextInput
            autoCapitalize='none'
            style={style.textInput}
            placeholder={nickname}
            value={this.state.nickname}
            underlineColorAndroid='transparent'
            onChangeText={nickname => this.setState({ nickname })}
          />
        </View>
        <Button round onPress={submit} text={updateAccountText} />
        <Button alternate arrow onPress={this.handleOnCancel.bind(this)} text={cancel} />
      </View>
    </ScrollView>
  }
}

export default connect((state) => ({ user: getUser(state)(), state: getStore(state)() }), { updateAccount, getAccountInformation, logoutAccount, toggleNotifications })(MyAccount)
