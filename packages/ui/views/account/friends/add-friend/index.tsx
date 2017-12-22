import React, { Component } from 'react'

import { Text, TextInput, TouchableHighlight, View } from 'react-native'

import { debounce } from 'lndr/time'
import { minimumNicknameLength } from 'lndr/user'
import Friend from 'lndr/friend'

import Button from 'ui/components/button'
import Loading, { LoadingContext } from 'ui/components/loading'
import FriendRow from 'ui/components/friend-row'

import style from 'theme/form'
import buttonAction from 'theme/button'

import {
  lndrNickname,
  addANewFriend,
  nickname,
  cancel,
  back,
  noMatches,
  addFriend as addFriendText,
  addFriendConfirmationQuestion
} from 'language'

import { searchUsers, addFriend } from 'actions'
import { connect } from 'react-redux'

const loadingContext = new LoadingContext()

interface Props {
  onSuccess: () => void
  addFriend: (friend: Friend) => any
}

interface State {
  candidateForFriendship?: Friend
  hasSearchTerm: boolean
  matches: Friend[]
}

class AddFriend extends Component<Props, State> {
  searchAction: (string) => void

  constructor() {
    super()

    this.state = {
      hasSearchTerm: false,
      matches: []
    }
  }

  componentDidMount() {
    this.searchAction = debounce(
      async (nickname) => {
        try {
          const matches = await loadingContext.wrap(
            searchUsers({ nickname })
          )
          this.setState({ hasSearchTerm: nickname.length >= minimumNicknameLength, matches })
        }

        catch (error) {
          this.setState({ hasSearchTerm: nickname.length >= minimumNicknameLength, matches: [] })
        }
      }
    )
  }

  removeCandidateForFriendship() {
      this.setState({ candidateForFriendship: undefined, hasSearchTerm: false })
    }

    async confirmFriend(friend: Friend) {
      const { onSuccess } = this.props

      await loadingContext.wrap(
        this.props.addFriend(friend)
    )

    this.removeCandidateForFriendship()
    onSuccess()
  }

  render() {
    const { matches, hasSearchTerm, candidateForFriendship } = this.state

    if (candidateForFriendship) {
      return <View style={style.form}>
        <Text style={style.text}>{addFriendConfirmationQuestion}</Text>
          <Loading context={loadingContext} />
          <FriendRow
            key={candidateForFriendship.address}
            friend={candidateForFriendship}
          />
          <Button action onPress={() => this.confirmFriend(candidateForFriendship)} text={addFriendText} />
          <Button alternate onPress={() => this.removeCandidateForFriendship()} text={back} />
      </View>
    }

    return <View>
      <Text style={style.formTitle}>{addANewFriend}</Text>
      <View style={style.horizontalView}>
        <Text style={[ style.text, style.horizontalElem ]}>{lndrNickname}</Text>
        <TextInput
          autoCapitalize='none'
          style={style.borderTextInput}
          placeholder={nickname}
          onChangeText={text => this.searchAction(text)}
        />
      </View>
      { hasSearchTerm &&
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
        </View>}
    </View>
  }
}

export default connect(null, { addFriend })(AddFriend)
