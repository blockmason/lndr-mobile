import React, { Component } from 'react'

import { Text, View, Image, ScrollView } from 'react-native'
import { getResetAction } from 'reducers/nav'

import { UserData } from 'lndr/user'
import { currencyFormats } from 'lndr/format'
import PendingUnilateral from 'lndr/pending-unilateral'
import profilePic from 'lndr/profile-pic'
import Friend from 'lndr/friend'
import { currencySymbols, transferLimits, hasNoDecimals } from 'lndr/currencies'

import Button from 'ui/components/button'
import Loading, { LoadingContext } from 'ui/components/loading'
import DashboardShell from 'ui/components/dashboard-shell'
import PendingSettlementRow from 'ui/components/pending-settlement-row'

import style from 'theme/pending'
import formStyle from 'theme/form'
import accountStyle from 'theme/account'
import general from 'theme/general'

import language from 'language'
const {
  cancel,
  pendingSettlementsLanguage,
  debtManagement,
  accountManagement
} = language

import { getUser, settlerIsMe, getEthExchange, getWeeklyEthTotal, calculateBalance, getUcacCurrency, getPrimaryCurrency } from 'reducers/app'
import { addDebt, rejectPendingSettlement, getEthTxCost } from 'actions'
import { connect } from 'react-redux'

const loadingContext = new LoadingContext()

interface Props {
  addDebt: (
    friend: Friend,
    amount: string,
    memo: string,
    direction: string,
    currency: string,
    settleTotal?: boolean,
    denomination?: string
  ) => any
  rejectPendingSettlement: (pendingSettlement: PendingUnilateral, settlementCurrency: string) => any
  user: UserData
  ethExchange: (currency: string) => string
  ethSentPastWeek: number
  settlerIsMe: (pendingSettlement: PendingUnilateral) => boolean
  calculateBalance: (friend: Friend) => number
  getUcacCurrency: (ucac: string) => string
  navigation: any
  primaryCurrency: string
}

interface State {
  txCost: string
  pic?: string
  confirmationError?: string
  unmounting?: boolean
}

