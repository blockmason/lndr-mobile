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

import Spinner from 'react-native-loading-spinner-overlay'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateHistory, updatePending } from '../../../actions/data'
import { updateCount } from '../../../actions/updateCount'

import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from '../../radiobutton/SimpleRadioButton'
import StatusAlert from '../../../components/status/StatusAlert'

import { insertRecord, executeTransaction } from '../../../utils/Storage'

import creditProtocolClient from '../../../config/credit-protocol-client'

import style from './add_debt_styles'

const delay = time => new Promise(resolve => setTimeout(resolve, time))

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
      memo: '',
      isSubmitting: false,
      isSuccess: false
    }

    this.validateAndCreateDebt = this.validateAndCreateDebt.bind(this)
    this.handleFriendSelected = this.handleFriendSelected.bind(this)
    this.updateOwedAmount = this.updateOwedAmount.bind(this)
    this.showFriendSelection = this.showFriendSelection.bind(this)
  }

  async validateAndCreateDebt () {
    const success = await this.validateAndCreateDebtImplementation()
    if (success === false) {
      return
    }
    if (!success) {
      await delay(1000)
      this.setState({ isSubmitting: false, isError: true })
      return
    }
    await delay(2500)
    this.setState({ isSubmitting: false, isSuccess: true })
    this.setState({ isSubmitting: false, isSuccess: true })
    await delay(1500)
    this.props.dismiss()
  }

  async validateAndCreateDebtImplementation () {
    const actions = this.props.actions
    const state = this.state
    const hasMemo = state.memo.length > 0
    const validFriend = state.validFriend

    if (!validFriend || !hasMemo) {
      let body = 'Some of the fields have not been filled out:'

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

      return false
    }

    let creditor, debtor, creditorAddress, debtorAddress, verb, type

    if (state.userOwesFriend) {
      debtor = 'You'
      debtorAddress = this.props.address

      creditor = 'Test'
      creditorAddress = '0xdb203cd103a1e0deb417aecd90b2522013286ac6'

      verb = 'owe'
      type = 'borrow'
    } else {
      debtor = 'Test'
      debtorAddress = '0xdb203cd103a1e0deb417aecd90b2522013286ac6'

      creditor = 'You'
      creditorAddress = this.props.address

      verb = 'owes'
      type = 'lend'
    }

    const { amount } = state

    if (!/^[0-9,]+\.\d\d$/.test(amount)) {
      throw new Error('amount is not formatted correctly')
    }

    const sanitizedAmount = parseInt(amount.replace(/[.,]/g, ''))
    const privateKeyBuffer = this.props.privateKey.privateKey.toBuffer()

    this.setState({ isSubmitting: true })

    const creditRecord = await creditProtocolClient.createCreditRecord(
      UCAC_ID,
      creditorAddress,
      debtorAddress,
      sanitizedAmount,
      state.memo
    )

    const signature = creditRecord.sign(privateKeyBuffer)
    await creditProtocolClient.submitCreditRecord(creditRecord, type, signature)

    return true
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
    if (this.state.isSuccess) {
      return <ScrollView style={style.dialog}>
        <Text style={style.dialog_text}>Success</Text>
      </ScrollView>
    }
    if (this.state.isError) {
      return <ScrollView style={style.dialog}>
        <Text style={style.dialog_text_error}>Unknown Error</Text>
        <TouchableHighlight
          underlayColor={'#fff'}
          onPress={() => this.setState({ isError: false })}
          style={[style.dialog_button, {backgroundColor: '#FFF'}]}>
          <Text style={style.dialog_text}>Acknowledge</Text>
        </TouchableHighlight>
      </ScrollView>
    }
    return (
      <ScrollView style={style.dialog}>
        <Spinner visible={this.state.isSubmitting} textContent={'Submitting transaction...'} />
        <Text style={style.section_title}>1) Enter the debt amount:</Text>
        <View style={style.payment_row}>
          <Text style={style.payment_curr}>$</Text>
          <TextInputMask
            style={style.payment_amount}
            onChangeText={(amount) => this.updateOwedAmount(amount)}
            options={{
              unit: '',
              delimiter: ',',
              separator: '.'
            }}
            type={'money'}
            value={this.state.amount} />
          <Text style={style.payment_curr}>USD</Text>
        </View>
        <Text style={style.section_title}>2) Enter a concise memo:</Text>
        <TextInput
          placeholder='Enter debt memo here'
          style={[style.dialog_margins, {marginTop: 10}]}
          onChangeText={(memo) => this.setState({memo: memo})}
          value={this.state.memo} />
        <Text style={style.section_title}>3) Select a friend:</Text>
        <Text style={style.select_friend} onPress={this.showFriendSelection}>{this.state.selectedFriend}</Text>
        <ActionSheet
          ref={o => this.friendActionSheet = o}
          title='none selected'
          options={OPTIONS}
          cancelButtonIndex={CANCEL_INDEX}
          onPress={this.handleFriendSelected}
         />
        <Text style={style.section_title}>4) Select the valid statement:</Text>
        <RadioForm
          ref={(oweRadioForm) => { this.oweRadioForm = oweRadioForm }}
          styles={[style.dialog_margins, style.left_view, {marginTop: 10}]}
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
          style={[style.dialog_button, {backgroundColor: '#FFF'}]}>
          <Text style={style.dialog_text}>Confirm Debt</Text>
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
