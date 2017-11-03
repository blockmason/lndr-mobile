import React, { Component } from 'react';
import {TextInputMask} from 'react-native-masked-text';
import KeyboardSpacer from 'react-native-keyboard-spacer';
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
import { updateFriends, updatePending } from '../../../actions/data';
import { updateCount } from '../../../actions/updateCount';

import StatusAlert from '../../../components/status/StatusAlert';

import { insertRecord, executeTransaction } from '../../../utils/Storage';
import add_friend from './add_friend_styles';

export class AddFriend extends Component {

  constructor(props) {
     super(props);

     this.state = {
       username: "",
       nickname: "",
     };

     this.submitFriendRequest = this.submitFriendRequest.bind(this);
     this.searchForFriend = this.searchForFriend.bind(this);
  }

  submitFriendRequest() {

    const actions = this.props.actions;
    const username = this.state.username;
    const nickname = this.state.nickname;

    //check that username is valid from server
    if (username && nickname) {

      const friends = {
        table: 'friends',
        action: 'insert',
        data: [username, nickname, "USD"]
      }

      insertRecord(friends, (result) => {
        actions.updateFriends(result)
      });

      const json = {
        username: username,
        nickname: nickname
      }

      const pending = {
        table: 'pending',
        action: 'insert',
        data: ['Waiting for Friend Confirmation', 'waiting_friend', JSON.stringify(json)]
      }

      insertRecord(pending, (result) => {
        actions.updatePending(result);
        actions.updateCount(result.length)
      })

      this.props.dismiss();
    } else {

      this.statusAlert.display({
        type: 'warn',
        title: 'Missing information',
        body: 'Some of the fields have not been filled out'
      })
    }
  }

  searchForFriend(username) {

    // fuzzy search, need endpoint for searching, min 3 characters
    this.setState({username: username})
  }

  render() {
    return (
      <ScrollView>
        <Text style={add_friend.section_title}>1) Search for your friend:</Text>
        <TextInput
          placeholder="Enter username or eth account"
          style={add_friend.dialog_margins}
          onChangeText = {(fragment) => this.searchForFriend(fragment)}
          value = {this.state.username}/>
        <Text style={add_friend.section_title}>2) Enter a nickname for your friend:</Text>
        <TextInput
          placeholder="Add nickname"
          style={add_friend.dialog_margins}
          onChangeText = {(username) => this.setState({nickname: username})}
          value = {this.state.nickname}/>
        <TouchableHighlight
          onPress={() => this.submitFriendRequest()}
          style={[add_friend.dialog_button, {backgroundColor: '#FFF'}]}>
          <Text style={add_friend.dialog_text}>Send Friend Request</Text>
        </TouchableHighlight>
        <KeyboardSpacer/>
        <StatusAlert
          display={'dialog'}
          ref={(statusAlert) => this.statusAlert = statusAlert}/>
      </ScrollView>
    );
  }
}

export const mapStateToProps = ({ friends }) => ({ state: friends });

export const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ updateFriends, updatePending, updateCount }, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(AddFriend);
