import React from 'react'
import { View, ScrollView, Text, TextInput } from 'react-native'
import { connect } from 'react-redux'
import Friend from 'lndr/friend'
import RecentTransaction from 'lndr/recent-transaction'

import FriendRow from 'ui/components/friend-row'
import InputImage from 'ui/components/images/input-image'
import Section from 'ui/components/section'
import BackButton from 'ui/components/back-button'
import Loading, { LoadingContext } from 'ui/components/loading'

import style from 'theme/account'
import formStyle from 'theme/form'
import general from 'theme/general'

import language from 'language'
import { hasPendingTransaction, getFriendsLoaded, getFriends, recentTransactions } from 'reducers/app'
const { noFriends, nickname } = language

const loadingFriends = new LoadingContext()

export interface Props {
  friendsLoaded: boolean
  friends: Friend[]
  recentTransactions: RecentTransaction[]
  hasPendingTransaction: (friend: Friend) => any
  navigation: any
  onBack: () => void
  onSelect: (friend: Friend) => void
  button: React.ReactNode
}

interface PassedProps extends React.Props<any> {
  navigation: any
  onBack: () => void
  onSelect: (friend: Friend) => void
  button: React.ReactNode
}

export interface State {
  searchText: string
}

class SelectFriend extends React.Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = { searchText: '' }
  }

  render() {
    const { state: { searchText }, props: { friendsLoaded, friends, recentTransactions, onSelect, button, navigation, hasPendingTransaction, onBack } } = this

    return <ScrollView style={[general.view, {paddingTop: 30}]} keyboardShouldPersistTaps='handled'>
      <BackButton onPress={onBack} />
      <Section>
        <View style={formStyle.horizontalView}>
          <View style={formStyle.textInputContainer}>
            <InputImage name='search' />
            <TextInput
              style={[style.textInput, {marginLeft: 10, width: '90%'}]}
              underlineColorAndroid='transparent'
              autoCapitalize='none'
              placeholder={nickname}
              onChangeText={searchText => this.setState({ searchText })}
            />
          </View>
        </View>
        {button}
      </Section>
      <View style={[style.list, {paddingBottom: 50}]}>
        <Loading context={loadingFriends} />
        {!!friendsLoaded && friends.length === 0 ? <Text style={style.emptyState}>{noFriends}</Text> : null}
        {friends instanceof Array ? friends.map(
          friend => friend.nickname.indexOf(searchText) === -1 ? null : (
            <FriendRow key={friend.address} onPress={() => onSelect(friend)} friend={friend} recentTransactions={recentTransactions}
              navigation={navigation} hasPending={hasPendingTransaction(friend)}/>
          )
        ) : null}
      </View>
    </ScrollView>
  }
}

export default connect<any, any, PassedProps>((state) => ({ hasPendingTransaction: hasPendingTransaction(state), friendsLoaded: getFriendsLoaded(state),
  friends: getFriends(state), recentTransactions: recentTransactions(state) }), {})(SelectFriend)