class PendingSettlementDetail extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      txCost: '0.00'
    }
  }

  async componentWillMount() {
    const { user, primaryCurrency } = this.props
    const txCost = await getEthTxCost(primaryCurrency)
    const pendingSettlement = this.getPendingSettlement()
    let pic

    try {
      const addr = user.address === pendingSettlement.creditorAddress ? pendingSettlement.debtorAddress : pendingSettlement.creditorAddress
      pic = await profilePic.get(addr)
    } catch (e) {}
    if(!this.state.unmounting && pic) {
      this.setState({ pic, txCost })
    }
  }

  componentWillUnmount() {
    this.setState({unmounting: true})
  }

  async addDebt(pendingSettlement: PendingUnilateral) {
    const { ethExchange, ethSentPastWeek, user, calculateBalance, primaryCurrency } = this.props
    const { memo, amount, ucac, settlementCurrency, debtorAddress, debtorNickname, creditorAddress, creditorNickname, multiSettlements } = pendingSettlement
    const friend = user.address === debtorAddress ? new Friend(creditorAddress, creditorNickname) : new Friend(debtorAddress, debtorNickname)
    const direction = user.address === debtorAddress ? 'borrow' : 'lend'
    const settleTotal = multiSettlements !== undefined
    const formattedAmount = hasNoDecimals(this.props.getUcacCurrency(ucac)) ? amount : amount / 100

    if ( creditorAddress === user.address && ( ethSentPastWeek * Number(ethExchange(primaryCurrency)) + formattedAmount > Number(transferLimits(primaryCurrency)) ) ) {
      this.setState({ confirmationError: accountManagement.sendEth.error.limitExceeded(primaryCurrency) })
      return
    }

    const success = await loadingContext.wrap(
      this.props.addDebt(
        friend as Friend,
        String(formattedAmount) as string,
        memo as string,
        direction as string,
        primaryCurrency as string,
        settleTotal as boolean,
        settlementCurrency as string
      )
    )

    if (success) {
      this.closePopup('confirm')
    } else {
      this.props.navigation.goBack()
    }
  }

  async rejectPendingSettlement(pendingSettlement: PendingUnilateral) {
    const pending = this.getPendingSettlement()

    const success = await loadingContext.wrap(
      this.props.rejectPendingSettlement(pendingSettlement, pending.settlementCurrency)
    )

    if (success) {
      this.closePopup('reject')
    }
  }

  closePopup(type) {
    let resetAction
    if (type) {
      resetAction = getResetAction({ routeName:'Confirmation', params: { type: type, friend: { nickname: this.getFriendNickname() } } })

      this.props.navigation.dispatch(resetAction)
    } else {
      this.props.navigation.navigate('Home')
    }
  }

  getFriendNickname() {
    const { user } = this.props
    const pendingSettlement = this.getPendingSettlement()

    if (user.address === pendingSettlement.creditorAddress) {
      return pendingSettlement.debtorNickname
    } else {
      return pendingSettlement.creditorNickname
    }
  }

  getTitle() {
    const { user, settlerIsMe } = this.props
    const pendingSettlement = this.getPendingSettlement()

    if(settlerIsMe(pendingSettlement)) {
      if (user.address === pendingSettlement.creditorAddress) {
        return debtManagement.direction.pendingLendSettlementMe(pendingSettlement)
      } else if (user.address === pendingSettlement.debtorAddress) {
        return debtManagement.direction.pendingBorrowSettlementMe(pendingSettlement)
      } else {
        return 'Unknown Settlement'
      }
    } else {
      if (user.address === pendingSettlement.creditorAddress) {
        return debtManagement.direction.pendingLendSettlement(pendingSettlement)
      } else if (user.address === pendingSettlement.debtorAddress) {
        return debtManagement.direction.pendingBorrowSettlement(pendingSettlement)
      } else {
        return 'Unknown Settlement'
      }
    }
  }

  getPendingSettlement() {
    return this.props.navigation.state ? this.props.navigation.state.params.pendingSettlement : {}
  }

  getSettlementAmount() {
    const { user } = this.props
    const pendingSettlement = this.getPendingSettlement()
    let sign = ''

    if (user.address === pendingSettlement.creditorAddress) {
      sign = '+'
    } else if (user.address === pendingSettlement.debtorAddress) {
      sign = '-'
    }

    //this is specific to ETH
    return `${pendingSettlement.settlementAmount / Math.pow(10, 18)}`.slice(0, 9)
  }

  showButtons() {
    const { settlerIsMe } = this.props
    const pendingSettlement = this.getPendingSettlement()
    if (settlerIsMe(pendingSettlement)) {
      return <Button danger round onPress={() => this.rejectPendingSettlement(pendingSettlement)} text={pendingSettlementsLanguage.cancel} />
    }

    return <View style={{marginBottom: 50}}>
      <Button round large onPress={() => this.addDebt(pendingSettlement)} text={pendingSettlementsLanguage.confirm} />
      <Button danger round onPress={() => this.rejectPendingSettlement(pendingSettlement)} text={pendingSettlementsLanguage.reject} />
    </View>
  }

  getLimit() {
    const { ethExchange, ethSentPastWeek, primaryCurrency } = this.props

    const remaining = String(Number(transferLimits(primaryCurrency)) - Number(ethSentPastWeek) * Number(ethExchange(primaryCurrency)))
    const end = remaining.indexOf('.') === -1 ? remaining.length : remaining.indexOf('.') + 3
    return remaining.slice(0, end)
  }

  render() {
    const { txCost, confirmationError } = this.state
    const { user, settlerIsMe, primaryCurrency } = this.props
    const pendingSettlement = this.getPendingSettlement()

    return <View style={general.whiteFlex}>
      <View style={general.view}>
        <Loading context={loadingContext} />
        <DashboardShell text={pendingSettlementsLanguage.shell} navigation={this.props.navigation} />
        <Button close onPress={() => this.props.navigation.goBack()} />
      </View>
      <ScrollView style={general.whiteFlex} keyboardShouldPersistTaps="always">
        <View style={[general.centeredColumn, general.standardHMargin]}>
          <Image source={require('images/person-outline-dark.png')} style={style.image}/>
          <Text style={[style.title, {alignSelf: 'center', textAlign: 'center'}]}>{this.getTitle()}</Text>
          <View style={style.balanceRow}>
            <Text style={style.balanceInfo}>{currencySymbols(primaryCurrency)}</Text>
            <Text style={style.amount}>{currencyFormats(primaryCurrency)(pendingSettlement.amount)}</Text>
          </View>
          <View style={style.balanceRow}>
            <Text style={style.amount}>{this.getSettlementAmount()}</Text>
            <Text style={style.balanceInfo}>{pendingSettlement.settlementCurrency}</Text>
          </View>
          {pendingSettlement.multiSettlements === undefined ? null :
            pendingSettlement.multiSettlements.map(stmt => <PendingSettlementRow user={user} pendingSettlement={stmt} key={stmt.hash} friend={true} onPress={() => null} settlerIsMe={settlerIsMe}/>)
          }
          <View style={{marginBottom: 20}}/>
          {user.address === pendingSettlement.debtorAddress ? null : <Text style={[formStyle.smallText, formStyle.spaceTop, formStyle.center]}>{accountManagement.sendEth.warning(this.getLimit(), primaryCurrency)}</Text>}
          <Text style={[accountStyle.txCost, formStyle.spaceBottom, {marginLeft: '2%'}]}>{accountManagement.sendEth.txCost(txCost, primaryCurrency)}</Text>
          { confirmationError && <Text style={[formStyle.warningText, {alignSelf: 'center'}]}>{confirmationError}</Text>}
          {this.showButtons()}
          <View style={general.spaceBelow}/>
        </View>
      </ScrollView>
    </View>
  }
}

export default connect((state) => ({ user: getUser(state)(), settlerIsMe: settlerIsMe(state), ethExchange: getEthExchange(state),
  ethSentPastWeek: getWeeklyEthTotal(state), calculateBalance: calculateBalance(state), getUcacCurrency: getUcacCurrency(state),
  primaryCurrency: getPrimaryCurrency(state) }), { addDebt, rejectPendingSettlement })(PendingSettlementDetail)
