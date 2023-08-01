import { FlatList, Image, ImageBackground, SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import globalstyle from "../../theme/style";
import { backgroungImage, colors, fonts, width } from "../../theme";
import Icon from "react-native-vector-icons/Feather";

const IMAGE_WIDTH = width / 2;

const Social = (props) => {
    return <SafeAreaView style={globalstyle.fullview}>
        <ImageBackground style={styles.homebgimage} resizeMode="cover" source={backgroungImage}>
            <FlatList
                data={[...Array(12).keys()]}
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
        </ImageBackground>
    </SafeAreaView>
}

export default Social;


const styles = StyleSheet.create({
    homebgimage: { paddingHorizontal: 15, paddingVertical: 15, flex: 1, },
    homescollview: { flex: 1, paddingVertical: 15 }
})