import React, { Component } from 'react';
import ActionButton from 'react-native-action-button';
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

  constructor(props) {
    super(props)

    this.state = {
      total: "0",
      totalColor: "green"
    }
  }

  //tie with actual data
  displayPendingItemCount(numOfItems) {
    // const numOfItems = FRIEND_PENDING_MOCK_DATA.length
    // var total = numOfItems.length;
    var totalColor = "";
    var total = numOfItems;

    if (numOfItems < 40) {
      totalColor = "green";
    } else if (numOfItems < 80) {
      totalColor = "orange";
    } else if (numOfItems < 99) {
      totalColor = "red";
    } else {
      totalColor = "red";
      total = "99+"
    }

    return (
      <ActionButton
        buttonText={total.toString()}
        buttonColor={totalColor}/>
    )
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <PendingList
          data={FRIEND_PENDING_MOCK_DATA}/>
        {this.displayPendingItemCount(100)}
      </View>
    );
  }
}
