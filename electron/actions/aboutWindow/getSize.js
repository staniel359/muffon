import {
  isLinux
} from '../../helpers/utils.js'

export default function () {
  if (isLinux) {
    return aboutWindow.getSize()
  } else {
    return aboutWindow.getContentSize()
  }
}
