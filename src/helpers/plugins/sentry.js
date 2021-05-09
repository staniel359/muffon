import * as Sentry from '@sentry/vue'

const dsn =
  'https://8c56dfc6026746a9b487ee3a452edd2c' +
  '@o563575.ingest.sentry.io/5755671'

export function init (app) {
  Sentry.init({
    Vue: app,
    dsn
  })
}
