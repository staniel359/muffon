import { localize } from '#/actions/plugins/i18n'

const redCloseCornerIcon = 'red bottom right corner close'

export default {
  badRequest: {
    code: 400,
    icons: [
      'ban'
    ],
    header: localize(
      'errors.badRequest.header'
    ),
    content: localize(
      'errors.badRequest.content'
    ),
    isRefreshable: false
  },
  forbidden: {
    code: 403,
    icons: [
      'close'
    ],
    header: localize(
      'errors.forbidden.header'
    ),
    content: localize(
      'errors.forbidden.content'
    ),
    isRefreshable: false
  },
  notFound: {
    code: 404,
    icons: [
      'search'
    ],
    header: localize(
      'errors.notFound.header'
    ),
    content: localize(
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
    header: localize(
      'errors.internalServer.header'
    ),
    content: localize(
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
    header: localize(
      'errors.badGateway.header'
    ),
    content: localize(
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
    header: localize(
      'errors.gatewayTimeout.header'
    ),
    content: localize(
      'errors.gatewayTimeout.content'
    ),
    isRefreshable: true
  },
  connection: {
    icons: [
      'wifi',
      redCloseCornerIcon
    ],
    header: localize(
      'errors.connection.header'
    ),
    content: localize(
      'errors.connection.content'
    ),
    isRefreshable: true
  },
  client: {
    icons: [
      'window maximize outline',
      redCloseCornerIcon
    ],
    header: localize(
      'errors.client.header'
    ),
    content: localize(
      'errors.client.content'
    ),
    isRefreshable: false
  }
}
