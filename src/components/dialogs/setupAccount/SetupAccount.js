import React, { Component } from 'react';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  TextInput,
  ScrollView,
  View,
  Image
} from 'react-native';

import { savePrivateKey } from '../../../utils/SecureDataStore';
import { insertRecord, executeTransaction } from '../../../utils/Storage';
import setup_account from './setup_account_styles';

import StatusAlert from '../../../components/status/StatusAlert';

export default class SetupAccount extends Component {

  constructor(props) {
     super(props);

     this.state = {
       view: "password",
       password: "",
       confirmPassword: ""
     }

     this.submitPasswords = this.submitPasswords.bind(this);
     this.confirmAccount = this.confirmAccount.bind(this);
  }

  confirmAccount() {
    //placeholder for saving the private key
    savePrivateKey("this is the private key placeholder");

    this.props.dismiss()
  }

  submitPasswords() {
    const password = this.state.password;
    const confirm = this.state.confirmPassword;
    const validLength = password.length > 7;
    const matches = password === confirm;

    if (validLength && matches) {

      //do stuff and generate and save the private key and the 12 word for recovery


      this.setState({
        view: 'confirm'
      })

    } else {

      var body = 'Check your passwords';

      if (!validLength) {
        body += "\n - The password needs to have 8 characters"
      }

      if (!matches) {
        body += "\n - The passwords don't match"
      }

      this.statusAlert.display({
        type: 'warn',
        title: 'Incorrect passwords',
        body: body
      })
    }
  }

  newPasswordView() {
    return (
      <View>
        <Image
          style={{width: 250, height: 250, alignSelf: 'center'}}
          source={require('../../../img/mason.jpg')}/>
        <Text style={setup_account.section_title}>Encrypt your new DEN</Text>
        <TextInput
          placeholder="New Password (min 8 chars)"
          style={[setup_account.dialog_margins, {marginTop: 10}]}
          onChangeText = {(password) => this.setState({password: password})}
          secureTextEntry = {true}
          value = {this.state.password}/>
        <TextInput
          placeholder="Confirm Password"
          style={[setup_account.dialog_margins, {marginTop: 10}]}
          onChangeText = {(confirm) => this.setState({confirmPassword: confirm})}
          secureTextEntry = {true}
          value = {this.state.confirmPassword}/>
        <TouchableHighlight
          onPress={() => this.submitPasswords()}
          style={[setup_account.dialog_button, {backgroundColor: '#FFF'}]}>
          <Text style={setup_account.dialog_text}>Create Account</Text>
        </TouchableHighlight>
        <KeyboardSpacer/>
        <StatusAlert
          display={'dialog'}
          ref={(statusAlert) => this.statusAlert = statusAlert}/>
      </View>
    )
  }

  confirmAccountView() {
    return (
      <View>
        <Text style={setup_account.section_title}>Record these 12 words somewhere safe and secret</Text>
        <Text style={setup_account.record_words}>badger cheesegrater cup adventure hammer mobile android apple placeholder happy dance dinosaur</Text>

        <TouchableHighlight
          onPress={() => this.confirmAccount()}
          style={[setup_account.dialog_button, {backgroundColor: '#FFF'}]}>
          <Text style={setup_account.dialog_text}>Confirm Account</Text>
        </TouchableHighlight>
      </View>
    )
  }

  renderSetupView() {
    if (this.state.view === 'password') {
      return this.newPasswordView();
    }

    return this.confirmAccountView();
  }

  render() {
    return (
      <ScrollView>
        {this.renderSetupView()}
      </ScrollView>
    );
  }
}
