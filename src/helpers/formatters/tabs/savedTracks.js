import i18n from '@/plugins/i18n'
import {
  savedTracks as formatSavedTracksLink
} from '@/helpers/formatters/links'

export default function () {
  const title = i18n.global.t(
    'navigation.savedTracks'
  )

  const link = formatSavedTracksLink()

  return {
    icon: 'savedTrack',
    title,
    link,
    path: link.path
  }
}
