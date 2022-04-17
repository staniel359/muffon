import store from '*/plugins/store'
import formatTrackRequestUrl from '*/helpers/formatters/request/track/url'
import getRequest from '*/helpers/actions/api/request/get'

export default function (
  {
    sourceId = 'lastfm',
    artistName,
    trackTitle,
    artistId,
    trackId,
    scope = '',
    page,
    limit
  }
) {
  const url =
    formatTrackRequestUrl(
      {
        sourceId,
        artistName,
        trackTitle,
        artistId,
        trackId,
        scope
      }
    )

  const profileId =
    store.state.profile.info.id

  const lang =
    store.state.profile.language

  const params = {
    profile_id: profileId,
    lang
  }

  const handleSuccess = (
    response
  ) => {
    this.trackData =
      response.data.track
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
