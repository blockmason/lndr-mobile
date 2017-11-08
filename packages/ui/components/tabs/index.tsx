import React, { Component } from 'react'

import { TouchableHighlight, ScrollView, View, Text } from 'react-native'

import { dark } from 'theme/include/colors'

import style from 'theme/tabs'

interface TabProps {
  reference: string
  title: string
}

export class Tab extends Component<TabProps> {
}

const getTextStyle = (active?: boolean) => {
  return active ? style.textActive : style.text
}

const getTabStyle = (active?: boolean) => {
  return active ? style.tabActive : style.tab
}

interface Props {
}

interface State {
  activeReference?: string
}

export default class Tabs extends Component<Props, State> {
  constructor() {
    super()
    this.state = {
      activeReference: undefined
    }
  }
  render() {
    const { children: tabs } = this.props
    let { activeReference } = this.state

    const tabList = (tabs as any[]).map(tab => {
      if (!activeReference) {
        activeReference = tab.props.reference
      }

      const tabStyle = getTabStyle(tab.props.reference === activeReference)
      const textStyle = getTextStyle(tab.props.reference === activeReference)

      return (
        <TouchableHighlight
          style={style.tabContainer}
          underlayColor={dark}
          activeOpacity={0.5}
          key={tab.props.reference}
          onPress={() => this.setState({ activeReference: tab.props.reference })}
        >
          <View style={tabStyle}>
            <Text style={textStyle}>{tab.props.title}</Text>
          </View>
        </TouchableHighlight>
      )
    })

    const activeTab = (tabs as any[])
      .filter(tab => tab.props.reference === activeReference)
      .pop()

    return (
      <View style={style.topView}>
        <View style={style.tabsContainer}>{tabList}</View>
        <ScrollView style={style.content}>
          {activeTab ? activeTab.props.children : null}
        </ScrollView>
      </View>
    )
  }
}
