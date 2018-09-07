import React, { Component } from 'react'
import { Image, View, Text, ScrollView, TouchableHighlight, Dimensions } from 'react-native'
import firebase from 'react-native-firebase'

import Button from 'ui/components/button'
import AndroidStatusBar from 'ui/components/android-status-bar'
import TextLogo from 'ui/components/images/text-logo'

import general from 'theme/general'
import style from 'theme/slide'
import tabStyle from 'theme/tabs'
import accountStyle from 'theme/account'

import languageText, {language} from 'language'
const { walkthrough, inviteFriends, tabs } = languageText

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
      width: friendsWidth + 20,
      height: (friendsWidth + 20) * 0.55,
      right: language === 'ja' ? friendsXOffset + 45 : friendsXOffset + 8,
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
              <Image style={this.getRedCircleStyle()} source={require('images/drawn-circle-red.png')}/>
              <Text style={style.dashboardText}>{tabs.home}</Text>
              <View style={tabStyle.underlineActive} onLayout={event => this.setFriendsPosition(event)}>
                <Text style={style.dashboardText}>{tabs.friends}</Text>
              </View>
              <Text style={style.dashboardText}>{tabs.activity}</Text>
            </View>
          </View>
          {settingsButton}
        </View>

        <View style={style.topView}>
          <Text style={style.caption}>{walkthrough.step2.getStarted}</Text>
          <Button small round text={inviteFriends} onPress={() => null} />
          <Text style={style.caption}>{walkthrough.step2.friendsScreen}</Text>

          <Image style={style.fullWidthImage35} source={require('images/walkthrough2-sample.png')} />
        </View>
      </ScrollView>
    )
  }
}
