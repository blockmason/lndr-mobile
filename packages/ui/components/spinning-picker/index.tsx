import React, { Component } from 'react'
import { Picker, Text, View } from 'react-native'

import Button from 'ui/components/button'

import style from 'theme/account'
import general from 'theme/general'

import language from 'language'
const { debtManagement, confirmation } = language

interface Props {
  onPickerDone: (selectedItem: any) => void
  containerStyle?: any
  pickerStyle?: any
  label: string
  selectedItem: any
  allItems: any
}

interface State {
  selectedItem: string
}

class SpinningPicker extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      selectedItem: this.props.selectedItem
    }
 }

  render() {
      const pickerItems = this.props.allItems.map((value, key) => <Picker.Item label={value} key={key} value={value} /> )
      return (
        <View style={this.props.containerStyle}>
          <View style={[general.flexRow, general.alignCenter, general.standardHMargin]}>
            <Text style={[general.stretch, style.title]}>{this.props.label}</Text>
            <Button round narrow onPress={() => this.props.onPickerDone(this.state.selectedItem)} text={confirmation.done} />
          </View>
          <Picker
            selectedValue={this.state.selectedItem}
            onValueChange={(value, _index) => this.setState({selectedItem: value})}
            prompt={this.props.label}
            style={this.props.pickerStyle}
            cancel>
            {pickerItems}
          </Picker>
        </View>
      );
  }
}

export default SpinningPicker
