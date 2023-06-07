import React, { useState, useRef } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground } from "react-native";
// import { fonts } from "../../theme";
import { useForm } from 'react-hook-form';
import { colorScheme, colors, fonts, invertcolor } from "../../theme";

import Icon from "react-native-vector-icons/Feather";
import globalstyle from "../../theme/style";


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
        props.navigation.navigate('Login');
    }

    const input01 = useRef();
    const input02 = useRef();
    const input03 = useRef();
    const input04 = useRef();
    const input05 = useRef();

    return <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground style={globalstyle.authbgimage} resizeMode="cover" source={colorScheme == 'dark' ? require('./../../../assets/images/home-bg.jpg') : require('./../../../assets/images/auth-bg.jpg')}>
            <ScrollView style={{ flex: 1, }}>
                <View>
                    <Text style={globalstyle.authheading}>SignUp</Text>
                    <Text style={globalstyle.authdescription}>Add Your Details to Signup</Text>
                </View>
                <View>
                    <View style={globalstyle.inputbox}>
                        <Icon style={globalstyle.authlefticon} name={'user'} size={18} />
                        <TextInput
                            style={globalstyle.inputfield}
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
                            onChangeText={(value) => setValue('fullname', value)}
                            ref={input01}
                            returnKeyType="next"
                            onSubmitEditing={() => input02.current.focus()}
                        />
                    </View>
                    {errors.fullname && <Text style={globalstyle.errorField}>{errors.fullname.message}</Text>}

                    <View style={globalstyle.inputbox}>
                        <Icon style={globalstyle.authlefticon} name={'mail'} size={18} />
                        <TextInput
                            style={globalstyle.inputfield}
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
                            ref={input02}
                            returnKeyType="next"
                            onSubmitEditing={() => input03.current.focus()}
                        />
                    </View>
                    {errors.email && <Text style={globalstyle.errorField}>{errors.email.message}</Text>}

                    <View style={globalstyle.inputbox}>
                        <Icon style={globalstyle.authlefticon} name={'phone'} size={18} />
                        <TextInput
                            style={globalstyle.inputfield}
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
                            onChangeText={(value) => setValue('phone', value)}
                            ref={input03}
                            returnKeyType="next"
                            onSubmitEditing={() => input04.current.focus()}
                        />
                    </View>
                    {errors.phone && <Text style={globalstyle.errorField}>{errors.phone.message}</Text>}

                    <View style={[globalstyle.inputbox, { justifyContent: 'space-between' }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon style={globalstyle.authlefticon} name={'lock'} size={18} />
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
                                ref={input04}
                                // returnKeyType="next"
                                // onSubmitEditing={() => input05.current.focus()}
                            />
                        </View>
                        <TouchableOpacity activeOpacity={0.8} style={globalstyle.showhideicontouch} onPress={() => { setShowPassword(!showPassword) }}>
                            <Icon name={!showPassword ? 'eye' : 'eye-off'} size={18} style={globalstyle.showhideicon} />
                        </TouchableOpacity>
                    </View>
                    {errors.password && <Text style={globalstyle.errorField}>{errors.password.message}</Text>}
                    <TouchableOpacity activeOpacity={0.8} onPress={handleSubmit(onSubmit)}
                        style={globalstyle.authbutton}>
                        <Text style={globalstyle.authbuttontext}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

                <View style={globalstyle.alreadysignin}>
                    <Text style={globalstyle.alreadyaccount}>Already have an account? </Text>
                    <TouchableOpacity activeOpacity={0.8}
                        onPress={() => { props.navigation.navigate('Login') }}>
                        <Text style={globalstyle.actionauthtext}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={{paddingBottom: 30}} />
            </ScrollView>
        </ImageBackground>
    </SafeAreaView>
}

export default SignUp;

const styles = StyleSheet.create({

})