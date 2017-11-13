import React, { Component } from 'react'

import { View, Text } from 'react-native'

import style from 'theme/slide'

import ThemeImage from 'ui/components/images/theme-image'

import { largeImage } from 'theme/include/dimensions'

import { welcomeView } from 'language'

export default class WelcomeStepOneView extends Component {
  render() {
    return (
      <View style={[style.topView, style.topSpacing]}>
        <ThemeImage size={largeImage} name='logo'/>
        <Text style={style.text}>{welcomeView.makeItEasy}</Text>
        <Text style={style.text}>{welcomeView.weHelpFriends}</Text>
        <View style={style.horizontial}>
          <Text style={style.text}>[</Text>
          <Text style={[style.text, style.italic]}>{welcomeView.lender}</Text>
          <Text style={style.text}>]</Text>
        </View>
      </View>
    )
  }
}
