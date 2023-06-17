import {
  app
} from 'electron'
import {
  join as joinPath
} from 'path'
import {
  isDevelopment
} from '#/helpers/utils'
import {
  fileRootPath as formatFileRootPath
} from '#/helpers/formatters'

export const developmentUserDataPath =
  formatFileRootPath(
    'electron_data'
  )

export const productionPath =
  formatFileRootPath(
    'index.html'
  )

const publicPath = (
  isDevelopment ? 'public' : ''
)

const iconPublicPath =
  joinPath(
    publicPath,
    'logo.png'
  )

export const iconPath =
  formatFileRootPath(
    iconPublicPath
  )

const userDataPath =
  app.getPath(
    'userData'
  )

export const audioFolderPath =
  joinPath(
    userDataPath,
    'audio'
  )

export const backgroundImagesFolderPath =
  joinPath(
    userDataPath,
    'background_images'
  )
