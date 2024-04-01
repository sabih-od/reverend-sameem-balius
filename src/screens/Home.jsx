import React, { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, FlatList, ImageBackground, StyleSheet, Platform, Button, Image, useColorScheme, RefreshControl, Linking } from "react-native";
import { IOS, backgroungImage, colorScheme, colors, fonts, height, isIPad, isRTL, width } from "../theme";
import { TouchableOpacity } from "react-native-gesture-handler";

import Icon from 'react-native-vector-icons/Feather';
import nightroutine from "../data/nightly-routines";
import RoutineBox from "../components/RoutineBox";
import MainBox from "../components/MainBox";
import Seperator from "../components/Seperator";
import SectionHeading from "../components/SectionHeading";
import MainTopBox from "../components/MainTopBox";
import RoutineBoxHorizontal from "../components/RoutineBoxHorizontal";
import SectionItem from "../components/SectionItem";
import globalstyle from "../theme/style";
import draweritems from "../navigation/draweritems";

import RNFS from 'react-native-fs';
import ReactNativeBlobUtil from "react-native-blob-util";
import { connect } from "react-redux";
import { GetDailiesList, GetFeaturedList, GetHomeAudioData, GetHomeNewsList, GetHomeSpiritualData, GetHomeBiblicalData } from "../redux/reducers/ListingApiStateReducer";
import { bindActionCreators } from "redux";
import strings from "../localization/translation";
import LinearGradient from "react-native-linear-gradient";
import TryPlus from "../components/TryPlus";
import axios from "axios";
import { addListener, getSocket } from "../helpers/socket-manager";
import { showToast } from "../helpers/toastConfig";


