import React, { Component } from 'react'
import { View, Text, Switch, ScrollView, TextInput, Alert, BackHandler, KeyboardAvoidingView, Platform, Picker, Image, TouchableHighlight,
    Linking, Keyboard, Modal } from 'react-native'
import ActionSheet from 'react-native-actionsheet'
import ImagePicker from 'react-native-image-picker'
import Icon from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import firebase from 'react-native-firebase'

import BackButton from 'ui/components/back-button'
import Button from 'ui/components/button'
import DashboardShell from 'ui/components/dashboard-shell'
import Loading, { LoadingContext } from 'ui/components/loading'
import SpinningPicker from 'ui/components/spinning-picker'

import { setKYCImage, submitKYC, kycToastMessage } from 'actions'
import { getUser } from 'reducers/app'
import { getResetAction } from 'reducers/nav'

import style from 'theme/form'
import general from 'theme/general'
import { paleGray } from 'theme/include/colors'
import popupStyle from 'theme/popup'

import { UserData, IdentityVerificationData } from 'lndr/user'
import KYC from 'lndr/kyc'
import { dobFormat } from 'lndr/format'

import language from 'language'
const { submit, lndrVerified, countries, cancel } = language
const countryNames = countries.map(country => country.name)

const loadingContext = new LoadingContext()

const governmentPhotoTypes = [
    { name: lndrVerified.passport, code: 'PASSPORT' },
    { name: lndrVerified.drivers, code: 'DRIVERS' },
    { name: lndrVerified.national, code: 'ID_CARD' }
]
const addressPhotoTypes = [
    { name: lndrVerified.utility, code: 'UTILITY_BILL' }
]

interface Props {
    navigation: any
    user: UserData
    state: any
    submitKYC: (lndVerifiedData: IdentityVerificationData) => any
    kycToastMessage: (success: boolean) => void
}

interface State {
    firstName: string
    lastName: string
    dob: string
    street: string
    city: string
    state: string
    postCode: string
    phone: string
    country: any
    agreement: boolean
    governmentPhoto: string
    selfiePhoto: string
    addressPhoto: string
    governmentPhotoType: any
    addressPhotoType: any
    firstNameError?: string
    lastNameError?: string
    streetError?: string
    cityError?: string
    stateError?: string
    postCodeError?: string
    phoneError?: string
    dobError?: string
    generalFormError?: string
    submitted: boolean
    shouldPickCountry: boolean
  }

