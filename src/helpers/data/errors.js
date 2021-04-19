import { localize } from '#/actions/plugins/i18n'

const redCloseCornerIcon = 'red bottom right corner close'

export default {
  badRequest: {
    code: 400,
    icons: [
      'ban'
    ],
    header: localize(
      'layout.errors.badRequest.header'
    ),
    content: localize(
      'layout.errors.badRequest.content'
    ),
    isRefreshable: false
  },
  notFound: {
    code: 404,
    icons: [
      'search'
    ],
    header: localize(
      'layout.errors.notFound.header'
    ),
    content: localize(
      'layout.errors.notFound.content'
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
      'layout.errors.internalServer.header'
    ),
    content: localize(
      'layout.errors.internalServer.content'
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
      'layout.errors.badGateway.header'
    ),
    content: localize(
      'layout.errors.badGateway.content'
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
      'layout.errors.gatewayTimeout.header'
    ),
    content: localize(
      'layout.errors.gatewayTimeout.content'
    ),
    isRefreshable: true
  },
  connection: {
    icons: [
      'wifi',
      redCloseCornerIcon
    ],
    header: localize(
      'layout.errors.connection.header'
    ),
    content: localize(
      'layout.errors.connection.content'
    ),
    isRefreshable: true
  },
  client: {
    icons: [
      'window maximize outline',
      redCloseCornerIcon
    ],
    header: localize(
      'layout.errors.client.header'
    ),
    content: localize(
      'layout.errors.client.content'
    ),
    isRefreshable: false
  }
}
