import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { TabNavigator } from 'react-navigation'

import { Tab } from 'ui/components/tabs'
import AndroidStatusBar from 'ui/components/android-status-bar'
import HomeView from 'ui/views/account/home'
import FriendsView from 'ui/views/account/friends'
import PendingView from 'ui/views/account/activity/pending'
import ActionButton from 'ui/components/action-button'

import { isFocusingOn } from 'reducers/nav'
import { logoutAccount } from 'actions'

import { connect } from 'react-redux'

import { accountViewLanguage } from 'language'

import general from 'theme/general'
import style from 'theme/account'
import TabStyle from 'theme/tabs'

const HomeScreen = () => <HomeView />;
const FriendsScreen = () => <FriendsView />;
const ActivityScreen = () => <PendingView />;

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

interface Props {
  navigation: any
  logoutAccount: () => any
  isFocusingOn: (screenName: string) => boolean
}

class DashboardNavigatorWithHeader extends Component<Props> {
  static router = DashboardNavigator.router;

  render() {
    return (
      <View style={[general.flex, style.whiteBackground]}>
        <AndroidStatusBar />
        <Text style={style.topText}>{accountViewLanguage.lndr}</Text>
        <View style={[TabStyle.tabsContainer]}>
          <Tab onPress={() => this.props.navigation.navigate('Home')} text="Home" active={this.props.isFocusingOn('Home')} />
          <Tab onPress={() => this.props.navigation.navigate('Friends')} text="Friends" active={this.props.isFocusingOn('Friends')} />
          <Tab onPress={() => this.props.navigation.navigate('Activity')} text="Activity" active={this.props.isFocusingOn('Activity')} />
        </View>
        <DashboardNavigator navigation={this.props.navigation}/>
        <ActionButton
          onLogout={this.props.logoutAccount}
          onMyAccount={() => this.props.navigation.navigate('MyAccount')}
        />
      </View>
    )
  }
}

export default connect((state) => ({ isFocusingOn: isFocusingOn(state) }), { logoutAccount })(DashboardNavigatorWithHeader)
