import React from "react";
import { SafeAreaView, ScrollView, View, Text, FlatList, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { backgroungImage, colors, fonts, height, width } from "../theme";

import Icon from 'react-native-vector-icons/Feather';

const Notifications = () => {
    return <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground style={{ paddingTop: 60, paddingHorizontal: 15, flex: 1, justifyContent: 'space-between', resizeMode: 'cover' }}
            source={backgroungImage}>
            <ScrollView style={{ paddingVertical: 15, flex: 1, }} showsVerticalScrollIndicator={false}>


            </ScrollView>
        </ImageBackground>
    </SafeAreaView>
}

export default Notifications;
const styles = StyleSheet.create({

})