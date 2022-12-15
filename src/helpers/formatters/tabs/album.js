import i18n from '#/plugins/i18n'
import {
  main as formatAlbumMainLink
} from '@/helpers/formatters/links/album'

export default function (
  {
    artistName,
    albumTitle,
    sourceParams,
    scope
  }
) {
  function formatAlbumPageTitle () {
    if (scope) {
      return i18n.global.t(
        `navigation.model.${scope}`,
        {
          modelName: albumTitle
        }
      )
    } else {
      return albumTitle
    }
  }

  const artistAlbumsPageName = i18n.global.t(
    'navigation.model.albums',
    {
      modelName: artistName
    }
  )

  const title = [
    formatAlbumPageTitle(),
    artistAlbumsPageName
  ].join(
    ' | '
  )

  function formatPath () {
    switch (scope) {
      default:
        return formatAlbumMainLink(
          {
            artistName,
            albumTitle,
            sourceParams
          }
        ).path
    }
  }

  return {
    icon: 'record vinyl',
    title,
    path: formatPath()
  }
}
