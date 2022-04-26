import store from '*/plugins/store'
import deleteRequest from '*/helpers/actions/api/request/delete'

export default function (
  {
    otherProfileId
  }
) {
  const profileId =
    store.getters['profile/id']

  const url =
    `/profiles/${profileId}/followers/${otherProfileId}`

  const handleSuccess = (
    response
  ) => {
    this.isFollowing = false
    this.followersCount =
      response
        .data
        .other_profile_follower_profiles_count
  }

  return deleteRequest.bind(
    this
  )(
    {
      url,
      isWithSelfToken: true,
      onSuccess: handleSuccess
    }
  )
}
