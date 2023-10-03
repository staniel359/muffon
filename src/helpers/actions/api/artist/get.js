import getRequest from '@/helpers/actions/api/request/get'
import formatArtistRequestUrl from '@/helpers/formatters/request/artist/url'
import {
  snakeCase
} from 'change-case'

export default function (
  {
    source = 'lastfm',
    artistName,
    artistId,
    albumType = '',
    scope = '',
    page,
    limit,
    update
  }
) {
  const url =
    formatArtistRequestUrl(
      {
        source,
        artistName,
        artistId,
        scope
      }
    )

  const params = {
    ...(albumType && {
      album_type: snakeCase(
        albumType
      )
    }),
    ...(update && {
      update
    })
  }

  const scopes = {
    id: [
      '',
      'tracks',
      'albums',
      'similar',
      'profiles'
    ],
    language: [
      '',
      'description'
    ]
  }

  function isMatchedScope (
    selfScope
  ) {
    return (
      selfScope ===
        scope.toString()
    )
  }

  const isWithSelfId =
    scopes.id.some(
      isMatchedScope
    )

  const isWithSelfLanguage =
    scopes.language.some(
      isMatchedScope
    )

  const handleSuccess = (
    response
  ) => {
    const artistData =
      response.data.artist

    this.artistData = artistData

    const isTracksScope = (
      scope === 'tracks'
    )

    if (isTracksScope) {
      this.topTrackCount ||=
        artistData
          .tracks[0]
          ?.listeners_count
    }

    return artistData
  }

  return getRequest.bind(
    this
  )(
    {
      url,
      params,
      isWithSelfToken: true,
      isWithSelfId,
      isWithSelfLanguage,
      page,
      limit,
      onSuccess: handleSuccess
    }
  )
}
