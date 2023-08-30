// import getStoredState from 'redux-persist/es/getStoredState';
import { store } from '../redux/store';
import colors from './colors';
import fonts from './fonts';
// import globalstyle from './style';
//import images from './images';
//import styles from './style';

const state = store.getState();
const lang = state?.appstate?.language;
console.log('state => ', state?.appstate?.language);

import { Appearance, Dimensions, I18nManager } from 'react-native';
const { width, height } = Dimensions.get('window')
const isRTL = I18nManager.isRTL;// lang == 'en' ? false : true; //I18nManager.isRTL;
// const urdufont = I18nManager.isRTL ? {fontFamily: fonts.NafeesNaskh} : null;
const flip = isRTL ? { transform: [{ scaleX: -1 }] } : null;
const colorScheme = Appearance.getColorScheme();
console.log('colorScheme => ', colorScheme)

const isDarkMode = colorScheme == 'dark';
const fontcolor = isDarkMode ? colors.white : colors.black;
const invertcolor = colorScheme != 'dark' ? colors.white : colors.black;
const isIPad = width > 700 ? true : false;
const IOS = Platform.OS == 'ios' ? true : false;
const backgroungImage = isDarkMode ? require('./../../assets/images/home-bg.jpg') : require('./../../assets/images/auth-bg.jpg')
const textAlign = isRTL ? 'right' : 'left';

export {
    colors, fonts, width, height, colorScheme, fontcolor, invertcolor, isIPad, IOS, backgroungImage,
    // urdufont, 
    textAlign,
    isRTL,
    flip,
    isDarkMode
};