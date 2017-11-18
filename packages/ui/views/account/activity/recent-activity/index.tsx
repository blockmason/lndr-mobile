import React, { Component } from 'react'

import Engine from 'lndr/engine'

import RecentTransaction from 'lndr/recent-transaction'

import { Text, View } from 'react-native'

import Section from 'ui/components/section'
import Popup, { closePopup } from 'ui/components/popup'
import Loading, { LoadingContext } from 'ui/components/loading'

import RecentTransactionDetail from 'ui/dialogs/recent-transaction-detail'
import RecentTransactionRow from 'ui/components/recent-transaction-row'

import style from 'theme/account'

import { recentTransactionsLanguage } from 'language'

const loadingRecentTransactions = new LoadingContext()

interface Props {
  engine: Engine
}

interface State {
  recentTransaction?: RecentTransaction
  recentTransactionsLoaded: boolean
  recentTransactions: RecentTransaction[]
}

export default class RecentTransactionsView extends Component<Props, State> {
  stillRelevant?: boolean

  constructor() {
    super()
    this.state = {
      recentTransactionsLoaded: false,
      recentTransactions: []
    }
  }

  async componentDidMount() {
    this.stillRelevant = true
    const { engine } = this.props
    const recentTransactions = await loadingRecentTransactions.wrap(engine.getRecentTransactions())
    this.stillRelevant && this.setState({ recentTransactionsLoaded: true, recentTransactions })
  }

  refresh() {
    this.componentDidMount()
  }

  componentWillUnmount() {
    this.stillRelevant = false
  }

  closePopupAndRefresh() {
    closePopup()
    this.refresh()
  }

  renderRecentTransactionDetailDialog() {
    const { recentTransaction } = this.state

    if (!recentTransaction) {
      return null
    }

    const { engine } = this.props

    return <Popup onClose={() => this.setState({ recentTransaction: undefined })}>
      <RecentTransactionDetail
        recentTransaction={recentTransaction}
        closePopup={() => this.closePopupAndRefresh()}
        engine={engine}
      />
    </Popup>
  }

  render() {
    const { recentTransactionsLoaded, recentTransactions } = this.state
    const { engine } = this.props

    return <View>
      { this.renderRecentTransactionDetailDialog() }

      <Section contentContainerStyle={style.list}>
        <Loading context={loadingRecentTransactions} />
        {recentTransactionsLoaded && recentTransactions.length === 0 ? <Text style={style.emptyState}>{recentTransactionsLanguage.none}</Text> : null}
        {recentTransactions.map(
          recentTransaction => (
            <RecentTransactionRow
              key={recentTransaction.ucac}
              recentTransaction={recentTransaction}
              engine={engine}
              onPress={() => this.setState({ recentTransaction })}
            />
          )
        )}
      </Section>
    </View>
  }
}
