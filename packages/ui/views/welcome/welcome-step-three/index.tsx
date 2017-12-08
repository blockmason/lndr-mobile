import React, { Component } from 'react'

import { View, Text } from 'react-native'

import style from 'theme/slide'

import { mediumImage } from 'theme/include/dimensions'

import { welcomeView } from 'language'

import TextLogo from 'ui/components/images/text-logo'
import ThemeImage from 'ui/components/images/theme-image'

export default class WelcomeStepThreeView extends Component {
  render() {
    return (
      <View style={style.topView}>
        <TextLogo />
        <Text style={style.text}>{welcomeView.youPlayWithFriends}</Text>
        <ThemeImage size={mediumImage} name='travel'/>
        <Text style={style.text}>{welcomeView.travelTogether}</Text>
        <ThemeImage size={mediumImage} name='concert'/>
        <Text style={style.text}>{welcomeView.greatConcert}</Text>
        <View style={style.bottomSpacing}/>
      </View>
    )
  }
}
