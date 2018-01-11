import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Numpad from 'ui/components/numpad'

interface Props {
  input: any
  scale: number
}

export default class MoneyAmountInput extends Component<Props> {
  handleOnKeyPress(key) {
    const initialValue = typeof this.props.input.value === 'number' ? this.props.input.value : 0
    const result = (initialValue * 10) + (Number(key) * (1 / Math.pow(10, this.props.scale)))
    this.updateAmount(result)
  }

  handleOnDelete() {
    if (typeof this.props.input.value === 'number') {
      const result = this.props.input.value / 10
      this.updateAmount(result)
    }
  }

  handleOnClear() {
    this.updateAmount(0)
  }

  numberToScale(num) {
    return Math.trunc(num * Math.pow(10, this.props.scale)) / Math.pow(10, this.props.scale)
  }

  updateAmount(amount) {
    const amountToScale = this.numberToScale(amount)
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
