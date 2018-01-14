import React, { Component } from 'react'

import { Text, TextInput, TouchableHighlight, View } from 'react-native'

import { debounce } from 'lndr/time'
import { minimumNicknameLength } from 'lndr/user'
import Friend from 'lndr/friend'

import Button from 'ui/components/button'
import Loading, { LoadingContext } from 'ui/components/loading'
import AddFriendRow from 'ui/components/add-friend-row'
import InputImage from 'ui/components/images/input-image'
import { getPendingTransactions, getRecentTransactions } from 'actions'

import style from 'theme/form'
import friendStyle from 'theme/friend'
import general from 'theme/general'

import {
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
      return <View style={[style.form, general.centeredColumn]}>
        <Text style={[style.text, style.center]}>{addFriendConfirmationQuestion}</Text>
          <Loading context={loadingContext} />
          <AddFriendRow
              key={candidateForFriendship.address}
              friend={candidateForFriendship}
              onPress={() => null}
              selected
            />
          <Button round onPress={() => this.confirmFriend(candidateForFriendship)} text={addFriendText} />
          <Button alternate small arrow onPress={() => this.removeCandidateForFriendship()} text={back} />
      </View>
    }

    return <View>
      <View style={style.horizontalView}>
        <View style={[style.textInputContainer]}>
          <InputImage name='search' />
          <TextInput
            style={style.textInput}
            underlineColorAndroid='transparent'
            autoCapitalize='none'
            placeholder={nickname}
            onChangeText={text => this.searchAction(text)}
          />
        </View>
      </View>
      { hasSearchTerm &&
      <View style={friendStyle.searchList}>
        <Loading context={loadingContext} />
        {hasSearchTerm && matches.length === 0 ? <Text style={style.emptyState}>{noMatches}</Text> : null}
        {matches.map(
          match => (
            <AddFriendRow
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
