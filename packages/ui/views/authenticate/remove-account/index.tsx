import React, { Component } from 'react'

import { View, Text } from 'react-native'
import ThemeImage from 'ui/components/images/theme-image'

import { connect } from 'react-redux'

import { removeAccount, cancelRemoveAccount } from 'actions'

import {
  cancel,
  removeAccount as removeAccountText,
  removeAccountTitle,
  removeAccountExhortation
} from 'language'

import Button from 'ui/components/button'

import style from 'theme/form'
import general from 'theme/general'

interface Props {
  removeAccount: () => any
  cancelRemoveAccount: () => any
}

class RemoveAccountView extends Component<Props> {
  render() {
    return (
      <View style={style.form}>
        <ThemeImage name='logo' size={0.4} />
        <Text style={[style.header, style.center, style.spaceTop]}>{removeAccountTitle}</Text>
        <Text style={[style.text, style.center, style.spaceTop]}>{removeAccountExhortation}</Text>
        <Button round fat style={style.submitButton} onPress={this.props.removeAccount} text={removeAccountText} />
        <Button alternate small arrow style={style.submitButton} onPress={this.props.cancelRemoveAccount} text={cancel} />
      </View>
    )
  }
}

const mapDispatchToProps = { removeAccount, cancelRemoveAccount }

export default connect(null, mapDispatchToProps)(RemoveAccountView)
