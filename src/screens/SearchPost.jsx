import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, FlatList, ImageBackground, StyleSheet, ActivityIndicator, Image, TextInput } from "react-native";
import { backgroungImage, colors, fonts, height, isDarkMode, isIPad, isRTL, width } from "../theme";
import { TouchableOpacity } from "react-native-gesture-handler";

import Icon from 'react-native-vector-icons/Feather';
// import PostBox from "../components/PostBox";
// import postslist from "../data/postslist";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import globalstyle from "../theme/style";
import strings from "../localization/translation";
import { GetSearchPost } from "../redux/reducers/ListingApiStateReducer";
import SectionItem from "../components/SectionItem";
import SearchInput from "../components/SearchInput";

const itemslimit = 50;
const SearchPost = (props) => {
    const [searchPosts, setSearchPosts] = useState([]);
    // const [title, setTitle] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(itemslimit);
    const [loadmore, setLoadmore] = useState(false);
    const textInput = useRef();

    useEffect(() => {
        console.log('here 1')
        props.GetSearchPost({ page, limit, title: props?.route?.params?.title })
        setSearchPosts([])
        setLoading(true)
    }, [props?.route?.params?.title])

    useEffect(() => {
        console.log('here 2')
        setSearchPosts([])
        props.GetSearchPost({ page, limit, title: props?.route?.params?.title })
        return () => {
            console.log('Search Unmount');
            setSearchPosts([])
        }
    }, [])

    const prevSearchPostResRef = useRef(props.getSearchPostResponse);
    useEffect(() => {
        if (props.getSearchPostResponse !== prevSearchPostResRef.current && props.getSearchPostResponse?.success && props.getSearchPostResponse?.data.length) {
            prevSearchPostResRef.current = props.getSearchPostResponse;
            setSearchPosts(prevState => [...prevState, ...props.getSearchPostResponse?.data])
            console.log('props.getSearchPostResponse => ', props.getSearchPostResponse)
            setSearchPosts(props.getSearchPostResponse?.data)
            // if (refreshing) setSearchPosts(props.getSearchPostResponse?.data)
            // else setSearchPosts(prevState => [...prevState, ...props.getSearchPostResponse?.data])
        }
        setRefreshing(false)
        setLoading(false)
        // setLoadmore(false)
    }, [props.getSearchPostResponse])

    const _handleRefresh = () => {
        setRefreshing(true)
        setPage(1);
        // setLimit(itemslimit);
        props.GetSearchPost({ page, limit, title: textInput?.current?.value });
    }

    const _handleLoadMore = () => {
        setLoadmore(true)
        setPage(prevState => prevState + 1);
        // props.GetSearchPost({ page: page + 1, limit });
        if (!loadmore) {
            if (searchPosts.length < props.getSearchPostResponse?.total) {
                props.GetSearchPost({ page: page + 1, limit, title: textInput.current.value });
                setLoadmore(false)
            }
        }
    }

    function _onSearch(value) {
        setLoading(true)
        props.GetSearchPost({ page, limit, title: value })
    }

    return <SafeAreaView style={[globalstyle.fullview, {backgroundColor: colors.headerbgcolor, height: height, paddingBottom: 142}]}>
        <Image style={[{ width: width, height: height, position: 'absolute', zIndex: 0 }]} resizeMode="cover" source={backgroungImage} />
        <SearchInput onSearch={_onSearch} value={props?.route?.params?.title} />
        {/* <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical: 15, }}>

        </ScrollView> */}
        {loading && <View style={globalstyle.loadingview}>
            <ActivityIndicator color={isDarkMode ? colors.black : colors.black} style={{ marginBottom: 15 }} />
            <Text style={globalstyle.noproductfound}>{strings.Loading}</Text>
        </View>}
        {!loading && <FlatList
            style={{ paddingHorizontal: 15, paddingBottom: 15 }}
            // horizontal
            // snapToInterval={width / 2}
            // scrollEnabled
            // scrollEventThrottle={16}
            // columnWrapperStyle={{ justifyContent: isIPad ? 'flex-start' : 'space-between' }}
            // numColumns={isIPad ? 3 : 2}
            showsVerticleScrollIndicator={false}
            refreshing={refreshing}
            onRefresh={_handleRefresh}
            ListFooterComponent={() => loadmore ? <View style={globalstyle.footerloadmore}>
                <ActivityIndicator size={Platform.OS == 'android' ? 25 : 'large'} color={colors.primary} />
                <Text style={globalstyle.footerloadingtext}>Loading</Text>
            </View> : <View style={{ height: 20 }} />}
            ListEmptyComponent={() => <View style={globalstyle.loadingview}><Text style={globalstyle.noproductfound}>{strings.NoDataFound}</Text></View>}
            // onEndReachedThreshold={0.8}
            // onEndReached={_handleLoadMore}
            data={searchPosts}
            keyExtractor={(item, index) => String(index)}
            renderItem={({ item, index }) => {
                return (
                    <SectionItem key={index}
                        handlePlayer={() => console.log('asdasd')}
                        postdetail={true}
                        item={item} navigation={props.navigation} width={isIPad ? (width / 2) - 22 : (width) - 100} audio={true} hideicon={true}
                    />
                    // <PostBox key={index} item={item} width={isIPad ? (width / 3) - 20 : (width / 2) - 20} navigation={props.navigation} />
                )
            }}
        />}
    </SafeAreaView >
}

const setStateToProps = (state) => ({
    getSearchPostResponse: state.listingstate.getSearchPostResponse
})

const mapDispatchToProps = (dispatch) => {
    return {
        GetSearchPost: bindActionCreators(GetSearchPost, dispatch)
    }
}

export default connect(setStateToProps, mapDispatchToProps)(SearchPost);

const styles = StyleSheet.create({

})