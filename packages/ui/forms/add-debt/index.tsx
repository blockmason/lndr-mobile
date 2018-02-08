import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { ScrollView, Text } from 'react-native'

import MoneyAmountInput from 'ui/fields/money-input'

const AddDebtForm = (props) => {
  const scale = props.scale || 2
  const currencySymbol = props.currencySymbol || '$'
  const formattedAmount = `${currencySymbol}${Number(props.amount || '').toFixed(scale)}`
  return (
    <ScrollView keyboardShouldPersistTaps={'handled'}>
      <Text>{formattedAmount}</Text>
      <Field
        name="amount"
        scale={scale}
        component={MoneyAmountInput}
      />
    </ScrollView>
  )
}

const form = 'add-debt'
const AddDebtReduxForm = reduxForm({ form })(AddDebtForm)
const formSelector = formValueSelector(form)

export default connect(state => ({ amount: formSelector(state, 'amount') }))(AddDebtReduxForm)
