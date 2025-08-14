import profileStore from '@/stores/profile'
import postRequest from '@/helpers/actions/api/request/post'

export default function (
  {
    trackTitle,
    artistName,
    albumTitle,
    image,
    imageUrl,
    created,
    sourceData,
    audioData,
    albumSourceData
  }
) {
  this.libraryId = null

  const profileId = profileStore().id

  const url =
    `/profiles/${profileId}/library/tracks`

  const params = {
    track_title: trackTitle,
    artist_name: artistName,
    album_title: albumTitle,
    image: (
      image || imageUrl
    ),
    created,
    source: sourceData,
    audio: audioData,
    album_source:
      albumSourceData
  }

  const handleSuccess = (
    response
  ) => {
    this.libraryId =
      response
        .data
        .library_track
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
