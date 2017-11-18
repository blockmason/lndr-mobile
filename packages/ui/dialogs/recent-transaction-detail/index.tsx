import React, { Component } from 'react'

import { Text, TextInput, TouchableHighlight, View } from 'react-native'

import { debounce } from 'lndr/time'
import Engine from 'lndr/engine'
import RecentTransaction from 'lndr/recent-transaction'

import Button from 'ui/components/button'
import Loading, { LoadingContext } from 'ui/components/loading'
import RecentTransactionRow from 'ui/components/recent-transaction-row'

import style from 'theme/account'
import formStyle from 'theme/form'

import {
  acknowledge,
  recentTransactionsLanguage
} from 'language'

const loadingContext = new LoadingContext()

interface Props {
  recentTransaction: RecentTransaction
  engine: Engine
  closePopup: () => void
}

export default class RecentTransactionDetail extends Component<Props> {
  render() {
    const { engine, recentTransaction, closePopup } = this.props
    const { user } = engine

    return <View>
      <Text style={formStyle.header}>{recentTransactionsLanguage.title}</Text>
        <Loading context={loadingContext} />
        <RecentTransactionRow
          user={user}
          key={recentTransaction.hash}
          engine={engine}
          recentTransaction={recentTransaction}
        />
        <Button style={formStyle.lastButton} onPress={closePopup} text={acknowledge} />
    </View>
  }
}
