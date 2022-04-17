import store from '*/plugins/store'
import getRequest from '*/helpers/actions/api/request/get'

export default function (
  {
    page,
    limit,
    filterScope,
    filterValue
  }
) {
  const profileId =
    store.state.profile.info.id

  const url =
    `/profiles/${profileId}/recommendations`

  const {
    token
  } = store.state.profile

  const params = {
    token,
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
      page,
      limit,
      onSuccess: handleSuccess
    }
  )
}
