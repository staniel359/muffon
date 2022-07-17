import store from '*/plugins/store'
import postRequest from '*/helpers/actions/api/request/post'

export default function (
  {
    albumTitle,
    artistName,
    imageUrl,
    sourceData
  }
) {
  this.bookmarkId = null

  const profileId =
    store.getters['profile/id']

  const url =
    `/profiles/${profileId}/bookmarks/albums`

  const params = {
    title: albumTitle,
    artist_name: artistName,
    image_url: imageUrl,
    source_data: sourceData
  }

  const handleSuccess = (
    response
  ) => {
    this.bookmarkId =
      response.data.bookmark_album.id.toString()
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
