import React, { Component } from 'react'

import { Text, TextInput, TouchableHighlight, View } from 'react-native'

import { debounce } from 'lndr/time'
import Engine from 'lndr/engine'
import PendingTransaction from 'lndr/pending-transaction'

import Button from 'ui/components/button'
import Loading, { LoadingContext } from 'ui/components/loading'
import PendingTransactionRow from 'ui/components/pending-transaction-row'

import style from 'theme/account'
import formStyle from 'theme/form'

import {
  cancel,
  pendingTransactionsLanguage
} from 'language'

const loadingContext = new LoadingContext()

interface Props {
  pendingTransaction: PendingTransaction
  engine: Engine
  closePopup: () => void
}

export default class PendingTransactionDetail extends Component<Props> {
  async confirmPendingTransaction(pendingTransaction: PendingTransaction) {
    const { engine, closePopup } = this.props

    await loadingContext.wrap(
      engine.confirmPendingTransaction(pendingTransaction)
    )

    closePopup()
  }

  render() {
    const { pendingTransaction, closePopup } = this.props

    return <View>
      <Text style={formStyle.text}>{pendingTransactionsLanguage.confirmationQuestion}</Text>
        <Loading context={loadingContext} />
        <PendingTransactionRow
          key={pendingTransaction.hash}
          pendingTransaction={pendingTransaction}
        />
        <Button danger onPress={() => this.confirmPendingTransaction(pendingTransaction)} text={pendingTransactionsLanguage.confirm} />
        <Button alternate onPress={closePopup} text={cancel} />
    </View>
  }
}
