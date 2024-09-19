import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { colors, isDarkMode, isRTL } from "../../theme";

const GoBackIcon = ({ navigation }) => {
    return (<TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
            navigation.goBack();
        }}
        style={[{ padding: 10, paddingHorizontal: 15, borderRadius: 40, overflow: 'hidden', marginRight: 15 }]} >
        <Icon name={isRTL ? 'chevron-right' : 'chevron-left'} size={22} color={isDarkMode ? colors.white : colors.white} />
    </TouchableOpacity >)
}

export default GoBackIcon;