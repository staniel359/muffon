import profileStore from '@/stores/profile'
import getRequest from '@/helpers/actions/api/request/get'

export default function (
  {
    recommendationId,
    scope = '',
    page,
    limit
  }
) {
  const profileId = profileStore().id

  const url = (
    `/profiles/${profileId}/recommendations` +
    `/${recommendationId}/${scope}`
  )

  const handleSuccess = (
    response
  ) => {
    this.recommendationData =
      response.data.recommendation
  }

  return getRequest.bind(
    this
  )(
    {
      url,
      isWithSelfToken: true,
      page,
      limit,
      onSuccess: handleSuccess
    }
  )
}
