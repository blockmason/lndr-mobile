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

import AddDebt from '../components/dialogs/AddDebt';
import BalanceList from '../components/listviews/balance/BalanceListview';

import styles from './styles';

//amount
//name
//currency
//state = ["CR", "DR"]?
//curr_sym //dictionary lookup?
//these will be fetched from db
//last_transaction
//total_debts
const BALANCE_MOCK_DATA = [
  {id: 1, amount: "300.78", name: "Tim", state: "dr", currency: "USD", curr_sym: "$", last: 1508510707000, total_debts: "2"},
  {id: 2, amount: "66.21", name: "Matt", state: "dr", currency: "GBP", curr_sym: "£", last: 1508673607000, total_debts: "7"},
  {id: 3, amount: "9.00", name: "Derek", state: "cr", currency: "USD", curr_sym: "$", last: 1508486827000, total_debts: "1"}]

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
  }

  showCreateDebtDialog() {
    this.createDebtDialog.show();
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <BalanceList
          data={BALANCE_MOCK_DATA}/>
        <PopupDialog
          height={null}
          dialogTitle={<DialogTitle title="Create Debt" />}
          ref={(createDebtDialog) => { this.createDebtDialog = createDebtDialog;}}
          dialogAnimation = { new SlideAnimation({ slideFrom: 'bottom' })}>
          <AddDebt />
        </PopupDialog>
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#9b59b6' title="Add new debt" onPress={() => this.showCreateDebtDialog()}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}