class VerifyIdentityForm extends Component <Props, State>{
    addressPhotoTypeActionSheet: any
    governmentPhotoTypeActionSheet: any
    textInput2: any
    textInput3: any
    textInput4: any
    textInput5: any
    textInput6: any
    textInput7: any
    textInput8: any
    textInput9: any

    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            dob: '',
            street: '',
            city: '',
            state: '',
            postCode: '',
            phone: '',
            country: {name: '', code: ''},
            agreement: false,
            governmentPhoto: '',
            selfiePhoto: '',
            addressPhoto: '',
            governmentPhotoType: {name: '', value: ''},
            addressPhotoType: {name: '', value: ''},
            submitted: false,
            shouldPickCountry: false,
        }
        this.submitForm = this.submitForm.bind(this)
        this.showGovernmentIssuedInfo = this.showGovernmentIssuedInfo.bind(this)
        this.showProofOfAddressInfo = this.showProofOfAddressInfo.bind(this)
        this.toggleSwitch = this.toggleSwitch.bind(this)
        this.onFirstNameChange = this.onFirstNameChange.bind(this)
        this.onLastNameChange = this.onLastNameChange.bind(this)
        this.onStreetChange = this.onStreetChange.bind(this)
        this.onCityChange = this.onCityChange.bind(this)
        this.onStateChange = this.onStateChange.bind(this)
        this.onPostCodeChange = this.onPostCodeChange.bind(this)
        this.onPhoneChange = this.onPhoneChange.bind(this)
        this.onDateOfBirthChange = this.onDateOfBirthChange.bind(this)
        this.chooseCountry = this.chooseCountry.bind(this)
        this.chooseGovernmentPhotoType = this.chooseGovernmentPhotoType.bind(this)
        this.chooseAddressPhotoType = this.chooseAddressPhotoType.bind(this)
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress)
        firebase.analytics().setCurrentScreen('verify-identity', 'VerifyIdentity')
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress)
    }

    onBackPress = () => {
        BackHandler.exitApp()
    }

    showGovernmentIssuedInfo = () => {
        const message = Platform.OS === 'ios' ? `
${lndrVerified.passport}
${lndrVerified.drivers}
${lndrVerified.national}
        ` : `
        • ${lndrVerified.passport}
        • ${lndrVerified.drivers}
        • ${lndrVerified.national}
            `

        Alert.alert(
            lndrVerified.idInfoHeader,
            message,
            [
              {text: lndrVerified.ok, onPress: () => null},
            ],
            { cancelable: false }
          )
    }

    showProofOfAddressInfo = () => {
        const message = Platform.OS === 'ios' ? `
${lndrVerified.bank}
${lndrVerified.utility}
        ` : `
        • ${lndrVerified.utility}
            `

        Alert.alert(
            lndrVerified.addressInfoHeader,
            message,
            [
              {text: lndrVerified.ok, onPress: () => null},
            ],
            { cancelable: false }
          )
    }

    toggleSwitch = () => {
        const { agreement } = this.state
        this.setState({ agreement: !agreement, generalFormError: undefined })
    }

    onFirstNameChange(firstName: string) {
        if (!firstName) {
            this.setState({ firstName, firstNameError: lndrVerified.formErrors.firstName })
        } else {
            this.setState({ firstName, firstNameError: '', generalFormError: undefined })
        }
    }

    onLastNameChange(lastName: string) {
        if (!lastName) {
            this.setState({ lastName, lastNameError: lndrVerified.formErrors.lastName })
        } else {
            this.setState({ lastName, lastNameError: '', generalFormError: undefined })
        }
    }

    onStreetChange(street: string) {
        if (!street) {
            this.setState({ street, streetError: lndrVerified.formErrors.street })
        } else {
            this.setState({ street, streetError: '', generalFormError: undefined })
        }
    }

    onCityChange(city: string) {
        if (!city) {
            this.setState({ city, cityError: lndrVerified.formErrors.city })
        } else {
            this.setState({ city, cityError: '', generalFormError: undefined })
        }
    }

    onStateChange(state: string) {
        if (!state) {
            this.setState({ state, stateError: lndrVerified.formErrors.state })
        } else {
            this.setState({ state, stateError: '', generalFormError: undefined })
        }
    }

    onPostCodeChange(postCode: string) {
        if (!postCode) {
            this.setState({ postCode, postCodeError: lndrVerified.formErrors.postCode })
        } else {
            this.setState({ postCode, postCodeError: '', generalFormError: undefined })
        }
    }

    onPhoneChange(phone: string) {
        if (!phone) {
            this.setState({ phone, phoneError: lndrVerified.formErrors.phone })
        } else {
            this.setState({ phone, phoneError: '', generalFormError: undefined })
        }
    }

    onDateOfBirthChange(inputDOB: string) {
        if (!inputDOB) {
            this.setState({ dob: '', dobError: lndrVerified.formErrors.dob })
        } else {
            const dob = dobFormat(inputDOB)
            this.setState({ dob, dobError: '', generalFormError: undefined })
        }
    }

    chooseCountry(selection: string) {
        const country = countries.find(option => option.name === selection)
        this.setState({ country, generalFormError: undefined, shouldPickCountry: false })
    }

    chooseGovernmentPhotoType(governmentPhotoType) {
        this.setState({ governmentPhotoType, generalFormError: undefined })
        setTimeout(() => this.getPhoto('governmentPhoto', false), 100)
    }

    chooseAddressPhotoType(addressPhotoType) {
        this.setState({ addressPhotoType, generalFormError: undefined })
        setTimeout(() => this.getPhoto('addressPhoto', false), 100)
    }

    async getPhoto(type: string, getType = true) {
        let title
        if (type === 'governmentPhoto') {
            if (getType) {
                return this.governmentPhotoTypeActionSheet.show()
            }
            title = lndrVerified.chooseGovernmentPhoto
        } else if (type === 'selfiePhoto') {
            title = lndrVerified.chooseSelfiePhoto
        } else {
            if (getType) {
                return this.addressPhotoTypeActionSheet.show()
            }
            title = lndrVerified.chooseAddressPhoto
        }
        let options = {
            title,
            storageOptions: { skipBackup: true, path: 'images' }
        }
        ImagePicker.showImagePicker(options, async (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker')
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error)
            } else {
                const { uri, data } = response
                const photo = await setKYCImage(uri, data)
                if (type === 'governmentPhoto') {
                    this.setState({ governmentPhoto: photo, generalFormError: undefined })
                } else if (type === 'selfiePhoto') {
                    this.setState({ selfiePhoto: photo, generalFormError: undefined })
                } else {
                    this.setState({ addressPhoto: photo, generalFormError: undefined })
                }
            }
        })
    }

    navigateAway() {
        const resetAction = getResetAction( { routeName:'Confirmation', params: { type: 'kycSuccess' } } )
        this.props.navigation.dispatch(resetAction)
    }

    submitForm = async () => {
        Keyboard.dismiss()
        const { firstName, lastName, dob, street, phone, city, state, postCode, country, governmentPhoto, selfiePhoto, addressPhoto, agreement,
            governmentPhotoType, addressPhotoType } = this.state
        const { email, address } = this.props.user

        if (firstName && lastName && street && city && state && postCode && phone && governmentPhoto && selfiePhoto && addressPhoto && agreement && governmentPhotoType.code && addressPhotoType.code) {
            this.setState({ submitted: true })

            const data = new KYC({ firstName, lastName, dob, street, phone, city, state, postCode, country: country.code, governmentPhoto, selfiePhoto, addressPhoto,
                governmentPhotoType: governmentPhotoType.code, addressPhotoType: addressPhotoType.code, email, address })

            try {
                await loadingContext.wrap(this.props.submitKYC(data))
                const resetAction = getResetAction( { routeName:'Confirmation', params: { type: 'kycSuccess' } } )
                this.props.navigation.dispatch(resetAction)
            } catch(e) {
                console.log('KYC FAILED: ', e)
                this.props.kycToastMessage(false)
                this.setState({ submitted: false })
            }
        } else {
            this.setState({ generalFormError: lndrVerified.formErrors.general })
        }
    }

    renderPicker(choices, label: string, selection: any, changeValue: (newValue: any) => void) {
        const { shouldPickCountry } = this.state

        if (Platform.OS === 'ios') {
            return <View>
                <TouchableHighlight underlayColor={paleGray} onPress={() => this.setState({ shouldPickCountry: true })}>
                    <View>
                        <Text style={style.pickerLabel} >{selection && selection.name ? selection.name : label}</Text>
                        <FontAwesome style={style.blackCaretDown} name={'caret-down'} />
                    </View>
                </TouchableHighlight>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={shouldPickCountry}
                    onRequestClose={() => this.setState({shouldPickCountry: false})}>
                    <View style={[popupStyle.modalOverlay, general.flexColumn, general.justifyEnd]}>
                        <View style={{backgroundColor:'white', paddingTop:4}}>
                            <SpinningPicker label={label} allItems={choices} selectedItem={selection.name} onPickerDone={(value) => changeValue(value)} />
                        </View>
                    </View>
                </Modal>
            </View>
        } else {
            return <Picker
                selectedValue={selection.name} style={style.picker}
                onValueChange={changeValue}>
                {[<Picker.Item label={label} value='0' key={-1} />]
                    .concat(choices.map((value, key) => <Picker.Item label={value} key={key} value={value}>{selection.name}</Picker.Item>)
                )}
            </Picker>
        }
    }

    renderActionSheet(choices, label: string, type: string, changeValue: (newValue: any) => void) {
        return <ActionSheet
            ref={o => this[type] = o}
            title={label}
            options={choices.map(choice => choice.name).concat(cancel)}
            cancelButtonIndex={choices.length}
            onPress={(index) => {
            if (index === choices.length) {
                return
            }
                changeValue(choices[index])
            }} />
    }

    render() {
        const vertOffset = Platform.OS === 'android' ? -300 : 0
        const { firstName, lastName, street, city, state, postCode, phone, dob, country, agreement, governmentPhoto, selfiePhoto, addressPhoto,
            firstNameError, lastNameError, streetError, cityError, stateError, postCodeError, phoneError, dobError, generalFormError,
            governmentPhotoType, addressPhotoType, submitted } = this.state

        const govPhoto = governmentPhoto ? { uri: governmentPhoto} : require('images/upload-cloud-outline.png')
        const selfPhoto = selfiePhoto ? { uri: selfiePhoto} : require('images/upload-cloud-outline.png')
        const addrPhoto = addressPhoto ? { uri: addressPhoto} : require('images/upload-cloud-outline.png')

        const disabled = submitted || !(firstName && lastName && street && city && state && postCode && phone && governmentPhoto && selfiePhoto && addressPhoto && agreement && governmentPhotoType.code && addressPhotoType.code)

        return(
            <View style={general.whiteFlex}>
                <View style={general.view}>
                    <DashboardShell text="Verify Identity" navigation={this.props.navigation} />
                    <BackButton onPress={() => this.props.navigation.goBack()} />
                </View>
                <KeyboardAvoidingView style={general.whiteFlex} behavior={'padding'} keyboardVerticalOffset={vertOffset} >
                    <ScrollView style={general.view} keyboardShouldPersistTaps="handled">
                        <View style={style.form}>
                            <View style={general.centeredColumn}>
                                <Text style={[style.title, general.spaceBelowM, {margin: 0}]}>{lndrVerified.formMessage}</Text>
                            </View>
                            {!!firstNameError && <Text style={style.formErrorText}>{firstNameError}</Text>}
                            <View style={style.textInputContainer}>
                                <TextInput autoCapitalize='words' style={style.textInput}
                                    placeholder={lndrVerified.formFields.firstName} value={firstName}
                                    maxLength={20} underlineColorAndroid='transparent'
                                    onChangeText={this.onFirstNameChange}
                                    returnKeyType = { "next" }
                                    onSubmitEditing={() => { this.textInput2.focus() }}
                                    blurOnSubmit={false}
                                    />
                            </View>
                            {!!lastNameError && <Text style={style.formErrorText}>{lastNameError}</Text>}
                            <View style={style.textInputContainer}>
                                <TextInput autoCapitalize='words' style={style.textInput}
                                    placeholder={lndrVerified.formFields.lastName} value={lastName}
                                    maxLength={20} underlineColorAndroid='transparent'
                                    onChangeText={this.onLastNameChange}
                                    ref={(input) => { this.textInput2 = input }}
                                    returnKeyType = { "next" }
                                    onSubmitEditing={() => { this.textInput3.focus() }}
                                    blurOnSubmit={false}
                                    />
                            </View>
                            {!!streetError && <Text style={style.formErrorText}>{streetError}</Text>}
                            <View style={style.textInputContainer}>
                                <TextInput autoCapitalize='sentences' style={style.textInput}
                                    placeholder={lndrVerified.formFields.street}
                                    multiline={true} value={street}
                                    maxLength={80} underlineColorAndroid='transparent'
                                    onChangeText={this.onStreetChange}
                                    ref={(input) => { this.textInput3 = input }}
                                    returnKeyType = { "next" }
                                    onSubmitEditing={() => { this.textInput4.focus() }}
                                    blurOnSubmit={false}
                                    />
                            </View>
                            {!!cityError && <Text style={style.formErrorText}>{cityError}</Text>}
                            <View style={style.textInputContainer}>
                                <TextInput autoCapitalize='sentences' style={style.textInput}
                                    placeholder={lndrVerified.formFields.city} value={city}
                                    maxLength={80} underlineColorAndroid='transparent'
                                    onChangeText={this.onCityChange}
                                    ref={(input) => { this.textInput4 = input }}
                                    returnKeyType = { "next" }
                                    onSubmitEditing={() => { this.textInput5.focus() }}
                                    blurOnSubmit={false}
                                    />
                            </View>
                            {!!stateError && <Text style={style.formErrorText}>{stateError}</Text>}
                            <View style={style.textInputContainer}>
                                <TextInput autoCapitalize='sentences' style={style.textInput}
                                    placeholder={lndrVerified.formFields.state} value={state}
                                    maxLength={80} underlineColorAndroid='transparent'
                                    onChangeText={this.onStateChange}
                                    ref={(input) => { this.textInput5 = input }}
                                    returnKeyType = { "next" }
                                    onSubmitEditing={() => { this.textInput6.focus() }}
                                    blurOnSubmit={false}
                                    />
                            </View>
                            {!!postCodeError && <Text style={style.formErrorText}>{postCodeError}</Text>}
                            <View style={style.textInputContainer}>
                                <TextInput style={style.textInput} placeholder={lndrVerified.formFields.postalCode}
                                    value={postCode} underlineColorAndroid='transparent'
                                    onChangeText={this.onPostCodeChange}
                                    ref={(input) => { this.textInput6 = input }}
                                    returnKeyType = { "next" }
                                    onSubmitEditing={() => { this.textInput7.focus() }}
                                    blurOnSubmit={false}
                                    />
                            </View>
                            <View style={style.pickerContainer}>
                                {this.renderPicker(countryNames, lndrVerified.formFields.country, country, this.chooseCountry)}
                            </View>
                            {!!phoneError && <Text style={style.formErrorText}>{phoneError}</Text>}
                            <View style={style.textInputContainer}>
                                <TextInput style={style.textInput} placeholder={lndrVerified.formFields.phone}
                                    value={phone} keyboardType="phone-pad" underlineColorAndroid='transparent'
                                    onChangeText={this.onPhoneChange}
                                    ref={(input) => { this.textInput7 = input }}
                                    returnKeyType = { "next" }
                                    onSubmitEditing={() => { this.textInput8.focus() }}
                                    blurOnSubmit={false}
                                    />
                            </View>
                            {!!dobError && <Text style={style.formErrorText}>{dobError}</Text>}
                            <View style={style.textInputContainer}>
                                <TextInput style={style.textInput} placeholder={lndrVerified.formFields.dob}
                                    value={dob} keyboardType="number-pad" underlineColorAndroid='transparent'
                                    onChangeText={this.onDateOfBirthChange}
                                    ref={(input) => { this.textInput8 = input }}
                                    />
                            </View>
                            <View style={[general.centeredColumn, style.photoUploadContainer]}>
                                <View style={[general.flexRow]}>
                                    <Text style={[style.label, style.photoTitle, general.standardHMargin]}>{lndrVerified.upload}
                                        <Text onPress={this.showGovernmentIssuedInfo} style={[style.link]}>{lndrVerified.governmentId}</Text>
                                    </Text>
                                </View>
                                <View style={style.photoPickerContainer}>
                                    {this.renderActionSheet(governmentPhotoTypes, lndrVerified.chooseGovernmentPhoto, 'governmentPhotoTypeActionSheet', this.chooseGovernmentPhotoType)}
                                </View>
                                <TouchableHighlight underlayColor={paleGray} onPress={() => this.getPhoto('governmentPhoto')}>
                                    <View>
                                        <Icon style={[style.cameraImage, style.kycImageIcon]} name="md-camera" />
                                        <Image source={govPhoto} style={style.kycImage}/>
                                    </View>
                                </TouchableHighlight>
                            </View>
                            <View style={[general.centeredColumn, style.photoUploadContainer]}>
                                <View style={[general.flexRow]}>
                                    <Text style={[style.label, style.photoTitle, general.standardHMargin]}>{lndrVerified.selfie}</Text>
                                </View>
                                <TouchableHighlight underlayColor={paleGray} onPress={() => this.getPhoto('selfiePhoto')}>
                                    <View>
                                        <Icon style={[style.cameraImage, style.kycImageIcon]} name="md-camera" />
                                        <Image source={selfPhoto} style={style.kycImage}/>
                                    </View>
                                </TouchableHighlight>
                            </View>
                            <View style={[general.centeredColumn, style.photoUploadContainer]}>
                                <View style={[general.flexRow]}>
                                    <Text style={[style.label, style.photoTitle, general.standardHMargin]}>{lndrVerified.proofOfAddress}
                                        <Text onPress={this.showProofOfAddressInfo} style={style.link}>{lndrVerified.ifNotId}</Text>
                                    </Text>
                                </View>
                                <View style={style.photoPickerContainer}>
                                    {this.renderActionSheet(addressPhotoTypes, lndrVerified.chooseAddressPhoto, 'addressPhotoTypeActionSheet', this.chooseAddressPhotoType)}
                                </View>
                                <TouchableHighlight underlayColor={paleGray} onPress={() => this.getPhoto('addressPhoto')}>
                                    <View>
                                        <Icon style={[style.cameraImage, style.kycImageIcon]} name="md-camera" />
                                        <Image source={addrPhoto} style={style.kycImage}/>
                                    </View>
                                </TouchableHighlight>
                            </View>

                            <View style={[general.flexRow, {flexWrap: 'wrap', justifyContent: 'center'}]}>
                                <Switch value={agreement} onValueChange={this.toggleSwitch}/>
                                <Text style={[style.label, {alignSelf: 'flex-end', paddingLeft: 6}]}>{lndrVerified.agree}</Text>
                                <Text style={[style.label, style.link, {alignSelf: 'flex-end', paddingTop: 2}]} onPress={() => Linking.openURL('https://blockmason.io/lndr/terms/#privacy-policy')}>{lndrVerified.agreeLink}</Text>
                            </View>

                            {!!generalFormError && <Text style={style.warningText}>{generalFormError}</Text>}

                            <View>
                                <Loading context={loadingContext} />
                                <Button round fat onPress={() => this.submitForm()} style={[style.submitButton, style.spaceTop]} text={submit} disabled={disabled} />
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        )
    }
}

export default connect((state) => ({user: getUser(state)()}), { submitKYC, kycToastMessage })(VerifyIdentityForm)
