import React, { Component } from 'react'

import { View, Text } from 'react-native'

import style from 'theme/slide'

import { mediumImage } from 'theme/include/dimensions'

import { welcomeView } from 'language'

import Lndr from 'ui/components/images/lndr-text'
import Travel from 'ui/components/images/travel'
import Concert from 'ui/components/images/concert'

export default class WelcomeStepThreeView extends Component {
  render() {
    return (
      <View style={style.topView}>
        <Lndr />
        <Text style={style.text}>{welcomeView.youPlayWithFriends}</Text>
        <Travel size={mediumImage} />
        <Text style={style.text}>{welcomeView.travelTogether}</Text>
        <Concert size={mediumImage}/>
        <Text style={style.text}>{welcomeView.greatConcert}</Text>
      </View>
    )
  }
}
