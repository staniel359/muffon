import profileStore from '@/stores/profile'
import getRequest from '@/helpers/actions/api/request/get'

export default function (
  {
    profileId,
    scope = '',
    playlistsModelData,
    page,
    limit,
    order
  }
) {
  const url = `/profiles/${profileId}/${scope}`

  const otherProfileId = profileStore().id

  const playlistsModelDataParams =
    playlistsModelData && {
      model: playlistsModelData.model,
      track_title: playlistsModelData.title,
      artist_name: playlistsModelData.artistName
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
      order,
      onSuccess: handleSuccess
    }
  )
}
