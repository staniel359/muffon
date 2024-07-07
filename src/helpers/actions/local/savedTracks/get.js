import getRequest from '@/helpers/actions/local/request/get'

export default function (
  {
    order
  }
) {
  const handleSuccess = (
    response
  ) => {
    this.savedTracksData = response
  }

  return getRequest.bind(
    this
  )(
    {
      key: 'profile.savedTracks',
      listScope: 'tracks',
      order,
      onSuccess: handleSuccess
    }
  )
}
