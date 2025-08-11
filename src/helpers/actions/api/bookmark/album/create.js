import profileStore from '@/stores/profile'
import postRequest from '@/helpers/actions/api/request/post'

export default function (
  {
    albumTitle,
    artistName,
    imageUrl,
    sourceData
  }
) {
  this.bookmarkId = null

  const profileId = profileStore().id

  const url =
    `/profiles/${profileId}/bookmarks/albums`

  const params = {
    album_title: albumTitle,
    artist_name: artistName,
    image: imageUrl,
    source: sourceData
  }

  const handleSuccess = (
    response
  ) => {
    this.bookmarkId =
      response
        .data
        .bookmark_album
        .id
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
