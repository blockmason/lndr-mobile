import React, { Component } from 'react'
import { Image, View, Text, ScrollView } from 'react-native'
import firebase from 'react-native-firebase'

import style from 'theme/slide'
import accountStyle from 'theme/account'

import Button from 'ui/components/button'

import language from 'language'
const { walkthrough, debtManagement } = language

interface Props {
  onComplete: () => void
}

export default class WelcomeStepFiveView extends Component<Props> {
  componentDidMount( ) {
    firebase.analytics().setCurrentScreen('welcome-step-five', 'WelcomeStepFiveView');
  }

  render() {
    return (
      <ScrollView>
        <View style={style.topView}>
        <View style={style.titleContainer}>
            <Text style={style.title}>{walkthrough.step5.title}</Text>
            <View style={style.whiteTriangle} />
          </View>
          <Text style={style.caption}>{walkthrough.step5.multiCurrency}</Text>
          <Text style={accountStyle.balanceSectionTitle}>{debtManagement.balanceByCurrency}</Text>
          <Image style={style.fullWidthImage55} source={require('images/walkthrough5-sample.png')} />
          <Text style={style.caption}>{walkthrough.step5.exchangeRate}</Text>

          <Button large alternate arrow onPress={this.props.onComplete} text={walkthrough.step5.start}/>
        </View>
      </ScrollView>
    )
  }
}
