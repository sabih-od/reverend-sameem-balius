import { Text, TouchableOpacity, View } from "react-native";
import Seperator from "./Seperator";
import { colors, fonts, isRTL } from "../theme";
import strings from "../localization/translation";

const TryPlus = (props) => {
    return (<>
        <View style={{ paddingHorizontal: 15 }}>
            <Seperator />
        </View>
        <View style={{ alignItems: 'center', backgroundColor: colors.darkblue, paddingHorizontal: 20, paddingVertical: 20, borderRadius: 20, marginHorizontal: 15 }}>
            <Text style={{ color: colors.white, fontFamily: isRTL ? fonts.arabicMedium : fonts.primaryBold, fontSize: 17, marginBottom: 20, textAlign: 'center' }}>{strings.unlockContent}</Text>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { props.navigation.navigate('StartFreeWeek'); }}
                style={{ backgroundColor: colors.orange, paddingVertical: 10, borderRadius: 40, width: 180 }}
            >
                <Text
                    style={{ textAlign: 'center', color: colors.white, fontFamily: isRTL ? fonts.arabicBold : fonts.primaryBold, textTransform: 'uppercase' }}
                >{strings.tryPlus}</Text>
            </TouchableOpacity>
        </View>
        <View style={{ height: 50 }} />
    </>
    )
}

export default TryPlus;