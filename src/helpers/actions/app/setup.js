import '@/../semantic/dist/semantic.min.js'
import 'slick-carousel'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '@/assets/styles/Main.sass'
import setupShortcuts from './setup/shortcuts'
import setupAxios from '@/plugins/axios'
import setupI18nCountries from '@/plugins/i18nCountries'
import setupDayjs from '@/plugins/dayjs'

export default function () {
  setupShortcuts()

  setupAxios()

  setupI18nCountries()

  setupDayjs()
}
