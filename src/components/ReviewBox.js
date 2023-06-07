import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { colors, fonts, height, width } from "../theme";
import { TouchableOpacity } from "react-native-gesture-handler";

import Icon from 'react-native-vector-icons/Feather';

const ActionIcons = ({ name }) => {
    return <TouchableOpacity activeOpacity={0.8} style={{ width: 35, height: 35, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.lightblue, marginLeft: 5, borderRadius: 30 }}>
        <Icon name={name} size={18} color={colors.white} />
    </TouchableOpacity>
}

const ReviewBox = (props) => {
    return (
        <View style={styles.reviewbox}>
            <ImageBackground source={require('./../../assets/images/profile-image.jpeg')} style={styles.imageroundbox} />
            <View style={styles.ratingrightbox}>
                <Text style={styles.reviewtext}>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia</Text>
                <View style={styles.ratingrow}>
                    <Icon name="star" style={styles.iconrating} />
                    <Icon name="star" style={styles.iconrating} />
                    <Icon name="star" style={styles.iconrating} />
                    <Icon name="star" style={styles.iconrating} />
                    <Icon name="star" style={styles.iconrating} />
                </View>
            </View>
        </View>
    )
}

export default ReviewBox;

const styles = StyleSheet.create({
    reviewbox: {flexDirection: 'row', backgroundColor: colors.darkblue, padding: 13,borderRadius: 10},
    reviewtext: {fontFamily: fonts.primary, fontSize: 12, color: colors.white},
    imageroundbox: {width: 50, height: 50, resizeMode: 'cover', borderRadius: 40, overflow: 'hidden', borderWidth: 2, borderColor: colors.white, marginRight: 10},
    iconrating: {color: colors.yellow, marginRight: 3},
    ratingrow: {flexDirection: 'row', marginTop: 7},
    ratingrightbox: {flex: 1}
})