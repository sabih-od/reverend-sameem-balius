import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Text, FlatList, ImageBackground, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { colorScheme, colors, fontcolor, fonts, height, width } from "../theme";

import Icon from 'react-native-vector-icons/Feather';
import globalstyle from "../theme/style";
import ReviewBox from "../components/ReviewBox";

const StartFreeWeekScreen = () => {


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

    return <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground style={globalstyle.topicbgimage} resizeMode="cover" source={colorScheme == 'dark' ? require('./../../assets/images/home-bg.jpg') : require('./../../assets/images/auth-bg.jpg')}>

            <View style={globalstyle.topicheadingrow}>
                <Text style={[globalstyle.topicheading]}>Start You Free Week?</Text>
                <Text style={[globalstyle.topicdesc]}>Your program is ready.</Text>
            </View>

            <ScrollView style={{ flex: 1, }} showsVerticalScrollIndicator={false}>
                <View style={styles.bulletlist}>
                    <View style={[styles.bulleticonbg, { backgroundColor: colors.lightblue }]}><Icon name="check" style={styles.bulleticon} /></View>
                    <View><Text style={styles.bulleticonhead}>Program Created</Text></View>
                </View>
                <View style={styles.bulletlist}>
                    <View style={[styles.bulleticonbg, { backgroundColor: colors.orange }]}><Icon name="lock" style={styles.bulleticon} /></View>
                    <View style={styles.bulletright}>
                        <Text style={styles.bulleticonhead}>Today - Instant Free Access</Text>
                        <Text style={styles.bulleticondesc}>Enjoy 1,000+ meditation, music, stories and more.</Text>
                    </View>
                </View>
                <View style={styles.bulletlist}>
                    <View style={[styles.bulleticonbg, { backgroundColor: colors.red }]}><Icon name="bell" style={styles.bulleticon} /></View>
                    <View style={styles.bulletright}>
                        <Text style={styles.bulleticonhead}>Day 5 - Trail Reminder</Text>
                        <Text style={styles.bulleticondesc}>We'll send a notification to mind when your trail will end.</Text>
                    </View>
                </View>
                <View style={styles.bulletlist}>
                    <View style={[styles.bulleticonbg, { backgroundColor: colors.purpleblue }]}><Icon name="star" style={styles.bulleticon} /></View>
                    <View style={styles.bulletright}>
                        <Text style={styles.bulleticonhead}>Day 7 - End Of Trail</Text>
                        <Text style={styles.bulleticondesc}>Your subscription begins now. You can easily cancel before this date.</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10, backgroundColor: colors.darkblue, padding: 15, paddingRight: 5, borderRadius: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon name="bell" style={{ marginRight: 10, fontSize: 22, color: colors.orange }} />
                        <Text style={{ fontFamily: fonts.primarySemiBold, fontSize: 15, color: colors.white, textTransform: 'capitalize' }}>Remind me when the trial ends</Text>
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

                <Text style={{ fontFamily: fonts.primaryBold, color: fontcolor, fontSize: 18, marginBottom: 8, marginTop: 10 }}>Store Reviews</Text>

                <ReviewBox />

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => continuenow()}
                    style={globalstyle.topiccontinuebtn}>
                    <Text style={globalstyle.topiccontinuebtntext}>Start My Free Week</Text>
                </TouchableOpacity>

                <Text style={styles.notetext}>{'Try 7 days for free, then 100$/Month, billed annually as 1000$/Year.\nCancel anytime'}</Text>
                <View style={{paddingBottom: 30}} />
            </ScrollView>
        </ImageBackground>
    </SafeAreaView>
}

export default StartFreeWeekScreen;
const styles = StyleSheet.create({
    bulletlist: { flexDirection: 'row', alignItems: 'center', marginBottom: 13 },
    bulleticonbg: { backgroundColor: colors.black, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 40, marginRight: 10 },
    bulleticon: { color: colors.white, fontSize: 17 },
    bulletright: { width: width / 1.4 },
    bulleticonhead: { fontFamily: fonts.primaryBold, color: fontcolor },
    bulleticondesc: { fontFamily: fonts.primaryMedium, fontSize: 11, color: fontcolor },
    notetext: { fontFamily: fonts.primary, color: fontcolor, fontSize: 11, textAlign: 'center' }
})