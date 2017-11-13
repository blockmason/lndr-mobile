import React, { Component } from 'react'

import { View, Text } from 'react-native'

import style from 'theme/slide'

import { mediumImage } from 'dimen/image'

import { welcomeYouPlayWithFriends, welcomeShareDinner, welcomeFillTank } from 'language'

import Lndr from 'ui/components/images/lndr-text'
import Dinner from 'ui/components/images/dinner'
import Tank from 'ui/components/images/tank'

export default class WelcomeStepTwoView extends Component {
  render() {
    return (
      <View style={style.topView}>
        <Lndr />
        <Text style={style.text}>{welcomeYouPlayWithFriends}</Text>
        <Dinner size={mediumImage}/>
        <Text style={style.text}>{welcomeShareDinner}</Text>
        <Tank size={mediumImage}/>
        <Text style={style.text}>{welcomeFillTank}</Text>
      </View>
    )
  }
}
