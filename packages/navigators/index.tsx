import React from 'react'
import { BackHandler } from 'react-native'
import { addNavigationHelpers, StackNavigator } from 'react-navigation'
import { connect } from 'react-redux'

import DashboardNavigator from './dashboard'
import MyAccount from 'ui/dialogs/my-account'
import AddDebt from 'ui/dialogs/add-debt'
import ConfirmationScreen from 'ui/dialogs/confirmation-screen'
import PendingTransactionDetail from 'ui/dialogs/pending-transaction-detail'
import PendingSettlementDetail from 'ui/dialogs/pending-settlement-detail'
import SettleUp from 'ui/dialogs/settle-up'
import Settlement from 'ui/dialogs/settlement'
import FriendDetail from 'ui/dialogs/friend-detail'
import TransferEth from 'ui/dialogs/transfer-eth'
import TransferBcpt from 'ui/dialogs/transfer-bcpt'
import FriendRequest from 'ui/dialogs/friend-request'
import PayPalRequestDetail from 'ui/dialogs/paypal-request-detail'
import RemoveAccountView from 'ui/dialogs/remove-account'

import {
  createReactNavigationReduxMiddleware,
  createReduxBoundAddListener,
} from 'react-navigation-redux-helpers';


const middleware = createReactNavigationReduxMiddleware(
  "root",
  (state: any) => state.nav,
);

const addListener = createReduxBoundAddListener("root");

export const AppNavigator = StackNavigator(
  {
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
    Settlement: {
      screen: Settlement
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
    },
    RemoveAccount: {
      screen: RemoveAccountView
    },
    PayPalRequest: PayPalRequestDetail
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
  _addListener: any

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
    if(nav.routes instanceof Array && nav.routes[1] && nav.routes[1].routeName === 'FriendDetail') {
      return true
    } else if (nav.index === 0 && nav.routes[0].index === 0) {
      BackHandler.exitApp()
      return false
    }
    navigation.goBack(null)
    return true
  }

  render() {
    return <AppNavigator navigation={this.props.navigation} />
  }
}

export default connect(
  (state: any) => ({
    nav: state.nav }))(({ dispatch, nav }) => (
  <AppWithNavigationState navigation={addNavigationHelpers({ dispatch, state: nav, addListener })} nav={nav} swipeEnabled={false} />
))
