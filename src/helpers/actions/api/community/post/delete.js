import store from '*/plugins/store'
import deleteRequest from '*/helpers/actions/api/request/delete'

export default function (
  {
    communityId,
    postId
  }
) {
  const url =
    `/communities/${communityId}/posts/${postId}`

  const profileId =
    store.state.profile.info.id

  const {
    token
  } = store.state.profile

  const params = {
    profile_id: profileId,
    token
  }

  return deleteRequest.bind(
    this
  )(
    {
      url,
      params,
      isSaveError: true
    }
  )
}
