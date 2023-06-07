import React, { useRef, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground } from "react-native";
// import { fonts } from "../../theme";
import { useForm } from 'react-hook-form';
import { colorScheme, colors, fontcolor, fonts, invertcolor } from "../../theme";

import Icon from "react-native-vector-icons/Feather";
import globalstyle from "../../theme/style";
// import Icon from 'react-native-vector-icons/Ionicons';


const SignUp = (props) => {

    const [showPassword, setShowPassword] = useState(false);
    const { handleSubmit, formState: { errors }, register, setValue } = useForm();

    // const password = register('password', {
    //     value: 'tabish@123',
    //     required: 'Password is required',
    //     minLength: { value: 8, message: 'Min lenght 8' }
    // })

    // const confirmpass = register('confirmpass', {
    //     value: 'tabish@123',
    //     required: 'Confirm Password is required',
    //     minLength: { value: 8, message: 'Min lenght 8' },
    //     // validate: value => value === password.current || "Password does not match"
    // });

    console.log(errors);

    const onSubmit = (data) => {
        console.log('data => ', data);
        props.navigation.navigate('Screens')
    }

    const input01 = useRef();
    const input02 = useRef();

    return <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground style={globalstyle.authbgimage} resizeMode="cover" source={colorScheme == 'dark' ? require('./../../../assets/images/home-bg.jpg') : require('./../../../assets/images/auth-bg.jpg')}>
            <ScrollView style={{ flex: 1, }}>
                <View>
                    <Text style={globalstyle.authheading}>Login</Text>
                    <Text style={globalstyle.authdescription}>Add Your Details to Login</Text>
                </View>
                <View>
                    <View style={globalstyle.inputbox}>
                        <Icon color={colors.black} name={'mail'} size={18} />
                        <TextInput
                            style={globalstyle.inputfield}
                            placeholder="Email Address"
                            {...register('email', {
                                // value: 'asdas',
                                required: 'Email Address is required',
                                pattern: {
                                    value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                                    message: "Please provide valid email"
                                },
                            })}
                            // defaultValue={'john.cena@mailinator.com'}
                            placeholderTextColor={colors.placeholdercolor}
                            autoCapitalize='none'
                            onChangeText={(value) => setValue('email', value)}
                            ref={input01}
                            returnKeyType="next"
                            onSubmitEditing={() => input02.current.focus()}
                        />
                    </View>
                    {errors.email && <Text style={globalstyle.errorField}>{errors.email.message}</Text>}
                    <TouchableOpacity activeOpacity={0.8} style={styles.forgetpasslink}>
                        <Text style={styles.forgetpasstext}>Forget Password?</Text>
                    </TouchableOpacity>
                    <View style={[globalstyle.inputbox, { justifyContent: 'space-between' }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon color={colors.black} name={'lock'} size={18} />
                            <TextInput
                                style={[globalstyle.inputfield, { flex: 0.8 }]}
                                placeholder="Password"
                                placeholderTextColor={colors.placeholdercolor}
                                {...register('password', {
                                    value: '',
                                    required: 'Password is required',
                                    minLength: { value: 8, message: 'Password length must be greater then 8' }
                                })}
                                // defaultValue={'tabish@123'}
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
                        style={globalstyle.authbutton}>
                        <Text style={globalstyle.authbuttontext}>Login</Text>
                    </TouchableOpacity>
                </View>
                {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 40, marginBottom: 10 }}>
                    <View style={{ width: '30%', height: 1, backgroundColor: '#000' }} />
                    <Text style={{ fontFamily: fonts.primary }}>Or Sign In With</Text>
                    <View style={{ width: '30%', height: 1, backgroundColor: '#000' }} />
                </View> */}
                <View style={globalstyle.alreadysignin}>
                    <Text style={globalstyle.alreadyaccount}>Don't have an account? </Text>
                    <TouchableOpacity activeOpacity={0.8} 
                        onPress={() => { props.navigation.navigate('SignUp') }}>
                            <Text style={globalstyle.actionauthtext}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
            </ScrollView>
        </ImageBackground>
    </SafeAreaView>
}

export default SignUp;

const styles = StyleSheet.create({
    // button: { backgroundColor: colors.orange, borderRadius: 30, paddingVertical: 11, marginTop: 20 },
    // buttontext: { textTransform: 'uppercase', fontSize: 18, fontFamily: fonts.primarySemiBold, textAlign: 'center', color: '#fff' },
    // authheading: { textTransform: 'uppercase', fontFamily: fonts.primaryBold, fontSize: 32, marginBottom: 5, textAlign: 'center', color: fontcolor },
    // authdescription: { fontFamily: fonts.primary, marginBottom: 60, textAlign: 'center', color: fontcolor },
    // inputbox: { backgroundColor: '#fff', marginBottom: 5, borderRadius: 50, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 },
    // inputfield: { paddingHorizontal: 15, paddingVertical: 15, fontFamily: fonts.primary, width: '100%', color: colors.black },
    // alreadysignin: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20, },
    forgetpasslink: { marginLeft: 'auto', marginTop: 10, marginBottom: 0, marginRight: 15 },
    forgetpasstext: { color: '#f00', fontFamily: fonts.primary, fontSize: 13 },
    // errorField: { color: '#f00', fontFamily: fonts.primary, fontSize: 12, marginTop: 4, marginLeft: 15 },
})