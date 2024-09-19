import React, { useEffect, useRef, useState } from "react";
import { FlatList, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { Icon } from "react-native-vector-icons/Feather"
import { backgroungImage, colors, fonts, height, width } from "../theme";
import NotificationItem from "../components/NotificationItem";
import notificationslist from "../data/notifications-list";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { UpdateNotificationBadge } from "../redux/reducers/AppStateReducer";
import { GetNotificationsList } from "../redux/reducers/ListingApiStateReducer";
import globalstyle from "../theme/style";

const itemslimit = 50;
const Notifications = (props) => {
    const [notificationList, setNotificationList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [pageno, setPageno] = useState(1);
    const [limit, setLimit] = useState(itemslimit);
    const [loadmore, setLoadmore] = useState(false);
    const prevGetNotificationsListResponseRef = useRef(props.getNotificationsListResponse);

    useEffect(() => {
        props.UpdateNotificationBadge(0);
        props.GetNotificationsList({ pageno, limit });
        return () => {
            console.log('NotificationList Unmount');
            setNotificationList([])
        }
    }, []);

    useEffect(() => {
        // console.log('props.getNotificationsListResponse => ', props.getNotificationsListResponse);
        if (props.getNotificationsListResponse !== prevGetNotificationsListResponseRef.current && props.getNotificationsListResponse?.success && props.getNotificationsListResponse?.data) {
            prevGetNotificationsListResponseRef.current = props.getNotificationsListResponse;
            console.log('props.getNotificationsListResponse => ', props.getNotificationsListResponse);
            if (refreshing) setNotificationList(props.getNotificationsListResponse?.data)
            else setNotificationList(prevState => [...prevState, ...props.getNotificationsListResponse?.data])
        }
        setRefreshing(false)
        // setLoadmore(false)
    }, [props.getNotificationsListResponse])

    const _handleRefresh = () => {
        setRefreshing(true)
        setPageno(1);
        // setLimit(itemslimit);
        props.GetNotificationsList({ pageno, limit });
        console.log('_handleRefresh ');
    }

    const _handleLoadMore = () => {
        setLoadmore(true)
        setPageno(prevState => prevState + 1);
        // props.GetOurSpeakerList({ pageno: pageno + 1, limit });
        if (!loadmore) {
            if (notificationList.length < props.getNotificationsListResponse.total) {
                console.log('_handleLoadMore ');
                props.GetNotificationsList({ pageno: pageno + 1, limit });
                setLoadmore(false)
            }
        }
    }

    return <SafeAreaView style={[globalstyle.fullview, {backgroundColor: colors.headerbgcolor, height: height}]}>

        <Image style={[{ width: width, height: height, position: 'absolute', zIndex: 0 }]} resizeMode="cover" source={backgroungImage} />
        {/* <ScrollView style={{ padding: 15 }}> */}
        <FlatList
            style={{ padding: 15 }}
            // horizontal
            // snapToInterval={width / 2}
            // scrollEnabled
            // scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            // onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }],
            //     { useNativeDriver: false }
            // )}
            refreshing={refreshing}
            onRefresh={_handleRefresh}
            data={notificationList}
            keyExtractor={item => String(item.id)}
            renderItem={({ item, index }) => {
                return (<NotificationItem key={index} item={item} navigation={props.navigation} />)
            }}
        />
        {/* {notificationList.map(({ item, index }) => {
                return <NotificationItem key={index} />
            })} */}
        {/* </ScrollView> */}
    </SafeAreaView>
}

const setStateToProps = (state) => ({
    userInfo: state.appstate.userInfo,
    getNotificationsListResponse: state.listingstate.getNotificationsListResponse,
})
const mapDispatchToProps = (dispatch) => {
    return {
        UpdateNotificationBadge: bindActionCreators(UpdateNotificationBadge, dispatch),
        GetNotificationsList: bindActionCreators(GetNotificationsList, dispatch)
    }
}

export default connect(setStateToProps, mapDispatchToProps)(Notifications);