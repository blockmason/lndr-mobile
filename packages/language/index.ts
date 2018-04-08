import { NativeModules, Platform } from 'react-native'

import da from './languages/da'
import de from './languages/de'
import el from './languages/el'
import en from './languages/en'
import es from './languages/es'
import fi from './languages/fi'
import fr from './languages/fr'
import hu from './languages/hu'
import it from './languages/it'
import ko from './languages/ko'
import jp from './languages/jp'
import nl from './languages/nl'
import nb from './languages/nb'
import pl from './languages/pl'
import pt from './languages/pt'
import sv from './languages/sv'
import zh_CN from './languages/zh-CN'

let locale = 'en-US'

try {
  if (Platform.OS === 'ios') {
    locale = NativeModules.SettingsManager.settings.AppleLocale
  } else {
    locale = NativeModules.I18nManager.localeIdentifier
  }
} catch (e) {}

export const language = locale.slice(0, 2)

export const country = locale.slice(3, 5)

const languages = { da, de, el, en, es, fi, fr, hu, it, ko, jp, nl, nb, pl, pt, sv, "zh-CN": zh_CN }

let exportLanguage = language.indexOf('zh') === 0 ? languages[locale] : languages[language]

if (exportLanguage === undefined) {
  exportLanguage = languages.en
}

export default exportLanguage
