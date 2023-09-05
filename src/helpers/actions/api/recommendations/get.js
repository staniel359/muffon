import profileStore from '@/stores/profile'
import formatRecommendationArtistsRequestParams
  from '@/helpers/formatters/request/recommendations/params/artists'
import formatRecommendationTracksRequestParams
  from '@/helpers/formatters/request/recommendations/params/tracks'
import getRequest from '@/helpers/actions/api/request/get'

export default function (
  {
    scope,
    page,
    limit,
    order,
    tagsInclude,
    tagsExclude,
    artistsInclude,
    artistsExclude
  }
) {
  const profileId = profileStore().id

  const url = (
    `/profiles/${profileId}` +
    `/recommendations/${scope}`
  )

  function formatParams () {
    switch (scope) {
      case 'artists':
        return formatRecommendationArtistsRequestParams(
          {
            tagsInclude,
            tagsExclude,
            artistsInclude,
            artistsExclude
          }
        )
      case 'tracks':
        return formatRecommendationTracksRequestParams()
      default:
        return {}
    }
  }

  const params = formatParams()

  const handleSuccess = (
    response
  ) => {
    this.recommendationsData =
      response
        .data
        .profile
        .recommendations
  }

  return getRequest.bind(
    this
  )(
    {
      url,
      params,
      isWithSelfToken: true,
      page,
      limit,
      order,
      onSuccess: handleSuccess
    }
  )
}
