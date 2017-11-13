import React, { Component } from 'react'

import { View, Text } from 'react-native'

import style from 'theme/slide'

import { mediumImage } from 'dimen/image'

import { welcomeYouPlayWithFriends, welcomeTravelTogether, welcomeGreatConcert } from 'language'

import Lndr from 'ui/components/images/lndr-text'
import Travel from 'ui/components/images/travel'
import Concert from 'ui/components/images/concert'

export default class WelcomeStepThreeView extends Component {
  render() {
    return (
      <View style={style.topView}>
        <Lndr />
        <Text style={style.text}>{welcomeYouPlayWithFriends}</Text>
        <Travel size={mediumImage} />
        <Text style={style.text}>{welcomeTravelTogether}</Text>
        <Concert size={mediumImage}/>
        <Text style={style.text}>{welcomeGreatConcert}</Text>
      </View>
    )
  }
}
