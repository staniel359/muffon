import {
  webUtils,
  shell
} from 'electron'

window.mainProcess = {
  getFilePath: function (
    file
  ) {
    return webUtils.getPathForFile(
      file
    )
  },
  openExternalLink: function (
    url
  ) {
    shell.openExternal(
      url
    )
  }
}
