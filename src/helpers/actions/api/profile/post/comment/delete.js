import profileStore from '@/stores/profile'
import deleteRequest from '@/helpers/actions/api/request/delete'

export default function (
  {
    profileId,
    postId,
    commentId
  }
) {
  const url = (
    `/profiles/${profileId}` +
    `/posts/${postId}` +
    `/comments/${commentId}`
  )

  const otherProfileId = profileStore().id

  const params = {
    other_profile_id:
      otherProfileId
  }

  return deleteRequest.bind(
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
