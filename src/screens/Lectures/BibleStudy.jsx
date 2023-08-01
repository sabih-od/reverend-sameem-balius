import { FlatList, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import globalstyle from "../../theme/style";
import { backgroungImage, fonts, width } from "../../theme";

const IMAGE_WIDTH = width / 2;

const BibleStudy = (props) => {
    return <SafeAreaView style={globalstyle.fullview}>
        <ImageBackground style={styles.homebgimage} resizeMode="cover" source={backgroungImage}>
            <FlatList
                data={[...Array(12).keys()]}
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
        </ImageBackground>
    </SafeAreaView>
}

export default BibleStudy;


const styles = StyleSheet.create({
    homebgimage: { paddingHorizontal: 15, paddingVertical: 15, flex: 1, },
    homescollview: { flex: 1, paddingVertical: 15 }
})