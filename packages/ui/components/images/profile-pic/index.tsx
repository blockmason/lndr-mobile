import React from 'react'
import { Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import profilePic from 'lndr/profile-pic'
import { black } from 'theme/include/colors'

interface Props {
  size: number
  style?: any
  address?: string
}

interface State {
  pic?: string
}

const styles = {
  imageStyle: (size: number) => ({
    height: size,
    width: size,
    borderRadius: size / 2
  }),
  iconStyle: (size: number) => ({
    fontSize: size,
    color: black
  })
}

export default class ProfilePic extends React.Component <Props, State> {
  constructor(props) {
    super(props)

    this.state = {}
  }

  async componentWillMount() {
    const { address } = this.props
    let pic
    try {
      if (address !== undefined) {
        pic = await profilePic.get(address)
        this.setState({ pic })
      }
    } catch (err) {}
  }

  render() {
    const { state: { pic }, props: { size, style } } = this
    return !!pic ? <Image source={{ uri: pic }} style={[styles.imageStyle(size), style]} /> : <Icon name="ios-contact" style={[styles.iconStyle(size), style]} />
  }
}
