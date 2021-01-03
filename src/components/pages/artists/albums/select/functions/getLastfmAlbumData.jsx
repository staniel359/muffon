import axios from 'axios'

export default function getLastfmAlbumData (artistName, albumTitle) {
  const startState = { error: null, isLoading: true }

  this.setState(startState)

  const artistNameEncoded = encodeURIComponent(artistName)
  const albumTitleEncoded = encodeURIComponent(albumTitle)
  const url = `/lastfm/artists/${artistNameEncoded}/albums/${albumTitleEncoded}`

  const cancelToken = this.request.token
  const extra = { cancelToken }

  const finishState = { isLoading: false, isLoaded: true }

  const handleSuccess = resp => {
    const data = resp.data.album
    const { artist, title } = data

    const successState = { data, albumSource: 'lastfm', ...finishState }

    this.setState(successState)

    this.setNavSections(artist, title)
  }

  const handleError = error => {
    const errorState = { data: null, error, ...finishState }

    !axios.isCancel(error) && this.setState(errorState)
  }

  axios.get(url, extra).then(handleSuccess).catch(handleError)
}
