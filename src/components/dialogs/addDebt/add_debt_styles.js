import React from 'react';
import {
    StyleSheet
} from 'react-native';

const dialog = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },
  or_text: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#03A9F4',
    padding: 10
  },
  left_view: {
     flex: 1,
     justifyContent: 'flex-start',
     alignItems: 'baseline'
  },
  dialog_margins: {
    marginLeft: 20,
    marginRight: 20,
    padding: 12,
    padding: 2
  },
  payment_row: {
    flexDirection:'row',
    padding: 2,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 5
  },
  payment_curr: {
    padding: 2
  },
  payment_amount: {
     width: "30%",
     padding: 3,
     borderRadius: 5
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
  select_friend: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#03A9F4',
    alignSelf: 'stretch',
    alignItems:'center',
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    borderRadius: 5,
    height: 50,
    backgroundColor: '#FFF',
    borderColor: 'grey',
    borderWidth: 1
  },
  your_debt: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
  },
  section_title: {
      color: 'grey',
      alignSelf: 'baseline',
      fontSize: 12,
      padding: 10,
  }
});

export default dialog;
