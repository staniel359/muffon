import store from '*/plugins/store'
import postRequest from '*/helpers/actions/api/request/post'

export default function (
  {
    communityId,
    content,
    tracks,
    images,
    byCommunity
  }
) {
  const url =
    `/communities/${communityId}/posts`

  const profileId =
    store.state.profile.info.id

  const {
    token
  } = store.state.profile

  const params = {
    profile_id: profileId,
    token,
    content,
    tracks,
    images,
    by_community: byCommunity
  }

  const handleError = (
    error
  ) => {
    this.error = error
  }

  return postRequest.bind(
    this
  )(
    {
      url,
      params,
      onError: handleError
    }
  )
}
