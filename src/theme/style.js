import { StyleSheet } from 'react-native';

import { IOS, colorScheme, colors, fontcolor, fonts, height, isIPad, width } from './index';

const globalstyle = StyleSheet.create({
  // fullview: { ...StyleSheet.absoluteFillObject, height: '100%', backgroundColor: '#f4f4f4' },
  // inputBox: { marginBottom: 10, },
  // inputField: { borderWidth: 1, borderColor: '#eee', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 7, fontFamily: fonts.primary, backgroundColor: '#fff', fontSize: 13 },
  // button: { width: '100%', backgroundColor: colors.primary, paddingVertical: 10, borderRadius: 7, marginBottom: 10 },
  // buttonText: { color: '#fff', fontSize: 16, fontFamily: fonts.primary, textAlign: 'center', textTransform: 'uppercase'},
  // logoText: { fontFamily: fonts.primarySemiBold, color: colors.primary, fontSize: 30, textAlign: 'center', marginBottom: 20,textTransform: 'uppercase' },
  // loginbox: { width: '90%', marginHorizontal: '5%' },

  fullview: { ...StyleSheet.absoluteFillObject, height: '100%', },
  authContainer: { ...StyleSheet.absoluteFillObject, height: height, resizeMode: 'cover' },
  authLogoContainer: { alignItems: 'center' },
  authLogo: { width: 150, height: 130, resizeMode: 'contain', marginBottom: 25, },
  authheading: { fontFamily: fonts.headingFont, fontSize: isIPad ? 44 : 34, color: colors.black },
  authdescription: { fontFamily: fonts.primary, fontSize: isIPad ? 22 : 17, color: colors.grey, marginBottom: 15 },
  authSubmitButton: { backgroundColor: colors.orange, padding: 17, borderRadius: 14, marginTop: 15 },
  authSubmitButtonText: { color: colors.white, fontFamily: fonts.primarySemiBold, fontSize: isIPad ? 17 : 16, textAlign: 'center', textTransform: 'uppercase' },

  authscreencontainer: { maxWidth: 500, marginLeft: 'auto', marginRight: 'auto' },

  authbuttontext: { textTransform: 'uppercase', fontSize: 18, fontFamily: fonts.primarySemiBold, textAlign: 'center', color: colors.white },
  inputbox: { backgroundColor: colors.white, marginBottom: 5, borderRadius: 14, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginTop: 15 },
  inputfield: { paddingHorizontal: 15, paddingVertical: IOS ? 20 : 13, fontFamily: fonts.primary, width: '100%', color: colors.black, fontSize: isIPad ? 17 : 14 },
  inputlabel: { fontFamily: fonts.primary, fontSize: 15, marginBottom: -5, marginLeft: 14 },
  alreadysignin: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20, },
  errorField: { color: colors.red, fontFamily: fonts.primary, fontSize: 12, marginTop: 2, marginLeft: 15 },
  alreadyaccount: { fontFamily: fonts.primary, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', color: fontcolor, fontSize: isIPad ? 18 : 14 },
  // actionauthtext: { color: colors.black, fontFamily: fonts.primarySemiBold, fontSize: isIPad ? 18 : 14 },
  // authlefticon: { color: colors.deepblue },
  // showhideicontouch: { padding: 10, zIndex: 1, position: 'absolute', right: 10, },
  showhideicon: { color: '#999' },

  draweritemtext: { fontFamily: fonts.primary, color: colors.white, fontSize: isIPad ? 19 : 14 },
  draweritemrow: { flexDirection: 'row', paddingHorizontal: 30, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#ffffff09', borderLeftWidth: 4 },

  footerloadmore: { display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 7 },
  footerloadingtext: { fontFamily: fonts.primary, marginLeft: 8, },

  modaltitle: { fontFamily: fonts.latoBlack, color: colors.black, textAlign: 'center', paddingTop: 15, paddingBottom: 5, fontSize: isIPad ? 24 : 18, color: colors.green },
  modaldesc: { fontFamily: fonts.primary, color: colors.black, textAlign: 'center', fontSize: isIPad ? 16 : 13, paddingHorizontal: 15, paddingBottom: 15, color: '#444' },
  modalbtnsrow: { flexDirection: 'row', alignItems: 'center', borderTopColor: '#ddd', borderTopWidth: 1, },
  modalbtntext: { fontFamily: fonts.primary, color: colors.black, textAlign: 'center', paddingVertical: 14, textAlign: 'center', fontSize: isIPad ? 18 : 14 },
  modalbtn: { width: '50%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },

  notibadge: { position: 'relative', width: 36, height: 36, marginRight: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 40, overflow: 'hidden', },
  badge: { backgroundColor: colors.orange, color: colors.white, position: 'absolute', width: 11, height: 11, top: 5, right: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', borderRadius: 10, zIndex: 1, fontSize: 12, fontFamily: fonts.primary, },
    
  headerTitleStyle: { fontFamily: fonts.headingFont, fontSize: isIPad ? 22 : 18, textTransform: 'capitalize' },

  speakerboximage: { height: isIPad ? 100 : 75, borderRadius: 7, overflow: 'hidden', width: isIPad ? 100 : 75, marginRight: isIPad ? 15 : 10 },
  speakerboxtitle: { fontFamily: fonts.primarySemiBold, color: colors.green, fontSize: isIPad ? 18 : 14 },
  speakerboxrow: { flexDirection: 'row', marginBottom: 4, alignItems: 'center' },
  speakerboxname: { fontFamily: fonts.headingFont, color: colors.black, fontSize: isIPad ? 22 : 16, },
  speakerboxdesc: { fontFamily: fonts.primary, color: colors.grey, fontSize: isIPad ? 18 : 13, },
  speakerdetailheading: { fontSize: isIPad ? 28 : 22, fontFamily: fonts.headingFont, color: colors.black, marginBottom: 5 },
  speakerdetailparagraph: { fontSize: isIPad ? 18 : 14, marginBottom: 0, fontFamily: fonts.primary, color: colors.grey, lineHeight: isIPad ? 24 : 20 },
  speakerdetailparabold: { fontSize: 14, fontFamily: fonts.primarySemiBold, color: colors.black },
  speakerdetailimage: { width: 100, height: 100, resizeMode: 'cover', borderRadius: 10, marginBottom: 15, marginRight: 15 },
  speakerdetaildesignation: { fontFamily: fonts.primarySemiBold, color: colors.green, fontSize: isIPad ? 18 : 15 },
  
  detaildate: { fontFamily: fonts.primarySemiBold, color: colors.orange, marginBottom: 5, fontSize: isIPad ? 15 : 13 },
  detailtitle: { fontFamily: fonts.headingFont, color: colors.black, fontSize: isIPad ? 32 : 28, marginBottom: 5 },
  detaildescription: { fontFamily: fonts.primary, color: colors.black, fontSize: isIPad ? 18 : 15 },







  

  authbgimage: { paddingHorizontal: 15, flex: 1, justifyContent: 'space-between', },
  authbutton: { backgroundColor: colors.orange, borderRadius: 30, paddingVertical: 11, marginTop: 20 },
  authbuttontext: { textTransform: 'uppercase', fontSize: 18, fontFamily: fonts.primarySemiBold, textAlign: 'center', color: '#fff' },
  authheading: { textTransform: 'uppercase', fontFamily: fonts.primarySemiBold, fontSize: 32, marginBottom: 0, textAlign: 'center', color: fontcolor, marginTop: 60 },
  authdescription: { fontFamily: fonts.primary, marginBottom: 40, textAlign: 'center', color: fontcolor },
  // inputbox: { backgroundColor: '#fff', marginBottom: 5, borderRadius: 50, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginTop: 15 },
  // inputfield: { paddingHorizontal: 15, paddingVertical: 13, fontFamily: fonts.primary, width: '100%', color: colors.black },
  // alreadysignin: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20, },
  // errorField: { color: '#f00', fontFamily: fonts.primary, fontSize: 12, marginTop: 2, marginLeft: 15 },
  // alreadyaccount: { fontFamily: fonts.primary, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', color: fontcolor },
  actionauthtext: { color: colors.black, fontFamily: fonts.primarySemiBold, fontSize: isIPad ? 18 : 14 },
  authlefticon: { color: colors.deepblue },
  // showhideicontouch: { padding: 10, zIndex: 1, position: 'absolute', right: 10, },
  // showhideicon: { color: '#999' },

  topicbgimage: { paddingHorizontal: 15, flex: 1 },
  topicheadingrow: { marginVertical: 15 },
  topicheading: { fontFamily: fonts.primaryBold, fontSize: 22, textAlign: 'center', color: colorScheme == 'dark' ? colors.white : colors.black, textTransform: 'capitalize', marginBottom: -5 },
  topicdesc: { fontFamily: fonts.primaryMedium, fontSize: 15, textAlign: 'center', color: colorScheme == 'dark' ? colors.white : colors.black },
  topicdetailbox: { height: width / 2, width: width / 2.25, borderRadius: 10, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', position: 'relative', marginBottom: 15, },
  topiccheckicon: { alignItems: 'center', justifyContent: 'center', width: 25, height: 25, backgroundColor: colors.lightblue, borderRadius: 20, position: 'absolute', top: 10, right: 10 },
  topiccontinuebtn: { backgroundColor: colors.orange, padding: 13, borderRadius: 40, marginVertical: 10 },
  topiccontinuebtntext: { textTransform: 'uppercase', fontFamily: fonts.primaryBold, color: colors.white, textAlign: 'center', fontSize: 16 }
});

export default globalstyle;