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

export const settlementTerms = [
  'سداد مبلغ لـ', 'طلب سداد مبلغ لـ',
  'Vypořádání na', 'Žádost o vypořádání na',
  'Afregner', 'Anmodning om at afregne med',
  'Abrechnung für ', 'Anfrage zur Abrechnung für',
  'Διακανονισμός για', 'Αίτηση διακανονισμού για',
  `Settling up for`, `Request to settle for`,
  'Acordando Pago Por', 'Solicitud de Acordar Pago Por',
  'Maksetaan velkaa', 'Pyydetään velan maksua summasta',
  'Régler pour', 'Demande de régler pour',
  'में निपटान करना', 'में निपटान के लिए रिक्वेस्ट करें',
  'Kiegyenlítés neki', 'Kérés a kiegyenlítéshez neki',
  'Melunasi', 'Permintaan pelunasan',
  'Saldare debito per', 'Richiesta di pagamento di',
  'החזרת חוב עבור', 'בקשת החזרת חוב עבור',
  `を設定`, `の帳消しをリクエスト`,
  `청산`, `청산 요청`,
  'Menyelesaikan hutang untuk', 'Mohon untuk menyelesaikan bagi',
  'Gjør opp for', 'Forespørsel om å betale for',
  'Betaling voor', 'Verzoek om te betalen voor',
  'Rozliczenie za', 'Rozlicz za',
  'Pagar a', 'Pedido de pagamento de',
  'Расселение на', 'Запрос довольствоваться',
  'Betala', 'Begäran om att komma överens om',
  'ชำระหนี้เป็นจำนวน ', 'ขอชำระหนี้เป็นจำนวน',
  'Size ödenecek tutar', 'Ödenmesini istediğiniz tutar',
  'Thanh toán cho ', 'Yêu cầu thanh toán cho',
  "偿清债务", "请求偿清债务",
]

export default exportLanguage
