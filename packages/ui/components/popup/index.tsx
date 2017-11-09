import React, { Component } from 'react'

import { ScrollView, View } from 'react-native'

import Button from 'ui/components/button'

import style from 'theme/popup'

let popupTarget
let popupContents
let popupOnClose

interface TargetProps {}

interface TargetState {
  flip: boolean
  isOpen: boolean
}

export class PopupTarget extends Component<TargetProps, TargetState> {
  constructor() {
    super()
    this.state = { flip: false, isOpen: false }
    popupTarget = this
  }

  showPopup(children, onClose) {
    const { flip } = this.state
    this.setState({ flip: !flip, isOpen: true })
    popupContents = children
    popupOnClose = onClose
  }

  closePopup() {
    if (popupOnClose) {
      popupOnClose()
    }
    this.setState({ isOpen: false })
  }

  render() {
    const { isOpen } = this.state

    if (!popupContents) {
      return null
    }

    if (!isOpen) {
      return null
    }

    return <ScrollView style={style.wrap}>
      <View style={style.container}>
        <View style={style.popup}>
          <Button round onPress={() => this.closePopup()} icon='md-close' style={style.closeButton} />
          {popupContents}
        </View>
      </View>
    </ScrollView>
  }
}

interface Props {
  onClose: () => void
}

export default class Popup extends Component<Props> {
  componentWillMount() {
    if (!popupTarget) {
      throw new Error('<PopupTarget /> must be used somewhere as the place to render a <Popup />')
    }

    const { children, onClose } = this.props
    popupTarget.showPopup(children, onClose)
  }

  render() {
    return null
  }
}
