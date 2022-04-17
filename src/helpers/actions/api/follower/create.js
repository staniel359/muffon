import store from '*/plugins/store'
import postRequest from '*/helpers/actions/api/request/post'

export default function (
  {
    otherProfileId
  }
) {
  const profileId =
    store.state.profile.info.id

  const url =
    `/profiles/${profileId}/followers`

  const {
    token
  } = store.state.profile

  const params = {
    token,
    other_profile_id: otherProfileId
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
