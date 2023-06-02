import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground } from "react-native";
// import { fonts } from "../../theme";
import { useForm } from 'react-hook-form';
import { fonts } from "../../theme";

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

    const onSubmit = (data) => {
        // console.log('data => ', data)
        props.navigation.navigate('Signup')
    }

    return <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ paddingVertical: 60, paddingHorizontal: 15, flex: 1, backgroundColor: '#ddd' }}>
        {/* <ImageBackground style={{ paddingVertical: 60, paddingHorizontal: 15, flex: 1, justifyContent: 'space-between', }} resizeMode="cover" source={{ uri: 'https://img.freepik.com/free-vector/blue-fluid-background-frame_53876-99019.jpg' }}> */}
            {/* <View style={{ backgroundColor: '#ddd'}}> */}
            <View>
                <Text style={styles.authheading}>Login</Text>
                <Text style={styles.authdescription}>Add Your Details to Login</Text>
            </View>

            <View>
                <View style={styles.inputbox}>
                    <Icon name={'mail'} size={15} />
                    <TextInput
                        style={styles.inputfield}
                        placeholder="Email Address"
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
                    />
                </View>
                <TouchableOpacity style={{marginLeft: 'auto', marginBottom: 20}}><Text style={{ color: '#f00', fontFamily: fonts.primary, fontSize: 13 }}>Forget Password?</Text></TouchableOpacity>
                <View style={[styles.inputbox, { justifyContent: 'space-between' }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name={'lock'} size={15} />
                        <TextInput
                            style={styles.inputfield}
                            placeholder="Password"
                            {...register('password', {
                                value: '',
                                required: 'Password is required',
                                minLength: { value: 8, message: 'Min lenght 8' }
                            })}
                            // defaultValue={'tabish@123'}
                            // inputRef={password.ref}
                            onChangeText={(value) => setValue('password', value)}
                            secureTextEntry={true}
                        />
                    </View>
                    <TouchableOpacity style={{ padding: 10 }} onPress={() => { setShowPassword(!showPassword) }}><Icon name={!showPassword ? 'eye' : 'eye-off'} size={15} /></TouchableOpacity>
                </View>
                <TouchableOpacity 
                onPress={() => {props.navigation.navigate('Home')}}
                // onPress={handleSubmit(onSubmit)} 
                style={styles.button}>
                    <Text style={styles.buttontext}>Login</Text>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 40, marginBottom: 10}}>
                <View style={{width: '30%', height: 1, backgroundColor: '#000'}} />
                <Text style={{fontFamily:fonts.primary}}>Or Sign In With</Text>
                <View style={{width: '30%', height: 1, backgroundColor: '#000'}} />
            </View>
            <View style={styles.alreadysignin}><Text style={{ fontFamily: fonts.primary, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>Don't have an account? <TouchableOpacity style={{ marginBottom: -3 }} onPress={() => { props.navigation.navigate('SignUp') }}><Text style={{ color: '#f00', fontFamily: fonts.primary }}>Sign Up</Text></TouchableOpacity></Text></View>
            {/* </View> */}
        {/* </ImageBackground> */}
        </ScrollView>
    </SafeAreaView>
}

export default SignUp;

const styles = StyleSheet.create({
    button: { backgroundColor: '#111', borderRadius: 30, paddingVertical: 10 },
    buttontext: { textTransform: 'uppercase', fontSize: 20, fontFamily: fonts.primaryMedium, textAlign: 'center', color: '#fff' },
    authheading: { textTransform: 'uppercase', fontFamily: fonts.primarySemiBold, fontSize: 30, marginBottom: 5, textAlign: 'center' },
    authdescription: { fontFamily: fonts.primary, marginBottom: 30, textAlign: 'center', color: '#333' },
    inputbox: { backgroundColor: '#fff', marginBottom: 20, borderRadius: 50, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 },
    inputfield: { paddingHorizontal: 15, paddingVertical: 15, fontFamily: fonts.primary },
    alreadysignin: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20, }
})