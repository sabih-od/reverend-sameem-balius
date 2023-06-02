import React from "react";
import { SafeAreaView, ScrollView, View, Text, FlatList, ImageBackground, StyleSheet } from "react-native";
import { colors, fonts, height, width } from "../theme";
import { TouchableOpacity } from "react-native-gesture-handler";

import Icon from 'react-native-vector-icons/Feather';
import nightroutine from "../data/nightly-routines";
import RoutineBox from "../components/RoutineBox";

const ActionIcons = ({ name }) => {
    return <TouchableOpacity activeOpacity={0.8} style={{ width: 35, height: 35, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.lightblue, marginLeft: 5, borderRadius: 30 }}>
        <Icon name={name} size={18} color={colors.white} />
    </TouchableOpacity>
}

const Home = () => {
    return <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground style={{ paddingTop: 60, paddingHorizontal: 15, flex: 1, justifyContent: 'space-between', }} resizeMode="cover" source={{ uri: 'https://img.freepik.com/free-vector/blue-fluid-background-frame_53876-99019.jpg' }}>
            <ScrollView style={{ paddingVertical: 15, flex: 1, }}>
                <View>
                    <ImageBackground source={{ uri: 'https://s1.1zoom.me/prev/450/449428.jpg' }} resizeMode="cover" style={{ height: height / 3.5, width: '100%', borderRadius: 20, overflow: 'hidden', zIndex: 3 }} />
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.deepblue, paddingHorizontal: 10, paddingVertical: 10, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, overflow: 'hidden', marginTop: -20, zIndex: 1, paddingTop: 30 }}>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ backgroundColor: colors.orange, width: 35, height: 35, alignItems: 'center', justifyContent: 'center', borderRadius: 30, marginRight: 7 }}><Icon name="play" size={18} color={colors.white} /></View>
                            <Text style={{ color: colors.white }}>Play Video</Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <ActionIcons name="heart" />
                            <ActionIcons name="download" />
                            <ActionIcons name="calendar" />
                            <ActionIcons name="clock" />
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.darkblue, paddingHorizontal: 10, paddingBottom: 20, paddingTop: 30, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, overflow: 'hidden', marginTop: -20, zIndex: 0, paddingTop: 30 }}>
                        <Text style={{ fontFamily: fonts.primaryMedium, fontSize: 13, color: colors.lightblue, textTransform: 'uppercase', textDecorationLine: 'underline' }}>St. elizebeth Ann Secton</Text>
                        <Text style={{ fontFamily: fonts.primarySemiBold, color: colors.white, fontSize: 18, marginVertical: 15 }}>"Be attentive to the voice of grace"</Text>
                        <TouchableOpacity style={{ backgroundColor: colors.orange, width: 35, height: 35, alignItems: 'center', justifyContent: 'center', borderRadius: 30, marginBottom: 10 }}>
                            <Icon name="share" size={15} color={"#fff"} />
                        </TouchableOpacity>
                        <Text style={{ fontFamily: fonts.primaryMedium, color: colors.white, fontSize: 12 }}>Share Quote</Text>
                    </View>
                </View>

                <View style={{ borderBottomWidth: 1, borderBottomColor: colors.white, marginVertical: 30 }} />

                <Text style={styles.sectionheading}>Nightly Routines</Text>
                <FlatList
                    horizontal
                    snapToInterval={width / 2}
                    scrollEnabled
                    scrollEventThrottle={16}
                    showsHorizontalScrollIndicator={false}
                    // onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    //     { useNativeDriver: false }
                    // )}
                    data={nightroutine}
                    keyExtractor={item => String(item.id)}
                    renderItem={({ item, index }) => {
                        return (<RoutineBox key={index} item={item} />)
                    }}
                />



                <View style={{ borderBottomWidth: 1, borderBottomColor: colors.white, marginVertical: 30 }} />

                <Text style={styles.sectionheading}>Join the conscration</Text>
                <ImageBackground source={{ uri: 'https://s1.1zoom.me/prev/450/449428.jpg' }} style={{ width: '100%', height: 300, borderRadius: 10, overflow: 'hidden' }}>
                    <View style={{ backgroundColor: colors.orange, position: 'absolute', right: 20, top: 20, paddingHorizontal: 15, borderRadius: 5, overflow: 'hidden' }}>
                        <Text style={{ fontFamily: fonts.primaryMedium }}>12 days left</Text>
                    </View>
                    <View style={{ position: 'absolute', left: 20, bottom: 20, }}>
                        <Text style={{ fontFamily: fonts.primaryExtraBold, color: colors.white, fontSize: 20 }}>Name Here</Text>
                        <Text style={{ fontFamily: fonts.primaryMedium, color: colors.white, fontSize: 14 }}>Enjoy 1,000+ meditations, music, stories.</Text>
                    </View>
                </ImageBackground>
                <View style={{ borderBottomWidth: 1, borderBottomColor: colors.white, marginVertical: 30 }} />

                <Text style={styles.sectionheading}>Mental Health</Text>
                <FlatList
                    horizontal
                    snapToInterval={width / 2}
                    scrollEnabled
                    scrollEventThrottle={16}
                    showsHorizontalScrollIndicator={false}
                    // onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    //     { useNativeDriver: false }
                    // )}
                    data={nightroutine}
                    keyExtractor={item => String(item.id)}
                    renderItem={({ item, index }) => {
                        return (<RoutineBox key={index} item={item} />)
                    }}
                />

                <View style={{ borderBottomWidth: 1, borderBottomColor: colors.white, marginVertical: 30 }} />
                <Text style={styles.sectionheading}>Evening Routines</Text>
                <FlatList
                    horizontal
                    snapToInterval={width / 2}
                    scrollEnabled
                    scrollEventThrottle={16}
                    showsHorizontalScrollIndicator={false}
                    // onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    //     { useNativeDriver: false }
                    // )}
                    data={nightroutine}
                    keyExtractor={item => String(item.id)}
                    renderItem={({ item, index }) => {
                        return (<RoutineBox key={index} item={item} />)
                    }}
                />

            </ScrollView>
        </ImageBackground>
    </SafeAreaView>
}

export default Home;


const styles = StyleSheet.create({
    sectionheading: { color: colors.white, fontFamily: fonts.primaryExtraBold, marginBottom: 20, fontSize: 22 }
})