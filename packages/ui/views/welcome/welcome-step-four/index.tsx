import React, { Component } from 'react'

import { View, Text, ScrollView } from 'react-native'
import firebase from 'react-native-firebase'

import { defaultCurrency } from 'lndr/currencies'
import { amountFormat } from 'lndr/format'

import Button from 'ui/components/button'

import general from 'theme/general'
import style from 'theme/slide'

import language from 'language'
const { walkthrough, settlementManagement, payPalLanguage, debtManagement } = language

export default class WelcomeStepFourView extends Component {
  componentDidMount( ) {
    firebase.analytics().setCurrentScreen('welcome-step-four', 'WelcomeStepFourView');
  }

  render() {
    return (
      <ScrollView>
        <View style={style.topView}>

          <View style={style.titleContainer}>
            <Text style={style.title}>{walkthrough.step4.title}</Text>
            <View style={style.whiteTriangle} />
          </View>

          <View style={general.flex}>
            <Text style={style.caption}>{walkthrough.step4.ready}</Text>
            <Text style={style.positiveBalance}>{`+${amountFormat(walkthrough.step4.positiveBalance, defaultCurrency, true)}`}</Text>
            <Button wide round text={debtManagement.settleUp} onPress={() => null} />
          </View>

          <Text style={style.caption}>{walkthrough.step4.payPal}</Text>
          <Button zicon="paypal" round wide onPress={() => null} text={payPalLanguage.requestPayPalPayment} />

          <Text style={style.caption}>{walkthrough.step4.ether}</Text>
          <Button round wide text={settlementManagement.eth} onPress={() => null} />

          <Text style={style.caption}>{walkthrough.step4.cash}</Text>
          <Text style={style.subTitle}>{debtManagement.fields.settlementAmount}</Text>
          <Text style={style.balance}>{`+${amountFormat(walkthrough.step4.positiveBalance, defaultCurrency, true)}`}</Text>
          <Button wide round text={debtManagement.settleUp} onPress={() => null} />
        </View>
      </ScrollView>
    )
  }
}
