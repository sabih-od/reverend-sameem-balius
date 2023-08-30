import moment from 'moment/moment';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, fonts, isDarkMode, isRTL } from '../theme';
import strings from '../localization/translation';
import itemobject from './../data/itemobject';

const BookItem = (props) => {
    const { item, width, navigation, handlePlayer } = props;
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('PDFView', { item: item })}
            activeOpacity={0.9}
            style={{ width: width, marginBottom: 20, 
                // padding: 10, backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: 10 
            }}
        >
            <ImageBackground
                source={{ uri: item?.image }}
                defaultSource={require('./../../assets/images/home-slider-placeholder.png')}
                style={[itemstyle.otherimage, { height: width * 1.5, alignItems: 'flex-end', justifyContent: 'flex-end' }]}
            >
                <View style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
                <View style={[itemstyle?.iconbg, { width: 40, height: 40, borderRadius: 0, borderTopLeftRadius: 13 }]}>
                    <Icon name="book" style={[itemstyle?.icon, { fontSize: 17 }]} />
                </View>
            </ImageBackground>
            {/* <Text style={itemstyle.date}>{moment(parseInt(1691195928528)).format("DD MMM, YYYY")}</Text> */}
            <Text style={itemstyle.title}>{item?.title}</Text>
            <Text style={itemstyle.desc} numberOfLines={2}>{item?.description}</Text>
        </TouchableOpacity>
    )
}

export default BookItem;

const itemstyle = StyleSheet.create({
    iconbg: { width: 35, height: 35, backgroundColor: colors.orange, borderRadius: 30, justifyContent: 'center', alignItems: 'center', },
    icon: { fontSize: 18, color: colors.white },
    date: { fontFamily: fonts.primary, fontSize: 11, textAlign: 'left', color: isDarkMode ? colors.white : '#444', marginBottom: isRTL ? 7 : 0 },
    title: { fontFamily: isRTL ? fonts.arabicBold : fonts.primarySemiBold, fontSize: 16, color: isDarkMode ? colors.white : colors.black, textAlign: 'center', marginBottom: isRTL ? 7 : 0 },
    desc: { fontFamily: isRTL ? fonts.arabicRegular : fonts.primary, fontSize: isRTL ? 13 : 12, color: isDarkMode ? colors.white : colors.black, textAlign: 'center', lineHeight: isRTL ? 17 : 16 },
    audoimage: { width: 80, height: 80, marginRight: 15, marginBottom: 5, borderRadius: 10, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' },
    otherimage: { width: '100%', marginBottom: 5, borderRadius: 10, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' },
    audioview: { marginBottom: 15, flexDirection: 'row', alignItems: 'center', },
})