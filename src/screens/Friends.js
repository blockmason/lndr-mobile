import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image
} from 'react-native';

import FriendsList from '../components/listviews/friends/FriendsListview';

import styles from './styles';

//amount
//name
//currency
//state = ["CR", "DR"]?
const FRIENDS_MOCK_DATA = [
  {id: 1, balance: "300.78", name: "Tim", state: "dr", curr_type: "$"},
  {id: 2, balance: "66.21", name: "Matt", state: "dr", curr_type: "£"},
  {id: 3, balance: "9.00", name: "Derek", state: "cr", curr_type: "$"}]

export default class Friends extends Component {
  static navigationOptions = {
    tabBarLabel: 'Friends'
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <FriendsList
          data={FRIENDS_MOCK_DATA}/>
      </View>
    );
  }
}
