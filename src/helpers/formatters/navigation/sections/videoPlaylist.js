import {
  main as formatVideoPlaylistMainLink
} from '@/helpers/formatters/links/videoPlaylist'

export default function (
  {
    playlistId,
    playlistTitle,
    isActive
  }
) {
  function formatLink () {
    if (!isActive) {
      return formatVideoPlaylistMainLink(
        {
          playlistId
        }
      )
    }
  }

  return {
    name: playlistTitle,
    isActive,
    link: formatLink()
  }
}
