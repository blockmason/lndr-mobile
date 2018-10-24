import React, { Component } from 'react'

import { Text, View, Image, ScrollView } from 'react-native'
import firebase from 'react-native-firebase'

import Friend from 'lndr/friend'
import profilePic from 'lndr/profile-pic'
import DashboardShell from 'ui/components/dashboard-shell'

import Button from 'ui/components/button'
import Loading, { LoadingContext } from 'ui/components/loading'

import general from 'theme/general'
import pendingStyle from 'theme/pending'

import language from 'language'
const {
  cancel,
  pendingTransactionsLanguage,
  pendingFriendRequestsLanguage
} = language

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
  friend?: Friend
  isOutbound?: boolean
  pic?: string
}

class FriendRequest extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentWillMount() {
    const friend = this.props.navigation ? this.props.navigation.state.params.friend : {}
    const isOutbound = this.props.navigation ? this.props.navigation.state.params.isOutbound : {}
    let pic

    try {
      if (friend.address !== undefined) {
        pic = await profilePic.get(friend.address)
      }
    } catch (e) {}
    if (pic) {
      this.setState({ pic, friend, isOutbound })
    } else {
      this.setState({ friend, isOutbound })
    }
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
    const { pic, friend, isOutbound } = this.state
    const imageSource = pic ? { uri: pic } : require('images/person-outline-dark.png')
    const message = isOutbound ? pendingFriendRequestsLanguage.outbound : pendingFriendRequestsLanguage.request
    const type = isOutbound ? 'rejectOutboundFriendRequest' : 'rejectFriend'
    const rejectButtonText = isOutbound ? cancel : pendingTransactionsLanguage.rejectRequest

    return <View style={general.whiteFlex}>
      <View style={general.view}>
        <DashboardShell text={pendingFriendRequestsLanguage.shell} navigation={this.props.navigation} />
        <Loading context={loadingContext} />
        <View style={general.flexRow}>
          <Button close onPress={() => this.props.navigation.goBack()} />
          <View style={general.flex}/>
        </View>
      </View>
        <ScrollView style={general.view} keyboardShouldPersistTaps="always">
        <View style={general.centeredColumn}>
          <Image source={imageSource} style={pendingStyle.image}/>
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
