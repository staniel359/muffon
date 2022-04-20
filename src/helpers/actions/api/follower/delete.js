import store from '*/plugins/store'
import deleteRequest from '*/helpers/actions/api/request/delete'

export default function (
  {
    otherProfileId
  }
) {
  const profileId =
    store.state.profile.info.id

  const url =
    `/profiles/${profileId}/followers/${otherProfileId}`

  const {
    token
  } = store.state.profile

  const params = {
    token
  }

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
      params,
      onSuccess: handleSuccess
    }
  )
}
