import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import {TextInputMask} from 'react-native-masked-text'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog'
import ActionSheet from 'react-native-actionsheet'
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  TextInput,
  ScrollView,
  View,
  Image
} from 'react-native'

import { clearPrivateKey } from '../../../utils/SecureDataStore'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateFriends, updatePending } from '../../../actions/data'
import { updateCount } from '../../../actions/updateCount'

import { dropAll, createTables } from '../../../utils/Storage'
import show_account from './show_account_styles'

import StatusAlert from '../../../components/status/StatusAlert'

export class ShowAccount extends Component {
  constructor (props) {
    super(props)

    this.resetPrivateKeyAndDB = this.resetPrivateKeyAndDB.bind(this)
  }

  resetPrivateKeyAndDB () {
    clearPrivateKey()

    dropAll(() => {
      console.log('Data dropped')

      createTables(() => {
        console.log('Tables created')

        this.statusAlert.display({
          type: 'success',
          title: 'Next Action',
          body: 'Use "ctrl + s" in editor to reset the app'
        })
      })
    })
  }

  render () {
    return (
      <ScrollView style={show_account.dialog_margins}>
        <Text style={show_account.section_title}>ETH balance</Text>
        <Text style={show_account.dialog_text}>$300</Text>
        <Text style={show_account.section_title}>Default Currency</Text>
        <Text style={show_account.dialog_text}>USD</Text>
        <Text style={show_account.section_title}>My Foundation ID</Text>
        <Text style={show_account.dialog_text}>Test</Text>
        <Text style={show_account.section_title}>Your key</Text>
        <Text style={show_account.dialog_text}>1234567</Text>

        <TouchableHighlight
          underlayColor={'#fff'}
          onPress={() => this.resetPrivateKeyAndDB()}
          style={[show_account.dialog_button, {backgroundColor: '#FFF'}]}>
          <Text style={show_account.dialog_text}>Clear private key and reset DB (Testing)</Text>
        </TouchableHighlight>
        <StatusAlert
          display={'dialog'}
          ref={(statusAlert) => this.statusAlert = statusAlert} />
      </ScrollView>
    )
  }
}

export const mapStateToProps = ({ friends }) => ({ state: friends })

export const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ updateFriends, updatePending, updateCount }, dispatch) })

export default connect(mapStateToProps, mapDispatchToProps)(ShowAccount)
