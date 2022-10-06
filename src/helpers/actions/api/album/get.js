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

  const isWithSelfLanguage = (
    !scope ||
      scope === 'description'
  )

  const handleSuccess = (
    response
  ) => {
    const isAlbumVarious = (
      albumType === 'albumVarious'
    )

    const scope = isAlbumVarious
      ? 'album'
      : albumType

    this.albumData =
      response.data[
        scope
      ]
  }

  return getRequest.bind(
    this
  )(
    {
      url,
      params,
      isWithSelfId: true,
      isWithSelfLanguage,
      page,
      limit,
      onSuccess: handleSuccess
    }
  )
}
