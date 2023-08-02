import profileStore from '@/stores/profile'
import getRequest from '@/helpers/actions/api/request/get'

export default function (
  {
    source,
    scope = '',
    counter,
    isWithTracks,
    page,
    limit
  }
) {
  const profileId = profileStore().id

  const url =
    `/${source}/users/${profileId}/${scope}`

  const params = {
    ...(counter && {
      counter
    }),
    ...(isWithTracks && {
      with_tracks: true
    })
  }

  const handleSuccess = (
    response
  ) => {
    this.userData =
      response.data.user
  }

  return getRequest.bind(
    this
  )(
    {
      url,
      params,
      page,
      limit,
      isWithSelfToken: true,
      onSuccess: handleSuccess
    }
  )
}
