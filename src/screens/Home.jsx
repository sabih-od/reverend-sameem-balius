import React from "react";
import { SafeAreaView, ScrollView, View, Text, FlatList, ImageBackground, StyleSheet, Platform } from "react-native";
import { IOS, backgroungImage, colorScheme, colors, fonts, height, width } from "../theme";
import { TouchableOpacity } from "react-native-gesture-handler";

import Icon from 'react-native-vector-icons/Feather';
import nightroutine from "../data/nightly-routines";
import RoutineBox from "../components/RoutineBox";
import MainBox from "../components/MainBox";
import Seperator from "../components/Seperator";
import SectionHeading from "../components/SectionHeading";
import MainTopBox from "../components/MainTopBox";
import RoutineBoxHorizontal from "../components/RoutineBoxHorizontal";
import globalstyle from "../theme/style";



const Home = (props) => {

    console.log('props => ', props.navigation);

    return <SafeAreaView style={globalstyle.fullview}>
        <ImageBackground style={styles.homebgimage} resizeMode="cover" source={backgroungImage}>
            <ScrollView style={styles.homescollview} showsVerticalScrollIndicator={false}>
                <MainBox />

                <Seperator />

                <SectionHeading title={'Nightly Routines'} joined={false} />
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
                        return (<RoutineBox key={index} item={item} navigation={props.navigation} />)
                    }}
                />

                <Seperator />

                <SectionHeading title={'Join the conscration'} joined={true} />
                <MainTopBox dayspending={12} />

                <Seperator />

                <SectionHeading title={'Mental Health'} joined={false} />
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
                        return (<RoutineBox key={index} item={item} navigation={props.navigation} />)
                    }}
                />

                <Seperator />

                <View style={{ alignItems: 'center', backgroundColor: colors.darkblue, paddingHorizontal: 20, paddingVertical: 20, borderRadius: 20 }}>
                    <Text style={{ color: colors.white, fontFamily: fonts.primaryBold, fontSize: 17, marginBottom: 20, textAlign: 'center' }}>Unlock 5000+ prayers, meditations, community challenges and more</Text>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => { console.log('$0.00'); }} style={{ backgroundColor: colors.orange, paddingVertical: 10, borderRadius: 40, width: 180 }}>
                        <Text style={{ textAlign: 'center', color: colors.white, fontFamily: fonts.primaryBold, textTransform: 'uppercase' }}>Try Plus for $0.00</Text>
                    </TouchableOpacity>
                </View>

                <Seperator />

                <SectionHeading title={'Evening Horizontal'} joined={false} />
                <FlatList
                    horizontal
                    snapToInterval={width - 50}
                    scrollEnabled
                    scrollEventThrottle={16}
                    showsHorizontalScrollIndicator={false}
                    // onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    //     { useNativeDriver: false }
                    // )}
                    data={nightroutine}
                    keyExtractor={item => String(item.id)}
                    renderItem={({ item, index }) => {
                        return (<RoutineBoxHorizontal key={index} item={item} navigation={props.navigation} />)
                    }}
                />

                <Seperator />

                <SectionHeading title={'Evening Routines'} joined={true} />
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
                        return (<RoutineBox key={index} item={item} navigation={props.navigation} />)
                    }}
                />
                <View style={{ paddingBottom: 30 }} />

            </ScrollView>
            {/* <View style={{flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.deepblue, padding: 20}}>
                <TouchableOpacity style={{alignItems: 'center'}}>
                    <Icon size={30} name="home" color={colors.white} />
                    <Text style={{fontFamily: fonts.primarySemiBold, fontSize: 18, color: colors.white}}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{alignItems: 'center'}}>
                    <Icon size={30} name="activity" color={colors.white} />
                    <Text style={{fontFamily: fonts.primarySemiBold, fontSize: 18, color: colors.white}}>Meditate</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{alignItems: 'center'}}>
                    <Icon size={30} name="music" color={colors.white} />
                    <Text style={{fontFamily: fonts.primarySemiBold, fontSize: 18, color: colors.white}}>Music</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{alignItems: 'center'}}>
                    <Icon size={30} name="user" color={colors.white} />
                    <Text style={{fontFamily: fonts.primarySemiBold, fontSize: 18, color: colors.white}}>User</Text>
                </TouchableOpacity>
            </View> */}
        </ImageBackground>
    </SafeAreaView>
}

export default Home;

const styles = StyleSheet.create({
    homebgimage: {
        // paddingTop: IOS ? 45 : 70,
        // paddingTop: IOS ? 100 : 70,
        paddingHorizontal: 15,
        flex: 1, // justifyContent: 'space-between',
        // ...StyleSheet.absoluteFillObject,
        // height: height, resizeMode: 'cover'
    },
    homescollview: { flex: 1, paddingVertical: 15 }
})