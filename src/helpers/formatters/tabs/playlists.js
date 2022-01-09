import i18n from '&/i18n'
import { playlists as formatPlaylistsLink } from '#/formatters/links'

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
