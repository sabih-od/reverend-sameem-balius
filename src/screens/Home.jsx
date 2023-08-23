import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, FlatList, ImageBackground, StyleSheet, Platform, Button, Image } from "react-native";
import { IOS, backgroungImage, colorScheme, colors, fonts, height, isRTL, width } from "../theme";
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
import draweritems from "../navigation/draweritems";

import RNFS from 'react-native-fs';
import ReactNativeBlobUtil from "react-native-blob-util";
import { connect } from "react-redux";
import { GetFeaturedList, GetPostWithOutTypeByCategoryId } from "../redux/reducers/ListingApiStateReducer";
import { bindActionCreators } from "redux";


const Home = (props) => {

    const [imagePath, setImagePath] = useState(null)

    const filename = Math.round(Math.random() * 10000000)
    const path = `${RNFS.DocumentDirectoryPath}/${filename}`;
    // const url = 'https://www.w3schools.com/html/horse.mp3';
    const url = 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60';

    useEffect(() => {
        console.log('ReactNativeBlobUtil')
    }, [])

    useEffect(() => {
        props.GetPostWithOutTypeByCategoryId({ id: 17 });
        props.GetFeaturedList();
    }, [])
    useEffect(() => {
        console.log('bibleStudy => ', bibleStudy)
    }, [bibleStudy])

    const [bibleStudy, setBibleStudy] = useState([]);
    const [featuredList, setFeaturedList] = useState([]);
    

    const prevBibleStudyResRef = useRef(props.getPostWoTypeByCategoryIdResponse);
    useEffect(() => {
        if (props.getPostWoTypeByCategoryIdResponse !== prevBibleStudyResRef.current && props.getPostWoTypeByCategoryIdResponse?.success && props.getPostWoTypeByCategoryIdResponse?.data) {
            prevBibleStudyResRef.current = props.getPostWoTypeByCategoryIdResponse;
            console.log('props.getPostWoTypeByCategoryIdResponse => ', props.getPostWoTypeByCategoryIdResponse)
            setBibleStudy(props.getPostWoTypeByCategoryIdResponse?.data?.data)
        }
    }, [props.getPostWoTypeByCategoryIdResponse])

    const prevFeaturedListResRef = useRef(props.getToFeaturedListResponse);
    useEffect(() => {
        if (props.getToFeaturedListResponse !== prevFeaturedListResRef.current && props.getToFeaturedListResponse?.success && props.getToFeaturedListResponse?.data) {
            prevFeaturedListResRef.current = props.getToFeaturedListResponse;
            console.log('props.getToFeaturedListResponse => ', props.getToFeaturedListResponse)
            setFeaturedList(props.getToFeaturedListResponse?.data)
        }
    }, [props.getToFeaturedListResponse])

    const downloadimage = () => {
        ReactNativeBlobUtil.config({
            fileCache: true,
            path: path,
        }).fetch('GET', url, {})
            .then((res) => {
                console.log('response => ', res);
                console.log('res => ', res.info());
                console.log('path => ', path)
                setImagePath(path)
            }).catch((errorMessage, statusCode) => {
                // error handling
                console.log('errorMessage => ', errorMessage)
                console.log('statusCode => ', statusCode)
            })
    }

    return <SafeAreaView style={globalstyle.fullview}>
        {/* <Image style={[{ width: width, height: height, position: 'absolute', zIndex: 0 }]} resizeMode="cover" source={backgroungImage} /> */}
        <ImageBackground style={styles.homebgimage} resizeMode="cover" source={backgroungImage}>
            <ScrollView style={styles.homescollview} showsVerticalScrollIndicator={false}>

                {/* {imagePath && <Image source={{ uri: Platform.OS === 'android' ? 'file://' + imagePath : '' + imagePath }} style={{ width: width, height: height }} />}
                <Button title="Download Audio" onPress={downloadimage} /> */}

                {/* {draweritems.map((item, index) => <>
                    <TouchableOpacity key={index} onPress={() => props.navigation.navigate(item.nav)}>
                        <Text>{item.title}</Text>
                    </TouchableOpacity>
                    {item.children && item.children.map((subitem, index) => <TouchableOpacity onPress={() => props.navigation.navigate(subitem.nav)}>
                        <Text>{'   '}{subitem.title}</Text>
                    </TouchableOpacity>)}
                </>)} */}

                <MainBox />

                {featuredList.length > 0 && <>
                    <Seperator />
                    <SectionHeading title={isRTL ? 'متميز' : 'Featured'} joined={false} />
                    <FlatList
                        horizontal
                        snapToInterval={width / 2}
                        scrollEnabled
                        scrollEventThrottle={16}
                        ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
                        showsHorizontalScrollIndicator={false}
                        // onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        //     { useNativeDriver: false }
                        // )}
                        data={featuredList}
                        keyExtractor={item => String(item.id)}
                        renderItem={({ item, index }) => {
                            // console.log('item => ', item)
                            return (<RoutineBox key={index} item={item} navigation={props.navigation} />)
                        }}
                    />
                </>}

                {bibleStudy.length > 0 && <>
                    <Seperator />
                    <SectionHeading title={isRTL ? 'روحية' : 'Spiritual'} joined={false} />
                    <FlatList
                        horizontal
                        snapToInterval={width / 2}
                        scrollEnabled
                        scrollEventThrottle={16}
                        ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
                        showsHorizontalScrollIndicator={false}
                        // onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        //     { useNativeDriver: false }
                        // )}
                        data={bibleStudy}
                        keyExtractor={item => String(item.id)}
                        renderItem={({ item, index }) => {
                            // console.log('item => ', item)
                            return (<RoutineBox key={index} item={item} navigation={props.navigation} />)
                        }}
                    />
                </>}
                {bibleStudy.length > 0 && <>
                    <Seperator />
                    <SectionHeading title={isRTL ? 'الأخبار' : 'News'} joined={false} />
                    <FlatList
                        horizontal
                        snapToInterval={width / 2}
                        scrollEnabled
                        scrollEventThrottle={16}
                        ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
                        showsHorizontalScrollIndicator={false}
                        // onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        //     { useNativeDriver: false }
                        // )}
                        data={bibleStudy}
                        keyExtractor={item => String(item.id)}
                        renderItem={({ item, index }) => {
                            // console.log('item => ', item)
                            return (<RoutineBox key={index} item={item} navigation={props.navigation} />)
                        }}
                    />
                </>}
                <Seperator />
                <SectionHeading title={'Join the conscration'} joined={true} />
                <MainTopBox dayspending={12} />

                <Seperator />

                {/* <SectionHeading title={isRTL ? 'دراسة الكتاب المقدس' : 'Bible Study'} joined={false} />
                <FlatList
                    horizontal
                    snapToInterval={width / 2}
                    scrollEnabled
                    scrollEventThrottle={16}
                    ItemSeparatorComponent={() => <View style={14} />}
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
                <Seperator /> */}

                <View style={{ alignItems: 'center', backgroundColor: colors.darkblue, paddingHorizontal: 20, paddingVertical: 20, borderRadius: 20 }}>
                    <Text style={{ color: colors.white, fontFamily: fonts.primaryBold, fontSize: 17, marginBottom: 20, textAlign: 'center' }}>Unlock 5000+ prayers, meditations, community challenges and more</Text>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => { console.log('$0.00'); }} style={{ backgroundColor: colors.orange, paddingVertical: 10, borderRadius: 40, width: 180 }}>
                        <Text style={{ textAlign: 'center', color: colors.white, fontFamily: fonts.primaryBold, textTransform: 'uppercase' }}>Try Plus for $0.00</Text>
                    </TouchableOpacity>
                </View>
                <View style={{height: 50}} />
                {/* <Seperator /> */}

                {/* <SectionHeading title={'Evening Horizontal'} joined={false} />
                <FlatList
                    horizontal
                    snapToInterval={width - 50}
                    scrollEnabled
                    scrollEventThrottle={16}
                    ItemSeparatorComponent={() => <View style={14} />}
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
                <Seperator /> */}

                {/* <SectionHeading title={'Evening Routines'} joined={true} />
                <FlatList
                    horizontal
                    snapToInterval={width / 2}
                    scrollEnabled
                    scrollEventThrottle={16}
                    ItemSeparatorComponent={() => <View style={14} />}
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
                <View style={{ paddingBottom: 30 }} /> */}

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


const setStateToProps = state => ({
    getPostWoTypeByCategoryIdResponse: state.listingstate.getPostWoTypeByCategoryIdResponse,
    getToFeaturedListResponse: state.listingstate.getToFeaturedListResponse,
})

const mapDispatchToProps = dispatch => {
    return {
        GetPostWithOutTypeByCategoryId: bindActionCreators(GetPostWithOutTypeByCategoryId, dispatch),
        GetFeaturedList: bindActionCreators(GetFeaturedList, dispatch),
    }
}

export default connect(setStateToProps, mapDispatchToProps)(Home);
// export default Home;

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
});