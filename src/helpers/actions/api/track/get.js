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

  const scopes = {
    id: [
      '',
      'similar'
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
    this.trackData =
      response.data.track
  }

  return getRequest.bind(
    this
  )(
    {
      url,
      isWithSelfToken: true,
      isWithSelfId,
      isWithSelfLanguage,
      page,
      limit,
      onSuccess: handleSuccess
    }
  )
}
