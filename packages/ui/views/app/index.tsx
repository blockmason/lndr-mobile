import React, { Component } from 'react'

// TODO Remove button / go through the entire import dependecy list
import { View, ScrollView, Button } from 'react-native'

import firebase from 'react-native-firebase'

import AuthenticateView from 'ui/views/authenticate'
import WelcomeView from 'ui/views/welcome'
import PrivacyPolicyView from 'ui/views/privacy-policy'

import { PopupTarget } from 'ui/components/popup'
import ThemeImage from 'ui/components/images/theme-image'
import AndroidStatusBar from 'ui/components/android-status-bar'
import { UserData } from 'lndr/user'

import { Provider } from 'react-redux'
import createStore from 'store'
import { setWelcomeComplete, initializeStorage, verifyPrivacyPolicy } from 'actions'
import { getStore, getUser } from 'reducers/app'
import AppWithNavigationState from 'navigators'
import { connect } from 'react-redux'
import { Toast, ToastActionsCreators } from 'react-native-redux-toast'
import SplashScreen from 'react-native-splash-screen'

import style from 'theme/general'

interface Props {}

interface AppContentsProps {
  initializeStorage: () => any
  setWelcomeComplete: () => any
  verifyPrivacyPolicy: () => any
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
  pendingTransactions: [],
  pendingSettlements: [],
  pendingFriends: [],
  bilateralSettlements: [],
  notificationsEnabled: true,
  ethBalance: '0',
  ethPrices: {},
  bcptBalance: '0',
  bcptExchange: '0.5',
  userPic: '',
  ucacAddresses: {},
  ethTransactions: []
}

const store = createStore(initialState)

// TODO Move this route based code into navigators
class AppContentsView extends Component<AppContentsProps> {
  componentDidMount() {
    this.props.initializeStorage()
    SplashScreen.hide()
  }

  render() {
    const {
      isInitializing,
      welcomeComplete,
      privacyPolicyVerified,
      shouldDisplayMnemonic,
      displayTouchID
    } = this.props.state

    if (isInitializing) {
      return <View />
    }

    if (!welcomeComplete) {
      return <WelcomeView onComplete={this.props.setWelcomeComplete}/>
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
