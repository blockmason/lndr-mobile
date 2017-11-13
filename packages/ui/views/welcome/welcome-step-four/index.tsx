import React, { Component } from 'react'

import { View, Text, Dimensions } from 'react-native'

import style from 'theme/slide'

import { largeImage } from 'theme/include/dimensions'

import { welcomeView } from 'language'

import Lndr from 'ui/components/images/lndr-text'
import Blockchain from 'ui/components/images/blockchain'

export default class WelcomeStepFourView extends Component {
  render() {
    return (
      <View style={style.topView}>
        <Lndr/>
        <Text style={[style.text, style.topSpacing]}>{welcomeView.firstLendingApp}</Text>
        <Blockchain size={largeImage}/>
        <Text style={style.text}>{welcomeView.runEthereum}</Text>
      </View>
    )
  }
}
