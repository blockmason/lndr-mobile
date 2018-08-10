import React, { Component } from 'react'

import RecentTransaction from 'lndr/recent-transaction'

import { Text, View } from 'react-native'

import Section from 'ui/components/section'
import Popup, { closePopup } from 'ui/components/popup'
import Loading, { LoadingContext } from 'ui/components/loading'
import { UserData } from 'lndr/user'

import RecentTransactionDetail from 'ui/dialogs/recent-transaction-detail'
import RecentTransactionRow from 'ui/components/recent-transaction-row'

import style from 'theme/account'

import language from 'language'
const { recentTransactionsLanguage } = language

import { getStore, getUser } from 'reducers/app'
import { isFocusingOn } from 'reducers/nav'
import { getRecentTransactions } from 'actions'
import { connect } from 'react-redux'

const loadingRecentTransactions = new LoadingContext()

interface Props {
  isFocused: boolean
  user: UserData
  state: any
  friend?: any
  navigation: any
  getRecentTransactions: () => any
}

interface PassedProps extends React.Props<any> {
  friend?: any
  navigation: any
}

interface State {
  recentTransaction?: RecentTransaction
}

class RecentTransactionsView extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentDidMount() {
    await loadingRecentTransactions.wrap(this.props.getRecentTransactions())
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

  renderRecentTransactionDetailDialog() {
    const { recentTransaction } = this.state

    if (!recentTransaction) {
      return null
    }

    return <Popup onClose={() => this.setState({ recentTransaction: undefined })}>
      <RecentTransactionDetail
        recentTransaction={recentTransaction}
        closePopup={() => this.closePopupAndRefresh()}
      />
    </Popup>
  }

  render() {
    const { recentTransactionsLoaded, recentTransactions } = this.props.state
    const { user, friend } = this.props

    return <View>
      { this.renderRecentTransactionDetailDialog() }

      <Section contentContainerStyle={style.list}>
        <Loading context={loadingRecentTransactions} />
        {recentTransactionsLoaded && recentTransactions.length === 0 ? <Text style={style.emptyState}>{recentTransactionsLanguage.none}</Text> : null}
        {recentTransactions.map(
          (recentTransaction, index) => {
            if(friend && friend.address !== recentTransaction.creditorAddress && friend.address !== recentTransaction.debtorAddress) {
                return null
            }
            return <RecentTransactionRow
              user={user}
              key={`${recentTransaction.creditorAddress}${index}` }
              recentTransaction={recentTransaction}
              friend={friend ? true : false }
            />
          }
        )}
      </Section>
    </View>
  }
}

export default connect<any, any, PassedProps>((state) => ({ state: getStore(state)(), user: getUser(state)(), isFocused: isFocusingOn(state)('Activity') }),
 { getRecentTransactions })(RecentTransactionsView)
