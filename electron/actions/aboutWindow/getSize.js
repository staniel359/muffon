import {
  isLinux
} from '../../helpers/utils.js'

export default function () {
  let width

  let height

  if (isLinux) {
    const size = aboutWindow.getSize()

    width = size[0]

    height = size[1]
  } else {
    const size =
      aboutWindow.getContentBounds()

    width = size.width

    height = size.height
  }

  return [
    width,
    height
  ]
}
