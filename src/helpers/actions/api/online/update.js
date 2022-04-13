import axios from 'axios'
import store from '*/plugins/store'

export default function (
  {
    isOnline
  }
) {
  const profileId =
    store.state.profile.info.id

  const url =
    `/profiles/${profileId}/online`

  const {
    token
  } = store.state.profile

  const params = {
    token,
    online: isOnline
  }

  return axios.patch(
    url,
    params
  )
}
