import profileStore from '@/stores/profile'
import postRequest from '@/helpers/actions/api/request/post'

export default function (
  {
    trackTitle,
    artistName,
    albumTitle,
    imageUrl,
    created,
    sourceData,
    audioData,
    albumSourceData
  }
) {
  this.favoriteId = null

  const profileId = profileStore().id

  const url =
    `/profiles/${profileId}/favorites/tracks`

  const params = {
    title: trackTitle,
    artist: artistName,
    album: albumTitle,
    image: imageUrl,
    created,
    source: sourceData,
    audio: audioData,
    album_source: albumSourceData
  }

  const handleSuccess = (
    response
  ) => {
    this.favoriteId =
      response.data.favorite_track.id.toString()
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
