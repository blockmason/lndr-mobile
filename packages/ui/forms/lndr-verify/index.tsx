import React, { Component } from 'react';
import { View, Text, ScrollView, TextInput, BackHandler, KeyboardAvoidingView, Platform, Switch } from 'react-native';

import Button from 'ui/components/button';
import DashboardShell from 'ui/components/dashboard-shell';

import style from 'theme/form';
import general from 'theme/general';

import { UserData, LndrVerifiedData, defaultLndrVerifiedData } from 'lndr/user';


interface Props {
    navigation: any
    user: UserData
    state: any
}

interface State {
    name: string
    address: string
    telephone: string
    citizenship: string
    nameTextInputErrorText?: string
    addressTextInputErrorText?: string
    telephoneTextInputErrorText?: string
    citizenshipTextInputErrorText?: string
  }

class LndrVerifyForm extends Component <Props, State>{

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            telephone: '',
            citizenship: '',
        }
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }
    onBackPress = () => {
        BackHandler.exitApp()
    }
    submit = () => {

    }

    async onNameTextInputBlur(name: string) {
        if (typeof name !== 'undefined') {
            this.setState({ nameTextInputErrorText: ''});
        } else {
            this.setState({ nameTextInputErrorText: 'First name and last name is required'});
        }
    }

    async onCitizenshipTextInputBlur(citizenship: string) {
        if (typeof citizenship !== 'undefined') {
            this.setState({ citizenshipTextInputErrorText: ''});
        } else {
            this.setState({ citizenshipTextInputErrorText: 'Citizenship is required'});
        }
    }

    async onAddressTextInputBlur(address: string) {
        if (typeof address !== 'undefined') {
            this.setState({ addressTextInputErrorText: ''});
        } else {
            this.setState({ addressTextInputErrorText: 'Address is required'});
        }
    }

    async onTelephoneTextInputBlur(telephone: string) {
        if (typeof telephone !== 'undefined') {
            this.setState({ telephoneTextInputErrorText: ''});
        } else {
            this.setState({ telephoneTextInputErrorText: 'Telephone is required'});
        }
    }
    render() {
        const vertOffset = (Platform.OS === 'android') ? -300 : 0;
        const { name, address, telephone, citizenship, nameTextInputErrorText, addressTextInputErrorText, telephoneTextInputErrorText, citizenshipTextInputErrorText } = this.state;
        return(
            <View style={general.whiteFlex}>
                <View style={general.view}>
                    <DashboardShell text="Lndr Verified" navigation={this.props.navigation} hideSettings />
                    <Button close onPress={() => this.props.navigation.goBack()} />
                </View>
                <ScrollView keyboardShouldPersistTaps="never">
                    <View style={style.form}>
                        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : 'padding'} keyboardVerticalOffset={vertOffset} >
                        <View style={style.textInputContainer}>
                            <TextInput
                                autoCapitalize='words'
                                style={style.textInput}
                                placeholder="First Name Last Name"
                                value={name}
                                maxLength={20}
                                underlineColorAndroid='transparent'
                                onChangeText={name => this.setState({ name })}
                                onBlur={(): any => this.onNameTextInputBlur(this.state.name)}
                            />
                            </View>
                            { !!nameTextInputErrorText && <Text style={style.warningText}>{nameTextInputErrorText}</Text>}

                            <View style={style.textInputContainer}>
                            <TextInput
                                autoCapitalize='sentences'
                                style={style.textInput}
                                placeholder="Full Address including Zipcode"
                                multiline={true}
                                value={address}
                                maxLength={80}
                                underlineColorAndroid='transparent'
                                onChangeText={address => this.setState({ address })}
                                onBlur={(): any => this.onAddressTextInputBlur(this.state.address)}
                            />
                            </View>
                            { !!addressTextInputErrorText && <Text style={style.warningText}>{addressTextInputErrorText}</Text>}

                            <View style={style.textInputContainer}>
                            <TextInput
                                style={style.textInput}
                                placeholder="Telephone Number"
                                value={telephone}
                                keyboardType="phone-pad"
                                underlineColorAndroid='transparent'
                                onChangeText={telephone => this.setState({ telephone })}
                                onBlur={(): any => this.onTelephoneTextInputBlur(this.state.telephone)}
                            />
                            </View>
                            { !!telephoneTextInputErrorText && <Text style={style.warningText}>{telephoneTextInputErrorText}</Text>}

                            <View style={style.textInputContainer}>
                            <TextInput
                                autoCapitalize='sentences'
                                style={style.textInput}
                                placeholder="Citizenship"
                                value={citizenship}
                                maxLength={20}
                                underlineColorAndroid='transparent'
                                onChangeText={citizenship => this.setState({ citizenship })}
                                onBlur={(): any => this.onCitizenshipTextInputBlur(this.state.citizenship)}
                            />
                            </View>
                            { !!citizenshipTextInputErrorText && <Text style={style.warningText}>{citizenshipTextInputErrorText}</Text>}
                            <View style={style.text}>
                                <Text>Upload a government issued ID </Text>
                            </View>
                            <View style={style.text}>
                                <Text>Upload a selfie with your government issued ID </Text>
                            </View>
                            <View style={style.text}>
                                <Text>Proof of address (if not ID) </Text>
                            </View>
                            <View>
                                {
                                    (Platform.OS === 'android') ?
                                    ("I have read and agree to the Privacy Policy") :
                                    (<Switch> I have read and agree to the Privacy Policy </Switch>)
                                }
                            </View>

                            <Button round fat onPress={() => this.submit()} style={style.submitButton} text="Submit" />

                        </KeyboardAvoidingView>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default LndrVerifyForm;