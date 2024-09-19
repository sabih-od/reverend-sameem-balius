import { ActivityIndicator, FlatList, Image, ImageBackground, RefreshControl, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import globalstyle from "../../theme/style";
import { backgroungImage, colors, fonts, height, isDarkMode, isIPad, isRTL, width } from "../../theme";
import moment from "moment";
import Icon from "react-native-vector-icons/Feather";
import Video from "react-native-video";
import { GetSermonsDetailApiCall } from "../../redux/reducers/DetailPageStateReducer";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useEffect, useState, useRef } from "react";
import { useCallback } from "react";
// import YouTube from "react-native-youtube";
import YoutubePlayer from "react-native-youtube-iframe";
import SectionTitle from "../../components/SectionTitle";
import strings from "../../localization/translation";
import SectionItem from "../../components/SectionItem";
import { AddPostToHistory, AddToFavouriteList, GetFavouriteIds } from "../../redux/reducers/ListingApiStateReducer";
import { showToast } from "../../helpers/toastConfig";
import AudioPlayerInner from "../../components/AudioPlayerInner";
import TrackPlayer from "react-native-track-player";
import { TrackAddItem } from "../../helpers/track-player";
import { ImageGallery } from '@georstat/react-native-image-gallery';

const PostDetail = (props) => {
    console.log('props.route.params.item => ', props.route.params.item);

    const [refreshing, setRefreshing] = useState(false);
    const [item, setItem] = useState(props.route.params.item);
    const [playing, setPlaying] = useState(true);
    const [isStarted, setStarted] = useState(true);
    const [isFavourite, setIsFavourite] = useState(false);

    // useEffect(() => {
    //     if (props.route.params.refresh) {
    //         setRefreshing(true);
    //         props.GetSermonsDetailApiCall(props.route.params.id)
    //     }
    // }, [props.route.params.refresh])

    // const prevProps = useRef(props.getSermonDetailResponse);
    // useEffect(() => {
    //     if (prevProps.current != props.getSermonDetailResponse && props.getSermonDetailResponse?.success && props.getSermonDetailResponse?.data) {
    //         console.log('props.getSermonDetailResponse?.data => ', props.getSermonDetailResponse?.data);
    //         setItem(props.getSermonDetailResponse?.data);
    //     }
    //     setRefreshing(false);
    // }, [props.getSermonDetailResponse])

    useEffect(() => {
        // props.navigation.setOptions({
        //     headerTransparent: true,
        // });
        // StatusBar.setTranslucent(true);
        // StatusBar.setBackgroundColor('transparent')
        props.GetFavouriteIds();
        return async () => {
            await TrackPlayer.reset();
        }
    }, [])

    useEffect(() => {
        setItem(props.route.params.item);
        if (item?.id) {
            props.AddPostToHistory({
                user_id: props?.userInfo?.id,
                post_id: item?.id
            })
        }
        const LoadAudio = async () => {
            const reset = await TrackPlayer.reset();
            let queue = await TrackPlayer.getQueue();
            console.log('queue => ', queue)
            if (queue.length == 0) {
                let added = await TrackAddItem(
                    {
                        id: item?.id,
                        url: item?.audio,
                        title: item?.title,
                        artist: 'Light of the Words',
                        artwork: item?.image
                    }
                );
                // await TrackPlay();
            }
        }
        if (item?.audio) {
            LoadAudio()
        }
    }, [props.route.params.item])

    const onRefresh = useCallback(() => {
        // setRefreshing(true);
        // props.GetSermonsDetailApiCall(item.id)
    }, []);

    const _handleStateChanged = (e) => {
        console.log('state change', e);
        if (e == 'unstarted') setStarted(false);
        // else setStarted(false);
    }

    const [postList, setPostList] = useState(null);
    const prevPostsListResRef = useRef(props.getPostsListResponse);
    useEffect(() => {
        if (props.getPostByCategoryIdResponse !== prevPostsListResRef.current && props.getPostByCategoryIdResponse?.success && props.getPostByCategoryIdResponse?.data) {
            prevPostsListResRef.current = props.getPostByCategoryIdResponse;
            // setPostList(prevState => [...prevState, ...props.getPostByCategoryIdResponse?.data])
            console.log('props.getPostByCategoryIdResponse => ', props.getPostByCategoryIdResponse)
            const filteredlist = props.getPostByCategoryIdResponse?.data?.images.filter(x => x.id != props.route.params.item?.id)
            setPostList(filteredlist)
            // if (refreshing) setPostList(props.getPostByCategoryIdResponse?.data)
            // else setPostList(prevState => [...prevState, ...props.getPostByCategoryIdResponse?.data])
        }
        setRefreshing(false)
        // console.log('Object.entries() => ', Object.entries(props.getPostByCategoryIdResponse?.data).map((section, kindex) =>
        //     section[1].map((item, iindex) => console.log('item => ', item))
        // ))
        // setLoadmore(false)
    }, [props.getPostByCategoryIdResponse]);


    const prevFavouriteIdsResRef = useRef(props.getToFavouriteIdsResponse);
    useEffect(() => {
        if (props.getToFavouriteIdsResponse !== prevFavouriteIdsResRef.current && props.getToFavouriteIdsResponse?.success && props.getToFavouriteIdsResponse?.data) {
            prevFavouriteIdsResRef.current = props.getToFavouriteIdsResponse;
            console.log('props.getToFavouriteIdsResponse => ', props.getToFavouriteIdsResponse)
            if (props.getToFavouriteIdsResponse?.data.includes(item.id)) {
                setIsFavourite(true)
            } else {
                setIsFavourite(false)
            }
        }
    }, [props.getToFavouriteIdsResponse]);

    const prevAddToFavouriteListResRef = useRef(props.addToFavouriteListResponse);
    useEffect(() => {
        if (props.addToFavouriteListResponse !== prevAddToFavouriteListResRef.current && props.addToFavouriteListResponse?.success) {
            prevAddToFavouriteListResRef.current = props.addToFavouriteListResponse;
            // showToast('success', props.addToFavouriteListResponse.message)
            props.GetFavouriteIds()
            // setIsFavourite(!isFavourite)
        }
        // setRefreshing(false)
    }, [props.addToFavouriteListResponse])

    function findvideoid(url) {
        console.log('url => ', url)
        // var regex = /^(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|v\/|embed\/|shorts\/)?([^\/\?\s&]+)/;
        // var regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\?\s&]+\/)?(?:live\/)?|youtu\.be\/|youtube\.com\/watch\?)([^\/\?\s&]+)/;
        var regex = /(?:youtu\.be\/|youtube\.com(?:\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|(?:\/(?:live\/)?)))([a-zA-Z0-9_-]{11})/i;

        var match = url.match(regex);
        var videoId = match ? match[1] : null;
        console.log('videoId => ', videoId);
        return videoId;  // Output: dQw4w9WgXcQ
    }

    console.log('item?.images => ', item?.images)
    async function _setShowPlayer(value, item) {
        console.log('value => ', item)
        // {
        //     id: '1',
        //     url: 'https://www.divinerevelations.info/documents/bible/english_mp3_bible/dbs_kjv_bible/12_2_kings.mp3',
        //     title: 'Do not Fear Bad News',
        //     artist: 'Light of the Words',
        //     artwork: 'https://reverendsameembalius.com:3013/uploads/posts/images/4UToGtgL8e4R5ZMeoHLJ.jpg'
        // }
        setShowPlayer(value)
        if (value) {
            const reset = await TrackPlayer.reset();
            let queue = await TrackPlayer.getQueue();
            // console.log('queue => ', queue)
            if (queue.length == 0) {
                let added = await TrackAddItem(
                    {
                        id: item?.id,
                        url: item?.audio,
                        title: item?.title,
                        artist: 'Light of the Words',
                        artwork: item?.image
                    }
                );
                await TrackPlay();
            }
        } else {
            await TrackPlayer.reset()
        }

        // //require('./../../assets/sound/advertising.mp3')
        // var whoosh = new Sound('https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/advertising.mp3', null, (error) => {
        //     if (error) {
        //         console.log('failed to load the sound', error);
        //         return;
        //     }
        //     // loaded successfully
        //     console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());

        //     // Play the sound with an onEnd callback
        //     whoosh.play((success) => {
        //         if (success) {
        //             console.log('successfully finished playing');
        //         } else {
        //             console.log('playback failed due to audio decoding errors');
        //         }
        //     });
        // });
    }
    const [showPlayer, setShowPlayer] = useState(false);

    const [isOpen, setIsOpen] = useState(false);
    const openGallery = (index) => {
        console.log('index => ', index)
        setInitialIndex(index);
        setIsOpen(true)
    };
    const closeGallery = () => setIsOpen(false);
    const [initialIndex, setInitialIndex] = useState(1)
    console.log('initialIndex => ', initialIndex)

    return (
        <SafeAreaView style={[globalstyle.fullview, {backgroundColor: colors.headerbgcolor, height: height, paddingBottom: 80}]}>
            <Image style={[{ width: width, height: height, position: 'absolute', zIndex: 0 }]} resizeMode="cover" source={backgroungImage} />
            {/* {isStarted && <View style={{ height: width / 1.8, justifyContent: 'center', backgroundColor: colors.black, position: 'absolute', zIndex: 1, width: width, left: 0, top: 0 }}>
                <ActivityIndicator color={colors.green} />
            </View>} */}
            {/* <YouTube
                videoId="Gxb8BKoMASc"
                apiKey="AIzaSyDPSZ0cWHpLdZll6bugk-1XANGuQPaQHNs" // Sam Garcia
                onReady={e => console.log('onReady YouTube')}
                onError={e => console.log({ error: e.error })}
                style={{ alignSelf: 'stretch', height: width / 1.6 }}
            /> */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ overflow: 'hidden' }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >

                {item?.url != '' && <View>
                    <YoutubePlayer
                        height={260}
                        play={true}
                        videoId={findvideoid(item.url)}
                        // onChangeState={onStateChange}
                    />
                </View>}
                {item?.video && <Video source={{ uri: item?.video }}
                    autoplay={false}
                    resizeMode={"cover"}
                    style={{
                        height: width / 1.6, width: width, backgroundColor: '#111', // marginLeft: -15, marginRight: -15 
                    }} controls={true}
                />}
                {!item?.video && item?.url == '' && <ImageBackground source={item?.image ? { uri: item?.image } : require('./../../../assets/images/home-slider-placeholder.png')} defaultSource={require('./../../../assets/images/home-slider-placeholder.png')} style={{ height: 250, overflow: 'hidden', width: '100%', }}>
                    <TouchableOpacity
                        style={{ width: 35, height: 35, backgroundColor: colors.orange, borderRadius: 20, alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 20, right: 20 }}
                        onPress={() => props.AddToFavouriteList({ id: item.id })}
                    >
                        <Icon name={'heart'} style={{ color: colors.white, fontSize: 17, marginBottom: -4 }} />
                        {isFavourite && <View style={{ width: 20, height: 1, backgroundColor: colors.white, transform: [{ rotate: '130deg' }, { translateX: -5 }, { translateY: 4 }] }} />}
                    </TouchableOpacity>
                </ImageBackground>}
                {/* <FlatList
                    style={{ marginTop: 0, backgroundColor: colors.black }}
                    horizontal
                    snapToInterval={width}
                    // scrollEnabled
                    // scrollEventThrottle={16}
                    showsHorizontalScrollIndicator={false}
                    // showsVerticleScrollIndicator={false}
                    // refreshing={refreshing}
                    // onRefresh={_handleRefresh}
                    // ListFooterComponent={() => loadmore ? <View style={globalstyle.footerloadmore}>
                    //     <ActivityIndicator size={Platform.OS == 'android' ? 25 : 'large'} color={colors.primary} />
                    //     <Text style={globalstyle.footerloadingtext}>Loading</Text>
                    // </View> : <View style={{ height: 20 }} />}
                    // onEndReachedThreshold={0.8}
                    // onEndReached={_handleLoadMore}
                    // ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
                    data={item?.images}
                    keyExtractor={(imageitem, index) => String(index)}
                    renderItem={(imageitem, index) => {
                        console.log('imageitem => ', imageitem)
                        return (<View style={{ width: width, height: width / 1.5, }}>
                            <Image
                                source={{ uri: imageitem?.item?.url }}
                                style={{ width: '100%', height: '100%', }}
                                defaultSource={require('./../../../assets/images/home-slider-placeholder.png')}
                            />
                        </View>)
                    }}
                /> */}
                {/* <Image
                    source={{ uri: item?.image }}
                    style={{ width: width, height: width / 1.6, }}
                    defaultSource={require('./../../../assets/images/home-slider-placeholder.png')}
                /> */}
                <View style={{ padding: 15, borderTopLeftRadius: 10, }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={globalstyle.detaildate}>{moment(parseInt(item?.created_at)).format("DD MMM, YYYY, hh:mm A")}</Text>
                        {item?.video && <TouchableOpacity
                            style={{ width: 35, height: 35, backgroundColor: colors.orange, borderRadius: 20, alignItems: 'center', justifyContent: 'center', }}
                            onPress={() => props.AddToFavouriteList({ id: item.id })}
                        >
                            <Icon name={'heart'} style={{ color: colors.white, fontSize: 17, marginBottom: -4 }} />
                            {isFavourite && <View style={{ width: 20, height: 1, backgroundColor: colors.white, transform: [{ rotate: '130deg' }, { translateX: -5 }, { translateY: 4 }] }} />}
                        </TouchableOpacity>}

                    </View>
                    <Text style={globalstyle.detailtitle}>{item?.title}</Text>
                    {/* <Text style={globalstyle.detaildescription}>{item?.description}</Text> */}
                    <Text style={globalstyle.detaildescription}>{item?.description}</Text>

                    <FlatList
                        style={{ marginTop: 15 }}
                        horizontal
                        snapToInterval={(width)}
                        // scrollEnabled
                        // scrollEventThrottle={16}
                        showsHorizontalScrollIndicator={false}
                        // showsVerticleScrollIndicator={false}
                        // refreshing={refreshing}
                        // onRefresh={_handleRefresh}
                        // ListFooterComponent={() => loadmore ? <View style={globalstyle.footerloadmore}>
                        //     <ActivityIndicator size={Platform.OS == 'android' ? 25 : 'large'} color={colors.primary} />
                        //     <Text style={globalstyle.footerloadingtext}>Loading</Text>
                        // </View> : <View style={{ height: 20 }} />}
                        // onEndReachedThreshold={0.8}
                        // onEndReached={_handleLoadMore}
                        ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
                        data={item?.images}
                        keyExtractor={(imageitem, index) => String(index)}
                        renderItem={(imageitem) => {
                            console.log('imageitem => ', imageitem?.item?.url)
                            return (<TouchableOpacity activeOpacity={1} style={{ width: width / 2.3, height: width / 2, borderRadius: 10, overflow: 'hidden', }}>
                                <Image
                                    source={{ uri: imageitem?.item?.url }}
                                    style={{ width: '100%', height: '100%', }}
                                    defaultSource={require('./../../../assets/images/home-slider-placeholder.png')}
                                />
                            </TouchableOpacity>)
                        }}
                    />
                    <ImageGallery
                        close={closeGallery}
                        isOpen={isOpen}
                        initialIndex={initialIndex}
                        thumbColor={colors.orange}
                        images={item?.images}
                    />

                    <View style={{ height: 30 }} />
                    {item?.audio && <>
                        <View style={styles.seperator} />
                        <SectionTitle title={strings.Audios} />
                        <AudioPlayerInner />
                        <View style={{ height: 20 }} />
                        {/* <SectionItem
                            handlePlayer={_setShowPlayer}
                            item={item} navigation={props.navigation} width={isIPad ? (width / 2) - 22 : (width) - 22} audio={true} /> */}
                    </>}
                    {/* {item?.video && <>
                        <View style={styles.seperator} />
                        <SectionTitle title={strings.Videos} />

                        {!item?.video && <View style={{
                            width: width, height: width / 1.8, backgroundColor: isDarkMode ? colors.deepblue : colors.white,
                            alignItems: 'center', justifyContent: 'center'
                        }}>
                            <Text style={{ color: isDarkMode ? colors.white : colors.black, fontFamily: isRTL ? fonts.arabicRegular : fonts.primary }}>{strings.videoNotFound}</Text>
                        </View>}
                        {item?.video && <Video source={{ uri: item?.video }}
                            autoplay={false}
                            style={{ height: width / 1.6, marginLeft: -15, marginRight: -15 }} controls={true} />}
                    </>} */}

                    {/* <View style={{ flexDirection: 'row' }}>
                        {item?.images && item.images.map((itemimages) => <View style={{ width: width / 2, height: width / 1.6, borderRadius: 10, overflow: 'hidden', }}>
                            <Image source={itemimages} style={{ width: '100%', height: '100%', }} />
                        </View>)}
                    </View> */}

                    {/* {postList != null && Array.isArray(postList) && postList.length > 0 && <>
                        <View style={{ marginTop: 20, }} />
                        <SectionTitle title={strings.MoreImages} />
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                            {postList.map((item, index) => <SectionItem key={index} item={item} navigation={props.navigation} width={isIPad ? (width / 3) - 22 : (width / 2) - 22} image={true} />)}
                        </View>
                    </>} */}


                    {/* <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        {[...Array(4).keys()].map((item, index) => {
                            return (<SectionItem key={index} navigation={props.navigation} width={isIPad ? (width / 3) - 22 : (width / 2) - 22} image={true} />)
                        })}
                    </View> */}
                </View>
                {/* <YouTube
                    videoId="VI9yRXbNyn8"
                    // apiKey="YOUR_YOUTUBE_API_KEY"
                    style={{ alignSelf: 'stretch', height: width / 1.90 }}
                /> */}
                {/* <Video source={{ uri: item?.media }} style={{ width: width - 30, height: 200 }} controls={true} /> */}
            </ScrollView>
            {/* {showPlayer && <AudioPlayer handleClose={_setShowPlayer} />} */}
        </SafeAreaView>
    )
}

const setStateToProps = (state) => ({
    // getSermonDetailResponse: state.detailpagestate.getSermonDetailResponse,
    getPostByCategoryIdResponse: state.listingstate.getPostByCategoryIdResponse,
    addToFavouriteListResponse: state.listingstate.addToFavouriteListResponse,
    getToFavouriteIdsResponse: state.listingstate.getToFavouriteIdsResponse,
    userInfo: state.appstate.userInfo,
})
const mapDispatchToProps = (dispatch) => {
    return {
        AddToFavouriteList: bindActionCreators(AddToFavouriteList, dispatch),
        AddPostToHistory: bindActionCreators(AddPostToHistory, dispatch),
        GetFavouriteIds: bindActionCreators(GetFavouriteIds, dispatch)
    }
}
export default connect(setStateToProps, mapDispatchToProps)(PostDetail);

const styles = StyleSheet.create({
})