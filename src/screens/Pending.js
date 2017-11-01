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

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateCount } from '../actions/updateCount';

import PendingList from '../components/listviews/pending/PendingListview';
import PendingTitleCounter from '../components/navigation/pendingTitle/PendingTitleCounter';
import styles from './styles';

import {FRIEND_PENDING_MOCK_DATA} from '../test/mock';

//This will almost be moved to some sort of state management class, using null as ref pointer could be problematic
const PendingComponentState = {
  titleCounter: null,
};

export class Pending extends Component {

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
