import React from 'react'
import DashboardNavigator from './dashboard'
import MyAccount from 'ui/dialogs/my-account'
import AddDebt from 'ui/dialogs/add-debt'
import ConfirmationScreen from 'ui/dialogs/confirmation-screen'
import PendingTransactionDetail from 'ui/dialogs/pending-transaction-detail'
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
  AddDebt: {
    screen: AddDebt
  },
  Confirmation: {
    screen: ConfirmationScreen
  },
  PendingTransactionDetail:{
    screen: PendingTransactionDetail
  }
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

