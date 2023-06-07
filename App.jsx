import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, StatusBar, Text, Platform } from "react-native";
import Navigation from "./src/navigation/Navigation";
import SplashScreen from 'react-native-splash-screen';

const App = () => {
    useEffect(() => {
        SplashScreen.hide();
    }, []);

    useEffect(() => {
        console.log(Platform.OS);
    })
    // console.log('BASE_URL => ',process.env.BASE_URL);
    return <>
        <StatusBar
            barStyle={'light-content'}
            backgroundColor={'#000'} // transparent
            // StatusBarStyle={'dark-content'}
            // translucent={true}
        />
        <Navigation />
    </>
}

export default App;