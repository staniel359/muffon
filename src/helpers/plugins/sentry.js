import * as Sentry from '@sentry/vue'

const dsn =
  'https://d1a02a1ec71d4be082a858879a0898eb@' +
  'o563575.ingest.sentry.io/5703733'

export function init (app) {
  Sentry.init({
    Vue: app,
    dsn
  })
}
