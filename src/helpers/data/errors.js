import i18n from '*/i18n'

const redCloseCornerIcon =
  'red bottom right corner close'

export default {
  badRequest: {
    code: 400,
    icons: [
      'ban'
    ],
    header: i18n.global.t(
      'errors.badRequest.header'
    ),
    content: i18n.global.t(
      'errors.badRequest.content'
    ),
    isRefreshable: false
  },
  forbidden: {
    code: 403,
    icons: [
      'close'
    ],
    header: i18n.global.t(
      'errors.forbidden.header'
    ),
    content: i18n.global.t(
      'errors.forbidden.content'
    ),
    isRefreshable: false
  },
  notFound: {
    code: 404,
    icons: [
      'search'
    ],
    header: i18n.global.t(
      'errors.notFound.header'
    ),
    content: i18n.global.t(
      'errors.notFound.content'
    ),
    isRefreshable: false
  },
  internalServer: {
    code: 500,
    icons: [
      'server',
      redCloseCornerIcon
    ],
    header: i18n.global.t(
      'errors.internalServer.header'
    ),
    content: i18n.global.t(
      'errors.internalServer.content'
    ),
    isRefreshable: false
  },
  badGateway: {
    code: 502,
    icons: [
      'server',
      redCloseCornerIcon
    ],
    header: i18n.global.t(
      'errors.badGateway.header'
    ),
    content: i18n.global.t(
      'errors.badGateway.content'
    ),
    isRefreshable: true
  },
  gatewayTimeout: {
    code: 504,
    icons: [
      'hourglass end',
      redCloseCornerIcon
    ],
    header: i18n.global.t(
      'errors.gatewayTimeout.header'
    ),
    content: i18n.global.t(
      'errors.gatewayTimeout.content'
    ),
    isRefreshable: true
  },
  connection: {
    icons: [
      'wifi',
      redCloseCornerIcon
    ],
    header: i18n.global.t(
      'errors.connection.header'
    ),
    content: i18n.global.t(
      'errors.connection.content'
    ),
    isRefreshable: true
  },
  client: {
    icons: [
      'window maximize outline',
      redCloseCornerIcon
    ],
    header: i18n.global.t(
      'errors.client.header'
    ),
    content: i18n.global.t(
      'errors.client.content'
    ),
    isRefreshable: false
  }
}
