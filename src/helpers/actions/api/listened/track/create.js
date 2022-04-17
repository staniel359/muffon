import store from '*/plugins/store'
import postRequest from '*/helpers/actions/api/request/post'

export default function (
  {
    trackTitle,
    artistName
  }
) {
  const profileId =
    store.state.profile.info.id

  const url =
    `/profiles/${profileId}/listened/tracks`

  const {
    token
  } = store.state.profile

  const params = {
    token,
    title: trackTitle,
    artist_name: artistName
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
