import getRequest from '@/helpers/actions/api/request/get'

export default function (
  {
    lastfmNickname,
    page
  }
) {
  const url =
    `/lastfm/users/${lastfmNickname}/plays`

  const handleSuccess = (
    response
  ) => {
    const userData = response.data.user

    const {
      plays
    } = userData

    this.plays = [
      ...this.plays,
      ...plays
    ]

    const totalPagesCount =
      userData.total_pages

    this.totalPagesCount =
      totalPagesCount
  }

  return getRequest.bind(
    this
  )(
    {
      url,
      page,
      onSuccess: handleSuccess
    }
  )
}
