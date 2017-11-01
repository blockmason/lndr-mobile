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

import {FRIENDS_MOCK_DATA} from '../test/mock';

export default class Friends extends Component {
  static navigationOptions = {
    tabBarLabel: 'Friends'
  }
  render() {

    return (
      <View style={styles.container}>
        <FriendsList
          data={FRIENDS_MOCK_DATA}/>
      </View>
    );
  }
}
