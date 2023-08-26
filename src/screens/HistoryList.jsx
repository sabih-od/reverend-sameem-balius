import { FlatList, Image, ImageBackground, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import globalstyle from "../theme/style";
import { backgroungImage, colors, fonts, height, isIPad, width } from "../theme";
import Icon from "react-native-vector-icons/Feather";
import nightroutine from "../data/nightly-routines";
import RoutineBoxHorizontal from "../components/RoutineBoxHorizontal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { GetHistoryList } from "../redux/reducers/ListingApiStateReducer";
import { useEffect, useRef, useState } from "react";
import SectionItem from "../components/SectionItem";
import strings from "../localization/translation";

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
            <FlatList
                data={favouriteList}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => String(item?.id)}
                contentContainerStyle={{ paddingVertical: 15, paddingHorizontal: 15 }}
                ListEmptyComponent={() => <View style={{ height: height - 150, alignItems: 'center', justifyContent: 'center' }}><Text style={globalstyle.noproductfound}>{strings?.NoHistory}</Text></View>}
                renderItem={({ item, index }) => <SectionItem key={index} handlePlayer={() => console.log('asdasd')} item={item} navigation={props.navigation} width={isIPad ? (width / 2) - 22 : (width) - 100} audio={true} hideicon={true} postdetail={true} />}
            />
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
    homebgimage: { flex: 1, },
    homescollview: { flex: 1, paddingVertical: 15 }
})