import React, { useCallback, useEffect, useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';


import { IOS, colorScheme, colors, fonts, isIPad, isRTL } from '../theme';
import { I18nManager, Image, Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { DrawerContentScrollView, useDrawerProgress } from '@react-navigation/drawer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LogOut, SetLanguage, SetUserInfo, UpdateFcmToken, UpdateNotificationBadge } from '../redux/reducers/AppStateReducer';
import DrawerItem from '../components/drawer/DrawerItem';
import globalstyle from '../theme/style';

import { fcmService } from '../helpers/firebase/FCMService';
import { localNotificationService } from '../helpers/firebase/LocalNotificationService';
import messaging from '@react-native-firebase/messaging';
import { GetProfileApiCall } from '../redux/reducers/AuthReducer';

// import { connectSocket, getSocket } from '../helpers/socket-manager';
// import { useAppState } from '../hooks/useAppState';
import { EditProfileApiCall } from '../redux/reducers/UserStateReducer';
import draweritems from './draweritems';
import strings, { changeLang } from '../localization/translation';
import SplashScreen from 'react-native-splash-screen';
import RNRestart from 'react-native-restart';
import { GetDrawerMenu } from '../redux/reducers/ListingApiStateReducer';

const DrawerContent = (props) => {


  // const appState = useAppState();
  // console.log('appState status => ', appState);

  // useEffect(() => {

  //   fcmService.register(onRegister, onNotification, onOpenNotification);
  //   localNotificationService.configure(onOpenNotification);

  //   function onRegister(token) {
  //     console.log('onRegister => ', token);
  //     if (props.fcmToken == '' || props.fcmToken != token) {
  //       props.UpdateFcmToken(token);
  //       props.EditProfileApiCall(user.id, { fcm_token: token });
  //     }
  //   }

  //   const testtopic = 'test';
  //   messaging().subscribeToTopic(testtopic).then(() => console.log("Subscribed to topic:", testtopic)).catch((e) => {
  //     console.log(e);
  //   });

  //   const newtopic = 'newFirebaseNotification';
  //   messaging().subscribeToTopic(newtopic).then(() => console.log("Subscribed to topic:", newtopic)).catch((e) => {
  //     console.log(e);
  //   });

  //   function onNotification(notify) {
  //     console.log('onNotification => ', notify);
  //     const options = { soundName: 'default', };
  //     // localNotificationService.showNotification(0, notify.notification.title, notify.notification.body, notify, options,);
  //     // props.UpdateNotificationBadge(props.notificationBadge + 1);
  //     // if (notify.data.rideid) {
  //     //   props.navigation.navigate('Map', { rideid: notify?.data?.rideid });
  //     // }
  //   }

  //   function onOpenNotification(notify) {
  //     console.log('onOpenNotification => ', notify);
  //     if (props.isLogin && Object.keys(notify).length > 0) {
  //       props.navigation.navigate('Notifications')
  //     }
  //   }

  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     console.log('A new FCM message arrived!', remoteMessage);
  //     props.UpdateNotificationBadge(props.notificationBadge + 1);
  //     const notify = remoteMessage
  //     // const options = { soundName: 'default', };
  //     // localNotificationService.showNotification(0, notify.notification.title, notify.notification.body, notify, options,);
  //     // console.log('notify.rideid => ', notify.rideid);
  //   });

  //   return () => {
  //     fcmService.unRegister();
  //     localNotificationService.unregister();
  //     unsubscribe;
  //   };

  // }, []);

  useEffect(() => {
    // connectSocket();
    props.GetDrawerMenu();
  }, []);

  const [user, setUser] = useState(props.userInfo);
  const [drawerMenu, setDrawerMenu] = useState([]);

  useEffect(() => {
    // console.log('Drawer props.userInfo => ', props.userInfo);
    setUser(props.userInfo);
  }, [props.userInfo])

  useEffect(() => {
    if (props.isLogin) {
      props.GetProfileApiCall();
    }
  }, [])

  const menuRef = useRef(props.drawerMenu)
  useEffect(() => {
    if (props.drawerMenu != menuRef.current && props.drawerMenu?.success && props.drawerMenu?.data && props.drawerMenu?.data.length > 0) {
      console.log('props.drawerMenu?.data => ', props.drawerMenu?.data)
      setDrawerMenu(props.drawerMenu?.data.reverse())
    }
  }, [props.drawerMenu])

  const prevUserProfileResRef = useRef(props.getUserProfileResponse?.data);

  useEffect(() => {
    if (props.isLogin && props.getUserProfileResponse !== prevUserProfileResRef.current && props.getUserProfileResponse?.success && props.getUserProfileResponse?.data) {
      prevUserProfileResRef.current = props.getUserProfileResponse?.data;
      // console.log('props.getUserProfileResponse => ', props.getUserProfileResponse);
      let userdata = props.getUserProfileResponse?.data;
      props.SetUserInfo({
        ...props.userInfo,
        email: userdata?.email,
        first_name: userdata?.first_name,
        last_name: userdata?.last_name,
        phone: userdata?.phone,
        profile_picture: userdata?.profile_picture
      });
    }
  }, [props.getUserProfileResponse])

  // const [activeAccordion, setActiveAccordion] = useState(null);
  // const _handleAccordionToggle = (id) => {
  //   // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  //   setActiveAccordion((prevId) => (prevId === id ? null : id));
  // };

  return (
    <>
      {user &&
        <View style={{ backgroundColor: colorScheme == 'dark' ? colors.drawerbg : colors.headerbgcolor, paddingBottom: isIPad ? 60 : 30, paddingTop: IOS ? 60 : 30, }}>
          {/* <TouchableOpacity onPress={() => { props.navigation.closeDrawer() }} activeOpacity={0.8}>
          <Icon name={'x'} color={colors.white} size={16} />
        </TouchableOpacity> */}
          <TouchableOpacity activeOpacity={0.8} onPress={() => {
            props.navigation.navigate('Profile')
          }} style={{
            width: isIPad ? 120 : 90, height: isIPad ? 120 : 90, borderRadius: isIPad ? 120 : 90, overflow: 'hidden', marginLeft: 'auto', marginRight: 'auto', marginBottom: 10,
            // borderColor: colors.white, borderWidth: 1, 
          }}>
            <Image source={user?.profile_picture ? { uri: user?.profile_picture } : require('./../../assets/images/dummy-profile-image.png')} style={{ width: isIPad ? 120 : 90, height: isIPad ? 120 : 90, resizeMode: 'cover', }} />
          </TouchableOpacity>
          <Text style={{ fontFamily: fonts.primarySemiBold, color: colorScheme == 'dark' ? colors.white : colors.black, textAlign: 'center', fontSize: isIPad ? 26 : 20, marginBottom: 3 }}>{`${user?.first_name} ${user?.last_name}`}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name={'mail'} style={{ color: colors.orange, fontSize: 16, marginRight: 10, marginBottom: -4 }} />
            <Text style={{ fontFamily: fonts.primary, color: colorScheme == 'dark' ? colors.white : colors.black, textAlign: 'center', fontSize: isIPad ? 18 : 13 }}>{user?.email}</Text>
          </View>
          {/* <Text style={{ fontFamily: fonts.primary, color: colors.white, textAlign: 'center', fontSize: 12 }}>{user?.phone}</Text> */}
        </View>
      }
      <View style={{ backgroundColor: colors.deepblue, paddingVertical: 10, paddingHorizontal: 15, justifyContent: 'space-between', flexDirection: 'row' }}>
        <Text style={globalstyle.draweritemtext}>Language</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              props.SetLanguage('en')
              changeLang('en')
              I18nManager.allowRTL(true);
              I18nManager.forceRTL(false);
              setTimeout(() => {
                RNRestart.restart();
              }, 500)
              SplashScreen.show();
            }}
          >
            <Text style={[globalstyle.draweritemtext, !isRTL && { color: colors.orange }]}>English</Text>
          </TouchableOpacity>
          <View style={{ height: 15, width: 1, backgroundColor: colors.deepblue, marginHorizontal: 10 }} />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              props.SetLanguage('ar')
              changeLang('ar')
              I18nManager.allowRTL(true);
              I18nManager.forceRTL(true);
              setTimeout(() => {
                RNRestart.restart();
              }, 500)
              SplashScreen.show();
            }}
          >
            <Text style={[globalstyle.draweritemtext, { fontFamily: fonts.arabicMedium }, isRTL && { color: colors.orange }]}>عربي</Text>
            {/* <Text style={globalstyle.draweritemtext}>Arabic</Text> */}
          </TouchableOpacity>
        </View>
      </View>
      <DrawerContentScrollView {...props} style={[styles.sidebar,]} contentContainerStyle={{ paddingTop: 0 }}>
        {/* {draweritems.map((item, index) => <DrawerItem key={index} item={item} navigation={props.navigation} activescreen={props.currentScreen} />)} */}
        <DrawerItem key={0} item={{ title: strings.home, nav: 'Home' }} navigation={props.navigation} activescreen={props.currentScreen} />
        {drawerMenu.length > 0 && drawerMenu.map((item, index) => <DrawerItem key={index} item={item} navigation={props.navigation} activescreen={props.currentScreen} />)}
        <DrawerItem key={100} item={{ title: strings.questionanswer, nav: 'QuestionAnswer' }} navigation={props.navigation} activescreen={props.currentScreen} />
        <DrawerItem key={101} item={{ title: strings.contactus, nav: 'Contact' }} navigation={props.navigation} activescreen={props.currentScreen} />
        <View style={{ height: 10 }} />
      </DrawerContentScrollView>
      {user && <View style={{ backgroundColor: colorScheme == 'dark' ? colors.drawerbg : colors.headerbgcolor }}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => {
          // logout(props.navigation) 
          props.navigation.closeDrawer();
          props.EditProfileApiCall(user.id, { fcm_token: '' });
          props.LogOut();
          // props.navigation.navigate('Login');
          // props.navigation.reset({ index: 0, routes: [{ name: 'AuthScreens' }] })
        }}
          style={styles.logoutitem}>
          <Icon name="log-out" style={{ color: colors.black, marginRight: 15 }} size={16} />
          <Text style={[globalstyle.draweritemtext, { color: colors.black }]}>{strings.logout}</Text>
        </TouchableOpacity>
      </View>}
    </>
  )
}

