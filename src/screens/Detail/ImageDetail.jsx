import { ActivityIndicator, FlatList, Image, ImageBackground, RefreshControl, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import globalstyle from "../../theme/style";
import { backgroungImage, colors, fonts, height, isIPad, width } from "../../theme";
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
import { AddToFavouriteList } from "../../redux/reducers/ListingApiStateReducer";
import { showToast } from "../../helpers/toastConfig";

const ImageDetail = (props) => {
    console.log('props.route.params.item => ', props.route.params.item);

    const [refreshing, setRefreshing] = useState(false);
    const [item, setItem] = useState(props.route.params.item);
    const [playing, setPlaying] = useState(true);
    const [isStarted, setStarted] = useState(true);

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
    }, [])

    useEffect(() => {
        setItem(props.route.params.item);
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

    const prevAddToFavouriteListResRef = useRef(props.addToFavouriteListResponse);
    useEffect(() => {
        if (props.addToFavouriteListResponse !== prevAddToFavouriteListResRef.current && props.addToFavouriteListResponse?.success) {
            prevAddToFavouriteListResRef.current = props.addToFavouriteListResponse;
            showToast('success', props.addToFavouriteListResponse.message)
        }
        // setRefreshing(false)
    }, [props.addToFavouriteListResponse])

    // function findvideoid(url) {
    //     var regex = /^(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|v\/|embed\/|shorts\/)?([^\/\?\s&]+)/;

    //     var match = url.match(regex);
    //     var videoId = match ? match[1] : null;
    //     console.log('videoId => ', videoId);
    //     return videoId;  // Output: dQw4w9WgXcQ
    // }

    console.log('item?.images => ', item?.images)

    return (
        <SafeAreaView style={globalstyle.fullview}>
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
                <ImageBackground source={{ uri: item?.image }} style={{ height: 250, overflow: 'hidden', width: '100%', }}>
                    <TouchableOpacity
                        style={{ width: 35, height: 35, backgroundColor: colors.orange, borderRadius: 20, alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 20, right:20 }}
                        onPress={() => props.AddToFavouriteList({ id: item.id })}
                    >
                        <Icon name={'heart'} style={{ color: colors.white, fontSize: 17, marginBottom: -2 }} />
                    </TouchableOpacity>
                </ImageBackground>

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

                    </View>
                    <Text style={globalstyle.detailtitle}>{item?.title}</Text>
                    {/* <Text style={globalstyle.detaildescription}>{item?.description}</Text> */}
                    <Text style={globalstyle.detaildescription}>{item?.description}</Text>

                    <FlatList
                        style={{ marginTop: 15 }}
                        horizontal
                        snapToInterval={(width / 2) + 15}
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
                        renderItem={(imageitem, index) => {
                            console.log('imageitem => ', imageitem)
                            return (<View style={{ width: width / 2.3, height: width / 3, borderRadius: 10, overflow: 'hidden', }}>
                                <Image
                                    source={{ uri: imageitem?.item?.url }}
                                    style={{ width: '100%', height: '100%', }}
                                    defaultSource={require('./../../../assets/images/home-slider-placeholder.png')}
                                />
                            </View>)
                        }}
                    />

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
        </SafeAreaView>
    )
}

const setStateToProps = (state) => ({
    // getSermonDetailResponse: state.detailpagestate.getSermonDetailResponse,
    getPostByCategoryIdResponse: state.listingstate.getPostByCategoryIdResponse,
    addToFavouriteListResponse: state.listingstate.addToFavouriteListResponse,
})
const mapDispatchToProps = (dispatch) => {
    return {
        AddToFavouriteList: bindActionCreators(AddToFavouriteList, dispatch),
    }
}
export default connect(setStateToProps, mapDispatchToProps)(ImageDetail);

const styles = StyleSheet.create({
})