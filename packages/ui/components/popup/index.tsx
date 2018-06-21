import React, { Component } from 'react'

import { ScrollView, View, Platform, Modal } from 'react-native'
import { BlurView } from 'react-native-blur'

import Button from 'ui/components/button'

import style from 'theme/popup'

let popupTarget
let popupContents
let popupOnClose
let closeCurrentPopup

export const closePopup = () => closeCurrentPopup()

interface TargetProps {}

interface TargetState {
  flip: boolean
  isOpen: boolean
}

export class PopupTarget extends Component<TargetProps, TargetState> {
  constructor(props) {
    super(props)
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

  usePlatformContainer() {
    return Platform.OS === 'ios' ? style.container : style.androidContainer
  }

  renderForPlatform(content) {
    if (Platform.OS === 'ios') {
      return <BlurView blurType='dark' style={style.wrap}>{content}</BlurView>
    }

    return <Modal
      animationType="slide"
      transparent={false}
      visible={this.state.isOpen}
      onRequestClose={() => {}} >
      {content}
      </Modal>
  }

  renderContent() {
    return <ScrollView keyboardShouldPersistTaps="always">
      <View style={style.container}>
        <View style={style.popup}>
          <Button round onPress={closeCurrentPopup} icon='md-close' style={style.closeButton} />
          {popupContents}
        </View>
      </View>
    </ScrollView>
  }

  render() {
    const { isOpen } = this.state

    if (!popupContents) {
      return null
    }

    if (!isOpen) {
      return null
    }

    closeCurrentPopup = () => this.closePopup()

    return this.renderForPlatform(this.renderContent())
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
