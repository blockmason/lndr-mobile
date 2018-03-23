import React, { Component } from 'react'

import { Text, TextInput, TouchableHighlight, View, Image, ScrollView } from 'react-native'

import Friend from 'lndr/friend'
import profilePic from 'lndr/profile-pic'
import DashboardShell from 'ui/components/dashboard-shell'

import Button from 'ui/components/button'
import Loading, { LoadingContext } from 'ui/components/loading'
import BalanceRow from 'ui/components/balance-row'

import style from 'theme/friend'
import general from 'theme/general'
import pendingStyle from 'theme/pending'
import accountStyle from 'theme/account'

import language, { currencies } from 'language'
const {
  pendingTransactionsLanguage,
  pendingFriendRequestsLanguage
} = language
const removeFriendText = language.removeFriend

import { confirmFriendRequest, rejectFriendRequest } from 'actions'
import { getResetAction } from 'reducers/nav'
import { connect } from 'react-redux'

const loadingContext = new LoadingContext()

interface Props {
  confirmFriendRequest: (addr: string) => any
  rejectFriendRequest: (addr: string) => any
  navigation: any
}

interface State {
  pic?: string
}

class FriendRequest extends Component<Props, State> {
  constructor() {
    super()
    this.state = {}
  }

  async componentWillMount() {
    const friend = this.props.navigation ? this.props.navigation.state.params.friend : {}
    let pic

    try {
      if (friend.address !== undefined) {
        pic = await profilePic.get(friend.address)
      }
    } catch (e) {}
    if (pic) {
      this.setState({ pic })
    }
  }

  async submit(type: string, friend: Friend) {
    let success

    if (type === 'confirmFriend') {
      success = await loadingContext.wrap(
        this.props.confirmFriendRequest(friend.address)
      )
    } else {
      success = await loadingContext.wrap(
        this.props.rejectFriendRequest(friend.address)
      )
    }

    if (success) {
      const resetAction = getResetAction({ routeName:'Confirmation', params: { type, friend } })
      this.props.navigation.dispatch(resetAction)
    } else {
      this.props.navigation.goBack()
    }
  }

  render() {
    const friend = this.props.navigation ? this.props.navigation.state.params.friend : {}
    const { pic } = this.state
    const { navigation, confirmFriendRequest, rejectFriendRequest } = this.props
    const imageSource = pic ? { uri: pic } : require('images/person-outline-dark.png')

    return <ScrollView style={general.view}>
      <DashboardShell text={pendingFriendRequestsLanguage.shell} navigation={this.props.navigation} />
      <Loading context={loadingContext} />
      <Button close onPress={() => this.props.navigation.goBack(null)} />
      <View style={general.centeredColumn}>
        <Image source={imageSource} style={pendingStyle.image}/>
        <Text style={pendingStyle.title}>{pendingFriendRequestsLanguage.request(friend.nickname)}</Text>
        <View style={{marginBottom: 10}}>
          <Button round large onPress={() => this.submit('confirmFriend', friend)} text={pendingTransactionsLanguage.confirm} />
          <Button danger round onPress={() => this.submit('rejectFriend', friend)} text={pendingTransactionsLanguage.rejectRequest} />
        </View>
      </View>
    </ScrollView>
  }
}

export default connect(() => ({}), { confirmFriendRequest, rejectFriendRequest })(FriendRequest)
