import { StyleSheet, View } from "react-native";
import { colors, fontcolor } from "../theme";

const Seperator = () => {
    return (
        <View style={styles.seperatorline} />
    );
}

export default Seperator;

const styles = StyleSheet.create({
    seperatorline: { borderBottomWidth: 1, borderBottomColor: fontcolor, marginVertical: 25, opacity: 0.3 }
})