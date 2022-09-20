import formatTrackRequestUrl from '@/helpers/formatters/request/track/url'
import getRequest from '@/helpers/actions/api/request/get'

export default function (
  {
    source = 'lastfm',
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
        source,
        artistName,
        trackTitle,
        artistId,
        trackId,
        scope
      }
    )

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
      isWithSelfId: true,
      isWithSelfLanguage: true,
      page,
      limit,
      onSuccess: handleSuccess
    }
  )
}
