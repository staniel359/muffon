import axios from 'axios'

export default function getPlays ({ nickname, page = 1 }) {
  const url = `/lastfm/users/${nickname}/plays`
  const params = { page }

  const handleSuccess = response => {
    const { plays } = response.data.user

    const totalPages =
      response.data.user.total_pages

    this.plays = [
      ...this.plays,
      ...plays
    ]

    const isGetPlays = (
      this.isMounted &&
        page < totalPages
    )

    if (isGetPlays) {
      const playsArgs = {
        nickname,
        page: page + 1
      }

      return getPlays.bind(this)(
        playsArgs
      )
    }
  }

  const retry = () => {
    const playsArgs = {
      nickname,
      page
    }

    getPlays.bind(this)(
      playsArgs
    )
  }

  const handleError = () => {
    setTimeout(
      retry, 2000
    )
  }

  return axios.get(
    url, { params }
  ).then(
    handleSuccess
  ).catch(
    handleError
  )
}
