import React, { Component } from 'react'

import PendingTransaction from 'lndr/pending-transaction'

import { Text, View } from 'react-native'

import Section from 'ui/components/section'
import Popup, { closePopup } from 'ui/components/popup'
import Loading, { LoadingContext } from 'ui/components/loading'
import { UserData } from 'lndr/user'

import PendingTransactionDetail from 'ui/dialogs/pending-transaction-detail'
import PendingTransactionRow from 'ui/components/pending-transaction-row'

import style from 'theme/account'

import { pendingTransactionsLanguage } from 'language'

import { getStore, getUser } from 'reducers/app'
import { isFocusingOn } from 'reducers/nav'
import { getPendingTransactions } from 'actions'
import { connect } from 'react-redux'

const loadingPendingTransactions = new LoadingContext()

interface Props {
  getPendingTransactions: () => any
  isFocused: boolean
  user: UserData
  state: any
}

interface State {
  pendingTransaction?: PendingTransaction
}

class PendingTransactionsView extends Component<Props, State> {
  constructor() {
    super()
    this.state = {}
  }

  async componentDidMount() {
    await loadingPendingTransactions.wrap(this.props.getPendingTransactions())
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isFocused && nextProps.isFocused) {
      this.refresh()
    }
  }

  refresh() {
    this.componentDidMount()
  }

  closePopupAndRefresh() {
    closePopup()
    this.refresh()
  }

  renderPendingTransactionDetailDialog() {
    const { pendingTransaction } = this.state

    if (!pendingTransaction) {
      return null
    }

    return <Popup onClose={() => this.setState({ pendingTransaction: undefined })}>
      <PendingTransactionDetail
        pendingTransaction={pendingTransaction}
        closePopup={() => this.closePopupAndRefresh()}
      />
    </Popup>
  }

  render() {
    const { pendingTransactionsLoaded, pendingTransactions } = this.props.state
    const { user } = this.props

    return <View>
      { this.renderPendingTransactionDetailDialog() }

      <Section text='Pending Transactions' contentContainerStyle={style.list}>
        <Loading context={loadingPendingTransactions} />
        {pendingTransactionsLoaded && pendingTransactions.length === 0 ? <Text style={style.emptyState}>{pendingTransactionsLanguage.none}</Text> : null}
        {pendingTransactions.map(
          pendingTransaction => (
            <PendingTransactionRow
              user={user}
              key={pendingTransaction.hash}
              pendingTransaction={pendingTransaction}
              onPress={() => this.setState({ pendingTransaction })}
            />
          )
        )}
      </Section>
    </View>
  }
}

export default connect((state) => ({ state: getStore(state)(), user: getUser(state)(), isFocused: isFocusingOn(state)('Activity') }), { getPendingTransactions })(PendingTransactionsView)
