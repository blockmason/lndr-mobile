import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { TabNavigator } from 'react-navigation'

import { Tab } from 'ui/components/tabs'
import AndroidStatusBar from 'ui/components/android-status-bar'
import HomeView from 'ui/views/account/home'
import FriendsView from 'ui/views/account/friends'
import ActivityView from 'ui/views/account/activity'
import ActionButton from 'ui/components/action-button'
import TextLogo from 'ui/components/images/text-logo'

import { isFocusingOn } from 'reducers/nav'
import { logoutAccount, getPendingTransactions } from 'actions'

import { connect } from 'react-redux'

import { accountViewLanguage } from 'language'

import general from 'theme/general'
import style from 'theme/account'
import TabStyle from 'theme/tabs'

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

interface Props {
  navigation: any
  logoutAccount: () => any
  isFocusingOn: (screenName: string) => boolean
}

class DashboardNavigatorWithHeader extends Component<Props> {
  static router = DashboardNavigator.router

  render() {
    const alerts = getPendingTransactions().length === undefined ? 0 : getPendingTransactions().length

    return (
      <View style={[general.whiteFlex]}>
        <AndroidStatusBar />
        <View style={{backgroundColor: '#242424', height: 80, flexDirection: 'row'}}>
          <View style={{marginTop: 30, marginBottom: 20, marginLeft: 15, width: 90}}>
            <TextLogo name='white'/>
          </View>
          <View style={TabStyle.leftTriangle}/>
          <View style={[TabStyle.tabsContainer]}>
            <Tab onPress={() => this.props.navigation.navigate('Home')} text="HOME" alerts={alerts} active={this.props.isFocusingOn('Home')} />
            <Tab onPress={() => this.props.navigation.navigate('Friends')} text="FRIENDS" active={this.props.isFocusingOn('Friends')} />
            <Tab onPress={() => this.props.navigation.navigate('Activity')} text="ACTIVITY" active={this.props.isFocusingOn('Activity')} />
          </View>
        </View>
        <View style={style.settingsTriangleLeft}/>
        <View style={style.settingsBackground}/>
        <View style={style.settingsTriangleRight}/>
        <ActionButton
          onLogout={this.props.logoutAccount}
          onMyAccount={() => this.props.navigation.navigate('MyAccount')}
        />
        <DashboardNavigator navigation={this.props.navigation}/>
      </View>
    )
  }
}

export default connect((state) => ({ isFocusingOn: isFocusingOn(state) }), { logoutAccount })(DashboardNavigatorWithHeader)
