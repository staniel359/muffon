import profileStore from '@/stores/profile'
import deleteRequest from '@/helpers/actions/api/request/delete'

export default function (
  {
    source
  }
) {
  const profileId = profileStore().id

  const url =
    `/${source}/connections/${profileId}`

  const handleSuccess = (
    response
  ) => {
    const connectionsData = {
      ...profileStore().connections
    }

    delete connectionsData[source]

    this.connectionsData = connectionsData
  }

  return deleteRequest.bind(
    this
  )(
    {
      url,
      isWithSelfId: true,
      isWithSelfToken: true,
      isSaveError: true,
      onSuccess: handleSuccess
    }
  )
}
