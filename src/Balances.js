import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
  Image
} from 'react-native';

import styles from './styles';

class Balances extends Component {
    static navigationOptions = {
    title: 'Balances of Users',
    tabBarLabel: 'Balances'
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <TouchableHighlight
          onPress={() => navigate('Friends')}
          style={[styles.button, {backgroundColor: '#C56EE0'}]}>
          <Text style={styles.buttonText}>Go to Friends </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default Balances;
