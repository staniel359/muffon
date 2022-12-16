import profileStore from '@/stores/profile'
import deleteRequest from '@/helpers/actions/api/request/delete'

export default function (
  {
    otherProfileId
  }
) {
  const profileId = profileStore().id

  const url =
    `/profiles/${profileId}/followers/${otherProfileId}`

  const handleSuccess = (
    response
  ) => {
    this.isFollowing = false
    this.followersCount =
      response.data.other_profile.followers_count
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
