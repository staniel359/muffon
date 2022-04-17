import store from '*/plugins/store'
import getRequest from '*/helpers/actions/api/request/get'
import formatAlbumRequestUrl from '*/helpers/formatters/request/album/url'

export default function (
  {
    sourceId = 'lastfm',
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
        sourceId,
        artistName,
        albumTitle,
        artistId,
        albumId,
        albumType,
        scope
      }
    )

  const profileId =
    store.state.profile.info.id

  const lang =
    store.state.profile.language

  const params = {
    ...paramsData,
    profile_id: profileId,
    lang
  }

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
      params,
      page,
      limit,
      onSuccess: handleSuccess
    }
  )
}
