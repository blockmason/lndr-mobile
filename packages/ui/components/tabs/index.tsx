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

const getUnderlineTextStyle = (active?: boolean) => {
  return active ? style.underlineActive : style.noUnderline
}

interface Props {
  text: string
  alerts?: number
  badge?: any
  onPress: () => void
  active: boolean
}

export class Tab extends Component<Props> {
  render() {
    const { alerts, onPress, badge, text } = this.props

    const tabStyle = getTabStyle(this.props.active)
    const textStyle = getTextStyle(this.props.active)
    const underlineStyle = getUnderlineTextStyle(this.props.active)

    return (
      <TouchableHighlight
        style={this.props.style}
        underlayColor={clear}
        activeOpacity={0.5}
        onPress={onPress}
      >
        <View style={tabStyle}>
          <View style={style.tabContent}>
            <View style={[style.alert, alerts === undefined || alerts < 1 ? style.none : null]}>
              <Text style={style.alertText}>{alerts}</Text>
            </View>
            <View style={underlineStyle}>
              <Text style={textStyle}>{text}</Text>
            </View>
            {badge}
          </View>
        </View>
      </TouchableHighlight>
  )
  }
}
