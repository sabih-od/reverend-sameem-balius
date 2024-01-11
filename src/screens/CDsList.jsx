import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, FlatList, ImageBackground, StyleSheet, ActivityIndicator, Image } from "react-native";
import { backgroungImage, colors, fonts, height, isDarkMode, isIPad, isRTL, width } from "../theme";
import { TouchableOpacity } from "react-native-gesture-handler";

import Icon from 'react-native-vector-icons/Feather';
// import PostBox from "../components/PostBox";
// import postslist from "../data/postslist";
import { GetCDsList } from "../redux/reducers/ListingApiStateReducer";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import globalstyle from "../theme/style";
import AudioPlayer from "../components/AudioPlayer";
import TrackPlayer from "react-native-track-player";
import { TrackAddItem, TrackPlay } from "../helpers/track-player";

const itemslimit = 50;
const cdsdata = [
    { id: 1, title: 'Let God Make Your Way', image: 'https://reverendsameembalius.com:3013/uploads/posts/images/mo1z33Djx50V2TR1SUoJ.jpg', desc: 'God cares about and has a plan for your life.' },
    { id: 2, title: 'God Is With You', image: 'https://reverendsameembalius.com:3013/uploads/posts/images/FeuX9rtyac4atGTku9RA.jpg', desc: 'God cares about and has a plan for your life.' },
    { id: 3, title: 'God Keeps His Word', image: 'https://reverendsameembalius.com:3013/uploads/posts/images/sGzAMyHu8GQZ7ozoN2Tz.jpg', desc: 'God cares about and has a plan for your life.' },
    { id: 4, title: 'God Is Working for Your Good', image: 'https://reverendsameembalius.com:3013/uploads/posts/images/4WgreqcWlXS9UTdgo920.jpg', desc: 'God cares about and has a plan for your life.' },
    { id: 5, title: 'God Is With You', image: 'https://reverendsameembalius.com:3013/uploads/posts/images/FeuX9rtyac4atGTku9RA.jpg', desc: 'God cares about and has a plan for your life.' },
    { id: 6, title: 'God Keeps His Word', image: 'https://reverendsameembalius.com:3013/uploads/posts/images/sGzAMyHu8GQZ7ozoN2Tz.jpg', desc: 'God cares about and has a plan for your life.' },

]
const CdItem = ({ item, handlePlayer }) => {
    return <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => handlePlayer(true, item)}
        style={{ width: (width / 2) - 30, alignItems: 'center', paddingVertical: 5 }}>
        <ImageBackground
            source={{ uri: item?.image }}
            style={{ width: width / 2.9, height: width / 2.9, justifyContent: 'center', alignItems: 'center', borderRadius: 120, overflow: 'hidden', marginBottom: 10 }}>
            <View style={{ position: 'absolute', width: '100%', height: '100%', left: 0, top: 0, backgroundColor: colors.black, opacity: 0.3 }} />
            <View style={{ width: 40, height: 40, borderColor: 'rgba(0,0,0,0.4)', borderWidth: 2, borderRadius: 30, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ width: 30, height: 30, backgroundColor: colors.black, borderRadius: 30 }} />
            </View>
        </ImageBackground>
        <Text style={{ fontFamily: isRTL ? fonts.arabicMedium : fonts.primaryMedium, textAlign: 'center', color: isDarkMode ? colors.white : colors.black, fontSize: 15 }} numberOfLines={1}>{item?.title}</Text>
        <Text style={{ fontFamily: isRTL ? fonts.arabicRegular : fonts.primary, textAlign: 'center', color: isDarkMode ? '#eee' : colors.black, fontSize: 13 }} numberOfLines={1}>{item?.desc}</Text>
    </TouchableOpacity>
}

