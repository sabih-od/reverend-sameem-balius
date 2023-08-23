import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { colors, fonts, height, isRTL, width } from "../theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import strings from "../localization/translation";
import LinearGradient from "react-native-linear-gradient";

const MainTopBox = (props) => {
    return (<ImageBackground source={
        // require('./../../assets/images/home/home-main.jpg')
        {uri: 'https://service.demowebsitelinks.com:3013/uploads/posts/images/fyucZ7SkvlvpDDxFgoIY.jpg'}
        } resizeMode="cover" style={styles.maintopbox}>
        {props.dayspending &&
            <View style={styles.dayspending}>
                <Text style={styles.dayspendingtext}>{props.dayspending} days left</Text>
            </View>
        }
        <LinearGradient colors={['transparent', '#000']} style={{ width: '100%', height: 200, position: 'absolute', bottom: 0, left: 0 }} />
        <View style={styles.mainboxrow}>
            <Text style={{ textAlign: 'left', fontFamily: isRTL ? fonts.arabicRegular : fonts.primary, color: colors.white, textTransform: 'uppercase', fontSize: 13 }}>{strings.homeTopDailies}</Text>
            <Text style={styles.topboxheading}>{strings.homeTopTitle}</Text>
            <Text style={styles.topboxdesc}>{strings.homeTopDesc}</Text>
        </View>
    </ImageBackground>);
}

export default MainTopBox;

const styles = StyleSheet.create({
    maintopbox: { height: height / 3, width: '100%', borderRadius: 20, overflow: 'hidden', zIndex: 3, position: 'relative' },
    mainboxrow: { position: 'absolute', left: 20, bottom: 20, },
    topboxheading: { fontFamily: isRTL ? fonts.arabicMedium : fonts.primaryBold, color: colors.white, fontSize: 20, textAlign: 'left', marginBottom: isRTL ? 8 : 0, marginTop: isRTL ? 8 : 0 },
    topboxdesc: { fontFamily: isRTL ? fonts.arabicRegular : fonts.primaryMedium, color: colors.white, fontSize: 14, textAlign: 'left' },
    dayspending: { backgroundColor: colors.orange, position: 'absolute', right: 20, top: 20, paddingHorizontal: 13, borderRadius: 20, paddingVertical: 1, overflow: 'hidden' },
    dayspendingtext: { fontFamily: fonts.primaryMedium, fontSize: 13, color: colors.white, textTransform: 'capitalize', textAlign: 'left' }
})