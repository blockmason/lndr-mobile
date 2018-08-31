import React, { Component } from 'react'

import { Image, View, Text, ScrollView } from 'react-native'
import firebase from 'react-native-firebase'

import general from 'theme/general'
import style from 'theme/slide'
import accountStyle from 'theme/account'

import language from 'language'
const { walkthrough, debtManagement } = language

import Button from 'ui/components/button'

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
          <Text style={style.title}>{walkthrough.step5.title}</Text>
          <Text style={style.caption}>{walkthrough.step5.multiCurrency}</Text>
          <Text style={accountStyle.balanceSectionTitle}>{debtManagement.balanceByCurrency}</Text>
          <Image style={style.fullWidthImage55} source={require('images/walkthrough5-sample.png')} />
          <Text style={style.caption}>{walkthrough.step5.exchangeRate}</Text>
          <Button alternate arrow text={walkthrough.continue} onPress={this.props.onComplete} />
        </View>
      </ScrollView>
    )
  }
}
