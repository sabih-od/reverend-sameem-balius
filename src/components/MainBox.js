import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { colors, fonts, height, width } from "../theme";
import { TouchableOpacity } from "react-native-gesture-handler";

import Icon from 'react-native-vector-icons/Feather';
import MainTopBox from "./MainTopBox";

const ActionIcons = ({ name }) => {
    return <TouchableOpacity activeOpacity={0.8} style={{ width: 35, height: 35, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.lightblue, marginLeft: 5, borderRadius: 30 }}>
        <Icon name={name} size={18} color={colors.white} />
    </TouchableOpacity>
}

const MainBox = () => {
    return (
        <View>
            <MainTopBox />
            <View style={styles.topboxactionbar}>
                <TouchableOpacity activeOpacity={0.8} style={styles.playicon}>
                    <View style={styles.playborder}>
                        <View style={styles.playiconbg}>
                            <Icon name="play" size={18} color={colors.white} style={{ marginRight: -4 }} />
                        </View>
                    </View>
                    <Text style={styles.playetext}>Play Video</Text>
                </TouchableOpacity>
                <View style={styles.heartaction}>
                    <ActionIcons name="heart" />
                    <ActionIcons name="download" />
                    <ActionIcons name="calendar" />
                    <ActionIcons name="clock" />
                </View>
            </View>
            <View style={styles.bottombarinfo}>
                <Text style={styles.bottombarlink}>St. elizebeth Ann Secton</Text>
                <Text style={styles.bottomtitle}>"Be attentive to the voice of grace"</Text>
                <TouchableOpacity activeOpacity={0.8} style={styles.shareiconbg}>
                    <Icon name="share-2" size={15} color={colors.white} />
                </TouchableOpacity>
                <Text style={styles.sharequote}>Share Quote</Text>
            </View>
        </View>
    )
}

export default MainBox;

const styles = StyleSheet.create({
    topboxactionbar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.deepblue, paddingHorizontal: 10, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, overflow: 'hidden', marginTop: -20, zIndex: 1, paddingTop: 35, paddingBottom: 15 },
    playicon: { flexDirection: 'row', alignItems: 'center' },
    playborder: { borderWidth: 1, borderRadius: 40, borderColor: colors.orange, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
    playiconbg: { backgroundColor: colors.orange, width: 32, height: 32, alignItems: 'center', justifyContent: 'center', borderRadius: 30, },
    playetext: { color: colors.white, fontFamily: fonts.primary },
    heartaction: { flexDirection: 'row', alignItems: 'center' },
    bottombarinfo: { alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.darkblue, paddingBottom: 20, paddingTop: 30, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, overflow: 'hidden', marginTop: -20, zIndex: 0, paddingTop: 30 },
    bottombarlink: { fontFamily: fonts.primaryMedium, fontSize: 13, color: colors.lightblue, textTransform: 'uppercase', textDecorationLine: 'underline' },
    shareiconbg: { backgroundColor: colors.orange, width: 35, height: 35, alignItems: 'center', justifyContent: 'center', borderRadius: 30, marginBottom: 10 },
    sharequote: { fontFamily: fonts.primaryMedium, color: colors.white, fontSize: 12 },
    bottomtitle: { fontFamily: fonts.primarySemiBold, color: colors.white, fontSize: 18, marginVertical: 15 }
})