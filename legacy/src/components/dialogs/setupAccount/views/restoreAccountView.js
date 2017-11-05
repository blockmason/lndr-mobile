import React from 'react' // eslint-disable-line no-unused-vars

import {
  StyleSheet,
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
    <Text style={style.section_subtitle}>Enter your mnemonic (12 words displayed when creating your account):</Text>
    <TextInput
      placeholder='Mnemonic (12 words)'
      style={style.text_area}
      multiline
      onChangeText={(mnemonic) => this.setState({mnemonic: mnemonic})}
    />
    <Text style={style.section_subtitle}>Enter your password:</Text>
    <TextInput
      placeholder='New Password (min 8 chars)'
      style={style.text_input}
      onChangeText={(password) => this.setState({password: password})}
      secureTextEntry
    />
    <TouchableHighlight
      underlayColor={'#fff'}
      onPress={() => this.submitMnemonic()}
      style={style.dialog_button}>
      <Text style={style.dialog_text}>Restore Account</Text>
    </TouchableHighlight>

    <TouchableHighlight
      underlayColor={'#fff'}
      onPress={() => this.setState({ view: 'newAccountView' })}
      style={style.dialog_button_alt}>
      <Text style={style.dialog_text_alt}>Cancel</Text>
    </TouchableHighlight>

    <KeyboardSpacer />
  </View>
}
