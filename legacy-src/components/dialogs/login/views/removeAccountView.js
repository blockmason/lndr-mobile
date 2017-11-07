import React from 'react' // eslint-disable-line no-unused-vars

import {
  TouchableHighlight,
  Text,
  View
} from 'react-native'

import KeyboardSpacer from 'react-native-keyboard-spacer'

import style from '../login_styles'

export default function () {
  return <View style={style.dialog}>
    <Text style={style.section_title}>Are you sure you want to remove your account from this device?</Text>

    <TouchableHighlight
      underlayColor={'#fff'}
      onPress={() => this.confirmRemoveAccount()}
      style={style.dialog_button}>
      <Text style={style.dialog_text_danger}>Remove Account</Text>
    </TouchableHighlight>

    <TouchableHighlight
      underlayColor={'#fff'}
      onPress={() => this.setState({ view: 'loginView' })}
      style={style.dialog_button_alt}>
      <Text style={style.dialog_text_alt}>Cancel</Text>
    </TouchableHighlight>

    <KeyboardSpacer />
  </View>
}
