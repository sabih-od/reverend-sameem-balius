import { View, ImageBackground, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors, fontSize, fontcolor, fonts, isRTL } from "../theme";

import Icon from 'react-native-vector-icons/Feather';
const RoutineBox = ({ item, navigation }) => {

    // console.log('props 1 => ', navigation);

    return (
        <View style={{ width: 150, }}>
            <TouchableOpacity activeOpacity={0.8}
                onPress={() => {
                    // console.log('move to detail');
                    // navigation.navigate('PrayList')
                    navigation.navigate('PostDetail', { item: item })
                }}>
                <ImageBackground
                    source={Number.isInteger(item?.image) ? item.image : { uri: item.image }}
                    defaultSource={require('./../../assets/images/home-slider-placeholder.png')}
                    style={styles.routinebgimage}
                >
                    {/* <TouchableOpacity activeOpacity={0.8} style={styles.moreicon} onPress={() => {
                        console.log('more btton click');
                    }}>
                        <Icon name={'more-vertical'} size={18} color={colors.white} />
                    </TouchableOpacity> */}
                </ImageBackground>
            </TouchableOpacity>
            <View style={styles.locationrow}>
                <View>
                    <Text style={styles.boxtitle}>{item.title}</Text>
                    <Text style={styles.locationtoreach} numberOfLines={1}>{item.description}
                        {/* <Text style={styles.timetoreach}>{item.time}</Text> */}
                    </Text>
                </View>
                {/* <TouchableOpacity activeOpacity={0.8} onPress={() => {
                    console.log('heart button');
                }}
                    style={styles.heartbtnbg}
                ><Icon name="heart" color={colors.white} size={13} />
                </TouchableOpacity> */}
            </View>
        </View>
    );
}

export default RoutineBox;

const styles = StyleSheet.create({
    routinebgimage: { resizeMode: 'cover', width: '100%', height: 130, borderRadius: 10, overflow: 'hidden', marginBottom: 6, marginBottom: 10 },
    boxtitle: { fontFamily: isRTL ? fonts.arabicBold : fonts.primarySemiBold, color: fontcolor, fontSize: fontSize, textAlign: 'left', marginBottom: isRTL ? 3 : 0, textTransform: 'capitalize' },
    locationrow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    locationtoreach: { fontFamily: isRTL ? fonts.arabicRegular : fonts.primaryMedium, color: fontcolor, fontSize: fontSize - 2, textAlign: 'left' },
    timetoreach: { fontFamily: fonts.primarySemiBold, color: fontcolor, fontSize: 10 },
    heartbtnbg: { backgroundColor: colors.orange, width: 25, height: 25, alignItems: 'center', justifyContent: 'center', borderRadius: 30 },
    moreicon: { padding: 10, position: 'absolute', right: 0 },
})