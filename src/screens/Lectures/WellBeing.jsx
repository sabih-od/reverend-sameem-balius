import { FlatList, Image, ImageBackground, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import globalstyle from "../../theme/style";
import { backgroungImage, colors, fonts, width } from "../../theme";
import Icon from "react-native-vector-icons/Feather";
import nightroutine from "../../data/nightly-routines";
import RoutineBoxHorizontal from "../../components/RoutineBoxHorizontal";

const IMAGE_WIDTH = width / 2;

const WellBeing = (props) => {
    return <SafeAreaView style={globalstyle.fullview}>
        <ImageBackground style={styles.homebgimage} resizeMode="cover" source={backgroungImage}>
            <ScrollView style={{ paddingHorizontal: 15, paddingVertical: 15, }}>
                <View style={{ marginBottom: 10 }}>
                    <Text style={{ fontFamily: fonts.primarySemiBold, fontSize: 22 }}>Videos</Text>
                </View>
                <FlatList
                    data={[...Array(4).keys()]}
                    numColumns={2}
                    keyExtractor={item => String(item)}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    renderItem={() => <TouchableOpacity
                        activeOpacity={0.8}
                        style={{ width: IMAGE_WIDTH - 20, marginBottom: 15 }}>
                        <ImageBackground source={require('./../../../assets/images/sermons-01.jpeg')} style={{ width: '100%', height: IMAGE_WIDTH - 70, borderRadius: 15, marginBottom: 7, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.orange, zIndex: 1, borderRadius: 30 }}>
                                <Icon name="play" style={{ color: colors.white, fontSize: 18, marginRight: -4 }} />
                            </View>
                            <View style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: colors.black, opacity: 0.5, zIndex: 0 }} />
                        </ImageBackground>
                        <Text style={{ fontFamily: fonts.primarySemiBold }}>Name Here</Text>
                        <Text style={{ fontFamily: fonts.primary, fontSize: 12 }} numberOfLines={2}>Meditation - 8 - 9 mins</Text>
                    </TouchableOpacity>}
                />
                <View style={{ marginBottom: 10, marginTop: 10 }}>
                    <Text style={{ fontFamily: fonts.primarySemiBold, fontSize: 22 }}>Audio</Text>
                </View>
                <FlatList
                    horizontal
                    snapToInterval={width - 50}
                    scrollEnabled
                    scrollEventThrottle={16}
                    showsHorizontalScrollIndicator={false}
                    data={nightroutine}
                    keyExtractor={item => String(item.id)}
                    renderItem={({ item, index }) => <RoutineBoxHorizontal key={index} item={item} navigation={props.navigation} />}
                />
                <View style={{ marginBottom: 10, marginTop: 10 }}>
                    <Text style={{ fontFamily: fonts.primarySemiBold, fontSize: 22 }}>Images</Text>
                </View>
                <FlatList
                    data={[...Array(4).keys()]}
                    numColumns={2}
                    keyExtractor={item => String(item)}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    renderItem={() => <TouchableOpacity
                        activeOpacity={0.8} style={{ width: IMAGE_WIDTH - 20, marginBottom: 15 }}>
                        <Image source={require('./../../../assets/images/sermons-01.jpeg')} style={{ width: '100%', height: IMAGE_WIDTH - 70, borderRadius: 15, marginBottom: 7 }} />
                        <Text style={{ fontFamily: fonts.primarySemiBold }}>Name Here</Text>
                        <Text style={{ fontFamily: fonts.primary, fontSize: 12 }} numberOfLines={2}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
                    </TouchableOpacity>}
                />
            </ScrollView>
        </ImageBackground>
    </SafeAreaView>
}

export default WellBeing;


const styles = StyleSheet.create({
    homebgimage: { flex: 1, },
    homescollview: { flex: 1, paddingVertical: 15 }
})