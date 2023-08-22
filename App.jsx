import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, StatusBar, Text, Platform } from "react-native";
import SplashScreen from 'react-native-splash-screen';
import { colors, IOS, isIPad } from './src/theme';
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

const App = () => {
    useEffect(() => {

        const isSetup = async () => {
            let res = await SetupTrackPlayer();
            console.log('SetupTrackPlayer res => ', res)
            if (res) {
                let currenttrack = await GetCurrentTrack();
                console.log('current track => ', currenttrack)
                // if (currenttrack == null) {
                //     let added = await TrackAddItem(
                //         {
                //             id: '1',
                //             url: 'https://www.divinerevelations.info/documents/bible/english_mp3_bible/dbs_kjv_bible/12_2_kings.mp3',
                //             title: 'Do not Fear Bad News',
                //             artist: 'Reverend Sameem Balius',
                //             artwork: 'https://service.demowebsitelinks.com:3013/uploads/posts/images/4UToGtgL8e4R5ZMeoHLJ.jpg'
                //         }
                //     );
                //     if (added) {
                //         console.log('track addded');
                //     }
                // }
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
                <StatusBar
                // barStyle={IOS ? 'dark-content' : 'light-content'}
                // backgroundColor={colors.orange} // transparent
                // StatusBarStyle={'dark-content'}
                // translucent={true}
                />
                <Navigation />
                <Toast config={toastConfig} />
            </PersistGate>
        </Provider>
    )
}

export default App;