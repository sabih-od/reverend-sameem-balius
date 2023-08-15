import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, FlatList, ImageBackground, StyleSheet, ActivityIndicator, Image, I18nManager } from "react-native";
import { backgroungImage, colors, fonts, height, isIPad, isRTL, textAlign, width } from "../theme";
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




const itemslimit = 50;
const PostsList = (props) => {
    const [postList, setPostList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [pageno, setPageno] = useState(1);
    const [limit, setLimit] = useState(itemslimit);
    const [loadmore, setLoadmore] = useState(false);

    const { item } = props.route.params
    useEffect(() => {
        props.navigation.setOptions({ headerTitle: item?.name });
        props.GetPostByCategoryId({ id: item.id })
        return () => {
            console.log('Unmount');
            setPostList([])
        }
    }, [])

    const prevPostsListResRef = useRef(props.getPostsListResponse);

    useEffect(() => {
        // props.GetPostsList({ pageno, limit })
        // return () => {
        //     console.log('Announcement Unmount');
        //     setPostList([])
        // }
    }, [])

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
        // setLoadmore(false)
    }, [props.getPostByCategoryIdResponse])

    const _handleRefresh = () => {
        // setRefreshing(true)
        // setPageno(1);
        // // setLimit(itemslimit);
        // props.GetPostsList({ pageno, limit });
        // console.log('_handleLoadMore ');
    }

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
                <SectionTitle title={strings.Videos} />
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    {[...Array(4).keys()].map((item, index) => {
                        return (<SectionItem key={index} navigation={props.navigation} width={isIPad ? (width / 3) - 22 : (width / 2) - 22} video={true} />)
                    })}
                </View>
                <View style={styles.seperator} />
                <SectionTitle title={strings.Audios} />
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    {[...Array(4).keys()].map((item, index) => {
                        return (<SectionItem key={index} handlePlayer={setShowPlayer} navigation={props.navigation} width={isIPad ? (width / 2) - 22 : (width) - 22} audio={true} />)
                    })}
                </View>
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
                <View style={styles.seperator} />
                <SectionTitle title={strings.Images} />
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    {[...Array(4).keys()].map((item, index) => {
                        return (<SectionItem key={index} navigation={props.navigation} width={isIPad ? (width / 3) - 22 : (width / 2) - 22} image={true} />)
                    })}
                </View>
                <View style={styles.seperator} />
                <SectionTitle title={strings.Documents} />
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 15 }}>
                    {[...Array(4).keys()].map((item, index) => {
                        return (<SectionItem key={index} navigation={props.navigation} width={isIPad ? (width / 3) - 22 : (width / 2) - 22} document={true} />)
                    })}
                </View>
            </ScrollView>

            {showPlayer && <View style={{ position: 'absolute', bottom: 0, left: 0, width: width }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <View style={{ flex: 0.3, backgroundColor: colors.orange, height: 4 }} />
                    <View style={{ flex: 0.7, backgroundColor: '#999', height: 4 }} />
                </View>
                <View style={{
                    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10,
                    // backgroundColor: colors.headerbgcolor,
                    backgroundColor: colors.black,
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <TouchableOpacity
                            style={{ width: 25, height: 70, alignItems: 'center', justifyContent: 'center' }}
                            activeOpacity={0.8}
                            onPress={() => setShowPlayer(false)}
                        >
                            <Icon name="x" style={{ color: colors.white, fontSize: 16 }} />
                        </TouchableOpacity>
                        <Image source={require('./../../assets/images/sermons-01.jpeg')} style={{ width: 70, height: 70, borderRadius: 15, marginRight: 10 }} />
                        <View style={{ width: width - 180 }}>
                            <Text numberOfLines={1} style={{ fontFamily: fonts.primarySemiBold, textAlign: 'left', fontSize: isRTL ? 17 : 15, marginBottom: 2, color: colors.white, fontFamily: isRTL ? fonts.arabicBold : fonts.primary }}>{strings.posttitle}</Text>
                            <Text numberOfLines={1} style={{ fontFamily: fonts.primary, textAlign: 'left', color: '#333', fontSize: 13, marginBottom: 2, color: colors.white, fontFamily: isRTL ? fonts.arabicRegular : fonts.primary }}>{strings.postdesc}</Text>
                            <Text style={{ fontFamily: fonts.primary, color: colors.white, fontSize: 12, textAlign: 'left', }}>01:13 - 03:43</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => { }}
                        activeOpacity={0.9}
                        style={{ width: 40, height: 40, backgroundColor: colors.orange, marginRight: 10, borderRadius: 30, justifyContent: 'center', alignItems: 'center', }}
                    >
                        <Icon name="play" style={[{ fontSize: 18, color: colors.white }, isRTL ? { marginLeft: -4 } : { marginRight: -4 }]} />
                    </TouchableOpacity>
                </View>
            </View>}

        </ImageBackground>
    </SafeAreaView>
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
    homebgimage: {
        // paddingTop: IOS ? 45 : 70,
        // paddingTop: IOS ? 100 : 70,
        paddingHorizontal: 15,
        flex: 1, // justifyContent: 'space-between',
        // ...StyleSheet.absoluteFillObject,
        // height: height, resizeMode: 'cover'
    },
    seperator: { width: '100%', height: 1, backgroundColor: '#bbb', marginBottom: 15, marginTop: 5 },
})