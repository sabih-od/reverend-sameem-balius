import { FlatList, Image, ImageBackground, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import globalstyle from "../theme/style";
import { backgroungImage, colors, fonts, width } from "../theme";
import Icon from "react-native-vector-icons/Feather";
import nightroutine from "../data/nightly-routines";
import RoutineBoxHorizontal from "../components/RoutineBoxHorizontal";

const IMAGE_WIDTH = width / 2;

const News = (props) => {
    return <SafeAreaView style={globalstyle.fullview}>
        <ImageBackground style={styles.homebgimage} resizeMode="cover" source={backgroungImage}>
            <FlatList
                data={[...Array(10).keys()]}
                style={{ paddingHorizontal: 15, paddingVertical: 15, }}
                numColumns={2}
                keyExtractor={item => String(item)}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                renderItem={() => <TouchableOpacity
                    activeOpacity={0.8} style={{ width: IMAGE_WIDTH - 20, marginBottom: 15 }}>
                    <Image source={require('./../../assets/images/sermons-01.jpeg')} style={{ width: '100%', height: IMAGE_WIDTH - 70, borderRadius: 15 }} />
                    <View style={{ padding: 10, backgroundColor: '#fff', borderBottomLeftRadius: 15, borderBottomRightRadius: 15 ,paddingTop: 25, marginTop: -15, zIndex: -1 }}>
                        <Text style={{fontFamily: fonts.primary, fontSize: 11}}>July, 27 2023</Text>
                        <Text style={{ fontFamily: fonts.primarySemiBold }}>Name Here</Text>
                        <Text style={{ fontFamily: fonts.primary, fontSize: 12 }} numberOfLines={2}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
                    </View>
                </TouchableOpacity>}
            />
        </ImageBackground>
    </SafeAreaView>
}

export default News;


const styles = StyleSheet.create({
    homebgimage: { flex: 1, },
    homescollview: { flex: 1, paddingVertical: 15 }
})