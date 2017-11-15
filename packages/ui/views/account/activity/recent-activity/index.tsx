import React, { Component } from 'react'

import Engine from 'lndr/engine'

import TransactionHistory from 'lndr/transaction-history'

import { Text } from 'react-native'

import Section from 'ui/components/section'
import Loading, { LoadingContext } from 'ui/components/loading'

import TransactionHistoryRow from 'ui/components/transaction-history-row'

import { transactionHistoryLanguage } from 'language'

const loadingTransactionHistory = new LoadingContext()

interface Props {
  engine: Engine
}

interface State {
  transactionHistory?: TransactionHistory
  transactionHistoryLoaded: boolean
  transactionHistoryItems: TransactionHistory[]
}

export default class RecentActivityView extends Component<Props, State> {
  constructor() {
    super()
    this.state = {
      transactionHistoryLoaded: false,
      transactionHistoryItems: []
    }
  }

  async componentDidMount() {
    const { engine } = this.props
    const transactionHistory = await loadingTransactionHistory.wrap(engine.getTransactions())
    this.setState({ transactionHistoryLoaded: true, transactionHistory })
  }

  refresh() {
    this.componentDidMount()
  }

  render() {
    const { engine } = this.props
    const { transactionHistoryLoaded, transactionHistoryItems } = this.state

    return <Section>
      <Loading context={loadingTransactionHistory} />
      {transactionHistoryLoaded && transactionHistoryItems.length === 0 ? <Text>{transactionHistoryLanguage.none}</Text> : null}
      {transactionHistoryItems.map(
        item => (
          <TransactionHistoryRow
            transactionHistory={item}
          />
        )
      )}
    </Section>
  }
}