const styles = StyleSheet.create({
  sidebar: {
    backgroundColor: colorScheme == 'dark' ? colors.drawerbg : colors.headerbgcolor,
    //flex: 1 
  },
  logoutitem: { flexDirection: 'row', paddingHorizontal: 30, paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: '#ffffff09', backgroundColor: colors.orange, borderTopRightRadius: 30 }
})

const setStateToProps = (state) => ({
  currentScreen: state.appstate.currentScreen,
  fcmToken: state.appstate.fcmToken,
  notificationBadge: state.appstate.notificationBadge,
  userInfo: state.appstate.userInfo,
  isLogin: state.appstate.isLogin,
  getUserProfileResponse: state.authstate.getUserProfileResponse,
  language: state.appstate.language,
  drawerMenu: state.listingstate.drawerMenu,
})

const mapDispatchToProps = (dispatch) => {
  return {
    LogOut: bindActionCreators(LogOut, dispatch),
    UpdateFcmToken: bindActionCreators(UpdateFcmToken, dispatch),
    UpdateNotificationBadge: bindActionCreators(UpdateNotificationBadge, dispatch),
    GetProfileApiCall: bindActionCreators(GetProfileApiCall, dispatch),
    SetUserInfo: bindActionCreators(SetUserInfo, dispatch),
    EditProfileApiCall: bindActionCreators(EditProfileApiCall, dispatch),
    GetDrawerMenu: bindActionCreators(GetDrawerMenu, dispatch),
    SetLanguage: bindActionCreators(SetLanguage, dispatch)
  }
}

export default connect(setStateToProps, mapDispatchToProps)(DrawerContent);

