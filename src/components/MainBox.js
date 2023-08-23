import React from "react";
import { View, Text, ImageBackground, StyleSheet, Share } from "react-native";
import { colors, fonts, height, isDarkMode, isRTL, width } from "../theme";
import { TouchableOpacity } from "react-native-gesture-handler";

import Icon from 'react-native-vector-icons/Feather';
import MainTopBox from "./MainTopBox";
import strings from "../localization/translation";
import { useNavigation } from "@react-navigation/native";

const ActionIcons = ({ name, route }) => {
    const navigation = useNavigation();

    return <TouchableOpacity
        onPress={() => navigation.navigate(route)}
        activeOpacity={0.8}
        style={{ width: 35, height: 35, alignItems: 'center', justifyContent: 'center', backgroundColor: isDarkMode ? colors.lightblue : colors.orange, marginLeft: 5, borderRadius: 30 }}
    >
        <Icon name={name} size={18} color={colors.white} />
    </TouchableOpacity>
}


onShare = async () => {

    let shareOptions = {
        title: 'asdfasdf',
        //url: base64image,
        message: 'asdfasdfasdfasdfasdfasdf',
        //subject: 'Subject'
    };

    try {
        const result = await Share.share(shareOptions);
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                // shared with activity type of result.activityType
            } else {
                // shared
            }
        } else if (result.action === Share.dismissedAction) {
            // dismissed
        }
    } catch (error) {
        alert(error.message);
    }
};

const MainBox = () => {
    return (
        <View>
            <MainTopBox />
            <View style={styles.topboxactionbar}>
                <TouchableOpacity activeOpacity={0.8} style={styles.playicon}>
                    <View style={styles.playborder}>
                        <View style={styles.playiconbg}>
                            <Icon name="play" size={18} color={colors.white} style={isRTL ? { marginLeft: -4 } : { marginRight: -4 }} />
                        </View>
                    </View>
                    <Text style={styles.playetext}>{strings.play}</Text>
                </TouchableOpacity>
                <View style={styles.heartaction}>
                    <ActionIcons name="heart" route="FavouriteList" />
                    <ActionIcons name="download" route="Downloads" />
                    {/* <ActionIcons name="calendar" route="calendarList" /> */}
                    <ActionIcons name="clock" route="HistoryList" />
                </View>
            </View>
            <View style={styles.bottombarinfo}>
                <Text style={styles.bottombarlink}>St. elizebeth Ann Secton</Text>
                <Text style={styles.bottomtitle}>"Do you not know that you are the template of God, and that the spirit of God dwells in you?"</Text>
                {/* <TouchableOpacity
                    onPress={onShare}
                    activeOpacity={0.8}
                    style={styles.shareiconbg}
                >
                    <Icon name="share-2" size={15} color={colors.white} />
                </TouchableOpacity>
                <Text style={styles.sharequote}>{strings.shareQuote}</Text> */}
            </View>
        </View>
    )
}

export default MainBox;

const styles = StyleSheet.create({
    topboxactionbar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: isDarkMode ? colors.deepblue : colors.headerbgcolor2, paddingHorizontal: 10, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, overflow: 'hidden', marginTop: -20, zIndex: 1, paddingTop: 35, paddingBottom: 15 },
    playicon: { flexDirection: 'row', alignItems: 'center' },
    playborder: { borderWidth: 1, borderRadius: 40, borderColor: colors.orange, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
    playiconbg: { backgroundColor: colors.orange, width: 32, height: 32, alignItems: 'center', justifyContent: 'center', borderRadius: 30, },
    playetext: { color: isDarkMode ? colors.white : colors.black, fontFamily: isRTL ? fonts.arabicM : fonts.primary },
    heartaction: { flexDirection: 'row', alignItems: 'center' },
    bottombarinfo: { alignItems: 'center', justifyContent: 'space-between', backgroundColor: isDarkMode ? colors.darkblue : colors.headerbgcolor, paddingBottom: 20, paddingTop: 30, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, overflow: 'hidden', marginTop: -30, zIndex: 0, paddingTop: 50 },
    bottombarlink: {
        fontFamily: fonts.primaryMedium, fontSize: 13, color: isDarkMode ? colors.lightblue : colors.black, textTransform: 'uppercase',
        // textDecorationLine: 'underline' 
    },
    shareiconbg: { backgroundColor: colors.orange, width: 35, height: 35, alignItems: 'center', justifyContent: 'center', borderRadius: 30, marginBottom: 10 },
    sharequote: { fontFamily: isRTL ? fonts.arabicMedium : fonts.primaryMedium, color: isDarkMode ? colors.white : colors.black, fontSize: 12 },
    bottomtitle: { fontFamily: fonts.primaryMedium, color: isDarkMode ? colors.white : colors.black, fontSize: 18, marginVertical: 15, textAlign: 'center', marginHorizontal: 20 }
})