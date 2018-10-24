import React, { Component } from 'react'

import { Text, View, Image, ScrollView } from 'react-native'

import profilePic from 'lndr/profile-pic'
import { UserData } from 'lndr/user'

import DashboardShell from 'ui/components/dashboard-shell'
import BackButton from 'ui/components/back-button'
import Button from 'ui/components/button'
import Loading, { LoadingContext } from 'ui/components/loading'

import general from 'theme/general'
import pendingStyle from 'theme/pending'

import language from 'language'
const {
  pendingTransactionsLanguage,
  payPalLanguage,
  cancel
} = language

import { cancelPayPalRequest, cancelPayPalRequestFail } from 'actions'
import { getResetAction } from 'reducers/nav'
import { getUser } from 'reducers/app'
import { connect } from 'react-redux'

const loadingContext = new LoadingContext()

interface Props {
  cancelPayPalRequestFail: () => void
  user: UserData
  navigation: any
}

interface State {
  pic?: string
}

class PayPalRequestDetail extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {}

    this.submit = this.submit.bind(this)
    this.goBack = this.goBack.bind(this)
  }

  async componentWillMount() {
    const friend = this.props.navigation ? this.props.navigation.state.params.friend : {}
    let pic

    if (friend.address !== undefined) {
      pic = await profilePic.get(friend.address)
    }

    if (pic) {
      this.setState({ pic })
    }
  }

  async submit() {
    const friend = this.props.navigation ? this.props.navigation.state.params.friend : {}
    const { address, privateKeyBuffer } = this.props.user

    try {
      await loadingContext.wrap(cancelPayPalRequest(friend.address, address, privateKeyBuffer))
      const resetAction = getResetAction({ routeName:'Confirmation', params: { type: 'reject', friend } })
      this.props.navigation.dispatch(resetAction)
    } catch(e) {
      console.log('CANCEL PAYPAL REQUEST FAIL: ', e)
      this.props.cancelPayPalRequestFail()
    }
  }

  goBack() {
    this.props.navigation.goBack(null)
  }

  render() {
    const friend = this.props.navigation ? this.props.navigation.state.params.friend : {}
    const { pic } = this.state
    const imageSource = pic ? { uri: pic } : require('images/person-outline-dark.png')

    return <View style={general.whiteFlex}>
      <View style={general.view}>
        <DashboardShell text={pendingTransactionsLanguage.shell} navigation={this.props.navigation} />
        <Loading context={loadingContext} />
        <BackButton onPress={this.goBack} />
      </View>
      <ScrollView style={general.view} keyboardShouldPersistTaps="always">
        <View style={general.centeredColumn}>
          <Image source={imageSource} style={pendingStyle.image}/>
          <Text style={pendingStyle.title}>{payPalLanguage.requestFriendConnect(friend.nickname)}</Text>
          <View style={{marginBottom: 10}}>
            <Button danger round onPress={this.submit} text={cancel} />
          </View>
        </View>
      </ScrollView>
    </View>
  }
}

export default connect((state) => ({ user: getUser(state)() }), { cancelPayPalRequestFail })(PayPalRequestDetail)
