import store from '*/plugins/store'
import postRequest from '*/helpers/actions/api/request/post'

export default function (
  {
    albumTitle,
    artistName,
    albumTracks,
    imageUrl
  }
) {
  const profileId =
    store.state.profile.info.id

  const url =
    `/profiles/${profileId}/library/albums`

  const {
    token
  } = store.state.profile

  const params = {
    token,
    title: albumTitle,
    artist_name: artistName,
    tracks: albumTracks,
    image_url: imageUrl
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
