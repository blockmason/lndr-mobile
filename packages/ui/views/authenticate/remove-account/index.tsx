import React, { Component } from 'react'

import { View, Text } from 'react-native'

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

interface Props {
  removeAccount: () => any
  cancelRemoveAccount: () => any
}

class RemoveAccountView extends Component<Props> {
  render() {
    return (
      <View style={style.form}>
        <Text style={style.header}>{removeAccountTitle}</Text>
        <Text style={style.text}>{removeAccountExhortation}</Text>
        <Button danger onPress={this.props.removeAccount} text={removeAccountText} />
        <Button alternate onPress={this.props.cancelRemoveAccount} text={cancel} />
      </View>
    )
  }
}

const mapDispatchToProps = { removeAccount, cancelRemoveAccount }

export default connect(null, mapDispatchToProps)(RemoveAccountView)
