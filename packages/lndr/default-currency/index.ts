let defaultCurrency = 'USD'

import { NativeModules, Platform } from 'react-native'

let language = ''

try {
  if (Platform.OS === 'ios') {
    language = NativeModules.SettingsManager.settings.AppleLocale
  } else {
    language = NativeModules.I18nManager.localeIdentifier
  }
} catch (e) {}

if(language.indexOf('ko') !== -1) {
  defaultCurrency = 'KRW'
} else if(language.indexOf('ja') !== -1) {
  defaultCurrency = 'JPY'
}

export default defaultCurrency
