import React, { useCallback, useEffect, useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';


import { colors, fonts } from '../theme';
import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// import auth from '@react-native-firebase/auth';
// import database from '@react-native-firebase/database';
import { DrawerContentScrollView, useDrawerProgress } from '@react-navigation/drawer';
// import Animated, { interpolateNode } from 'react-native-reanimated';

// import { fcmService } from "./../helpers/firebase/FCMService";
// import { localNotificationService } from "./../helpers/firebase/LocalNotificationService";
// import messaging from '@react-native-firebase/messaging';


// import { io } from 'socket.io-client';
// const websocketurl = 'ws://10.10.8.113:8029';
// const websocketurl = 'ws://192.168.2.112:8029';
// const socket = io(websocketurl);

function logout() {
    //   auth().signOut().then(() => console.log('User signed out!'));
}


const DrawerContent = (props) => {

    const [user, setUser] = useState({ id: 'dfa12h1j2gjg1', profilepic: require('./../../assets/images/profile-image.jpeg'), name: 'John Martin', email: 'john.martin@mailinator.com' });

    return (
        <DrawerContentScrollView {...props} style={[styles.sidebar,]}>
            <View style={{ backgroundColor: colors.darkblue, paddingBottom: 20, paddingTop: 30, }}>
                <TouchableOpacity onPress={() => { props.navigation.closeDrawer() }} activeOpacity={0.7} style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#000', width: 35, height: 35, borderRadius: 40, position: 'absolute', left: 10 }}>
                    <Icon name={'x'} color={'#fff'} size={16} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} 
                // onPress={() => { props.navigation.navigate('Profile') }} 
                style={{
                    width: 90, height: 90, borderRadius: 90, overflow: 'hidden', marginLeft: 'auto', marginRight: 'auto', marginBottom: 10,
                    // borderColor: '#fff', borderWidth: 1, 
                }}>
                    <Image source={user?.profilepic} style={{ width: 90, height: 90, resizeMode: 'cover', }} />
                </TouchableOpacity>
                <Text style={{ fontFamily: fonts.primaryMedium, color: '#fff', textAlign: 'center', fontSize: 18 }}>{user?.name}</Text>
                <Text style={{ fontFamily: fonts.primary, color: '#fff', textAlign: 'center', fontSize: 12 }}>{user?.email}</Text>
                <Text style={{ fontFamily: fonts.primary, color: '#fff', textAlign: 'center', fontSize: 12 }}>{user?.phone}</Text>
            </View>
            <View>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => { props.navigation.navigate('Home') }}
                    style={{ flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: '#ffffff09' }}>
                    <Icon name="home" style={{ color: '#fff', marginRight: 15 }} size={16} />
                    <Text style={{ fontFamily: fonts.primary, color: '#fff' }}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => { console.log('Logout') }}
                    style={{ flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: '#ffffff09' }}>
                    <Icon name="log-out" style={{ color: '#fff', marginRight: 15 }} size={16} />
                    <Text style={{ fontFamily: fonts.primary, color: '#fff' }}>Logout</Text>
                </TouchableOpacity>

            </View>
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    sidebar: { backgroundColor: colors.darkblue, flex: 1 },
})

export default DrawerContent;