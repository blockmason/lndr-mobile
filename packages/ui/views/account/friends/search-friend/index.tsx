import React, { Component } from 'react'

import { Text, TextInput, TouchableHighlight, View, ScrollView } from 'react-native'

import { debounce } from 'lndr/time'
import { minimumNicknameLength } from 'lndr/user'
import Friend from 'lndr/friend'

import Button from 'ui/components/button'
import Loading, { LoadingContext } from 'ui/components/loading'
import AddFriendRow from 'ui/components/add-friend-row'
import FriendRow from 'ui/components/friend-row'
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

import { searchUsers } from 'actions'
import { connect } from 'react-redux'

const loadingContext = new LoadingContext()

interface Props {
  onSuccess: () => void
  selectFriend: (friend: Friend) => any
  removeFriend: (friend: Friend) => any
  scrollUp?: () => any
  state: any
  addDebt?: boolean
  navigation: any
}

interface State {
  candidateForFriendship?: Friend
  hasSearchTerm: boolean
  matches: Friend[]
}

export default class SearchFriend extends Component<Props, State> {
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
        nickname = nickname.toLowerCase()
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
      this.props.selectFriend(friend)
    )

    this.removeCandidateForFriendship()
    onSuccess()
  }

  isFriend(candidate) {
    const { friends } = this.props.state
    //see if the friend is in the friends list
    let isFriend = false
    friends.map( (friend) => {
      isFriend = isFriend || friend.address === candidate.address
    })
    return isFriend
  }

  setFriendCandidate(match) {
    if (this.props.scrollUp) {
      this.props.scrollUp()
    }
    this.setState({ candidateForFriendship: match })
  }

  render() {
    const { matches, hasSearchTerm, candidateForFriendship } = this.state
    const { addDebt, selectFriend, removeFriend, navigation } = this.props

    const { address }  = this.props.state.user

    if (!addDebt && candidateForFriendship) {
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

    return <ScrollView keyboardShouldPersistTaps='handled'>
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
        {hasSearchTerm && matches.length === 0 ? <Text style={[style.emptyState, {paddingLeft: 30}]}>{noMatches}</Text> : null}
        {matches.map(
          match => {
            if (match.address === address) {
              return null
            } else if (this.isFriend(match)) {
              return <FriendRow
                navigation={navigation}
                key={match.address}
                friend={match}
                onPress={addDebt ? () => selectFriend(match) : () => removeFriend(match)}
              />
            } else {
              return <AddFriendRow
                key={match.address}
                friend={match}
                onPress={ () => this.setFriendCandidate(match) }
              />
            }
          }
        )}
      </View>}
    </ScrollView>
  }
}

