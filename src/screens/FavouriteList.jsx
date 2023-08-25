import { FlatList, Image, ImageBackground, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import globalstyle from "../theme/style";
import { backgroungImage, colors, fonts, height, isIPad, width } from "../theme";
import Icon from "react-native-vector-icons/Feather";
import nightroutine from "../data/nightly-routines";
import RoutineBoxHorizontal from "../components/RoutineBoxHorizontal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AddToFavouriteList, GetFavouriteList } from "../redux/reducers/ListingApiStateReducer";
import { useEffect, useRef, useState } from "react";
import SectionItem from "../components/SectionItem";

const IMAGE_WIDTH = width / 2;

const FavouriteList = (props) => {

    const [favouriteList, setFavouriteList] = useState([]);

    useEffect(() => {
        props.GetFavouriteList();
    }, [])

    const prevPostsListResRef = useRef(props.getToFavouriteListResponse);
    useEffect(() => {
        if (props.getToFavouriteListResponse !== prevPostsListResRef.current && props.getToFavouriteListResponse?.success && props.getToFavouriteListResponse?.data) {
            prevPostsListResRef.current = props.getToFavouriteListResponse;
            // setPostList(prevState => [...prevState, ...props.getToFavouriteListResponse?.data])
            console.log('props.getToFavouriteListResponse => ', props.getToFavouriteListResponse)
            setFavouriteList(props.getToFavouriteListResponse?.data)
        }
    }, [props.getToFavouriteListResponse])

    const prevRemoveFromFavResRef = useRef(props.addToFavouriteListResponse);
    useEffect(() => {
        if (props.addToFavouriteListResponse !== prevRemoveFromFavResRef.current && props.addToFavouriteListResponse?.success && props.addToFavouriteListResponse?.data) {
            prevRemoveFromFavResRef.current = props.addToFavouriteListResponse;
            // setPostList(prevState => [...prevState, ...props.addToFavouriteListResponse?.data])
            console.log('props.addToFavouriteListResponse => ', props.addToFavouriteListResponse)
            props.GetFavouriteList();
        }
    }, [props.addToFavouriteListResponse])

    function _handleRemoveFromFav(id) {
        console.log('handleRemoveFromFav id => ', id)
        props.AddToFavouriteList({ id: id })
    }

    return <SafeAreaView style={globalstyle.fullview}>
        <Image style={[{ width: width, height: height, position: 'absolute', zIndex: 0 }]} resizeMode="cover" source={backgroungImage} />
        <ScrollView style={styles.homescollview}>
            <View>
                {favouriteList.map((item, index) => {
                    return <SectionItem key={index}
                        handlePlayer={() => console.log('asdasd')}
                        item={item} navigation={props.navigation}
                        width={isIPad ? (width / 2) - 22 : (width - 135)}
                        audio={true}
                        hideicon={true}
                        postdetail={true}
                        handleRemoveFromFav={_handleRemoveFromFav}
                        remove={true}
                    />
                })}
            </View>
        </ScrollView>
    </SafeAreaView>
}

const setStateToProps = state => ({
    getToFavouriteListResponse: state.listingstate.getToFavouriteListResponse,
    addToFavouriteListResponse: state.listingstate.addToFavouriteListResponse,
})

const mapDispatchToProps = dispatch => {
    return {
        GetFavouriteList: bindActionCreators(GetFavouriteList, dispatch),
        AddToFavouriteList: bindActionCreators(AddToFavouriteList, dispatch),
    }
}

export default connect(setStateToProps, mapDispatchToProps)(FavouriteList);

const styles = StyleSheet.create({
    homescollview: { flex: 1, paddingVertical: 15, paddingHorizontal: 15 }
})