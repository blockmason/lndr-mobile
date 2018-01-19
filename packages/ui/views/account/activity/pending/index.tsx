import React, { Component } from 'react'

import PendingTransaction from 'lndr/pending-transaction'

import { Text, View } from 'react-native'

import Section from 'ui/components/section'
import Popup, { closePopup } from 'ui/components/popup'
import Loading, { LoadingContext } from 'ui/components/loading'
import { UserData } from 'lndr/user'
import Friend from 'lndr/friend'

import PendingTransactionDetail from 'ui/dialogs/pending-transaction-detail'
import PendingTransactionRow from 'ui/components/pending-transaction-row'

import style from 'theme/account'
import general from 'theme/general'

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
  friend?: Friend
  onTransition?: () => any
  navigation: any
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
        navigation={this.props.navigation}
      />
    </Popup>
  }

  showNoneMessage() {
    const { pendingTransactionsLoaded, pendingTransactions } = this.props.state
    const { friend } = this.props

    let showNone = false

    if (!pendingTransactionsLoaded) {
      showNone = true
    } else if (!friend) {
      showNone = pendingTransactions.length === 0
    } else if (friend) {
      showNone = true
      pendingTransactions.map( (pending) => {
        showNone = showNone && friend.address !== pending.creditorAddress && friend.address !== pending.debtorAddress
      })
    }

    return showNone ? <Text style={style.emptyState}>{pendingTransactionsLanguage.none}</Text> : null
  }

  closeAndView(pendingTransaction) {
    const { onTransition } = this.props
    if (onTransition) {
      
    } else {
      this.setState({ pendingTransaction })
    }
  }

  render() {
    const { pendingTransactionsLoaded, pendingTransactions } = this.props.state
    const { user, friend } = this.props

    return <View>
      { this.renderPendingTransactionDetailDialog() }

      <Section contentContainerStyle={style.list}>
        <Loading context={loadingPendingTransactions} />
        {this.showNoneMessage()}
        {pendingTransactions.map(
          pendingTransaction => {
            if(friend && friend.address !== pendingTransaction.creditorAddress && friend.address !== pendingTransaction.debtorAddress) {
                return null
            }
            return<PendingTransactionRow
              user={user}
              key={pendingTransaction.hash}
              pendingTransaction={pendingTransaction}
              friend={friend ? true : false }
              onPress={() => this.closeAndView(pendingTransaction)}
            />
          }
        )}
      </Section>
    </View>
  }
}

export default connect((state) => ({ state: getStore(state)(), user: getUser(state)(), isFocused: isFocusingOn(state)('Activity') }), { getPendingTransactions })(PendingTransactionsView)
