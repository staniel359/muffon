import axios from 'axios'

export default function getData (page) {
  const startState = {
    error: null,
    responsePage: page || 1,
    isLoading: true
  }

  this.setState(startState)

  const isTagPage = this.dataName === 'tag'
  const tagUrl = `/lastfm/tags/${this.params().tagName}`
  const url = isTagPage ? tagUrl : tagUrl + `/${this.dataName}`

  const params = { page }
  const cancelToken = this.request.token
  const extra = { params, cancelToken }

  const finishState = { isLoading: false, isLoaded: true }

  const handleSuccess = resp => {
    const { tag } = resp.data

    const tagName = tag.name
    const data = isTagPage ? {} : tag[this.dataName]
    const responseTotalPages = tag.total_pages

    const successState = {
      tagName,
      data,
      responseTotalPages,
      ...finishState
    }

    this.setState(successState)

    this.setNavSections(tagName)
  }

  const handleError = error => {
    const errorState = { error, ...finishState }

    !axios.isCancel(error) && this.setState(errorState)
  }

  axios.get(url, extra).then(handleSuccess).catch(handleError)
}
