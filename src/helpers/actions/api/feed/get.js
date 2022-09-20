import store from '@/plugins/store'
import getRequest from '@/helpers/actions/api/request/get'

export default function (
  {
    page,
    limit,
    isGlobal
  }
) {
  const profileId =
    store.getters['profile/id']

  const url = `/profiles/${profileId}/feed`

  const params = {
    ...(isGlobal && {
      global: 1
    })
  }

  const handleSuccess = (
    response
  ) => {
    this.feedData =
      response.data.profile
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
      onSuccess: handleSuccess
    }
  )
}
