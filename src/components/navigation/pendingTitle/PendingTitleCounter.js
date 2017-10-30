import React, { Component } from 'react';
import {
  Text,
  View,
  Platform
} from 'react-native';

import counterStyles from './pending_counter_styles';

export default class PendingTitleCounter extends Component {

  constructor(props) {
    super(props)

    this.state = {
      count: 0,
      color: "green",
      display: 0
    }
  }

  updateTotalCount(count) {

    var color = "";
    var total = this.state.count + count;
    var display = total;

    if (total > 99) {
      display = "99+"
    }

    this.setState({
      count : total,
      display : display
    })
  }

  render() {
    return (
      <View style={counterStyles.tab_row}
        onClick={() => {console.log("clicks");}}>
        <Text style={{fontWeight: 'bold', color: this.state.focusedTextColor}}>PENDING</Text>
        <View style={counterStyles.counter_icon}>
          <Text
            ref={(counter) => {this.counterText = counter}}
            style={{alignSelf: 'center', fontSize: 12, color: "white"}}>
            {this.state.display}</Text>
        </View>
      </View>
    )
  }

}
