import profileStore from '@/stores/profile'
import deleteRequest from '@/helpers/actions/api/request/delete'

export default function (
  {
    communityId,
    postId,
    commentId
  }
) {
  const url = (
    `/communities/${communityId}` +
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
      isWithSelfId: true,
      isWithSelfToken: true,
      isSaveError: true
    }
  )
}
