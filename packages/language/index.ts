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
import no from './languages/no'
import pl from './languages/pl'
import pt from './languages/pt'
import sv from './languages/sv'

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

const languages = { da, de, el, en, es, fi, fr, hu, it, ko, jp, nl, no, pl, pt, sv }

const exportLanguage = languages[language]

export const currencies = {
  USD: '$',
  JPY: '¥',
  KRW: '₩',
  DKK: 'Kr.',
  CHF: 'CHf',
  EUR: '€',
  AUD: '$',
  GBP: '£',
  CAD: '$',
  NOK: 'kr',
  SEK: 'kr'
}

export const transferLimits = {
  USD: '200',
  JPY: '20000',
  KRW: '200000',
  DKK: '1500',
  CHF: '250',
  EUR: '200',
  AUD: '250',
  GBP: '200',
  CAD: '200',
  NOK: '2000',
  SEK: '2000'
}

export default exportLanguage
