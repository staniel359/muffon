import axios from 'axios'

export default function getData () {
  const { artistName, albumTitle } = this.params()

  const startState = { error: null, isLoading: true }

  this.setState(startState)

  const isAlbumPage = this.dataName === 'album'

  const baseUrl = () => {
    const { requestData } = this.props.location

    if (requestData) {
      switch (requestData.source) {
        case 'lastfm':
          return `/lastfm/artists/${requestData.artist}/albums/${requestData.title}`
        case 'bandcamp':
          return `/bandcamp/albums/${encodeURIComponent(requestData.link)}`
        case 'soundcloud':
          return `/soundcloud/albums/${requestData.id}`
      }
    } else {
      return `/lastfm/artists/${artistName}/albums/${albumTitle}`
    }
  }

  const url = isAlbumPage ? baseUrl() : `${baseUrl()}/${this.dataName}`

  const cancelToken = this.request.token
  const extra = { cancelToken }

  const finishState = { isLoading: false, isLoaded: true }

  const handleSuccess = resp => {
    const { album } = resp.data
    const { artist, title } = album

    const data = isAlbumPage ? album : album[this.dataName]
    const requestData = {
      source: album.source,
      title: album.title,
      artist: album.artist
    }

    const successState = { data, requestData, ...finishState }

    this.setState(successState)

    this.setNavSections(artist, title)
  }

  const handleError = error => {
    const errorState = { error, ...finishState }

    !axios.isCancel(error) && this.setState(errorState)
  }

  axios.get(url, extra).then(handleSuccess).catch(handleError)
}
