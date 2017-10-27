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
  {id: 1, status: "Waiting for Confirmation", type: "waiting_debt", owed: "You", verb: "owe", owee: "matt", curr: "USD", curr_sym: "$", amount: "123", memo: "Dinner and drinks"},
  {id: 2, status: "Confirm this debt", type: "confirm_debt", owed: "Matt", verb: "owes", owee: "You", curr: "USD", curr_sym: "$", amount: "2", memo: "Admission to convention"},
  {id: 3, status: "Waiting for Friend Confirmation", type: "waiting_friend", username: "Tim", nickname: "BlockmasonTim"},
  {id: 4, status: "Friend Request Received", type: "confirm_friend", username: "Jared", nickname: "BlockmasonJared"}];

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
        offsetY={5}
        offsetX={5}
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
        {this.displayPendingItemCount(4)}
      </View>
    );
  }
}
