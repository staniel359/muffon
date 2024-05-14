import {
  app
} from 'electron'
import {
  appName
} from '../../helpers/utils.js'
import {
  resolve as resolvePath
} from 'path'

export default function () {
  if (process.defaultApp) {
    if (process.argv.length >= 2) {
      const appPath =
        resolvePath(
          process.argv[1]
        )

      app.setAsDefaultProtocolClient(
        appName,
        process.execPath,
        [
          appPath
        ]
      )
    }
  } else {
    app.setAsDefaultProtocolClient(
      appName
    )
  }
}
