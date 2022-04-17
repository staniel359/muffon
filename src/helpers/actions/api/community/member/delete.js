import store from '*/plugins/store'
import deleteRequest from '*/helpers/actions/api/request/delete'

export default function (
  {
    communityId
  }
) {
  const profileId =
    store.state.profile.info.id

  const url =
    `/communities/${communityId}/members/${profileId}`

  const {
    token
  } = store.state.profile

  const params = {
    token
  }

  return deleteRequest.bind(
    this
  )(
    {
      url,
      params
    }
  )
}
