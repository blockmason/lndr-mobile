import React, { Component } from 'react'

import { View, Text, ScrollView, TextInput } from 'react-native'
import firebase from 'react-native-firebase'

import general from 'theme/general'
import style from 'theme/slide'
import formStyle from 'theme/form'

import { defaultCurrency } from 'lndr/currencies'
import { amountFormat, formatMemo } from 'lndr/format'

import language from 'language'
const { walkthrough, debtManagement, submit } = language

import Button from 'ui/components/button'

export default class WelcomeStepThreeView extends Component {
  componentDidMount( ) {
    firebase.analytics().setCurrentScreen('welcome-step-three', 'WelcomeStepThreeView');
  }
  render() {
    return (
      <ScrollView>
        <View style={style.topView}>
          <Text style={style.title}>{walkthrough.step3.title}</Text>
          <Text style={style.caption}>{walkthrough.step3.easy}</Text>
          <Button round text={debtManagement.iLent} onPress={() => null} containerStyle={style.addDebtButton} />
          <Button round dark text={debtManagement.iBorrowed} onPress={() => null} containerStyle={style.addDebtButton} />

          <Text style={style.caption}>{walkthrough.step3.selectFriend}</Text>

          <Text style={style.subTitle}>{debtManagement.fields.selectFriend}</Text>
          <Button round text={debtManagement.selectFriend} onPress={() => null} />
          <View style={[general.flex, general.flexRow]} >
            <View style={[general.centeredColumn, {minWidth: 150}]}>
              <Text style={formStyle.title}>{debtManagement.fields.currency}</Text>
              <View style={style.newTransactionRow}>
                <Button black onPress={() => null} text={defaultCurrency} />
              </View>
            </View>
            <View style={general.centeredColumn}>
              <Text style={formStyle.title}>{debtManagement.fields.amount}</Text>
              <View style={style.newTransactionRow}>
                <TextInput
                  style={[formStyle.jumboInput, {paddingTop:15}]}
                  placeholder={amountFormat(walkthrough.step4.positiveBalance, defaultCurrency, true)}
                  placeholderTextColor='black'
                  value={amountFormat(walkthrough.step4.positiveBalance, defaultCurrency, true)}
                  maxLength={10}
                  underlineColorAndroid='transparent'
                  keyboardType='numeric'
                  onChangeText={() => null}
                  autoCorrect={false}
                />
              </View>
            </View>
          </View>

          <Text style={style.caption}>{walkthrough.step3.addMemo}</Text>
          <View style={formStyle.memoBorder} >
            <TextInput
              style={formStyle.memoInput}
              placeholder={debtManagement.memo.example}
              value={debtManagement.memo.example}
              underlineColorAndroid='transparent'
              onChangeText={memo => this.setState({ memo: formatMemo(memo) })}
            />
          </View>
          <Button large round wide onPress={() => null} text={submit} />
        </View>
      </ScrollView>
    )
  }
}
