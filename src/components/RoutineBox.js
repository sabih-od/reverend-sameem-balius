import { View, ImageBackground, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors, fonts } from "../theme";

import Icon from 'react-native-vector-icons/Feather';
const RoutineBox = ({ item }) => {
    return (
        <View style={{ width: 150, marginRight: 10 }}>
            <ImageBackground source={{ uri: item.uri }} style={styles.routinebgimage} />

            <View style={styles.locationrow}>
                <View>
                    <Text style={styles.boxtitle}>{item.name}</Text>
                    <Text style={styles.locationtoreach}>{item.location} -
                        <Text style={styles.timetoreach}>{item.time}</Text>
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => { }}
                    style={{ backgroundColor: colors.orange, width: 26, height: 26, alignItems: 'center', justifyContent: 'center', borderRadius: 30}}
                ><Icon name="heart" color={colors.white} size={12} />
                    </TouchableOpacity>
            </View>
        </View>
    );
}

export default RoutineBox;

const styles = StyleSheet.create({
    routinebgimage: { resizeMode: 'cover', width: '100%', height: 130, borderRadius: 10, overflow: 'hidden', marginBottom: 6 },
    boxtitle: { fontFamily: fonts.primarySemiBold, color: colors.white, fontSize: 14 },
    locationrow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    locationtoreach: { fontFamily: fonts.primaryMedium, color: colors.white, fontSize: 11 },
    timetoreach: { fontFamily: fonts.primarySemiBold, color: colors.white, fontSize: 11 }
})