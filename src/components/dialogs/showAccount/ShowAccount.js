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

import { removeMnemonic, removeHashedPassword } from '../../../utils/SecureDataStore'

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
    removeMnemonic()
    removeHashedPassword()

    dropAll(() => {
      console.log('Data dropped')

      createTables(() => {
        console.log('Tables created')

        this.statusAlert.display({
          type: 'success',
          title: 'Account Data Cleared',
          body: 'Close and restart the app to continue'
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
        <Text style={show_account.section_title}>Your key fingerprint</Text>
        <Text style={show_account.dialog_text}>{this.props.privateKey ? this.props.privateKey.fingerPrint : 'None'}</Text>

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
