import axios from 'axios'

const isDevelopment =
  await window
    .mainProcess
    .sendAsyncCommand(
      'check-if-is-development'
    )

const developmentBaseUrl =
  'http://localhost:4000'

const productionBaseUrl = 'https://muffon.app'

const serverBaseUrl = isDevelopment
  ? developmentBaseUrl
  : productionBaseUrl

const serverUrl = `${serverBaseUrl}/api/`

export default function () {
  axios.defaults.baseURL = serverUrl
}
