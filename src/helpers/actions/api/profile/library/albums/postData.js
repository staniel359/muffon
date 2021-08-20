import axios from 'axios'
import local from '#/plugins/local'

export default function ({ title, artistName, tracks, imageUrl }) {
  this.isLoading = true

  const profileId = local.get(
    'profile.info'
  ).id
  const url =
    `profiles/${profileId}/library/albums`

  const token = local.get(
    'profile.token'
  )
  const params = {
    token,
    title,
    artist: artistName,
    tracks,
    image_url: imageUrl
  }

  const handleSuccess = response => {
    this.libraryId =
      response.data.library_id
  }

  const handleError = error => {
    this.isError = true

    throw error
  }

  const handleFinish = () => {
    this.isLoading = false
  }

  return axios
    .post(url, params)
    .then(handleSuccess)
    .catch(handleError)
    .finally(handleFinish)
}
