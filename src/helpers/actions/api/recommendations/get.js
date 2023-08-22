import profileStore from '@/stores/profile'
import recommendationsStore from '@/stores/recommendations'
import getRequest from '@/helpers/actions/api/request/get'

export default function (
  {
    page,
    limit,
    order,
    tagsInclude,
    tagsExclude,
    artistsInclude,
    artistsExclude
  }
) {
  const profileId = profileStore().id

  const url =
    `/profiles/${profileId}/recommendations`

  const {
    isHideLibraryArtists,
    tracksCount,
    isHideListenedArtists
  } = recommendationsStore()

  const params = {
    ...(
      isHideLibraryArtists && {
        hide_library: true,
        hide_library_tracks_count: tracksCount
      }
    ),
    ...(
      isHideListenedArtists && {
        hide_listened: true
      }
    ),
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

  const handleSuccess = (
    response
  ) => {
    this.recommendationsData =
      response.data.profile
  }

  return getRequest.bind(
    this
  )(
    {
      url,
      params,
      isWithSelfToken: true,
      page,
      limit,
      order,
      onSuccess: handleSuccess
    }
  )
}
