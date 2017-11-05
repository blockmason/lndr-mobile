import React, { Component } from 'react' // eslint-disable-line no-unused-vars;
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/Ionicons'
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog'
import {
    View,
    NetInfo
} from 'react-native'
// import { Notifications } from 'expo'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateFriends, updatePending, updateDebts } from '../actions/data'
import { updateCount } from '../actions/updateCount'

// import { registerForPushNotificationsAsync } from '../utils/SetupPushNotifications'
import { process } from '../utils/ProcessNotification'
import { retrievePrivateKey } from '../utils/SecureDataStore'

import AddDebt from '../components/dialogs/addDebt/AddDebt'
import AddFriend from '../components/dialogs/addFriend/AddFriend'
import ShowAccount from '../components/dialogs/showAccount/ShowAccount'
import SetupAccount from '../components/dialogs/setupAccount/SetupAccount'

import StatusAlert from '../components/status/StatusAlert'

import { Navigator } from '../components/navigation/Navigation'

import styles from '../screens/styles'

import { createTables, executeTransaction } from '../utils/Storage'

const slideFromBottom = new SlideAnimation({ slideFrom: 'bottom' })

export class AppContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      online: true
    }
  }

  handleNotification (notification) {
    // this in prod
    // process(notification);

    // example notification
    const notificationExample = {
      action: 'NEW_FRIEND_REQUEST',
      value: 'test'
    }

    process(notificationExample)
  }

  handleConnectivityChange (isConnected) {
    const options = {
      type: isConnected ? 'success' : 'warn',
      title: isConnected ? 'app online' : 'app offline',
      body: ''
    }

    if (isConnected !== this.state.online) {
      this.statusAlert.display(options)

      this.setState({
        online: isConnected
      })
    }
  }

  componentWillUnmount () {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      isConnected => this.handleConnectivityChange(isConnected)
    )
  }

  componentDidMount () {
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      isConnected => this.handleConnectivityChange(isConnected)
    )

    retrievePrivateKey().then((result) => {
      console.log(result)
      if (!result) {
        this.showSetupDialog.show() // show if no private key
      }
    })
    // push notifications setup - enabled for testing
    // registerForPushNotificationsAsync();
    // this.notificationSubscription = Notifications.addListener(this.handleNotification);

    // dropAll();
    createTables(() => {
      console.log('get data')

      const actions = this.props.actions
      const friends = {
        table: 'friends',
        action: 'select'
      }

      executeTransaction(friends, (result) => {
        actions.updateFriends(result.rows._array)
      })

      const pending = {
        table: 'pending',
        action: 'select'
      }

      executeTransaction(pending, (result) => {
        const data = result.rows._array

        actions.updatePending(data)
        actions.updateCount(data.length)
      })

      const debts = {
        table: 'debts',
        action: 'select'
      }

      executeTransaction(debts, (result) => {
        const data = result.rows._array
        actions.updateDebts(data)
      })
    })
  }

  renderSetupAccount () {
    return (
      <PopupDialog
        height={null}
        dialogTitle={<DialogTitle title='Friend in Debt' />}
        dismissOnTouchOutside={false}
        ref={(showSetupDialog) => { this.showSetupDialog = showSetupDialog }}
        dialogAnimation={slideFromBottom}>
        <SetupAccount
          dismiss={() => { this.showSetupDialog.dismiss() }} />
      </PopupDialog>
    )
  }

  renderShowAccount () {
    return (
      <PopupDialog
        height={null}
        dialogTitle={<DialogTitle title='My Account' />}
        ref={(showAccountDialog) => { this.showAccountDialog = showAccountDialog }}
        dialogAnimation={slideFromBottom}>
        <ShowAccount
          dismiss={() => { this.showAccountDialog.dismiss() }} />
      </PopupDialog>
    )
  }

  renderAddDebt () {
    return (
      <PopupDialog
        height={null}
        dialogTitle={<DialogTitle title='Create Debt' />}
        ref={(createDebtDialog) => { this.createDebtDialog = createDebtDialog }}
        dialogAnimation={slideFromBottom}>
        <AddDebt
          dismiss={() => { this.createDebtDialog.dismiss() }} />
      </PopupDialog>
    )
  }

  renderAddFriend () {
    return (
      <PopupDialog
        height={null}
        dialogTitle={<DialogTitle title='Add a new friend' />}
        ref={(createAddFriendDialog) => { this.createAddFriendDialog = createAddFriendDialog }}
        dialogAnimation={slideFromBottom}>
        <AddFriend
          dismiss={() => { this.createAddFriendDialog.dismiss() }} />
      </PopupDialog>
    )
  }

  render () {
    return (
      <View style={{flex: 1}}>
        <Navigator />
        <ActionButton buttonColor='rgba(231,76,60,1)'>
          <ActionButton.Item buttonColor='#26c6da' title='My account' onPress={() => this.showAccountDialog.show()}>
            <Icon name='md-stats' style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#00AA8D' title='Add new friend' onPress={() => this.createAddFriendDialog.show()}>
            <Icon name='md-people' style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#9b59b6' title='Add new debt' onPress={() => this.createDebtDialog.show()}>
            <Icon name='md-cash' style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
        <StatusAlert
          display={'screen'}
          closeInterval={2000}
          ref={(statusAlert) => { this.statusAlert = statusAlert }} />
        {this.renderSetupAccount()}
        {this.renderShowAccount()}
        {this.renderAddDebt()}
        {this.renderAddFriend()}
      </View>
    )
  }
}

export const mapStateToProps = ({ friends }) => ({ state: friends })

export const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ updateDebts, updateFriends, updatePending, updateCount }, dispatch) })

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
