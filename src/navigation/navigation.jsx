import React from "react";
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity } from "react-native";
import Home from "../screens/Home";

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from "../screens/Auth/Login";
import SignUp from "../screens/Auth/SignUp";

import Icon from 'react-native-vector-icons/Feather';
import { TextInput } from "react-native-gesture-handler";
import { colors, fonts, width } from "../theme";

const Stack = createStackNavigator();

const SearchHeader = () => {
    return <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, width: width / 1.6, borderRadius: 40, }}>
        <TouchableOpacity activeOpacity={0.8} style={{ padding: 10 }} onPress={() => { console.log('Open Drawer') }}>
            <Icon name="search" size={18} color={'#ddd'} />
        </TouchableOpacity>
        <TextInput style={{ backgroundColor: colors.white, height: 35, fontFamily: fonts.primary }} placeholder="Search Here..." />
    </View>
}

const StackScreen = (props) => {

    let initialRouteName = 'Login'; // auth().currentUser ? 'Home' : 'Login';

    return <Stack.Navigator initialRouteName={initialRouteName}>
        <Stack.Screen
            name="Home"
            component={Home}
            options={{
                headerTransparent: true,
                headerStyle: { height: 120 },
                headerTitleAlign: 'center',
                headerTitle: () => <SearchHeader />,
                headerLeft: () => <TouchableOpacity activeOpacity={0.7} style={[{ padding: 10, paddingHorizontal: 15, borderRadius: 40, overflow: 'hidden', marginRight: 15 }]}>
                    <Icon name={'align-right'} size={22} color={colors.white} />
                </TouchableOpacity>,
                headerRight: () => (<TouchableOpacity style={{ backgroundColor: colors.orange, width: 40, height: 40, marginRight: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 40, overflow: 'hidden', }}>
                    <Icon name={'bell'} size={18} color={colors.white} />
                </TouchableOpacity>)
            }}
        />
        <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: false }}
        />
    </Stack.Navigator>
}

const Navigation = () => {
    return <NavigationContainer>
        <StackScreen />
    </NavigationContainer>
}

export default Navigation;