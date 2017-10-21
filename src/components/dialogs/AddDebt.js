import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  Picker,
  TextInput,
  Button,
  ScrollView,
  View,
  Image
} from 'react-native';

import styles from '../../screens/styles';

const FRIEND_MOCK_DATA = [{name: "tim"}, {name: "matt"}];

export default class AddDebt extends Component {

  constructor(props) {
     super(props);

     this.state = {
       friends: FRIEND_MOCK_DATA
     };
  }

  processAmountOwed() {
    //Validate inputs and complete action
    console.log("Debt process.");
  }

  render() {
    const friends = [];
    for (var i = 0; i < this.state.friends.length; i++) {
      s = this.state.friends[i];
      friends.push(<Picker.Item key={i} value={s.name} label={s.name} />);
    }

    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={dialog.sectionTitle}>ENTER DEBT YOU OWE</Text>
        <View style={dialog.payment_row}>
           <Text style={dialog.payment_curr}>$</Text>
           <TextInput style={dialog.payment_amount}></TextInput>
           <Text style={dialog.payment_curr}>USD</Text>
       </View>
        <Picker
          style={dialog.dialog_margins}
          selectedValue={this.state.friend}
          onValueChange={(itemValue, itemIndex) => this.setState({friend: itemValue})}>
          <Picker.Item label = 'Select a Friend' value='-1' />
          {friends}
        </Picker>
        <TextInput
           placeholder="Enter debt memo here"
           style={dialog.dialog_margins}
           onChangeText = {(text) => this.setState({text})}
           hint = ""
           value = {this.state.text}/>
        <TouchableHighlight
          onPress={() => this.processAmountOwed()}
          style={[dialog.owe_button, {backgroundColor: '#FFF'}]}>
          <Text style={dialog.owe_text}>I OWE THIS</Text>
        </TouchableHighlight>
        <Text style={dialog.or_text}>OR</Text>
        <Text style={dialog.sectionTitle}>ENTER DEBT OWED TO YOU</Text>
        <View style={dialog.payment_row}>
           <Text style={dialog.payment_curr}>$</Text>
           <TextInput style={dialog.payment_amount}></TextInput>
           <Text style={dialog.payment_curr}>USD</Text>
        </View>
        <Picker
          style={dialog.dialog_margins}
          selectedValue={this.state.friend}
          onValueChange={(itemValue, itemIndex) => this.setState({friend: itemValue})}>
          <Picker.Item label='Select a Friend' value='-1' />
          {friends}
        </Picker>
        <TextInput
           placeholder="Enter debt memo here"
           style={dialog.dialog_margins}
           onChangeText={(text) => this.setState({text})}
           value={this.state.text}/>
         <TouchableHighlight
           onPress={() => this.processAmountOwed()}
           style={[dialog.owe_button, {backgroundColor: '#FFF'}]}>
           <Text style={dialog.owe_text}>THIS IS OWED TO ME</Text>
         </TouchableHighlight>

      </ScrollView>
    );
  }
}

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
  dialog_margins: {
    marginLeft: 20,
    marginRight: 20,
    padding: 2
  },
  payment_row: {
    flexDirection:'row',
    padding: 2,
    marginLeft: 20,
    marginRight: 20
  },
  payment_curr: {
    padding: 2
  },
  payment_amount: {
     width: "30%",
     padding: 2
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  owe_button: {
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
  owe_text: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#03A9F4'
  },
  sectionTitle: {
      color: 'grey',
      alignSelf: 'baseline',
      fontSize: 14,
      padding: 10,
      marginLeft: 10
  }
});
