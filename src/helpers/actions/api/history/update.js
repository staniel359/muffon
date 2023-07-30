import profileStore from '@/stores/profile'
import patchRequest from '@/helpers/actions/api/request/patch'

export default function (
  {
    scope,
    route,
    playing
  }
) {
  const profileId = profileStore().id

  const url =
    `/profiles/${profileId}/history/${scope}`

  const isBrowserScope = (
    scope === 'browser'
  )

  const isPlayerScope = (
    scope === 'player'
  )

  const params = {
    ...(isBrowserScope && {
      route
    }),
    ...(isPlayerScope && {
      playing
    })
  }

  return patchRequest(
    {
      url,
      params,
      isWithSelfToken: true
    }
  )
}
