import React, { Component } from 'react'

import { TouchableHighlight, View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import { clear, aqua } from 'theme/include/colors'
import style from 'theme/tabs'

interface Props {
  style: any
  icon: string
  alerts?: number
  badge?: any
  onPress: () => void
  active: boolean
}

export class Tab extends Component<Props> {
  render() {
    const { alerts, onPress, badge, icon, active } = this.props

    const underlineStyle = active ? style.underlineActive : {}

    return (
      <TouchableHighlight style={this.props.style} underlayColor={clear} activeOpacity={0.5} onPress={onPress}>
        <View style={style.tab}>
          <View style={style.tabContent}>
            <View style={[style.alert, alerts === undefined || alerts < 1 ? style.none : null]}>
              <Text style={style.alertText}>{alerts}</Text>
            </View>
            <View style={underlineStyle}>
              <Icon name={icon} style={style.icon} />
            </View>
            {badge}
          </View>
        </View>
      </TouchableHighlight>
  )
  }
}
