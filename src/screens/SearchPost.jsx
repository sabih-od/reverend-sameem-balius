import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, FlatList, ImageBackground, StyleSheet, ActivityIndicator, Image, TextInput } from "react-native";
import { backgroungImage, colors, fonts, height, isIPad, isRTL, width } from "../theme";
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

const itemslimit = 50;
const SearchPost = (props) => {
    const [searchPosts, setSearchPosts] = useState([]);
    const [title, setTitle] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [pageno, setPageno] = useState(1);
    const [limit, setLimit] = useState(itemslimit);
    const [loadmore, setLoadmore] = useState(false);

    const prevSearchPostResRef = useRef(props.getSearchPostResponse);

    useEffect(() => {
        setTitle(props.route.params.title)
    }, [props.route.params.title])

    useEffect(() => {
        props.GetSearchPost({ pageno, limit, title })
        return () => {
            console.log('Announcement Unmount');
            setSearchPosts([])
        }
    }, [])

    useEffect(() => {
        if (props.getSearchPostResponse !== prevSearchPostResRef.current && props.getSearchPostResponse?.success && props.getSearchPostResponse?.data.length) {
            prevSearchPostResRef.current = props.getSearchPostResponse;
            setSearchPosts(prevState => [...prevState, ...props.getSearchPostResponse?.data])
            console.log('props.getSearchPostResponse => ', props.getSearchPostResponse)
            if (refreshing) setSearchPosts(props.getSearchPostResponse?.data)
            else setSearchPosts(prevState => [...prevState, ...props.getSearchPostResponse?.data])
        }
        setRefreshing(false)
        // setLoadmore(false)
    }, [props.getSearchPostResponse])

    const _handleRefresh = () => {
        setRefreshing(true)
        setPageno(1);
        // setLimit(itemslimit);
        props.GetSearchPost({ pageno, limit, title });
        console.log('_handleLoadMore ');
    }

    const _handleLoadMore = () => {
        setLoadmore(true)
        setPageno(prevState => prevState + 1);
        // props.GetSearchPost({ pageno: pageno + 1, limit });
        if (!loadmore) {
            if (searchPosts.length < props.getSearchPostResponse?.total) {
                console.log('_handleLoadMore ');
                props.GetSearchPost({ pageno: pageno + 1, limit, title });
                setLoadmore(false)
            }
        }
    }

    return <SafeAreaView style={globalstyle.fullview}>
        <Image style={[{ width: width, height: height, position: 'absolute', zIndex: 0 }]} resizeMode="cover" source={backgroungImage} />
        <View style={{ width: width - 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 15, marginVertical: 15 }}>
            <TextInput
                placeholder={strings.SearchHere}
                placeholderTextColor={'#777'}
                style={{ fontFamily: isRTL ? fonts.arabicMedium : fonts.primary, height: 42, backgroundColor: '#f7f7f7', width: width - 70, color: colors.black, fontSize: 14, paddingHorizontal: 15, paddingVertical: 10, textAlign: isRTL ? 'right' : 'left' }}
            />
            <TouchableOpacity
                onPress={() => props.navigation.navigate('SearchPost')}
                style={{ width: 42, height: 42, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.orange }}
            >
                <Icon name="search" style={{ fontSize: 18, color: colors.white }} />
            </TouchableOpacity>
        </View>
        {/* <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical: 15, }}>

        </ScrollView> */}
        <FlatList
            style={{ padding: 15 }}
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
        />
    </SafeAreaView>
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