import store from '*/plugins/store'
import getRequest from '*/helpers/actions/api/request/get'

export default function (
  {
    recommendationId,
    scope = '',
    page,
    limit
  }
) {
  const profileId =
    store.state.profile.info.id

  const url = (
    `/profiles/${profileId}` +
    `/recommendations/${recommendationId}` +
    `/${scope}`
  )

  const {
    token
  } = store.state.profile

  const params = {
    token
  }

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
      params,
      page,
      limit,
      onSuccess: handleSuccess
    }
  )
}
