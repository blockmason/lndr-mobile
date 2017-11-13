import React, { Component } from 'react'

import { View, Text, Dimensions } from 'react-native'

import style from 'theme/slide'

import { largeImage } from 'dimen/image'

import { welcomeRunEthereum, welcomeFirstLendingApp } from 'language'

import Lndr from 'ui/components/images/lndr-text'
import Blockchain from 'ui/components/images/blockchain'

export default class WelcomeStepFourView extends Component {
  render() {
    return (
      <View style={style.topView}>
        <Lndr/>
        <Text style={[style.text, style.topSpacing]}>{welcomeFirstLendingApp}</Text>
        <Blockchain size={largeImage}/>
        <Text style={style.text}>{welcomeRunEthereum}</Text>
      </View>
    )
  }
}
