import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { colors, fonts, height, width } from "../theme";
import { TouchableOpacity } from "react-native-gesture-handler";

const MainTopBox = (props) => {
    return (<ImageBackground source={require('./../../assets/images/home/home-main.jpg')} resizeMode="cover" style={styles.maintopbox}>
        {props.dayspending && 
            <View style={styles.dayspending}>
                <Text style={styles.dayspendingtext}>{props.dayspending} days left</Text>
            </View>
        }
        <View style={styles.mainboxrow}>
            <Text style={styles.topboxheading}>Name Here</Text>
            <Text style={styles.topboxdesc}>Enjoy 1,000+ meditations, music, stories.</Text>
        </View>
    </ImageBackground>);
}

export default MainTopBox;

const styles = StyleSheet.create({
    maintopbox: { height: height / 3, width: '100%', borderRadius: 20, overflow: 'hidden', zIndex: 3, position: 'relative' },
    mainboxrow: { position: 'absolute', left: 20, bottom: 20, },
    topboxheading: { fontFamily: fonts.primaryBold, color: colors.white, fontSize: 20 },
    topboxdesc: { fontFamily: fonts.primaryMedium, color: colors.white, fontSize: 14 },
    dayspending: { backgroundColor: colors.orange, position: 'absolute', right: 20, top: 20, paddingHorizontal: 13, borderRadius: 20, paddingVertical: 1, overflow: 'hidden' },
    dayspendingtext: { fontFamily: fonts.primaryMedium, fontSize: 13, color: colors.white, textTransform: 'capitalize'}
})