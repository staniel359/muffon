import axios from 'axios'

export default function getData ({ sourceId, typeId = 'albums' }) {
  const { artist, title } = this.props.requestData

  const startState = { isLoading: true }

  this.setState(startState)

  const url = () => {
    switch (sourceId) {
      case 'bandcamp':
        return `/${sourceId}/search`
      default:
        return `/${sourceId}/search/${typeId}`
    }
  }

  const query = `${artist} ${title}`

  const extra = {
    params: { query, limit: 20 },
    cancelToken: this.request.token
  }

  const finishState = { isLoading: false }

  const handleSuccess = resp => {
    const data = {
      ...this.state.data,
      [typeId]: resp.data.search[typeId]
    }

    const successState = { data, ...finishState }

    this.setState(successState)
  }

  const handleError = error => {
    const errorState = { data: null, ...finishState }

    !axios.isCancel(error) && this.setState(errorState)
  }

  axios.get(url(), extra).then(handleSuccess).catch(handleError)
}
