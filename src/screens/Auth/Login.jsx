import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground } from "react-native";
// import { fonts } from "../../theme";
import { useForm } from 'react-hook-form';
import { colors, fonts } from "../../theme";

import Icon from "react-native-vector-icons/Feather";
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
        props.navigation.navigate('Home')
    }

    return <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground style={{ paddingVertical: 60, paddingHorizontal: 15, flex: 1, justifyContent: 'space-between', }} resizeMode="cover" source={require('./../../../assets/images/auth-bg.jpg')}>
            <ScrollView style={{ flex: 1, }}>
                <View>
                    <Text style={styles.authheading}>Login</Text>
                    <Text style={styles.authdescription}>Add Your Details to Login</Text>
                </View>

                <View>
                    <View style={styles.inputbox}>
                        <Icon name={'mail'} size={18} />
                        <TextInput
                            style={styles.inputfield}
                            placeholder="Email Address"
                            {...register('email', {
                                // value: 'asdas',
                                required: 'Email Address is required',
                                pattern: {
                                    value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                                    message: "Please provide valid email"
                                },
                            })}
                            // defaultValue={''}
                            placeholderTextColor={colors.placeholdercolor}
                            autoCapitalize='none'
                            onChangeText={(value) => setValue('email', value)}
                        />
                    </View>
                    {errors.email && <Text style={styles.errorField}>{errors.email.message}</Text>}
                    <TouchableOpacity activeOpacity={0.8} style={styles.forgetpasslink}>
                        <Text style={styles.forgetpasstext}>Forget Password?</Text>
                    </TouchableOpacity>
                    <View style={[styles.inputbox, { justifyContent: 'space-between' }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name={'lock'} size={18} />
                            <TextInput
                                style={styles.inputfield}
                                placeholder="Password"
                                {...register('password', {
                                    value: '',
                                    required: 'Password is required',
                                    minLength: { value: 8, message: 'Password length must be greater then 8' }
                                })}
                                // defaultValue={'tabish@123'}
                                // inputRef={password.ref}
                                placeholderTextColor={colors.placeholdercolor}
                                autoCapitalize='none'
                                onChangeText={(value) => setValue('password', value)}
                                secureTextEntry={true}
                            />
                        </View>
                        <TouchableOpacity activeOpacity={0.8} style={{ padding: 10, zIndex: 1, position: 'absolute', right: 10, }} onPress={() => { setShowPassword(!showPassword) }}>
                            <Icon name={!showPassword ? 'eye' : 'eye-off'} size={18} color={'#333'} />
                        </TouchableOpacity>
                    </View>
                    {errors.password && <Text style={styles.errorField}>{errors.password.message}</Text>}
                    <TouchableOpacity activeOpacity={0.8}
                        onPress={handleSubmit(onSubmit)}
                        style={styles.button}>
                        <Text style={styles.buttontext}>Login</Text>
                    </TouchableOpacity>
                </View>
                {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 40, marginBottom: 10 }}>
                    <View style={{ width: '30%', height: 1, backgroundColor: '#000' }} />
                    <Text style={{ fontFamily: fonts.primary }}>Or Sign In With</Text>
                    <View style={{ width: '30%', height: 1, backgroundColor: '#000' }} />
                </View> */}
                <View style={styles.alreadysignin}><Text style={{ fontFamily: fonts.primary, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>Don't have an account? <TouchableOpacity activeOpacity={0.8} style={{ marginBottom: -3 }} onPress={() => { props.navigation.navigate('SignUp') }}><Text style={{ color: '#f00', fontFamily: fonts.primary }}>Sign Up</Text></TouchableOpacity></Text></View>
            </ScrollView>
        </ImageBackground>
    </SafeAreaView>
}

export default SignUp;

const styles = StyleSheet.create({
    button: { backgroundColor: colors.orange, borderRadius: 30, paddingVertical: 11, marginTop: 20 },
    buttontext: { textTransform: 'uppercase', fontSize: 18, fontFamily: fonts.primarySemiBold, textAlign: 'center', color: '#fff' },
    authheading: { textTransform: 'uppercase', fontFamily: fonts.primaryBold, fontSize: 32, marginBottom: 5, textAlign: 'center' },
    authdescription: { fontFamily: fonts.primary, marginBottom: 60, textAlign: 'center', color: '#333' },
    inputbox: { backgroundColor: '#fff', marginBottom: 5, borderRadius: 50, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 },
    inputfield: { paddingHorizontal: 15, paddingVertical: 15, fontFamily: fonts.primary, width: '100%' },
    alreadysignin: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20, },
    forgetpasslink: { marginLeft: 'auto', marginTop: 20, marginBottom: 5, marginRight: 15 },
    forgetpasstext: { color: '#f00', fontFamily: fonts.primary, fontSize: 13 },
    errorField: { color: '#f00', fontFamily: fonts.primary, fontSize: 12, marginTop: 4, marginLeft: 15 },
})