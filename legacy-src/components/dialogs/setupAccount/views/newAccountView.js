import React from 'react'

import {
  TouchableHighlight,
  Text,
  TextInput,
  View,
  Image
} from 'react-native'

import KeyboardSpacer from 'react-native-keyboard-spacer'

import style from '../setup_account_styles'

export default function () {
  return <View style={style.dialog}>
    <Image
      style={{width: 150, height: 150, marginTop: 10, alignSelf: 'center'}}
      source={require('../../../../img/mason.jpg')}
    />

    <Text style={style.section_title}>Encrypt your new DEN</Text>

    <TextInput
      placeholder='New Password (min 8 chars)'
      style={style.text_input}
      onChangeText={(password) => this.setState({ password })}
      secureTextEntry
      value={this.state.password} />

    <TextInput
      placeholder='Confirm Password'
      style={style.text_input}
      onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
      secureTextEntry
      value={this.state.confirmPassword} />

    <TouchableHighlight
      underlayColor={'#fff'}
      onPress={() => this.submitPasswords()}
      style={style.dialog_button}>
      <Text style={style.dialog_text}>Create Account</Text>
    </TouchableHighlight>

    <TouchableHighlight
      underlayColor={'#fff'}
      onPress={() => this.setState({ view: 'restoreAccountView' })}
      style={style.dialog_button_alt}>
      <Text style={style.dialog_text_alt}>Restore Existing Account</Text>
    </TouchableHighlight>

    <KeyboardSpacer />
  </View>
}
