import recommendationTracksStore from '@/stores/recommendationTracks'

export default function () {
  const {
    isHideLibraryTracks,
    isHideLibraryArtists,
    hideLibraryArtistsTracksCount,
    isHideListenedTracks,
    isHideListenedArtists
  } = recommendationTracksStore()

  const hideParams = {
    ...(
      isHideLibraryTracks && {
        hide_library_tracks: true
      }
    ),
    ...(
      isHideLibraryArtists && {
        hide_library_artists: true,
        hide_library_artists_tracks_count:
          hideLibraryArtistsTracksCount
      }
    ),
    ...(
      isHideListenedTracks && {
        hide_listened_tracks: true
      }
    ),
    ...(
      isHideListenedArtists && {
        hide_listened_artists: true
      }
    )
  }

  return hideParams
}
