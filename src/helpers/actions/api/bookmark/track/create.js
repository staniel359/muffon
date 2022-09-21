import store from '@/plugins/store'
import postRequest from '@/helpers/actions/api/request/post'

export default function (
  {
    trackTitle,
    artistName,
    albumTitle,
    imageUrl,
    sourceData,
    audioData,
    albumSourceData
  }
) {
  this.bookmarkId = null

  const profileId =
    store.getters['profile/id']

  const url =
    `/profiles/${profileId}/bookmarks/tracks`

  const params = {
    title: trackTitle,
    artist: artistName,
    album: albumTitle,
    image: imageUrl,
    source: sourceData,
    audio: audioData,
    album_source: albumSourceData
  }

  const handleSuccess = (
    response
  ) => {
    this.bookmarkId =
      response.data.bookmark_track.id.toString()
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
