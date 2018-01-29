import React from 'react'
import DashboardNavigator from './dashboard'
import MyAccount from 'ui/dialogs/my-account'
import AddDebt from 'ui/dialogs/add-debt'
import ConfirmationScreen from 'ui/dialogs/confirmation-screen'
import PendingTransactionDetail from 'ui/dialogs/pending-transaction-detail'
import PendingSettlementDetail from 'ui/dialogs/pending-settlement-detail'
import SettleUp from 'ui/dialogs/settle-up'
import FriendDetail from 'ui/dialogs/friend-detail'
import TransferEth from 'ui/dialogs/transfer-eth'
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { View, ScrollView, Text, StyleSheet, Button, BackHandler } from 'react-native';
import { getCurrentRoute } from 'reducers/nav'
import { getStore } from 'reducers/app'

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
  },
  TransferEth: {
    screen: TransferEth
  }
},
  {
    mode: 'modal',
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false
    }
  }
)

interface Props {
  navigation: any
  state: any
}

class AppWithNavigationState extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { navigation, state } = this.props
    BackHandler.addEventListener('hardwareBackPress', () => {
      return navigation.goBack(null)
    });
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
    nav: state.nav, state: getStore(state)() }))(({ dispatch, nav, state }) => (
  <AppWithNavigationState navigation={addNavigationHelpers({ dispatch, state: nav })} state={state} />
))
