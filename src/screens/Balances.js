import React, { Component } from 'react';
import ActionButton from 'react-native-action-button';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
  Image
} from 'react-native';

import AddDebt from '../components/dialogs/addDebt/AddDebt';
import DebtHistory from '../components/dialogs/debtHistory/DebtHistory';
import AddFriend from '../components/dialogs/addFriend/AddFriend';
import BalanceList from '../components/listviews/balance/BalanceListview';

import { insertRecord, executeTransaction } from '../utils/Storage';

import styles from './styles';

import {HISTORY, BALANCE_MOCK_DATA} from '../test/mock';

export default class Balances extends Component {
  static navigationOptions = {
    title: 'Balances of Users',
    tabBarLabel: 'Balances'
  }

  constructor(props) {
    super(props);

    this.state = {
      dialogShow: false,
    };

    this.showCreateDebtDialog = this.showCreateDebtDialog.bind(this);
    this.showDebtHistoryDialog = this.showDebtHistoryDialog.bind(this);
    this.showAddFriendDialog = this.showAddFriendDialog.bind(this);
  }

  showDebtHistoryDialog() {
    this.createHistoryDialog.show();
  }

  showCreateDebtDialog() {
    this.createDebtDialog.show();
  }

  showAddFriendDialog() {
    this.createAddFriendDialog.show();
  }

  showProfileDialog() {

    // this.props.navigation.fetch()

    // const options = {
    //   table: 'pending',
    //   action: 'where',
    //   data: [14]
    // }
    //
    // executeTransaction(options, (result) => {
    //   console.log("callback");
    //   console.log(JSON.parse(result.rows._array[0].data).data);
    // });


    // const options = {
    //   name: 'pending',
    //   action: 'insert',
    //   data: ["data", "type", JSON.stringify({data: 1, that: "this"})]
    // }
    // //
    // insertRecord(options, (result) => {
    //   console.log("callback");
    //   console.log(result.rows);
    // });


  }

  displayDebtHistory = (id) => {
    const user = BALANCE_MOCK_DATA.filter(function (elem) {
      return elem.id == id
    })[0];

    this.debtHistory.attachUser(user)
    this.showDebtHistoryDialog()
  }

  renderAddDebt() {
    return (
      <PopupDialog
        height={null}
        dialogTitle={<DialogTitle title="Create Debt" />}
        ref={(createDebtDialog) => { this.createDebtDialog = createDebtDialog;}}
        dialogAnimation = { new SlideAnimation({ slideFrom: 'bottom' })}>
        <AddDebt />
      </PopupDialog>
    )
  }

  renderDebtHistory() {
    return (
      <PopupDialog
        height={0.7}
        dialogTitle={<DialogTitle title="Debt History" />}
        ref={(createHistoryDialog) => { this.createHistoryDialog = createHistoryDialog;}}
        dialogAnimation = { new SlideAnimation({ slideFrom: 'bottom' })}>
        <DebtHistory
          ref={component => this.debtHistory = component}/>
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
      <View style={styles.container}>
        <BalanceList
          displayDebt={this.displayDebtHistory}
          data={BALANCE_MOCK_DATA}/>
        {this.renderAddDebt()}
        {this.renderDebtHistory()}
        {this.renderAddFriend()}
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#26c6da' title="My profile" onPress={() => this.showProfileDialog()}>
            <Icon name="md-stats" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#00AA8D' title="Add new friend" onPress={() => this.showAddFriendDialog()}>
            <Icon name="md-people" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#9b59b6' title="Add new debt" onPress={() => this.showCreateDebtDialog()}>
            <Icon name="md-cash" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}
