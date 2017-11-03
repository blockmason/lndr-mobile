import React, { Component } from 'react';
import {
    View
} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';

const DISPLAY_MODES = {
  'dialog': { padding: 3, paddingTop: 0, flexDirection: 'row' },
  'screen': { padding: 10, paddingTop: 50, flexDirection: 'row' }
}

const getDisplayMode = (display) => {
  const mode = DISPLAY_MODES[display];

  if (mode) {
    return mode;
  }

  return DISPLAY_MODES.screen;
}

export default class StatusAlert extends Component {

  constructor(props) {
     super(props);

     this.state = {
       displayMode: getDisplayMode(props.display)
     }
  }

  display = (options) => {
    const {type, title, body} = options;

    if (type) {
      this.dropdown.alertWithType(type, title, body);
    }
  };
  // ...
  onClose(data) {
    // data = {type, title, message, action}
    // action means how the alert was closed.
    // returns: automatic, programmatic, tap, pan or cancel
  }

  render() {
    return (
      <DropdownAlert
        ref={(dropdown) => this.dropdown = dropdown}
        defaultContainer={this.state.displayMode}
        onClose={data => this.onClose(data)} />
    );
  }
}
