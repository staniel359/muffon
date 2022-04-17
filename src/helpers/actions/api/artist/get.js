import store from '*/plugins/store'
import getRequest from '*/helpers/actions/api/request/get'
import formatArtistRequestUrl from '*/helpers/formatters/request/artist/url'

export default function (
  {
    artistName,
    artistId,
    sourceId = 'lastfm',
    albumType = '',
    scope = '',
    page,
    limit
  }
) {
  const url =
    formatArtistRequestUrl(
      {
        sourceId,
        artistName,
        artistId,
        scope
      }
    )

  const profileId =
    store.state.profile.info.id

  const lang =
    store.state.profile.language

  const params = {
    profile_id: profileId,
    lang,
    ...(albumType && {
      album_type: albumType
    })
  }

  const handleSuccess = (
    response
  ) => {
    const {
      artist
    } = response.data

    this.artistData = artist

    if (scope === 'tracks') {
      this.topTrackCount ||=
        artist.tracks[0].listeners_count
    }
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
