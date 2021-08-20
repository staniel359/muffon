import axios from 'axios'

export default function fetchData ({ nickname, page = 1 }) {
  const url = `lastfm/users/${nickname}/plays`
  const params = { page }

  const handleSuccess = response => {
    const totalPages =
      response.data.user.total_pages

    this.plays = [
      ...this.plays,
      ...response.data.user.plays
    ]

    if (
      page < totalPages &&
        this.isMounted
    ) {
      return fetchData.bind(this)({
        nickname,
        page: page + 1
      })
    }
  }

  const handleError = () => {
    const retry = () => {
      fetchData.bind(this)({
        nickname,
        page
      })
    }

    setTimeout(retry, 2000)
  }

  return axios
    .get(url, { params })
    .then(handleSuccess)
    .catch(handleError)
}
