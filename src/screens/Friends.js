import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image
} from 'react-native';

import styles from './styles';

export default class Friends extends Component {
  static navigationOptions = {
    tabBarLabel: 'Friends'
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
          <TouchableHighlight
            onPress={() => navigate('Pending')}
            style={[styles.button, {backgroundColor: '#7567B1'}]}>
            <Text style={styles.buttonText}> Go to Pending </Text>
        </TouchableHighlight>
      </View>
    );
  }
}
