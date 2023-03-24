import {
  session
} from 'electron'

function handleBeforeSendHeaders (
  details,
  request
) {
  details
    .requestHeaders
    .Referer = 'https://www.youtube.com'

  const {
    requestHeaders
  } = details

  request(
    {
      cancel: false,
      requestHeaders
    }
  )
}

export default function createHeadersHandler () {
  const filter = {
    urls: [
      'https://*.youtube.com/*'
    ]
  }

  session
    .defaultSession
    .webRequest
    .onBeforeSendHeaders(
      filter,
      handleBeforeSendHeaders
    )
}
