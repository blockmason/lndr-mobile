import React, { Component } from 'react'

import { View, Text } from 'react-native'

import style from 'theme/slide'

import Logo from 'ui/components/images/logo'

import { largeImage } from 'dimen/image'

import { welcomeMakeItEasy, welcomeWeHelpFriends, welcomeLender } from 'language'

export default class WelcomeStepOneView extends Component {
  render() {
    return (
      <View style={[style.topView, style.topSpacing]}>
        <Logo size={largeImage}/>
        <Text style={style.text}>{welcomeMakeItEasy}</Text>
        <Text style={style.text}>{welcomeWeHelpFriends}</Text>
        <View style={style.horizontial}>
          <Text style={style.text}>[</Text>
          <Text style={[style.text, style.italicOnly]}>{welcomeLender}</Text>
          <Text style={style.text}>]</Text>
        </View>
      </View>
    )
  }
}
