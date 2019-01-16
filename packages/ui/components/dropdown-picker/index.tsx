import React from 'react'
import { Text, TouchableHighlight, View, Platform, Picker, ActionSheetIOS } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import formStyle from 'theme/form'
import { white } from 'theme/include/colors'

import language from 'language'
const { settlementManagement } = language

interface Props {
  selectText?: boolean
  targetKey: string
  options: any[]
  selection: any
  onSelect: (selection: any) => void
}

export default class DropdownPicker extends React.Component<Props> {
  constructor(props) {
    super(props)

    this.showActionSheet = this.showActionSheet.bind(this)
  }

  showActionSheet() {
    const { options, targetKey, onSelect, selectText } = this.props
    const activeOptions = selectText ? options.slice(1) : options

    ActionSheetIOS.showActionSheetWithOptions({
      options: activeOptions.map(choice => choice[targetKey]),
      title: settlementManagement.select
    },
    (index) => {
      onSelect(activeOptions[index][targetKey])
    })
  }

  render() {
    const { selection, targetKey, options, onSelect } = this.props
    const text = selection ? selection[targetKey] : settlementManagement.select

    if (!selection || !selection[targetKey]) {
      return <View/>
    }

    if(Platform.OS === 'android') {
      return <View style={formStyle.settlementPickerBackground}>
        <Picker
          selectedValue={selection[targetKey]} style={formStyle.settlementPicker}
          onValueChange={onSelect}>
          {options.map((value, key) => <Picker.Item label={value[targetKey]} key={key} value={value[targetKey]}>{selection[targetKey]}</Picker.Item>)}
        </Picker>
        <FontAwesome style={formStyle.whiteCaretDown} name={'caret-down'} />
      </View>
    } else {
      return <TouchableHighlight onPress={this.showActionSheet} underlayColor={white}>
        <View style={formStyle.settlementPickerBackground}>
          <Text style={[formStyle.settlementPicker, {paddingTop: 12}]}>{text}</Text>
          <FontAwesome style={formStyle.whiteCaretDown} name={'caret-down'} />
        </View>
      </TouchableHighlight>
    }
  }
}
