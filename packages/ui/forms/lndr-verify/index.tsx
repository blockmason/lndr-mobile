import React, { Component } from 'react';
import {
    View,
    Text,
    Switch,
    ScrollView,
    TextInput,
    Alert,
    BackHandler,
    KeyboardAvoidingView,
    Platform,
    Picker,
    TouchableHighlight
} from 'react-native';

import ImagePicker from 'react-native-image-picker';
import Button from 'ui/components/button';
import DashboardShell from 'ui/components/dashboard-shell';
import { LoadingContext } from 'ui/components/loading';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { setGovernmentPhoto, setSelfiePhoto, setAddressPhoto, submitKYC } from 'actions';
import { getUser } from 'reducers/app';

import style from 'theme/form';
import general from 'theme/general';

import { UserData, LndrVerifiedData } from 'lndr/user';
import countries from 'lndr/countries';

const loadingContext = new LoadingContext();

interface Props {
    navigation: any
    user: UserData
    state: any
    submitKYC: (lndVerifiedData: LndrVerifiedData) => any
    // setGovernmentPhoto: (imageURI: string, imageData: string) => any
    // setSelfiePhoto: (imageURI: string, imageData: string) => any
    // setAddressPhoto: (imageURI: string, imageData: string) => any
}

interface State {
    name: string
    street: string
    town: string
    state: string
    postcode: string
    telephone: string
    country: string
    agreement: boolean
    governmentPhoto: string
    selfiePhoto: string
    addressPhoto: string
    nameTextInputErrorText?: string
    addressTextInputErrorText?: string
    telephoneTextInputErrorText?: string
    countryTextInputErrorText?: string
  }

