import store from '@/plugins/store'
import postRequest from '@/helpers/actions/api/request/post'

export default function (
  {
    playlistId,
    trackTitle,
    artistName,
    albumTitle,
    imageUrl,
    sourceData,
    audioData,
    albumSourceData,
    isSelectable
  }
) {
  const profileId =
    store.getters['profile/id']

  const url =
    `/profiles/${profileId}/playlists` +
    `/${playlistId}/tracks`

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
    if (isSelectable) {
      this.playlistTrackIds = [
        ...this.playlistTrackIds,
        response.data.playlist_track.id
      ]

      this.paginationItem.tracks_count =
        response.data.playlist.tracks_count
    }
  }

  return postRequest.bind(
    this
  )(
    {
      url,
      params,
      isWithSelfToken: true,
      isSaveError: true,
      onSuccess: handleSuccess
    }
  )
}
