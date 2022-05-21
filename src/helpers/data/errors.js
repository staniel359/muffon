const redCloseCornerIcon =
  'red bottom right corner close'

export default {
  badRequest: {
    id: 'badRequest',
    code: 400,
    icons: [
      'ban'
    ],
    isRefreshable: false
  },
  forbidden: {
    id: 'forbidden',
    code: 403,
    icons: [
      'close'
    ],
    isRefreshable: false
  },
  notFound: {
    id: 'notFound',
    code: 404,
    icons: [
      'search'
    ],
    isRefreshable: false
  },
  internalServer: {
    id: 'internalServer',
    code: 500,
    icons: [
      'server',
      redCloseCornerIcon
    ],
    isRefreshable: false
  },
  badGateway: {
    id: 'badGateway',
    code: 502,
    icons: [
      'server',
      redCloseCornerIcon
    ],
    isRefreshable: true
  },
  gatewayTimeout: {
    id: 'gatewayTimeout',
    code: 504,
    icons: [
      'hourglass end',
      redCloseCornerIcon
    ],
    isRefreshable: true
  },
  connection: {
    id: 'connection',
    code: 0,
    icons: [
      'wifi',
      redCloseCornerIcon
    ],
    isRefreshable: true
  },
  client: {
    id: 'client',
    icons: [
      'window maximize outline',
      redCloseCornerIcon
    ],
    isRefreshable: false
  }
}
