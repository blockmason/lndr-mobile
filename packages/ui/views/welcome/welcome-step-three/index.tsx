import React, { Component } from 'react'

import { View, Text } from 'react-native'

import style from 'theme/slide'

import { mediumImage } from 'theme/include/dimensions'

import language from 'language'
const { welcomeView } = language

import TextLogo from 'ui/components/images/text-logo'
import ThemeImage from 'ui/components/images/theme-image'

export default class WelcomeStepThreeView extends Component {
  render() {
    return (
      <View style={style.topView}>
        <TextLogo name='black'/>
        <Text style={style.text}>{welcomeView.youPlayWithFriends}</Text>
        <ThemeImage size={mediumImage} name='travel'/>
        <Text style={style.caption}>{welcomeView.travelTogether}</Text>
        <ThemeImage size={mediumImage} name='concert'/>
        <Text style={style.caption}>{welcomeView.greatConcert}</Text>
        <View style={style.bottomSpacing}/>
      </View>
    )
  }
}
