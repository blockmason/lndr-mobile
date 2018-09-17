import React, { Component } from 'react'
import { View, Text, NetInfo, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import Button from 'ui/components/button'
import ThemeImage from 'ui/components/images/theme-image'

import general from 'theme/general'
import style from 'theme/form'
import { largeImage } from 'theme/include/dimensions'

import language from 'language'
const { noConnection, retry } = language

interface Props {
    onConnected: (state: boolean) => any
}
interface State {
    isConnected: boolean
}

export default class NetworkNotifierView extends Component <Props, State> {
    constructor (props) {
        super(props);
        this.state = {
            isConnected: true
        }
    }

    componentDidMount() {
        NetInfo.addEventListener('connectionChange', this.handleConnectionChange);
    }

    componentWillUnmount() {
        NetInfo.removeEventListener('connectionChange', this.handleConnectionChange);
    }

    checkConnection() {
        const { onConnected } = this.props;
        NetInfo.isConnected.fetch().then(isConnected => onConnected(isConnected))
    }

    handleConnectionChange = isConnected => {
        this.setState({ isConnected });
    }

    render() {
        return (
            <View style={[general.flex, general.centeredColumn, general.alignCenter, general.justifyCenter]}>
                <ThemeImage size={largeImage} name='logo'/>
                <Image source={require('images/disconnected.png')} />
                <Text style={[style.title]}>{noConnection}</Text>
                <Button onPress={this.checkConnection.bind(this)} text={retry}/>
            </View>
        );
    }
}
