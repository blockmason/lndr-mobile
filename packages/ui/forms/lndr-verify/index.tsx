import React, { Component } from 'react';
import { View, Text, Switch, ScrollView, TextInput, Alert, BackHandler, KeyboardAvoidingView, Platform, TouchableHighlight, Picker } from 'react-native';

import Button from 'ui/components/button';
import DashboardShell from 'ui/components/dashboard-shell';
import { LoadingContext } from 'ui/components/loading'
import SpinningPicker from 'ui/components/spinning-picker'

import style from 'theme/form';
import general from 'theme/general';

import { UserData } from 'lndr/user';
import countries from 'lndr/data';

const loadingContext = new LoadingContext();

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
    agreement: boolean
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
            agreement: false
        }
        this.showGovernmentIssuedInfo = this.showGovernmentIssuedInfo.bind(this);
        this.showProofOfAddressInfo = this.showProofOfAddressInfo.bind(this);
        this.toggleSwitch = this.toggleSwitch.bind(this);
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
        const {} = this.props;
        // if ()
    }
    showGovernmentIssuedInfo = () => {
        Alert.alert(
            'Examples of ID include:',
            `
                -  Passport
                -  Driver's License
                -  National identity card
            `,
            [
              {text: 'OK', onPress: () => null},
            ],
            { cancelable: false }
          )
    }

    showProofOfAddressInfo = () => {
        Alert.alert(
            'Examples of proof of address:',
            `
                -  Bank statement
                -  Utility bill
            `,
            [
              {text: 'OK', onPress: () => null},
            ],
            { cancelable: false }
          )
    }

    toggleSwitch = () => {
        const { agreement } = this.state;
        this.setState({ agreement: !agreement})
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
        const { name, address, telephone, citizenship, agreement, nameTextInputErrorText, addressTextInputErrorText, telephoneTextInputErrorText, citizenshipTextInputErrorText } = this.state;
        return(
            <View style={general.whiteFlex}>
                <View style={general.view}>
                    <DashboardShell text="Lndr Verified" navigation={this.props.navigation} />
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
                            <View style={style.pickerContainer}>
                                <Text style={[style.text, style.spaceTopL, style.center]}>
                                    Citizenship
                                </Text>
                                <Picker
                                    selectedValue={(value) => this.setState({ citizenship: value})}
                                    onValueChange={(value, _index) => this.setState({citizenship: value.name})}
                                    prompt="Citizenship">
                                    {countries.map((value, key) => 
                                        <Picker.Item
                                            label={value.name}
                                            key={key} 
                                            value={value.name}>
                                                {value.name}
                                        </Picker.Item>)
                                    }
                                </Picker>
                            </View>
                            { !!citizenshipTextInputErrorText && <Text style={style.warningText}>{citizenshipTextInputErrorText}</Text>}
                            <View>
                                <Text style={[style.label, style.spaceTopS]}>Upload a <Text onPress={this.showGovernmentIssuedInfo} style={[style.link]}> government issued ID</Text></Text>
                            </View>
                            <View>
                                <Text style={[style.label, style.spaceTopS]}>Upload a selfie with your government issued ID </Text>
                            </View>
                            <View>
                                <Text style={[style.label, style.spaceTopS]}>Proof of address <Text onPress={this.showProofOfAddressInfo} style={style.link}>(if not ID)</Text> </Text>
                            </View>
                            <View style={[general.flexRow]}>
                                <Switch value={agreement} onValueChange={this.toggleSwitch} style={[]}/>
                                <Text style={[style.label, style.spaceTopS, {alignSelf: 'flex-end'}]}>I have read and agree to the Privacy Policy</Text>
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