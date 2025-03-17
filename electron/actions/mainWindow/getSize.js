import {
  isLinux
} from '../../helpers/utils.js'

export default function () {
  if (isLinux) {
    return mainWindow.getSize()
  } else {
    return mainWindow.getContentSize()
  }
}
