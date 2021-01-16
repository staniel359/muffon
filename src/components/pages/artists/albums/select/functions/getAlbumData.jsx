import axios from 'axios'
import albumUrl from './albumUrl'
import sourcesList from './sourcesList'

export default function getAlbumData ({ album, dataName }) {
  const startState = { error: null, isLoading: true }

  this.setState(startState)

  this.request = axios.CancelToken.source()

  const url = albumUrl({ album, dataName })

  const extra = { cancelToken: this.request.token }

  const finishState = { isLoading: false }

  const handleSuccess = resp => {
    const { types } = sourcesList()[album.sourceId]

    const type = types ? types[album.typeId].single : 'album'
    const data = resp.data[type]

    const successState = { data, ...finishState, isLoaded: true }

    this.setState(successState)
  }

  const handleError = error => {
    const errorState = { data: null, error, ...finishState }

    !axios.isCancel(error) && this.setState(errorState)
  }

  return axios.get(url, extra).then(handleSuccess).catch(handleError)
}
