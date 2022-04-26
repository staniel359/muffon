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
    store.getters['profile/id']

  const url =
    `/profiles/${profileId}/library/albums`

  const params = {
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
      isWithSelfToken: true,
      onSuccess: handleSuccess
    }
  )
}
