import { FlatList, Image, ImageBackground, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import globalstyle from "../theme/style";
import { backgroungImage, colors, fonts, height, isIPad, isRTL, width } from "../theme";
import Icon from "react-native-vector-icons/Feather";
import nightroutine from "../data/nightly-routines";
import RoutineBoxHorizontal from "../components/RoutineBoxHorizontal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { GetFavouriteList } from "../redux/reducers/ListingApiStateReducer";
import { useEffect, useRef, useState } from "react";
import SectionItem from "../components/SectionItem";
import strings from "../localization/translation";

const IMAGE_WIDTH = width / 2;

const Downloads = (props) => {

    const [favouriteList, setFavouriteList] = useState([]);
    const prevPostsListResRef = useRef(props.getToFavouriteListResponse);

    useEffect(() => {
        // props.GetFavouriteList();
        console.log('props.downloads => ', props.downloads)
        setFavouriteList(props.downloads)
    }, [])

    useEffect(() => {
        if (props.getToFavouriteListResponse !== prevPostsListResRef.current && props.getToFavouriteListResponse?.success && props.getToFavouriteListResponse?.data) {
            prevPostsListResRef.current = props.getToFavouriteListResponse;
            // setPostList(prevState => [...prevState, ...props.getToFavouriteListResponse?.data])
            console.log('props.getToFavouriteListResponse => ', props.getToFavouriteListResponse)
            setFavouriteList(props.getToFavouriteListResponse?.data)
        }
    }, [props.getToFavouriteListResponse])

    return <SafeAreaView style={globalstyle.fullview}>
        <ImageBackground style={styles.homebgimage} resizeMode="cover" source={backgroungImage}>
            <FlatList
                data={favouriteList}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => String(item?.id)}
                contentContainerStyle={{ paddingVertical: 15, paddingHorizontal: 15 }}
                ListEmptyComponent={() => <View style={{ height: height - 150, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={globalstyle.noproductfound}>{strings?.NoDownloads}</Text>
                </View>}
                renderItem={({ item, index }) => <SectionItem key={index}
                    handlePlayer={() => console.log('asdasd')}
                    item={item} navigation={props.navigation}
                    width={isIPad ? (width / 2) - 22 : (width - 100)}
                    audio={true}
                    hideicon={true}
                    // postdetail={true}
                    // handleRemoveFromFav={_handleRemoveFromFav}
                    downloads={true}
                />}
            />
            {/* {favouriteList.length > 0 && <ScrollView style={{ paddingHorizontal: 15, paddingVertical: 15, width: width - 20 }}>
                <View>
                    {favouriteList.map((item, index) => {
                        return <SectionItem key={index} handlePlayer={() => console.log('asdasd')} item={item} navigation={props.navigation} width={isIPad ? (width / 2) - 22 : (width) - 100} audio={true} hideicon={true} downloads={true} />
                    })}
                </View>
            </ScrollView>}
            {favouriteList.length == 0 && <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={globalstyle.noproductfound}>{strings?.NoDownloads}</Text>
            </View>} */}
            {/* <ScrollView style={{ paddingHorizontal: 15, paddingVertical: 15, width: width - 20 }}>
                <View>
                    {favouriteList.map((item, index) => {
                        return <SectionItem key={index} handlePlayer={() => console.log('asdasd')} item={item} navigation={props.navigation} width={isIPad ? (width / 2) - 22 : (width) - 100} audio={true} hideicon={true} downloads={true} />
                    })}
                </View>
            </ScrollView> */}
        </ImageBackground>
    </SafeAreaView>
}

const setStateToProps = state => ({
    getToFavouriteListResponse: state.listingstate.getToFavouriteListResponse,
    downloads: state.appstate.downloads
})

const mapDispatchToProps = dispatch => {
    return {
        GetFavouriteList: bindActionCreators(GetFavouriteList, dispatch)
    }
}

export default connect(setStateToProps, mapDispatchToProps)(Downloads);

const styles = StyleSheet.create({
    homebgimage: { flex: 1, },
    homescollview: { flex: 1, paddingVertical: 15 }
})