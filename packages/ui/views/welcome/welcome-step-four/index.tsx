import React, { Component } from 'react'

import { View, Text, Dimensions } from 'react-native'

import style from 'theme/slide'

import { largeImage } from 'theme/include/dimensions'

import { welcomeView } from 'language'

import TextLogo from 'ui/components/images/text-logo'
import ThemeImage from 'ui/components/images/theme-image'

export default class WelcomeStepFourView extends Component {
  render() {
    return (
      <View style={style.topView}>
        <TextLogo/>
        <Text style={[style.text, style.topSpacing]}>{welcomeView.firstLendingApp}</Text>
        <ThemeImage size={largeImage} name={'blockchain'}/>
        <Text style={style.text}>{welcomeView.runEthereum}</Text>
      </View>
    )
  }
}
