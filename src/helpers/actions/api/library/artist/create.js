import store from '*/plugins/store'
import postRequest from '*/helpers/actions/api/request/post'

export default function (
  {
    artistName
  }
) {
  const profileId =
    store.state.profile.info.id

  const url =
    `/profiles/${profileId}/library/artists`

  const {
    token
  } = store.state.profile

  const params = {
    token,
    name: artistName
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
