import { StyleSheet } from 'react-native';

import { colorScheme, colors, fontcolor, fonts, width } from './index';

const globalstyle = StyleSheet.create({
  // fullview: { ...StyleSheet.absoluteFillObject, height: '100%', backgroundColor: '#f4f4f4' },
  // inputBox: { marginBottom: 10, },
  // inputField: { borderWidth: 1, borderColor: '#eee', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 7, fontFamily: fonts.primary, backgroundColor: '#fff', fontSize: 13 },
  // button: { width: '100%', backgroundColor: colors.primary, paddingVertical: 10, borderRadius: 7, marginBottom: 10 },
  // buttonText: { color: '#fff', fontSize: 16, fontFamily: fonts.primary, textAlign: 'center', textTransform: 'uppercase'},
  // logoText: { fontFamily: fonts.primarySemiBold, color: colors.primary, fontSize: 30, textAlign: 'center', marginBottom: 20,textTransform: 'uppercase' },
  // loginbox: { width: '90%', marginHorizontal: '5%' },

  authbgimage: { paddingHorizontal: 15, flex: 1, justifyContent: 'space-between', },
  authbutton: { backgroundColor: colors.orange, borderRadius: 30, paddingVertical: 11, marginTop: 20 },
  authbuttontext: { textTransform: 'uppercase', fontSize: 18, fontFamily: fonts.primarySemiBold, textAlign: 'center', color: '#fff' },
  authheading: { textTransform: 'uppercase', fontFamily: fonts.primarySemiBold, fontSize: 32, marginBottom: 0, textAlign: 'center', color: fontcolor, marginTop: 60 },
  authdescription: { fontFamily: fonts.primary, marginBottom: 40, textAlign: 'center', color: fontcolor },
  inputbox: { backgroundColor: '#fff', marginBottom: 5, borderRadius: 50, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginTop: 15 },
  inputfield: { paddingHorizontal: 15, paddingVertical: 13, fontFamily: fonts.primary, width: '100%', color: colors.black },
  alreadysignin: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20, },
  errorField: { color: '#f00', fontFamily: fonts.primary, fontSize: 12, marginTop: 2, marginLeft: 15 },
  alreadyaccount: { fontFamily: fonts.primary, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', color: fontcolor },
  actionauthtext: { color: '#f00', fontFamily: fonts.primary },
  authlefticon: { color: colors.deepblue },
  showhideicontouch: { padding: 10, zIndex: 1, position: 'absolute', right: 10, },
  showhideicon: { color: '#999' },

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