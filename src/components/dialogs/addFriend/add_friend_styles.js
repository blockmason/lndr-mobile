import React from 'react';
import {
    StyleSheet
} from 'react-native';

const add_friend = StyleSheet.create({
  dialog_margins: {
    marginLeft: 20,
    marginRight: 20,
    padding: 12,
    padding: 2,
    marginTop: 10,
    marginBottom: 10
  },
  payment_amount: {
     width: "30%",
     padding: 3,
     borderRadius: 5
  },
  dialog_button: {
    alignSelf: 'stretch',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    borderRadius: 5,
    height: 50,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    borderColor: 'grey',
    borderWidth: 1
  },
  dialog_text: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#03A9F4'
  },
  section_title: {
      color: 'grey',
      alignSelf: 'baseline',
      fontSize: 12,
      padding: 10,
  }
});

export default add_friend;
