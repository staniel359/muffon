import profileStore from '@/stores/profile'
import getRequest from '@/helpers/actions/api/request/get'

export default function (
  {
    page,
    limit,
    order
  }
) {
  const url = '/profiles'

  const otherProfileId = profileStore().id

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
      isWithSelfToken: true,
      page,
      limit,
      order,
      onSuccess: handleSuccess
    }
  )
}
