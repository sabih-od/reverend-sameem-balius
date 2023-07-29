import { LayoutAnimation, StyleSheet, Text } from "react-native";
import { colors, fonts, width } from "../../theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import globalstyle from "../../theme/style";
import Icon from "react-native-vector-icons/Feather";
import { useState } from "react";

const DrawerItem = ({ item, navigation, activescreen }) => {
    // console.log('item?.submenu => ', item.submenu)

    const [isActive, setIsActive] = useState(false);

    return (
        <>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    if (item.nav) navigation.navigate('Screens', { screen: item.nav });
                    else {
                        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                        setIsActive(!isActive)
                    }
                }}
                style={[globalstyle.draweritemrow, { justifyContent: 'space-between', borderLeftColor: activescreen == item.nav ? colors.orange : 'transparent' }]}>
                {/* <Icon name={item.icon} style={{ color: colors.white, marginRight: 15 }} size={16} /> */}
                <Text style={globalstyle.draweritemtext}>{item.title}</Text>
                {item?.submenu && <Icon name={isActive ? "chevron-up" : "chevron-down"} style={{ color: colors.white }} />}
                {/* <View style={{ width: 20, height: 20, backgroundColor: colors.orange, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: colors.white, fontFamily: fonts.latoRegular, fontSize: 10 }}>12</Text>
        </View> */}
            </TouchableOpacity>
            {item?.submenu && isActive && item?.submenu.map((child, index) => {
                return (
                    <TouchableOpacity
                        key={index}
                        onPress={() => {
                            navigation.navigate('Screens', { screen: child.nav })
                        }}
                        style={[globalstyle.draweritemrow, { backgroundColor: colors.darkblue, alignItems: 'center',  borderLeftColor: activescreen == item.nav ? colors.orange : 'transparent' }]}
                    >
                        <Icon name={"chevron-right"} style={{ color: colors.white, marginRight: 15 }} />
                        <Text style={globalstyle.draweritemtext}>{child?.title}</Text>
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