import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateFriends } from '../actions/friends';

import FriendsList from '../components/listviews/friends/FriendsListview';

import styles from './styles';

import {FRIENDS_MOCK_DATA} from '../test/mock';

export class Friends extends Component {
  static navigationOptions = {
    tabBarLabel: 'Friends'
  }
  render() {
    return (
      <View style={styles.container}>
        <FriendsList
          data={this.props.state.friends}/>
      </View>
    );
  }
}

export const mapStateToProps = ({ friends }) => ({ state: friends });

export const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ updateFriends }, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(Friends);
