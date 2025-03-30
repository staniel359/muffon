import {
  isLinux
} from '../../helpers/utils.js'

export default function () {
  let width

  let height

  if (isLinux) {
    const size = mainWindow.getSize()

    width = size[0]

    height = size[1]
  } else {
    const size =
      mainWindow.getContentSize()

    width = size[0]

    height = size[1]
  }

  return [
    width,
    height
  ]
}
