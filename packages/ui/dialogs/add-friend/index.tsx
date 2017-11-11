import React, { Component } from 'react'

import { Text, TextInput, View } from 'react-native'

import Engine from 'lndr/engine'
import Button from 'ui/components/button'
import Loading, { LoadingContext } from 'ui/components/loading'

const loadingContext = new LoadingContext()

import style from 'theme/form'

import { searchUsersByNickname, nickname, cancel } from 'language'

interface Props {
  engine: Engine
  closePopup: () => void
}

interface State {
  nickname: string
}

export default class AddFriend extends Component<Props, State> {
  constructor() {
    super()
    this.state = {
      nickname: ''
    }
  }

  render() {
    const { engine, closePopup } = this.props

    const submit = () =>
      loadingContext.wrap(
        engine.searchUsers(this.state)
      ).then(closePopup)

    return <View>
      <Loading context={loadingContext} />
      <Text style={style.firstText}>{searchUsersByNickname}</Text>
      <TextInput
        autoCapitalize='none'
        style={style.textInput}
        placeholder={nickname}
        onChangeText={nickname => this.setState({ nickname })}
      />
      <Button alternate onPress={closePopup} text={cancel} />
    </View>
  }
}
