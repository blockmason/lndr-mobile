// This file is over 50 lines and needs to be split up

import React, { Component } from 'react'

import { Text, View } from 'react-native'

import { cents } from 'lndr/format'
import Balance from 'lndr/balance'
import Engine from 'lndr/engine'

import Button from 'ui/components/button'
import Loading, { LoadingContext } from 'ui/components/loading'
import Popup, { closePopup } from 'ui/components/popup'
import Section from 'ui/components/section'
import BalanceRow from 'ui/components/balance-row'

import AddDebt from 'ui/dialogs/add-debt'
import MyAccount from 'ui/dialogs/my-account'

import general from 'theme/general'
import style from 'theme/account'
import formStyle from 'theme/form'

import {
  tip,
  notice,
  totalBalance,
  totalBalances,
  welcome,
  welcomeBack,
  noBalances,
  noBalanceWarning,
  accountManagement,
  addNewDebt
} from 'language'

const loadingBalances = new LoadingContext()

interface Props {
  engine: Engine
}

interface State {
  shouldShowAddDebt: boolean
  shouldShowMyAccount: boolean
  accountInformationLoaded: boolean
  accountInformation?: { nickname?: string, balance?: number }
  balancesLoaded: boolean
  balances: Balance[]
  balanceToView?: Balance
}

export default class HomeView extends Component<Props, State> {
  constructor() {
    super()
    this.state = {
      shouldShowAddDebt: false,
      shouldShowMyAccount: false,
      accountInformationLoaded: false,
      balancesLoaded: false,
      balances: []
    }
  }

  async componentDidMount() {
    const { engine } = this.props

    try {
      const accountInformation = await engine.getAccountInformation()

      this.setState({ accountInformation, accountInformationLoaded: true })
    }

    catch (error) {
      engine.setErrorMessage(accountManagement.loadInformation.error)
    }

    const balances = await loadingBalances.wrap(engine.getBalances())
    this.setState({ balances, balancesLoaded: true })
  }

  refresh() {
    this.componentDidMount()
  }

  renderWelcomeMessage() {
    const { accountInformationLoaded, accountInformation = {} } = this.state

    if (!accountInformationLoaded) {
      return
    }

    const { nickname } = accountInformation

    if (nickname) {
      return <Text style={formStyle.infoText}>{welcomeBack(nickname)}</Text>
    }

    return <Text style={formStyle.infoText}>{welcome}</Text>
  }

  renderBalance() {
    const { accountInformation = {} } = this.state
    const { balance } = accountInformation

    if (typeof balance === 'undefined') {
      return null
    }

    else if (balance < 0) {
      return <Text style={style.largeFactAmountBad}>{cents(balance)}</Text>
    }

    else {
      return <Text style={style.largeFactAmountGood}>{cents(balance)}</Text>
    }
  }

  renderBalanceInformation() {
    const { accountInformationLoaded, accountInformation = {}, balances, balancesLoaded } = this.state

    if (!accountInformationLoaded) {
      return
    }

    const { balance } = accountInformation

    if (typeof balance === 'undefined') {
      return <Text style={formStyle.warningText}>
        <Text style={formStyle.bold}>{notice}</Text>
        {noBalanceWarning}
      </Text>
    }

    return <Section contentContainerStyle={style.listItem}>
      <View>
        <Text style={style.paddedHeader}>{totalBalance}</Text>
        {this.renderBalance()}
      </View>
      <View>
        <Text style={style.paddedHeader}>{totalBalances}</Text>
        <Text style={style.largeFactAmount}>{balancesLoaded ? String(balances.length) : '-'}</Text>
      </View>
    </Section>
  }

  renderAddDebtDialog() {
    const { shouldShowAddDebt } = this.state

    if (!shouldShowAddDebt) {
      return null
    }

    const { engine } = this.props

    return <Popup onClose={() => this.setState({ shouldShowAddDebt: false })}>
      <AddDebt closePopup={closePopup} engine={engine} />
    </Popup>
  }

  renderMyAccountDialog() {
    const { shouldShowMyAccount } = this.state

    if (!shouldShowMyAccount) {
      return null
    }

    const { engine } = this.props

    return <Popup onClose={() => [ this.refresh(), this.setState({ shouldShowMyAccount: false }) ]}>
      <MyAccount closePopup={closePopup} engine={engine} />
    </Popup>
  }

  showMyAccount() {
    this.setState({ shouldShowMyAccount: true })
  }

  showAddDebt() {
    this.setState({ shouldShowAddDebt: true })
  }

  render() {
    const { accountInformation, balancesLoaded, balances } = this.state

    return <View>
      <Section>
        { this.renderAddDebtDialog() }
        { this.renderMyAccountDialog() }

        { this.renderWelcomeMessage() }
        { this.renderBalanceInformation() }
      </Section>
      <Section>
        <Button action onPress={() => this.showAddDebt()} text={addNewDebt} />
      </Section>
    </View>
  }
}
