import React from 'react'
import { BackHandler } from 'react-native'
import { addNavigationHelpers, StackNavigator } from 'react-navigation'
import { connect } from 'react-redux'

import DashboardNavigator from './dashboard'
import MyAccount from 'ui/dialogs/my-account'
import NewTransaction from 'ui/dialogs/new-transaction'
import Confirmation from 'ui/dialogs/confirmation'
import RequestDetail from 'ui/dialogs/request-detail'
import Settlement from 'ui/dialogs/settlement'
import FriendDetail from 'ui/dialogs/friend-detail'
import TransferERC20 from 'ui/dialogs/transfer-erc20'
import FriendRequest from 'ui/dialogs/friend-request'
import RemoveAccountView from 'ui/dialogs/remove-account'
import VerifyIdentityForm from 'ui/forms/verify-identity'
import Wallet from 'ui/dialogs/wallet'

import {
  createReactNavigationReduxMiddleware,
  createReduxBoundAddListener,
} from 'react-navigation-redux-helpers';


const middleware = createReactNavigationReduxMiddleware(
  "root",
  (state: any) => state.nav,
);

const addListener = createReduxBoundAddListener("root")

export const AppNavigator = StackNavigator(
  {
    Dashboard: {
      screen: DashboardNavigator
    },
    MyAccount: {
      screen: MyAccount
    },
    Settlement: {
      screen: Settlement
    },
    RequestDetail: {
      screen: RequestDetail
    },
    FriendDetail: {
      screen: FriendDetail
    },
    TransferERC20: {
      screen: TransferERC20
    },
    NewTransaction: {
      screen: NewTransaction
    },
    Confirmation: {
      screen: Confirmation
    },
    FriendRequest: {
      screen: FriendRequest
    },
    RemoveAccount: {
      screen: RemoveAccountView
    },
    VerifyIdentityForm: {
      screen: VerifyIdentityForm
    },
    Wallet: {
      screen: Wallet
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
