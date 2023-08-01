import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, useColorScheme, StyleSheet, Keyboard, StatusBar } from "react-native";

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigationContainerRef, DefaultTheme, DarkTheme, DrawerActions } from '@react-navigation/native';
import Animated, { Extrapolate, interpolate, interpolateNode, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import Icon from 'react-native-vector-icons/Feather';
import { colors, fontcolor, fonts, height, width } from "../theme";
import { createDrawerNavigator, useDrawerProgress, useDrawerStatus } from "@react-navigation/drawer";

/* Screens */
import Home from "../screens/Home";
import Contact from "../screens/Contact";
import About from "../screens/About";
import Notifications from "../screens/Notifications";
import PrayList from "../screens/PrayList";
import GoalList from "../screens/GoalsList";
import StartFreeWeek from "../screens/FreeWeek";
import Profile from "../screens/Profile/Profile";
import EditProfile from "../screens/Profile/EditProfile";

import DrawerIcon from "../components/header/DrawerIcon";
import NotificationIcon from "../components/header/NotificationIcon";
import GoBackIcon from "../components/header/GoBackIcon";

import globalstyle from "../theme/style";
import QuestionAnswer from "../screens/QuestionAnswer";
import Audio from "../screens/Audio";
import Test from "../screens/Test";
import Social from "../screens/Lectures/Social";
import BibleStudy from "../screens/Lectures/BibleStudy";
import WellBeing from "../screens/Lectures/WellBeing";
import News from "../screens/News";
import Homily from "../screens/Homily";


const Stack = createStackNavigator();
const MainStackNavigation = ({ navigation, style, notificationBadge }) => {

    const drawerProgress = useDrawerProgress();
    const animatedStyle = useAnimatedStyle(() => {
        const scale = interpolate(drawerProgress.value, [0, 1], [1, 0.8], {
            extrapolateRight: Extrapolate.CLAMP,
        });
        const borderRadius = interpolate(drawerProgress.value, [0, 1], [0, 15], {
            extrapolateRight: Extrapolate.CLAMP,
        });
        return {
            overflow: 'hidden',
            transform: [{ scale }],
            borderRadius,
        };
    });

    const isDrawerOpen = useDrawerStatus() === 'open';

    useEffect(() => {
        // Change the StatusBar style to light when the drawer is open
        StatusBar.setBarStyle(isDrawerOpen ? 'light-content' : 'dark-content');
    }, [isDrawerOpen]);

    return <Animated.View style={[styles.stack, animatedStyle]}>
        <Stack.Navigator initialRouteName="Test">
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    // headerTransparent: true,
                    headerTitleAlign: 'center',
                    headerTitleStyle: globalstyle.headerTitleStyle,
                    headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                    // headerTransparent: true,
                    // headerStyle: { height: 120 },
                    // headerTitle: () => <SearchHeader />,
                    // headerLeft: () => <TouchableOpacity style={{ backgroundColor: '#ddd', padding: 10 }} onPress={() => { navigation.dispatch(DrawerActions.openDrawer()); }} activeOpacity={0.8}>
                    //     <Icon name={'align-right'} size={22} color={colors.black} />
                    // </TouchableOpacity>,
                    // headerRight: () => (<TouchableOpacity>
                    //     <Icon name={'bell'} size={18} color={colors.black} />
                    // </TouchableOpacity>)
                }}
            />
            <Stack.Screen
                name="Notifications"
                component={Notifications}
                options={{
                    headerTitle: 'Notifications',
                    headerTitleAlign: 'center',
                    headerTitleStyle: globalstyle.headerTitleStyle,
                    headerLeft: () => <GoBackIcon navigation={navigation} color={colors.black} />,
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{
                    headerTitle: '',
                    headerTransparent: true,
                    headerTitleAlign: 'center',
                    headerTitleStyle: globalstyle.headerTitleStyle,
                    headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="EditProfile"
                component={EditProfile}
                options={{
                    headerTitle: '',
                    headerTransparent: true,
                    headerTitleAlign: 'center',
                    headerTitleStyle: globalstyle.headerTitleStyle,
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,                    
                    headerLeft: () => <GoBackIcon navigation={navigation} color={colors.black} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="PrayList"
                component={PrayList}
                options={{
                    headerTitle: 'Pray',
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontFamily: fonts.headingFont, textTransform: 'capitalize' },
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerLeft: () => <GoBackIcon navigation={navigation} color={colors.black} screen={'Books'} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="About"
                component={About}
                options={{
                    headerTitle: 'About',
                    headerTitleAlign: 'center',
                    headerTitleStyle: globalstyle.headerTitleStyle,
                    headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="Audio"
                component={Audio}
                options={{
                    headerTitle: 'Audio',
                    headerTitleAlign: 'center',
                    headerTitleStyle: globalstyle.headerTitleStyle,
                    headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />

            <Stack.Screen
                name="GoalList"
                component={GoalList}
                options={{
                    headerTitle: 'Goals',
                    headerTitleAlign: 'center',
                    headerTitleStyle: globalstyle.headerTitleStyle,
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerLeft: () => <GoBackIcon navigation={navigation} color={colors.black} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="StartFreeWeek"
                component={StartFreeWeek}
                options={{
                    headerTitle: 'Start Free Week',
                    headerTitleAlign: 'center',
                    headerTitleStyle: globalstyle.headerTitleStyle,
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerLeft: () => <GoBackIcon navigation={navigation} color={colors.black} screen={'ChatGroups'} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="QuestionAnswer"
                component={QuestionAnswer}
                options={{
                    headerTitle: 'Ask A Question',
                    headerTitleAlign: 'center',
                    headerTitleStyle: globalstyle.headerTitleStyle,
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerLeft: () => <GoBackIcon navigation={navigation} color={colors.black} screen={'ChatGroups'} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="Contact"
                component={Contact}
                // options={{
                //     headerLeft: () => <GoBackIcon navigation={navigation} />,
                //     headerTitle: '',
                //     headerTransparent: true
                // }}
                options={{
                    headerTransparent: true,
                    // headerLeft: () => <GoBackIcon navigation={navigation} />,
                    headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerTitle: 'Contact',
                    // // headerShown: false,
                    // headerTitle: 'Contact Us',
                    headerTitleStyle: globalstyle.headerTitleStyle,
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />

            <Stack.Screen
                name="Homily"
                component={Homily}
                options={{
                    // headerTransparent: true,
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerTitle: 'Homily',
                    // // headerShown: false,
                    // headerTitle: 'Contact Us',
                    // headerTitleStyle: globalstyle.headerTitleStyle,
                    headerLeft: () => <GoBackIcon navigation={navigation} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="News"
                component={News}
                options={{
                    // headerTransparent: true,
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerTitle: 'News',
                    // // headerShown: false,
                    // headerTitle: 'Contact Us',
                    // headerTitleStyle: globalstyle.headerTitleStyle,
                    headerLeft: () => <GoBackIcon navigation={navigation} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="Social"
                component={Social}
                options={{
                    // headerTransparent: true,
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerTitle: 'Social',
                    // // headerShown: false,
                    // headerTitle: 'Contact Us',
                    // headerTitleStyle: globalstyle.headerTitleStyle,
                    headerLeft: () => <GoBackIcon navigation={navigation} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="BibleStudy"
                component={BibleStudy}
                options={{
                    // headerTransparent: true,
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerTitle: 'Bible Study',
                    // // headerShown: false,
                    // headerTitle: 'Contact Us',
                    headerTitleStyle: globalstyle.headerTitleStyle,
                    headerLeft: () => <GoBackIcon navigation={navigation} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="WellBeing"
                component={WellBeing}
                options={{
                    // headerTransparent: true,
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerTitle: 'Well-Being',
                    // // headerShown: false,
                    // headerTitle: 'Contact Us',
                    headerTitleStyle: globalstyle.headerTitleStyle,
                    headerLeft: () => <GoBackIcon navigation={navigation} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
        </Stack.Navigator>
    </Animated.View>
}
export default MainStackNavigation;

const styles = StyleSheet.create({
    stack: { flex: 1 },
    drawerStyles: { flex: 1, width: '70%' },
    badge: { backgroundColor: colors.orange, color: colors.white, position: 'absolute', width: 11, height: 11, top: 5, right: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', borderRadius: 10, zIndex: 1, fontSize: 12, fontFamily: fonts.primary, },
    notibadge: { position: 'relative', width: 36, height: 36, marginRight: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 40, overflow: 'hidden', },
});