import React, { Component } from 'react';
import {
  FlatList,
  Text,
  View
} from 'react-native';

import balance from './balance_styles';

class BalanceItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  getStateStyle(user) {
    return [balance.end_block, balance.state_text ,{color: this.props.state == "cr" ? "red" : "green"}]
  }

  getDateString() {
    const date = new Date(this.props.last);
    const dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
    const mm = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);

    return date.getFullYear() + "-" + mm + "-" + dd;
  }

  render() {
    return (
      <View
        style={balance.flatlist_row}
        onPress={this._onPress}>
        <View style={balance.detail_row}>
          <Text style={[balance.name_text, balance.start_block]}>
            {this.props.name}</Text>
          <Text style = {this.getStateStyle()}>
            {this.props.curr_sym}{this.props.amount}</Text>
        </View>
        <View style={balance.detail_row}>
          <View style={balance.start_block}>
            <Text style={balance.title_text}>Last</Text>
            <Text>{this.getDateString()}</Text>
          </View>
          <View style={balance.curr_block}>
            <Text style={balance.curr_text}>
              {this.props.currency}</Text>
          </View>
          <View style={balance.end_block}>
            <Text style={balance.title_text}>Debts</Text>
            <Text>{this.props.total_debts}</Text>
          </View>
         </View>
        </View>
    )
  }
}

export default class BalanceList extends React.PureComponent {
  state = {selected: (new Map(): Map<string, boolean>)};

  _keyExtractor = (item, index) => item.id;

  _onPressItem = (id: string) => {
    // updater functions are preferred for transactional updates
    this.setState((state) => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return {selected};
    });
  };

  _renderItem = ({item}) => (
    <BalanceItem
      id={item.id}
      onPressItem={this._onPressItem}
      selected={!!this.state.selected.get(item.id)}
      name={item.name}
      state={item.state}
      amount={item.amount}
      currency={item.currency}
      curr_sym={item.curr_sym}
      last={item.last}
      total_debts={item.total_debts}
    />
  );

  render() {
    return (
      <FlatList
        style={balance.balance_layout}
        data={this.props.data}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}
