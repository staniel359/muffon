import axios from 'axios'

export default function getData ({ sourceId, typeId = 'albums' }) {
  const { artist, title } = this.props.requestData

  const startState = { isLoading: true }

  this.setState(startState)

  const url = `/${sourceId}/search/${typeId}`

  const query = `${artist} ${title}`

  const extra = {
    params: { query, limit: 20 },
    cancelToken: this.request.token
  }

  const finishState = { isLoading: false }

  const data = resp => {
    return {
      ...this.state.data,
      [typeId]: resp ? resp.data.search[typeId] : null
    }
  }

  const handleSuccess = resp => {
    const successState = { data: data(resp), ...finishState }

    this.setState(successState)
  }

  const handleError = error => {
    const errorState = { data: data(), ...finishState }

    !axios.isCancel(error) && this.setState(errorState)
  }

  axios.get(url, extra).then(handleSuccess).catch(handleError)
}
