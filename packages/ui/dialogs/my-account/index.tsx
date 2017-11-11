import React, { Component } from 'react'

import { defaultUpdateAccountData } from 'lndr/user'

import { Text, TextInput, View } from 'react-native'

import Engine from 'lndr/engine'
import Button from 'ui/components/button'
import Loading, { LoadingContext } from 'ui/components/loading'

const loadingContext = new LoadingContext()

import style from 'theme/form'

import { nickname, setNickname, updateAccount, cancel } from 'language'

interface Props {
  engine: Engine
  closePopup: () => void
}

interface State {
  nickname: string
}

export default class MyAccount extends Component<Props, State> {
  constructor() {
    super()
    this.state = defaultUpdateAccountData()
  }

  render() {
    const { engine, closePopup } = this.props

    const submit = () =>
      loadingContext.wrap(
        engine.updateAccount(this.state)
      ).then(closePopup)

    return <View>
      <Loading context={loadingContext} />
      <Text style={style.firstText}>{setNickname}</Text>
      <TextInput
        autoCapitalize='none'
        style={style.textInput}
        placeholder={nickname}
        onChangeText={nickname => this.setState({ nickname })}
      />
      <Button onPress={submit} text={updateAccount} />
      <Button alternate onPress={closePopup} text={cancel} />
    </View>
  }
}