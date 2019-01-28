import React, { Component } from 'react'
import { Image, View, Text, ScrollView, TouchableHighlight, Dimensions, TextInput } from 'react-native'
import firebase from 'react-native-firebase'
import Icon from 'react-native-vector-icons/Ionicons'

import Button from 'ui/components/button'
import TextLogo from 'ui/components/images/text-logo'
import InputImage from 'ui/components/images/input-image'
import Row from 'ui/components/row'

import general from 'theme/general'
import style from 'theme/slide'
import formStyle from 'theme/form'
import tabStyle from 'theme/tabs'
import accountStyle from 'theme/account'

import languageText, { language } from 'language'
import Friend from 'lndr/friend';
const { walkthrough, inviteFriends, friendShell } = languageText

interface Props {}

interface State {
  friendsWidth: number
  friendsXOffset: number
}

export default class WelcomeStepTwoView extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      friendsWidth: 60,
      friendsXOffset: 120
    }
  }

  componentDidMount() {
    firebase.analytics().setCurrentScreen('welcome-step-two', 'WelcomeStepTwoView')
  }

  getRedCircleStyle():any {
    const { friendsWidth, friendsXOffset } = this.state
    const redCircleStyle = {
      position: 'absolute',
      top: 5,
      width: friendsWidth - 10,
      height: (friendsWidth + 60) * 0.55,
      right: friendsXOffset + 10,
      zIndex: 2
    }

    return redCircleStyle
  }

  setFriendsPosition(event) {
    const { layout } = event.nativeEvent
    const friendsWidth = Math.round(layout.width)
    const friendsXOffset = Math.round(layout.x)
    this.setState({ friendsWidth, friendsXOffset })
  }

  render() {
    const kSmallScreenThreshold = 320 // e.g. iPhone SE
    const { width } = Dimensions.get('window')
    const logoSize = (width > kSmallScreenThreshold) ? "normal" : "small"
    const logoContainerStyle = (width > kSmallScreenThreshold) ? accountStyle.dashboardLogo : accountStyle.dashboardLogoSmall
    const fakeFriend = new Friend('1234567890123456789012345678901234567890', friendShell)

    const settingsButton = (<View style={[accountStyle.settingsButton, {top: 0}]}>
      <View style={accountStyle.settingsTriangleLeft}/>
      <TouchableHighlight onPress={() => null} underlayColor='aqua'>
        <View style={accountStyle.settingsBackground}>
          <Image source={require('images/settings.png')} style={tabStyle.settingsButton} />
        </View>
      </TouchableHighlight>
      <View style={accountStyle.settingsTriangleRight}/>
    </View>)

    return (
      <ScrollView>
        <View style={general.view}>
          <View style={[accountStyle.dashboardContainer, {marginTop: 0}]}>
            <View style={logoContainerStyle}>
              <TextLogo name='white' size={logoSize}/>
            </View>
            <View style={tabStyle.leftTriangle}/>
            <View style={tabStyle.tabsContainer}>
              <Icon name="ios-home" style={tabStyle.icon}/>
              <View style={tabStyle.underlineActive} onLayout={event => this.setFriendsPosition(event)}>
                <Icon name="ios-people" style={tabStyle.icon}/>
              </View>
              <Icon name="md-swap" style={tabStyle.icon}/>
            </View>
          </View>
          {settingsButton}
        </View>

        <View style={style.topView}>
          <Text style={style.caption}>{walkthrough.step2.getStarted}</Text>
          <Button small round text={inviteFriends} onPress={() => null} />
          <Text style={style.caption}>{walkthrough.step2.friendsScreen}</Text>

          <View style={formStyle.horizontalView}>
            <View style={formStyle.textInputContainer}>
              <InputImage name='search' />
              <TextInput style={formStyle.textInput} underlineColorAndroid='transparent' clearButtonMode='always' onChangeText={() => null} value={fakeFriend.nickname} />
            </View>
          </View>
          <Row content={fakeFriend} onPress={() => null} picId={fakeFriend.address}/>
        </View>
      </ScrollView>
    )
  }
}
