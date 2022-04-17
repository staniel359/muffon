import store from '*/plugins/store'
import getRequest from '*/helpers/actions/api/request/get'

export default function (
  {
    profileId,
    scope = '',
    artistName,
    trackTitle,
    page,
    limit
  }
) {
  const url = `/profiles/${profileId}/${scope}`

  const {
    token
  } = store.state.profile

  const otherProfileId =
    store.state.profile?.info?.id

  const params = {
    token,
    ...(otherProfileId && {
      other_profile_id: otherProfileId
    }),
    ...(artistName && {
      artist_name: artistName
    }),
    ...(trackTitle && {
      track_title: trackTitle
    })
  }

  const handleSuccess = (
    response
  ) => {
    this.profileData =
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
