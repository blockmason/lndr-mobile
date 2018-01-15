import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Numpad from 'ui/components/numpad'
import { Decimal } from 'decimal.js'

interface Props {
  input: any
  scale: number
}

export default class MoneyAmountInput extends Component<Props> {
  handleOnKeyPress(key) {
    const initialValue = typeof this.props.input.value === 'number' ? this.props.input.value : 0
    const result = new Decimal(initialValue).times(10).add(new Decimal(key).times(new Decimal(1).dividedBy(Math.pow(10, this.props.scale))))
    this.updateAmount(result)
  }

  handleOnDelete() {
    if (typeof this.props.input.value === 'number') {
      const result = new Decimal(this.props.input.value).dividedBy(10)
      this.updateAmount(result)
    }
  }

  handleOnClear() {
    this.updateAmount(new Decimal(0))
  }

  decimalToNumberScale(num) {
    const magnitude = Math.pow(10, this.props.scale)
    return Number(new Decimal(Math.trunc(num.times(magnitude))).dividedBy(magnitude))
  }

  updateAmount(amount) {
    const amountToScale = this.decimalToNumberScale(amount)
    const value = (amountToScale === 0) ? '' : amountToScale
    this.props.input.onChange(value)
  }

  render() {
    return (
      <View>
        <Numpad
          onKeyPress={this.handleOnKeyPress.bind(this)}
          onDelete={this.handleOnDelete.bind(this)}
          onClear={this.handleOnClear.bind(this)}
        />
      </View>
    )
  }
}
