import {
  app
} from 'electron'
import {
  dirname,
  join as joinPath
} from 'path'
import {
  fileURLToPath
} from 'url'
import {
  isDevelopment,
  createFolderIfNotExists
} from './utils.js'

export function formatFileRootPath (
  filePath
) {
  const directory = dirname(
    fileURLToPath(
      import.meta.url
    )
  )

  return joinPath(
    directory,
    '..',
    filePath
  )
}

export const productionPath =
  formatFileRootPath(
    'index.html'
  )

if (isDevelopment) {
  const developmentUserDataPath =
    formatFileRootPath(
      'electron_data'
    )

  app.setPath(
    'userData',
    developmentUserDataPath
  )
}

const userDataPath =
  app.getPath(
    'userData'
  )

export const audioFolderPath =
  joinPath(
    userDataPath,
    'audio'
  )

createFolderIfNotExists(
  audioFolderPath
)

export const backgroundImagesFolderPath =
  joinPath(
    userDataPath,
    'background_images'
  )

createFolderIfNotExists(
  backgroundImagesFolderPath
)
