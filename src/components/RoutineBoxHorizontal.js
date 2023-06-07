import { View, ImageBackground, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors, fonts, width } from "../theme";

import Icon from 'react-native-vector-icons/Feather';
const RoutineBoxHorizontal = ({ item }) => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={() => {
            console.log('move to detail');
        }} style={{ width: width-60, marginRight: 10, flexDirection: 'row', backgroundColor: colors.darkblue, padding: 10, borderRadius: 7, overflow: 'hidden' }}>
            <ImageBackground source={item.image} style={styles.routinebgimage} />
            <View style={styles.locationrow}>
                <View>
                    <Text style={styles.boxtitle}>{item.name}</Text>
                    <Text style={styles.locationtoreach}>{item.location} -
                        <Text style={styles.timetoreach}>{item.time}</Text>
                    </Text>
                </View>
                <TouchableOpacity activeOpacity={0.8} style={{ padding: 7, position: 'absolute', right: 5, backgroundColor: colors.orange, borderRadius: 20 }} onPress={() => {
                    console.log('more btton click');
                }}>
                    <Icon name={'more-vertical'} size={13} color={colors.white} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}

export default RoutineBoxHorizontal;

const styles = StyleSheet.create({
    routinebgimage: { resizeMode: 'cover', width: 70, height: 70, borderRadius: 10, overflow: 'hidden', marginRight: 10 },
    boxtitle: { fontFamily: fonts.primaryBold, color: colors.white, fontSize: 17 },
    locationrow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: width - 160 },
    locationtoreach: { fontFamily: fonts.primaryMedium, color: colors.white, fontSize: 12 },
    timetoreach: { fontFamily: fonts.primarySemiBold, color: colors.white, fontSize: 12 }
})