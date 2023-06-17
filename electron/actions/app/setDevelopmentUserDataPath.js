import {
  app
} from 'electron'
import {
  isDevelopment
} from '#/helpers/utils'
import {
  developmentUserDataPath
} from '#/helpers/paths'

export default function () {
  if (isDevelopment) {
    app.setPath(
      'userData',
      developmentUserDataPath
    )
  }
}
