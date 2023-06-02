import { StyleSheet } from 'react-native';

import { colors, fonts } from './index';

const globalstyle = StyleSheet.create({
  fullview: { ...StyleSheet.absoluteFillObject, height: '100%', backgroundColor: '#f4f4f4' },
  inputBox: { marginBottom: 10, },
  inputField: { borderWidth: 1, borderColor: '#eee', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 7, fontFamily: fonts.primary, backgroundColor: '#fff', fontSize: 13 },
  button: { width: '100%', backgroundColor: colors.primary, paddingVertical: 10, borderRadius: 7, marginBottom: 10 },
  buttonText: { color: '#fff', fontSize: 16, fontFamily: fonts.primary, textAlign: 'center', textTransform: 'uppercase'},
  logoText: { fontFamily: fonts.primarySemiBold, color: colors.primary, fontSize: 30, textAlign: 'center', marginBottom: 20,textTransform: 'uppercase' },
  loginbox: { width: '90%', marginHorizontal: '5%' },
});

export default globalstyle;