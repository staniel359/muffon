import store from '@/plugins/store'
import postRequest from '@/helpers/actions/api/request/post'

export default function (
  {
    otherProfileId
  }
) {
  const profileId =
    store.getters['profile/id']

  const url =
    `/profiles/${profileId}/followers`

  const params = {
    other_profile_id: otherProfileId
  }

  const handleSuccess = (
    response
  ) => {
    this.isFollowing = true
    this.followersCount =
      response.data.other_profile.followers_count
  }

  return postRequest.bind(
    this
  )(
    {
      url,
      params,
      isWithSelfToken: true,
      onSuccess: handleSuccess
    }
  )
}
