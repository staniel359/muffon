export default function errorsList () {
  return {
    badRequest: {
      icon: 'ban',
      header: 'Bad request',
      content: 'Please make a request with valid data.',
      isRefreshable: false
    },
    notFound: {
      icon: 'search',
      header: 'Nothing was found',
      content: 'Please try looking for something else.',
      isRefreshable: false
    },
    internalServer: {
      icon: 'server',
      header: 'Internal server error',
      content: 'Please contact us for information.',
      isRefreshable: false
    },
    badGateway: {
      icon: 'server',
      header: 'Remote server error',
      content: 'Please try again in a moment.',
      isRefreshable: true
    },
    gatewayTimeout: {
      icon: 'clock outline',
      header: 'Remote server timeout',
      content: 'Please try again in a moment.',
      isRefreshable: true
    },
    connection: {
      icon: 'wifi',
      header: 'Connection lost',
      content: 'Please try again in a moment.',
      isRefreshable: true
    },
    client: {
      icon: 'window maximize outline',
      header: 'Client error',
      content: 'Please contact us for information.',
      isRefreshable: false
    }
  }
}
