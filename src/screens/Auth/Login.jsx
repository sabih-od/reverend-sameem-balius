import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground, Image, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, I18nManager, StatusBar } from "react-native";

import { useForm } from 'react-hook-form';
import { IOS, backgroungImage, colorScheme, colors, fonts, isDarkMode, isIPad, isRTL, width } from "../../theme";

import Icon from "react-native-vector-icons/Feather";
import globalstyle from "../../theme/style";

import { connect } from "react-redux";
import { SetIsLogin, SetLanguage, SetUserInfo } from "../../redux/reducers/AppStateReducer";
import { bindActionCreators } from "redux";
import { LoginApiCall } from "../../redux/reducers/AuthReducer";
import Loader from "../../components/Loader";
import { showToast } from "../../helpers/toastConfig";
import axios from "axios";

import strings, { changeLang } from "./../../localization/translation";
import SplashScreen from "react-native-splash-screen";
import RNRestart from 'react-native-restart';

const Login = (props) => {

    const [showPassword, setShowPassword] = useState(false);
    const [loading, isLoading] = useState(false);
    const { handleSubmit, formState: { errors }, register, setValue } = useForm();
    const prevLoginResponseRef = useRef(props.loginResponse);
    const prevLoginErrorRef = useRef(props.loginError);

    useEffect(() => {

        // if (!IOS) {
        //     axios.defaults.headers.common['Authorization'] = `Bearer 1656|35uwDzTjVDwexmX0Om94BtA9VPUKPHo2etdpGSUV`
        //     axios.request({ url: 'https://hunterssocial.com/api/user', method: 'GET' })
        //         .then(function (response) { console.log('response hunter => ', response); })
        //         .catch(function (error) { console.log(error); });
        // }
    }, [])

    useEffect(() => {
        // console.log('props.loginResponse => ', props.loginResponse);
        if (props.loginResponse !== prevLoginResponseRef.current && props.loginResponse?.success && props.loginResponse?.data) {
            prevLoginResponseRef.current = props.loginResponse;
            props.SetUserInfo(props.loginResponse?.data);
            console.log('props.loginResponse => ', props.loginResponse);
            // showToast();
            props.SetIsLogin(true);
            // props.navigation.navigate('Screens', { screen: 'Home' })
            // props.navigation.reset({ index: 0, routes: [{ name: 'Screens' }] })
        }

        if (props.loginResponse !== prevLoginResponseRef.current && !props.loginResponse?.success) {
            props.loginResponse?.message && showToast('error', props.loginResponse?.message?.replaceAll(' ', '-').toLowerCase() == 'user-not-found' ? 'Email or Password incorrect' : props.loginResponse?.message)
        }
        isLoading(false);
    }, [props.loginResponse])

    useEffect(() => {
        console.log('props.loginError => ', props.loginError);
        if (props.loginError && props.loginError !== prevLoginErrorRef.current && props.loginError?.message) {
            console.log('props.loginError => ', props.loginError);
            showToast('error', props.loginError?.message)
        }
        isLoading(false);
    }, [props.loginError])

    // const showToast = () => {
    //     Toast.show({
    //         type: 'success', // Can be 'success', 'error', 'info', or 'none'
    //         // text1: 'Success',
    //         text2: 'User logedin successfully..',
    //         position: 'top', // Can be 'top', 'bottom', or 'center'
    //         visibilityTime: 3000, // Duration to show the toast message (in milliseconds)
    //         autoHide: true, // Automatically hide the toast after the duration
    //         topOffset: 30, // Additional offset from the top/bottom (in pixels)
    //         // bottomOffset: 40,
    //     });
    // }

    const onSubmit = (data) => {
        console.log('onSubmit data => ', data)
        props.LoginApiCall(data);
        isLoading(true);
    }

    const input01 = useRef();
    const input02 = useRef();

    // useEffect(() => {
    //     changeLang(isRTL ? 'ar' : 'en')
    // }, [])

    return <SafeAreaView style={globalstyle.fullview}>
        <Loader isLoading={loading} />
        <ImageBackground
            style={[globalstyle.authContainer, { justifyContent: 'center', paddingHorizontal: 15 }]}
            source={backgroungImage}>
            <KeyboardAvoidingView behavior={IOS ? 'padding' : 'padding'} >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <TouchableOpacity onPress={() => {
                                props.SetLanguage('en')
                                changeLang('en')
                                I18nManager.allowRTL(true);
                                I18nManager.forceRTL(false);
                                setTimeout(() => {
                                    RNRestart.restart();
                                }, 300)
                                SplashScreen.show();
                            }}>
                                <Text style={{ fontFamily: props.language == 'en' ? fonts.primarySemiBold : fonts.primary, fontSize: 13, color: isDarkMode ? colors.white : colors.black }}>English</Text>
                            </TouchableOpacity>
                            <View style={{ width: 1, height: 10, backgroundColor: colors.black, marginHorizontal: 10 }} />
                            <TouchableOpacity onPress={() => {
                                props.SetLanguage('ar')
                                changeLang('ar')
                                I18nManager.allowRTL(true);
                                I18nManager.forceRTL(true);
                                setTimeout(() => {
                                    RNRestart.restart();
                                }, 300)
                                SplashScreen.show();
                            }}>
                                <Text style={{ fontFamily: props.language == 'ur' ? fonts.arabicBold : fonts.arabicMedium, color: isDarkMode ? colors.white : colors.black }}>عربي</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={isIPad && globalstyle.authscreencontainer}>
                            <View>
                                <Text style={globalstyle.authheading}>{strings.Login}</Text>
                                <Text style={globalstyle.authdescription}>{strings.LoginDesc}</Text>
                            </View>
                            <View>
                                <View style={globalstyle.inputbox}>
                                    <Icon color={colors.black} name={'mail'} size={18} />
                                    <TextInput
                                        style={globalstyle.inputfield}
                                        placeholder="Email Address"
                                        {...register('email', {
                                            value: 'johnmartin@mailinator.com', // johnmartin@mailinator.com
                                            required: 'Email Address is required',
                                            pattern: {
                                                value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                                                message: "Please provide valid email"
                                            },
                                        })}
                                        defaultValue={'johnmartin@mailinator.com'} // johnmartin@mailinator.com
                                        placeholderTextColor={colors.placeholdercolor}
                                        autoCapitalize='none'
                                        onChangeText={(value) => setValue('email', value)}
                                        ref={input01}
                                        returnKeyType="next"
                                        onSubmitEditing={() => input02.current.focus()}
                                    />
                                </View>
                                {errors.email && <Text style={globalstyle.errorField}>{errors.email.message}</Text>}
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => props.navigation.navigate('ForgetPassword')}
                                    style={styles.forgetpasslink}>
                                    <Text style={styles.forgetpasstext}>{strings.ForgetPassword}</Text>
                                </TouchableOpacity>
                                <View style={[globalstyle.inputbox, { justifyContent: 'space-between' }]}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Icon color={colors.black} name={'lock'} size={18} />
                                        <TextInput
                                            style={[globalstyle.inputfield, { flex: 0.8 }]}
                                            placeholder="Password"
                                            placeholderTextColor={colors.placeholdercolor}
                                            {...register('password', {
                                                value: '12345678', // 12345678
                                                required: 'Password is required',
                                                minLength: { value: 8, message: 'Password length must be greater then 8' }
                                            })}
                                            defaultValue={'12345678'} // 12345678
                                            // inputRef={password.ref}
                                            onChangeText={(value) => setValue('password', value)}
                                            secureTextEntry={!showPassword ? true : false}
                                            autoCapitalize='none'
                                            ref={input02}
                                        // returnKeyType="next"
                                        // onSubmitEditing={() => input05.current.focus()}
                                        />
                                    </View>
                                    <TouchableOpacity activeOpacity={0.8} style={globalstyle.showhideicontouch} onPress={() => { setShowPassword(!showPassword) }}>
                                        <Icon name={!showPassword ? 'eye' : 'eye-off'} size={18} style={globalstyle.showhideicon} />
                                    </TouchableOpacity>
                                </View>
                                {errors.password && <Text style={globalstyle.errorField}>{errors.password.message}</Text>}
                                <TouchableOpacity activeOpacity={0.8}
                                    onPress={handleSubmit(onSubmit)}
                                    style={globalstyle.authSubmitButton}>
                                    <Text style={globalstyle.authSubmitButtonText}>{strings.Login}</Text>
                                </TouchableOpacity>
                            </View>
                            {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 40, marginBottom: 10 }}>
                    <View style={{ width: '30%', height: 1, backgroundColor: '#000' }} />
                    <Text style={{ fontFamily: fonts.primary }}>Or Sign In With</Text>
                    <View style={{ width: '30%', height: 1, backgroundColor: '#000' }} />
                </View> */}
                            <View style={globalstyle.alreadysignin}>
                                <Text style={globalstyle.alreadyaccount}>{strings.DontHaveAccount} </Text>
                                <TouchableOpacity activeOpacity={0.8}
                                    onPress={() => { props.navigation.navigate('Register') }}>
                                    <Text style={globalstyle.actionauthtext}>{strings.SignUp}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ImageBackground>
    </SafeAreaView>
}

const setStateToProps = (state) => ({
    loginResponse: state.authstate.loginResponse,
    loginError: state.authstate.loginError,
    language: state.appstate.language,
});

const mapDispatchToProps = (dispatch) => {
    return {
        SetIsLogin: bindActionCreators(SetIsLogin, dispatch),
        SetUserInfo: bindActionCreators(SetUserInfo, dispatch),
        LoginApiCall: bindActionCreators(LoginApiCall, dispatch),
        SetLanguage: bindActionCreators(SetLanguage, dispatch),
    }
};

export default connect(setStateToProps, mapDispatchToProps)(Login);
// export default Login;


const styles = StyleSheet.create({
    forgetpasslink: { marginLeft: 'auto', marginTop: 10, marginBottom: 0, marginRight: 15 },
    forgetpasstext: { color: isDarkMode ? colors.white : colors.black, fontFamily: isRTL ? fonts.arabicMedium : fonts.primaryMedium, fontSize: 13 },
})