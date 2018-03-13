import React, { Component } from 'react'

import PendingTransaction from 'lndr/pending-transaction'
import PendingUnilateral from 'lndr/pending-unilateral'

import { Text, View } from 'react-native'

import Section from 'ui/components/section'
import Popup, { closePopup } from 'ui/components/popup'
import Loading, { LoadingContext } from 'ui/components/loading'
import { UserData } from 'lndr/user'
import Friend from 'lndr/friend'
import defaultCurrency from 'lndr/default-currency'

import PendingTransactionDetail from 'ui/dialogs/pending-transaction-detail'
import PendingTransactionRow from 'ui/components/pending-transaction-row'
import PendingSettlementRow from 'ui/components/pending-settlement-row'

import style from 'theme/account'
import general from 'theme/general'

import language from 'language'
const { pendingTransactionsLanguage } = language

import { getStore, getUser, submitterIsMe, settlerIsMe, pendingSettlements, bilateralSettlements, getUcacAddr } from 'reducers/app'
import { isFocusingOn } from 'reducers/nav'
import { getPendingTransactions, getPendingSettlements } from 'actions'
import { connect } from 'react-redux'

const loadingPendingTransactions = new LoadingContext()
const loadingPendingSettlements = new LoadingContext()

interface Props {
  state: any
  user: UserData
  isFocused: boolean
  pendingSettlements: any
  bilateralSettlements: any
  submitterIsMe: (pendingTransaction: PendingTransaction) => any
  settlerIsMe: (pendingSettlement: PendingUnilateral) => any
  getPendingTransactions: () => any
  getPendingSettlements: () => any
  navigation: any
  friend?: any
  homeScreen?: boolean
  getUcacAddress: (currency: string) => string
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
    if (this.props.homeScreen) {
      await loadingPendingTransactions.wrap(this.props.getPendingTransactions())
      await loadingPendingSettlements.wrap(this.props.getPendingSettlements())
    }
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

  showNoneMessage() {
    const { pendingTransactionsLoaded, pendingTransactions, pendingSettlements, bilateralSettlements } = this.props.state
    const { friend, getUcacAddress } = this.props

    let showNone = false

    if (!pendingTransactionsLoaded) {
      showNone = true
    } else if (!friend) {
      showNone = pendingTransactions.filter( tx => tx.ucac === getUcacAddr(defaultCurrency) ).length 
      + pendingSettlements.filter( tx => tx.ucac === getUcacAddr(defaultCurrency) ).length 
      + bilateralSettlements.filter( tx => tx.ucac === getUcacAddr(defaultCurrency) ).length  === 0
    } else if (friend) {
      showNone = true
      pendingTransactions.map( (pending) => {
        showNone = showNone && pending.creditorAddress.indexOf(friend.address) === -1 && pending.debtorAddress.indexOf(friend.address) === -1
      })
      pendingSettlements.map( (unilateral) => {
        showNone = showNone && unilateral.creditorAddress.indexOf(friend.address) === -1 && unilateral.debtorAddress.indexOf(friend.address) === -1
      })
      bilateralSettlements.map( (bilateral) => {
        showNone = showNone && bilateral.creditorAddress.indexOf(friend.address) === -1 && bilateral.debtorAddress.indexOf(friend.address) === -1
      })
    }

    return showNone ? <Text style={style.emptyState}>{pendingTransactionsLanguage.none}</Text> : null
  }

  closeAndView(pendingTransaction) {
    this.setState({ pendingTransaction })
  }

  render() {
    const { pendingTransactionsLoaded, pendingTransactions, bilateralSettlements } = this.props.state
    const { pendingSettlements, settlerIsMe } = this.props
    const { user, friend, homeScreen, navigation, getUcacAddress } = this.props

    return <View>
      <Section contentContainerStyle={style.list}>
        <Loading context={loadingPendingTransactions} />
        {this.showNoneMessage()}
        {
          pendingTransactions.map(pendingTransaction => {
            if(getUcacAddress(defaultCurrency).indexOf(pendingTransaction.ucac) === -1 ) {
              return null
            }
            if (friend && friend.address !== pendingTransaction.creditorAddress && friend.address !== pendingTransaction.debtorAddress) {
                return null
            }
            if (homeScreen && this.props.submitterIsMe(pendingTransaction)) {
              return null
            }
            return <PendingTransactionRow
              user={user}
              key={pendingTransaction.hash}
              pendingTransaction={pendingTransaction}
              friend={friend ? true : false }
              onPress={() => navigation.navigate('PendingTransaction', { pendingTransaction })}
            />
          }
        )}
        {
          pendingSettlements.map( pendingSettlement => {
            if(getUcacAddress(defaultCurrency).indexOf(pendingSettlement.ucac) === -1 ) {
              return null
            }
            if (homeScreen && this.props.settlerIsMe(pendingSettlement)) {
              return null
            }
            return <PendingSettlementRow 
              user={user}
              pendingSettlement={pendingSettlement}
              key={pendingSettlement.hash}
              friend={friend ? true : false}
              onPress={() => this.props.navigation.navigate('PendingSettlement', { pendingSettlement })}
              settlerIsMe={settlerIsMe}
            />
          })}
          { homeScreen || bilateralSettlements.length === 0 ? null : 
          <Text style={style.transactionHeader}>{pendingTransactionsLanguage.bilateral}</Text> }
          { homeScreen ? null :
          bilateralSettlements.map( bilateralSettlement => {
            if(getUcacAddress(defaultCurrency).indexOf(bilateralSettlement.ucac) === -1 ) {
              return null
            }
            if (homeScreen && this.props.settlerIsMe(bilateralSettlement)) {
              return null
            }
            return <PendingSettlementRow 
              user={user}
              pendingSettlement={bilateralSettlement}
              key={bilateralSettlement.creditRecord.hash}
              friend={friend ? true : false}
              onPress={() => null}
              settlerIsMe={settlerIsMe}
            />
          })}
      </Section>
    </View>
  }
}

export default connect((state) => ({ state: getStore(state)(), user: getUser(state)(), isFocused: isFocusingOn(state)('Activity'), pendingSettlements: pendingSettlements(state), bilateralSettlements: bilateralSettlements(state), submitterIsMe: submitterIsMe(state), settlerIsMe: settlerIsMe(state), getUcacAddress: getUcacAddr(state) }), { getPendingTransactions, getPendingSettlements })(PendingTransactionsView)
