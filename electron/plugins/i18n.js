import i18n from 'i18n'
import {
  formatFileRootPath
} from '#/paths'
import getElectronStoreKey from '#/actions/electronStore/getKey'

// i18n

const locale =
  getElectronStoreKey(
    'profile.language'
  )

const locales = [
  'be',
  'de',
  'en',
  'it',
  'ru'
]

const directory =
  formatFileRootPath(
    'build_electron/plugins/i18n/locales'
  )

const options = {
  defaultLocale: locale,
  locales,
  directory,
  objectNotation: true
}

export default function () {
  i18n.configure(
    options
  )
}
