import axios from 'axios'

export default function getAlbumsData () {
  const { artistName, albumTitle } = this.props

  const startState = { isLoading: true }

  this.setState(startState)

  const url = '/lastfm/search/albums'

  const query = `${artistName} ${albumTitle}`
  const params = { query }

  const cancelToken = this.request.token
  const extra = { params, cancelToken }

  const finishState = { isLoading: false }

  const handleSuccess = resp => {
    const data = resp.data.search.albums

    const successState = { data, ...finishState }

    this.setState(successState)
  }

  const handleError = error => {
    const errorState = { error, ...finishState }

    !axios.isCancel(error) && this.setState(errorState)
  }

  axios.get(url, extra).then(handleSuccess).catch(handleError)
}
