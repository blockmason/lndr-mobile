import React, { Component } from 'react'

// TODO Remove button / go through the entire import dependecy list
import { View, NetInfo } from 'react-native'

import firebase from 'react-native-firebase'
import SplashScreen from 'react-native-splash-screen'
import { connect, Provider } from 'react-redux'
import { Toast, ToastActionsCreators } from 'react-native-redux-toast'

import AuthenticateView from 'ui/views/authenticate'
import WelcomeView from 'ui/views/welcome'
import PrivacyPolicyView from 'ui/views/privacy-policy'
import { PopupTarget } from 'ui/components/popup'
import AndroidStatusBar from 'ui/components/android-status-bar'

import { UserData } from 'lndr/user'
import { defaultCurrency } from 'lndr/currencies'
import createStore from 'store'
import { setWelcomeComplete, initializeStorage, verifyPrivacyPolicy, setConnectionStatus } from 'actions'
import { getStore, getUser } from 'reducers/app'
import AppWithNavigationState from 'navigators'

import style from 'theme/general'
import NetworkNotifierView from 'ui/views/network'

interface AppContentsProps {
  initializeStorage: () => any
  setWelcomeComplete: () => any
  verifyPrivacyPolicy: () => any
  setConnectionStatus: (state: any) => any
  user: UserData
  state: any
}

const initialState = {
  hasStoredUser: false,
  welcomeComplete: false,
  privacyPolicyVerified: false,
  isAuthLoading: false,
  shouldRecoverAccount: false,
  shouldRemoveAccount: false,
  shouldDisplayMnemonic: false,
  isInitializing: true,
  friendsLoaded: false,
  friends: [],
  balances: [],
  recentTransactionsLoaded: false,
  recentTransactions: [],
  pendingTransactionsLoaded: false,
  pendingFriendsLoaded: false,
  pendingTransactions: [],
  pendingSettlements: [],
  pendingFriends: [],
  pendingOutboundFriends: [],
  bilateralSettlements: [],
  notificationsEnabled: true,
  ethBalance: '0',
  ethPrices: {},
  userPic: '',
  ucacAddresses: {},
  ethTransactions: [],
  primaryCurrency: defaultCurrency,
  payPalRequests: [],
  payPalRequestsLoaded: false,
  channelID: '',
  initialHomeLoad: 'Friends',
  isConnected: true,
  identityVerificationStatus: {status: null}
}

const store = createStore(initialState)

// TODO Move this route based code into navigators
class AppContentsView extends Component<AppContentsProps> {
  constructor (props) {
    super(props)
    this.handleConnection = this.handleConnection.bind(this)
}

  componentDidMount() {
    this.props.initializeStorage()
    SplashScreen.hide()
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnection)
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnection)
  }

  handleConnection = isConnected => {
    this.props.setConnectionStatus(isConnected)
  }

  render() {
    const {
      isInitializing,
      welcomeComplete,
      privacyPolicyVerified,
      shouldDisplayMnemonic,
      isConnected
    } = this.props.state

    if (isInitializing) {
      return <View />
    }
    if (!welcomeComplete) {
      return <WelcomeView onComplete={this.props.setWelcomeComplete}/>
    }
    if (!isConnected) {
      return <NetworkNotifierView onConnected={this.props.setConnectionStatus}/>
    }
    if (!privacyPolicyVerified) {
      return <PrivacyPolicyView onVerify={this.props.verifyPrivacyPolicy}/>
    }
    if (!this.props.user || shouldDisplayMnemonic) {
      return <AuthenticateView />
    }

    return <AppWithNavigationState />
  }
}

const mapStateToProps = (state) => ({ state: getStore(state)(), user: getUser(state)() })
const mapDispatchToProps = (dispatch) => ({
  setWelcomeComplete: () => dispatch(setWelcomeComplete(true)),
  setConnectionStatus: (connectionInfo) => dispatch(setConnectionStatus(connectionInfo)),
  verifyPrivacyPolicy: () => dispatch(verifyPrivacyPolicy(true)),
  initializeStorage: () => dispatch(initializeStorage())
})

const AppContents = connect(mapStateToProps, mapDispatchToProps)(AppContentsView)

export default class AppView extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={style.isX}>
          <AndroidStatusBar />
          <PopupTarget />
          <AppContents />
          <Toast />
        </View>
      </Provider>
    )
  }
}
