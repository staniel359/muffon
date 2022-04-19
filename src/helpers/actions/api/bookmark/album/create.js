import store from '*/plugins/store'
import postRequest from '*/helpers/actions/api/request/post'

export default function (
  {
    albumTitle,
    artistName,
    imageUrl
  }
) {
  this.bookmarkId = null

  const profileId =
    store.state.profile.info.id

  const url =
    `/profiles/${profileId}/bookmarks/albums`

  const {
    token
  } = store.state.profile

  const params = {
    token,
    title: albumTitle,
    artist_name: artistName,
    image_url: imageUrl
  }

  const handleSuccess = (
    response
  ) => {
    this.bookmarkId =
      response.data.bookmark_id.toString()
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
