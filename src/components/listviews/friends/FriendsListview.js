import React, { Component } from 'react';
import {
  FlatList,
  Text,
  View
} from 'react-native';

import friends from './friends_styles';
import styles from '../../../screens/styles';

class FriendsItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  getStateStyle() {
    return [friends.end_block, friends.state_text, styles.thin_font ,{color: this.props.state == "cr" ? "red" : "green"}]
  }

  render() {
    return (
      <View
        style={friends.flatlist_row}
        onPress={this._onPress}>
        <View
          style={friends.detail_row}>
          <Text style={friends.category_text}>
            {this.props.name[0]}</Text>
          <View>
            <Text style={[friends.state_text, styles.thin_font]}>
              {this.props.name}</Text>
            <Text style={this.getStateStyle()}>
              balance: {this.props.curr}{this.props.balance}</Text>
          </View>
        </View>
      </View>
    )
  }
}

export default class FriendsList extends React.PureComponent {
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
    <FriendsItem
      id={item.id}
      onPressItem={this._onPressItem}
      selected={!!this.state.selected.get(item.id)}
      state={item.state}
      balance={item.balance}
      name={item.name}
      curr={item.curr_type}
    />
  );

  render() {
    return (
      <FlatList
        style={friends.friends_layout}
        data={this.props.data}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}
