import React, { Component } from 'react';
import {
  FlatList,
  TouchableHighlight,
  Text,
  View
} from 'react-native';

import styles from '../../../screens/styles';
import pending from './pending_styles';

class PendingItem extends React.PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      type: props.type,
      data: JSON.parse(props.data.data)
    }

    this.renderWaitingForConfirmation = this.renderWaitingForConfirmation.bind(this);
    this.renderWaitingForFriend = this.renderWaitingForFriend.bind(this);
    this.renderItemFromType = this.renderItemFromType.bind(this);
    this.onConfirmSelected = this.onConfirmSelected.bind(this);
    this.onRejectSelected = this.onRejectSelected.bind(this);
  }

  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  onConfirmSelected() {
    console.log("confirmed");
    console.log(this.props.id);
    console.log(this.props.type);
  }

  onRejectSelected() {
    console.log("rejected");
    console.log(this.props.id);
    console.log(this.props.type);
  }

  getFriendRequestType(confirm) {
    if (confirm) {
      return "You have received a friend request from:"
    }

    return "You have send a friend request to:"
  }

  renderConfirmDebtButtons(confirm) {
    if (confirm) {
      return (
        <View style={pending.end_block}>
          <TouchableHighlight
            onPress={() => this.onRejectSelected()}
            style={pending.dialog_button}>
            <Text style={[pending.dialog_text, {color:"red"}]}>Reject</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => this.onConfirmSelected()}
            style={pending.dialog_button}>
            <Text style={[pending.dialog_text, {color:"green"}]}>Confirm</Text>
          </TouchableHighlight>
        </View>
      )
    }
  }

  renderWaitingForConfirmation(confirm = false) {
    const data = this.state.data;
    return (
      <View
        style={pending.flatlist_row}
        onPress={this._onPress}>
        <Text style={[pending.status_text, styles.thin_font]}>
          {this.props.status}</Text>
        <View style={pending.detail_row}>
           <View style={pending.start_block}>
            <Text style={pending.owe_text}>
              {data.debtor}</Text>
            <Text>{data.verb}</Text>
            <Text style={pending.owe_text}>
              {data.creditor}</Text>
           </View>
           <View style={pending.memo_block}>
            <Text style={pending.name_title}>memo:</Text>
            <Text style={pending.memo_text}>{data.memo}</Text>
           </View>
           <View style={pending.end_block}>
            <Text style={[pending.amount_text, styles.thin_font]}>
              {data.sym}{data.amount}</Text>
            <Text style={pending.curr_text}>
              {data.curr} </Text>
          </View>
        </View>
        {this.renderConfirmDebtButtons(confirm)}
      </View>
    )
  }

  renderWaitingForFriend(confirm = false) {
    const data = this.state.data;
    return (
      <View
        style={pending.flatlist_row}
        onPress={this._onPress}>
        <Text style={[pending.status_text, styles.thin_font]}>
          {this.props.status}</Text>
        <Text style={pending.name_title}>{this.getFriendRequestType(confirm)}</Text>
        <Text style={pending.name_text}>{data.username}</Text>
        <Text style={pending.name_title}>A.K.A</Text>
        <Text style={pending.name_text}>{data.nickname}</Text>
        {this.renderConfirmDebtButtons(confirm)}
      </View>
    )
  }

  //Normally dislike switch with a passion, but it is useful for UI render
  renderItemFromType() {
    var type = this.state.type

    if (type == "waiting_debt") {
      return this.renderWaitingForConfirmation()
    }

    if (type == "confirm_debt") {
      return this.renderWaitingForConfirmation(true)
    }

    if (type == "waiting_friend") {
      return this.renderWaitingForFriend()
    }

    if (type == "confirm_friend") {
      return this.renderWaitingForFriend(true)
    }
  }

  render() {
    return (
      <View>
        {this.renderItemFromType()}
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
      type={item.type}
      data={item}
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
