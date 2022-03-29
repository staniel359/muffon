import axios from 'axios'
import store from '*/plugins/store'

export default function ({
  sourceId = 'lastfm',
  scope = '',
  query,
  page,
  limit,
  isWithSelfData = false
}) {
  this.error = null
  this.isLoading = true

  const url = `/${sourceId}/search/${scope}`

  const profileId =
    store.state.profile.info.id
  const params = {
    query,
    ...(isWithSelfData && {
      profile_id: profileId
    }),
    ...(page && { page }),
    ...(limit && { limit })
  }

  const handleSuccess = response => {
    if (sourceId === 'youtube') {
      this.searchData = {
        page: 1,
        total_pages: 1,
        ...response.data.search
      }
    } else {
      this.searchData =
        response.data.search
    }
  }

  const handleError = error => {
    this.error = error
  }

  const handleFinish = () => {
    this.isLoading = false
  }

  return axios.get(
    url, { params }
  ).then(
    handleSuccess
  ).catch(
    handleError
  ).finally(
    handleFinish
  )
}
