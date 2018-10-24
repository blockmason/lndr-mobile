import React, { Component } from 'react'

import { Text, Image, View, ScrollView, TouchableHighlight } from 'react-native'
import firebase from 'react-native-firebase'

import { copyToClipboard } from 'actions'
import { getResetAction } from 'reducers/nav'
import { connect } from 'react-redux'

import Button from 'ui/components/button'
import DashboardShell from 'ui/components/dashboard-shell'

import general from 'theme/general'
import style from 'theme/confirmation'
import formStyle from 'theme/form'

import languageText, { language } from 'language'
const { confirmation, copy } = languageText

interface Props {
  navigation: any
  copyToClipboard: (text: string) => any
}

interface State {
}

class ConfirmationScreen extends Component<Props, State> {
  constructor(props) {
    super(props)
  }

  componentDidMount( ) {
    firebase.analytics().setCurrentScreen('confirmation-screen', 'ConfirmationScreen');
  }

  getConfirmationImage(type) {
    const acceptList = ['create', 'confirm', 'ethSent', 'erc20Sent', 'confirmFriend', 'requestPayPalPayee', 'requestPayPalPayment', 'settledWithPayPal', 'kycSuccess']
    const rejectList = ['reject', 'rejectFriend', 'rejectOutboundFriendRequest']
    if (acceptList.indexOf(type) >= 0) {
      return <Image source={require('images/check-circle.png')} style={style.image} />
    } else if (rejectList.indexOf(type) >= 0) {
      return <Image source={require('images/thumbs-down.png')} style={style.image} />
    } else {
      return null
    }
  }

  goHome() {
    this.props.navigation.dispatch( getResetAction({ routeName: 'Dashboard' }) )
  }

  goActivity() {
    this.props.navigation.dispatch( getResetAction({ routeName: 'Dashboard', params: { to: 'activity' } }) )
  }

  displayMessage() {
    const { copyToClipboard } = this.props
    const type = this.props.navigation.state.params ? this.props.navigation.state.params.type : 'create'
    let friend = { nickname: 'your friend' }
    let txHash = ''
    let amount = ''
    let tokenName = ''
    if (this.props.navigation.state.params) {
      if (this.props.navigation.state.params.friend)
        friend = this.props.navigation.state.params.friend
      if (this.props.navigation.state.params.txHash)
        txHash = this.props.navigation.state.params.txHash
      if (this.props.navigation.state.params.amount)
        amount = this.props.navigation.state.params.amount
      if (this.props.navigation.state.params.token)
        tokenName = this.props.navigation.state.params.token.tokenName
    }

    if (language === 'ja' && (type === 'ethSent' || type === 'erc20Sent')) {
      return <Text style={style.text}>
        <Text style={style.nickname}>{type !== 'ethSent' && type !== 'erc20Sent' ? `@${friend.nickname}` : amount}</Text>
        <Text>{confirmation[type].start}</Text>
        {type === 'erc20Sent' ? <Text> {tokenName}</Text> : null}
        <Text>{confirmation[type].end}</Text>
        {type === 'ethSent' || type === 'erc20Sent' ? <Text style={style.nickname}>{txHash}</Text> : null}
      </Text>
    }

    if (type === 'kycSuccess') {
      return <Text style={style.text}>
        <Text>{confirmation[type].start}</Text>
        <Text>{confirmation[type].end}</Text>
      </Text>
    }

    if (type === 'ethSent' || type === 'erc20Sent') {
      return <Text style={style.text}>
        <Text>{confirmation[type].start}</Text>
        <Text style={style.nickname}>{amount}</Text>
        {type === 'erc20Sent' ? <Text> {tokenName}</Text> : null}
        <Text>{confirmation[type].end}</Text>
        <View style={formStyle.spaceHorizontalL}>
          <Text selectable style={formStyle.displayText}>{txHash}</Text>
          <View style={formStyle.horizontalView}>
            <Button round onPress={() => copyToClipboard(txHash)} text={copy} />
          </View>
        </View>
      </Text>
    }

    return <Text style={style.text}>
      <Text>{confirmation[type].start}</Text>
      <Text style={style.nickname}>{`@${friend.nickname}`}</Text>
      <Text>{confirmation[type].end}</Text>
    </Text>
  }

  render() {
    const type = this.props.navigation.state.params ? this.props.navigation.state.params.type : 'create'

    return <View style={general.whiteFlex}>
      <View style={general.view}>
        <DashboardShell text={confirmation.shell} navigation={this.props.navigation} />
        <View style={general.flexRow}>
          <Button close onPress={() => this.goHome()} />
          <View style={general.flex}/>
        </View>
      </View>
      <ScrollView style={[general.whiteFlex]} keyboardShouldPersistTaps="always">
        <View style={[general.centeredColumn, general.standardHMargin]}>
          {this.getConfirmationImage(type)}
          {this.displayMessage()}
          {type === 'ethSent' || type === 'erc20Sent' || type === 'confirmFriend' || type === 'rejectFriend' || type === 'kycSuccess' ? <View style={{marginBottom: 20}}/> :
          <TouchableHighlight onPress={() => this.goActivity()}>
            <Text style={[style.text, style.spacing]}>
              <Text>{confirmation.status}</Text>
              <Text style={[style.text, style.link]}>{confirmation.activity}</Text>
            </Text>
          </TouchableHighlight>}
          <Button fat wide round onPress={() => this.goHome()} text={confirmation.done} />
        </View>
      </ScrollView>
    </View>
  }
}

export default connect( null, { copyToClipboard } )(ConfirmationScreen)
