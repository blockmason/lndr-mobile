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

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateHistory, updatePending } from '../../../actions/data'
import { updateCount } from '../../../actions/updateCount'

import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from '../../radiobutton/SimpleRadioButton'
import StatusAlert from '../../../components/status/StatusAlert'

import { insertRecord, executeTransaction } from '../../../utils/Storage'

import ethUtil from 'ethereumjs-util'

global.ethUtil = ethUtil

import dialog from './add_debt_styles'

const UCAC_ID = '0x7624778dedc75f8b322b9fa1632a610d40b85e106c7d9bf0e743a9ce291b9c6f'

const CANCEL_INDEX = 0
const FRIEND_MOCK_DATA = [{name: 'tim'}, {name: 'matt'}]
const OPTIONS = ['cancel', 'tim', 'matt']

const RADIO_OWED_DEFAULT = {
  owe: 'I owe this debt',
  owed: 'The debt is owed to me'
}

export class AddDebt extends Component {
  constructor (props) {
    super(props)

    this.state = {
      friends: FRIEND_MOCK_DATA,
      selectedFriend: 'none selected',
      validFriend: false,
      amount: '0.00',
      currencyType: 'USD',
      userOwesFriend: true,
      radioLabels: RADIO_OWED_DEFAULT,
      memo: ''
    }

    this.validateAndCreateDebt = this.validateAndCreateDebt.bind(this)
    this.handleFriendSelected = this.handleFriendSelected.bind(this)
    this.updateOwedAmount = this.updateOwedAmount.bind(this)
    this.showFriendSelection = this.showFriendSelection.bind(this)
  }

  getNonce(p1, p2) {
    return p1.localeCompare(p2) > 0 ? nonces[p1][p2] : nonces[p2][p1];
  }

  getNonce() {
    return 1
  }

  hexToBuffer(value) {
    return Buffer.from(value.substr(2), 'hex')
  }

  bufferToHex(buffer) {
    return '0x' + buffer.toString('hex')
  }

  intToBuffer(value) {
    const hexValue = value.toString(16)
    const stringValue = '0000000000000000000000000000000000000000000000000000000000000000'.replace(
      new RegExp(`.{${hexValue.length}}$`),
      hexValue
    )
    return Buffer.from(stringValue, 'hex')
  }

  createCreditRecord(ucac, creditorAddress, debtorAddress, amount, nonce) {
    if (!/^[0-9,]+\.\d\d$/.test(amount)) {
      throw new Error('amount is not formatted correctly')
    }

    const sanitizedAmount = amount.replace(/[.,]/g, '')
    const ucacAsBuffer = this.hexToBuffer(ucac)
    const creditorAddressAsBuffer = this.hexToBuffer(creditorAddress)
    const debtorAddressAsBuffer = this.hexToBuffer(debtorAddress)
    const amountAsBuffer = this.intToBuffer(parseInt(sanitizedAmount))
    const nonceAsBuffer = this.intToBuffer(nonce)

    return ethUtil.sha3(
      Buffer.concat([
        ucacAsBuffer,
        creditorAddressAsBuffer,
        debtorAddressAsBuffer,
        amountAsBuffer,
        nonceAsBuffer
      ])
    )
  }

  signCreditRecord(creditRecord, privateKey) {
    const { r, s, v } = ethUtil.ecsign(
      ethUtil.hashPersonalMessage(creditRecord),
      privateKey.privateKey.toBuffer()
    )
    return this.bufferToHex(
      Buffer.concat(
        [
          r,
          s,
          Buffer.from([ v ])
        ]
      )
    )
  }

  validateAndCreateDebt () {
    const actions = this.props.actions
    const state = this.state
    const hasMemo = state.memo.length > 0
    const validFriend = state.validFriend

    if (validFriend && hasMemo) {
      var creditor, debtor, creditorAddress, debtorAddress, verb

      if (state.userOwesFriend) {
        debtor = 'You'
        debtorAddress = this.props.address

        creditor = 'Test'
        creditorAddress = '0xdb203cd103a1e0deb417aecd90b2522013286ac6'

        verb = 'owe'
      } else {
        debtor = 'Test'
        debtorAddress = '0xdb203cd103a1e0deb417aecd90b2522013286ac6'

        creditor = 'You'
        creditorAddress = this.props.address

        verb = 'owes'
      }

      const nonce = this.getNonce(creditorAddress, debtorAddress)
      const creditRecord = this.createCreditRecord(UCAC_ID, creditorAddress, debtorAddress, state.amount, nonce)
      const sig1 = this.signCreditRecord(creditRecord, this.props.privateKey)

      const debts = {
        table: 'debts',
        action: 'insert',
        data: [debtor, creditor, state.amount, Date.now(), state.memo, 'USD']
      }

      insertRecord(debts, (result) => {
        console.log(result)
        // actions.updateHistory(result)
      })

      const json = {
        amount: state.amount,
        memo: state.memo,
        curr: 'USD',
        curr_sym: '$',
        debtor: debtor,
        creditor: creditor,
        verb: verb
      }

      const pending = {
        table: 'pending',
        action: 'insert',
        data: ['Waiting for Confirmation', 'waiting_debt', JSON.stringify(json)]
      }

      insertRecord(pending, (result) => {
        actions.updatePending(result)
        actions.updateCount(result.length)
      })

      this.props.dismiss()
    } else {
      var body = 'Some of the fields have not been filled out:'

      if (!hasMemo) {
        body += '\n - Add a memorial memo.'
      }

      if (!validFriend) {
        body += '\n - Select a friend from the list.'
      }

      this.statusAlert.display({
        type: 'warn',
        title: 'Missing information',
        body: body
      })
    }
  }

