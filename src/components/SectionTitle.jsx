import { Text } from "react-native";
import { colors, fonts, isDarkMode, isRTL } from "../theme";

const SectionTitle = (props) => {
    return (
        <Text style={{ fontFamily: isRTL ? fonts.arabicBold : fonts.primarySemiBold, fontSize: isRTL ? 24 : 19, marginBottom: 10, textAlign: 'left', color: isDarkMode ? colors.black : colors.black }}>{props?.title}</Text>
    )
}
export default SectionTitle;