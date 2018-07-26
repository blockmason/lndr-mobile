import React, { Component } from 'react'

import { View, Text, ScrollView } from 'react-native'

import style from 'theme/slide'

import ThemeImage from 'ui/components/images/theme-image'
import BMLogo from 'ui/components/images/bm-logo'

import { largeImage } from 'theme/include/dimensions'

import language from 'language'
const { welcomeView } = language

export default class WelcomeStepOneView extends Component {
  render() {
    return (
      <ScrollView>
        <View style={style.topView}>
          <ThemeImage size={largeImage} name='logo'/>
          <Text style={style.text}>{welcomeView.makeItEasy}</Text>
          {/* <Text style={style.text}>{welcomeView.weHelpFriends}</Text> */}
          <View style={style.horizontial}>
            <Text style={[style.text, style.bold]}>[ {welcomeView.len}</Text>
            <View style={style.dot}></View>
            <Text style={[style.text, style.bold]}>{welcomeView.der} ]</Text>
          </View>
          <Text style={style.by}>{welcomeView.by}</Text>
          <BMLogo type='square' size='small'/>
          <Text style={style.inc}>INC.</Text>
        </View>
      </ScrollView>
    )
  }
}
