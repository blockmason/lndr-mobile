import React, { Component } from 'react'

import { defaultUpdateAccountData, UpdateAccountData, UserData } from 'lndr/user'

import { Text, TextInput, View, Clipboard } from 'react-native'

import Button from 'ui/components/button'
import Loading, { LoadingContext } from 'ui/components/loading'

import { getAccountInformation, updateAccount } from 'actions'
import { getUser } from 'reducers/app'
import { connect } from 'react-redux'

const loadingContext = new LoadingContext()

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

    return <View>
      <Loading context={loadingContext} />
      <Text style={style.text}>{mnemonicExhortation}</Text>
      <Text selectable style={style.displayText}>{user.mnemonic}</Text>
      <Button icon='md-copy' onPress={() => Clipboard.setString(user.mnemonic)} text={copy} />
      <Text style={style.text}>{setNickname}</Text>
      <TextInput
        autoCapitalize='none'
        style={style.textInput}
        placeholder={nickname}
        value={this.state.nickname}
        onChangeText={nickname => this.setState({ nickname })}
      />
      <Button onPress={submit} text={updateAccountText} />
      <Button alternate onPress={this.handleOnCancel.bind(this)} text={cancel} />
    </View>
  }
}

export default connect((state) => ({ user: getUser(state)() }), { updateAccount, getAccountInformation })(MyAccount)
