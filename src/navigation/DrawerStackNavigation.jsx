import React from "react";
import { StyleSheet } from "react-native";

import { colorScheme, colors, fonts, isIPad, width } from "../theme";
import { createDrawerNavigator, useDrawerProgress, useDrawerStatus } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

import DrawerContent from '../navigation/Drawer';
import MainStackNavigation from "./MainStackNavigation";

function DrawerStackNavigation() {

    return (
        //headerMode="none"
        <Drawer.Navigator
            id="LeftDrawer"
            useLegacyImplementation={false}
            // initialRouteName={initialRouteName}
            drawerContent={props => {
                return <DrawerContent {...props} />;
            }}
            screenOptions={{
                drawerStyle: styles.drawerStyles,
                drawerType: "slide",
                // drawerHideStatusBarOnOpen: true,
                // drawerStatusBarAnimation: 'fade',
                // drawerLockMode: 'locked-closed',
                // drawerType: dimensions.width >= 768 ? 'permanent' : 'front',
                drawerPosition: "left",
                overlayColor: "transparent",
                keyboardDismissMode: "on-drag",
                // sceneContainerStyle: { backgroundColor: 'transparent' },
                sceneContainerStyle: { backgroundColor: colorScheme == 'dark' ? colors.drawerbg : colors.headerbgcolor },
            }}>
            {/* <Drawer.Screen name="AuthScreens" options={{
                headerShown: false,
                swipeEnabled: false,
                // gestureEnabled: false
            }}>
                {props => <AuthStackNavigation {...props} />}
            </Drawer.Screen> */}
            <Drawer.Screen name="Screens" options={{ headerShown: false }}>
                {props => <MainStackNavigation {...props} />}
            </Drawer.Screen>
        </Drawer.Navigator>
    );
}

export default DrawerStackNavigation;

const styles = StyleSheet.create({
    stack: { flex: 1 },
    drawerStyles: { flex: 1, width: isIPad ? '60%' : '70%' },
    // badge: { backgroundColor: '#f00', color: '#fff', position: 'absolute', width: 11, height: 11, top: -2, right: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', borderRadius: 10, zIndex: 1, fontSize: 12, fontFamily: fonts.primary, },
    notibadge: { position: 'relative' },
    headerlogo: { height: 40, resizeMode: 'contain' },
    menuicon: { height: 15, resizeMode: 'contain' },
    notifiicon: { width: 50, height: 23, resizeMode: 'contain' },
});