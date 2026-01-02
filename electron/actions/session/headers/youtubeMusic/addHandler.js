import {
  session
} from 'electron'

const filter = {
  urls: [
    'https://lh3.googleusercontent.com/*'
  ]
}

function handleBeforeSendHeaders (
  details,
  callback
) {
  const requestHeaders = {
    ...details.requestHeaders,
    'Referer': 'https://music.youtube.com/'
  }

  callback(
    {
      cancel: false,
      requestHeaders
    }
  )
}

export default function () {
  const {
    webRequest
  } = session.defaultSession

  webRequest.onBeforeSendHeaders(
    filter,
    handleBeforeSendHeaders
  )
}
