import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, FlatList, ImageBackground, StyleSheet, ActivityIndicator, Image } from "react-native";
import { backgroungImage, colors, fonts, height, isDarkMode, isIPad, width } from "../theme";
import { TouchableOpacity } from "react-native-gesture-handler";

import Icon from 'react-native-vector-icons/Feather';
// import PostBox from "../components/PostBox";
// import postslist from "../data/postslist";
import { ClearPostList, GetPostsList } from "../redux/reducers/ListingApiStateReducer";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import globalstyle from "../theme/style";
// import RoutineBox from "../components/RoutineBox";
import SectionItem from "../components/SectionItem";
import BookItem from "../components/BookItem";
import strings from "../localization/translation";

const itemslimit = 50;
const Posts = (props) => {
    const { item } = props.route.params;
    // console.log('props.route.params => ', props.route.params)
    const [postList, setPostList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [page, setPageno] = useState(1);
    const [category_id, setCategoryId] = useState(props.route.params.item.id)
    const [limit, setLimit] = useState(itemslimit);
    const [loadmore, setLoadmore] = useState(false);

    const prevPostsListResRef = useRef(props.getPostsListResponse);
    const prevItemIdResRef = useRef(item);

    useEffect(() => {
        console.log('asd 1')
        setLoading(true)
        console.log('props.route.params => ', props.route.params)
        props.navigation.setOptions({ headerTitle: item?.name });
        props.GetPostsList({ page, limit, category_id: props.route.params.item.id })
        return () => {
            console.log('Posts Unmount');
            props.ClearPostList()
            // setCategoryId(null)
            setPostList([])
        }
    }, [props.route.params.item.id])

    useEffect(() => {
        console.log('loading => ', loading)
    }, [loading]);

    useEffect(() => {
        console.log('asd 2')
        if (props.getPostsListResponse !== prevPostsListResRef.current && props.getPostsListResponse?.success && props.getPostsListResponse?.data.length) {
            prevPostsListResRef.current = props.getPostsListResponse;
            setPostList(prevState => [...prevState, ...props.getPostsListResponse?.data])
            console.log('props.getPostsListResponse => ', props.getPostsListResponse)
            if (refreshing || prevItemIdResRef.current.value?.id != item?.id) {
                console.log('refreshing')
                setPostList(props.getPostsListResponse?.data)
            }
            else {
                console.log('not refreshing')
                setPostList(prevState => [...prevState, ...props.getPostsListResponse?.data])
            }
            loading && setLoading(false);
        }
        setRefreshing(false)
        // setLoadmore(false)
    }, [props.getPostsListResponse])

    const _handleRefresh = () => {
        setRefreshing(true)
        setPageno(1);
        // setLimit(itemslimit);
        props.GetPostsList({ page, limit, category_id: props.route.params.item.id });
        console.log('_handleLoadMore ');
    }

    const _handleLoadMore = () => {
        setLoadmore(true)
        setPageno(prevState => prevState + 1);
        // props.GetPostsList({ page: page + 1, limit });
        if (!loadmore) {
            if (postList.length < props.getPostsListResponse?.total) {
                console.log('_handleLoadMore ');
                props.GetPostsList({ page: page + 1, limit, category_id: props.route.params.item.id });
                setLoadmore(false)
            }
        }
    }

    return <SafeAreaView style={{ flex: 1 }}>
        <Image style={[{ width: width, height: height, position: 'absolute', zIndex: 0 }]} resizeMode="cover" source={backgroungImage} />
        {loading && <View style={globalstyle.loadingview}>
            <ActivityIndicator color={isDarkMode ? colors.white : colors.black} style={{ marginBottom: 15 }} />
            <Text style={globalstyle.noproductfound}>{strings.Loading}</Text>
        </View>}
        {!loading && <FlatList
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
                <Text style={globalstyle.footerloadingtext}>{strings.Loading}</Text>
            </View> : <View style={{ height: 20 }} />}
            // onEndReachedThreshold={0.8}
            // onEndReached={_handleLoadMore}
            ListEmptyComponent={() => <View style={globalstyle.loadingview}><Text style={globalstyle.noproductfound}>{'No data found'}</Text></View>}
            data={postList}
            keyExtractor={(item, index) => String(index)}
            renderItem={({ item, index }) => {
                if (category_id == 13) {
                    return (<BookItem
                        item={item}
                        width={isIPad ? (width / 3) - 20 : (width / 2) - 22}
                        navigation={props.navigation}
                    />)
                } else {
                    return (<SectionItem
                        key={index}
                        item={item}
                        width={isIPad ? (width / 3) - 20 : (width / 2) - 22}
                        navigation={props.navigation}
                        hideicon={props.route.params.item.id == 10 ? false : true}
                    />)
                }

            }}
        />}
    </SafeAreaView >
}

const setStateToProps = (state) => ({
    getPostsListResponse: state.listingstate.getPostsListResponse
})

const mapDispatchToProps = (dispatch) => {
    return {
        GetPostsList: bindActionCreators(GetPostsList, dispatch),
        ClearPostList: bindActionCreators(ClearPostList, dispatch),
    }
}

export default connect(setStateToProps, mapDispatchToProps)(Posts);

const styles = StyleSheet.create({

})