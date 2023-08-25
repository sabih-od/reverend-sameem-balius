import { LayoutAnimation, StyleSheet, Text } from "react-native";
import { colors, fonts, isDarkMode, width } from "../../theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import globalstyle from "../../theme/style";
import Icon from "react-native-vector-icons/Feather";
import { useState } from "react";

const DrawerItem = ({ item, navigation, activescreen }) => {
    // console.log('item => ', item)

    const [isActive, setIsActive] = useState(false);

    return (
        <>
            {item?.parent_id == null && <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    if (item?.children?.length == 0) navigation.navigate('Screens', { screen: 'Posts', params: { item: item } }); // PostsList
                    else if (item?.nav) {
                        navigation.navigate(item?.nav);
                    } else {
                        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                        setIsActive(!isActive)
                    }
                }}
                style={[globalstyle.draweritemrow, { justifyContent: 'space-between', borderLeftColor: activescreen == item.nav ? colors.orange : 'transparent' }]}>
                {/* <Icon name={item.icon} style={{ color: colors.white, marginRight: 15 }} size={16} /> */}
                <Text style={[globalstyle.draweritemtext, !isDarkMode && { color: colors.black }]}>{item?.name ? item?.name : item?.title}</Text>
                {item?.children && item?.children.length > 0 && <Icon name={isActive ? "chevron-up" : "chevron-down"} style={{ color: isDarkMode ? colors.white : colors.black }} />}
                {/* <View style={{ width: 20, height: 20, backgroundColor: colors.orange, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: colors.white, fontFamily: fonts.latoRegular, fontSize: 10 }}>12</Text>
                    </View> */}
            </TouchableOpacity>}
            {
                item?.children?.length > 0 && isActive && item?.children.map((child, index) => {
                    return (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            key={index}
                            onPress={() => {
                                if (child?.id == 14) navigation.navigate('Screens', { screen: 'CDsList', params: { item: item } });
                                else navigation.navigate('Screens', { screen: 'Posts', params: { item: child } })
                            }}
                            style={[globalstyle.draweritemrow, { backgroundColor: isDarkMode ? colors.darkblue : colors.headerbgcolor, alignItems: 'center', borderLeftColor: activescreen == item.nav ? colors.orange : 'transparent' }]}
                        >
                            <Icon name={"circle"} style={{ color: isDarkMode ? colors.white : colors.black, marginRight: 15, fontSize: 6 }} />
                            <Text style={[globalstyle.draweritemtext, !isDarkMode && { color: colors.black }]}>{child?.name ? child?.name : child?.title}</Text>
                        </TouchableOpacity>
                    )
                })
            }
        </>
    )
}

export default DrawerItem;

const styles = StyleSheet.create({

})