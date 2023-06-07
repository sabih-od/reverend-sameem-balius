import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { colors, fonts, height, width } from "../theme";
import { TouchableOpacity } from "react-native-gesture-handler";

import Icon from 'react-native-vector-icons/Feather';
import globalstyle from "../theme/style";

const TopicChecBox = ({item, handleTopicId, color}) => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={() => {
            handleTopicId(item.id)
        }}>
            <ImageBackground source={item.image} style={[globalstyle.topicdetailbox, item.isSelected && { borderWidth: 2, borderColor: color }]}>
                <View style={{ position: "absolute", backgroundColor: colors.black, width: '100%', height: '100%', zIndex: 0, opacity: 0.5 }} />
                {item.isSelected && <View style={[globalstyle.topiccheckicon, { backgroundColor: color }]}>
                    <Icon name="check" color={colors.white} />
                </View>}
                <Text style={{ fontFamily: fonts.primaryBold, color: colors.white, fontSize: 16, textAlign: 'center', paddingHorizontal: 10 }}>{item.title}</Text>
            </ImageBackground>
        </TouchableOpacity>
    )
}

export default TopicChecBox;

const styles = StyleSheet.create({

})