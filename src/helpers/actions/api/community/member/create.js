import store from '*/plugins/store'
import postRequest from '*/helpers/actions/api/request/post'

export default function (
  {
    communityId
  }
) {
  const url =
    `/communities/${communityId}/members`

  const profileId =
    store.state.profile.info.id

  const {
    token
  } = store.state.profile

  const params = {
    profile_id: profileId,
    token
  }

  return postRequest.bind(
    this
  )(
    {
      url,
      params
    }
  )
}
