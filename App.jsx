import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, StatusBar, Text, Platform } from "react-native";
import SplashScreen from 'react-native-splash-screen';
import { colors, IOS, isDarkMode, isIPad } from './src/theme';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/redux/store';
import Loader from './src/components/Loader';

// import Toast from 'react-native-toast-message';

import Toast from 'react-native-toast-message';
import { toastConfig } from './src/helpers/toastConfig';
import Navigation from "./src/navigation/Navigation";
import strings from "./src/localization/translation";
import { TrackAddItem, SetupTrackPlayer, GetCurrentTrack } from "./src/helpers/track-player";
import { StripeProvider } from "@stripe/stripe-react-native";

const App = () => {
    useEffect(() => {

        const isSetup = async () => {
            let res = await SetupTrackPlayer();
            console.log('SetupTrackPlayer res => ', res)
            if (res) {
                let currenttrack = await GetCurrentTrack();
                console.log('current track => ', currenttrack)
            }
        }
        isSetup()
        setTimeout(() => {
            SplashScreen.hide();
        }, 2000);
    }, [])

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <StripeProvider
                    publishableKey="pk_test_0rY5rGJ7GN1xEhCB40mAcWjg" // Replace with your Stripe publishable key
                    urlScheme="reverendsameembalius" // required for 3D Secure and bank redirects
                    merchantIdentifier="merchant.com.reverendsameembalius"
                >
                    <StatusBar
                        barStyle={!isDarkMode ? 'dark-content' : 'light-content'}
                        // backgroundColor={colors.orange} // transparent
                        // StatusBarStyle={'dark-content'}
                        backgroundColor={colors.drawerbg}
                    // translucent={true}
                    />
                    <Navigation />
                    <Toast config={toastConfig} />
                </StripeProvider>
            </PersistGate>
        </Provider>
    )
}

export default App;