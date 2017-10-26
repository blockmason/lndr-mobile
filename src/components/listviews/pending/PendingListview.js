import React, { Component } from 'react';
import {
  FlatList,
  Text,
  View
} from 'react-native';

import styles from '../../../screens/styles';
import pending from './pending_styles';

class PendingItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  getUserStyle(user) {
    return [pending.owe_text, {color: user == "You" ? "black" : "#03A9F4"}]
  }

  render() {
    return (
      <View
        style={pending.flatlist_row}
        onPress={this._onPress}>
        <Text style={[pending.status_text, styles.thin_font]}>
          {this.props.status}</Text>
        <View style={pending.detail_row}>
           <View>
            <Text style={this.getUserStyle(this.props.owed)}>
              {this.props.owed}</Text>
            <Text>{this.props.verb}</Text>
            <Text style={this.getUserStyle(this.props.owee)}>
              {this.props.owee}</Text>
           </View>
           <View style={{marginLeft: 50}}>
            <Text>{this.props.memo}</Text>
            <View style={pending.curr_block}>
              <Text style={pending.curr_text}>
                {this.props.curr} </Text>
              <Text style={[pending.amount_text, styles.thin_font]}>
                {this.props.sym}{this.props.amount}</Text>
            </View>
           </View>
        </View>
      </View>
    )
  }
}

export default class PendingList extends React.PureComponent {
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
    <PendingItem
      id={item.id}
      onPressItem={this._onPressItem}
      selected={!!this.state.selected.get(item.id)}
      status={item.status}
      memo={item.memo}
      owed={item.owed}
      owee={item.owee}
      amount={item.amount}
      curr={item.curr}
      sym={item.curr_sym}
      verb={item.verb}
    />
  );

  render() {
    return (
      <FlatList
        style={pending.pending_layout}
        data={this.props.data}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}
