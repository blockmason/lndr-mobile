import React, { Component } from 'react'

import { TouchableHighlight, ScrollView, View, Text } from 'react-native'

import { lightGray, dark } from 'theme/include/colors'

import style from 'theme/tabs'

interface TabProps {
  reference: string
  text: string
  tabContainerStyle: any
}

export class Tab extends Component<TabProps> {
}

const getTextStyle = (alternate?: boolean, active?: boolean) => {
  if (alternate) {
    return [ style.text, active ? style.textActiveAlternate : style.textAlternate ]
  }
  return [ style.text, active ? style.textActive : style.text ]
}

const getTabStyle = (alternate?: boolean, active?: boolean) => {
  if (alternate) {
    return [ style.tab, active ? style.tabActiveAlternate : style.tabAlternate ]
  }
  return [ style.tab, active ? style.tabActive : style.tab ]
}

interface Props {
  alternate?: boolean
}

interface State {
  activeReference?: string
}

const getTabContainerStyle = (alternate?: boolean, tabContainerStyle?: any) => {
  const styles: any[] = [style.tabsContainer]

  if (alternate) {
    styles.push(style.tabsContainerAlternate)
  }

  if (tabContainerStyle) {
    styles.push(tabContainerStyle)
  }

  return styles
}

export default class Tabs extends Component<Props, State> {
  constructor() {
    super()
    this.state = {
      activeReference: undefined
    }
  }

  render() {
    const { children: tabs, tabContainerStyle, alternate } = this.props
    let { activeReference } = this.state

    const tabList = (tabs as any[]).map(tab => {
      const { reference } = tab.props

      if (typeof reference !== 'string') {
        throw new Error('Property "reference" must be a string when constructing <Tab />')
      }

      if (!activeReference) {
        activeReference = reference
      }

      const tabStyle = getTabStyle(alternate, reference === activeReference)
      const textStyle = getTextStyle(alternate, reference === activeReference)

      return (
        <TouchableHighlight
          style={style.tabContainer}
          underlayColor={alternate ? lightGray : dark}
          activeOpacity={0.5}
          key={reference}
          onPress={() => this.setState({ activeReference: reference })}
        >
          <View style={tabStyle}>
            <Text style={textStyle}>{tab.props.text}</Text>
          </View>
        </TouchableHighlight>
      )
    })

    const activeTab = (tabs as any[])
      .filter(tab => tab.props.reference === activeReference)
      .pop()

    return (
      <View style={style.topView}>
        <View style={getTabContainerStyle(alternate, tabContainerStyle)}>{tabList}</View>
        <ScrollView style={style.content}>
          {activeTab ? activeTab.props.children : null}
        </ScrollView>
      </View>
    )
  }
}
