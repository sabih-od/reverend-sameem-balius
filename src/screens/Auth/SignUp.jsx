import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground } from "react-native";
// import { fonts } from "../../theme";
import { useForm } from 'react-hook-form';
import { colors, fonts } from "../../theme";

import Icon from "react-native-vector-icons/Feather";


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

    console.log('data => ', errors)
    const onSubmit = (data) => {
        console.log('data => ', data)
    }

    return <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground style={{ paddingVertical: 60, paddingHorizontal: 15, flex: 1, justifyContent: 'space-between', }} resizeMode="cover" source={require('./../../../assets/images/auth-bg.jpg')}>
            <ScrollView style={{ flex: 1, }}>
                <View>
                    <Text style={styles.authheading}>SignUp</Text>
                    <Text style={styles.authdescription}>Add Your Details to Signup</Text>
                </View>
                <View>
                    <View style={styles.inputbox}>
                        <Icon name={'user'} size={18} />
                        <TextInput
                            style={styles.inputfield}
                            placeholder="Full Name"
                            placeholderTextColor={colors.placeholdercolor}
                            {...register('fullname', {
                                // value: '',
                                required: 'Full name is required',
                                pattern: {
                                    value: /^[A-Za-z\s]+$/i,
                                    message: "Please provide a valid name"
                                },
                            })}
                        />
                    </View>
                    {errors.fullname && <Text style={styles.errorField}>{errors.fullname.message}</Text>}

                    <View style={styles.inputbox}>
                        <Icon name={'mail'} size={18} />
                        <TextInput
                            style={styles.inputfield}
                            placeholder="Email Address"
                            placeholderTextColor={colors.placeholdercolor}
                            {...register('email', {
                                // value: '',
                                required: 'Email Address is required',
                                pattern: {
                                    value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                                    message: "Please provide valid email"
                                },
                            })}
                            // defaultValue={''}
                            onChangeText={(value) => setValue('email', value)}
                            autoCapitalize='none'

                        />
                    </View>
                    {errors.email && <Text style={styles.errorField}>{errors.email.message}</Text>}

                    <View style={styles.inputbox}>
                        <Icon name={'phone'} size={18} />
                        <TextInput
                            style={styles.inputfield}
                            placeholder="Phone Number"
                            placeholderTextColor={colors.placeholdercolor}
                            // keyboardType='phone-pad'
                            keyboardType='numeric'
                            {...register('phone', {
                                // value: '',
                                required: 'Phone number is required',
                                pattern: {
                                    value: /[0-9+]$/i,
                                    message: "Please provide valid phone number"
                                },
                            })}
                        />
                    </View>
                    {errors.phone && <Text style={styles.errorField}>{errors.phone.message}</Text>}

                    <View style={[styles.inputbox, { justifyContent: 'space-between' }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name={'lock'} size={18} />
                            <TextInput
                                style={styles.inputfield}
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
                                secureTextEntry={true}
                                autoCapitalize='none'
                            />
                        </View>
                        <TouchableOpacity activeOpacity={0.8} style={{ padding: 10 }} onPress={() => { setShowPassword(!showPassword) }}><Icon name={!showPassword ? 'eye' : 'eye-off'} size={18} /></TouchableOpacity>
                    </View>
                    {errors.password && <Text style={styles.errorField}>{errors.password.message}</Text>}
                    <TouchableOpacity activeOpacity={0.8} onPress={handleSubmit(onSubmit)} style={styles.button}>
                        <Text style={styles.buttontext}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.alreadysignin}><Text style={{ fontFamily: fonts.primary, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>Already have an account? <TouchableOpacity activeOpacity={0.8} style={{ marginBottom: -3 }} onPress={() => { props.navigation.navigate('Login') }}><Text style={{ color: '#f00', fontFamily: fonts.primary }}>Login</Text></TouchableOpacity></Text></View>
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
    inputbox: { backgroundColor: '#fff', marginBottom: 5, borderRadius: 50, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginTop: 15 },
    inputfield: { paddingHorizontal: 15, paddingVertical: 15, fontFamily: fonts.primary, width: '100%' },
    alreadysignin: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20, },
    errorField: { color: '#f00', fontFamily: fonts.primary, fontSize: 12, marginTop: 4, marginLeft: 15 },
})