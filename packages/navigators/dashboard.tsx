import React, { Component } from 'react'
import { View, Text, Platform } from 'react-native'
import { TabNavigator } from 'react-navigation'

import { Tab } from 'ui/components/tabs'
import AndroidStatusBar from 'ui/components/android-status-bar'
import HomeView from 'ui/views/account/home'
import FriendsView from 'ui/views/account/friends'
import ActivityView from 'ui/views/account/activity'
import AddDebt from 'ui/dialogs/add-debt'
import Confirmation from 'ui/dialogs/confirmation-screen'
import ActionButton from 'ui/components/action-button'
import TextLogo from 'ui/components/images/text-logo'

import { isFocusingOn } from 'reducers/nav'
import { getPendingTransactionsCount } from 'reducers/app'
import { logoutAccount } from 'actions'

import { connect } from 'react-redux'

import { 
  accountViewLanguage,
  tabs
 } from 'language'

import general from 'theme/general'
import style from 'theme/account'
import TabStyle from 'theme/tabs'

const HomeScreen = (props) => <HomeView {...props}/>;
const FriendsScreen = (props) => <FriendsView {...props} />;
const ActivityScreen = (props) => <ActivityView {...props} />;
const AddDebtScreen = (props) => <AddDebt {...props} />;
const ConfirmationScreen = (props) => <Confirmation {...props} />;

const RouteConfig = {
  Home: { screen: HomeScreen },
  Friends: { screen: FriendsScreen },
  Activity: { screen: ActivityScreen },
  AddDebt: { screen: AddDebtScreen },
  Confirmation: { screen: ConfirmationScreen }
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
  pendingTransactionsCount: number
}

class DashboardNavigatorWithHeader extends Component<Props> {

  static router = DashboardNavigator.router

  render() {

    return (
      <View style={general.whiteFlex}>
        <AndroidStatusBar />
        <View style={style.dashboardBackground}>
          <View style={style.dashboardContainer}>
            <View style={style.dashboardLogo}>
              <TextLogo name='white'/>
            </View>
            <View style={TabStyle.leftTriangle}/>
            <View style={[TabStyle.tabsContainer]}>
              <Tab onPress={() => this.props.navigation.navigate('Home')} text={tabs.home} alerts={this.props.pendingTransactionsCount} active={this.props.isFocusingOn('Home')} />
              <Tab onPress={() => this.props.navigation.navigate('Friends')} text={tabs.friends} active={this.props.isFocusingOn('Friends')} />
              <Tab onPress={() => this.props.navigation.navigate('Activity')} text={tabs.activity} active={this.props.isFocusingOn('Activity')} />
            </View>
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

export default connect((state) => ({ isFocusingOn: isFocusingOn(state), pendingTransactionsCount: getPendingTransactionsCount(state) }), { logoutAccount })(DashboardNavigatorWithHeader)
