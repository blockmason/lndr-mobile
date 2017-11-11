import React, { Component } from 'react'

import { Text, TextInput, TouchableHighlight, View } from 'react-native'

import { debounce } from 'lndr/time'
import Engine from 'lndr/engine'
import Friend from 'lndr/friend'

import Button from 'ui/components/button'
import Loading, { LoadingContext } from 'ui/components/loading'
import FriendRow from 'ui/components/friend-row'

import { lightGray } from 'theme/include/colors'
import style from 'theme/account'
import formStyle from 'theme/form'

import { searchUsersByNickname, nickname, cancel } from 'language'

const loadingContext = new LoadingContext()

interface Props {
  engine: Engine
  closePopup: () => void
}

interface State {
  hasSearchTerm: boolean
  matches: Friend[]
}

export default class AddFriend extends Component<Props, State> {
  searchAction: (string) => void

  constructor() {
    super()
    this.state = {
      hasSearchTerm: false,
      matches: []
    }
  }

  render() {
    const { engine, closePopup } = this.props
    const { matches } = this.state

    if (!this.searchAction) {
      this.searchAction = debounce(
        nickname =>
          loadingContext.wrap(
            engine.searchUsers({
              nickname
            })
          ).then(
            matches => this.setState({ hasSearchTerm: nickname.length > 0, matches })
          )
      )
    }

    return <View>
      <Text style={formStyle.text}>{searchUsersByNickname}</Text>
      <TextInput
        autoCapitalize='none'
        style={formStyle.textInput}
        placeholder={nickname}
        onChangeText={this.searchAction}
      />
      <View style={style.list}>
        <Loading context={loadingContext} />
        {matches.map(match => <FriendRow key={match.address} friend={match} onPress={() => {}} />)}
      </View>
      <Button alternate onPress={closePopup} text={cancel} />
    </View>
  }
}
