import {
  app
} from 'electron'
import {
  join as joinPath
} from 'node:path'
import {
  isDevelopment
} from './utils.js'
import {
  fileRootPath as formatFileRootPath
} from './formatters.js'

const developmentUserDataPath =
  formatFileRootPath(
    'electron_data'
  )

if (isDevelopment) {
  app.setPath(
    'userData',
    developmentUserDataPath
  )
}

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

export const userDataPath =
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

export const envFilePath =
  formatFileRootPath(
    '.env'
  )

export const preloadScriptFilePath =
  formatFileRootPath(
    'electron/preload.js'
  )
