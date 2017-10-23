import React, { Component } from 'react';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
  Image
} from 'react-native';

import AddDebt from '../components/dialogs/AddDebt'
import styles from './styles';

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
        <TouchableHighlight
          onPress={() => this.showCreateDebtDialog()}
          style={[styles.button, {backgroundColor: '#C56EE0'}]}>
          <Text style={styles.buttonText}>Add new debt</Text>
        </TouchableHighlight>
        <PopupDialog
          height={null}
          dialogTitle={<DialogTitle title="Create Debt" />}
          ref={(createDebtDialog) => { this.createDebtDialog = createDebtDialog;}}
          dialogAnimation = { new SlideAnimation({ slideFrom: 'bottom' })}>
          <AddDebt />
        </PopupDialog>
      </View>
    );
  }
}
