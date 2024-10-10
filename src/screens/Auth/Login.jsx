import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  I18nManager,
  StatusBar,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {useForm} from 'react-hook-form';
import {
  IOS,
  backgroungImage,
  colorScheme,
  colors,
  fontSize,
  fonts,
  isDarkMode,
  isIPad,
  isRTL,
  width,
} from '../../theme';
import Icon from 'react-native-vector-icons/Feather';
import globalstyle from '../../theme/style';
import {connect} from 'react-redux';
import {
  SetIsLogin,
  SetLanguage,
  SetUserInfo,
} from '../../redux/reducers/AppStateReducer';
import {bindActionCreators} from 'redux';
import {LoginApiCall} from '../../redux/reducers/AuthReducer';
import Loader from '../../components/Loader';
import {showToast} from '../../helpers/toastConfig';
import axios from 'axios';
import strings, {changeLang} from './../../localization/translation';
import SplashScreen from 'react-native-splash-screen';
import RNRestart from 'react-native-restart';

const Login = props => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, isLoading] = useState(false);
  const {
    handleSubmit,
    formState: {errors},
    register,
    setValue,
  } = useForm();
  const prevLoginResponseRef = useRef(props.loginResponse);
  const prevLoginErrorRef = useRef(props.loginError);
  const [fcm_token, setFcm_token] = useState('');

  useEffect(() => {
    const requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        const token = await messaging().getToken();
        setFcm_token(token);
      } else {
        console.log('Authorization status:', authStatus);
      }
    };

    requestUserPermission();

    const unsubscribe = messaging().onTokenRefresh(token => {
      setFcm_token(token);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (
      props.loginResponse !== prevLoginResponseRef.current &&
      props.loginResponse?.success &&
      props.loginResponse?.data
    ) {
      prevLoginResponseRef.current = props.loginResponse;
      props.SetUserInfo(props.loginResponse?.data);
      props.SetIsLogin(true);
    }

    if (
      props.loginResponse !== prevLoginResponseRef.current &&
      !props.loginResponse?.success
    ) {
      props.loginResponse?.message &&
        showToast(
          'error',
          props.loginResponse?.message?.replaceAll(' ', '-').toLowerCase() ==
            'user-not-found'
            ? 'Email or Password incorrect'
            : props.loginResponse?.message,
        );
    }
    isLoading(false);
  }, [props.loginResponse]);

  useEffect(() => {
    if (
      props.loginError &&
      props.loginError !== prevLoginErrorRef.current &&
      props.loginError?.message
    ) {
      showToast('error', props.loginError?.message);
    }
    isLoading(false);
  }, [props.loginError]);

  const onSubmit = data => {
    const requestData = {...data, fcm_token};
    props.LoginApiCall(requestData);
    isLoading(true);
  };

  const input01 = useRef();
  const input02 = useRef();

  return (
    <SafeAreaView style={globalstyle.fullview}>
      <Loader isLoading={loading} />
      <ImageBackground
        style={[
          globalstyle.authContainer,
          {justifyContent: 'center', paddingHorizontal: 15},
        ]}
        // source={require('./../../../assets/images/bgAuth.png')}
      >
        <KeyboardAvoidingView behavior={IOS ? 'padding' : 'padding'}>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}>
            <View style={{}}>
              {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <TouchableOpacity onPress={() => {
                                props.SetLanguage('en')
                                changeLang('en')
                                I18nManager.allowRTL(true);
                                I18nManager.forceRTL(false);
                                setTimeout(() => {
                                    RNRestart.restart();
                                }, 500)
                                SplashScreen.show();
                            }}>
                                <Text style={{ fontFamily: !isRTL ? fonts.primarySemiBold : fonts.primary, fontSize: 13, color: isDarkMode ? colors.black : colors.black }}>English</Text>
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
                                <Text style={{ fontFamily: isRTL ? fonts.arabicBold : fonts.arabicMedium, color: isDarkMode ? colors.black : colors.black }}>عربي</Text>
                            </TouchableOpacity>
                        </View> */}
              <View style={isIPad && globalstyle.authscreencontainer}>
                <View>
                  <Text
                    style={[
                      globalstyle.authheading,
                      {color: '#ffffff', marginBottom: 12},
                    ]}>
                    {strings.Login}
                  </Text>
                  <Text
                    style={[
                      globalstyle.authdescription,
                      {color: '#8B9094', fontSize: 14, marginBottom: 20},
                    ]}>
                    {strings.LoginDesc}
                  </Text>
                </View>
                <View style={{marginBottom: 45}}>
                  <Image
                    source={require('./../../../assets/images/borderimg.png')} // Path to your local image
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      margin: 'auto',
                      alignItems: 'center',
                      width: 'auto',
                    }}
                  />
                </View>
                <View>
                  <Text style={{color: '#fff', fontSize: 12}}>Email*</Text>
                  <View style={[globalstyle.inputbox, {marginBottom: 45}]}>
                    {/* <Icon color={colors.drawerbg} name={'mail'} size={18} /> */}
                    <TextInput
                      style={[globalstyle.inputfield, {color: '#fff'}]}
                      placeholder={strings.email}
                      {...register('email', {
                        value: '',
                        required: 'Email Address is required',
                        pattern: {
                          value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                          message: 'Please provide valid email',
                        },
                      })}
                      defaultValue={''}
                      placeholderTextColor={colors.placeholdercolor}
                      autoCapitalize="none"
                      onChangeText={value => setValue('email', value)}
                      ref={input01}
                      returnKeyType="next"
                      onSubmitEditing={() => input02.current.focus()}
                    />
                  </View>
                  {errors.email && (
                    <Text style={globalstyle.errorField}>
                      {errors.email.message}
                    </Text>
                  )}
                  <Text style={{color: '#fff', fontSize: 12}}>Password*</Text>
                  <View
                    style={[
                      globalstyle.inputbox,
                      {justifyContent: 'space-between', marginBottom: 15},
                    ]}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      {/* <Icon color={colors.drawerbg} name={'lock'} size={18} /> */}
                      <TextInput
                        style={[
                          globalstyle.inputfield,
                          {flex: 0.8, color: '#fff'},
                        ]}
                        placeholder={strings.password}
                        placeholderTextColor={colors.placeholdercolor}
                        {...register('password', {
                          value: '',
                          required: 'Password is required',
                          minLength: {
                            value: 8,
                            message: 'Password length must be greater then 8',
                          },
                        })}
                        defaultValue={''}
                        onChangeText={value => setValue('password', value)}
                        secureTextEntry={!showPassword ? true : false}
                        autoCapitalize="none"
                        ref={input02}
                      />
                    </View>

                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={globalstyle.showhideicontouch}
                      onPress={() => {
                        setShowPassword(!showPassword);
                      }}>
                      <Icon
                        name={!showPassword ? 'eye' : 'eye-off'}
                        size={18}
                        style={globalstyle.showhideicon}
                      />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => props.navigation.navigate('ForgetPassword')}
                    style={styles.forgetpasslink}>
                    <Text style={styles.forgetpasstext}>
                      {strings.ForgetPassword}
                    </Text>
                  </TouchableOpacity>
                  {errors.password && (
                    <Text style={globalstyle.errorField}>
                      {errors.password.message}
                    </Text>
                  )}
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handleSubmit(onSubmit)}
                    style={globalstyle.authSubmitButton}>
                    <Text style={globalstyle.authSubmitButtonText}>
                      {strings.Login}
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: 40,
                    }}>
                    <View>
                      <Text
                        style={{
                          backgroundColor: 'white',
                          width: 110,
                          height: 1,
                        }}></Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          color: '#818282',
                          textAlign: 'center',
                          fontSize: 14,
                          fontWeight: 400,
                        }}>
                        Or Login with
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          backgroundColor: 'white',
                          width: 110,
                          height: 1,
                          margin: 'auto',
                        }}></Text>
                    </View>
                  </View>

                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 50,
                    }}>
                    <Text
                      style={{color: 'white', fontSize: 20, fontWeight: 500}}>
                      Don't have an account?
                      <TouchableOpacity
                        onPress={() => {
                          props.navigation.navigate('Register');
                        }}>
                        <Text
                          style={{
                            textDecorationLine: 'underline',
                            color: 'white',
                            fontSize: 20,
                            fontWeight: 500,
                          }}>
                          {' '}
                          Register Now
                        </Text>
                      </TouchableOpacity>
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const setStateToProps = state => ({
  loginResponse: state.authstate.loginResponse,
  loginError: state.authstate.loginError,
  language: state.appstate.language,
});

const mapDispatchToProps = dispatch => {
  return {
    SetIsLogin: bindActionCreators(SetIsLogin, dispatch),
    SetUserInfo: bindActionCreators(SetUserInfo, dispatch),
    LoginApiCall: bindActionCreators(LoginApiCall, dispatch),
    SetLanguage: bindActionCreators(SetLanguage, dispatch),
  };
};

export default connect(setStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  forgetpasslink: {
    marginLeft: 'auto',
    marginTop: 10,
    marginBottom: 0,
    marginRight: 15,
  },
  forgetpasstext: {
    color: isDarkMode ? colors.white : colors.black,
    fontFamily: isRTL ? fonts.arabicMedium : fonts.primaryMedium,
    fontSize: fontSize - 1,
    textDecorationLine: 'underline',
    marginBottom: 30,
  },
});
