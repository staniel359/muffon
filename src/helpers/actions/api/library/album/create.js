import store from '*/plugins/store'
import postRequest from '*/helpers/actions/api/request/post'

export default function (
  {
    albumTitle,
    artistName,
    tracks,
    imageUrl
  }
) {
  this.libraryId = null

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
    tracks,
    image_url: imageUrl
  }

  const handleSuccess = (
    response
  ) => {
    this.libraryId =
      response.data.library_id.toString()
  }

  return postRequest.bind(
    this
  )(
    {
      url,
      params,
      onSuccess: handleSuccess
    }
  )
}
