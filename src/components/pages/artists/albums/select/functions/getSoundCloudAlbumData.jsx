import axios from 'axios'

export default function getSoundCloudAlbumData (albumId) {
  const startState = { error: null, isLoading: true }

  this.setState(startState)

  const url = `/soundcloud/albums/${albumId}`

  const cancelToken = this.request.token
  const extra = { cancelToken }

  const finishState = { isLoading: false, isLoaded: true }

  const handleSuccess = resp => {
    const data = resp.data.album
    const { artist, title } = data

    const successState = { data, albumSource: 'soundcloud', ...finishState }

    this.setState(successState)

    this.setNavSections(artist, title)
  }

  const handleError = error => {
    const errorState = { data: null, error, ...finishState }

    !axios.isCancel(error) && this.setState(errorState)
  }

  axios.get(url, extra).then(handleSuccess).catch(handleError)
}
