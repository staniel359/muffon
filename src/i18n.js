import { createI18n } from 'vue-i18n'
import local from '#/plugins/local'
import en from '*/locales/en.json'
import ru from '*/locales/ru.json'

export default createI18n({
  locale: local.get(
    'profile.language'
  ),
  fallbackLocale: 'en',
  messages: {
    en,
    ru
  }
})
