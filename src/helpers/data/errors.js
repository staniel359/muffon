const redCloseCornerIcon =
  'red bottom right corner close'

export default {
  badRequest: {
    id: 'badRequest',
    code: 400,
    icon: 'errorBadRequest',
    isRefreshable: false
  },
  forbidden: {
    id: 'forbidden',
    code: 403,
    icon: 'errorForbidden',
    isRefreshable: false
  },
  notFound: {
    id: 'notFound',
    code: 404,
    icon: 'errorNotFound',
    isRefreshable: false
  },
  internalServer: {
    id: 'internalServer',
    code: 500,
    icons: [
      'errorInternalServer',
      redCloseCornerIcon
    ],
    isRefreshable: false
  },
  badGateway: {
    id: 'badGateway',
    code: 502,
    icons: [
      'errorBadGateway',
      redCloseCornerIcon
    ],
    isRefreshable: true
  },
  gatewayTimeout: {
    id: 'gatewayTimeout',
    code: 504,
    icons: [
      'errorGatewayTimeout',
      redCloseCornerIcon
    ],
    isRefreshable: true
  },
  connection: {
    id: 'connection',
    code: 0,
    icons: [
      'errorConnection',
      redCloseCornerIcon
    ],
    isRefreshable: true
  },
  client: {
    id: 'client',
    icons: [
      'errorClient',
      redCloseCornerIcon
    ],
    isRefreshable: false
  }
}
