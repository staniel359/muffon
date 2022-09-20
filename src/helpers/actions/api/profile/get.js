import store from '@/plugins/store'
import getRequest from '@/helpers/actions/api/request/get'

export default function (
  {
    profileId,
    scope = '',
    playlistsModelData,
    page,
    limit
  }
) {
  const url = `/profiles/${profileId}/${scope}`

  const otherProfileId =
    store.getters['profile/id']

  const playlistsModelDataParams =
    playlistsModelData && {
      model: playlistsModelData.model,
      title: playlistsModelData.title,
      artist: playlistsModelData.artistName
    }

  const params = {
    ...(otherProfileId && {
      other_profile_id: otherProfileId
    }),
    ...playlistsModelDataParams
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
      isWithSelfToken: true,
      page,
      limit,
      onSuccess: handleSuccess
    }
  )
}
