import React from 'react'
import DashboardNavigator from './dashboard'
import MyAccount from 'ui/dialogs/my-account'
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { View, ScrollView, Text, StyleSheet, Button } from 'react-native';

export const AppNavigator = StackNavigator({
  Dashboard: {
    screen: DashboardNavigator
  },
  MyAccount: {
    screen: MyAccount
  },
},
  {
    mode: 'modal',
    headerMode: 'none'
  }
)

export default connect(
  state => ({
    nav: state.nav, }))(({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
))

