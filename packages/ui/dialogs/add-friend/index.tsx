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

import {
  searchUsersByNickname,
  nickname,
  cancel,
  back,
  noMatches,
  addFriend,
  addFriendConfirmationQuestion
} from 'language'

const loadingContext = new LoadingContext()

interface Props {
  engine: Engine
  closePopup: () => void
}

interface State {
  candidateForFriendship?: Friend
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

  componentDidMount() {
    const { engine } = this.props

    this.searchAction = debounce(
      async (nickname) => {
        try {
          const matches = await loadingContext.wrap(
            engine.searchUsers({ nickname })
          )
          this.setState({ hasSearchTerm: nickname.length > 0, matches })
        }

        catch (error) {
          this.setState({ hasSearchTerm: nickname.length > 0, matches: [] })
        }
      }
    )
  }

  async confirmFriend(friend: Friend) {
    const { engine, closePopup } = this.props

    await loadingContext.wrap(
      engine.addFriend(friend)
    )

    closePopup()
  }

  render() {
    const { closePopup } = this.props
    const { matches, hasSearchTerm, candidateForFriendship } = this.state

    if (candidateForFriendship) {
      return <View>
        <Text style={formStyle.text}>{addFriendConfirmationQuestion}</Text>
          <Loading context={loadingContext} />
          <FriendRow
            key={candidateForFriendship.address}
            friend={candidateForFriendship}
          />
          <Button onPress={() => this.confirmFriend(candidateForFriendship)} text={addFriend} />
          <Button alternate onPress={() => this.setState({ candidateForFriendship: undefined })} text={back} />
      </View>
    }

    return <View>
      <Text style={formStyle.text}>{searchUsersByNickname}</Text>
      <TextInput
        autoCapitalize='none'
        style={formStyle.textInput}
        placeholder={nickname}
        onChangeText={text => this.searchAction(text)}
      />
      <View style={style.list}>
        <Loading context={loadingContext} />
        {hasSearchTerm && matches.length === 0 ? <Text style={style.emptyState}>{noMatches}</Text> : null}
        {matches.map(
          match => (
            <FriendRow
              key={match.address}
              friend={match}
              onPress={() => this.setState({ candidateForFriendship: match })}
            />
          )
        )}
      </View>
      <Button alternate onPress={closePopup} text={cancel} />
    </View>
  }
}
