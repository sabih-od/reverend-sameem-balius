import React, { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, FlatList, ImageBackground, StyleSheet, Platform, Button, Image, useColorScheme, RefreshControl, Linking, ActivityIndicator } from "react-native";
import { IOS, backgroungImage, colorScheme, colors, fonts, height, isDarkMode, isIPad, isRTL, width } from "../theme";
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
import { GetDailiesList, GetFeaturedList, GetHomeAudioData, GetHomeNewsList, GetHomeSpiritualData, GetHomeBiblicalData, GetDrawerMenu } from "../redux/reducers/ListingApiStateReducer";
import { bindActionCreators } from "redux";
import strings from "../localization/translation";
import LinearGradient from "react-native-linear-gradient";
import TryPlus from "../components/TryPlus";
import axios from "axios";
import { addListener, getSocket } from "../helpers/socket-manager";
import { showToast } from "../helpers/toastConfig";
import { useNavigation } from "@react-navigation/native";
import DrawerItem from '../components/drawer/DrawerItem';


const Home = (props) => {

    const navigation = useNavigation()

    const [imagePath, setImagePath] = useState(null)
    const [isTab, setIsTab] = useState('')
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
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
        props.GetDrawerMenu();
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
            setLoading(false)
        }
    }, [props.drawerMenu])

    const filteredCategories = categories.filter(item => item?.name !== "Daily Rosary" && item?.name !== "Bible Explain" && item?.name !== "Night Prayers" && item?.name !== "Daily Bible");

    const rosaryItem = categories.filter(item => item?.name === "Daily Rosary");
    const rosayName = rosaryItem.map((item) => item?.name)

    const dailyBible = categories.filter(item => item?.name === "Daily Bible");
    const dailyBibleName = dailyBible.map((item) => item?.name)

    const nightPrayers = categories.filter(item => item?.name === "Night Prayers");
    const nightPrayersName = nightPrayers.map((item) => item?.name)

    const bibleExplain = categories.filter(item => item?.name === "Bible Explain");
    const bibleExplainName = bibleExplain.map((item) => item?.name)

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

    return <SafeAreaView style={[globalstyle.fullview, { backgroundColor: colors.headerbgcolor, height: height, paddingBottom: 80 }]}>
        <TouchableOpacity activeOpacity={0.8} style={{ backgroundColor: colors.orange, marginTop: 10, paddingHorizontal: 10, paddingVertical: 10, borderRadius: 30, width: '65%', alignSelf: 'center' }}>

            <Text
                style={{ fontFamily: fonts.primary, color: colors.white, textAlign: 'center' }}
                onPress={() => props.navigation.navigate('LiveStream')}
            >Join Live Stream</Text>
        </TouchableOpacity>
        <Image
            source={require('../../assets/images/borderimg.png')} // Path to your local image
            style={{ display: 'flex', justifyContent: 'center', alignSelf: 'center', marginTop: 10, alignItems: 'center', width: '80%' }}
        />
        {loading && <View style={globalstyle.loadingview}>
            <ActivityIndicator color={isDarkMode ? colors.black : colors.black} style={{ marginBottom: 15 }} />
            <Text style={globalstyle.noproductfound}>{strings.Loading}</Text>
        </View>}
        {/* <TouchableOpacity style={{ backgroundColor: colors.orange, paddingHorizontal: 10, paddingVertical: 10 }}>
            <Text
                style={{ fontFamily: fonts.primary, color: colors.white, textAlign: 'center' }}
                onPress={() => {
                    Linking.openURL('https://service.demowebsitelinks.com/viewer.html')
                    // sendmes()
                }}>Join Live Stream</Text>
        </TouchableOpacity> */}
        {/* <Image style={[{ width: width, height: height, position: 'absolute', zIndex: 0 }]} resizeMode="cover" source={backgroungImage} /> */}
        <ImageBackground style={[styles.homebgimage, {}]} resizeMode="stretch"
        // source={require('./../../assets/images/bgHome.png')}
        >
            <View style={{ paddingVertical: 25, }} />
            <ScrollView
                contentContainerStyle={{ paddingBottom: 25 }}
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
                {/* {drawerMenu.length > 0 && drawerMenu.map((item, index) => <DrawerItem key={index} item={item} navigation={props.navigation} activescreen={props.currentScreen} mainStyle={{alignItems: 'center', justifyContent: 'center', borderLeftWidth: 0}} arrowStyle={{position: 'absolute', right: (width - 120)/2}} childrenStyle={{justifyContent: 'center', alignItems: 'center', borderLeftWidth: 0}} bulletStyle={{position: 'absolute', left: 20}} />)}
                <DrawerItem key={100} item={{ title: strings.questionanswer, nav: 'QuestionAnswer' }} navigation={props.navigation} activescreen={props.currentScreen} mainStyle={{alignItems: 'center', justifyContent: 'center', borderLeftWidth: 0}} arrowStyle={{position: 'absolute', right: (width - 120)/2}} childrenStyle={{justifyContent: 'center', alignItems: 'center', borderLeftWidth: 0}} bulletStyle={{position: 'absolute', left: 20}} /> */}
 
                <FlatList
                    style={{ height: 380, }}
                    vertical
                    showsVerticalScrollIndicator={false}
                    data={filteredCategories}
                    contentContainerStyle={{ paddingHorizontal: 15 }}
                    ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
                    keyExtractor={item => String(item?.id)}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                style={{ backgroundColor: '#191B1D', width: '70%',paddingHorizontal:5, paddingVertical:5, height: 70, alignSelf: 'center', borderRadius: 10, marginTop: 10, flexDirection: 'row', alignItems: 'center', }}
                                activeOpacity={0.8}
                                onPress={() => props.navigation.navigate('Posts', { item: item })}
                            >
                               {item?.name === 'Mass' &&
    <Image 
     style={{ maxHeight: '100%', width: 70, borderRadius:10 }}
        source={require('./../../assets/images/mass.jpg')} 
    />
}
{item?.name === 'Homily' &&
    <Image 
     style={{ maxHeight: '100%', width: 70, borderRadius:10 }}
        source={require('./../../assets/images/homily.jpg')} 
    />
}
{item?.name === 'Lectures' &&
    <Image 
     style={{ maxHeight: '100%', width: 70, borderRadius:10 }}
        source={require('./../../assets/images/lectures.jpg')} 
    />
}
{item?.name === 'Meditation' &&
    <Image 
     style={{ maxHeight: '100%', width: 70, borderRadius:10 }}
        source={require('./../../assets/images/meditations.jpg')} 
    />
}
{item?.name === 'News' &&
    <Image 
     style={{ maxHeight: '100%', width: 70, borderRadius:10 }}
        source={require('./../../assets/images/news.jpg')} 
    />
}
{item?.name === 'Library' &&
    <Image 
     style={{ maxHeight: '100%', width: 70, borderRadius:10 }}
        source={require('./../../assets/images/library.jpg')} 
    />
}
{item?.name === 'Courses' &&
    <Image 
     style={{ maxHeight: '100%', width: 70, borderRadius:10 }}
        source={require('./../../assets/images/courses.jpg')} 
    />
}
{item?.name === 'Programs' &&
    <Image 
     style={{ maxHeight: '100%', width: 70, borderRadius:10 }}
        source={require('./../../assets/images/programs.jpg')} 
    />
}
{item?.name === 'Daily Rosary' &&
    <Image 
     style={{ maxHeight: '100%', width: 70, borderRadius:10 }}
        source={require('./../../assets/images/dailyRosary.jpg')} 
    />
}
{item?.name === 'Daily Bible' &&
    <Image 
     style={{ maxHeight: '100%', width: 70, borderRadius:10 }}
        source={require('./../../assets/images/dailyBible.jpg')} 
    />
}
{item?.name === 'Night Prayers' &&
    <Image 
     style={{ maxHeight: '100%', width: 70, borderRadius:10 }}
        source={require('./../../assets/images/nightPrayers.jpg')} 
    />
}
{item?.name === 'Bible Explain' &&
    <Image 
     style={{ maxHeight: '100%', width: 70, borderRadius:10 }}
        source={require('./../../assets/images/storiesFromBible.jpg')} 
    />
}
{item?.name === 'القداس' &&
    <Image 
     style={{ maxHeight: '100%', width: 70, borderRadius:10 }}
        source={require('./../../assets/images/mass.jpg')} 
    />
}
{item?.name === 'مواعظ' &&
    <Image 
     style={{ maxHeight: '100%', width: 70, borderRadius:10 }}
        source={require('./../../assets/images/homily.jpg')} 
    />
}
{item?.name === 'محاضرات' &&
    <Image 
     style={{ maxHeight: '100%', width: 70, borderRadius:10 }}
        source={require('./../../assets/images/lectures.jpg')} 
    />
}
{item?.name === 'تأملات' &&
    <Image 
     style={{ maxHeight: '100%', width: 70, borderRadius:10 }}
        source={require('./../../assets/images/meditations.jpg')} 
    />
}
{item?.name === 'الأخبار' &&
    <Image 
     style={{ maxHeight: '100%', width: 70, borderRadius:10 }}
        source={require('./../../assets/images/news.jpg')} 
    />
}
{item?.name === 'المكتبة' &&
    <Image 
     style={{ maxHeight: '100%', width: 70, borderRadius:10 }}
        source={require('./../../assets/images/library.jpg')} 
    />
}
{item?.name === 'كورسات أونلاين' &&
    <Image 
     style={{ maxHeight: '100%', width: 70, borderRadius:10 }}
        source={require('./../../assets/images/courses.jpg')} 
    />
}
{item?.name === 'البرامج' &&
    <Image 
     style={{ maxHeight: '100%', width: 70, borderRadius:10 }}
        source={require('./../../assets/images/programs.jpg')} 
    />
}


                                <View style={{ position: 'relative', zIndex: 1, paddingVertical: 5, paddingHorizontal: 15, }}>

                                    <Text style={{ fontFamily: isRTL ? fonts.arabicMedium : fonts.primaryMedium, color: colors.black, fontSize: 18 }}>{item?.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
                <Image
            source={require('../../assets/images/borderimg.png')} // Path to your local image
            style={{ display: 'flex', justifyContent: 'center', alignSelf: 'center', marginTop: 10, alignItems: 'center', width: '80%' }}
        />
                {/* <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => props.navigation.navigate('QuestionAnswer', { text: isTab })}
                >
                    <View style={{ position: 'relative', zIndex: 1, paddingTop: 5, paddingHorizontal: 15 }}>
                        <Text style={{ fontFamily: isRTL ? fonts.arabicMedium : fonts.primaryMedium, textAlign: 'center', color: colors.black, fontSize: 18 }}>{strings.questionanswer}</Text>
                    </View>
                </TouchableOpacity> */}

                <View style={{ alignItems: 'center', justifyContent: 'space-evenly', gap: 10, marginTop: 20 }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Posts', { item: dailyBible[0] })} activeOpacity={0.8} style={{ height: 50, width: (width - 90) / 2, borderRadius: 25, borderWidth: 1, alignItems: 'center', justifyContent: 'center', borderColor: colors.orange, }}>
                        <Text style={{ fontFamily: isRTL ? fonts.arabicMedium : fonts.primaryMedium, color: colors.orange, fontSize: 12, fontWeight: '700', textAlign: 'center' }}>{strings.DailyBible}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => props.navigation.navigate('Posts', { item: rosaryItem[0] })} activeOpacity={0.8} style={{ height: 50, width: (width - 90) / 2, borderRadius: 25, borderWidth: 1, alignItems: 'center', justifyContent: 'center', borderColor: colors.orange }}>
                        <Text style={{ fontFamily: isRTL ? fonts.arabicMedium : fonts.primaryMedium, color: colors.orange, fontSize: 12, fontWeight: '700', textAlign: 'center' }}>{strings.DailyRosary}</Text>
                    </TouchableOpacity>
                    {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 20, }}> */}
                    <TouchableOpacity onPress={() => props.navigation.navigate('Posts', { item: bibleExplain[0] })} activeOpacity={0.8} style={{ height: 50, width: (width - 90) / 2, borderRadius: 25, borderWidth: 1, alignItems: 'center', justifyContent: 'center', borderColor: colors.orange, }}>
                        <Text style={{ fontFamily: isRTL ? fonts.arabicMedium : fonts.primaryMedium, color: colors.orange, fontSize: 12, fontWeight: '700', textAlign: 'center' }}>{strings.BibleExplain}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Posts', { item: nightPrayers[0] })} activeOpacity={0.8} style={{ height: 50, width: (width - 90) / 2, borderRadius: 22, borderWidth: 1, alignItems: 'center', justifyContent: 'center', borderColor: colors.orange }}>
                        <Text style={{ fontFamily: isRTL ? fonts.arabicMedium : fonts.primaryMedium, color: colors.orange, fontSize: 12, fontWeight: '700', textAlign: 'center' }}>{strings.NightPrayers}</Text>
                    </TouchableOpacity>
                </View>

                {/* </View> */}


                {/* {dailies && <View style={{ paddingHorizontal: 15, marginTop: 15 }}>
                    <MainBox item={dailies} />
                </View>} */}

                {/* {featuredList.length > 0 && <>
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
                </>} */}

                {/* {spiritual.length > 0 && <>
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
                </>} */}

                {/* {biblical.length > 0 && <>
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
                </>} */}

                {/* {audio.length > 0 && <>
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
                    </>} */}


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


                {/* categories section in notes */}

                {/* {news.length > 0 && <>
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
                </>} */}


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


                {/* <TryPlus navigation={props.navigation} /> */}
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
            <View style={{ paddingBottom: 30 }} />
        </ImageBackground>
        <View style={{ paddingBottom: IOS ? 150 : 30 }} />
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
        GetDrawerMenu: bindActionCreators(GetDrawerMenu, dispatch),
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
    homescollview: { flex: 1, paddingVertical: 0 }
});