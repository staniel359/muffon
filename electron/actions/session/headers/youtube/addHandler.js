import {
  session
} from 'electron'

const filter = {
  urls: [
    'https://*.youtube.com/*'
  ]
}

function handleBeforeSendHeaders (
  details,
  callback
) {
  const requestHeaders = {
    ...details.requestHeaders
  }

  callback(
    {
      cancel: false,
      requestHeaders
    }
  )
}

function handleHeadersReceived (
  details,
  callback
) {
  const responseHeaders = {
    ...details.responseHeaders,
    'Access-Control-Allow-Origin': [
      '*'
    ]
  }

  callback(
    {
      responseHeaders
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
