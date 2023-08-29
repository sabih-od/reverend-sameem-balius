import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Text, FlatList, ImageBackground, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { backgroungImage, colorScheme, colors, fontcolor, fonts, height, isRTL, width } from "../theme";

import Icon from 'react-native-vector-icons/Feather';
import globalstyle from "../theme/style";
import ReviewBox from "../components/ReviewBox";
import strings from "../localization/translation";

const StartFreeWeek = () => {


    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    function updatetopic(id) {
        console.log('topic id => ', id);
        setDetails(prevState => {
            const newState = prevState.map(obj => {
                if (obj.id === id) {
                    return { ...obj, isSelected: !obj.isSelected };
                }
                return obj;
            });
            return newState;
        });
    }

    function continuenow() {
        console.log('Try 7 Days Free');
    }

    return <SafeAreaView style={globalstyle.fullview}>
        <ImageBackground style={globalstyle.topicbgimage} resizeMode="cover" source={backgroungImage}>

            <View style={globalstyle.topicheadingrow}>
                <Text style={[globalstyle.topicheading, { marginBottom: isRTL ? 10 : 5 }]}>{strings.StartFreeWeek}</Text>
                <Text style={[globalstyle.topicdesc]}>{strings.ProgramReady}</Text>
            </View>

            <ScrollView style={{ flex: 1, }} showsVerticalScrollIndicator={false}>
                <View style={styles.bulletlist}>
                    <View style={[styles.bulleticonbg, { backgroundColor: colors.lightblue }]}><Icon name="check" style={styles.bulleticon} /></View>
                    <View><Text style={styles.bulleticonhead}>{strings.ProgramCreated}</Text></View>
                </View>
                <View style={styles.bulletlist}>
                    <View style={[styles.bulleticonbg, { backgroundColor: colors.orange }]}><Icon name="lock" style={styles.bulleticon} /></View>
                    <View style={styles.bulletright}>
                        <Text style={styles.bulleticonhead}>{strings.FreeAccess}</Text>
                        <Text style={styles.bulleticondesc}>{strings.Enjoy}</Text>
                    </View>
                </View>
                <View style={styles.bulletlist}>
                    <View style={[styles.bulleticonbg, { backgroundColor: colors.red }]}><Icon name="bell" style={styles.bulleticon} /></View>
                    <View style={styles.bulletright}>
                        <Text style={styles.bulleticonhead}>{strings.TrailReminder}</Text>
                        <Text style={styles.bulleticondesc}>{strings.TrailReminderDesc}</Text>
                    </View>
                </View>
                <View style={styles.bulletlist}>
                    <View style={[styles.bulleticonbg, { backgroundColor: colors.purpleblue }]}><Icon name="star" style={styles.bulleticon} /></View>
                    <View style={styles.bulletright}>
                        <Text style={styles.bulleticonhead}>{strings.EndOfTrail}</Text>
                        <Text style={styles.bulleticondesc}>{strings.SubscriptionBegins}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10, backgroundColor: colors.darkblue, padding: 15, paddingRight: 5, borderRadius: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon name="bell" style={{ marginRight: 10, fontSize: 22, color: colors.orange }} />
                        <Text style={{ fontFamily: isRTL ? fonts.arabicBold : fonts.primarySemiBold, fontSize: 15, color: colors.white, textTransform: 'capitalize', lineHeight: isRTL ? 22 : 20 }}>{strings.RemindMe}</Text>
                    </View>
                    <Switch
                        trackColor={{ false: '#767577', true: colors.orange }}
                        thumbColor={isEnabled ? colors.deepblue : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
                        value={isEnabled}
                    />
                </View>

                {!isRTL && <>
                    <Text style={{ fontFamily: isRTL ? fonts.arabicBold : fonts.primaryBold, color: fontcolor, fontSize: 18, marginBottom: 8, marginTop: 10, textAlign: 'left' }}>{strings.StoreReviews}</Text>
                    <ReviewBox />
                </>}

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => continuenow()}
                    style={globalstyle.topiccontinuebtn}>
                    <Text style={globalstyle.topiccontinuebtntext}>{strings.StartMyFreeWeek}</Text>
                </TouchableOpacity>

                <Text style={styles.notetext}>{strings.DaysForFree}</Text>
                <View style={{ paddingBottom: 30 }} />
            </ScrollView>
        </ImageBackground>
    </SafeAreaView>
}

export default StartFreeWeek;
const styles = StyleSheet.create({
    bulletlist: { flexDirection: 'row', alignItems: 'center', marginBottom: 13 },
    bulleticonbg: { backgroundColor: colors.black, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 40, marginRight: 10 },
    bulleticon: { color: colors.white, fontSize: 17 },
    bulletright: { width: width / 1.4 },
    bulleticonhead: { fontFamily: isRTL ? fonts.arabicBold : fonts.primaryBold, color: fontcolor, textAlign: 'left', marginBottom: isRTL ? 8 : 0, fontSize: isRTL ? 14 : 15 },
    bulleticondesc: { fontFamily: isRTL ? fonts.arabicRegular : fonts.primaryMedium, fontSize: isRTL ? 13 : 11, color: fontcolor, textAlign: 'left' },
    notetext: { fontFamily: isRTL ? fonts.arabicRegular : fonts.primary, color: fontcolor, fontSize: isRTL ? 13 : 11, textAlign: 'center', lineHeight: isRTL ? 20 : 17 }
})