import profileStore from '@/stores/profile'
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
    created,
    isSelectable
  }
) {
  const profileId = profileStore().id

  const url =
    `/profiles/${profileId}/playlists` +
    `/${playlistId}/tracks`

  const params = {
    track_title: trackTitle,
    artist_name: artistName,
    album_title: albumTitle,
    image: imageUrl,
    source: sourceData,
    audio: audioData,
    album_source:
      albumSourceData,
    created
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
