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
                onPress={() => props.postdetail ? navigation.navigate('PostDetail', { item: item }) : handlePlayer(true, item)}
                activeOpacity={0.9}
                style={[itemstyle.audioview, { width: width - 30 }]}
            >
                {/* require('./../../assets/images/sermons-01.jpeg') */}
                <ImageBackground
                    source={{ uri: props?.downloads ? item?.artwork?.uri : item?.image }}
                    defaultSource={require('./../../assets/images/speaker-placeholder.png')}
                    style={itemstyle.audoimage}
                >
                    {/* {item?.image && */}
                    {!props.hideicon && <View style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />}
                    {/* } */}
                    {!props.hideicon && <View style={[itemstyle?.iconbg, { width: 30, height: 30 }]}>
                        {props?.audio && <Icon name="mic" style={[itemstyle?.icon, { fontSize: 15 }]} />}
                    </View>}

                </ImageBackground>
                <View style={{ width: width - 30 }}>
                    <Text style={itemstyle.date}>{moment(parseInt(1691195928528)).format("DD MMM, YYYY")}</Text>
                    <Text style={itemstyle.title}>{item?.title}</Text>
                    <Text style={itemstyle.desc} numberOfLines={1}>{props?.downloads ? item?.artist : item?.description}</Text>
                </View>
                {props?.remove && <TouchableOpacity
                    onPress={() => props.handleRemoveFromFav(item?.id)}
                    style={[itemstyle?.iconbg, { width: 30, height: 30, marginLeft: 15 }]}
                    activeOpacity={0.8}
                >
                    <Icon name="heart" style={[itemstyle?.icon, { fontSize: 15, marginBottom: -3 }]} />
                    <View style={{ width: 20, height: 1, backgroundColor: colors.white, transform: [{ rotate: '130deg' }, { translateX: -5 }, { translateY: 4 }] }} />
                </TouchableOpacity>}
            </TouchableOpacity>
        )
    } else {
        return (
            <TouchableOpacity
                onPress={() => {
                    if (props?.video || props?.document || props?.image) {
                        props?.video && navigation.navigate('VideoDetail', { item: item, })
                        props?.document && navigation.navigate('PDFView', { item: item })
                        props?.image && navigation.navigate('ImageDetail', { item: item })
                    } else {
                        navigation.navigate('PostDetail', { item: item })
                    }
                }}
                activeOpacity={0.9}
                style={{ width: width, marginBottom: 20, }}
            >
                <ImageBackground
                    source={{ uri: item?.image }}
                    defaultSource={require('./../../assets/images/home-slider-placeholder.png')}
                    style={[itemstyle.otherimage, { height: width / 1.5 }]}
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
                <Text style={itemstyle.date}>{moment(parseInt(1691195928528)).format("DD MMM, YYYY")}</Text>
                <Text style={itemstyle.title}>{item?.title}</Text>
                <Text style={itemstyle.desc} numberOfLines={1}>{item?.description}</Text>
            </TouchableOpacity>
        )
    }
}

export default SectionItem;

const itemstyle = StyleSheet.create({
    iconbg: { width: 35, height: 35, backgroundColor: colors.orange, borderRadius: 30, justifyContent: 'center', alignItems: 'center', },
    icon: { fontSize: 18, color: colors.white },
    date: { fontFamily: fonts.primary, fontSize: 11, textAlign: 'left', color: isDarkMode ? colors.white : '#444', marginBottom: isRTL ? 7 : 0 },
    title: { fontFamily: isRTL ? fonts.arabicBold : fonts.primarySemiBold, fontSize: 16, color: isDarkMode ? colors.white : colors.black, textAlign: 'left', marginBottom: isRTL ? 7 : 0 },
    desc: { fontFamily: isRTL ? fonts.arabicRegular : fonts.primary, fontSize: isRTL ? 13 : 12, color: isDarkMode ? colors.white : colors.black, textAlign: 'left', lineHeight: isRTL ? 17 : 16 },
    audoimage: { width: 80, height: 80, marginRight: 15, marginBottom: 5, borderRadius: 10, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' },
    otherimage: { width: '100%', marginBottom: 5, borderRadius: 10, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' },
    audioview: { marginBottom: 15, flexDirection: 'row', alignItems: 'center', },
})