const Home = (props) => {

    const [imagePath, setImagePath] = useState(null)
    // const colorScheme = useColorScheme();


    // const filename = Math.round(Math.random() * 10000000)
    // const path = `${RNFS.DocumentDirectoryPath}/${filename}`;
    // const url = 'https://www.w3schools.com/html/horse.mp3';
    const url = 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60';

    const socket = getSocket();
    useEffect(() => {
        console.log('ReactNativeBlobUtil')

        addListener('testmsg', (res) => {
            console.log('receive testmsg => ', res);
            showToast('success', res.message)
        })
        // socket?.on('testmsg', (res) => {
        //     console.log('receive testmsg => ', res);
        //     showToast('success', res.message)
        // });

        return () => {
            console.log('off testmsg')
            socket?.off('testmsg');
        }

    }, [socket])

    function sendmes() {
        console.log('props.userInfo.id => ', props.userInfo.id == 3 ? 9 : 3)
        socket?.emit('testmsg', { id: props.userInfo.id == 3 ? 9 : 3, message: 'Hello Dear' })
    }

    useEffect(() => {
        // if (!IOS) {
        //     // axios.defaults.headers.common['Authorization'] = `Bearer 1656|35uwDzTjVDwexmX0Om94BtA9VPUKPHo2etdpGSUV`
        //     axios.request({ url: 'https://hunterssocial.com/api/settings', method: 'GET' })
        //         .then(function (response) {
        //             console.log('response hunter => ', response);
        //             initialHit()
        //         })
        //         .catch(function (error) { console.log(error); });
        // } else {
        initialHit()
        // }

    }, [])

    useEffect(() => {
        // console.log('biblical => ', biblical)
    }, [biblical])
    useEffect(() => {
        // console.log('audio => ', audio)
    }, [audio])

    const [biblical, setBiblical] = useState([]);
    const [spiritual, setSpiritual] = useState([]);
    const [audio, setAudio] = useState([]);
    const [featuredList, setFeaturedList] = useState([]);
    const [dailies, setDailies] = useState([]);
    const [news, setNews] = useState([]);

    function initialHit() {
        props.GetHomeBiblicalData();
        props.GetFeaturedList();
        props.GetDailiesList();
        props.GetHomeNewsList();
        props.GetHomeSpiritualData();
        props.GetHomeAudioData();
    }

    const prevBibleStudyResRef = useRef(props.getHomeBiblicalDataResponse);
    useEffect(() => {
        if (props.getHomeBiblicalDataResponse !== prevBibleStudyResRef.current && props.getHomeBiblicalDataResponse?.success && props.getHomeBiblicalDataResponse?.data) {
            prevBibleStudyResRef.current = props.getHomeBiblicalDataResponse;
            // console.log('props.getHomeBiblicalDataResponse => ', props.getHomeBiblicalDataResponse)
            setBiblical(props.getHomeBiblicalDataResponse?.data?.data)
        }
    }, [props.getHomeBiblicalDataResponse])

    const prevSpiritualResRef = useRef(props.getHomeSpiritualDataResponse);
    useEffect(() => {
        if (props.getHomeSpiritualDataResponse !== prevSpiritualResRef.current && props.getHomeSpiritualDataResponse?.success && props.getHomeSpiritualDataResponse?.data) {
            prevSpiritualResRef.current = props.getHomeSpiritualDataResponse;
            // console.log('props.getHomeSpiritualDataResponse => ', props.getHomeSpiritualDataResponse)
            setSpiritual(props.getHomeSpiritualDataResponse?.data?.data)
        }
    }, [props.getHomeSpiritualDataResponse])


    // const homeAudio = useHomeAudio(props.getHomeAudioNoDataResponse);
    // console.log('eventList Home => ', eventList);

    const prevHomeAudioResRef = useRef(props.getHomeAudioNoDataResponse);
    useEffect(() => {
        // console.log('props.getHomeAudioNoDataResponse => ', props.getHomeAudioNoDataResponse)
        if (props.getHomeAudioNoDataResponse !== prevHomeAudioResRef.current && props.getHomeAudioNoDataResponse?.success && props.getHomeAudioNoDataResponse?.data) {
            prevHomeAudioResRef.current = props.getHomeAudioNoDataResponse;
            // console.log('props.getHomeAudioNoDataResponse => ', props.getHomeAudioNoDataResponse)
            setAudio(props.getHomeAudioNoDataResponse?.data)
        }
    }, [props.getHomeAudioNoDataResponse])

    const prevFeaturedListResRef = useRef(props.getToFeaturedListResponse);
    useEffect(() => {
        if (props.getToFeaturedListResponse !== prevFeaturedListResRef.current && props.getToFeaturedListResponse?.success && props.getToFeaturedListResponse?.data) {
            prevFeaturedListResRef.current = props.getToFeaturedListResponse;
            // console.log('props.getToFeaturedListResponse => ', props.getToFeaturedListResponse)
            setFeaturedList(props.getToFeaturedListResponse?.data)
        }
    }, [props.getToFeaturedListResponse])

    const prevDailiesResRef = useRef(props.getToFeaturedListResponse);
    useEffect(() => {
        if (props.getDailiesListResponse !== prevDailiesResRef.current && props.getDailiesListResponse?.success && props.getDailiesListResponse?.data) {
            prevDailiesResRef.current = props.getDailiesListResponse;
            // console.log('props.getDailiesListResponse => ', props.getDailiesListResponse)
            if (props.getDailiesListResponse?.data.length > 0) {
                setDailies(props.getDailiesListResponse?.data[0])
            }
        }
    }, [props.getDailiesListResponse])

    const prevHomeNewsListResRef = useRef(props.getToFeaturedListResponse);
    useEffect(() => {
        if (props.getHomeNewsListResponse !== prevHomeNewsListResRef.current && props.getHomeNewsListResponse?.success && props.getHomeNewsListResponse?.data) {
            prevHomeNewsListResRef.current = props.getHomeNewsListResponse;
            // console.log('props.getHomeNewsListResponse => ', props.getHomeNewsListResponse)
            if (props.getHomeNewsListResponse?.data.length > 0) {
                setNews(props.getHomeNewsListResponse?.data)
            }
        }
    }, [props.getHomeNewsListResponse])

    // const downloadimage = () => {
    //     ReactNativeBlobUtil.config({
    //         fileCache: true,
    //         path: path,
    //     }).fetch('GET', url, {})
    //         .then((res) => {
    //             console.log('response => ', res);
    //             console.log('res => ', res.info());
    //             console.log('path => ', path)
    //             setImagePath(path)
    //         }).catch((errorMessage, statusCode) => {
    //             // error handling
    //             console.log('errorMessage => ', errorMessage)
    //             console.log('statusCode => ', statusCode)
    //         })
    // }

    const [categories, setCategories] = useState([])
    const menuRef = useRef(props.drawerMenu)
    useEffect(() => {
        if (props.drawerMenu != menuRef.current && props.drawerMenu?.success && props.drawerMenu?.data && props.drawerMenu?.data.length > 0) {
            // console.log('props.drawerMenu?.data => ', props.drawerMenu?.data)
            setCategories(props.drawerMenu?.data) //.reverse()
        }
    }, [props.drawerMenu])

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);

        initialHit()

        // props.GetEventsList({ pageno: 1, limit: PAGINATION_LIMIT });
        // // props.GetUpcomingEventsList({ pageno: 1, limit: PAGINATION_LIMIT });
        // props.GetPostsList({ pageno: 1, limit: PAGINATION_LIMIT });
        // props.GetSermonsList({ pageno: 1, limit: PAGINATION_LIMIT });
        // props.GetOurSpeakerList({ pageno: 1, limit: PAGINATION_LIMIT });
        // props.GetOurStaffList({ pageno: 1, limit: PAGINATION_LIMIT });
        // props.GetHomeBanner();

        // props.GetSermonsDetailApiCall(item.id)
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    return <SafeAreaView style={globalstyle.fullview}>
        <TouchableOpacity style={{ backgroundColor: colors.orange, paddingHorizontal: 10, paddingVertical: 10 }}>
            <Text
                style={{ fontFamily: fonts.primary, color: colors.white, textAlign: 'center' }}
                onPress={() => {
                    // Linking.openURL('https://service.demowebsitelinks.com/viewer.html')
                    sendmes()
                }}>Join Live Stream</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={{ backgroundColor: colors.orange, paddingHorizontal: 10, paddingVertical: 10 }}>
            <Text
                style={{ fontFamily: fonts.primary, color: colors.white, textAlign: 'center' }}
                onPress={() => {
                    Linking.openURL('https://service.demowebsitelinks.com/viewer.html')
                    // sendmes()
                }}>Join Live Stream</Text>
        </TouchableOpacity> */}
        {/* <Image style={[{ width: width, height: height, position: 'absolute', zIndex: 0 }]} resizeMode="cover" source={backgroungImage} /> */}
        <ImageBackground style={styles.homebgimage} resizeMode="cover" source={backgroungImage}>
            <ScrollView
                style={styles.homescollview}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >

                {/* <Text>{colorScheme}</Text> */}
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

                {/* <TouchableOpacity onPress={() => props.navigation.navigate('AudioPlayer')}>
                    <Text>Audio Player</Text>
                </TouchableOpacity> */}
                {dailies && <View style={{ paddingHorizontal: 15 }}>
                    <MainBox item={dailies} />
                </View>}

                {featuredList.length > 0 && <>
                    <View style={{ paddingHorizontal: 15 }}>
                        <Seperator />
                        <SectionHeading title={isRTL ? 'متميز' : 'Featured'} joined={false} />
                    </View>
                    <FlatList
                        horizontal
                        snapToInterval={width / 2}
                        scrollEnabled
                        scrollEventThrottle={16}
                        contentContainerStyle={{ paddingHorizontal: 15 }}
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

                {spiritual.length > 0 && <>
                    <View style={{ paddingHorizontal: 15 }}>
                        <Seperator />
                        <SectionHeading title={strings.Spiritual} joined={false} />
                    </View>
                    <FlatList
                        horizontal
                        snapToInterval={width / 2}
                        scrollEnabled
                        scrollEventThrottle={16}
                        contentContainerStyle={{ paddingHorizontal: 15 }}
                        ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
                        showsHorizontalScrollIndicator={false}
                        // onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        //     { useNativeDriver: false }
                        // )}
                        data={spiritual}
                        keyExtractor={item => String(item.id)}
                        renderItem={({ item, index }) => {
                            // console.log('item => ', item)
                            return (<RoutineBox key={index} item={item} navigation={props.navigation} />)
                        }}
                    />
                </>}

                {biblical.length > 0 && <>
                    <View style={{ paddingHorizontal: 15 }}>
                        <Seperator />
                        <SectionHeading title={strings.Biblical} joined={false} />
                    </View>
                    <FlatList
                        horizontal
                        snapToInterval={width / 2}
                        scrollEnabled
                        scrollEventThrottle={16}
                        contentContainerStyle={{ paddingHorizontal: 15 }}
                        ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
                        showsHorizontalScrollIndicator={false}
                        // onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        //     { useNativeDriver: false }
                        // )}
                        data={biblical}
                        keyExtractor={item => String(item.id)}
                        renderItem={({ item, index }) => {
                            // console.log('item => ', item)
                            return (<RoutineBox key={index} item={item} navigation={props.navigation} />)
                        }}
                    />
                </>}

                {audio.length > 0 && <>
                    <View style={{ paddingHorizontal: 15 }}>
                        <Seperator />
                        <SectionHeading title={strings.Audios} joined={false} />
                    </View>
                    <View style={{ paddingHorizontal: 15, marginBottom: -10 }}>
                        {audio && audio.length > 0 && audio.map((item, index) => {
                            return (
                                <SectionItem
                                    key={index}
                                    item={item}
                                    // width={isIPad ? (width / 3) - 20 : (width / 2) - 22}
                                    width={width - 100}
                                    navigation={props.navigation}
                                    audio={true}
                                    audiodetail={true}
                                // hideicon={props.route.params.item.id == 10 ? false : true}
                                />
                            );
                        })}
                    </View>

                    {/* <FlatList
                        // horizontal
                        // snapToInterval={width / 2}
                        scrollEnabled
                        scrollEventThrottle={16}
                        contentContainerStyle={{ paddingHorizontal: 15 }}
                        ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
                        showsHorizontalScrollIndicator={false}
                        // onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        //     { useNativeDriver: false }
                        // )}
                        data={audio}
                        keyExtractor={item => String(item.id)}
                        renderItem={({ item, index }) => {
                            // console.log('item => ', item)
                            // return (<RoutineBox key={index} item={item} navigation={props.navigation} />)
                            return (<SectionItem
                                key={index}
                                item={item}
                                // width={isIPad ? (width / 3) - 20 : (width / 2) - 22}
                                width={width - 100}
                                navigation={props.navigation}
                                audio={true}
                                // hideicon={props.route.params.item.id == 10 ? false : true}
                            />)
                        }}
                    /> */}
                </>}

                {categories.length > 0 && <>
                    <View style={{ paddingHorizontal: 15 }}>
                        <Seperator />
                        <SectionHeading title={strings.exploreByCategory} />
                    </View>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={categories}
                        contentContainerStyle={{ paddingHorizontal: 15 }}
                        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
                        keyExtractor={item => String(item?.id)}
                        renderItem={({ item, index }) => <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => props.navigation.navigate('Posts', { item: item })}
                        >
                            <ImageBackground source={require('./../../assets/images/meditation.jpg')} style={{ height: width / 1.5, width: width / 2.4, borderRadius: 15, overflow: 'hidden', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <View style={{ position: 'relative', zIndex: 1, paddingVertical: 15, paddingHorizontal: 15 }}>
                                    <Text style={{ fontFamily: isRTL ? fonts.arabicMedium : fonts.primaryMedium, textAlign: 'center', color: colors.white, fontSize: 18 }}>{item?.name}</Text>
                                    <Text style={{ fontFamily: isRTL ? fonts.arabic : fonts.primary, textAlign: 'center', color: '#ddd', fontSize: 12 }} numberOfLines={2}>
                                        {item?.name == 'Mass' && 'Access services and sacraments, fostering spiritual connection regardless of location'}
                                        {item?.name == 'Homily' && 'Engage with insightful sermons and reflections from clergy, enhancing your understanding of scripture'}
                                        {item?.name == 'Lectures' && 'Explore educational talks and discussions on theology, history, and Christian principles'}
                                        {item?.name == 'Meditation' && 'Experience guided contemplative sessions that help you connect with your faith on a deeper level'}
                                        {item?.name == 'News' && 'Stay updated with Christian world events, religious news, and community activities'}
                                        {item?.name == 'Library' && 'Access a diverse collection of religious texts, books, and resources for spiritual growth'}
                                        {item?.name == 'Courses' && 'Enroll in structured courses on Christianity, Bible studies, and personal spiritual development'}
                                    </Text>
                                </View>
                                <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)', colors.black]} style={{ height: 150, width: '100%', position: 'absolute', left: 0, bottom: 0, zIndex: 0 }} />
                            </ImageBackground>
                        </TouchableOpacity>}
                    />
                </>}

                {news.length > 0 && <>
                    <View style={{ paddingHorizontal: 15 }}>
                        <Seperator />
                        <SectionHeading title={isRTL ? 'الأخبار' : 'News'} joined={false} />
                    </View>
                    <FlatList
                        horizontal
                        snapToInterval={width / 2}
                        scrollEnabled
                        scrollEventThrottle={16}
                        contentContainerStyle={{ paddingHorizontal: 15 }}
                        ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
                        showsHorizontalScrollIndicator={false}
                        // onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        //     { useNativeDriver: false }
                        // )}
                        data={news}
                        keyExtractor={item => String(item.id)}
                        renderItem={({ item, index }) => {
                            // console.log('item => ', item)
                            return (<RoutineBox key={index} item={item} navigation={props.navigation} />)
                        }}
                    />
                </>}


                {/* <View style={{ paddingHorizontal: 15 }}>
                    <Seperator />
                    <SectionHeading title={'Join the conscration'} joined={true} />
                    <MainTopBox dayspending={12} />
                    <Seperator />
                </View> */}

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


                <TryPlus navigation={props.navigation} />
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
    </SafeAreaView >
}


