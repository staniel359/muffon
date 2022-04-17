import store from '*/plugins/store'
import getRequest from '*/helpers/actions/api/request/get'

export default function (
  {
    page,
    limit
  }
) {
  const url = '/profiles'

  const otherProfileId =
    store.state.profile.info.id

  const params = {
    other_profile_id: otherProfileId
  }

  const handleSuccess = (
    response
  ) => {
    this.profilesData =
      response.data.profiles
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
