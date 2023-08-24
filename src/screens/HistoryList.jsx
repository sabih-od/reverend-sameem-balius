import { FlatList, Image, ImageBackground, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import globalstyle from "../theme/style";
import { backgroungImage, colors, fonts, isIPad, width } from "../theme";
import Icon from "react-native-vector-icons/Feather";
import nightroutine from "../data/nightly-routines";
import RoutineBoxHorizontal from "../components/RoutineBoxHorizontal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { GetHistoryList } from "../redux/reducers/ListingApiStateReducer";
import { useEffect, useRef, useState } from "react";
import SectionItem from "../components/SectionItem";

const IMAGE_WIDTH = width / 2;

const HistoryList = (props) => {

    const [favouriteList, setFavouriteList] = useState([]);
    const prevHistoryListResRef = useRef(props.getHistoryListResponse);

    useEffect(() => {
        props.GetHistoryList();
    }, [])

    useEffect(() => {
        if (props.getHistoryListResponse !== prevHistoryListResRef.current && props.getHistoryListResponse?.success && props.getHistoryListResponse?.data) {
            prevHistoryListResRef.current = props.getHistoryListResponse;
            // setPostList(prevState => [...prevState, ...props.getHistoryListResponse?.data])
            console.log('props.getHistoryListResponse => ', props.getHistoryListResponse)
            setFavouriteList(props.getHistoryListResponse?.data)
        }
    }, [props.getHistoryListResponse])

    return <SafeAreaView style={globalstyle.fullview}>
        <ImageBackground style={styles.homebgimage} resizeMode="cover" source={backgroungImage}>
            <ScrollView style={{ paddingHorizontal: 15, paddingVertical: 15, width: width - 20 }}>
                <View>
                    {favouriteList.map((item, index) => {
                        return <SectionItem key={index} handlePlayer={() => console.log('asdasd')} item={item} navigation={props.navigation} width={isIPad ? (width / 2) - 22 : (width) - 100} audio={true} hideicon={true} />
                    })}
                </View>
            </ScrollView>
        </ImageBackground>
    </SafeAreaView>
}

const setStateToProps = state => ({
    getHistoryListResponse: state.listingstate.getHistoryListResponse
})

const mapDispatchToProps = dispatch => {
    return {
        GetHistoryList: bindActionCreators(GetHistoryList, dispatch)
    }
}

export default connect(setStateToProps, mapDispatchToProps)(HistoryList);

const styles = StyleSheet.create({
    homebgimage: { flex: 1, paddingHorizontal: 15 },
    homescollview: { flex: 1, paddingVertical: 15 }
})