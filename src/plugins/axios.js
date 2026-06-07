import axios from 'axios'

const isDevelopment =
  await window
    .mainProcess
    .sendAsyncCommand(
      'check-if-is-development'
    )

let serverBaseUrl

if (isDevelopment) {
  serverBaseUrl = 'http://localhost:4000'
} else {
  serverBaseUrl = 'https://muffon.app'
}

const serverUrl = `${serverBaseUrl}/api/`

export default function () {
  axios.defaults.baseURL = serverUrl
}
