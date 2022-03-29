import i18n from '*/plugins/i18n'
import { playlists as formatPlaylistsLink } from '*/helpers/formatters/links'

export default function () {
  const title = i18n.global.t(
    'navigation.playlists'
  )

  const { path } = formatPlaylistsLink()

  return {
    icon: 'file audio',
    title,
    path
  }
}
