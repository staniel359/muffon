import { createI18n } from 'vue-i18n'
import local from '*/plugins/local'
import en from '*/helpers/data/plugins/i18n/locales/en.json'
import it from '*/helpers/data/plugins/i18n/locales/it.json'
import ru from '*/helpers/data/plugins/i18n/locales/ru.json'

const locale = local.get(
  'profile.language'
)

const messages = {
  en,
  it,
  ru
}

export default createI18n({
  locale,
  fallbackLocale: 'en',
  messages
})
