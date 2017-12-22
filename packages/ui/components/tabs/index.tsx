import React, { Component } from 'react'

import { RefreshControl, TouchableHighlight, ScrollView, View, Text } from 'react-native'

import { lightGray, gray, clear } from 'theme/include/colors'

import style from 'theme/tabs'

const getTextStyle = (active?: boolean) => {
  return [ style.text, active ? style.textActive : style.text ]
}

const getTabStyle = (active?: boolean) => {
  return [ style.tab, active ? style.tabActive : style.tab ]
}

interface Props {
  text: string
  badge?: any
  onPress: () => void
  active: boolean
}

export class Tab extends Component<Props> {
  render() {
    const tabStyle = getTabStyle(this.props.active)
    const textStyle = getTextStyle(this.props.active)

    return (
      <TouchableHighlight
        style={style.tabContainer}
        underlayColor={clear}
        activeOpacity={0.5}
        onPress={this.props.onPress}
      >
        <View style={tabStyle}>
          <View style={style.tabContent}>
            <Text style={textStyle}>{this.props.text}</Text>
            {this.props.badge}
      </View>
    </View>
  </TouchableHighlight>
  )
  }
}