class LndrVerifyForm extends Component <Props, State>{

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            street: '',
            town: '',
            state: '',
            postcode: '',
            telephone: '',
            country: '',
            agreement: false,
            governmentPhoto: '',
            selfiePhoto: '',
            addressPhoto: ''
        }
        this.submitForm = this.submitForm.bind(this);
        this.showGovernmentIssuedInfo = this.showGovernmentIssuedInfo.bind(this);
        this.showProofOfAddressInfo = this.showProofOfAddressInfo.bind(this);
        this.toggleSwitch = this.toggleSwitch.bind(this);
        this.getGovernmentIssuedID = this.getGovernmentIssuedID.bind(this);
        this.getSelfie = this.getSelfie.bind(this);
        this.getProofOfAddressPhoto = this.getProofOfAddressPhoto.bind(this);
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

    async oncountryTextInputBlur(country: string) {
        if (typeof country !== 'undefined') {
            this.setState({ countryTextInputErrorText: ''});
        } else {
            this.setState({ countryTextInputErrorText: 'country is required'});
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

    async getGovernmentIssuedID() {
        let options = {
            title: `Choose Government Issued ID Photo`,
            storageOptions: {
              skipBackup: true,
              path: 'images'
            }
        };
        ImagePicker.showImagePicker(options, async (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const { uri, data } =  response
                const governmentPhoto = loadingContext.wrap(setGovernmentPhoto(uri, data));
                this.setState({ governmentPhoto });
            }
        });
    }
    
    async getSelfie() {
        let options = {
            title: `Choose Selfie Government Issued ID Photo`,
            storageOptions: {
              skipBackup: true,
              path: 'images'
            }
        };
        ImagePicker.showImagePicker(options, async (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const { uri, data } =  response
                const selfiePhoto = await loadingContext.wrap(setSelfiePhoto(uri, data));
                this.setState({ selfiePhoto });
            }
        });
    }

    async getProofOfAddressPhoto() {
        let options = {
            title: `Choose Proof of Address Photo`,
            storageOptions: {
              skipBackup: true,
              path: 'images'
            }
        };
        ImagePicker.showImagePicker(options, async (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const { uri, data } =  response;
                const addressPhoto = await setAddressPhoto(uri, data);
                this.setState({ addressPhoto });
            }
        });
    }

    submitForm = async () => {
        const { name, street, telephone, town, state, postcode, country, governmentPhoto, selfiePhoto, addressPhoto, agreement} = this.state;
        const { email, address } = this.props.user;
        let data = {
            email,
            externalUserId: address,
            info: {
                firstName: name.split(' ')[0],
                lastName: name.split(' ')[1],
                phone: telephone,
                nationality: country,
                idDocs: [
                    {
                        country,
                        idDocType: "PASSPORT",
                        idDocSubType: "FRONT_SIDE",
                        content: governmentPhoto
                    },
                    {
                        country,
                        idDocType: "PASSPORT",
                        idDocSubType: "FRONT_SIDE",
                        content: selfiePhoto
                    },
                    {
                        country,
                        idDocType: "PASSPORT",
                        idDocSubType: "FRONT_SIDE",
                        content: addressPhoto
                    }
                ],
                addresses: {
                    street,
                    town,
                    state,
                    postcode,
                    country
                },
                requiredIdDocs : {
                    "country" : `${country}`,
                    "docSets" : [ {
                        "idDocSetType" : "IDENTITY",
                        "types" : [ "PASSPORT", "ID_CARD", "DRIVERS" ],
                        "subTypes" : [ "FRONT_SIDE", "BACK_SIDE" ]
                        }, {
                        "idDocSetType" : "SELFIE",
                        "types" : [ "SELFIE" ],
                        "subTypes" : null
                        }
                    ]
                }
            }
        };
        if (name && street && town && state && postcode && telephone && governmentPhoto && selfiePhoto && addressPhoto && agreement ) {
            const request = await loadingContext.wrap(this.props.submitKYC(data));
            if (request) {
                const { navigate } = this.props.navigation;
                navigate('LndrVerify');
            }
        }
    }

    render() {
        const vertOffset = (Platform.OS === 'android') ? -300 : 0;
        const { name, street, town, state, postcode, telephone, country, agreement } = this.state;
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
                                onBlur={(): any => this.onNameTextInputBlur(name)}
                            />
                            </View>

                            <View style={style.textInputContainer}>
                            <TextInput
                                autoCapitalize='sentences'
                                style={style.textInput}
                                placeholder="Street Name"
                                multiline={true}
                                value={street}
                                maxLength={80}
                                underlineColorAndroid='transparent'
                                onChangeText={street => this.setState({ street })}
                                onBlur={(): any => this.onAddressTextInputBlur(street)}
                            />
                            </View>
                            <View style={style.textInputContainer}>
                            <TextInput
                                autoCapitalize='sentences'
                                style={style.textInput}
                                placeholder="Town"
                                multiline={true}
                                value={town}
                                maxLength={80}
                                underlineColorAndroid='transparent'
                                onChangeText={town => this.setState({ town })}
                                onBlur={(): any => this.onAddressTextInputBlur(town)}
                            />
                            </View>
                            <View style={style.textInputContainer}>
                            <TextInput
                                autoCapitalize='sentences'
                                style={style.textInput}
                                placeholder="State"
                                multiline={true}
                                value={state}
                                maxLength={80}
                                underlineColorAndroid='transparent'
                                onChangeText={state => this.setState({ state })}
                                onBlur={(): any => this.onAddressTextInputBlur(state)}
                            />
                            </View>
                            <View style={style.textInputContainer}>
                            <TextInput
                                style={style.textInput}
                                keyboardType="phone-pad"
                                placeholder="Postal Code"
                                value={postcode}
                                underlineColorAndroid='transparent'
                                onChangeText={postcode => this.setState({ postcode })} 
                                onBlur={(): any => this.onAddressTextInputBlur(postcode)}
                            />
                            </View>

                            <View style={style.pickerContainer}>
                                <Text style={[style.label]}>
                                    Country
                                </Text>
                                <Picker
                                    selectedValue={ country }
                                    onValueChange={(value, _index) => this.setState({country: value })}
                                    prompt="Country">
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

                            <View style={style.textInputContainer}>
                            <TextInput
                                style={style.textInput}
                                placeholder="Telephone Number"
                                value={telephone}
                                keyboardType="phone-pad"
                                underlineColorAndroid='transparent'
                                onChangeText={telephone => this.setState({ telephone })}
                                onBlur={(): any => this.onTelephoneTextInputBlur(telephone)}
                            />
                            </View>
                            <View style={[general.flexRow]}>
                                <Text style={[style.label]}>Upload a <Text onPress={this.showGovernmentIssuedInfo} style={[style.link]}> government issued ID</Text></Text>
                                <Icon onPress={() => this.getGovernmentIssuedID()} style={[style.cameraImage, {alignSelf: 'flex-end'}]} name="md-camera" />
                            </View>
                            <View style={[general.flexRow, style.spaceTop]}>
                                <Text style={[style.label]}>Upload a selfie with your government issued ID </Text>
                                <Icon onPress={() => this.getSelfie()} style={[style.cameraImage, {justifyContent: 'space-between', alignSelf: 'flex-end'}]} name="md-camera" />
                            </View>
                            <View style={[general.flexRow, style.spaceTop]}>
                                <Text style={[style.label]}>Proof of address <Text onPress={this.showProofOfAddressInfo} style={style.link}>(if not ID)</Text> </Text>
                                <Icon onPress={() => this.getProofOfAddressPhoto()} style={[style.cameraImage, {alignSelf: 'flex-end'}]} name="md-camera" />
                            </View>
                            <View style={[general.flexRow, style.spaceTop]}>
                                <Switch value={agreement} onValueChange={this.toggleSwitch}/>
                                <Text style={[style.label, {alignSelf: 'flex-end'}]}>I have read and agree to the Privacy Policy</Text>
                            </View>

                            <Button round fat onPress={() => this.submitForm()} style={[style.submitButton, style.spaceTop]} text="Submit" />

                        </KeyboardAvoidingView>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default connect((state) => ({user: getUser(state)()}), { submitKYC })(LndrVerifyForm)