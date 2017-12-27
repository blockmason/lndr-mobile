import React, { Component } from 'react'

import Engine from 'lndr/engine'

import { View, Text } from 'react-native'

import { Tab } from 'ui/components/tabs'
import ActionButton from 'ui/components/action-button'
import Badge from 'ui/components/badge'

import AndroidStatusBar from 'ui/components/android-status-bar'

import general from 'theme/general'
import style from 'theme/account'

import { accountViewLanguage } from 'language'

interface Props {
  engine: Engine
}

import Button from 'ui/components/button'
import { NavigationActions } from 'react-navigation';
import { updateFocus } from 'react-navigation-is-focused-hoc'

import { TabNavigator } from 'react-navigation'
import HomeView from './home'
import FriendsView from './friends'
import PendingView from './activity/pending'

import TabStyle from 'theme/tabs'

export default class AccountView extends Component<Props> {
  home: any
  navigator: any
  homeTab: any
  friendsTab: any
  activityTab: any

  routeTo(route) {
      this.navigator && this.navigator.dispatch(
      NavigationActions.navigate({ routeName: route })
    )
  }

  handleOnNavigationStateChange(_prevState, currentState) {
    const currentRoute = currentState.routes[currentState.index].key
    this.homeTab.setActive(currentRoute === 'Home')
    this.friendsTab.setActive(currentRoute === 'Friends')
    this.activityTab.setActive(currentRoute === 'Activity')
    updateFocus(currentState)
  }

  render() {
    const { engine } = this.props

    // TODO - Move the screens out into their own js file when the ActionButton doesn't reference the HomeView
    const HomeScreen = () => <HomeView engine={engine} ref={home => this.home = home} />;
    const FriendsScreen = () => <FriendsView engine={engine} />;
    const ActivityScreen = () => <PendingView engine={engine} />;

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

    const AppWithNavigation = TabNavigator(RouteConfig, TabNavigatorConfig)

    return <View style={[general.flex, style.whiteBackground]}>
      <AndroidStatusBar />
      <Text style={style.topText}>{accountViewLanguage.lndr}</Text>
      <View style={[TabStyle.tabsContainer]}>
        <Tab onPress={() => this.routeTo('Home')} text="Home" ref={homeTab => { this.homeTab = homeTab }} />
        <Tab onPress={() => this.routeTo('Friends')} text="Friends" ref={friendsTab => { this.friendsTab = friendsTab }}/>
        <Tab onPress={() => this.routeTo('Activity')} text="Activity" ref={activityTab => { this.activityTab = activityTab }}/>
      </View>
      <AppWithNavigation
        engine={engine}
        onNavigationStateChange={this.handleOnNavigationStateChange.bind(this)}
        ref={nav => { this.navigator = nav }}
      />
      <ActionButton
        onLogout={() => engine.logoutAccount()}
        onMyAccount={() => this.home.showMyAccount()}
      />
    </View>
  }
}
