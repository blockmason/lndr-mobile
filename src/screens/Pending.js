import React, { Component } from 'react';
import ActionButton from 'react-native-action-button';
import {
  StyleSheet,
  TouchableHighlight,
  FlatList,
  Text,
  View,
  Image,
  Icon
} from 'react-native';

import PendingList from '../components/listviews/pending/PendingListview';
import PendingTitleCounter from '../components/navigation/pendingTitle/PendingTitleCounter';
import styles from './styles';

//EXPORT MOCK AND PROCESSING
const FRIEND_PENDING_MOCK_DATA = [
  {id: 1, status: "Waiting for Confirmation", type: "waiting_debt", owed: "You", verb: "owe", owee: "matt", curr: "USD", curr_sym: "$", amount: "123", memo: "Dinner and drinks"},
  {id: 2, status: "Confirm this debt", type: "confirm_debt", owed: "Matt", verb: "owes", owee: "You", curr: "USD", curr_sym: "$", amount: "2", memo: "Admission to convention"},
  {id: 3, status: "Waiting for Friend Confirmation", type: "waiting_friend", username: "Tim", nickname: "BlockmasonTim"},
  {id: 4, status: "Friend Request Received", type: "confirm_friend", username: "Jared", nickname: "BlockmasonJared"}];

//This will almost be moved to some sort of state management class, using null as ref pointer could be problematic
const PendingComponentState = {
  titleCounter: null,
};

export default class Pending extends Component {

  static navigationOptions = {
    tabBarLabel: () =>
    <PendingTitleCounter
      ref={(counter) => PendingComponentState.titleCounter = counter}/>
  }

  constructor(props) {
    super(props)

    this.state = {
      total: "0",
      totalColor: "green"
    }

    this.updatePendingCounter = this.updatePendingCounter.bind(this);
  }

  updatePendingCounter(amount) {
    const counter = PendingComponentState.titleCounter;

    if (counter != null) {
      counter.updateTotalCount(amount)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <PendingList
          data={FRIEND_PENDING_MOCK_DATA}/>
        <ActionButton
          onPress={() => { this.updatePendingCounter(1)}}/>
      </View>
    );
  }
}
