import React, { useEffect } from "react";
import { I18nManager, useColorScheme } from "react-native";

import { NavigationContainer } from '@react-navigation/native';

import { useRef } from "react";
import DrawerStackNavigation from "./DrawerStackNavigation";
import { bindActionCreators } from "redux";
import { UpdateCurrentScreen } from "../redux/reducers/AppStateReducer";
import { connect } from "react-redux";
import AuthStackNavigation from "./AuthStackNavigation";
import { changeLang } from "../localization/translation";
import { isRTL } from "../theme";
// import RNRestart from 'react-native-restart'; 

const Navigation = (props) => {

    console.log('Navigation props => ', props);
    changeLang(props.language)
    useEffect(() => {
        console.log('useEffect props.language => ', props.language)
        changeLang(props.language)
        I18nManager.allowRTL(true);
        I18nManager.forceRTL(props.language == 'ar' ? true : false);
        console.log('useEffect isRTL => ', I18nManager.isRTL)
    }, [props.language])

    // useEffect(() => {
    // }, [])

    // const routeNameRef = useRef();
    // const navigationRef = useRef();
    // const navigationRef = useNavigationContainerRef();

    // const config = {
    //     screens: {
    //         Screens: {
    //             screens: {
    //                 History: 'History',
    //             },
    //         },
    //         Login: 'Login',
    //     },
    // };

    const routeNameRef = useRef();
    const navigationRef = useRef();

    const scheme = useColorScheme();
    // const theme = scheme === 'dark' ? {
    //   ...DarkTheme,
    //   colors: {
    //     ...DarkTheme.colors,
    //     text: '#fff',
    //     background: '#111'
    //   }
    // } : {
    //     ...DefaultTheme,
    //     colors: {
    //       ...DefaultTheme.colors,
    //       text: 'rgb(28, 28, 30)',
    //       primary: '#f00',
    //       background: '#fff'
    //     }
    //   }

    const MyTheme = {
        dark: false,
        colors: {
            primary: 'rgb(255, 45, 85)',
            background: 'rgb(242, 242, 242)',
            card: 'rgb(255, 255, 255)',
            text: 'rgb(28, 28, 30)',
            border: 'rgb(199, 199, 204)',
            notification: 'rgb(255, 69, 58)',
        },
    };

    return <NavigationContainer
        // theme={theme}
        // theme={MyTheme}
        // linking={{
        //     prefixes: ['texasapp://app'],
        //     config: config
        // }}
        ref={navigationRef}
        onReady={() => {
            routeNameRef.current = navigationRef.current.getCurrentRoute().name;
        }}
        onStateChange={async () => {
            const previousRouteName = routeNameRef.current;
            const currentRouteName = navigationRef.current.getCurrentRoute().name;
            if (previousRouteName !== currentRouteName) {
                console.log("currenRoute", currentRouteName);
                console.log("previousRouteName", previousRouteName);
                props.UpdateCurrentScreen(currentRouteName);
                // await analytics().logScreenView({
                //     screen_name: currentRouteName,
                //     screen_class: currentRouteName,
                // });
            }
            routeNameRef.current = currentRouteName;
        }}
    // ref={navigationRef}
    // onReady={() => {
    //   // routeNameRef.current = routeNameRef?.current?.getCurrentRoute().name
    //   // console.log('navigationRef => ', navigationRef)
    // }}
    // onStateChange={() => {
    //   console.log('navigationRef => ', navigationRef.current.getCurrentRoute().name)
    //   // const previousRouteName = routeNameRef.current;
    //   // const currentRouteName = navigationRef.current.getCurrentRoute().name
    //   // console.log("currenRoute", currentRouteName);
    //   // console.log("previousRouteName", previousRouteName);
    // }}
    >
        {props.isLogin ? <DrawerStackNavigation /> : <AuthStackNavigation />}
        {/* <AuthStackNavigation /> */}
    </NavigationContainer>
}

const setStateToProps = (state) => ({
    currentScreen: state.appstate.currentScreen,
    isLogin: state.appstate.isLogin,
    language: state.appstate.language,
})
const mapDispatchToProps = (dispatch) => {
    return {
        UpdateCurrentScreen: bindActionCreators(UpdateCurrentScreen, dispatch)
    }
}

export default connect(setStateToProps, mapDispatchToProps)(Navigation);