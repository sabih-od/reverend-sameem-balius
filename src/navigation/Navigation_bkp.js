import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity } from "react-native";


import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, useDrawerProgress, useDrawerStatus } from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/Feather';
import { TextInput } from "react-native-gesture-handler";
import { colors, fontcolor, fonts, width } from "../theme";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

import DrawerContent from './Drawer';

// Screens
import Login from "../screens/Auth/Login";
import SignUp from "../screens/Auth/Register";
import HomScreen from "../screens/Home";
import NotificationScreen from "../screens/Notifications";
import PrayListScreen from "../screens/PrayList";
import GoalListScreen from "../screens/GoalsList";
import SearchHeader from "../components/SearchHeader";
import StartFreeWeekScreen from "../screens/FreeWeek";



const NotificationIcon = (props) => {
    return (
        <TouchableOpacity activeOpacity={0.8} style={{ backgroundColor: colors.orange, width: 36, height: 36, marginRight: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 40, overflow: 'hidden', }}>
            <Icon name={'bell'} size={18} color={colors.white} />
        </TouchableOpacity>
    )
}

const DrawerIcon = (props) => {
    return (<TouchableOpacity activeOpacity={0.8}
        onPress={() => {
            // console.log('props DrawerIcon => ', props.navigation);
            props.navigation.openDrawer() 
        }}
        style={[{ padding: 10, paddingHorizontal: 15, borderRadius: 40, overflow: 'hidden', marginRight: 15 }]} >
        <Icon name={'align-right'} size={22} color={fontcolor} />
    </TouchableOpacity >)
}

function GoBackIcon(props) {
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => props.navigation.goBack()} style={[{ width: 40, height: 40, marginTop: 30, alignItems: 'center', justifyContent: 'center' }]}>
            <Icon name={'chevron-left'} size={22} color={fontcolor} />
        </TouchableOpacity>
    )
}

const StackScreen = ({ navigation, style }) => {

    // const drawerProgress = useDrawerProgress();
    // const animatedStyle = useAnimatedStyle(() => {
    //     const scale = interpolate(drawerProgress.value, [0, 1], [1, 0.8], {
    //         extrapolateRight: Extrapolate.CLAMP,
    //     });
    //     const borderRadius = interpolate(drawerProgress.value, [0, 1], [0, 15], {
    //         extrapolateRight: Extrapolate.CLAMP,
    //     });
    //     return {
    //         overflow: 'hidden',
    //         transform: [{ scale }],
    //         borderRadius,
    //     };
    // });

    return <Stack.Navigator>
        <Stack.Screen
            name="Home"
            component={HomScreen}
            options={{
                headerTransparent: true,
                headerStyle: { height: 70 },
                headerTitleAlign: 'center',
                headerTitle: () => <SearchHeader />,
                headerLeft: () => <DrawerIcon navigation={navigation} />,
                headerRight: () => <NotificationIcon />
            }}
        />
        <Stack.Screen
            name="Notification"
            component={NotificationScreen}
            options={{
                headerTransparent: true,
                headerStyle: { height: 120 },
                headerTitleAlign: 'center',
                headerTitle: '',
                headerLeft: () => <DrawerIcon navigation={navigation} />,
                headerRight: () => <NotificationIcon />
            }}
        />
        <Stack.Screen
            name="PrayList"
            component={PrayListScreen}
            options={{
                headerTransparent: true,
                // headerStyle: { height: 120 },
                // headerTitleAlign: 'center',
                headerTitle: '',
                headerLeft: () => <GoBackIcon navigation={navigation} />,
                // headerLeft: () => <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.goBack()} style={{width: 40, height: 40,  alignItems: 'center', justifyContent: 'center'}}><Icon name='chevron-left' color={colors.white} size={20} /></TouchableOpacity>,
                // headerRight: () => <NotificationIcon />
            }}
        // options={{ headerShown: false }}
        />
        <Stack.Screen
            name="GoalList"
            component={GoalListScreen}
            options={{
                headerTransparent: true,
                // headerStyle: { height: 120 },
                // headerTitleAlign: 'center',
                headerTitle: '',
                headerLeft: () => <GoBackIcon navigation={navigation} color={colors.black} />,
                // headerLeft: () => <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.goBack()} style={{width: 40, height: 40,  alignItems: 'center', justifyContent: 'center'}}><Icon name='chevron-left' color={colors.white} size={20} /></TouchableOpacity>,
                // headerRight: () => <NotificationIcon />
            }}
        // options={{ headerShown: false }}
        />
        <Stack.Screen
            name="StartFreeWeek"
            component={StartFreeWeekScreen}
            options={{
                headerTransparent: true,
                // headerStyle: { height: 120 },
                // headerTitleAlign: 'center',
                headerTitle: '',
                headerLeft: () => <GoBackIcon navigation={navigation} color={colors.black} />,
                // headerLeft: () => <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.goBack()} style={{width: 40, height: 40,  alignItems: 'center', justifyContent: 'center'}}><Icon name='chevron-left' color={colors.white} size={20} /></TouchableOpacity>,
                // headerRight: () => <NotificationIcon />
            }}
        // options={{ headerShown: false }}
        />


    </Stack.Navigator>
}

function DrawerScreen() {

    let initialRouteName = false ? 'Screens' : 'Login';

    return (
        <Drawer.Navigator
            // id="LeftDrawer"
            initialRouteName={initialRouteName}
            drawerContent={props => {
                return <DrawerContent {...props} />;
            }}
            screenOptions={{
                // drawerStyle: styles.drawerStyles,
                drawerType: "slide",
                // drawerHideStatusBarOnOpen: true,
                // drawerStatusBarAnimation: 'fade',
                // drawerLockMode: 'locked-closed',
                // drawerType: dimensions.width >= 768 ? 'permanent' : 'front',
                drawerPosition: "left",
                overlayColor: "transparent",
                keyboardDismissMode: "on-drag",
                // sceneContainerStyle: { backgroundColor: 'transparent' },
                sceneContainerStyle: { backgroundColor: colors.deepblue },
            }}
        >
            <Drawer.Screen
                name="Screens"
                options={{ headerShown: false }}
            >
                {props => <StackScreen {...props} //style={animatedStyle}
                />}
            </Drawer.Screen>
            <Drawer.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            />
            <Drawer.Screen
                name="SignUp"
                component={SignUp}
                options={{ headerShown: false }}
            />

        </Drawer.Navigator>
    );
}

const OldStackNavigation = () => {
    return <NavigationContainer>
        <DrawerScreen />
    </NavigationContainer>
}

export default OldStackNavigation;