import {
  nativeImage
} from 'electron'
import {
  isDevelopment
} from '#/helpers/utils'
import {
  join as joinPath
} from 'path'
import {
  formatFileRootPath
} from '#/helpers/paths'

const publicPath =
  isDevelopment ? 'public' : ''

const iconPath =
  formatFileRootPath(
    joinPath(
      publicPath,
      'logo.png'
    )
  )

const icon =
  nativeImage.createFromPath(
    iconPath
  )

export const windowIcon =
  icon.resize(
    {
      width: 64,
      height: 64
    }
  )

export const trayIcon =
  icon.resize(
    {
      width: 16,
      height: 16
    }
  )
