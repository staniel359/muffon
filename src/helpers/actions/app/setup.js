import $ from 'jquery'
import '@/../semantic/dist/semantic.min.js'
import slick from 'slick-carousel'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '@/assets/styles/Main.sass'
import setupShortcuts from './setup/shortcuts'
import setupAxios from '@/plugins/axios'
import setupI18nCountries from '@/plugins/i18nCountries'
import setupDayjs from '@/plugins/dayjs'

if (typeof slick === 'function') {
  slick($)
} else if (slick && typeof slick.default === 'function') {
  slick.default($)
}

export default function () {
  setupShortcuts()

  setupAxios()

  setupI18nCountries()

  setupDayjs()
}
