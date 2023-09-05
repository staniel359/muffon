import recommendationArtistsStore from '@/stores/recommendationArtists'

export default function (
  {
    tagsInclude,
    tagsExclude,
    artistsInclude,
    artistsExclude
  }
) {
  const {
    isHideLibraryArtists,
    hideLibraryArtistsTracksCount,
    isHideListenedArtists
  } = recommendationArtistsStore()

  const hideParams = {
    ...(
      isHideLibraryArtists && {
        hide_library_artists: true,
        hide_library_artists_tracks_count:
          hideLibraryArtistsTracksCount
      }
    ),
    ...(
      isHideListenedArtists && {
        hide_listened_artists: true
      }
    )
  }

  const filterParams = {
    ...(
      tagsInclude?.length && {
        tags_include: tagsInclude
      }
    ),
    ...(
      tagsExclude?.length && {
        tags_exclude: tagsExclude
      }
    ),
    ...(
      artistsInclude?.length && {
        artists_include: artistsInclude
      }
    ),
    ...(
      artistsExclude?.length && {
        artists_exclude: artistsExclude
      }
    )
  }

  return {
    ...hideParams,
    ...filterParams
  }
}
