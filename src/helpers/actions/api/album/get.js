import getRequest from '@/helpers/actions/api/request/get'
import formatAlbumRequestUrl from '@/helpers/formatters/request/album/url'

export default function (
  {
    source = 'lastfm',
    artistName,
    albumTitle,
    artistId,
    albumId,
    albumType = 'album',
    model,
    ownerId,
    accessKey,
    scope = '',
    page,
    limit
  }
) {
  const url =
    formatAlbumRequestUrl(
      {
        source,
        artistName,
        albumTitle,
        artistId,
        albumId,
        albumType,
        scope
      }
    )

  const params = {
    ...(model && {
      album_type: model
    }),
    ...(ownerId && {
      owner_id: ownerId
    }),
    ...(accessKey && {
      access_key: accessKey
    })
  }

  const scopes = {
    id: [
      '',
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
    this.albumData =
      response.data[
        albumType
      ]
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
