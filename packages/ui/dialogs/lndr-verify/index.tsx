import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Button from 'ui/components/button';
import DashboardShell from 'ui/components/dashboard-shell';
import general from 'theme/general';
import style from 'theme/form';

interface Props {
    navigation: any
    state: any
}

class LndrVerify extends Component <Props>{

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={general.whiteFlex}>
                <View style={general.view}>
                    <DashboardShell text="Lndr Verified" navigation={this.props.navigation} />
                    <Button close onPress={() => this.props.navigation.goBack()} />
                </View>
                <View>
                    <Text style={[style.text, style.spaceTopL, style.center]}>Thank you. Your account is being verified.</Text>
                    <Text style={[style.text, style.spaceTopL, style.center]}> You will be notified when your additional features are unlocked.</Text>
                </View>
            </View>
        );
    }
}

export default LndrVerify;