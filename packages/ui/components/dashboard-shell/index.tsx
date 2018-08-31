import React, { Component } from 'react'
import { View, Text, Image, TouchableHighlight, Dimensions } from 'react-native'
import { TabNavigator } from 'react-navigation'

import AndroidStatusBar from 'ui/components/android-status-bar'
import HomeView from 'ui/views/account/home'
import FriendsView from 'ui/views/account/friends'
import ActivityView from 'ui/views/account/activity'
import TextLogo from 'ui/components/images/text-logo'

import { isFocusingOn } from 'reducers/nav'
import { logoutAccount } from 'actions'

import { connect } from 'react-redux'

import language from 'language'
const {
  accountViewLanguage,
  tabs
 } = language

import general from 'theme/general'
import style from 'theme/account'
import tabStyle from 'theme/tabs'

interface Props {
  logoutAccount: () => any
  isFocusingOn: () => any
  text?: String
  navigation: any
  hideSettings?: boolean
}

const HomeScreen = (props) => <HomeView {...props}/>;
const FriendsScreen = (props) => <FriendsView {...props} />;
const ActivityScreen = (props) => <ActivityView {...props} />;

const RouteConfig = {
  Home: { screen: HomeScreen },
  Friends: { screen: FriendsScreen },
  Activity: { screen: ActivityScreen }
}

const TabNavigatorConfig = {
  tabBarComponent: () => null,
  swipeEnabled: true,
  animationEnabled: true
}

const DashboardNavigator = TabNavigator(RouteConfig, TabNavigatorConfig)

class DashboardShell extends Component<Props> {
  render() {
    const kSmallScreenThreshold = 320 // e.g. iPhone SE
    const { text, hideSettings } = this.props
    const { width } = Dimensions.get('window')
    const logoSize = (width > kSmallScreenThreshold) ? "normal" : "small"
    const logoContainerStyle = (width > kSmallScreenThreshold) ? style.dashboardLogo : style.dashboardLogoSmall

    const settingsButton = !hideSettings &&
      <View style={style.settingsButton}>
        <View style={style.settingsTriangleLeft}/>
        <TouchableHighlight onPress={() => this.props.navigation.navigate('MyAccount')} underlayColor='aqua'>
          <View style={style.settingsBackground}>
            <Image source={require('images/settings.png')} style={tabStyle.settingsButton} />
          </View>
        </TouchableHighlight>
        <View style={style.settingsTriangleRight}/>
      </View>

    return (
      <View style={general.view}>
        <AndroidStatusBar />
        <View style={style.dashboardContainer}>
          <View style={logoContainerStyle}>
            <TextLogo name='white' size={logoSize}/>
          </View>
          <View style={tabStyle.leftTriangle}/>
          <View style={[tabStyle.tabsContainer, style.dashboardTextContainer]}>
            <Text style={style.dashboardText}>{text}</Text>
          </View>
        </View>
        {settingsButton}
      </View>
    )
  }
}

export default connect((state) => ({ isFocusingOn: isFocusingOn(state) }), { logoutAccount })(DashboardShell)
