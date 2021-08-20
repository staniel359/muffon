import axios from 'axios'

export default function ({ nickname }) {
  const url = `lastfm/users/${nickname}`

  const handleSuccess = response => {
    this.userData = response.data.user
  }

  const handleError = error => {
    this.error = error
  }

  return axios
    .get(url)
    .then(handleSuccess)
    .catch(handleError)
}
