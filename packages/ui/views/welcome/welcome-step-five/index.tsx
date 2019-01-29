import React, { Component } from 'react'
import { Image, View, Text, ScrollView } from 'react-native'
import firebase from 'react-native-firebase'

import style from 'theme/slide'
import accountStyle from 'theme/account'

import Button from 'ui/components/button'

import language from 'language'
import general from 'theme/general'
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

          <View style={general.centeredColumn}>
            <View style={[general.betweenRow, style.currencyRow]}>
              <Text style={style.currencySymbol}>JP¥</Text><Text style={style.currencyAmount} >+320</Text>
            </View>
            <View style={[general.betweenRow, style.currencyRow]}>
              <Text style={style.currencySymbol}>€</Text><Text style={style.currencyAmount} >+15.50</Text>
            </View>
            <View style={[general.betweenRow, style.currencyRow]}>
              <Text style={style.currencySymbol}>US$</Text><Text style={style.currencyAmount} >+10.00</Text>
            </View>
            <View style={[general.betweenRow, style.totalRow]}>
              <Text style={style.currencyTotal}>{debtManagement.total}</Text><Text style={style.currencyTotal}>+US$31.23</Text>
            </View>
          </View>

          <Text style={style.caption}>{walkthrough.step5.exchangeRate}</Text>

          <Button large alternate arrow link onPress={this.props.onComplete} text={walkthrough.step5.start}/>
        </View>
      </ScrollView>
    )
  }
}
