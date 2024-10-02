import React, { useState, useRef, useEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, Text, TextInput, Image, TouchableOpacity, ImageBackground, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, I18nManager, Alert } from "react-native";
// import { fonts } from "../../theme";
import { useForm } from 'react-hook-form';
import { IOS, backgroungImage, colorScheme, colors, fontSize, fonts, invertcolor, isIPad, isRTL } from "../../theme";

import Icon from "react-native-vector-icons/Feather";
import globalstyle from "../../theme/style";
import TermsAndConditionsModal from "../../components/modal/TermsAndConditionsModal";
import Loader from "../../components/Loader";
import { connect } from "react-redux";
import { SetIsLogin, SetUserInfo } from "../../redux/reducers/AppStateReducer";
import { RegisterApiCall } from "../../redux/reducers/AuthReducer";
import { bindActionCreators } from "redux";
import { showToast } from "../../helpers/toastConfig";
import strings from "../../localization/translation";
import messaging from '@react-native-firebase/messaging';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Register = (props) => {

    const [showPassword, setShowPassword] = useState(false);
    const [loading, isLoading] = useState(false);
    const [isChecked, setChecked] = useState(false);
    const { handleSubmit, formState: { errors }, register, setValue } = useForm();
    const [fcm_token, setFcm_token] = useState('');

    const prevResgisterResponseRef = useRef(props.registerResponse);

    useEffect(() => {
        const requestUserPermission = async () => {
            const authStatus = await messaging().requestPermission();
            const enabled =
                authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                authStatus === messaging.AuthorizationStatus.PROVISIONAL;

            if (enabled) {
                console.log('Authorization status:', authStatus);
                const token = await messaging().getToken();
                setFcm_token(token);
                console.log('Device Token:', token);
            } else {
                console.log('Authorization status:', authStatus);
            }
        };

        requestUserPermission();

        const unsubscribe = messaging().onTokenRefresh((token) => {
            setFcm_token(token);
            console.log('Device Token refreshed:', token);
        });

        return unsubscribe;
    }, []);


    useEffect(() => {
        if (props.registerResponse !== prevResgisterResponseRef.current && props.registerResponse?.success && props.registerResponse?.data) {
            prevResgisterResponseRef.current = props.registerResponse;
            props.SetUserInfo(props.registerResponse?.data);
            console.log('props.registerResponse => ', props.registerResponse);
            props.SetIsLogin(true);
            props.navigation.navigate('Login')
        }
        isLoading(false);
    }, [props.registerResponse])

    const onSubmit = async (data) => {
        if (isChecked) {
            const requestData = { ...data, fcm_token };
            console.log('data => ', requestData);
            isLoading(true);
            try {
                const response = await fetch(process.env.API_BASE_URL ? process.env.API_BASE_URL + '/auth/signup' : 'https://reverendsameembalius.com:3013' + '/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                const result = await response.json();
                console.log('result', result)
                if (result?.success) {
                    const token = result?.data?.access_token;
                    console.log('token', token)
                    await AsyncStorage.setItem('token', token);
                    props.SetUserInfo(result.data);
                    props.SetIsLogin(true);
                    showToast('success', result?.message)
                }
                if (result?.statusCode === 409) {
                    showToast('error', result.message || 'Signup failed')
                }
            } catch (error) {
                showToast('error', error.message || 'Signup failed'); // Show toast on error
            } finally {
                isLoading(false);
            }
        } else {
            showToast('success', 'Please read and agree with terms and conditions')
        }
    }

    const input01 = useRef();
    const input02 = useRef();
    const input03 = useRef();
    const input04 = useRef();
    const input05 = useRef();

    const [showTermsModal, setShowTermsModal] = useState(false);

    return <SafeAreaView style={globalstyle.fullview}
    // style={{ flex: 1 }}
    >
        <Loader isLoading={loading} />
        <TermsAndConditionsModal visible={showTermsModal} setVisible={setShowTermsModal} />
        
            <KeyboardAvoidingView behavior={IOS ? 'padding' : 'padding'} >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView style={[isIPad && globalstyle.authscreencontainer, { backgroundColor: '#000',paddingHorizontal:30 }]} showsVerticalScrollIndicator={false}>
                        <View>
                            <Text style={[globalstyle.authheading, { color: '#ffffff', marginBottom: 8 }]}>{strings.SignUp}</Text>
                            <Text style={[globalstyle.authdescription, { color: '#ffffff', marginBottom: 18 }]}>{strings.SignUpDesc}</Text>
                        </View>
                        <View style={{ marginBottom: 25 }}>
                            <Image
                                source={require('./../../../assets/images/borderimg.png')} // Path to your local image
                                style={{ display: 'flex', justifyContent: 'center', margin: 'auto', alignItems: 'center', width: 'auto' }}
                            />
                        </View>
                        <View>
                            <Text style={{ color: '#fff', fontSize: 12  }}>First Name*</Text>
                            <View style={[globalstyle.inputbox, {marginBottom:15}]}>
                                {/* <Icon style={globalstyle.authlefticon} name={'user'} size={18} /> */}
                                <TextInput
                                    style={globalstyle.inputfield}
                                    placeholder={strings.firstName}
                                    placeholderTextColor={colors.placeholdercolor}
                                    {...register('first_name', {
                                        // value: 'John',
                                        value: '',
                                        required: 'First name is required',
                                        pattern: {
                                            value: /^[A-Za-z\s]+$/i,
                                            message: "Please provide a valid name"
                                        },
                                    })}
                                    defaultValue=''
                                    // defaultValue='John'
                                    onChangeText={(value) => setValue('first_name', value)}
                                    ref={input01}
                                    returnKeyType="next"
                                    onSubmitEditing={() => input05.current.focus()}
                                />
                            </View>
                            {errors.first_name && <Text style={globalstyle.errorField}>{errors.first_name.message}</Text>}
                            <Text style={{color:'#fff', fontSize:12}}>Last Name*</Text>
                            <View style={[globalstyle.inputbox, {marginBottom:15}]}>
                            
                                {/* <Icon style={globalstyle.authlefticon} name={'user'} size={18} /> */}
                                <TextInput
                                    style={globalstyle.inputfield}
                                    placeholder={strings.lastName}
                                    placeholderTextColor={colors.placeholdercolor}
                                    {...register('last_name', {
                                        // value: 'Martin',
                                        value: '',
                                        required: 'Last name is required',
                                        pattern: {
                                            value: /^[A-Za-z\s]+$/i,
                                            message: "Please provide a valid name"
                                        },
                                    })}
                                    defaultValue=''
                                    // defaultValue='Martin'
                                    onChangeText={(value) => setValue('last_name', value)}
                                    ref={input05}
                                    returnKeyType="next"
                                    onSubmitEditing={() => input02.current.focus()}
                                />
                            </View>
                            {errors.last_name && <Text style={globalstyle.errorField}>{errors.last_name.message}</Text>}
                            <Text style={{color:'#fff', fontSize:12}}>Email Address*</Text>
                            <View style={[globalstyle.inputbox, {marginBottom:15}]}>
                                {/* <Icon style={globalstyle.authlefticon} name={'mail'} size={18} /> */}
                                <TextInput
                                    style={globalstyle.inputfield}
                                    placeholder={strings.email}
                                    placeholderTextColor={colors.placeholdercolor}
                                    {...register('email', {
                                        // value: 'johnmartin@mailinator.com',
                                        value: '',
                                        required: 'Email Address is required',
                                        pattern: {
                                            value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                                            message: "Please provide valid email"
                                        },
                                    })}
                                    defaultValue={''}
                                    // defaultValue={'johnmartin@mailinator.com'}
                                    onChangeText={(value) => setValue('email', value)}
                                    autoCapitalize='none'
                                    ref={input02}
                                    returnKeyType="next"
                                    onSubmitEditing={() => input03.current.focus()}
                                />
                            </View>
                            {errors.email && <Text style={globalstyle.errorField}>{errors.email.message}</Text>}
                            <Text style={{color:'#fff', fontSize:12}}>Phone Number*</Text>
                            <View style={[globalstyle.inputbox, {marginBottom:15}]}>
                                {/* <Icon style={globalstyle.authlefticon} name={'phone'} size={18} /> */}
                                <TextInput
                                    style={globalstyle.inputfield}
                                    placeholder={strings.phoneNumber}
                                    placeholderTextColor={colors.placeholdercolor}
                                    // keyboardType='phone-pad'
                                    keyboardType='numeric'
                                    {...register('phone', {
                                        // value: '+8134234123123',
                                        value: '',
                                        // required: 'Phone number is required',
                                        pattern: {
                                            value: /[0-9+]$/i,
                                            message: "Please provide valid phone number"
                                        },
                                    })}
                                    defaultValue=''
                                    // defaultValue='+8134234123123'
                                    onChangeText={(value) => setValue('phone', value)}
                                    ref={input03}
                                    returnKeyType="next"
                                    onSubmitEditing={() => input04.current.focus()}
                                />
                            </View>
                            {errors.phone && <Text style={globalstyle.errorField}>{errors.phone.message}</Text>}
                            <Text style={{color:'#fff', fontSize:12}}>Password*</Text>
                            <View style={[globalstyle.inputbox, {marginBottom:15,justifyContent:'space-between'}]}>
                                <View style={{ flexDirection: 'row',
                                 alignItems: 'center' }}>
                                    {/* <Icon style={globalstyle.authlefticon} name={'lock'} size={18} /> */}
                                    <TextInput
                                        style={[globalstyle.inputfield, { flex: 0.8 }]}
                                        placeholder={strings.password}
                                        placeholderTextColor={colors.placeholdercolor}
                                        {...register('password', {
                                            value: '',
                                            // value: '12345678',
                                            required: 'Password is required',
                                            minLength: { value: 8, message: 'Password length must be greater then 8' }
                                        })}
                                        defaultValue={''}
                                        // defaultValue={'12345678'}
                                        // inputRef={password.ref}
                                        onChangeText={(value) => setValue('password', value)}
                                        secureTextEntry={!showPassword ? true : false}
                                        autoCapitalize='none'
                                        ref={input04}
                                    // returnKeyType="next"
                                    // onSubmitEditing={() => input05.current.focus()}
                                    />
                                </View>
                                <TouchableOpacity activeOpacity={0.8} style={[globalstyle.showhideicontouch,{justifyContent:'flex-end'}]} onPress={() => { setShowPassword(!showPassword) }}>
                                    <Icon name={!showPassword ? 'eye' : 'eye-off'} size={18} style={globalstyle.showhideicon} />
                                </TouchableOpacity>
                            </View>
                            {errors.password && <Text style={globalstyle.errorField}>{errors.password.message}</Text>}

                            <View>
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    onPress={() => setChecked(!isChecked)}
                                    style={{
                                        flexDirection: 'row', alignItems: 'center',
                                        // justifyContent: 'center' 
                                    }}>
                                    <Icon
                                        name={isChecked ? "check-circle" : "circle"}
                                        style={{ fontSize: isIPad ? 20 : fontSize, marginRight: 8, color: colors.orange }}
                                    />
                                    <Text style={[styles.termstext, { color: '#fff' }]}>{strings.YesIAgree} </Text>
                                    <TouchableOpacity
                                        activeOpacity={0.9}
                                        onPress={() => setShowTermsModal(true)}>
                                        <Text style={[styles.termstextbold, { color: '#fff' }]}>{' '}{strings.TermsCondition}</Text>
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity activeOpacity={0.8} onPress={handleSubmit(onSubmit)}
                                style={globalstyle.authSubmitButton}>
                                <Text style={globalstyle.authSubmitButtonText}>{strings.SignUp}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={globalstyle.alreadysignin}>
                            <Text style={globalstyle.alreadyaccount}>{strings.AlreadyHaveAccount} </Text>
                            <TouchableOpacity activeOpacity={0.8}
                                onPress={() => { props.navigation.navigate('Login') }}>
                                <Text style={globalstyle.actionauthtext}> {strings.Login}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ paddingBottom: 40 }} />
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        
    </SafeAreaView>
}


const setStateToProps = (state) => ({
    registerResponse: state.authstate.registerResponse,
})
const mapDispatchToProps = (dispatch) => {
    return {
        RegisterApiCall: bindActionCreators(RegisterApiCall, dispatch),
        SetIsLogin: bindActionCreators(SetIsLogin, dispatch),
        SetUserInfo: bindActionCreators(SetUserInfo, dispatch),
    }
}

export default connect(setStateToProps, mapDispatchToProps)(Register);


const styles = StyleSheet.create({
    termstext: { fontFamily: isRTL ? fonts.arabicMedium : fonts.primary, fontSize: isIPad ? 18 : fontSize, color: colors.black },
    termstextbold: { fontFamily: isRTL ? fonts.arabicBold : fonts.primarySemiBold, fontSize: isIPad ? 18 : fontSize, color: colors.black }
})