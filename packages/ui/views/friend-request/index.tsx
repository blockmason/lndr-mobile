import React, { Component } from 'react'

import { Text, View, ScrollView } from 'react-native'
import firebase from 'react-native-firebase'

import Friend from 'lndr/friend'
import DashboardShell from 'ui/components/dashboard-shell'
import ProfilePic from 'ui/components/images/profile-pic'
import BackButton from 'ui/components/back-button'
import Button from 'ui/components/button'
import Loading, { LoadingContext } from 'ui/components/loading'

import general from 'theme/general'
import pendingStyle from 'theme/pending'

import language from 'language'
const { cancel, pendingTransactionsLanguage, pendingFriendRequestsLanguage } = language

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
  friend: Friend
  isOutbound?: boolean
}

class FriendRequest extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      friend: new Friend('', '')
    }
  }

  async componentWillMount() {
    const friend = this.props.navigation ? this.props.navigation.state.params.friend : {}
    const isOutbound = this.props.navigation ? this.props.navigation.state.params.isOutbound : {}
    this.setState({ friend, isOutbound })
  }

  componentDidMount( ) {
    firebase.analytics().setCurrentScreen('friend-request', 'FriendRequest');
  }

  async submit(type: string) {
    let success
    const { friend } = this.state
    if (friend === undefined) {
      return
    }

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
    const { friend, isOutbound } = this.state
    const message = isOutbound ? pendingFriendRequestsLanguage.outbound : pendingFriendRequestsLanguage.request
    const type = isOutbound ? 'rejectOutboundFriendRequest' : 'rejectFriend'
    const rejectButtonText = isOutbound ? cancel : pendingTransactionsLanguage.rejectRequest

    return <View style={general.whiteFlex}>
      <View style={general.view}>
        <DashboardShell text={pendingFriendRequestsLanguage.shell} navigation={this.props.navigation} />
        <Loading context={loadingContext} />
        <BackButton onPress={() => this.props.navigation.goBack()} />
      </View>
        <ScrollView style={general.view} keyboardShouldPersistTaps="always">
        <View style={general.centeredColumn}>
          <ProfilePic address={friend.address} style={pendingStyle.image} size={120} />
          <Text style={pendingStyle.title}>{message(friend ? friend.nickname : '')}</Text>
          <View style={{marginBottom: 10}}>
            {isOutbound ? null : <Button round large onPress={() => this.submit('confirmFriend')} text={pendingTransactionsLanguage.confirm} />}
            <Button danger round onPress={() => this.submit(type)} text={rejectButtonText} />
          </View>
        </View>
      </ScrollView>
    </View>
  }
}

export default connect(() => ({}), { confirmFriendRequest, rejectFriendRequest })(FriendRequest)
