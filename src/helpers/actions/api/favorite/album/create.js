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
  this.favoriteId = null

  const profileId = profileStore().id

  const url =
    `/profiles/${profileId}/favorites/albums`

  const params = {
    title: albumTitle,
    artist: artistName,
    image: imageUrl,
    source: sourceData
  }

  const handleSuccess = (
    response
  ) => {
    this.favoriteId =
      response.data.favorite_album.id.toString()
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
