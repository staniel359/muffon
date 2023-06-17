import {
  nativeImage
} from 'electron'
import {
  iconPath
} from '#/helpers/paths'

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
