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


const App = () => {
    useEffect(() => {
        setTimeout(() => {
            SplashScreen.hide();
        }, 2000);
    }, [])

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <StatusBar
                    barStyle={IOS ? 'dark-content' : 'light-content'}
                    backgroundColor={colors.orange} // transparent
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