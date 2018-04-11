import React from 'react'
import DashboardNavigator from './dashboard'
import MyAccount from 'ui/dialogs/my-account'
import AddDebt from 'ui/dialogs/add-debt'
import ConfirmationScreen from 'ui/dialogs/confirmation-screen'
import PendingTransactionDetail from 'ui/dialogs/pending-transaction-detail'
import PendingSettlementDetail from 'ui/dialogs/pending-settlement-detail'
import SettleUp from 'ui/dialogs/settle-up'
import EthSettlement from 'ui/dialogs/eth-settlement'
import NonPaymentSettlement from 'ui/dialogs/non-payment-settlement'
import FriendDetail from 'ui/dialogs/friend-detail'
import TransferEth from 'ui/dialogs/transfer-eth'
import TransferBcpt from 'ui/dialogs/transfer-bcpt'
import FriendRequest from 'ui/dialogs/friend-request'
import { addNavigationHelpers, StackNavigator, NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { View, ScrollView, Text, StyleSheet, Button, BackHandler, BackAndroid } from 'react-native'

import {
  createReactNavigationReduxMiddleware,
  createReduxBoundAddListener,
} from 'react-navigation-redux-helpers';


const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);

const addListener = createReduxBoundAddListener("root");

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
  EthSettlement: {
    screen: EthSettlement
  },
  NonPaymentSettlement: {
    screen: NonPaymentSettlement
  },
  PendingSettlement: {
    screen: PendingSettlementDetail
  },
  FriendDetail: {
    screen: FriendDetail
  },
  TransferEth: {
    screen: TransferEth
  },
  TransferBcpt: {
    screen: TransferBcpt
  },
  AddDebt: {
    screen: AddDebt
  },
  Confirmation: {
    screen: ConfirmationScreen
  },
  FriendRequest: {
    screen: FriendRequest
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
  swipeEnabled: boolean
  nav: any
}

class AppWithNavigationState extends React.Component<Props> {
  constructor(props) {
    super(props);
  
    this._addListener = createReduxBoundAddListener("root");
  }

  static navigationOptions = {
    gesturesEnabled: false
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  onBackPress = () => {
    const { nav, navigation } = this.props;
    if (nav.index === 0 && nav.routes[0].index === 0) {
      BackAndroid.exitApp()
      return false;
    }
    navigation.goBack()
    return true
  }

  render() {
    return <AppNavigator navigation={this.props.navigation} />
  }
}

export default connect(
  state => ({
    nav: state.nav }))(({ dispatch, nav }) => (
  <AppWithNavigationState navigation={addNavigationHelpers({ dispatch, state: nav, addListener })} nav={nav} swipeEnabled={false} />
))
