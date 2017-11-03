import React, { Component } from 'react';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import {
    Platform,
    View,
    NetInfo
} from 'react-native';
import { Notifications } from 'expo';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateFriends, updatePending, updateDebts } from '../actions/data';
import { updateCount } from '../actions/updateCount';

import { registerForPushNotificationsAsync } from '../utils/SetupPushNotifications';
import { process } from '../utils/ProcessNotification';
import { retrievePrivateKey } from '../utils/SecureDataStore';

import AddDebt from '../components/dialogs/addDebt/AddDebt';
import AddFriend from '../components/dialogs/addFriend/AddFriend';
import ShowAccount from '../components/dialogs/showAccount/ShowAccount';
import SetupAccount from '../components/dialogs/setupAccount/SetupAccount';

import StatusAlert from '../components/status/StatusAlert';

import { Navigator } from '../components/navigation/Navigation';

import styles from '../screens/styles';

import { createTables, dropAll, executeTransaction } from '../utils/Storage';


export class AppContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      online : true
    }
  }

  handleNotification = (notification) => {
    // this in prod
    // process(notification);

    //example notification
    const notification_example = {
      action: "NEW_FRIEND_REQUEST",
      value: "test"
    }

    process(notification_example);
  };

  handleConnectivityChange = (isConnected) => {
    const options = {
      type: isConnected ? "success" : "warn",
      title: isConnected ? "app online" : "app offline",
      body: ""
    }

    if (isConnected !== this.state.online) {
      this.statusAlert.display(options);

      this.setState({
        online: isConnected
      });
    }
  };

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);

    retrievePrivateKey().then((result) => {
      console.log(result);
      if (!result) {
        this.showSetupDialog.show(); // show if no private key
      }
    })
    // push notifications setup - enabled for testing
    // registerForPushNotificationsAsync();
    // this.notificationSubscription = Notifications.addListener(this.handleNotification);

    // dropAll();
    createTables(() => {
      console.log("get data")

      const actions = this.props.actions;
      const friends = {
        table: 'friends',
        action: 'select'
      }

      executeTransaction(friends, (result) => {
        actions.updateFriends(result.rows._array)
      });

      const pending = {
        table: 'pending',
        action: 'select'
      }

      executeTransaction(pending, (result) => {
        const data = result.rows._array;

        actions.updatePending(data)
        actions.updateCount(data.length);
      });

      const debts = {
        table: 'debts',
        action: 'select'
      }

      executeTransaction(debts, (result) => {
        const data = result.rows._array;
        actions.updateDebts(data)
      });
    });
  }

  renderSetupAccount() {
    return (
      <PopupDialog
        height={null}
        dialogTitle={<DialogTitle title="Friend in debt" />}
        dismissOnTouchOutside={false}
        ref={(showSetupDialog) => { this.showSetupDialog = showSetupDialog;}}
        dialogAnimation = { new SlideAnimation({ slideFrom: 'bottom' })}>
        <SetupAccount
          dismiss={() => {this.showSetupDialog.dismiss()}}/>
      </PopupDialog>
    )
  }

  renderShowAccount() {
    return (
      <PopupDialog
        height={null}
        dialogTitle={<DialogTitle title="My Account" />}
        ref={(showAccountDialog) => { this.showAccountDialog = showAccountDialog;}}
        dialogAnimation = { new SlideAnimation({ slideFrom: 'bottom' })}>
        <ShowAccount
          dismiss={() => {this.showAccountDialog.dismiss()}}/>
      </PopupDialog>
    )
  }

  renderAddDebt() {
    return (
      <PopupDialog
        height={null}
        dialogTitle={<DialogTitle title="Create Debt" />}
        ref={(createDebtDialog) => { this.createDebtDialog = createDebtDialog;}}
        dialogAnimation = { new SlideAnimation({ slideFrom: 'bottom' })}>
        <AddDebt
          dismiss={() => {this.createDebtDialog.dismiss()}}/>
      </PopupDialog>
    )
  }

  renderAddFriend() {
    return (
      <PopupDialog
        height={null}
        dialogTitle={<DialogTitle title="Add a new friend" />}
        ref={(createAddFriendDialog) => { this.createAddFriendDialog = createAddFriendDialog;}}
        dialogAnimation = { new SlideAnimation({ slideFrom: 'bottom' })}>
        <AddFriend
          dismiss={() => {this.createAddFriendDialog.dismiss()}}/>
      </PopupDialog>
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Navigator />
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#26c6da' title="My account" onPress={() => this.showAccountDialog.show()}>
            <Icon name="md-stats" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#00AA8D' title="Add new friend" onPress={() => this.createAddFriendDialog.show()}>
            <Icon name="md-people" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#9b59b6' title="Add new debt" onPress={() => this.createDebtDialog.show()}>
            <Icon name="md-cash" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
        <StatusAlert
          display={'screen'}
          closeInterval={2000}
          ref={(statusAlert) => this.statusAlert = statusAlert}/>
        {this.renderSetupAccount()}
        {this.renderShowAccount()}
        {this.renderAddDebt()}
        {this.renderAddFriend()}
      </View>
    );
  }
}

export const mapStateToProps = ({ friends }) => ({ state: friends });

export const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ updateDebts, updateFriends, updatePending, updateCount }, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
