import { createI18n } from 'vue-i18n'
import local from '&/local'
import en from '#/data/plugins/i18n/locales/en.json'
import it from '#/data/plugins/i18n/locales/it.json'
import ru from '#/data/plugins/i18n/locales/ru.json'

const locale = local.get(
  'profile.language'
)

const fallbackLocale = 'en'

const messages = {
  en,
  it,
  ru
}

export default createI18n({
  locale,
  fallbackLocale,
  messages
})
