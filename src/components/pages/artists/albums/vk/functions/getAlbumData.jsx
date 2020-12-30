import axios from 'axios'

export default function getAlbumData (vkId, vkOwnerId, vkAccessHash) {
  const startState = {
    error: null,
    isLoading: true,
    request: { source: 'vk' }
  }

  this.setState(startState)

  const url = `/vk/albums/${vkId}`

  const params = { owner_id: vkOwnerId, access_hash: vkAccessHash }

  const cancelToken = this.request.token
  const extra = { params, cancelToken }

  const finishState = { isLoading: false, isLoaded: true }

  const handleSuccess = resp => {
    const data = resp.data.album
    const { artist, title } = data

    const successState = { data, albumSource: 'vk', ...finishState }

    this.setState(successState)

    this.setNavSections(artist, title)
  }

  const handleError = error => {
    const errorState = { data: null, error, ...finishState }

    !axios.isCancel(error) && this.setState(errorState)
  }

  axios.get(url, extra).then(handleSuccess).catch(handleError)
}