  showFriendSelection () {
    this.friendActionSheet.show()
  }

  updateRadioLabels (amount) {
    var radioLabels = RADIO_OWED_DEFAULT,
      state = this.state

    if (state.validFriend) {
      var selectedFriend = state.selectedFriend
      var money = amount + ' ' + state.currencyType

      radioLabels = {
        owe: 'I owe ' + selectedFriend + ' ' + money,
        owed: selectedFriend + ' owes me ' + money
      }
    }

    this.setState({
      radioLabels: radioLabels
    })
  }

  handleFriendSelected (index) {
    var validFriend = index > 0,
      selectedFriend = validFriend ? OPTIONS[index] : 'none selected'

    var radio_props = [
      {label: this.state.radioLabels.owe, value: 0 },
      {label: this.state.radioLabels.owed, value: 1 }
    ]

    this.setState({
      selectedFriend: selectedFriend,
      validFriend: validFriend
    })

    this.updateRadioLabels(this.state.amount)
  }

  updateOwedAmount (amount) {
    this.setState({
      amount: amount
    })

    this.updateRadioLabels(amount)
  }

  render () {
    return (
      <ScrollView>
        <Text style={dialog.section_title}>1) Enter the debt amount:</Text>
        <View style={dialog.payment_row}>
          <Text style={dialog.payment_curr}>$</Text>
          <TextInputMask
            style={dialog.payment_amount}
            onChangeText={(amount) => this.updateOwedAmount(amount)}
            options={{
              unit: '',
              delimiter: ',',
              separator: '.'
            }}
            type={'money'}
            value={this.state.amount} />
          <Text style={dialog.payment_curr}>USD</Text>
        </View>
        <Text style={dialog.section_title}>2) Enter a concise memo:</Text>
        <TextInput
          placeholder='Enter debt memo here'
          style={[dialog.dialog_margins, {marginTop: 10}]}
          onChangeText={(memo) => this.setState({memo: memo})}
          value={this.state.memo} />
        <Text style={dialog.section_title}>3) Select a friend:</Text>
        <Text style={dialog.select_friend} onPress={this.showFriendSelection}>{this.state.selectedFriend}</Text>
        <ActionSheet
          ref={o => this.friendActionSheet = o}
          title='none selected'
          options={OPTIONS}
          cancelButtonIndex={CANCEL_INDEX}
          onPress={this.handleFriendSelected}
         />
        <Text style={dialog.section_title}>4) Select the valid statement:</Text>
        <RadioForm
          ref={(oweRadioForm) => { this.oweRadioForm = oweRadioForm }}
          styles={[dialog.dialog_margins, dialog.left_view, {marginTop: 10}]}
          radio_props={[
             {label: this.state.radioLabels.owe, value: true },
             {label: this.state.radioLabels.owed, value: false }
          ]}
          initial={0}
          buttonColor={'#03A9F4'}
          formHorizontal={false}
          labelHorizontal
          animation
          onPress={(owed) => { this.setState({userOwesFriend: owed}) }}
         />
        <TouchableHighlight
          underlayColor={'#fff'}
          onPress={() => this.validateAndCreateDebt()}
          style={[dialog.dialog_button, {backgroundColor: '#FFF'}]}>
          <Text style={dialog.dialog_text}>Confirm Debt</Text>
        </TouchableHighlight>
        <KeyboardSpacer />
        <StatusAlert
          display={'dialog'}
          ref={(statusAlert) => this.statusAlert = statusAlert} />
      </ScrollView>
    )
  }
}

export const mapStateToProps = ({ friends }) => ({ state: friends })

export const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ updateHistory, updatePending, updateCount }, dispatch) })

export default connect(mapStateToProps, mapDispatchToProps)(AddDebt)
