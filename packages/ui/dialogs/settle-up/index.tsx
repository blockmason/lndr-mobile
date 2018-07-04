import React, { Component } from 'react'

import { View, ScrollView, Dimensions } from 'react-native'

import Button from 'ui/components/button'
import Loading, { LoadingContext } from 'ui/components/loading'
import DashboardShell from 'ui/components/dashboard-shell'

import general from 'theme/general'

import language from 'language'
const {
  settlementManagement,
  debtManagement
} = language

const submittingTransaction = new LoadingContext()

const { width } = Dimensions.get('window')

interface Props {
  navigation: any
}

export default class SettleUp extends Component<Props> {
  render() {
    const { navigation } = this.props
    const friend = navigation ? navigation.state.params.friend : {}

    return <View style={general.whiteFlex}>
      <View style={general.view}>
        <Loading context={submittingTransaction} />
        <DashboardShell text={debtManagement.settleUpLower} navigation={navigation} />
        <Button close onPress={() => navigation.goBack()} />
      </View>
      <ScrollView style={general.whiteFlex} keyboardShouldPersistTaps='handled'>
        <View style={[general.centeredColumn, {marginVertical: 20}]}>
          <Button fat round onPress={() => navigation.navigate('Settlement', { friend, settlementType: 'eth' })} text={settlementManagement.eth} style={{minWidth: width / 4 * 3}} />
          <Button fat round onPress={() => navigation.navigate('Settlement', { friend, settlementType: 'paypal' })} text={settlementManagement.paypal} style={{minWidth: width / 4 * 3}} />
          <Button fat round onPress={() => navigation.navigate('Settlement', { friend, settlementType: 'record' })} text={settlementManagement.nonPayment} style={{minWidth: width / 4 * 3}} />
        </View>
      </ScrollView>
    </View>
  }
}
