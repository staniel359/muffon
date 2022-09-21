import store from '@/plugins/store'
import postRequest from '@/helpers/actions/api/request/post'

export default function (
  {
    trackTitle,
    artistName,
    albumTitle,
    image,
    imageUrl,
    created
  }
) {
  this.libraryId = null

  const profileId =
    store.getters['profile/id']

  const url =
    `/profiles/${profileId}/library/tracks`

  const params = {
    title: trackTitle,
    artist: artistName,
    album: albumTitle,
    image: (
      image || imageUrl
    ),
    created
  }

  const handleSuccess = (
    response
  ) => {
    this.libraryId =
      response.data.library_track.id.toString()
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
