import React, { Component } from 'react' // eslint-disable-line no-unused-vars;
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog'
import { View } from 'react-native'

import DebtHistory from '../components/dialogs/debtHistory/DebtHistory'
import BalanceList from '../components/listviews/balance/BalanceListview'

// import { insertRecord, executeTransaction } from '../utils/Storage'

import styles from './styles'

import { BALANCE_MOCK_DATA } from '../test/mock'

export default class Balances extends Component {
  // const navigationOptions = {
  //   title: 'Balances of Users',
  //   tabBarLabel: 'Balances'
  // }

  constructor (props) {
    super(props)

    this.showDebtHistoryDialog = this.showDebtHistoryDialog.bind(this)
  }

  showDebtHistoryDialog () {
    this.createHistoryDialog.show()
  }

  displayDebtHistory (id) {
    const user = BALANCE_MOCK_DATA.filter(user => user.id === id)[0]
    this.debtHistory.attachUser(user)
    this.showDebtHistoryDialog()
  }

  renderDebtHistory () {
    return (
      <PopupDialog
        height={0.7}
        dialogTitle={<DialogTitle title='Debt History' />}
        ref={(createHistoryDialog) => { this.createHistoryDialog = createHistoryDialog }}
        dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}>
        <DebtHistory
          ref={component => { this.debtHistory = component }} />
      </PopupDialog>
    )
  }

  // TODO: data={BALANCE_MOCK_DATA}
  render () {
    return (
      <View style={styles.container}>
        <BalanceList
          displayDebt={id => this.displayDebtHistory(id)} />
        {this.renderDebtHistory()}
      </View>
    )
  }
}
