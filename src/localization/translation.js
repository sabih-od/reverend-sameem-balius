import LocalizedStrings from 'react-native-localization';
import english from './lang/en'
import arabic from './lang/ar'
import { isRTL } from '../theme';

const strings = new LocalizedStrings({
    en: english,
    ar: arabic
});

// strings.setLanguage(isRTL ? 'ar' : 'en')

export const changeLang = (languageKey) => {
    console.log('languageKey => ', languageKey)
    strings.setLanguage(languageKey)
}
export default strings;