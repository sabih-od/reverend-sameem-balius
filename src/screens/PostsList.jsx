import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, FlatList, ImageBackground, StyleSheet, ActivityIndicator, Image, I18nManager, Platform } from "react-native";
import { backgroungImage, colors, fonts, height, isDarkMode, isIPad, isRTL, textAlign, width } from "../theme";
import { TouchableOpacity } from "react-native-gesture-handler";

import Icon from 'react-native-vector-icons/Feather';
// import PostBox from "../components/PostBox";
// import postslist from "../data/postslist";
import { GetPostByCategoryId, GetPostsList } from "../redux/reducers/ListingApiStateReducer";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import globalstyle from "../theme/style";
import moment from "moment";
import strings, { changeLang } from "./../localization/translation";
import { useNavigation } from "@react-navigation/native";
import SectionItem from "../components/SectionItem";
import SectionTitle from "../components/SectionTitle";
import itemobject from "../data/itemobject";
import { TrackAddItem, TrackPlay } from "../helpers/track-player";
import AudioPlayer from "../components/AudioPlayer";
import TrackPlayer from "react-native-track-player";
// import Sound from "react-native-sound";




const itemslimit = 50;
const PostsList = (props) => {
    const [postList, setPostList] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [pageno, setPageno] = useState(1);
    const [limit, setLimit] = useState(itemslimit);
    const [loadmore, setLoadmore] = useState(false);

    const { item } = props.route.params
    useEffect(() => {
        props.navigation.setOptions({ headerTitle: item?.name });
        props.GetPostByCategoryId({ id: item.id })

    }, [item])


    useEffect(() => {
        // props.GetPostsList({ pageno, limit })
        // return () => {
        //     console.log('Announcement Unmount');
        //     setPostList([])
        // }
        return () => {
            console.log('Unmount');
            setPostList([])
        }
    }, [])

    async function _setShowPlayer(value, item) {
        console.log('value => ', item)
        // {
        //     id: '1',
        //     url: 'https://www.divinerevelations.info/documents/bible/english_mp3_bible/dbs_kjv_bible/12_2_kings.mp3',
        //     title: 'Do not Fear Bad News',
        //     artist: 'Reverend Sameem Balius',
        //     artwork: 'https://service.demowebsitelinks.com:3013/uploads/posts/images/4UToGtgL8e4R5ZMeoHLJ.jpg'
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
                        artist: 'Reverend Sameem Balius',
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

    const prevPostsListResRef = useRef(props.getPostsListResponse);
    useEffect(() => {
        if (props.getPostByCategoryIdResponse !== prevPostsListResRef.current && props.getPostByCategoryIdResponse?.success && props.getPostByCategoryIdResponse?.data) {
            prevPostsListResRef.current = props.getPostByCategoryIdResponse;
            // setPostList(prevState => [...prevState, ...props.getPostByCategoryIdResponse?.data])
            console.log('props.getPostByCategoryIdResponse => ', props.getPostByCategoryIdResponse)
            setPostList(props.getPostByCategoryIdResponse?.data)
            // if (refreshing) setPostList(props.getPostByCategoryIdResponse?.data)
            // else setPostList(prevState => [...prevState, ...props.getPostByCategoryIdResponse?.data])
        }
        setRefreshing(false)
        // console.log('Object.entries() => ', Object.entries(props.getPostByCategoryIdResponse?.data).map((section, kindex) =>
        //     section[1].map((item, iindex) => console.log('item => ', item))
        // ))
        // setLoadmore(false)
    }, [props.getPostByCategoryIdResponse])

    const _handleRefresh = () => {
        // setRefreshing(true)
        // setPageno(1);
        // // setLimit(itemslimit);
        // props.GetPostsList({ pageno, limit });
        // console.log('_handleLoadMore ');
    }

    useEffect(() => {
        console.log('postList => ', postList)
    }, [postList])

    const _handleLoadMore = () => {
        // setLoadmore(true)
        // setPageno(prevState => prevState + 1);
        // // props.GetPostsList({ pageno: pageno + 1, limit });
        // if (!loadmore) {
        //     if (postList.length < props.getPostsListResponse?.total) {
        //         console.log('_handleLoadMore ');
        //         props.GetPostsList({ pageno: pageno + 1, limit });
        //         setLoadmore(false)
        //     }
        // }
    }

    const [showPlayer, setShowPlayer] = useState(false);

    return <SafeAreaView style={globalstyle.fullview}>
        <ImageBackground style={styles.homebgimage} resizeMode="cover" source={backgroungImage}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical: 15, }}>
                {postList != null && Array.isArray(postList?.videos) && postList?.videos.length > 0 && <>
                    <SectionTitle title={strings.Videos} />
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        {postList?.videos.map((item, index) => <SectionItem key={index} item={item} navigation={props.navigation} width={isIPad ? (width / 3) - 22 : (width / 2) - 22} video={true} />)}
                        {/* {[...Array(4).keys()].map((item, index) => {
                        return (<SectionItem key={index} navigation={props.navigation} width={isIPad ? (width / 3) - 22 : (width / 2) - 22} video={true} />)
                    })} */}
                    </View>
                </>}
                {postList != null && Array.isArray(postList?.audios) && postList?.audios.length > 0 && <>
                    <View style={styles.seperator} />
                    <SectionTitle title={strings.Audios} />
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        {postList?.audios.map((item, index) => <SectionItem key={index} handlePlayer={_setShowPlayer} item={item} navigation={props.navigation} width={isIPad ? (width / 2) - 22 : (width) - 22} audio={true} />)}
                        {/* {[...Array(4).keys()].map((item, index) => {
                        return (<SectionItem key={index} handlePlayer={setShowPlayer} navigation={props.navigation} width={isIPad ? (width / 2) - 22 : (width) - 22} audio={true} />)
                    })} */}
                    </View>
                </>}
                {/* <FlatList
                    // style={{ padding: 15 }}
                    // horizontal
                    // snapToInterval={width / 2}
                    // scrollEnabled
                    // scrollEventThrottle={16}
                    columnWrapperStyle={{ justifyContent: isIPad ? 'flex-start' : 'space-between' }}
                    numColumns={isIPad ? 3 : 2}
                    // showsVerticleScrollIndicator={false}
                    // refreshing={refreshing}
                    // onRefresh={_handleRefresh}
                    // ListFooterComponent={() => loadmore ? <View style={globalstyle.footerloadmore}>
                    //     <ActivityIndicator size={Platform.OS == 'android' ? 25 : 'large'} color={colors.primary} />
                    //     <Text style={globalstyle.footerloadingtext}>Loading</Text>
                    // </View> : <View style={{ height: 20 }} />}
                    // onEndReachedThreshold={0.8}
                    // onEndReached={_handleLoadMore}
                    data={[...Array(4).keys()]}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={({ item, index }) => {
                        return (<SectionItem key={index} navigation={props.navigation} width={isIPad ? (width / 3) - 20 : (width / 2) - 20} />)
                    }}
                /> */}
                {postList != null && Array.isArray(postList?.images) && postList?.images.length > 0 && <>
                    <View style={styles.seperator} />
                    <SectionTitle title={strings.Images} />
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        {postList?.images.map((item, index) => <SectionItem key={index} item={item} navigation={props.navigation} width={isIPad ? (width / 3) - 22 : (width / 2) - 22} image={true} />)}
                        {/* {[...Array(4).keys()].map((item, index) => {
                        return (<SectionItem key={index} navigation={props.navigation} width={isIPad ? (width / 3) - 22 : (width / 2) - 22} image={true} />)
                    })} */}
                    </View>
                </>
                }
                {postList != null && Array.isArray(postList?.pdfs) && postList?.pdfs.length > 0 && <>
                    <View style={styles.seperator} />
                    <SectionTitle title={strings.Documents} />
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 15 }}>
                        {postList != null && Array.isArray(postList?.pdfs) && postList?.pdfs.length > 0 && postList?.pdfs.map((item, index) => <SectionItem key={index} item={item} navigation={props.navigation} width={isIPad ? (width / 3) - 22 : (width / 2) - 22} document={true} />)}
                        {/* {[...Array(4).keys()].map((item, index) => {
                        return (<SectionItem key={index} navigation={props.navigation} width={isIPad ? (width / 3) - 22 : (width / 2) - 22} document={true} />)
                    })} */}
                    </View>
                </>}
            </ScrollView>
            {showPlayer && <AudioPlayer handleClose={_setShowPlayer} />}
        </ImageBackground>
    </SafeAreaView >
}

const setStateToProps = (state) => ({
    getPostByCategoryIdResponse: state.listingstate.getPostByCategoryIdResponse,
})

const mapDispatchToProps = (dispatch) => {
    return {
        GetPostsList: bindActionCreators(GetPostsList, dispatch),
        GetPostByCategoryId: bindActionCreators(GetPostByCategoryId, dispatch),
    }
}

export default connect(setStateToProps, mapDispatchToProps)(PostsList);

const styles = StyleSheet.create({
    homebgimage: { paddingHorizontal: 15, flex: 1 },
    seperator: { width: '100%', height: 1, backgroundColor: isDarkMode ? 'rgba(0,0,0,0.2)' : '#bbb', marginBottom: 15, marginTop: 5 },
})