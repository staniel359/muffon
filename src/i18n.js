import { createI18n } from 'vue-i18n'
import local from '#/plugins/local'
import en from '*/locales/en.json'
import it from '*/locales/it.json'
import ru from '*/locales/ru.json'

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
