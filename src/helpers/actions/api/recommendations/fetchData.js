import axios from 'axios'
import store from '&/store'

export default function ({ page, limit, filter, filterValue }) {
  this.isLoading = true

  const profileId =
    store.state.profile.info.id
  const url =
    `/profiles/${profileId}/recommendations`

  const { token } = store.state.profile
  const params = {
    token,
    ...(page && { page }),
    ...(limit && { limit }),
    ...(
      filter &&
        filterValue?.length &&
        { filter }
    ),
    ...(
      filterValue?.length &&
        { filter_value: filterValue }
    )
  }

  const handleSuccess = response => {
    this.error = null
    this.recommendationsData =
      response.data.profile
  }

  const handleError = error => {
    this.error = error
  }

  const handleFinish = () => {
    this.isLoading = false
  }

  return axios
    .get(url, { params })
    .then(handleSuccess)
    .catch(handleError)
    .finally(handleFinish)
}
