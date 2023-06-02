import React from "react";
import { SafeAreaView, ScrollView, StatusBar, Text } from "react-native";
import Navigation from "./src/navigation/navigation";

const App = () => {
    // console.log('BASE_URL => ',process.env.BASE_URL);
    return <><StatusBar
    barStyle={'dark-content'}
    // backgroundColor={'#fff'}
    StatusBarStyle={'dark-content'}
    backgroundColor="transparent"
    translucent={true}
/><Navigation /></>
}

export default App;