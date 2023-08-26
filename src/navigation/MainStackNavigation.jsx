import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, useColorScheme, StyleSheet, Keyboard, StatusBar } from "react-native";

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigationContainerRef, DefaultTheme, DarkTheme, DrawerActions } from '@react-navigation/native';
import Animated, { Extrapolate, interpolate, interpolateNode, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import Icon from 'react-native-vector-icons/Feather';
import { isDarkMode, colors, fontcolor, fonts, height, width } from "../theme";
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
// import Homily from "../screens/FavouriteList";
import PostsList from "../screens/PostsList";
import PostDetail from "../screens/Detail/PostDetail";
import VideoDetail from "../screens/Detail/VideoDetail";
import ImageDetail from "../screens/Detail/ImageDetail";
import PdfView from "../screens/PdfView";
import FavouriteList from "../screens/FavouriteList";
import strings from "../localization/translation";
import HistoryList from "../screens/HistoryList";
import Downloads from "../screens/Downloads";
import CDsList from "../screens/CDsList";
import AudioPlayer from "../screens/AudioPlayer";
import SearchPost from "../screens/SearchPost";
import Posts from "../screens/Posts";


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
        // StatusBar.setBarStyle(isDrawerOpen ? 'light-content' : 'dark-content');
    }, [isDrawerOpen]);

    return <Animated.View style={[styles.stack, animatedStyle]}>
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    // headerTransparent: true,
                    headerTitle: '',
                    headerTitleAlign: 'center',
                    headerTitleStyle: globalstyle.headerTitleStyle,
                    headerStyle: {
                        backgroundColor: isDarkMode ? colors.drawerbg : colors.headerbgcolor,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
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
                    headerTitle: strings.Notifications,
                    headerTitleAlign: 'center',
                    headerTitleStyle: globalstyle.headerTitleStyle,
                    headerStyle: {
                        backgroundColor: isDarkMode ? colors.drawerbg : colors.headerbgcolor,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    headerLeft: () => <GoBackIcon navigation={navigation} color={colors.black} />,
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="VideoDetail"
                component={VideoDetail}
                options={{
                    headerTitle: '',
                    headerTitleAlign: 'center',
                    headerTitleStyle: globalstyle.headerTitleStyle,
                    headerStyle: {
                        backgroundColor: isDarkMode ? colors.drawerbg : colors.headerbgcolor,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    headerLeft: () => <GoBackIcon navigation={navigation} color={colors.black} />,
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="ImageDetail"
                component={ImageDetail}
                options={{
                    // headerShown: false,
                    headerTitle: '',
                    headerTitleAlign: 'center',
                    headerTitleStyle: globalstyle.headerTitleStyle,
                    // headerTransparent: true,
                    headerStyle: {
                        backgroundColor: isDarkMode ? colors.drawerbg : colors.headerbgcolor,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    headerLeft: () => <GoBackIcon navigation={navigation} color={colors.black} />,
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="PDFView"
                component={PdfView}
                options={{
                    headerTitle: 'Book Detail',
                    headerTitleAlign: 'center',
                    headerTitleStyle: globalstyle.headerTitleStyle,
                    headerStyle: {
                        backgroundColor: isDarkMode ? colors.drawerbg : colors.headerbgcolor,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
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
                    headerStyle: {
                        backgroundColor: isDarkMode ? colors.drawerbg : colors.headerbgcolor,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
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
                    headerStyle: {
                        backgroundColor: isDarkMode ? colors.drawerbg : colors.headerbgcolor,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
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
                    headerLeft: () => <DrawerIcon navigation={navigation} />,
                    // headerLeft: () => <GoBackIcon navigation={navigation} color={colors.black} screen={'Books'} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="PostsList"
                component={PostsList}
                options={{
                    headerTitle: 'PostsList',
                    headerTitleAlign: 'center',
                    headerTitleStyle: globalstyle.headerTitleStyle,
                    headerStyle: {
                        backgroundColor: isDarkMode ? colors.drawerbg : colors.headerbgcolor,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    headerLeft: () => <DrawerIcon navigation={navigation} />,
                    // headerLeft: () => <GoBackIcon navigation={navigation} color={colors.black} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="Posts"
                component={Posts}
                options={{
                    headerTitle: 'Posts',
                    headerTitleAlign: 'center',
                    headerTitleStyle: globalstyle.headerTitleStyle,
                    headerStyle: {
                        backgroundColor: isDarkMode ? colors.drawerbg : colors.headerbgcolor,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    headerLeft: () => <DrawerIcon navigation={navigation} />,
                    // headerLeft: () => <GoBackIcon navigation={navigation} color={colors.black} />,
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
                    headerStyle: {
                        backgroundColor: isDarkMode ? colors.drawerbg : colors.headerbgcolor,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
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
                    headerStyle: {
                        backgroundColor: isDarkMode ? colors.drawerbg : colors.headerbgcolor,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
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
                    headerStyle: {
                        backgroundColor: isDarkMode ? colors.drawerbg : colors.headerbgcolor,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
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
                    headerStyle: {
                        backgroundColor: isDarkMode ? colors.drawerbg : colors.headerbgcolor,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerLeft: () => <GoBackIcon navigation={navigation} color={colors.black} screen={'ChatGroups'} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="QuestionAnswer"
                component={QuestionAnswer}
                options={{
                    headerTitle: strings.AskAQuestion,
                    headerTitleAlign: 'center',
                    headerTitleStyle: globalstyle.headerTitleStyle,
                    headerStyle: {
                        backgroundColor: isDarkMode ? colors.drawerbg : colors.headerbgcolor,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    headerLeft: () => <DrawerIcon navigation={navigation} />,
                    // headerLeft: () => <GoBackIcon navigation={navigation} color={colors.black} screen={'ChatGroups'} />,
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
                    headerTitle: strings.contactus,
                    // // headerShown: false,
                    // headerTitle: 'Contact Us',
                    headerTitleStyle: globalstyle.headerTitleStyle,
                    headerStyle: {
                        backgroundColor: isDarkMode ? colors.drawerbg : colors.headerbgcolor,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />


            <Stack.Screen
                name="FavouriteList"
                component={FavouriteList}
                options={{
                    headerTitle: strings.Favourites,
                    headerTitleAlign: 'center',
                    headerTitleStyle: globalstyle.headerTitleStyle,
                    headerStyle: {
                        backgroundColor: isDarkMode ? colors.drawerbg : colors.headerbgcolor,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    headerLeft: () => <GoBackIcon navigation={navigation} color={colors.black} />,
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="Downloads"
                component={Downloads}
                options={{
                    headerTitle: strings.Downloads,
                    headerTitleAlign: 'center',
                    headerTitleStyle: globalstyle.headerTitleStyle,
                    headerStyle: {
                        backgroundColor: isDarkMode ? colors.drawerbg : colors.headerbgcolor,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    headerLeft: () => <GoBackIcon navigation={navigation} color={colors.black} />,
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="HistoryList"
                component={HistoryList}
                options={{
                    headerTitle: strings.History,
                    headerTitleAlign: 'center',
                    headerTitleStyle: globalstyle.headerTitleStyle,
                    headerStyle: {
                        backgroundColor: isDarkMode ? colors.drawerbg : colors.headerbgcolor,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    headerLeft: () => <GoBackIcon navigation={navigation} color={colors.black} />,
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="CDsList"
                component={CDsList}
                options={{
                    headerTitle: 'CDs',
                    headerTitleAlign: 'center',
                    headerTitleStyle: [globalstyle.headerTitleStyle, { textTransform: 'none' }],
                    headerStyle: {
                        backgroundColor: isDarkMode ? colors.drawerbg : colors.headerbgcolor,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    headerLeft: () => <GoBackIcon navigation={navigation} color={colors.black} />,
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="PostDetail"
                component={PostDetail}
                options={{
                    headerTitle: '',
                    headerTitleAlign: 'center',
                    headerTitleStyle: [globalstyle.headerTitleStyle, { textTransform: 'none' }],
                    // headerTransparent: true,
                    headerStyle: {
                        backgroundColor: isDarkMode ? colors.drawerbg : colors.headerbgcolor,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    headerLeft: () => <GoBackIcon navigation={navigation} color={colors.black} />,
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="SearchPost"
                component={SearchPost}
                options={{
                    headerTitle: strings.Search,
                    headerTitleAlign: 'center',
                    headerTitleStyle: [globalstyle.headerTitleStyle, { textTransform: 'none' }],
                    // headerTransparent: true,
                    headerStyle: {
                        backgroundColor: isDarkMode ? colors.drawerbg : colors.headerbgcolor,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    headerLeft: () => <GoBackIcon navigation={navigation} color={colors.black} />,
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="AudioPlayer"
                component={AudioPlayer}
                options={{
                    // headerShown: false,
                    headerTitle: strings.NowPlaying,
                    headerTitleAlign: 'center',
                    headerTitleStyle: [globalstyle.headerTitleStyle, { textTransform: 'none', fontSize: 14 }],
                    headerTransparent: true,
                    headerStyle: {
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    headerLeft: () => <GoBackIcon navigation={navigation} color={colors.black} />,
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,
                    // headerRight: () => <NotificationIcon navigation={navigation} />
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