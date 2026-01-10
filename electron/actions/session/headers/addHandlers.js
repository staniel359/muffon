import {
  session
} from 'electron'

const filter = {
  urls: [
    'https://www.youtube.com/*',
    'https://lh3.googleusercontent.com/*'
  ]
}

function handleBeforeSendHeaders (
  details,
  callback
) {
  const {
    url
  } = details

  const headers = {
    ...details.responseHeaders
  }

  if (url.includes(
    'youtube.com'
  )) {
    headers.Referer = 'https://www.example.com'
  } else if (url.includes(
    'lh3.googleusercontent.com'
  )) {
    headers.Referer = 'https://music.youtube.com/'
  }

  callback(
    {
      cancel: false,
      requestHeaders: headers
    }
  )
}

function handleHeadersReceived (
  details,
  callback
) {
  const {
    url
  } = details

  const headers = {
    ...details.responseHeaders
  }

  if (url.includes(
    'youtube.com'
  )) {
    headers['Access-Control-Allow-Origin'] = [
      '*'
    ]
  }

  callback(
    {
      responseHeaders: headers
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

  webRequest.onHeadersReceived(
    filter,
    handleHeadersReceived
  )
}
