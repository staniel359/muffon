import profileStore from '@/stores/profile'
import getRequest from '@/helpers/actions/api/request/get'

export default function (
  {
    scope,
    page,
    limit,
    order
  }
) {
  const profileId = profileStore().id

  const url =
    `/profiles/${profileId}/history/${scope}`

  const handleSuccess = (
    response
  ) => {
    this.historyData =
      response.data.profile
  }

  return getRequest.bind(
    this
  )(
    {
      url,
      isWithSelfToken: true,
      page,
      limit,
      order,
      onSuccess: handleSuccess
    }
  )
}
