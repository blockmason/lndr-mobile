import { NativeModules, Platform } from 'react-native'

import ar from './languages/ar'
import cs from './languages/cs'
import da from './languages/da'
import de from './languages/de'
import el from './languages/el'
import en from './languages/en'
import es from './languages/es'
import fi from './languages/fi'
import fr from './languages/fr'
import hi from './languages/hi'
import hu from './languages/hu'
import indo from './languages/in'
import it from './languages/it'
import iw from './languages/iw'
import ko from './languages/ko'
import ms from './languages/ms'
import ja from './languages/ja'
import nl from './languages/nl'
import nb from './languages/nb'
import no from './languages/no'
import pl from './languages/pl'
import pt from './languages/pt'
import ru from './languages/ru'
import sv from './languages/sv'
import th from './languages/th'
import tr from './languages/tr'
import vi from './languages/vi'
import zh_CN from './languages/zh-CN'

let locale = 'en-US'

try {
  if (Platform.OS === 'ios') {
    locale = NativeModules.SettingsManager.settings.AppleLocale
  } else {
    locale = NativeModules.Localization.deviceLocale.replace('-', '_')
  }
} catch (e) {}

export const language = locale.slice(0, 2)

export const country = locale.slice(3, 5)

const languages = {
  ar, cs, da, de, el,
  en, es, fi, fr, hi,
  hu, "in": indo, it, iw, ko,
  ja, ms, nl, nb, no,
  pl, pt, ru, sv, th,
  tr, vi, zh: zh_CN
}

let exportLanguage = languages[language]

if (exportLanguage === undefined) {
  exportLanguage = languages.en
}

export default exportLanguage
