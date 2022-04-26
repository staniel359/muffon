import store from '*/plugins/store'
import postRequest from '*/helpers/actions/api/request/post'

export default function (
  {
    trackTitle,
    artistName,
    albumTitle,
    imageUrl
  }
) {
  this.bookmarkId = null

  const profileId =
    store.getters['profile/id']

  const url =
    `/profiles/${profileId}/bookmarks/tracks`

  const params = {
    title: trackTitle,
    artist_name: artistName,
    album_title: albumTitle,
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
      isWithSelfToken: true,
      onSuccess: handleSuccess
    }
  )
}
