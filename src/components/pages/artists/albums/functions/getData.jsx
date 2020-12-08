import axios from 'axios'

export default function getData () {
  this.setState({ error: null, isLoading: true })

  const { artistName, albumTitle } = this.params()

  const isAlbumPage = this.dataName === 'album'
  const albumUrl = `/lastfm/artists/${artistName}/albums/${albumTitle}`
  const url = isAlbumPage ? albumUrl : albumUrl + `/${this.dataName}`

  const cancelToken = this.request.token
  const extra = { ...{ cancelToken } }

  const handleSuccess = resp => {
    const { album } = resp.data
    const { artist, title } = album

    const data = isAlbumPage ? album : album[this.dataName]

    this.setState({ ...{ data } })
    this.setNavSections(artist, title)
  }

  const handleError = error => {
    !axios.isCancel(error) && this.setState({ ...{ error } })
  }

  const handleFinish = () => {
    if (this._isMounted) {
      this.setState({ isLoading: false, isLoaded: true })
    }
  }

  axios
    .get(url, extra)
    .then(handleSuccess)
    .catch(handleError)
    .then(handleFinish)
}
