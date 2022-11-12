import store from '@/plugins/store'
import getRequest from '@/helpers/actions/api/request/get'

export default function (
  {
    page,
    limit,
    order
  }
) {
  const profileId =
    store.getters['profile/id']

  const url =
    `/profiles/${profileId}/conversations`

  const handleSuccess = (
    response
  ) => {
    this.conversationsData =
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
