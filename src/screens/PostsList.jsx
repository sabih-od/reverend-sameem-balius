import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, FlatList, ImageBackground, StyleSheet, ActivityIndicator, Image } from "react-native";
import { backgroungImage, colors, fonts, height, isIPad, width } from "../theme";
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

const SectionTitle = (props) => {
    return (
        <Text style={{ fontFamily: fonts.primarySemiBold, fontSize: 19, marginBottom: 10 }}>{props?.title}</Text>
    )
}

const SectionItems = (props) => {
    const { item, width } = props;
    return (
        <TouchableOpacity
            onPress={() => { }}
            activeOpacity={0.9}
            style={{ width: width, marginBottom: 15 }}
        >
            <ImageBackground source={require('./../../assets/images/sermons-01.jpeg')} style={{ width: '100%', height: width / 1.5, marginBottom: 5, borderRadius: 10, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}>
                {(props?.video || props?.document || props?.audio || props?.image) && <>
                    <View style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.3)' }} />
                    <View style={itemstyle.iconbg}>
                        {props?.video && <Icon name="play" style={[itemstyle.icon, { marginRight: -4 }]} />}
                        {props?.document && <Icon name="file-text" style={itemstyle.icon} />}
                        {props?.audio && <Icon name="mic" style={itemstyle.icon} />}
                        {props?.image && <Icon name="image" style={itemstyle.icon} />}
                    </View>
                </>}
            </ImageBackground>
            <Text style={{ fontFamily: fonts.primary, fontSize: 11, color: '#444' }}>{moment(parseInt(1691195928528)).format("DD MMM, YYYY")}</Text>
            <Text style={{ fontFamily: fonts.primarySemiBold, fontSize: 14 }}>Name Here 01</Text>
            <Text style={{ fontFamily: fonts.primary, fontSize: 11 }} numberOfLines={2}>Loreum ipsum is simply dummy text</Text>
        </TouchableOpacity>
    )
}

const itemstyle = StyleSheet.create({
    iconbg: { width: 35, height: 35, backgroundColor: colors.orange, borderRadius: 30, justifyContent: 'center', alignItems: 'center', },
    icon: { fontSize: 18, color: colors.white }
})

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

    return <SafeAreaView style={globalstyle.fullview}>
        <ImageBackground style={styles.homebgimage} resizeMode="cover" source={backgroungImage}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical: 15, }}>
                <SectionTitle title={strings.Videos} />
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    {[...Array(4).keys()].map((item, index) => {
                        return (<SectionItems width={isIPad ? (width / 3) - 22 : (width / 2) - 22} video={true} />)
                    })}
                </View>
                <View style={{ width: '100%', height: 1, backgroundColor: '#bbb', marginBottom: 15, marginTop: 5 }} />
                <SectionTitle title={strings.Audios} />
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    {[...Array(4).keys()].map((item, index) => {
                        return (<SectionItems width={isIPad ? (width / 3) - 22 : (width / 2) - 22} audio={true} />)
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
                        return (<SectionItems width={isIPad ? (width / 3) - 20 : (width / 2) - 20} />)
                    }}
                /> */}
                <View style={{ width: '100%', height: 1, backgroundColor: '#bbb', marginBottom: 15, marginTop: 5 }} />
                <SectionTitle title={strings.Images} />
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    {[...Array(4).keys()].map((item, index) => {
                        return (<SectionItems width={isIPad ? (width / 3) - 22 : (width / 2) - 22} image={true} />)
                    })}
                </View>

                <View style={{ width: '100%', height: 1, backgroundColor: '#bbb', marginBottom: 15, marginTop: 5 }} />

                <SectionTitle title={strings.Documents} />
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 15 }}>
                    {[...Array(4).keys()].map((item, index) => {
                        return (<SectionItems width={isIPad ? (width / 3) - 22 : (width / 2) - 22} document={true} />)
                    })}
                </View>
            </ScrollView>
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
})