import profileStore from '@/stores/profile'
import postRequest from '@/helpers/actions/api/request/post'

export default function (
  {
    otherProfileId,
    text,
    images,
    artists,
    albums,
    tracks
  }
) {
  const profileId = profileStore().id

  const url =
    `/profiles/${profileId}/posts`

  const params = {
    other_profile_id: otherProfileId,
    text,
    images,
    artists,
    albums,
    tracks
  }

  return postRequest.bind(
    this
  )(
    {
      url,
      params,
      isWithSelfToken: true,
      isSaveError: true
    }
  )
}
