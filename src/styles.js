import React from 'react';
import {
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },
  container: {
     flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    alignSelf: 'stretch',
    marginLeft: 50,
    marginRight: 50,
    borderRadius: 5,
    height: 40,
    backgroundColor: '#7567B1',
    justifyContent: 'center'
  },
  buttonText: {
      color: 'white',
      alignSelf: 'center',
      fontSize: 16
  }
});

export default styles;
