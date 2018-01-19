import React, { Component } from 'react'

import { defaultUpdateAccountData, UpdateAccountData, UserData } from 'lndr/user'

import { Text, TextInput, View, Clipboard, Dimensions } from 'react-native'

import Button from 'ui/components/button'
import Loading, { LoadingContext } from 'ui/components/loading'

import { getAccountInformation, updateAccount } from 'actions'
import { getUser } from 'reducers/app'
import { connect } from 'react-redux'

import TextLogo from 'ui/components/images/text-logo'

import InputImage from 'ui/components/images/input-image'

const loadingContext = new LoadingContext()

const { height } = Dimensions.get('window');

import style from 'theme/form'

import { nickname, setNickname, updateAccount as updateAccountText, copy, cancel, mnemonicExhortation } from 'language'

interface Props {
  closePopup: () => void
  navigation: any
  getAccountInformation: () => any
  user: UserData
  updateAccount: (accountData: UpdateAccountData) => any
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

    const submit = async () => {
      await loadingContext.wrap(
        this.props.updateAccount(this.state)
      )
      this.props.navigation.goBack()
    }

    return <View style={[style.account, {minHeight: height}]}>
      <Loading context={loadingContext} />
      <TextLogo name='black'/>
      <View style={{marginTop: 20}}/>
      <Text style={[style.text, style.center]}>{mnemonicExhortation}</Text>
      <Text selectable style={style.displayText}>{user.mnemonic}</Text>
      <Button round onPress={() => Clipboard.setString(user.mnemonic)} style={style.submitButton} text={copy} />
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
      <Button round onPress={submit} style={style.submitButton} text={updateAccountText} />
      <Button alternate arrow onPress={this.handleOnCancel.bind(this)} text={cancel} />
    </View>
  }
}

export default connect((state) => ({ user: getUser(state)() }), { updateAccount, getAccountInformation })(MyAccount)
