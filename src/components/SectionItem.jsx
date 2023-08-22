import moment from 'moment/moment';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, fonts, isDarkMode, isRTL } from '../theme';
import strings from '../localization/translation';
import itemobject from './../data/itemobject';

const SectionItem = (props) => {
    const { item, width, navigation, handlePlayer } = props;
    if (props?.audio) {
        return (
            <TouchableOpacity
                onPress={() => handlePlayer(true, item)}
                activeOpacity={0.9}
                style={{ width: width - 20, marginBottom: 15, flexDirection: 'row', alignItems: 'center' }}
            >
                {/* require('./../../assets/images/sermons-01.jpeg') */}
                <ImageBackground
                    source={{ uri: item?.image }}
                    defaultSource={require('./../../assets/images/speaker-placeholder.png')}
                    style={{ width: 80, height: 80, marginRight: 13, marginBottom: 5, borderRadius: 10, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}
                >
                    {/* {item?.image && */}
                        <View style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
                    {/* } */}
                    <View style={[itemstyle?.iconbg, { width: 30, height: 30 }]}>
                        {props?.audio && <Icon name="mic" style={[itemstyle?.icon, { fontSize: 15 }]} />}
                    </View>
                </ImageBackground>
                <View>
                    <Text style={{ fontFamily: fonts.primary, fontSize: 11, textAlign: 'left', color: isDarkMode ? colors.white : '#444', marginBottom: isRTL ? 5 : 0 }}>{moment(parseInt(1691195928528)).format("DD MMM, YYYY")}</Text>
                    <Text style={{ fontFamily: isRTL ? fonts.arabicBold : fonts.primarySemiBold, fontSize: isRTL ? 15 : 14, color: isDarkMode ? colors.white : colors.black, textAlign: 'left', marginBottom: isRTL ? 5 : 0 }}>{item?.title}</Text>
                    <Text style={{ fontFamily: isRTL ? fonts.arabicRegular : fonts.primary, fontSize: isRTL ? 12 : 11, color: isDarkMode ? colors.white : colors.black, textAlign: 'left', lineHeight: isRTL ? 17 : 16 }} numberOfLines={1}>{item?.description}</Text>
                </View>
            </TouchableOpacity>
        )
    } else {
        return (
            <TouchableOpacity
                onPress={() => {
                    props?.video && navigation.navigate('VideoDetail', { item: item, })
                    props?.document && navigation.navigate('PDFView', { item: item })
                    props?.image && navigation.navigate('ImageDetail', { item: item })
                }}
                activeOpacity={0.9}
                style={{ width: width, marginBottom: 15, }}
            >
                <ImageBackground
                    source={{ uri: item?.image }}
                    defaultSource={require('./../../assets/images/home-slider-placeholder.png')}
                    style={{ width: '100%', height: width / 1.5, marginBottom: 5, borderRadius: 10, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}
                >
                    {(props?.video || props?.document || props?.audio || props?.image) && <>
                        {/* {item?.image && */}
                        <View style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
                        {/* } */}
                        <View style={itemstyle?.iconbg}>
                            {props?.video && <Icon name="play" style={[itemstyle?.icon, isRTL ? { marginLeft: -4 } : { marginRight: -4 }]} />}
                            {props?.document && <Icon name="file-text" style={itemstyle?.icon} />}
                            {props?.audio && <Icon name="mic" style={itemstyle?.icon} />}
                            {props?.image && <Icon name="image" style={itemstyle?.icon} />}
                        </View>
                    </>}
                </ImageBackground>
                <Text style={{ fontFamily: fonts.primary, fontSize: 11, textAlign: 'left', color: isDarkMode ? colors.white : '#444', marginBottom: isRTL ? 5 : 0 }}>{moment(parseInt(1691195928528)).format("DD MMM, YYYY")}</Text>
                <Text style={{ fontFamily: isRTL ? fonts.arabicBold : fonts.primarySemiBold, fontSize: isRTL ? 15 : 14, color: isDarkMode ? colors.white : colors.black, textAlign: 'left', marginBottom: isRTL ? 5 : 0 }}>{item?.title}</Text>
                <Text style={{ fontFamily: isRTL ? fonts.arabicRegular : fonts.primary, fontSize: isRTL ? 12 : 11, color: isDarkMode ? colors.white : colors.black, textAlign: 'left', lineHeight: isRTL ? 17 : 16 }} numberOfLines={1}>{item?.description}</Text>
            </TouchableOpacity>
        )
    }
}

export default SectionItem;

const itemstyle = StyleSheet.create({
    iconbg: { width: 35, height: 35, backgroundColor: colors.orange, borderRadius: 30, justifyContent: 'center', alignItems: 'center', },
    icon: { fontSize: 18, color: colors.white }
})