import React, { Component } from 'react'

import { View, ScrollView, Dimensions } from 'react-native'
import { getResetAction } from 'reducers/nav'

import { UserData } from 'lndr/user'
import { debounce } from 'lndr/time'
import { currencyFormats, amountFormat } from 'lndr/format'
import Friend from 'lndr/friend'
import { defaultCurrency, currencySymbols, transferLimits  } from 'lndr/currencies'
import profilePic from 'lndr/profile-pic'

import Button from 'ui/components/button'
import Loading, { LoadingContext } from 'ui/components/loading'
import DashboardShell from 'ui/components/dashboard-shell'
import RecentView from 'ui/views/account/activity/recent'

import style from 'theme/friend'
import formStyle from 'theme/form'
import general from 'theme/general'
import accountStyle from 'theme/account'

import language, { currencies, transferLimits } from 'language'
const {
  settlementManagement,
  debtManagement
} = language

import { getUser, recentTransactions, getEthBalance, getEthExchange, getWeeklyEthTotal, getUcacAddr } from 'reducers/app'
import { addDebt } from 'actions'
import { connect } from 'react-redux'
import { addNavigationHelpers } from 'react-navigation';

const submittingTransaction = new LoadingContext()

const { width } = Dimensions.get('window')

interface Props {
  navigation: any
}

export default class SettleUp extends Component<Props> {
  render() {
    const { navigation } = this.props
    const friend = navigation ? navigation.state.params.friend : {}

    return <ScrollView style={general.whiteFlex} keyboardShouldPersistTaps='handled'>
      <Loading context={submittingTransaction} />
      <DashboardShell text={debtManagement.settleUpLower} navigation={navigation} />
      <View style={{marginBottom: 10, marginTop: -10}}>
        <Button close onPress={() => navigation.goBack()} />
      </View>
      <View style={[general.centeredColumn, {marginVertical: 20}]}>
        <Button fat round onPress={() => navigation.navigate('EthSettlement', { friend })} text={settlementManagement.eth} style={{minWidth: width / 4 * 3}} />
        <Button fat round onPress={() => navigation.navigate('NonPaymentSettlement', { friend })} text={settlementManagement.nonPayment} style={{minWidth: width / 4 * 3}} />
      </View>
    </ScrollView>
  }
}
