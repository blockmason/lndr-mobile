import React, { Component } from 'react';
import {TextInputMask} from 'react-native-masked-text';
import {sortBy} from 'underscore';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
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

import styles from '../../../screens/styles';
import dialog_history from './debt_history_styles';

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

export default class AddDebt extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      history: []
    };

    this.attachUser = this.attachUser.bind(this);
  }

  attachUser(user) {
    user.history = sortBy(user.history, "time").reverse();
    this.setState(user)
  }

  getHistory() {

    function getColor(hist) {
      return {backgroundColor: hist.state == "cr" ? "red" : "green"}
    }

    function getShortDate(hist) {
      const date = new Date(hist.time);

      return (
        <View style={[dialog_history.circle, getColor(hist)]}>
          <Text style={dialog_history.circle_text}>{MONTH_NAMES[date.getMonth()]}</Text>
          <Text style={dialog_history.circle_text}>{date.getDate()}</Text>
        </View>
      );
    }

    return this.state.history.map(function(hist, i){
      return(
        <View style={dialog_history.display_row} key={i}>
          {getShortDate(hist)}
          <View style={{marginLeft: 10}}>
            <Text style={dialog_history.history_text}>{hist.memo}</Text>
            <Text style={dialog_history.history_text}>{hist.currency}{hist.amount}</Text>
          </View>
        </View>
      );
    });
  }

  render() {
    return (
      <ScrollView style={{marginLeft: 20}}>
        <Text style={dialog_history.name_title}>{this.state.name}</Text>
        {this.getHistory()}
      </ScrollView>
    );
  }
}
