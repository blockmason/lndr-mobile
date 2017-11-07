import React from 'react'

import {
  TouchableHighlight,
  Text,
  View
} from 'react-native'

import KeyboardSpacer from 'react-native-keyboard-spacer'

import style from '../setup_account_styles'

export default function () {
  return <View style={style.dialog}>
    <Text style={style.section_title}>Record these 12 words somewhere safe and secret</Text>
    <Text style={style.record_words} selectable>{this.state.mnemonic}</Text>

    <TouchableHighlight
      underlayColor={'#fff'}
      onPress={() => this.confirmAccount()}
      style={style.dialog_button}>
      <Text style={style.dialog_text}>Confirm Account</Text>
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
