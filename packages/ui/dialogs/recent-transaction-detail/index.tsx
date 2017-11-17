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
  cancel,
  recentTransactionsLanguage
} from 'language'

const loadingContext = new LoadingContext()

interface Props {
  recentTransaction: RecentTransaction
  engine: Engine
  closePopup: () => void
}

export default class RecentTransactionDetail extends Component<Props> {
  /*async confirmRecentTransaction(recentTransaction: RecentTransaction) {
    const { engine, closePopup } = this.props

    await loadingContext.wrap(
      engine.confirmRecentTransaction(recentTransaction)
    )

    closePopup()
  }*/

  render() {
    const { recentTransaction, closePopup } = this.props

    return <View>
      <Text style={formStyle.text}>details</Text>
        <Loading context={loadingContext} />
        <RecentTransactionRow
          key={recentTransaction.ucac}
          recentTransaction={recentTransaction}
        />
        <Button alternate onPress={closePopup} text={cancel} />
    </View>
  }
}
