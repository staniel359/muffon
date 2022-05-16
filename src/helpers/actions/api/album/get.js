import getRequest from '*/helpers/actions/api/request/get'
import formatAlbumRequestUrl from '*/helpers/formatters/request/album/url'

export default function (
  {
    source = 'lastfm',
    artistName,
    albumTitle,
    artistId,
    albumId,
    albumType = 'album',
    paramsData,
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

  function formatAlbumType () {
    if (albumType === 'albumVarious') {
      return 'album'
    } else {
      return albumType
    }
  }

  const handleSuccess = (
    response
  ) => {
    const scope = formatAlbumType()

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
      params: paramsData,
      isWithSelfId: true,
      isWithSelfLanguage: true,
      page,
      limit,
      onSuccess: handleSuccess
    }
  )
}
