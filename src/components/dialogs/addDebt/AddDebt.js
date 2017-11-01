import React, { Component } from 'react';
import {TextInputMask} from 'react-native-masked-text';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import ActionSheet from 'react-native-actionsheet'
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  TextInput,
  ScrollView,
  View,
  Image
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateHistory, updatePending } from '../../../actions/data';

import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from '../../radiobutton/SimpleRadioButton';

import { insertRecord, executeTransaction } from '../../../utils/Storage';

import dialog from './add_debt_styles';

const CANCEL_INDEX = 0
const FRIEND_MOCK_DATA = [{name: "tim"}, {name: "matt"}];
const OPTIONS = ["cancel", "tim", "matt"];

const RADIO_OWED_DEFAULT = {
  owe: 'I owe this debt',
  owed: 'The debt is owed to me'
};

export class AddDebt extends Component {

  constructor(props) {
     super(props);

     this.state = {
       friends: FRIEND_MOCK_DATA,
       selectedFriend: "none selected",
       validFriend: false,
       amount: 0,
       currencyType: "USD",
       owed: 0,
       radioLabels: RADIO_OWED_DEFAULT,
       memo: "",
     };

     this.validateAndCreateDebt = this.validateAndCreateDebt.bind(this)
     this.handleFriendSelected = this.handleFriendSelected.bind(this)
     this.updateOwedAmount = this.updateOwedAmount.bind(this)
     this.showFriendSelection = this.showFriendSelection.bind(this)
  }

  validateAndCreateDebt() {

    const actions = this.props.actions;
    const state = this.state;

    if (state.validFriend && state.memo.length > 0) {

      const owed = state.owed == 0 ? "DR" : "CR";

      const debts = {
        table: 'debts',
        action: 'insert',
        data: [1, state.amount, owed, Date.now(), state.memo, "USD"]
      }

      insertRecord(debts, (result) => {
        console.log(result);
        // actions.updateHistory(result)
      });

      const json = {
        amount: state.amount,
        memo: state.memo,
        curr: "USD",
        curr_sym: "$",
        owed: "you",
        owee: "test",
        verb: "owes"
      }

      const pending = {
        table: 'pending',
        action: 'insert',
        data: ['Waiting for Confirmation', 'waiting_debt', JSON.stringify(json)]
      }

      insertRecord(pending, (result) => {
        actions.updatePending(result);
      })

      this.props.dismiss();
    }
  }

  showFriendSelection() {
    this.friendActionSheet.show()
  }

  updateRadioLabels(amount) {
    var radioLabels = RADIO_OWED_DEFAULT,
        state = this.state;

    if (state.validFriend) {
      var selectedFriend = state.selectedFriend;
      var money = amount + " " + state.currencyType;

      radioLabels = {
        owe: "I owe " + selectedFriend + " " + money,
        owed: selectedFriend + " owes me " + money
      };
    }

    this.setState({
      radioLabels: radioLabels
    })
  }

  handleFriendSelected(index) {

    var validFriend = index > 0,
        selectedFriend = validFriend ? OPTIONS[index] : "none selected";

    var radio_props = [
      {label: this.state.radioLabels.owe, value: 0 },
      {label: this.state.radioLabels.owed, value: 1 }
    ]

    this.setState({
      selectedFriend: selectedFriend,
      validFriend: validFriend
    })

    this.updateRadioLabels(this.state.amount);
  }

  updateOwedAmount(amount) {
    this.setState({
      amount: amount,
    })

    this.updateRadioLabels(amount);
  }

  render() {
    return (
      <ScrollView>
        <Text style={dialog.section_title}>1) Enter the debt amount:</Text>
        <View style={dialog.payment_row}>
           <Text style={dialog.payment_curr}>$</Text>
           <TextInputMask
              style={dialog.payment_amount}
              onChangeText={(amount) => this.updateOwedAmount(amount)}
              options = {{
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
          placeholder="Enter debt memo here"
          style={[dialog.dialog_margins, {marginTop: 10}]}
          onChangeText = {(memo) => this.setState({memo: memo})}
          value = {this.state.memo}/>
         <Text style={dialog.section_title}>3) Select a friend:</Text>
         <Text style={dialog.select_friend} onPress={this.showFriendSelection}>{this.state.selectedFriend}</Text>
         <ActionSheet
           ref={o => this.friendActionSheet = o}
           title="none selected"
           options={OPTIONS}
           cancelButtonIndex={CANCEL_INDEX}
           onPress={this.handleFriendSelected}
         />
         <Text style={dialog.section_title}>4) Select the valid statement:</Text>
         <RadioForm
           ref={(oweRadioForm) => { this.oweRadioForm = oweRadioForm;}}
           styles = {[dialog.dialog_margins, dialog.left_view, {marginTop: 10}]}
           radio_props={[
             {label: this.state.radioLabels.owe, value: 0 },
             {label: this.state.radioLabels.owed, value: 1 }
           ]}
           initial={0}
           buttonColor={'#03A9F4'}
           formHorizontal={false}
           labelHorizontal={true}
           animation={true}
           onPress={(owed) => {this.setState({owed:owed})}}
         />
        <TouchableHighlight
          onPress={() => this.validateAndCreateDebt()}
          style={[dialog.dialog_button, {backgroundColor: '#FFF'}]}>
          <Text style={dialog.dialog_text}>Confirm Debt</Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }
}

export const mapStateToProps = ({ friends }) => ({ state: friends });

export const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ updateHistory, updatePending }, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(AddDebt);
