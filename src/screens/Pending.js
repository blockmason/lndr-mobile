import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  FlatList,
  Text,
  View,
  Image
} from 'react-native';

import PendingList from '../components/listviews/pending/PendingListview';
import styles from './styles';

//EXPORT MOCK AND PROCESSING
const FRIEND_PENDING_MOCK_DATA = [
  {id: 1, status: "Waiting for Confirmation", owed: "You", verb: "owe", owee: "matt", curr: "USD", curr_sym: "$", amount: "123", memo: "This is a memo"},
  {id: 2, status: "Waiting for Confirmation", owed: "Matt", verb: "owes", owee: "You", curr: "USD", curr_sym: "$", amount: "2", memo: "Test"},
  {id: 3, status: "Waiting for Confirmation", owed: "Tim", verb: "owes", owee: "You", curr: "GBP",  curr_sym: "£", amount: "0.01", memo: "Hello"}];

export default class Pending extends Component {
  static navigationOptions = {
    tabBarLabel: 'Pending'
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <PendingList
          data={FRIEND_PENDING_MOCK_DATA}/>
      </View>
    );
  }
}
