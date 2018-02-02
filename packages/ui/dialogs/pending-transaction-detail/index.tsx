import React, { Component } from 'react'

import { Text, TextInput, TouchableHighlight, View, Image, ScrollView } from 'react-native'
import { UserData } from 'lndr/user'

import { debounce } from 'lndr/time'
import { cents } from 'lndr/format'
import PendingTransaction from 'lndr/pending-transaction'

import Button from 'ui/components/button'
import Loading, { LoadingContext } from 'ui/components/loading'
import DashboardShell from 'ui/components/dashboard-shell'

import style from 'theme/pending'
import formStyle from 'theme/form'
import general from 'theme/general'

import {
  back,
  cancel,
  pendingTransactionsLanguage,
  debtManagement
} from 'language'

import { getUser, submitterIsMe } from 'reducers/app'
import { confirmPendingTransaction, rejectPendingTransaction } from 'actions'
import { connect } from 'react-redux'

const loadingContext = new LoadingContext()

interface Props {
  confirmPendingTransaction: (pendingTransaction: PendingTransaction) => any
  rejectPendingTransaction: (pendingTransaction: PendingTransaction) => any
  user: UserData
  submitterIsMe: (pendingTransaction: PendingTransaction) => boolean
  navigation: any
}

class PendingTransactionDetail extends Component<Props> {
  async confirmPendingTransaction(pendingTransaction: PendingTransaction) {
    const success = await loadingContext.wrap(
      this.props.confirmPendingTransaction(pendingTransaction)
    )

    if (success) {
      this.closePopup('confirm')
    } else {
      this.props.navigation.goBack()
    }
  }

  async rejectPendingTransaction(pendingTransaction: PendingTransaction) {
    const success = await loadingContext.wrap(
      this.props.rejectPendingTransaction(pendingTransaction)
    )

    if (success) {
      this.closePopup('reject')
    } else {
      this.props.navigation.goBack()
    }
  }

  closePopup(type) {
    this.props.navigation.navigate('Confirmation', { type: type, friend: { nickname: this.getFriendNickname() } })
  }

  getFriendNickname() {
    const { user, navigation} = this.props
    const pendingTransaction = navigation.state ? navigation.state.params.pendingTransaction : {}

    if (user.address === pendingTransaction.creditorAddress) {
      return pendingTransaction.debtorNickname
    } else {
      return pendingTransaction.creditorNickname
    }
  }

  getTitle() {
    const { user, navigation } = this.props
    const pendingTransaction = navigation.state ? navigation.state.params.pendingTransaction : {}

    if (user.address === pendingTransaction.creditorAddress) {
      return debtManagement.direction.pendingLend(pendingTransaction.debtorNickname)
    } else if (user.address === pendingTransaction.debtorAddress) {
      return debtManagement.direction.pendingBorrow(pendingTransaction.creditorNickname)
    } else {
      return 'Unknown Transaction'
    }
  }

  labelRow(label, info) {
    return <View style={style.labelRow}>
      <View style={{flex: 1}}>
        <Text style={style.label}>{label}</Text>
      </View>
      <View style={{flex: 3}}>
        <Text style={style.info}>{info}</Text>
      </View>
    </View>
  }

  showButtons() {
    const { submitterIsMe, navigation } = this.props
    const pendingTransaction = navigation.state ? navigation.state.params.pendingTransaction : {}
    if (submitterIsMe(pendingTransaction)) {
      return <Button alternate arrowRed onPress={() => this.rejectPendingTransaction(pendingTransaction)} text={pendingTransactionsLanguage.cancel} />
    }

    return <View style={{marginBottom: 10}}>
      <Button round large onPress={() => this.confirmPendingTransaction(pendingTransaction)} text={pendingTransactionsLanguage.confirm} />
      <Button alternate arrowRed onPress={() => this.rejectPendingTransaction(pendingTransaction)} text={pendingTransactionsLanguage.reject} />
    </View>
  }

  render() {
    const { user, submitterIsMe, navigation } = this.props
    const pendingTransaction = navigation.state ? navigation.state.params.pendingTransaction : {}

    return <ScrollView style={[general.fullHeight, general.view]}>
      <Loading context={loadingContext} />
      <DashboardShell text='Pending Transaction' />
      <Button close onPress={() => this.props.navigation.goBack()} />
      <View style={general.centeredColumn}>
        <Image source={require('images/person-outline-dark.png')} style={style.image}/>
        <Text style={style.title}>{this.getTitle()}</Text>
        <View style={style.balanceRow}>
          <Text style={style.balanceInfo}>$</Text>
          <Text style={style.amount}>{cents(pendingTransaction.amount)}</Text>
          <Text style={style.balanceInfo}>USD</Text>
        </View>
        {this.labelRow('For', pendingTransaction.memo.trim())}
        <View style={{marginBottom: 10}}/>
        {this.showButtons()}
      </View>
    </ScrollView>
  }
}

export default connect((state) => ({ user: getUser(state)(), submitterIsMe: submitterIsMe(state) }),
{ confirmPendingTransaction, rejectPendingTransaction })(PendingTransactionDetail)
