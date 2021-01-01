import axios from 'axios'

export default function getData () {
  const { artistName, albumTitle } = this.params()
  const { albumSource, albumLink } = this.props.location

  const startState = { error: null, isLoading: true }

  this.setState(startState)

  const isAlbumPage = this.dataName === 'album'

  const albumUrl = () => {
    if (albumSource === 'bandcamp') {
      const albumLinkEncoded = encodeURIComponent(albumLink)

      return `/bandcamp/albums/${albumLinkEncoded}`
    } else {
      return `/lastfm/artists/${artistName}/albums/${albumTitle}`
    }
  }

  const url = isAlbumPage ? albumUrl() : `${albumUrl()}/${this.dataName}`

  const cancelToken = this.request.token
  const extra = { cancelToken }

  const finishState = { isLoading: false, isLoaded: true }

  const handleSuccess = resp => {
    const { album } = resp.data
    const { artist, title } = album

    const data = isAlbumPage ? album : album[this.dataName]

    const successState = {
      data,
      isAlbumPresent: true,
      albumSource: albumSource || 'lastfm',
      ...finishState
    }

    this.setState(successState)

    this.setNavSections(artist, title)
  }

  const handleError = error => {
    const errorState = { error, ...finishState }

    !axios.isCancel(error) && this.setState(errorState)
  }

  axios.get(url, extra).then(handleSuccess).catch(handleError)
}
