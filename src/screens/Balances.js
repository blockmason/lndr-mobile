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

import styles from './styles';

//this will be a key (history) inside of Balances
const HISTORY = [
  {time: 1508510707000, amount: "100", state: "dr", memo: "test1", currency: "$USD"},
  {time: 1506510707000, amount: "100", state: "cr", memo: "test2", currency: "$USD"},
  {time: 1518510707000, amount: "100", state: "dr", memo: "test2", currency: "$USD"},
  {time: 1208510707000, amount: "100", state: "dr", memo: "test1", currency: "£GBP"},
  {time: 1508410707000, amount: "100", state: "cr", memo: "test1", currency: "$USD"},
  {time: 108510707000, amount: "100", state: "dr", memo: "test13", currency: "$USD"},
  {time: 1508510707000, amount: "100", state: "dr", memo: "test1", currency: "$USD"},
  {time: 1506510707000, amount: "100", state: "cr", memo: "test1", currency: "$USD"},
  {time: 1518510707000, amount: "100", state: "dr", memo: "test1", currency: "£GBP"},
  {time: 1208510707000, amount: "100", state: "dr", memo: "test1", currency: "$USD"},
  {time: 1508410707000, amount: "100", state: "cr", memo: "test1", currency: "$USD"},
  {time: 108510707000, amount: "100", state: "dr", memo: "test1", currency: "$USD"}
]

//amount
//name
//currency
//state = ["CR", "DR"]?
//curr_sym //dictionary lookup?
//these will be fetched from db
//last_transaction
//total_debts
const BALANCE_MOCK_DATA = [
  {id: 1, amount: "300.78", name: "Tim", history: HISTORY, state: "dr", currency: "USD", curr_sym: "$", last: 1508510707000, total_debts: "2"},
  {id: 2, amount: "66.21", name: "Matt", history: HISTORY, state: "dr", currency: "GBP", curr_sym: "£", last: 1508673607000, total_debts: "7"},
  {id: 3, amount: "9.00", name: "Derek", history: HISTORY, state: "cr", currency: "USD", curr_sym: "$", last: 1508486827000, total_debts: "1"}]

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
        <AddFriend />
      </PopupDialog>
    )
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <BalanceList
          displayDebt={this.displayDebtHistory}
          data={BALANCE_MOCK_DATA}/>
        {this.renderAddDebt()}
        {this.renderDebtHistory()}
        {this.renderAddFriend()}
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#26c6da' title="My profile" onPress={() => console.log("My Profile")}>
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
