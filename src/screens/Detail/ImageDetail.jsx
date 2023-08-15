import { ActivityIndicator, FlatList, Image, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import globalstyle from "../../theme/style";
import { colors, fonts, isIPad, width } from "../../theme";
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

const ImageDetail = (props) => {
    console.log('props.route.params.item => ', props.route.params.item);

    const [refreshing, setRefreshing] = useState(false);
    const [item, setItem] = useState(props.route.params.item);
    const [playing, setPlaying] = useState(true);
    const [isStarted, setStarted] = useState(true);

    useEffect(() => {
        if (props.route.params.refresh) {
            setRefreshing(true);
            props.GetSermonsDetailApiCall(props.route.params.id)
        }
    }, [props.route.params.refresh])

    const prevProps = useRef(props.getSermonDetailResponse);
    useEffect(() => {
        if (prevProps.current != props.getSermonDetailResponse && props.getSermonDetailResponse?.success && props.getSermonDetailResponse?.data) {
            console.log('props.getSermonDetailResponse?.data => ', props.getSermonDetailResponse?.data);
            setItem(props.getSermonDetailResponse?.data);
        }
        setRefreshing(false);
    }, [props.getSermonDetailResponse])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        props.GetSermonsDetailApiCall(item.id)
        // setTimeout(() => {
        //     setRefreshing(false);
        // }, 2000);
    }, []);

    const _handleStateChanged = (e) => {
        console.log('state change', e);
        if (e == 'unstarted') setStarted(false);
        // else setStarted(false);
    }

    function findvideoid(url) {
        var regex = /^(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|v\/|embed\/|shorts\/)?([^\/\?\s&]+)/;

        var match = url.match(regex);
        var videoId = match ? match[1] : null;
        console.log('videoId => ', videoId);
        return videoId;  // Output: dQw4w9WgXcQ
    }

    console.log('item?.images => ', item?.images)

    return (
        <SafeAreaView style={globalstyle.fullview}>
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
            {/* <Image source={{ uri: item?.image }} style={{ height: 250, overflow: 'hidden', width: '100%', }} /> */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ overflow: 'hidden' }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <Image source={item?.image} style={{ width: width, height: width / 1.6, }} />
                <View style={{ padding: 15, borderTopLeftRadius: 10, }}>
                    <Text style={globalstyle.detaildate}>{moment(parseInt(item?.created_at)).format("DD MMM, YYYY, hh:mm A")}</Text>
                    <Text style={globalstyle.detailtitle}>{item?.title}</Text>
                    {/* <Text style={globalstyle.detaildescription}>{item?.description}</Text> */}
                    <Text style={globalstyle.detaildescription}>{item?.description}</Text>

                    <FlatList
                        style={{ marginTop: 15 }}
                        horizontal
                        snapToInterval={width / 2}
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
                        ItemSeparatorComponent={() => <View style={{width: 15}} />}
                        data={item.images}
                        keyExtractor={(imageitem, index) => String(index)}
                        renderItem={({ imageitem, index }) => {
                            console.log(imageitem)
                            return (<View style={{ width: width / 2, height: width / 1.6, borderRadius: 10, overflow: 'hidden', }}>
                                <Image source={require('./../../../assets/images/sermons-01.jpeg')} style={{ width: '100%', height: '100%', }} />
                            </View>)
                        }}
                    />

                    {/* <View style={{ flexDirection: 'row' }}>
                        {item?.images && item.images.map((itemimages) => <View style={{ width: width / 2, height: width / 1.6, borderRadius: 10, overflow: 'hidden', }}>
                            <Image source={itemimages} style={{ width: '100%', height: '100%', }} />
                        </View>)}
                    </View> */}

                    <View style={{ marginTop: 20, }} />
                    <SectionTitle title={'More Images'} />
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        {[...Array(4).keys()].map((item, index) => {
                            return (<SectionItem key={index} navigation={props.navigation} width={isIPad ? (width / 3) - 22 : (width / 2) - 22} image={true} />)
                        })}
                    </View>
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
    getSermonDetailResponse: state.detailpagestate.getSermonDetailResponse,
})
const mapDispatchToProps = (dispatch) => {
    return {
        GetSermonsDetailApiCall: bindActionCreators(GetSermonsDetailApiCall, dispatch),
    }
}
export default connect(setStateToProps, mapDispatchToProps)(ImageDetail);

const styles = StyleSheet.create({
})