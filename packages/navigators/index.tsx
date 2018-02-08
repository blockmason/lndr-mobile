import React from 'react'
import DashboardNavigator from './dashboard'
import MyAccount from 'ui/dialogs/my-account'
import AddDebt from 'ui/dialogs/add-debt'
import ConfirmationScreen from 'ui/dialogs/confirmation-screen'
import PendingTransactionDetail from 'ui/dialogs/pending-transaction-detail'
import PendingSettlementDetail from 'ui/dialogs/pending-settlement-detail'
import SettleUp from 'ui/dialogs/settle-up'
import FriendDetail from 'ui/dialogs/friend-detail'
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { View, ScrollView, Text, StyleSheet, Button, BackHandler } from 'react-native';

export const AppNavigator = StackNavigator({
  Dashboard: {
    screen: DashboardNavigator
  },
  MyAccount: {
    screen: MyAccount
  },
  PendingTransaction: {
    screen: PendingTransactionDetail
  },
  SettleUp: {
    screen: SettleUp
  },
  PendingSettlement: {
    screen: PendingSettlementDetail
  },
  FriendDetail: {
    screen: FriendDetail
  }
},
  {
    mode: 'modal',
    headerMode: 'none'
  }
)

interface Props {
  navigation: any
}

class AppWithNavigationState extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { navigation } = this.props
    BackHandler.addEventListener('hardwareBackPress', () => navigation.goBack(null));
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () => null);
  }

  render() {
    return <AppNavigator navigation={this.props.navigation} />
  }
}

export default connect(
  state => ({
    nav: state.nav }))(({ dispatch, nav }) => (
  <AppWithNavigationState navigation={addNavigationHelpers({ dispatch, state: nav })} />
))
