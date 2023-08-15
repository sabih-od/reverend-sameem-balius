import { Text } from "react-native";
import { fonts, isRTL } from "../theme";

const SectionTitle = (props) => {
    return (
        <Text style={{ fontFamily: isRTL ? fonts.arabicBold : fonts.primarySemiBold, fontSize: isRTL ? 24 : 19, marginBottom: 10, textAlign: 'left' }}>{props?.title}</Text>
    )
}
export default SectionTitle;