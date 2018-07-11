import React, { Component } from 'react'

import { View, Text, ScrollView } from 'react-native'
import { connect } from 'react-redux'

import { getResetAction } from 'reducers/nav'
import { hasStoredUser } from 'reducers/app'

import ThemeImage from 'ui/components/images/theme-image'
import { LoadingContext } from 'ui/components/loading'
import Button from 'ui/components/button'

import { removeAccount } from 'actions'

import language from 'language'
const {
  cancel,
  removeAccountTitle,
  removeAccountExhortation
} = language
const removeAccountText = language.removeAccount

import style from 'theme/form'
import general from 'theme/general'

const removingAccount = new LoadingContext()

interface Props {
  removeAccount: () => any
  hasStoredUser: () => boolean
  navigation: any
}

interface State {
  updating: boolean
}

class RemoveAccountView extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      updating: false
    }

    this.removeAccount = this.removeAccount.bind(this)
  }

  componentDidUpdate() {
    if(this.state.updating && !this.props.hasStoredUser()) {
      this.props.navigation.dispatch(getResetAction( { routeName: 'Dashboard' } ))
    }
  }

  async removeAccount() {
    await removingAccount.wrap(this.props.removeAccount())
    this.setState({ updating: true })
  }

  render() {
    return (
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={style.form}>
          <ThemeImage name='logo' size={0.4} />
          <Text style={[style.header, style.center, style.spaceTop]}>{removeAccountTitle}</Text>
          <Text style={[style.text, style.center, style.spaceTop]}>{removeAccountExhortation}</Text>
          <Button round fat style={style.submitButton} onPress={this.removeAccount} text={removeAccountText} />
          <Button alternate small arrow style={style.submitButton} containerStyle={general.spaceBelow} onPress={() => this.props.navigation.goBack()} text={cancel} />
        </View>
      </ScrollView>
    )
  }
}

export default connect((state) => ({ hasStoredUser: hasStoredUser(state) }), { removeAccount })(RemoveAccountView)
