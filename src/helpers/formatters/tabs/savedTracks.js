import i18n from '*/plugins/i18n'
import {
  savedTracks as formatSavedTracksLink
} from '*/helpers/formatters/links'

export default function () {
  const title = i18n.global.t(
    'navigation.savedTracks'
  )

  const {
    path
  } = formatSavedTracksLink()

  return {
    icon: 'save',
    title,
    path
  }
}
