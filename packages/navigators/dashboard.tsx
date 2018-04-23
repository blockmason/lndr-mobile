import React, { Component } from 'react'
import { View, Text, Platform, TouchableHighlight, Image, Dimensions } from 'react-native'
import { TabNavigator } from 'react-navigation'

import { Tab } from 'ui/components/tabs'
import AndroidStatusBar from 'ui/components/android-status-bar'
import HomeView from 'ui/views/account/home'
import FriendsView from 'ui/views/account/friends'
import ActivityView from 'ui/views/account/activity'
import TextLogo from 'ui/components/images/text-logo'

import { isFocusingOn } from 'reducers/nav'
import { getNeedsReviewCount } from 'reducers/app'
import { logoutAccount } from 'actions'

import { connect } from 'react-redux'

import language from 'language'

const {
  accountViewLanguage,
  tabs
 } = language

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
  needsReviewTransactionsCount: number
}

class DashboardNavigatorWithHeader extends Component<Props> {

  static router = DashboardNavigator.router

  componentWillMount() {
    //check if navigating from the confirmation, in which case navigate to activity
    const to = this.props.navigation.state.params ? this.props.navigation.state.params.to : null

    if (to === 'activity') {
      this.props.navigation.navigate('Activity')
    }
  }

  render() {
    const kSmallScreenThreshold = 320 // e.g. iPhone SE
    const { width } = Dimensions.get('window')
    const logoSize = (width > kSmallScreenThreshold) ? "normal" : "small"
    const logoContainerStyle = (width > kSmallScreenThreshold) ? style.dashboardLogo : style.dashboardLogoSmall
    const tabContainer = (width > kSmallScreenThreshold) ? TabStyle.tabContainer : { marginRight: 5}

    return (
      <View style={general.whiteFlex}>
        <AndroidStatusBar />
        <View style={style.dashboardBackground}>
          <View style={style.dashboardContainer}>
            <View style={logoContainerStyle}>
              <TextLogo name='white' size={logoSize}/>
            </View>
            <View style={TabStyle.leftTriangle}/>
            <View style={TabStyle.tabsContainer}>
              <Tab style={tabContainer} onPress={() => this.props.navigation.navigate('Home')} text={tabs.home} alerts={this.props.needsReviewTransactionsCount} active={this.props.isFocusingOn('Home')} />
              <Tab style={tabContainer} onPress={() => this.props.navigation.navigate('Friends')} text={tabs.friends} active={this.props.isFocusingOn('Friends')} />
              <Tab style={tabContainer} onPress={() => this.props.navigation.navigate('Activity')} text={tabs.activity} active={this.props.isFocusingOn('Activity')} />
            </View>
          </View>
        </View>
        <View style={style.settingsTriangleLeft}/>
        <View style={style.settingsBackground}>
          <TouchableHighlight onPress={() => this.props.navigation.navigate('MyAccount')}>
            <Image source={require('images/settings.png')} style={TabStyle.settingsButton} />
          </TouchableHighlight>
        </View>
        <View style={style.settingsTriangleRight}/>


        <DashboardNavigator navigation={this.props.navigation}/>
      </View>
    )
  }
}

export default connect((state) => ({ isFocusingOn: isFocusingOn(state), needsReviewTransactionsCount: getNeedsReviewCount(state) }), { logoutAccount })(DashboardNavigatorWithHeader)
