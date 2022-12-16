import profileStore from '@/stores/profile'
import getRequest from '@/helpers/actions/api/request/get'

export default function (
  {
    page,
    limit,
    order,
    filterScope,
    filterValue,
    isHideLibraryArtists,
    tracksCount
  }
) {
  const profileId = profileStore().id

  const url =
    `/profiles/${profileId}/recommendations`

  const params = {
    ...(
      filterScope &&
        filterValue?.length &&
        {
          filter: filterScope
        }
    ),
    ...(
      filterValue?.length && {
        filter_value: filterValue
      }
    ),
    ...(
      isHideLibraryArtists && {
        hide_library_artists: 1,
        tracks_count: tracksCount
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
