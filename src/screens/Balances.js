import React, { Component } from 'react';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
  Image
} from 'react-native';

import DebtHistory from '../components/dialogs/debtHistory/DebtHistory';
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

    this.showDebtHistoryDialog = this.showDebtHistoryDialog.bind(this);
  }

  showDebtHistoryDialog() {
    this.createHistoryDialog.show();
  }


  displayDebtHistory = (id) => {
    const user = BALANCE_MOCK_DATA.filter(function (elem) {
      return elem.id == id
    })[0];

    this.debtHistory.attachUser(user)
    this.showDebtHistoryDialog()
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

  //TODO: data={BALANCE_MOCK_DATA}
  render() {
    return (
      <View style={styles.container}>
        <BalanceList
          displayDebt={this.displayDebtHistory}/>
        {this.renderDebtHistory()}
      </View>
    );
  }
}
