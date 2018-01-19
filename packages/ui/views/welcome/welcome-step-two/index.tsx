import React, { Component } from 'react'

import { View, Text } from 'react-native'

import style from 'theme/slide'

import { mediumImage } from 'theme/include/dimensions'

import { welcomeView } from 'language'

import TextLogo from 'ui/components/images/text-logo'
import ThemeImage from 'ui/components/images/theme-image'

export default class WelcomeStepTwoView extends Component {
  render() {
    return (
      <View style={style.topView}>
        <TextLogo name='black'/>
        <Text style={style.text}>{welcomeView.youPlayWithFriends}</Text>
        <ThemeImage size={mediumImage} name='dinner'/>
        <Text style={style.caption}>{welcomeView.shareDinner}</Text>
        <ThemeImage size={mediumImage} name='tank'/>
        <Text style={style.caption}>{welcomeView.fillTank}</Text>
        <View style={style.bottomSpacing}/>
      </View>
    )
  }
}
