import React from 'react'

import {
  TouchableHighlight,
  TextInput,
  Text,
  View
} from 'react-native'

import KeyboardSpacer from 'react-native-keyboard-spacer'

import style from '../login_styles'

export default function () {
  return <View style={style.dialog}>
    <Text style={style.section_title}>Enter your password</Text>

    <TextInput
      placeholder='Password (min 8 chars)'
      style={style.text_input}
      onChangeText={(password) => this.setState({ password })}
      secureTextEntry
      value={this.state.password} />

    <TouchableHighlight
      underlayColor={'#fff'}
      onPress={() => this.confirmPassword()}
      style={style.dialog_button}>
      <Text style={style.dialog_text}>Login</Text>
    </TouchableHighlight>

    <TouchableHighlight
      underlayColor={'#fff'}
      onPress={() => this.setState({ view: 'removeAccountView' })}
      style={style.dialog_button_alt}>
      <Text style={style.dialog_text_alt}>Remove Account</Text>
    </TouchableHighlight>

    <KeyboardSpacer />
  </View>
}
