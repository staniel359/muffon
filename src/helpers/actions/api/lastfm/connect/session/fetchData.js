import axios from 'axios'
import fetchLastfmUserData from '#/actions/api/lastfm/user/fetchData'

export default function ({ token }) {
  this.error = null
  this.isLoading = true

  const url = 'lastfm/connect/session'
  const params = { token }

  const handleError = error => {
    this.error = error
  }

  const handleSuccess = response => {
    const { nickname } = response.data.session

    return fetchLastfmUserData.bind(this)({
      nickname
    })
  }

  const handleFinish = () => {
    this.isLoading = false
  }

  axios
    .get(url, { params })
    .then(handleSuccess)
    .catch(handleError)
    .finally(handleFinish)
}