const CDsList = (props) => {
    const { item } = props.route.params;
    console.log('props.route.params => ', props.route.params)
    const [cdsList, setCDsList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [page, setPageno] = useState(1);
    const [limit, setLimit] = useState(itemslimit);
    const [loadmore, setLoadmore] = useState(false);

    const prevCDsListResRef = useRef(props.getCDsListResponse);
    const [category_id, setCategoryId] = useState(item?.id)

    console.log('category_id => ', item)
    useEffect(() => {
        props.GetCDsList({ page, limit, category_id })
        return () => {
            console.log('Announcement Unmount');
            setCDsList([])
        }
    }, [])

    useEffect(() => {
        if (props.getCDsListResponse !== prevCDsListResRef.current && props.getCDsListResponse?.success && props.getCDsListResponse?.data.length) {
            prevCDsListResRef.current = props.getCDsListResponse;
            setCDsList(prevState => [...prevState, ...props.getCDsListResponse?.data])
            console.log('props.getCDsListResponse => ', props.getCDsListResponse)
            if (refreshing || prevCDsListResRef.current.value?.id != item?.id) {
                console.log('refreshing')
                setCDsList(props.getCDsListResponse?.data)
            }
            else {
                console.log('not refreshing')
                setCDsList(prevState => [...prevState, ...props.getCDsListResponse?.data])
            }
            // setCDsList(prevState => [...prevState, ...props.getCDsListResponse?.data])
            // console.log('props.getCDsListResponse => ', props.getCDsListResponse)
            // if (refreshing) setCDsList(props.getCDsListResponse?.data)
            // else setCDsList(prevState => [...prevState, ...props.getCDsListResponse?.data])
        }
        setRefreshing(false)
        // setLoadmore(false)
    }, [props.getCDsListResponse])

    const _handleRefresh = () => {
        setRefreshing(true)
        setPageno(1);
        // setLimit(itemslimit);
        props.GetCDsList({ page, limit, category_id });
        console.log('_handleLoadMore ');
    }

    const _handleLoadMore = () => {
        setLoadmore(true)
        setPageno(prevState => prevState + 1);
        // props.GetCDsList({ page: page + 1, limit, category_id });
        if (!loadmore) {
            if (cdsList.length < props.getCDsListResponse?.total) {
                console.log('_handleLoadMore ');
                props.GetCDsList({ page: page + 1, limit, category_id });
                setLoadmore(false)
            }
        }
    }
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

    return <SafeAreaView style={globalstyle.fullview}>
        {/* <Image style={[{ width: width, height: height, position: 'absolute', zIndex: 0 }]} resizeMode="cover" source={backgroungImage} /> */}

        <ImageBackground style={styles.homebgimage} resizeMode="cover" source={backgroungImage}>
            {showPlayer && <AudioPlayer handleClose={_setShowPlayer} />}
            <FlatList
                style={{ padding: 15, }}
                // horizontal
                // snapToInterval={width / 2}
                // scrollEnabled
                // scrollEventThrottle={16}
                columnWrapperStyle={{ justifyContent: isIPad ? 'flex-start' : 'space-between' }}
                numColumns={isIPad ? 3 : 2}
                showsVerticleScrollIndicator={false}
                refreshing={refreshing}
                onRefresh={_handleRefresh}
                // ListFooterComponent={() => loadmore ? <View style={globalstyle.footerloadmore}>
                //     <ActivityIndicator size={Platform.OS == 'android' ? 25 : 'large'} color={colors.primary} />
                //     <Text style={globalstyle.footerloadingtext}>Loading</Text>
                // </View> : <View style={{ height: 20 }} />}
                // onEndReachedThreshold={0.8}
                // onEndReached={_handleLoadMore}
                // data={cdsdata}
                data={cdsList}
                keyExtractor={(item, index) => String(index)}
                renderItem={({ item, index }) => {
                    return (<CdItem handlePlayer={_setShowPlayer} item={item} navigation={props.navigation} />)
                }}
            />

            {/* <FlatList
            style={{ padding: 15 }}
            // horizontal
            // snapToInterval={width / 2}
            // scrollEnabled
            // scrollEventThrottle={16}
            columnWrapperStyle={{ justifyContent: isIPad ? 'flex-start' : 'space-between' }}
            numColumns={isIPad ? 3 : 2}
            showsVerticleScrollIndicator={false}
            refreshing={refreshing}
            onRefresh={_handleRefresh}
            ListFooterComponent={() => loadmore ? <View style={globalstyle.footerloadmore}>
                <ActivityIndicator size={Platform.OS == 'android' ? 25 : 'large'} color={colors.primary} />
                <Text style={globalstyle.footerloadingtext}>Loading</Text>
            </View> : <View style={{ height: 20 }} />}
            // onEndReachedThreshold={0.8}
            // onEndReached={_handleLoadMore}
            data={cdsList}
            keyExtractor={(item, index) => String(index)}
            renderItem={({ item, index }) => {
                return (<View>
                    <Image source={{uri: 'https://reverendsameembalius.com:3013/uploads/posts/images/mo1z33Djx50V2TR1SUoJ.jpg'}} />
                </View>)
            }}
        /> */}
        </ImageBackground>
    </SafeAreaView>
}

const setStateToProps = (state) => ({
    getCDsListResponse: state.listingstate.getCDsListResponse
})

const mapDispatchToProps = (dispatch) => {
    return {
        GetCDsList: bindActionCreators(GetCDsList, dispatch)
    }
}

export default connect(setStateToProps, mapDispatchToProps)(CDsList);
// export default CDsList;

const styles = StyleSheet.create({
    homebgimage: { flex: 1 }
})