const setStateToProps = state => ({
    userInfo: state.appstate.userInfo,
    getHomeBiblicalDataResponse: state.listingstate.getHomeBiblicalDataResponse,
    getHomeSpiritualDataResponse: state.listingstate.getHomeSpiritualDataResponse,
    getHomeAudioNoDataResponse: state.listingstate.getHomeAudioNoDataResponse,

    getToFeaturedListResponse: state.listingstate.getToFeaturedListResponse,
    getDailiesListResponse: state.listingstate.getDailiesListResponse,
    getHomeNewsListResponse: state.listingstate.getHomeNewsListResponse,
    drawerMenu: state.listingstate.drawerMenu,
})

const mapDispatchToProps = dispatch => {
    return {
        GetFeaturedList: bindActionCreators(GetFeaturedList, dispatch),
        GetDailiesList: bindActionCreators(GetDailiesList, dispatch),
        GetHomeNewsList: bindActionCreators(GetHomeNewsList, dispatch),
        GetHomeBiblicalData: bindActionCreators(GetHomeBiblicalData, dispatch),
        GetHomeSpiritualData: bindActionCreators(GetHomeSpiritualData, dispatch),
        GetHomeAudioData: bindActionCreators(GetHomeAudioData, dispatch),
    }
}

export default connect(setStateToProps, mapDispatchToProps)(Home);
// export default Home;

const styles = StyleSheet.create({
    homebgimage: {
        // paddingTop: IOS ? 45 : 70,
        // paddingTop: IOS ? 100 : 70,
        // paddingHorizontal: 15,
        flex: 1, // justifyContent: 'space-between',
        // ...StyleSheet.absoluteFillObject,
        // height: height, resizeMode: 'cover'
    },
    homescollview: { flex: 1, paddingVertical: 15 }
});