const {
  session
} = require(
  'electron'
)

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

function createHeadersHandler () {
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

module.exports = createHeadersHandler
