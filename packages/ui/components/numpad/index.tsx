import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import styles, { keyStyle } from 'theme/numpad'

const numberKeys = [
  [
    { mainText: '1' },
    { mainText: '2' },
    { mainText: '3' }
  ],
  [
    { mainText: '4' },
    { mainText: '5' },
    { mainText: '6' }
  ],
  [
    { mainText: '7' },
    { mainText: '8' },
    { mainText: '9' }
  ]
]

interface Props {
  onDelete?: { (): any }
  onClear?: { (): any }
  onKeyPress?: { (key: string): any }
}

export default class Numpad extends Component<Props, {}> {
  public static defaultProps: Partial<Props> = {
    onKeyPress: () => {},
    onDelete: () => {},
    onClear: () => {}
  }

  constructor(props) {
    super(props)
  }

  _clearAll() {
    const onClear = this.props.onClear as { (): any };
    onClear()
  }

  _onPress(key) {
    if (key === '') {
      return

      // delete key
    } else if (key === 'del') {
      const onDelete = this.props.onDelete as { (): any };
      onDelete()

      // number key
    } else {
      const onKeyPress = this.props.onKeyPress as { (key: string): any };
      onKeyPress(key)
    }
  }

  _renderKey(key, index) {
    return (
      <TouchableOpacity
        key={index}
        style={keyStyle.wrapper}
        onPress={this._onPress.bind(this, key.mainText)}
      >
        <View style={[keyStyle.bd]}>
          <Text style={keyStyle.mainText}>{key.mainText}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  _renderNumberKeys() {
    return numberKeys.map((group, groupIndex) => {
      return (
        <View key={groupIndex} style={styles.row}>
          {group.map(this._renderKey.bind(this))}
        </View>
        )
    })
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.main}>

          {this._renderNumberKeys()}

          <View style={styles.row}>
            <View style={[keyStyle.bd, keyStyle.hidden]} />

            <TouchableOpacity
              style={keyStyle.wrapper}
              onPress={this._onPress.bind(this, '0')}
            >
              <View style={[keyStyle.bd]}>
                <Text style={keyStyle.mainText}>0</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[keyStyle.wrapper]}
              onPress={this._onPress.bind(this, 'del')}
              onLongPress={this._clearAll.bind(this)}
            >
              <View style={[keyStyle.bd]}>
                <Text>Delete</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}
