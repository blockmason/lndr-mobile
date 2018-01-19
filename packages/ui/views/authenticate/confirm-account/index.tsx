import React, { Component } from 'react'

import { View, Text, Clipboard } from 'react-native'

import Button from 'ui/components/button'

import { connect } from 'react-redux'

import { mnemonicDisplayed } from 'actions'
import { getStore } from 'reducers/app'

import { next, copy, mnemonicExhortation } from 'language'

import style from 'theme/form'

interface Props {
  mnemonic: string
  mnemonicDisplayed: () => any
}

class ConfirmAccountView extends Component<Props, {}> {
  render() {
    return (
      <View style={style.form}>
        <Text style={[style.header, style.center]}>{mnemonicExhortation}</Text>
        <Text selectable style={style.displayText}>{this.props.mnemonic}</Text>
        <Button round fat onPress={() => Clipboard.setString(this.props.mnemonic || ' ')} style={style.submitButton} text={copy} />
        <Button alternate arrow onPress={this.props.mnemonicDisplayed} style={style.submitButton} text={next} />
      </View>
    )
  }
}

const mapStateToProps = (state) => (
  {
    mnemonic: getStore(state)().mnemonic
  }
)

const mapDispatchToProps = { mnemonicDisplayed }

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmAccountView)
