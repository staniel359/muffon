import store from '@/plugins/store'
import postRequest from '@/helpers/actions/api/request/post'

export default function (
  {
    albumTitle,
    artistName,
    imageUrl
  }
) {
  this.listenedId = null

  const profileId =
    store.getters['profile/id']

  const url =
    `/profiles/${profileId}/listened/albums`

  const params = {
    title: albumTitle,
    artist_name: artistName,
    image_url: imageUrl
  }

  const handleSuccess = (
    response
  ) => {
    this.listenedId =
      response.data.listened_album.id.toString()
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
