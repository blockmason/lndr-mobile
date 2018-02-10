import React, { Component } from 'react'

import { Text, TextInput, TouchableHighlight, View, Image, ScrollView } from 'react-native'
import { UserData } from 'lndr/user'

import { debounce } from 'lndr/time'
import { cents } from 'lndr/format'
import PendingSettlement from 'lndr/pending-transaction'
import { getTxCost } from 'lndr/eth-price-utils'

import Button from 'ui/components/button'
import Loading, { LoadingContext } from 'ui/components/loading'
import DashboardShell from 'ui/components/dashboard-shell'

import style from 'theme/pending'
import formStyle from 'theme/form'
import accountStyle from 'theme/account'
import general from 'theme/general'

import {
  back,
  cancel,
  pendingSettlementsLanguage,
  debtManagement,
  accountManagement
} from 'language'

import { getUser, settlerIsMe } from 'reducers/app'
import { confirmPendingSettlement, rejectPendingSettlement } from 'actions'
import { connect } from 'react-redux'

const loadingContext = new LoadingContext()

interface Props {
  confirmPendingSettlement: (pendingSettlement: PendingSettlement) => any
  rejectPendingSettlement: (pendingSettlement: PendingSettlement) => any
  user: UserData
  settlerIsMe: (pendingSettlement: PendingSettlement) => boolean
  navigation: any
}

interface State {
  txCost: string
}

class PendingSettlementDetail extends Component<Props, State> {
  constructor() {
    super()
    this.state = {
      txCost: '0.00'
    }
  }

  async componentWillMount() {
    const txCost = await getTxCost('dollar')
    this.setState({txCost})
  }

  async confirmPendingSettlement(pendingSettlement: PendingSettlement) {
    const success = await loadingContext.wrap(
      this.props.confirmPendingSettlement(pendingSettlement)
    )

    if (success) {
      this.closePopup('confirm')
    } else {
      this.props.navigation.goBack()
    }
  }

  async rejectPendingSettlement(pendingSettlement: PendingSettlement) {
    const success = await loadingContext.wrap(
      this.props.rejectPendingSettlement(pendingSettlement)
    )

    if (success) {
      this.closePopup('reject')
    }
  }

  closePopup(type) {
    if (type) {
      this.props.navigation.navigate('Confirmation', { type: type, friend: { nickname: this.getFriendNickname() } })
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
      return <Button alternate arrowRed onPress={() => this.rejectPendingSettlement(pendingSettlement)} text={pendingSettlementsLanguage.cancel} />
    }

    return <View style={{marginBottom: 50}}>
      <Button round large onPress={() => this.confirmPendingSettlement(pendingSettlement)} text={pendingSettlementsLanguage.confirm} />
      <Button alternate arrowRed onPress={() => this.rejectPendingSettlement(pendingSettlement)} text={pendingSettlementsLanguage.reject} />
    </View>
  }

  render() {
    const { txCost } = this.state
    const { user, settlerIsMe } = this.props
    const pendingSettlement = this.getPendingSettlement()

    return <ScrollView style={[general.fullHeight, general.view]}>
      <Loading context={loadingContext} />
      <DashboardShell text='Pending Settlement' />
      <Button close onPress={() => this.props.navigation.goBack()} />
      <View style={[general.centeredColumn, general.standardHMargin]}>
        <Image source={require('images/person-outline-dark.png')} style={style.image}/>
        <Text style={[style.title, {alignSelf: 'center', textAlign: 'center'}]}>{this.getTitle()}</Text>
        <View style={style.balanceRow}>
          <Text style={style.balanceInfo}>$</Text>
          <Text style={style.amount}>{cents(pendingSettlement.amount)}</Text>
          <Text style={style.balanceInfo}>USD</Text>
        </View>
        <View style={style.balanceRow}>
          <Text style={style.amount}>{this.getSettlementAmount()}</Text>
          <Text style={style.balanceInfo}>{pendingSettlement.settlementCurrency}</Text>
        </View>
        <Text style={[accountStyle.txCost, formStyle.spaceBottom, {marginLeft: '2%'}]}>{accountManagement.sendEth.txCost(txCost)}</Text>
        {this.showButtons()}
      </View>
    </ScrollView>
  }
}

export default connect((state) => ({ user: getUser(state)(), settlerIsMe: settlerIsMe(state) }),
{ confirmPendingSettlement, rejectPendingSettlement })(PendingSettlementDetail)
