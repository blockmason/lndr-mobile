import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
  Image
} from 'react-native';

import styles from './styles';

export default class Pending extends Component {
  static navigationOptions = {
    tabBarLabel: 'Pending'
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <TouchableHighlight
          onPress={() => navigate('Balances')}
          style={[styles.button, {backgroundColor: '#8E84FB'}]}>
          <Text style={styles.buttonText}>Go to Balances </Text>
        </TouchableHighlight>
      </View>
    );
  }
}
